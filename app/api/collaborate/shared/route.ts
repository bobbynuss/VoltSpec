import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getUserClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

/** Admin client — bypasses RLS for accepting invites */
function getAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key);
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

    // Use admin client for accepting invites (bypasses RLS that blocks self-update)
    const admin = getAdminClient();

    // Step 1: Find pending invites for this email and auto-accept them
    // Use admin client to find and accept since user may not have access yet
    const searchClient = admin || supabase;
    const { data: pendingInvites, error: pendingError } = await searchClient
      .from("project_collaborators")
      .select("id, role, vendor_company")
      .eq("invited_email", userEmail)
      .is("accepted_at", null);

    if (pendingError) {
      console.error("Pending invites lookup error:", pendingError);
    }

    if (pendingInvites && pendingInvites.length > 0) {
      const acceptClient = admin || supabase;
      let hasVendorInvite = false;
      let vendorCompanyName: string | null = null;

      for (const invite of pendingInvites) {
        const { error: acceptError } = await acceptClient
          .from("project_collaborators")
          .update({
            user_id: user.id,
            accepted_at: new Date().toISOString(),
          })
          .eq("id", invite.id);

        if (acceptError) {
          console.error(`Accept invite ${invite.id} error:`, acceptError);
        }

        // Track if any invite is a vendor role
        if ((invite as Record<string, unknown>).role === "vendor") {
          hasVendorInvite = true;
          vendorCompanyName = (invite as Record<string, unknown>).vendor_company as string ?? vendorCompanyName;
        }
      }

      // Auto-set user profile to vendor if they have a vendor invite
      // and their current role is still the default 'contractor'
      if (hasVendorInvite && acceptClient) {
        const { data: profile } = await acceptClient
          .from("user_profiles")
          .select("id, role")
          .eq("id", user.id)
          .single();

        if (!profile) {
          // Profile doesn't exist — create it as vendor
          await acceptClient.from("user_profiles").insert({
            id: user.id,
            role: "vendor",
            company_name: vendorCompanyName,
          });
        } else if (profile.role === "contractor" || !profile.role) {
          // Profile exists but is default — upgrade to vendor
          await acceptClient.from("user_profiles").update({
            role: "vendor",
            company_name: vendorCompanyName,
          }).eq("id", user.id);
        }
      }
    }

    // Step 2: Fetch all collaborations where user_id matches (accepted)
    // OR where invited_email matches
    // Use admin client to ensure we see all relevant records
    const fetchClient = admin || supabase;
    const { data: collabs, error: collabError } = await fetchClient
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

    // Use admin client to fetch projects (user may not have direct RLS access yet)
    const projClient = admin || supabase;
    const { data: projects, error: projError } = await projClient
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
