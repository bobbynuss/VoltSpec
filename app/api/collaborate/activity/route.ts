import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";




/**
 * GET /api/collaborate/activity?projectId=xxx — get project activity log
 */
export async function GET(req: NextRequest) {
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

    const projectId = req.nextUrl.searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json(
        { error: "projectId required" },
        { status: 400 }
      );
    }

    // Verify access
    const { data: project } = await getSupabaseAdmin()
      .from("projects")
      .select("user_id")
      .eq("id", projectId)
      .single();

    const isOwner = project?.user_id === user.id;

    if (!isOwner) {
      const { data: collab } = await getSupabaseAdmin()
        .from("project_collaborators")
        .select("id, accepted_at")
        .eq("project_id", projectId)
        .eq("user_id", user.id)
        .single();

      if (!collab?.accepted_at) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    }

    const limit = parseInt(
      req.nextUrl.searchParams.get("limit") ?? "50",
      10
    );

    const { data, error } = await getSupabaseAdmin()
      .from("project_activity")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ activity: data });
  } catch (err) {
    console.error("Activity GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

