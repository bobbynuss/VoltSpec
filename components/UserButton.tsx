"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useSubscription } from "./SubscriptionProvider";
import { AuthModal } from "./AuthModal";
import { ProfileModal } from "./ProfileModal";
import { User, LogOut, ChevronDown, Settings, CreditCard, Crown, Shield, Gift, BarChart3, ArrowUpCircle } from "lucide-react";
import { ReferralModal } from "./ReferralModal";
import Link from "next/link";

export function UserButton() {
  const { user, loading, signOut } = useAuth();
  const { tier, subscription } = useSubscription();
  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  if (loading) return null;

  if (!user) {
    return (
      <>
        <button
          onClick={() => setAuthOpen(true)}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-yellow-400 transition-colors font-medium min-h-[44px] px-2 cursor-pointer"
        >
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Log In</span>
        </button>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase());
  const isAdmin = user.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  const displayEmail = user.email ?? "User";
  const shortEmail =
    displayEmail.length > 20
      ? displayEmail.slice(0, 17) + "..."
      : displayEmail;

  const handleManageSubscription = async () => {
    if (!subscription?.stripeCustomerId) return;
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: subscription.stripeCustomerId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Portal error:", err);
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-yellow-400 transition-colors font-medium min-h-[44px] px-2 cursor-pointer"
      >
        <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center">
          <span className="text-[10px] text-yellow-400 font-bold">
            {displayEmail[0].toUpperCase()}
          </span>
        </div>
        <span className="hidden sm:inline">{shortEmail}</span>
        {tier === "pro" && (
          <Crown className="w-3 h-3 text-yellow-400" />
        )}
        <ChevronDown className="w-3 h-3" />
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-full mt-1 w-52 bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-lg shadow-xl py-1 z-50">
          <div className="px-3 py-2 border-b border-[hsl(217,33%,18%)]">
            <p className="text-xs text-gray-400 truncate">{displayEmail}</p>
            <p className="text-[10px] mt-0.5 font-semibold">
              {tier === "pro" ? (
                <span className="text-yellow-400">⚡ Pro Plan</span>
              ) : (
                <span className="text-gray-500">Free Plan</span>
              )}
            </p>
          </div>
          <button
            onClick={() => {
              setProfileOpen(true);
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-yellow-400 hover:bg-[hsl(217,33%,14%)] transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            Profile & Sales Rep
          </button>
          {isAdmin && (
            <>
              <Link
                href="/admin/invites"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-yellow-400 hover:bg-[hsl(217,33%,14%)] transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                Invite Codes
              </Link>
              <Link
                href="/admin/analytics"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-yellow-400 hover:bg-[hsl(217,33%,14%)] transition-colors"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Analytics
              </Link>
              <Link
                href="/admin/suggestions"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-amber-400 hover:text-amber-300 hover:bg-[hsl(217,33%,14%)] transition-colors"
              >
                <ArrowUpCircle className="w-3.5 h-3.5" />
                Master Updates
              </Link>
            </>
          )}
          {tier === "pro" && (
            <button
              onClick={() => {
                setReferralOpen(true);
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-yellow-400 hover:bg-[hsl(217,33%,14%)] transition-colors cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5" />
              Share VoltSpec
            </button>
          )}
          {tier === "pro" && subscription?.stripeCustomerId ? (
            <button
              onClick={() => {
                handleManageSubscription();
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-yellow-400 hover:bg-[hsl(217,33%,14%)] transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Manage Subscription
            </button>
          ) : (
            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-400 hover:bg-[hsl(217,33%,14%)] transition-colors"
            >
              <Crown className="w-3.5 h-3.5" />
              Upgrade to Pro
            </Link>
          )}
          <button
            onClick={() => {
              signOut();
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-[hsl(217,33%,14%)] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </div>
      )}
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
      <ReferralModal open={referralOpen} onClose={() => setReferralOpen(false)} />
    </div>
  );
}
