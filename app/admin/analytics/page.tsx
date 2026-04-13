"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft, BarChart3, Users, Zap, FileText, MapPin, Briefcase } from "lucide-react";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase());

interface Analytics {
  totals: Record<string, number>;
  uniqueUsers: number;
  topCities: { name: string; count: number }[];
  topJobs: { name: string; count: number }[];
  dailyCounts: Record<string, number>;
  eventCount: number;
}

export default function AnalyticsPage() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const isAdmin =
    !authLoading && user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  useEffect(() => {
    if (!isAdmin || !user?.email) return;
    setLoading(true);
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminEmail: user.email, days }),
    })
      .then((r) => r.json())
      .then((d) => { if (!d.error) setData(d); })
      .finally(() => setLoading(false));
  }, [isAdmin, user?.email, days]);

  if (authLoading) return <Loading />;
  if (!isAdmin) return <Denied />;

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)]">
      <header className="border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-4 py-4 flex items-center gap-3">
        <Link href="/admin/invites" className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Invite Codes</span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <BarChart3 className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold text-white">Analytics</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Usage Analytics</h1>
          <select
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="px-3 py-2 rounded-lg text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : !data ? (
          <p className="text-gray-500">No data yet. Events are tracked when users generate specs.</p>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <StatCard icon={<Zap className="w-5 h-5" />} label="Generates" value={data.totals.generate ?? 0} color="text-yellow-400" />
              <StatCard icon={<FileText className="w-5 h-5" />} label="PDF Exports" value={(data.totals.pdf_export ?? 0) + (data.totals.jobsheet_export ?? 0)} color="text-emerald-400" />
              <StatCard icon={<Users className="w-5 h-5" />} label="Unique Users" value={data.uniqueUsers} color="text-blue-400" />
              <StatCard icon={<BarChart3 className="w-5 h-5" />} label="Total Events" value={data.eventCount} color="text-gray-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {/* Top Cities */}
              <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Top Cities</h2>
                </div>
                {data.topCities.length === 0 ? (
                  <p className="text-gray-500 text-sm">No data yet</p>
                ) : (
                  <div className="space-y-2">
                    {data.topCities.map((c, i) => (
                      <div key={c.name} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-5 text-right">{i + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-300 truncate">{c.name}</span>
                            <span className="text-xs text-yellow-400 font-bold ml-2">{c.count}</span>
                          </div>
                          <div className="h-1.5 bg-[hsl(217,33%,15%)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400/60 rounded-full"
                              style={{ width: `${(c.count / data.topCities[0].count) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top Jobs */}
              <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-4 h-4 text-yellow-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Top Job Types</h2>
                </div>
                {data.topJobs.length === 0 ? (
                  <p className="text-gray-500 text-sm">No data yet</p>
                ) : (
                  <div className="space-y-2">
                    {data.topJobs.map((j, i) => (
                      <div key={j.name} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-5 text-right">{i + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-300 truncate">{j.name}</span>
                            <span className="text-xs text-emerald-400 font-bold ml-2">{j.count}</span>
                          </div>
                          <div className="h-1.5 bg-[hsl(217,33%,15%)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-400/60 rounded-full"
                              style={{ width: `${(j.count / data.topJobs[0].count) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-4">
      <div className={`${color} mb-2`}>{icon}</div>
      <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}

function Loading() {
  return <div className="min-h-screen bg-[hsl(222,47%,7%)] flex items-center justify-center text-gray-400">Loading...</div>;
}

function Denied() {
  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)] flex flex-col items-center justify-center text-center px-4">
      <p className="text-2xl font-bold text-white mb-2">Access Denied</p>
      <Link href="/app" className="text-yellow-400 hover:text-yellow-300 text-sm">← Back to App</Link>
    </div>
  );
}
