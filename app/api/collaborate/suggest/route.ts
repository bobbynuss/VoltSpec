import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";




/**
 * POST /api/collaborate/suggest — submit a master data correction suggestion
 * Body: { projectId, storeId?, jurisdiction?, jobId, itemIndex, itemName, fieldChanged, oldValue, newValue, notes? }
 */
export async function POST(req: NextRequest) {
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

    // Verify user is a sales_rep or admin
    const { data: profile } = await getSupabaseAdmin()
      .from("user_profiles")
      .select("role, elliott_store_id, jurisdiction")
      .eq("id", user.id)
      .single();

    if (!profile || !["sales_rep", "admin"].includes(profile.role ?? "")) {
      return NextResponse.json(
        { error: "Only sales reps and admins can submit suggestions" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      projectId,
      storeId,
      jurisdiction,
      jobId,
      itemIndex,
      itemName,
      fieldChanged,
      oldValue,
      newValue,
      notes,
    } = body;

    if (!jobId || itemIndex === undefined || !itemName || !fieldChanged || !newValue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: suggestion, error: insertError } = await getSupabaseAdmin()
      .from("master_data_suggestions")
      .insert({
        suggested_by: user.id,
        project_id: projectId || null,
        store_id: storeId || profile.elliott_store_id || null,
        jurisdiction: jurisdiction || profile.jurisdiction || null,
        job_id: jobId,
        item_index: itemIndex,
        item_name: itemName,
        field_changed: fieldChanged,
        old_value: oldValue || null,
        new_value: newValue,
        notes: notes || null,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    // Log activity if project context
    if (projectId) {
      await getSupabaseAdmin().from("project_activity").insert({
        project_id: projectId,
        user_id: user.id,
        action: "suggestion_submitted",
        details: {
          suggestionId: suggestion.id,
          itemName,
          field: fieldChanged,
          newValue,
        },
      });
    }

    return NextResponse.json({ success: true, suggestion });
  } catch (err) {
    console.error("Suggest API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/collaborate/suggest — list suggestions (admin only)
 * Query: ?status=pending|approved|rejected
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

    // Verify admin
    const { data: profile } = await getSupabaseAdmin()
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      // Non-admins can only see their own suggestions
      const status = req.nextUrl.searchParams.get("status") ?? "pending";
      const { data, error } = await getSupabaseAdmin()
        .from("master_data_suggestions")
        .select("*")
        .eq("suggested_by", user.id)
        .eq("status", status)
        .order("created_at", { ascending: false });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ suggestions: data });
    }

    // Admins see all
    const status = req.nextUrl.searchParams.get("status") ?? "pending";
    const { data, error } = await getSupabaseAdmin()
      .from("master_data_suggestions")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ suggestions: data });
  } catch (err) {
    console.error("Suggest GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

