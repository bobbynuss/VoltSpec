import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { priceId, userId, email } = await req.json();

    if (!priceId || !userId || !email) {
      return NextResponse.json(
        { error: "Missing priceId, userId, or email" },
        { status: 400 }
      );
    }

    // Check if user already has a Stripe customer ID
    const { data: existing } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .single();

    let customerId = existing?.stripe_customer_id;

    // Create Stripe customer if needed
    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: { supabase_user_id: userId },
      });
      customerId = customer.id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.nextUrl.origin}/app?upgraded=true`,
      cancel_url: `${req.nextUrl.origin}/pricing`,
      subscription_data: {
        metadata: { supabase_user_id: userId },
      },
      metadata: { supabase_user_id: userId },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe/checkout] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
