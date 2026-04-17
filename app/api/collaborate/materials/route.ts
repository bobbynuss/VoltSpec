import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

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
    const {
      data: { user },
      error: authError,
    } = await getSupabaseAdmin().auth.getUser(token);
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

    // Validate field
    if (!["item", "spec", "quantity"].includes(field)) {
      return NextResponse.json(
        { error: "Invalid field. Must be item, spec, or quantity" },
        { status: 400 }
      );
    }

    // Verify access — owner or editor collaborator
    const { data: project, error: projError } = await getSupabaseAdmin()
      .from("projects")
      .select("user_id, material_overrides")
      .eq("id", projectId)
      .single();

    if (projError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const isOwner = project.user_id === user.id;

    if (!isOwner) {
      const { data: collab } = await getSupabaseAdmin()
        .from("project_collaborators")
        .select("role, accepted_at")
        .eq("project_id", projectId)
        .eq("user_id", user.id)
        .single();

      if (!collab?.accepted_at || collab.role !== "editor") {
        return NextResponse.json(
          { error: "Editor access required" },
          { status: 403 }
        );
      }
    }

    // Update overrides
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

    // Replace existing override for same index+field, or add new
    const updated = existing.filter(
      (o) => !(o.index === index && o.field === field)
    );
    updated.push(newOverride);

    const { error: updateError } = await getSupabaseAdmin()
      .from("projects")
      .update({
        material_overrides: updated,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    // Log activity
    await getSupabaseAdmin().from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "material_updated",
      details: {
        itemIndex: index,
        field,
        oldValue: oldValue ?? "",
        newValue,
      },
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


