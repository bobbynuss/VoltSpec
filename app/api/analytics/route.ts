import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase());

export async function POST(req: NextRequest) {
  try {
    const { adminEmail, days = 30 } = await req.json();

    if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail.toLowerCase())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const since = new Date(Date.now() - days * 86400000).toISOString();

    // All events in period
    const { data: events } = await supabase
      .from("usage_events")
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: false });

    if (!events) return NextResponse.json({ error: "No data" }, { status: 500 });

    // Aggregate
    const totals: Record<string, number> = {};
    const topCities: Record<string, number> = {};
    const topJobs: Record<string, number> = {};
    const uniqueUsers = new Set<string>();
    const dailyCounts: Record<string, number> = {};

    for (const e of events) {
      totals[e.event] = (totals[e.event] ?? 0) + 1;
      if (e.city && e.event === "generate") topCities[e.city] = (topCities[e.city] ?? 0) + 1;
      if (e.job_label && e.event === "generate") topJobs[e.job_label] = (topJobs[e.job_label] ?? 0) + 1;
      if (e.user_id) uniqueUsers.add(e.user_id);
      const day = e.created_at.slice(0, 10);
      dailyCounts[day] = (dailyCounts[day] ?? 0) + 1;
    }

    const sortObj = (obj: Record<string, number>) =>
      Object.entries(obj)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 15)
        .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      totals,
      uniqueUsers: uniqueUsers.size,
      topCities: sortObj(topCities),
      topJobs: sortObj(topJobs),
      dailyCounts,
      eventCount: events.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
