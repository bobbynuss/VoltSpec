import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MAX_REFERRALS_PER_MONTH = 2;

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = () =>
    Array.from({ length: 4 }, () => chars[crypto.randomInt(chars.length)]).join("");
  return `VS-${part()}-${part()}`;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, email } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Verify user is Pro
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("status, elliott_sales_rep")
      .eq("user_id", userId)
      .single();

    if (!sub || (sub.status !== "active" && sub.status !== "trialing")) {
      return NextResponse.json({ error: "Pro subscription required" }, { status: 403 });
    }

    const isElliottRep = sub.elliott_sales_rep === true;

    // Elliott Sales Reps get unlimited 7-day trials; regular Pro gets 2/month of 30-day
    if (!isElliottRep) {
      // Count referrals this month
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const { count } = await supabase
        .from("invite_codes")
        .select("*", { count: "exact", head: true })
        .eq("created_by", userId)
        .gte("created_at", monthStart.toISOString());

      if ((count ?? 0) >= MAX_REFERRALS_PER_MONTH) {
        return NextResponse.json(
          { error: `You've used your ${MAX_REFERRALS_PER_MONTH} referral codes this month. Resets on the 1st.` },
          { status: 429 }
        );
      }
    }

    const trialDays = isElliottRep ? 7 : 30;
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const { error } = await supabase.from("invite_codes").insert({
      code,
      created_by: userId,
      expires_at: expiresAt,
      pro_duration_days: trialDays,
      notes: isElliottRep
        ? `Elliott Rep trial from ${email ?? "Sales Rep"}`
        : `Referral from ${email ?? "Pro user"}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (isElliottRep) {
      // Unlimited — no remaining count needed
      return NextResponse.json({ code, remaining: null, unlimited: true, trialDays });
    }

    // Count referrals this month (re-query after insert)
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const { count: newCount } = await supabase
      .from("invite_codes")
      .select("*", { count: "exact", head: true })
      .eq("created_by", userId)
      .gte("created_at", monthStart.toISOString());

    const remaining = MAX_REFERRALS_PER_MONTH - (newCount ?? 0);

    return NextResponse.json({ code, remaining, trialDays });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
