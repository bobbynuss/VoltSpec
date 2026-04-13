import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase());

export async function POST(req: NextRequest) {
  try {
    const { adminEmail } = await req.json();

    if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail.toLowerCase())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("invite_codes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // For redeemed codes, look up which users are Elliott sales reps
    const usedUserIds = (data ?? [])
      .filter((c: Record<string, unknown>) => c.used_by)
      .map((c: Record<string, unknown>) => c.used_by as string);

    let repMap: Record<string, boolean> = {};
    if (usedUserIds.length > 0) {
      const { data: subs } = await supabase
        .from("subscriptions")
        .select("user_id, elliott_sales_rep")
        .in("user_id", usedUserIds);

      if (subs) {
        for (const s of subs) {
          repMap[s.user_id] = s.elliott_sales_rep === true;
        }
      }
    }

    return NextResponse.json({ codes: data, repMap });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
