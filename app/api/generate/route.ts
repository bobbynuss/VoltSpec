import { NextRequest, NextResponse } from "next/server";
import {
  getJobById,
  getJobForJurisdiction,
  getJurisdictionById,
  getJurisdictionByZip,
} from "@/lib/data";
import { applySpanOverride, SPAN_ELIGIBLE_JOBS } from "@/lib/data/span-overrides";

export async function POST(req: NextRequest) {
  try {
    const { jobId, zip, city, panelType } = await req.json();
    if (!jobId) {
      return NextResponse.json({ error: "jobId required" }, { status: 400 });
    }

    // Resolve jurisdiction: explicit city > zip-based lookup > default (Austin)
    const jurisdiction = city
      ? getJurisdictionById(city)
      : zip
        ? getJurisdictionByZip(zip)
        : undefined;

    // If a jurisdiction was resolved, look up the job within it
    let job;
    if (jurisdiction) {
      job = getJobForJurisdiction(jurisdiction.id, jobId);
    }
    // Fallback: try Austin jobs directly (backward compat)
    if (!job) {
      job = getJobById(jobId);
    }

    if (!job) {
      return NextResponse.json({ error: "Job type not found" }, { status: 404 });
    }

    // Apply SPAN panel override if requested
    if (panelType === "span" && SPAN_ELIGIBLE_JOBS.has(job.id)) {
      job = applySpanOverride(job);
    }

    const jurisdictionLabel = jurisdiction?.label ?? "Austin, TX (Travis County)";

    return NextResponse.json({
      job,
      jurisdiction: jurisdictionLabel,
      city: jurisdiction?.id ?? "austin",
      generatedAt: new Date().toISOString(),
      disclaimer:
        "⚠️ NOT ENGINEERING ADVICE. Always verify all requirements with your local Authority Having Jurisdiction (AHJ) before any installation. NEC amendments vary by jurisdiction. This tool is for reference only.",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
