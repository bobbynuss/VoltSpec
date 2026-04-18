import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getUserClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/**
 * POST /api/collaborate/vendors — Sales rep invites a vendor to the project
 * Body: { projectId, email, vendorCompany, manufacturerKeys? }
 */
export async function POST(req: NextRequest) {
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

    // Check that inviter is a sales_rep
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const isOwner = await checkIsOwner(supabase, req, user.id);

    if (profile?.role !== "sales_rep" && profile?.role !== "admin" && !isOwner) {
      return NextResponse.json(
        { error: "Only Elliott sales reps or the project owner can invite vendors" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { projectId, email, vendorCompany, manufacturerKeys } = body;

    if (!projectId || !email || !vendorCompany) {
      return NextResponse.json(
        { error: "projectId, email, and vendorCompany required" },
        { status: 400 }
      );
    }

    // Verify the inviter is a collaborator on this project (or owner)
    const { data: project } = await supabase
      .from("projects")
      .select("user_id")
      .eq("id", projectId)
      .single();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const isProjectOwner = project.user_id === user.id;
    if (!isProjectOwner) {
      const { data: collab } = await supabase
        .from("project_collaborators")
        .select("role, accepted_at")
        .eq("project_id", projectId)
        .eq("user_id", user.id)
        .single();

      if (!collab?.accepted_at) {
        return NextResponse.json(
          { error: "You must be an active collaborator on this project" },
          { status: 403 }
        );
      }
    }

    // Insert vendor collaborator
    const adminClient = getAdminClient();
    const { data: collab, error: insertError } = await adminClient
      .from("project_collaborators")
      .insert({
        project_id: projectId,
        invited_email: email.toLowerCase().trim(),
        role: "vendor",
        invited_by: user.id,
        invited_by_role: profile?.role ?? "contractor",
        vendor_company: vendorCompany,
      })
      .select()
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json({ error: "Already invited" }, { status: 409 });
      }
      console.error("Insert vendor collaborator error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // If manufacturer keys provided, create vendor assignments
    if (manufacturerKeys && Array.isArray(manufacturerKeys) && collab) {
      const { MANUFACTURERS } = await import("@/lib/vendor-grouping");
      for (const mfrKey of manufacturerKeys) {
        const mfr = MANUFACTURERS.find((m) => m.key === mfrKey);
        if (mfr) {
          await adminClient.from("vendor_assignments").insert({
            project_id: projectId,
            collaborator_id: collab.id,
            manufacturer_key: mfrKey,
            vendor_codes: mfr.vendorCodes,
            assigned_by: user.id,
          });
        }
      }
    }

    // Log activity
    await supabase.from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "vendor_invited",
      details: {
        email: email.toLowerCase().trim(),
        vendorCompany,
        manufacturerKeys: manufacturerKeys ?? [],
      },
    });

    return NextResponse.json({ success: true, collaborator: collab });
  } catch (err) {
    console.error("Vendor invite POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/collaborate/vendors?projectId=xxx — list vendor collaborators + their assignments
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

    // Get vendor collaborators
    const { data: vendors, error: vError } = await supabase
      .from("project_collaborators")
      .select("*")
      .eq("project_id", projectId)
      .eq("role", "vendor")
      .order("invited_at", { ascending: true });

    if (vError) {
      return NextResponse.json({ error: vError.message }, { status: 500 });
    }

    // Get vendor assignments
    const { data: assignments, error: aError } = await supabase
      .from("vendor_assignments")
      .select("*")
      .eq("project_id", projectId);

    if (aError) {
      console.error("Vendor assignments query error:", aError);
    }

    // Map assignments to vendors
    const vendorsWithAssignments = (vendors ?? []).map((v: Record<string, unknown>) => ({
      ...v,
      assignments: (assignments ?? []).filter(
        (a: Record<string, unknown>) => a.collaborator_id === v.id
      ),
    }));

    return NextResponse.json({ vendors: vendorsWithAssignments });
  } catch (err) {
    console.error("Vendor list GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function checkIsOwner(
  supabase: ReturnType<typeof getUserClient>,
  req: NextRequest,
  userId: string
): Promise<boolean> {
  const body = await req.clone().json().catch(() => ({}));
  const projectId = body.projectId;
  if (!projectId) return false;
  const { data } = await supabase
    .from("projects")
    .select("user_id")
    .eq("id", projectId)
    .single();
  return data?.user_id === userId;
}
