"use client";

import { useState } from "react";
import { X, Gift, Copy, Check, Share2 } from "lucide-react";
import { useAuth } from "./AuthProvider";

interface ReferralModalProps {
  open: boolean;
  onClose: () => void;
}

export function ReferralModal({ open, onClose }: ReferralModalProps) {
  const { user } = useAuth();
  const [code, setCode] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [unlimited, setUnlimited] = useState(false);
  const [trialDays, setTrialDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleGenerate = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/invite/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, email: user.email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setCode(data.code);
        setRemaining(data.remaining);
        setUnlimited(data.unlimited === true);
        setTrialDays(data.trialDays ?? 30);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const shareText = code
    ? `Try VoltSpec Pro free for ${trialDays} days — the best electrical estimating tool out there.\n\nUse my code: ${code}\n\nSign up at: https://voltspec.online/pricing`
    : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch { /* cancelled */ }
    }
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl w-full max-w-sm mx-4 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">Share VoltSpec</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-5 leading-relaxed">
          {unlimited ? (
            <>Give customers a <strong className="text-white">{trialDays}-day VoltSpec Pro trial</strong> — unlimited codes as an Elliott Sales Rep.</>
          ) : (
            <>Give a colleague <strong className="text-white">{trialDays} days of VoltSpec Pro</strong> — free. You get {remaining ?? 2} referral code{remaining !== 1 ? "s" : ""} per month.</>
          )}
        </p>

        {!code ? (
          <>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-bold bg-yellow-400 hover:bg-yellow-300 text-gray-900 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Generating..." : "Generate Referral Code"}
            </button>
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </>
        ) : (
          <div className="space-y-4">
            <div className="bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] rounded-lg p-4 text-center">
              <code className="text-2xl font-mono font-bold text-white tracking-widest">{code}</code>
              <p className="text-xs text-gray-500 mt-2">{trialDays}-day Pro trial · Expires in 30 days if unused</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-yellow-400 hover:bg-yellow-300 text-gray-900 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[hsl(217,33%,15%)] text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {unlimited ? (
              <p className="text-xs text-emerald-400/70 text-center">
                ⚡ Unlimited trial codes — Elliott Sales Rep
              </p>
            ) : remaining !== null ? (
              <p className="text-xs text-gray-500 text-center">
                {remaining} referral{remaining !== 1 ? "s" : ""} remaining this month
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
