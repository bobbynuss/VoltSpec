import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getUserClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

function getAdmin() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key);
}

/**
 * POST /api/collaborate/comments — add a comment on a material item
 * Body: { projectId, itemIndex, comment, commentType?, leadTime?, freight? }
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = getUserClient(authHeader.replace("Bearer ", ""));
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = getAdmin() || supabase;
    const body = await req.json();
    const { projectId, itemIndex, comment, commentType = "note", leadTime, freight } = body;

    if (!projectId || itemIndex === undefined || !comment) {
      return NextResponse.json({ error: "projectId, itemIndex, and comment required" }, { status: 400 });
    }

    const { data: profile } = await admin.from("user_profiles").select("company_name").eq("id", user.id).single();

    // Build comment text with lead time and freight if provided
    let fullComment = comment;
    const meta: string[] = [];
    if (leadTime) meta.push(`Lead time: ${leadTime}`);
    if (freight) meta.push(`Freight: ${freight}`);
    if (meta.length > 0) fullComment = `${comment}\n${meta.join(" · ")}`;

    const { data: record, error: insertError } = await admin.from("vendor_comments").insert({
      project_id: projectId,
      user_id: user.id,
      item_index: itemIndex,
      comment: fullComment,
      comment_type: commentType,
      vendor_company: profile?.company_name ?? null,
    }).select().single();

    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });

    await admin.from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "vendor_comment_added",
      details: { itemIndex, commentType, leadTime, freight, vendorCompany: profile?.company_name },
    });

    return NextResponse.json({ success: true, comment: record });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

/**
 * GET /api/collaborate/comments?projectId=xxx
 */
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = getUserClient(authHeader.replace("Bearer ", ""));
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = getAdmin() || supabase;
    const projectId = req.nextUrl.searchParams.get("projectId");
    if (!projectId) return NextResponse.json({ error: "projectId required" }, { status: 400 });

    const { data, error } = await admin.from("vendor_comments").select("*").eq("project_id", projectId).order("created_at", { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ comments: data ?? [] });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

/**
 * PATCH /api/collaborate/comments — resolve a comment
 * Body: { commentId, resolved: boolean }
 */
export async function PATCH(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = getUserClient(authHeader.replace("Bearer ", ""));
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = getAdmin() || supabase;
    const body = await req.json();
    const { commentId, resolved } = body;

    if (!commentId || resolved === undefined) {
      return NextResponse.json({ error: "commentId and resolved required" }, { status: 400 });
    }

    const { error } = await admin.from("vendor_comments").update({
      resolved,
      resolved_by: resolved ? user.id : null,
      resolved_at: resolved ? new Date().toISOString() : null,
    }).eq("id", commentId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
