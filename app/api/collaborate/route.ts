import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/** Create a Supabase client using the user's JWT for RLS */
function getUserClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

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
    const { projectId, email, role = "editor" } = body;

    if (!projectId || !email) {
      return NextResponse.json(
        { error: "projectId and email required" },
        { status: 400 }
      );
    }

    // Verify user owns the project
    const { data: project, error: projError } = await supabase
      .from("projects")
      .select("user_id")
      .eq("id", projectId)
      .single();

    if (projError || !project) {
      console.error("Project lookup error:", projError);
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
    const { data: collab, error: insertError } = await supabase
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
      console.error("Insert collaborator error:", insertError);
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
    await supabase.from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "collaborator_added",
      details: { email: email.toLowerCase().trim(), role },
    });

    return NextResponse.json({ success: true, collaborator: collab });
  } catch (err) {
    console.error("Collaborate POST error:", err);
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
      return NextResponse.json(
        { error: "projectId required" },
        { status: 400 }
      );
    }

    // RLS handles access control — owner or collaborator can query
    const { data, error } = await supabase
      .from("project_collaborators")
      .select("*")
      .eq("project_id", projectId)
      .order("invited_at", { ascending: true });

    if (error) {
      console.error("List collaborators error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ collaborators: data ?? [] });
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
    const supabase = getUserClient(token);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { collaboratorId, projectId } = body;

    // RLS "Owner can manage collaborators" policy handles permission
    const { error } = await supabase
      .from("project_collaborators")
      .delete()
      .eq("id", collaboratorId);

    if (error) {
      console.error("Delete collaborator error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log activity
    await supabase.from("project_activity").insert({
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
