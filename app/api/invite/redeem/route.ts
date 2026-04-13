import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { code, userId, email } = await req.json();

    if (!code || !userId) {
      return NextResponse.json({ error: "Missing code or userId" }, { status: 400 });
    }

    const normalizedCode = code.trim().toUpperCase();

    // Look up the code
    const { data: invite, error: lookupErr } = await supabase
      .from("invite_codes")
      .select("*")
      .eq("code", normalizedCode)
      .single();

    if (lookupErr || !invite) {
      return NextResponse.json({ error: "Invalid invite code" }, { status: 400 });
    }

    if (invite.deactivated) {
      return NextResponse.json({ error: "This code has been deactivated" }, { status: 400 });
    }

    if (invite.used_by) {
      return NextResponse.json({ error: "This code has already been used" }, { status: 400 });
    }

    if (new Date(invite.expires_at) < new Date()) {
      return NextResponse.json({ error: "This code has expired" }, { status: 400 });
    }

    // Mark code as used
    const { error: updateErr } = await supabase
      .from("invite_codes")
      .update({ used_by: userId, used_at: new Date().toISOString() })
      .eq("id", invite.id);

    if (updateErr) {
      return NextResponse.json({ error: "Failed to redeem code" }, { status: 500 });
    }

    // Calculate Pro end date based on duration
    const durationDays = invite.pro_duration_days;
    const periodEnd = durationDays
      ? new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString()
      : new Date("2099-12-31").toISOString(); // lifetime

    const durationLabel = durationDays ? `${durationDays}-day` : "lifetime";

    // Grant Pro access
    const { error: subErr } = await supabase.from("subscriptions").upsert(
      {
        user_id: userId,
        stripe_customer_id: null,
        stripe_subscription_id: `invite:${normalizedCode}`,
        status: "active",
        price_id: `invite_${durationLabel}`,
        current_period_start: new Date().toISOString(),
        current_period_end: periodEnd,
        cancel_at_period_end: false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    if (subErr) {
      console.error("[invite/redeem] Subscription upsert error:", subErr);
      return NextResponse.json({ error: "Failed to activate Pro" }, { status: 500 });
    }

    const msg = durationDays
      ? `Pro access activated for ${durationDays} days!`
      : "Lifetime Pro access activated!";

    return NextResponse.json({ success: true, message: msg, durationDays });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
