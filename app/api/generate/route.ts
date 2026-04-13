import { NextRequest, NextResponse } from "next/server";
import { getJobById } from "@/lib/data";
import { getTrade } from "@/lib/registry";

export async function POST(req: NextRequest) {
  try {
    const { jobId, zip, city, trade: tradeId } = await req.json();
    if (!jobId) {
      return NextResponse.json({ error: "jobId required" }, { status: 400 });
    }

    const trade = getTrade(tradeId ?? "electrical");

    // Resolve jurisdiction: explicit city > zip-based lookup > default
    const jurisdiction = city
      ? trade.getJurisdictionById(city)
      : zip
        ? trade.getJurisdictionByZip(zip)
        : undefined;

    // Look up the job within the jurisdiction
    let job;
    if (jurisdiction) {
      job = trade.getJobForJurisdiction(jurisdiction.id, jobId);
    }
    // Fallback: try electrical Austin jobs directly (backward compat)
    if (!job) {
      job = getJobById(jobId);
    }

    if (!job) {
      return NextResponse.json({ error: "Job type not found" }, { status: 404 });
    }

    const jurisdictionLabel = jurisdiction?.label ?? "Austin, TX (Travis County)";
    const codeRef = tradeId === "plumbing" ? "IPC 2021" : "NEC 2026";

    return NextResponse.json({
      job,
      jurisdiction: jurisdictionLabel,
      city: jurisdiction?.id ?? "austin",
      trade: trade.id,
      generatedAt: new Date().toISOString(),
      disclaimer:
        `⚠️ NOT ENGINEERING ADVICE. Always verify all requirements with your local Authority Having Jurisdiction (AHJ) before any installation. ${codeRef} amendments vary by jurisdiction. This tool is for reference only.`,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
