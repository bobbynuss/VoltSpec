import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { ELPASO_SUPPLIERS } from "./suppliers";
import { ELPASO_OFFICIAL_DOCS } from "./official-docs";
import { ELPASO_PRICES } from "./pricing";

/**
 * El Paso / El Paso Electric jobs inherit San Antonio BR-series definitions
 * with El Paso-specific suppliers, official docs, utility references, and
 * local meter socket default (MBE2040B200BTS).
 *
 * Pricing: derived from Elliott Electric Supply El Paso (Store 191) invoices.
 * Default 200A meter socket: MBE2040B200BTS (BR EUSERC 200A meter-breaker 20/40).
 * BR-series breakers and loadcenters are standard.
 */

/* ── El Paso 200A Meter-Breaker ────────────────────────────────── */
const ELPASO_200A_METER: MaterialItem = {
  item: "200A BR Meter-Breaker",
  quantity: "1",
  spec: "Eaton MBE2040B200BTS - BR EUSERC 200A main breaker meter combo, 20/40 circuit, bottom/top feed, El Paso Electric approved",
  unitPrice: 265.07,
};

/* ── Helpers ────────────────────────────────────────────────────── */

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function elpasoPrice(mat: MaterialItem): number | undefined {
  for (const cat of Object.keys(ELPASO_PRICES)) {
    const re = new RegExp(
      `(?:^|[^A-Za-z0-9])${escapeRegex(cat)}(?=$|[^A-Za-z0-9])`,
    );
    if (re.test(mat.spec) || re.test(mat.item)) {
      return ELPASO_PRICES[cat];
    }
  }
  return undefined;
}

/** Is this a 200A meter socket line? */
function is200AMeterSocket(mat: MaterialItem): boolean {
  return (
    /200A.*(?:meter|ringless)/i.test(mat.item) ||
    /1009874ACH|U5135-XL-200|UTRS213|UATRS213|MBE2040B200/i.test(mat.spec)
  );
}

/**
 * Force the correct El Paso meter-breaker into the materials list:
 * - Replace any existing SA 200A meter socket with El Paso default
 * - If no 200A meter socket exists in a 200A job, inject one at the top
 */
function forceMeterSocket(materials: MaterialItem[], jobId: string): MaterialItem[] {
  const is200AJob = /200a|meter-base|span-panel-upgrade|temp-power/i.test(jobId);
  if (!is200AJob) return materials;

  let replaced = false;
  const result = materials.map((mat) => {
    if (is200AMeterSocket(mat)) {
      replaced = true;
      return { ...ELPASO_200A_METER };
    }
    return mat;
  });

  // If no meter socket was found to replace, inject at position 1 (after panel)
  if (!replaced) {
    result.splice(1, 0, { ...ELPASO_200A_METER });
  }

  return result;
}

function applyElpasoPricing(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
    // Don't overwrite the forced meter-breaker price
    if (is200AMeterSocket(mat)) return mat;
    const price = elpasoPrice(mat);
    if (price !== undefined) {
      return { ...mat, unitPrice: price };
    }
    return mat;
  });
}

function patchRequirements(reqs: string[]): string[] {
  return reqs.map((r) =>
    r
      .replace(/CPS Energy/g, "El Paso Electric")
      .replace(/\bCPS\b/g, "EPE")
      .replace(/City of San Antonio/g, "City of El Paso")
      .replace(/\(210\) 353-4050/g, "(915) 543-5711")
      .replace(/\(210\) 353-2222/g, "(915) 543-5711")
      .replace(/Eaton 1009874ACH/g, "Eaton MBE2040B200BTS")
      .replace(/Milbank U5135-XL-200/g, "Eaton MBE2040B200BTS")
      .replace(/CPS-approved ringless type/g, "El Paso Electric approved BR meter-breaker type")
      .replace(/approved ringless type/g, "approved BR meter-breaker (MBE2040B200BTS)"),
  );
}

function patchBlueprintNotes(notes: string[] | undefined): string[] | undefined {
  if (!notes) return notes;
  return notes.map((n) =>
    n
      .replace(/CPS Energy/g, "El Paso Electric")
      .replace(/\bCPS\b/g, "EPE")
      .replace(/Eaton 1009874ACH/g, "Eaton MBE2040B200BTS")
      .replace(/1009874ACH/g, "MBE2040B200BTS")
      .replace(/Milbank U5135-XL-200/g, "Eaton MBE2040B200BTS")
      .replace(/200A ringless/g, "200A BR meter-breaker")
      .replace(/\(210\) 353-4050/g, "(915) 543-5711"),
  );
}

function patchSvg(svg: string | undefined): string | undefined {
  if (!svg) return svg;
  return svg
    .replace(/CPS Energy/g, "El Paso Electric")
    .replace(/\bCPS\b/g, "EPE")
    .replace(/1009874ACH/g, "MBE2040B200BTS")
    .replace(/200A ringless/g, "200A BR meter-breaker")
    .replace(/Milbank U5135-XL-200/g, "MBE2040B200BTS");
}

export const ELPASO_JOBS: Job[] = SA_JOBS.map((job) => ({
  ...job,
  materials: applyElpasoPricing(forceMeterSocket(job.materials, job.id)),
  requirements: patchRequirements(job.requirements),
  blueprintNotes: patchBlueprintNotes(job.blueprintNotes),
  svgDiagram: patchSvg(job.svgDiagram),
  suppliers: ELPASO_SUPPLIERS,
  officialDocs: ELPASO_OFFICIAL_DOCS,
}));
