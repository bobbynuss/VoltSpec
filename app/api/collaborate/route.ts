import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * POST /api/collaborate — invite a collaborator
 * Body: { projectId, email, role? }
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the user
    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await getSupabaseAdmin().auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { projectId, email, role = "editor" } = body;

    if (!projectId || !email) {
      return NextResponse.json(
        { error: "projectId and email required" },
        { status: 400 }
      );
    }

    // Verify user owns the project
    const { data: project, error: projError } = await getSupabaseAdmin()
      .from("projects")
      .select("user_id")
      .eq("id", projectId)
      .single();

    if (projError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.user_id !== user.id) {
      return NextResponse.json(
        { error: "Only the project owner can invite collaborators" },
        { status: 403 }
      );
    }

    // Can't invite yourself
    if (email.toLowerCase().trim() === user.email?.toLowerCase()) {
      return NextResponse.json(
        { error: "Can't invite yourself" },
        { status: 400 }
      );
    }

    // Insert collaboration record
    const { data: collab, error: insertError } = await getSupabaseAdmin()
      .from("project_collaborators")
      .insert({
        project_id: projectId,
        invited_email: email.toLowerCase().trim(),
        role,
        invited_by: user.id,
      })
      .select()
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "Already invited" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    // Log activity
    await getSupabaseAdmin().from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "collaborator_added",
      details: { email: email.toLowerCase().trim(), role },
    });

    return NextResponse.json({ success: true, collaborator: collab });
  } catch (err) {
    console.error("Collaborate API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/collaborate?projectId=xxx — list collaborators
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

    // Verify access (owner or collaborator)
    const { data: project } = await getSupabaseAdmin()
      .from("projects")
      .select("user_id")
      .eq("id", projectId)
      .single();

    const isOwner = project?.user_id === user.id;

    if (!isOwner) {
      const { data: collab } = await getSupabaseAdmin()
        .from("project_collaborators")
        .select("id")
        .eq("project_id", projectId)
        .eq("user_id", user.id)
        .single();
      if (!collab) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    }

    const { data, error } = await getSupabaseAdmin()
      .from("project_collaborators")
      .select("*")
      .eq("project_id", projectId)
      .order("invited_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ collaborators: data });
  } catch (err) {
    console.error("Collaborate GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/collaborate — remove a collaborator
 * Body: { collaboratorId, projectId }
 */
export async function DELETE(req: NextRequest) {
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
    const { collaboratorId, projectId } = body;

    // Verify ownership
    const { data: project } = await getSupabaseAdmin()
      .from("projects")
      .select("user_id")
      .eq("id", projectId)
      .single();

    if (project?.user_id !== user.id) {
      return NextResponse.json(
        { error: "Only the project owner can remove collaborators" },
        { status: 403 }
      );
    }

    const { error } = await getSupabaseAdmin()
      .from("project_collaborators")
      .delete()
      .eq("id", collaboratorId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log activity
    await getSupabaseAdmin().from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "collaborator_removed",
      details: { collaboratorId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Collaborate DELETE error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

