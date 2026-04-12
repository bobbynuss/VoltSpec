import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";

// Use service role or anon key — for webhook we need write access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Disable body parsing — Stripe needs the raw body for signature verification
export const dynamic = "force-dynamic";

async function upsertSubscription(subscription: Stripe.Subscription) {
  const userId =
    subscription.metadata?.supabase_user_id ??
    (typeof subscription.customer === "string"
      ? undefined
      : undefined);

  if (!userId) {
    console.warn("[webhook] No supabase_user_id in subscription metadata");
    return;
  }

  const item = subscription.items.data[0];
  const sub = subscription as unknown as Record<string, unknown>;

  // Stripe API versions vary — handle both old and new property names
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : (subscription.customer as { id: string }).id;
  const periodStart = (sub.current_period_start ?? sub.currentPeriodStart) as number | undefined;
  const periodEnd = (sub.current_period_end ?? sub.currentPeriodEnd) as number | undefined;
  const cancelAtEnd = (sub.cancel_at_period_end ?? sub.cancelAtPeriodEnd) as boolean | undefined;

  await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      price_id: item?.price?.id ?? null,
      current_period_start: periodStart
        ? new Date(periodStart * 1000).toISOString()
        : null,
      current_period_end: periodEnd
        ? new Date(periodEnd * 1000).toISOString()
        : null,
      cancel_at_period_end: cancelAtEnd ?? false,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[webhook] Signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await upsertSubscription(subscription);
        break;
      }
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // If subscription was created via checkout, it's handled by subscription.created
        // But let's ensure customer mapping exists
        if (session.subscription && session.metadata?.supabase_user_id) {
          const sub = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          // Ensure metadata is on the subscription too
          if (!sub.metadata?.supabase_user_id) {
            await stripe.subscriptions.update(sub.id, {
              metadata: {
                supabase_user_id: session.metadata.supabase_user_id,
              },
            });
          }
          await upsertSubscription({
            ...sub,
            metadata: {
              ...sub.metadata,
              supabase_user_id: session.metadata.supabase_user_id,
            },
          });
        }
        break;
      }
    }
  } catch (err) {
    console.error("[webhook] Processing error:", err);
  }

  return NextResponse.json({ received: true });
}
