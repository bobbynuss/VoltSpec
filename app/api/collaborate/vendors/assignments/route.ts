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
 * PUT /api/collaborate/vendors/assignments — Assign/reassign manufacturers to a vendor
 * Body: { projectId, collaboratorId, manufacturerKeys: string[] }
 *
 * This replaces ALL assignments for that vendor on this project.
 * Only the sales rep or project owner can do this.
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
    const { projectId, collaboratorId, manufacturerKeys } = body;

    if (!projectId || !collaboratorId || !Array.isArray(manufacturerKeys)) {
      return NextResponse.json(
        { error: "projectId, collaboratorId, and manufacturerKeys[] required" },
        { status: 400 }
      );
    }

    // Verify caller is owner or sales_rep on this project
    const { data: project } = await supabase
      .from("projects")
      .select("user_id")
      .eq("id", projectId)
      .single();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const isOwner = project.user_id === user.id;
    let isSalesRep = false;

    if (!isOwner) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const { data: collab } = await supabase
        .from("project_collaborators")
        .select("accepted_at")
        .eq("project_id", projectId)
        .eq("user_id", user.id)
        .single();

      isSalesRep =
        profile?.role === "sales_rep" && !!collab?.accepted_at;
    }

    if (!isOwner && !isSalesRep) {
      return NextResponse.json(
        { error: "Only the project owner or an Elliott sales rep can manage vendor assignments" },
        { status: 403 }
      );
    }

    // Delete existing assignments for this collaborator on this project
    const { error: deleteError } = await supabase
      .from("vendor_assignments")
      .delete()
      .eq("project_id", projectId)
      .eq("collaborator_id", collaboratorId);

    if (deleteError) {
      console.error("Delete assignments error:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // Insert new assignments
    const { MANUFACTURERS } = await import("@/lib/vendor-grouping");
    const insertRows = manufacturerKeys
      .map((mfrKey: string) => {
        const mfr = MANUFACTURERS.find((m) => m.key === mfrKey);
        if (!mfr) return null;
        return {
          project_id: projectId,
          collaborator_id: collaboratorId,
          manufacturer_key: mfrKey,
          vendor_codes: mfr.vendorCodes,
          assigned_by: user.id,
        };
      })
      .filter(Boolean);

    if (insertRows.length > 0) {
      const { error: insertError } = await supabase
        .from("vendor_assignments")
        .insert(insertRows);

      if (insertError) {
        console.error("Insert assignments error:", insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    // Log activity
    await supabase.from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "vendor_assignments_updated",
      details: {
        collaboratorId,
        manufacturerKeys,
      },
    });

    return NextResponse.json({ success: true, assigned: manufacturerKeys });
  } catch (err) {
    console.error("Vendor assignments PUT error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/collaborate/vendors/assignments?projectId=xxx — get manufacturer grouping for a project BOM
 * Returns the auto-detected manufacturer groups for the project's materials.
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

    // Fetch project job_data to get materials
    const { data: project, error: projError } = await supabase
      .from("projects")
      .select("job_data")
      .eq("id", projectId)
      .single();

    if (projError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const jobData = project.job_data as Record<string, unknown>;
    const materials = (jobData?.materials ?? []) as Array<{
      item: string;
      quantity: string;
      spec: string;
      unitPrice?: number;
    }>;

    const { groupByManufacturer } = await import("@/lib/vendor-grouping");
    const groups = groupByManufacturer(materials);

    return NextResponse.json({
      groups: groups.map((g) => ({
        key: g.key,
        name: g.name,
        vendorCodes: g.vendorCodes,
        itemCount: g.items.length,
        items: g.items.map((item) => ({
          index: item.index,
          item: item.item,
          quantity: item.quantity,
          spec: item.spec,
          vendorCode: item.vendorCode,
        })),
      })),
    });
  } catch (err) {
    console.error("Vendor assignments GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
