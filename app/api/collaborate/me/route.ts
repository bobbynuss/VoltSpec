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
 * GET /api/collaborate/me — Get the current user's role and profile info
 * Uses admin client to bypass RLS on user_profiles
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

    // Use admin client for reliable profile lookup
    const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const profileClient = adminKey
      ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, adminKey)
      : supabase;

    const { data: profile } = await profileClient
      .from("user_profiles")
      .select("role, company_name, elliott_store_id, jurisdiction")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      role: profile?.role ?? "contractor",
      companyName: profile?.company_name ?? null,
      elliottStoreId: profile?.elliott_store_id ?? null,
      jurisdiction: profile?.jurisdiction ?? null,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
