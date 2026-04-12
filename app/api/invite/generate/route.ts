import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase());

function generateCode(): string {
  // Format: VS-XXXX-XXXX (easy to read/share)
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O/0/I/1
  const part = () =>
    Array.from({ length: 4 }, () => chars[crypto.randomInt(chars.length)]).join("");
  return `VS-${part()}-${part()}`;
}

export async function POST(req: NextRequest) {
  try {
    const { adminEmail, notes, count = 1 } = await req.json();

    if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail.toLowerCase())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const codes: string[] = [];
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    for (let i = 0; i < Math.min(count, 50); i++) {
      const code = generateCode();
      const { error } = await supabase.from("invite_codes").insert({
        code,
        expires_at: expiresAt,
        notes: notes || null,
      });
      if (!error) codes.push(code);
    }

    return NextResponse.json({ codes, expiresAt });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
