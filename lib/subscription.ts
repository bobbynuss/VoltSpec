import { supabase } from "./supabase";

export type SubscriptionTier = "free" | "pro";

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

const FREE_STATUS: SubscriptionStatus = {
  tier: "free",
  stripeCustomerId: null,
  stripeSubscriptionId: null,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
};

/**
 * Fetch subscription status for a user from Supabase.
 * Returns "free" if no subscription record exists.
 */
export async function getSubscription(
  userId: string
): Promise<SubscriptionStatus> {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error || !data) return FREE_STATUS;

  const isActive =
    data.status === "active" || data.status === "trialing";
  const isPastDue = data.status === "past_due";

  // If active or past_due (grace period), they're pro
  if (isActive || isPastDue) {
    return {
      tier: "pro",
      stripeCustomerId: data.stripe_customer_id,
      stripeSubscriptionId: data.stripe_subscription_id,
      currentPeriodEnd: data.current_period_end,
      cancelAtPeriodEnd: data.cancel_at_period_end ?? false,
    };
  }

  return FREE_STATUS;
  } catch {
    return FREE_STATUS;
  }
}

// ── Feature gating constants ────────────────────────────────────────

/** Cities available to free users (IDs from jurisdiction configs) */
export const FREE_CITIES = new Set(["austin", "san-antonio"]);

/** Job type IDs available to free users (first 10) */
export const FREE_JOB_IDS = new Set([
  "200a-service-upgrade",
  "new-200a-residential",
  "320a-service",
  "400a-service",
  "100a-subpanel",
  "detached-garage-subpanel",
  "meter-base-replacement",
  "ev-charger-50a",
  "ev-charger-80a",
  "generator-ats",
]);

export function canAccessCity(
  tier: SubscriptionTier,
  cityId: string
): boolean {
  if (tier === "pro") return true;
  return FREE_CITIES.has(cityId);
}

export function canAccessJob(
  tier: SubscriptionTier,
  jobId: string
): boolean {
  if (tier === "pro") return true;
  return FREE_JOB_IDS.has(jobId);
}

export function canSaveProjects(tier: SubscriptionTier): boolean {
  return tier === "pro";
}

export function canWhiteLabelPDF(tier: SubscriptionTier): boolean {
  return tier === "pro";
}
