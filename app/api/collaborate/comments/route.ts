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
 * POST /api/collaborate/comments — add a comment on a material item
 * Body: { projectId, itemIndex, comment, commentType?, vendorCompany? }
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
    const { projectId, itemIndex, comment, commentType = "note" } = body;

    if (!projectId || itemIndex === undefined || !comment) {
      return NextResponse.json(
        { error: "projectId, itemIndex, and comment required" },
        { status: 400 }
      );
    }

    // Get vendor company from profile
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("company_name")
      .eq("id", user.id)
      .single();

    const { data: commentRecord, error: insertError } = await supabase
      .from("vendor_comments")
      .insert({
        project_id: projectId,
        user_id: user.id,
        item_index: itemIndex,
        comment,
        comment_type: commentType,
        vendor_company: profile?.company_name ?? null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert comment error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Log activity
    await supabase.from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "vendor_comment_added",
      details: {
        itemIndex,
        commentType,
        vendorCompany: profile?.company_name ?? null,
      },
    });

    return NextResponse.json({ success: true, comment: commentRecord });
  } catch (err) {
    console.error("Comment POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/collaborate/comments?projectId=xxx — get all comments for a project
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

    const { data, error } = await supabase
      .from("vendor_comments")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ comments: data ?? [] });
  } catch (err) {
    console.error("Comments GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/collaborate/comments — resolve/unresolve a comment
 * Body: { commentId, resolved: boolean }
 */
export async function PATCH(req: NextRequest) {
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
    const { commentId, resolved } = body;

    if (!commentId || resolved === undefined) {
      return NextResponse.json(
        { error: "commentId and resolved required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("vendor_comments")
      .update({
        resolved,
        resolved_by: resolved ? user.id : null,
        resolved_at: resolved ? new Date().toISOString() : null,
      })
      .eq("id", commentId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Comment PATCH error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
