"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft, Copy, Plus, Check, X, Clock, User, Ban, RotateCcw, Share2 } from "lucide-react";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase());

interface InviteCode {
  id: string;
  code: string;
  created_at: string;
  expires_at: string;
  used_by: string | null;
  used_at: string | null;
  notes: string | null;
  pro_duration_days: number | null;
  deactivated: boolean;
}

const DURATION_OPTIONS = [
  { value: "", label: "Lifetime", desc: "Forever" },
  { value: "7", label: "7-day trial", desc: "1 week" },
  { value: "30", label: "30-day", desc: "1 month" },
  { value: "90", label: "90-day", desc: "3 months" },
  { value: "365", label: "1-year", desc: "12 months" },
];

export default function AdminInvitesPage() {
  const { user, loading: authLoading } = useAuth();
  const [codes, setCodes] = useState<InviteCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [notes, setNotes] = useState("");
  const [count, setCount] = useState(1);
  const [duration, setDuration] = useState("");
  const [newCodes, setNewCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const isAdmin =
    !authLoading && user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  const fetchCodes = useCallback(async () => {
    if (!user?.email) return;
    try {
      const res = await fetch("/api/invite/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail: user.email }),
      });
      const data = await res.json();
      if (data.codes) setCodes(data.codes);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (isAdmin) fetchCodes();
  }, [isAdmin, fetchCodes]);

  const [genError, setGenError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!user?.email) return;
    setGenerating(true);
    setNewCodes([]);
    setGenError(null);
    try {
      const res = await fetch("/api/invite/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminEmail: user.email,
          notes: notes || undefined,
          count,
          proDurationDays: duration ? parseInt(duration) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setGenError(data.error ?? `Failed (${res.status})`);
        console.error("[admin/invites] Generate failed:", data);
        return;
      }
      if (data.codes?.length) {
        setNewCodes(data.codes);
        setNotes("");
        fetchCodes();
      } else {
        setGenError("No codes returned");
      }
    } catch (err) {
      console.error("[admin/invites] Generate error:", err);
      setGenError("Network error");
    } finally {
      setGenerating(false);
    }
  };

  const handleDeactivate = async (codeId: string, deactivated: boolean) => {
    if (!user?.email) return;
    try {
      await fetch("/api/invite/deactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail: user.email, codeId, deactivated }),
      });
      fetchCodes();
    } catch {
      // silent
    }
  };

  const shareCode = async (code: string, durationDays: number | null) => {
    const durText = durationDays ? `${durationDays}-day` : "lifetime";
    const text = `You're invited to VoltSpec Pro (${durText} access)!\n\nYour code: ${code}\n\nRedeem at: https://voltspec.online/pricing`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }
    navigator.clipboard.writeText(text);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[hsl(222,47%,7%)] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[hsl(222,47%,7%)] flex flex-col items-center justify-center text-center px-4">
        <p className="text-2xl font-bold text-white mb-2">Access Denied</p>
        <p className="text-gray-400 mb-6">This page is for administrators only.</p>
        <Link href="/app" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
          ← Back to App
        </Link>
      </div>
    );
  }

  const unused = codes.filter((c) => !c.used_by);
  const used = codes.filter((c) => c.used_by);
  const expired = unused.filter((c) => new Date(c.expires_at) < new Date());

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)]">
      {/* Header */}
      <header className="border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-4 py-4 flex items-center gap-3">
        <Link href="/app" className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to App</span>
        </Link>
        <div className="ml-auto text-sm text-gray-500">Admin</div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-2">Invite Codes</h1>
        <p className="text-gray-400 text-sm mb-8">
          Generate one-time Pro invite codes for Elliott employees and approved users.
          Codes expire after 30 days if unused.
        </p>

        {/* Generate section */}
        <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-5 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Generate New Codes</h2>
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes (e.g., 'Elliott Austin counter staff')"
              className="flex-1 px-3 py-2.5 rounded-lg text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="px-3 py-2.5 rounded-lg text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              {DURATION_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="px-3 py-2.5 rounded-lg text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              {[1, 2, 3, 5, 10, 20].map((n) => (
                <option key={n} value={n}>
                  {n} code{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-5 py-2.5 rounded-lg text-sm font-bold bg-yellow-400 hover:bg-yellow-300 text-gray-900 transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {generating ? "Generating..." : "Generate"}
            </button>
          </div>

          {genError && (
            <p className="text-red-400 text-sm mt-2">❌ {genError}</p>
          )}

          {/* Newly generated codes */}
          {newCodes.length > 0 && (
            <div className="mt-4 p-4 bg-emerald-950/30 border border-emerald-800/30 rounded-lg">
              <p className="text-emerald-400 text-sm font-semibold mb-2">
                ✅ {newCodes.length} code{newCodes.length > 1 ? "s" : ""} generated:
              </p>
              <div className="space-y-2">
                {newCodes.map((code) => (
                  <div key={code} className="flex items-center gap-3">
                    <code className="text-lg font-mono font-bold text-white tracking-wider">{code}</code>
                    <button
                      onClick={() => shareCode(code, duration ? parseInt(duration) : null)}
                      className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                      title="Share"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyCode(code)}
                      className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                      title="Copy"
                    >
                      {copied === code ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{codes.length}</div>
            <div className="text-xs text-gray-400 mt-1">Total</div>
          </div>
          <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{used.length}</div>
            <div className="text-xs text-gray-400 mt-1">Redeemed</div>
          </div>
          <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">{unused.length - expired.length}</div>
            <div className="text-xs text-gray-400 mt-1">Available</div>
          </div>
        </div>

        {/* Code list */}
        {loading ? (
          <p className="text-gray-500 text-sm">Loading codes...</p>
        ) : codes.length === 0 ? (
          <p className="text-gray-500 text-sm">No codes generated yet.</p>
        ) : (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white mb-3">All Codes</h2>
            {codes.map((c) => {
              const isUsed = !!c.used_by;
              const isDeactivated = c.deactivated;
              const isExpired = !isUsed && !isDeactivated && new Date(c.expires_at) < new Date();
              const isActive = !isUsed && !isDeactivated && !isExpired;
              const durLabel = c.pro_duration_days ? `${c.pro_duration_days}d` : "∞";
              return (
                <div
                  key={c.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                    isUsed
                      ? "bg-emerald-950/20 border-emerald-800/20"
                      : isDeactivated
                        ? "bg-gray-950/30 border-gray-800/20 opacity-50"
                        : isExpired
                          ? "bg-red-950/20 border-red-800/20 opacity-60"
                          : "bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]"
                  }`}
                >
                  <code className="font-mono font-bold text-sm text-white tracking-wider min-w-[130px]">
                    {c.code}
                  </code>

                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[hsl(217,33%,15%)] text-gray-400">
                    {durLabel}
                  </span>

                  {isUsed ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                      <User className="w-3 h-3" />
                      Redeemed {new Date(c.used_at!).toLocaleDateString()}
                    </span>
                  ) : isDeactivated ? (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Ban className="w-3 h-3" />
                      Deactivated
                    </span>
                  ) : isExpired ? (
                    <span className="flex items-center gap-1 text-xs text-red-400">
                      <X className="w-3 h-3" />
                      Expired
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      Expires {new Date(c.expires_at).toLocaleDateString()}
                    </span>
                  )}

                  {c.notes && (
                    <span className="text-xs text-gray-600 truncate max-w-[180px]">
                      {c.notes}
                    </span>
                  )}

                  <div className="ml-auto flex items-center gap-2">
                    {isActive && (
                      <>
                        <button
                          onClick={() => shareCode(c.code, c.pro_duration_days)}
                          className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                          title="Share code"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => copyCode(c.code)}
                          className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                          title="Copy code"
                        >
                          {copied === c.code ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeactivate(c.id, true)}
                          className="text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Deactivate"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {isDeactivated && !isUsed && (
                      <button
                        onClick={() => handleDeactivate(c.id, false)}
                        className="text-gray-500 hover:text-emerald-400 transition-colors cursor-pointer"
                        title="Reactivate"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
