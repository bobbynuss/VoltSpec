"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, X, ArrowLeft, Zap, Crown } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useSubscription } from "@/components/SubscriptionProvider";
import { AuthModal } from "@/components/AuthModal";

const MONTHLY_PRICE_ID =
  process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_ID ?? "price_1TLVEK2O5006XVfSZ8XIDdPR";
const ANNUAL_PRICE_ID =
  process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL_ID ?? "price_1TLVEK2O5006XVfSuVpweKAQ";

export default function PricingPage() {
  const { user } = useAuth();
  const { tier, loading: subLoading } = useSubscription();
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }

    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          email: user.email,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const priceId = billing === "monthly" ? MONTHLY_PRICE_ID : ANNUAL_PRICE_ID;

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)]">
      {/* Nav */}
      <header className="border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-4 py-4 flex items-center gap-3">
        <Link href="/app" className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to App</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Image src="/logo-transparent.png" alt="VoltSpec" width={24} height={24} className="w-6 h-6" />
          <span className="text-lg font-bold text-white tracking-tight">
            Volt<span className="text-yellow-400">Spec</span>
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Simple pricing, serious tool
          </h1>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Free gets you started. Pro unlocks everything.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-lg p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                billing === "monthly"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                billing === "annual"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Annual
              <span className="ml-1.5 text-xs opacity-80">Save 31%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-bold text-white">Free</h2>
            </div>
            <p className="text-gray-500 text-sm mb-6">Get started estimating</p>

            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">$0</span>
              <span className="text-gray-500 text-sm ml-1">forever</span>
            </div>

            {tier === "free" && !subLoading ? (
              <div className="w-full py-3 rounded-lg text-center text-sm font-semibold bg-[hsl(217,33%,15%)] text-gray-400 mb-8">
                Current Plan
              </div>
            ) : (
              <Link
                href="/app"
                className="w-full py-3 rounded-lg text-center text-sm font-semibold bg-[hsl(217,33%,15%)] text-gray-300 hover:text-white transition-colors mb-8 block"
              >
                Get Started
              </Link>
            )}

            <ul className="space-y-3 flex-1">
              <Feature included text="Austin + San Antonio jurisdictions" />
              <Feature included text="10 job types" />
              <Feature included text="Materials lists & NEC requirements" />
              <Feature included text="SVG blueprints" />
              <Feature included text="PDF export" />
              <Feature text="All 74 jurisdictions" />
              <Feature text="All 29 job types" />
              <Feature text="Saved projects" />
              <Feature text="White-label PDF" />
            </ul>
          </div>

          {/* Pro */}
          <div className="bg-[hsl(222,47%,10%)] border-2 border-yellow-400/50 rounded-2xl p-6 sm:p-8 flex flex-col relative">
            <div className="absolute -top-3 right-6 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
              RECOMMENDED
            </div>

            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Pro</h2>
            </div>
            <p className="text-gray-500 text-sm mb-6">Full access, every market</p>

            <div className="mb-6">
              {billing === "monthly" ? (
                <>
                  <span className="text-4xl font-extrabold text-white">$24</span>
                  <span className="text-gray-500 text-sm ml-1">/month</span>
                </>
              ) : (
                <>
                  <span className="text-4xl font-extrabold text-white">$199</span>
                  <span className="text-gray-500 text-sm ml-1">/year</span>
                  <p className="text-yellow-400/70 text-xs mt-1">That&apos;s $16.58/mo — save $89/year</p>
                </>
              )}
            </div>

            {tier === "pro" && !subLoading ? (
              <div className="w-full py-3 rounded-lg text-center text-sm font-semibold bg-yellow-400/20 text-yellow-400 mb-8">
                ✓ You&apos;re on Pro
              </div>
            ) : (
              <button
                onClick={() => handleCheckout(priceId)}
                disabled={checkoutLoading}
                className="w-full py-3 rounded-lg text-center text-sm font-bold bg-yellow-400 hover:bg-yellow-300 text-gray-900 transition-colors mb-8 disabled:opacity-50 cursor-pointer"
              >
                {checkoutLoading ? "Loading..." : "Upgrade to Pro"}
              </button>
            )}

            <ul className="space-y-3 flex-1">
              <Feature included text="All 74 jurisdictions across 14 states" />
              <Feature included text="All 29 job types" />
              <Feature included text="Materials lists & NEC requirements" />
              <Feature included text="SVG blueprints" />
              <Feature included text="PDF export" />
              <Feature included highlight text="Saved projects (cloud sync)" />
              <Feature included highlight text="White-label PDF option" />
              <Feature included highlight text="Priority support" />
            </ul>
          </div>
        </div>

        {/* FAQ or note */}
        <p className="text-center text-gray-600 text-sm mt-10 max-w-md mx-auto">
          Cancel anytime. Subscriptions managed through Stripe.
          Questions? Email support@voltspec.online
        </p>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

function Feature({
  text,
  included = false,
  highlight = false,
}: {
  text: string;
  included?: boolean;
  highlight?: boolean;
}) {
  return (
    <li className="flex items-start gap-2.5">
      {included ? (
        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${highlight ? "text-yellow-400" : "text-emerald-400"}`} />
      ) : (
        <X className="w-4 h-4 shrink-0 mt-0.5 text-gray-600" />
      )}
      <span className={`text-sm ${included ? (highlight ? "text-yellow-300" : "text-gray-300") : "text-gray-600"}`}>
        {text}
      </span>
    </li>
  );
}
