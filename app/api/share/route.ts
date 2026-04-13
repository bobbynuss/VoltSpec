import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// POST: Create a share link
export async function POST(req: NextRequest) {
  try {
    const { userId, jobId, city, zip, jobLabel, jurisdiction, resultData } = await req.json();

    if (!jobId || !resultData) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const shareId = crypto.randomBytes(8).toString("hex"); // 16-char hex

    const { error } = await supabase.from("shared_specs").insert({
      share_id: shareId,
      user_id: userId ?? null,
      job_id: jobId,
      city: city ?? null,
      zip: zip ?? null,
      job_label: jobLabel ?? null,
      jurisdiction: jurisdiction ?? null,
      result_data: resultData,
      expires_at: new Date(Date.now() + 90 * 86400000).toISOString(), // 90 days
    });

    if (error) {
      console.error("[share] Insert error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const shareUrl = `${req.nextUrl.origin}/share/${shareId}`;
    return NextResponse.json({ shareId, shareUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
