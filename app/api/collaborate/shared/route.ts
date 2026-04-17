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
 * GET /api/collaborate/shared — list projects shared with current user
 * Handles auto-accepting pending invites and returns shared projects.
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

    const userEmail = user.email?.toLowerCase();
    if (!userEmail) {
      return NextResponse.json({ shared: [] });
    }

    // Step 1: Find pending invites for this email and auto-accept them
    const { data: pendingInvites, error: pendingError } = await supabase
      .from("project_collaborators")
      .select("id")
      .eq("invited_email", userEmail)
      .is("accepted_at", null);

    if (pendingError) {
      console.error("Pending invites lookup error:", pendingError);
    }

    if (pendingInvites && pendingInvites.length > 0) {
      for (const invite of pendingInvites) {
        const { error: acceptError } = await supabase
          .from("project_collaborators")
          .update({
            user_id: user.id,
            accepted_at: new Date().toISOString(),
          })
          .eq("id", invite.id);

        if (acceptError) {
          console.error(`Accept invite ${invite.id} error:`, acceptError);
        }
      }
    }

    // Step 2: Fetch all collaborations where user_id matches (accepted)
    // OR where invited_email matches (in case accept failed but we still want to show)
    const { data: collabs, error: collabError } = await supabase
      .from("project_collaborators")
      .select("*")
      .or(`user_id.eq.${user.id},invited_email.eq.${userEmail}`);

    if (collabError) {
      console.error("Fetch collaborations error:", collabError);
      return NextResponse.json({ error: collabError.message }, { status: 500 });
    }

    if (!collabs || collabs.length === 0) {
      return NextResponse.json({ shared: [] });
    }

    // Step 3: Fetch the associated projects
    const projectIds = [...new Set(collabs.map((c: Record<string, unknown>) => c.project_id as string))];

    const { data: projects, error: projError } = await supabase
      .from("projects")
      .select("id, name, job_id, city, zip, job_data, updated_at, material_overrides")
      .in("id", projectIds);

    if (projError) {
      console.error("Fetch shared projects error:", projError);
      return NextResponse.json({ error: projError.message }, { status: 500 });
    }

    // Step 4: Combine and return
    const projectMap = new Map(
      (projects ?? []).map((p: Record<string, unknown>) => [p.id, p])
    );

    const shared = collabs
      .map((c: Record<string, unknown>) => {
        const project = projectMap.get(c.project_id as string);
        if (!project) return null;
        return {
          project,
          collaboration: {
            id: c.id,
            project_id: c.project_id,
            user_id: c.user_id,
            invited_email: c.invited_email,
            role: c.role,
            invited_by: c.invited_by,
            invited_at: c.invited_at,
            accepted_at: c.accepted_at,
          },
        };
      })
      .filter(Boolean);

    return NextResponse.json({ shared });
  } catch (err) {
    console.error("Shared projects error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
