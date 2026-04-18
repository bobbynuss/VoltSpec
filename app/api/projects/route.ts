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
 * GET /api/projects?id=xxx — Load a single project's full data (for shared project loading)
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

    const projectId = req.nextUrl.searchParams.get("id");
    if (!projectId) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    // Check if user is owner or collaborator
    // Try with user client first (RLS), fall back to admin
    let project: Record<string, unknown> | null = null;

    const { data: p1, error: e1 } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (p1) {
      project = p1;
    } else {
      // User RLS failed — check if they're a collaborator and use admin
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (serviceKey) {
        const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey);
        // Verify they're actually a collaborator
        const { data: collab } = await admin
          .from("project_collaborators")
          .select("accepted_at")
          .eq("project_id", projectId)
          .eq("user_id", user.id)
          .not("accepted_at", "is", null)
          .single();

        if (collab) {
          const { data: p2 } = await admin
            .from("projects")
            .select("*")
            .eq("id", projectId)
            .single();
          project = p2;
        }
      }
    }

    if (!project) {
      return NextResponse.json({ error: "Project not found or no access" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * DELETE /api/projects — Delete a project (owner only)
 * Body: { projectId }
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
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json({ error: "projectId required" }, { status: 400 });
    }

    // Verify ownership first
    const { data: project } = await supabase
      .from("projects")
      .select("user_id")
      .eq("id", projectId)
      .single();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.user_id !== user.id) {
      return NextResponse.json({ error: "Only the owner can delete" }, { status: 403 });
    }

    // Use service role for the actual delete to bypass any RLS issues
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const deleteClient = serviceKey
      ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey)
      : supabase;

    const { error: deleteError } = await deleteClient
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (deleteError) {
      console.error("Delete project error:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
