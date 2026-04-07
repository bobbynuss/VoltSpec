import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { BROWNSVILLE_SUPPLIERS } from "./suppliers";
import { BROWNSVILLE_OFFICIAL_DOCS } from "./official-docs";
import { BROWNSVILLE_PRICES } from "./pricing";

/**
 * Brownsville / AEP Texas Central jobs inherit San Antonio BR-series
 * definitions with Brownsville-specific suppliers, official docs, utility refs,
 * and local meter socket default (UATRS213CFLCH).
 *
 * Pricing: derived from Elliott Electric Supply Brownsville (Store 151) invoices.
 * Default 200A meter socket: UATRS213CFLCH (200A AL meter socket OH/UG).
 * BR-series breakers and loadcenters are standard.
 */

/* ── Brownsville 200A Meter Socket ─────────────────────────────── */
const BROWNSVILLE_200A_METER: MaterialItem = {
  item: "200A Meter Socket",
  quantity: "1",
  spec: "Eaton UATRS213CFLCH - 200A aluminum enclosure meter socket, OH/UG, UL listed, AEP Texas Central approved",
  unitPrice: 119.88,
};

/* ── Helpers ────────────────────────────────────────────────────── */

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function brownsvillePrice(mat: MaterialItem): number | undefined {
  for (const cat of Object.keys(BROWNSVILLE_PRICES)) {
    const re = new RegExp(
      `(?:^|[^A-Za-z0-9])${escapeRegex(cat)}(?=$|[^A-Za-z0-9])`,
    );
    if (re.test(mat.spec) || re.test(mat.item)) {
      return BROWNSVILLE_PRICES[cat];
    }
  }
  return undefined;
}

/** Is this a 200A meter socket line? */
function is200AMeterSocket(mat: MaterialItem): boolean {
  return (
    /200A.*(?:meter|ringless)/i.test(mat.item) ||
    /1009874ACH|U5135-XL-200|UTRS213|UATRS213/i.test(mat.spec)
  );
}

/**
 * Force the correct Brownsville meter socket into the materials list:
 * - Replace any existing SA 200A meter socket with the Brownsville default
 * - If no 200A meter socket exists in a 200A job, inject one at the top
 */
function forceMeterSocket(materials: MaterialItem[], jobId: string): MaterialItem[] {
  const is200AJob = /200a|meter-base|span-panel-upgrade|temp-power/i.test(jobId);
  if (!is200AJob) return materials;

  let replaced = false;
  const result = materials.map((mat) => {
    if (is200AMeterSocket(mat)) {
      replaced = true;
      return { ...BROWNSVILLE_200A_METER };
    }
    return mat;
  });

  // If no meter socket was found to replace, inject at position 1 (after panel)
  if (!replaced) {
    result.splice(1, 0, { ...BROWNSVILLE_200A_METER });
  }

  return result;
}

function applyBrownsvillePricing(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
    // Don't overwrite the forced meter socket price
    if (is200AMeterSocket(mat)) return mat;
    const price = brownsvillePrice(mat);
    if (price !== undefined) {
      return { ...mat, unitPrice: price };
    }
    return mat;
  });
}

function patchRequirements(reqs: string[]): string[] {
  return reqs.map((r) =>
    r
      .replace(/CPS Energy/g, "AEP Texas Central")
      .replace(/\bCPS\b/g, "AEP Texas")
      .replace(/City of San Antonio/g, "City of Brownsville")
      .replace(/\(210\) 353-4050/g, "(877) 373-4858")
      .replace(/\(210\) 353-2222/g, "(877) 373-4858")
      .replace(/Eaton 1009874ACH/g, "Eaton UATRS213CFLCH")
      .replace(/Milbank U5135-XL-200/g, "Eaton UATRS213CFLCH")
      .replace(/CPS-approved ringless type/g, "AEP Texas Central approved meter socket")
      .replace(/approved ringless type/g, "approved meter socket (UATRS213CFLCH)"),
  );
}

function patchBlueprintNotes(notes: string[] | undefined): string[] | undefined {
  if (!notes) return notes;
  return notes.map((n) =>
    n
      .replace(/CPS Energy/g, "AEP Texas Central")
      .replace(/\bCPS\b/g, "AEP Texas")
      .replace(/Eaton 1009874ACH/g, "Eaton UATRS213CFLCH")
      .replace(/1009874ACH/g, "UATRS213CFLCH")
      .replace(/Milbank U5135-XL-200/g, "Eaton UATRS213CFLCH")
      .replace(/200A ringless/g, "200A meter socket")
      .replace(/\(210\) 353-4050/g, "(877) 373-4858"),
  );
}

function patchSvg(svg: string | undefined): string | undefined {
  if (!svg) return svg;
  return svg
    .replace(/CPS Energy/g, "AEP Texas")
    .replace(/\bCPS\b/g, "AEP Texas")
    .replace(/1009874ACH/g, "UATRS213CFLCH")
    .replace(/200A ringless/g, "200A meter socket")
    .replace(/Milbank U5135-XL-200/g, "UATRS213CFLCH");
}

export const BROWNSVILLE_JOBS: Job[] = SA_JOBS.map((job) => ({
  ...job,
  materials: applyBrownsvillePricing(forceMeterSocket(job.materials, job.id)),
  requirements: patchRequirements(job.requirements),
  blueprintNotes: patchBlueprintNotes(job.blueprintNotes),
  svgDiagram: patchSvg(job.svgDiagram),
  suppliers: BROWNSVILLE_SUPPLIERS,
  officialDocs: BROWNSVILLE_OFFICIAL_DOCS,
}));
