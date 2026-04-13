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
    const { adminEmail, codeId, deactivated = true } = await req.json();

    if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail.toLowerCase())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!codeId) {
      return NextResponse.json({ error: "Missing codeId" }, { status: 400 });
    }

    const { error } = await supabase
      .from("invite_codes")
      .update({ deactivated })
      .eq("id", codeId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
