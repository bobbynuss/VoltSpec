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
 * POST /api/collaborate/suggest — submit a master data correction suggestion
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

    // Check role
    const { data: profile } = await supabase
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
      projectId, storeId, jurisdiction, jobId,
      itemIndex, itemName, fieldChanged, oldValue, newValue, notes,
    } = body;

    if (!jobId || itemIndex === undefined || !itemName || !fieldChanged || !newValue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: suggestion, error: insertError } = await supabase
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
      console.error("Insert suggestion error:", insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    // Log activity if project context
    if (projectId) {
      await supabase.from("project_activity").insert({
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
    console.error("Suggest POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/collaborate/suggest — list suggestions
 * Query: ?status=pending|approved|rejected
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

    const status = req.nextUrl.searchParams.get("status") ?? "pending";

    // RLS handles visibility — users see their own, admins see all
    const { data, error } = await supabase
      .from("master_data_suggestions")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("List suggestions error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ suggestions: data ?? [] });
  } catch (err) {
    console.error("Suggest GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
