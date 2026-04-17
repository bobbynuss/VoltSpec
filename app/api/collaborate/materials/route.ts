import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getUserClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

/**
 * GET /api/collaborate/materials?projectId=xxx — get material overrides
 */
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabase = getUserClient(token);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projectId = req.nextUrl.searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json({ error: "projectId required" }, { status: 400 });
    }

    // RLS handles access
    const { data, error } = await supabase
      .from("projects")
      .select("material_overrides")
      .eq("id", projectId)
      .single();

    if (error) {
      console.error("Get overrides error:", error);
      return NextResponse.json({ overrides: [] });
    }

    return NextResponse.json({ overrides: data?.material_overrides ?? [] });
  } catch (err) {
    console.error("Materials GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PUT /api/collaborate/materials — update material override on a shared project
 * Body: { projectId, index, field, oldValue, newValue }
 */
export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabase = getUserClient(token);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { projectId, index, field, oldValue, newValue } = body;

    if (!projectId || index === undefined || !field || !newValue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["item", "spec", "quantity"].includes(field)) {
      return NextResponse.json(
        { error: "Invalid field. Must be item, spec, or quantity" },
        { status: 400 }
      );
    }

    // RLS handles access — owner or accepted collaborator can update
    const { data: project, error: projError } = await supabase
      .from("projects")
      .select("material_overrides")
      .eq("id", projectId)
      .single();

    if (projError || !project) {
      console.error("Project lookup error:", projError);
      return NextResponse.json({ error: "Project not found or access denied" }, { status: 404 });
    }

    const existing = (project.material_overrides ?? []) as Array<{
      index: number;
      field: string;
      oldValue: string;
      newValue: string;
      updatedBy: string;
      updatedAt: string;
    }>;

    const newOverride = {
      index,
      field,
      oldValue: oldValue ?? "",
      newValue,
      updatedBy: user.id,
      updatedAt: new Date().toISOString(),
    };

    const updated = existing.filter(
      (o) => !(o.index === index && o.field === field)
    );
    updated.push(newOverride);

    const { error: updateError } = await supabase
      .from("projects")
      .update({
        material_overrides: updated,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    if (updateError) {
      console.error("Update overrides error:", updateError);
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    // Log activity
    await supabase.from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "material_updated",
      details: { itemIndex: index, field, oldValue: oldValue ?? "", newValue },
    });

    return NextResponse.json({ success: true, overrides: updated });
  } catch (err) {
    console.error("Materials PUT error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
