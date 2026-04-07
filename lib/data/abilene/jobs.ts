import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { ABILENE_SUPPLIERS } from "./suppliers";
import { ABILENE_OFFICIAL_DOCS } from "./official-docs";
import { ABILENE_PRICES } from "./pricing";

/**
 * Abilene / AEP Texas North jobs inherit San Antonio job definitions
 * with Abilene-specific suppliers, official docs, utility refs, pricing,
 * and local meter socket default (U7040XLTG).
 *
 * Pricing: derived from Elliott Electric Supply Abilene (Store 58) invoices.
 * Default 200A meter socket: U7040XLTG (200A 1PH OH/UG 4-terminal).
 * Preferred panel series: CH (enforced via panel-overrides.ts).
 */

/* ── Abilene 200A Meter Socket ─────────────────────────────────── */
const ABILENE_200A_METER: MaterialItem = {
  item: "200A Meter Socket",
  quantity: "1",
  spec: "Milbank U7040XLTG - 200A single-phase OH/UG 4-terminal meter socket, AEP Texas North approved",
  unitPrice: 84.42,
};

/* ── Helpers ────────────────────────────────────────────────────── */

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function abilenePrice(mat: MaterialItem): number | undefined {
  for (const cat of Object.keys(ABILENE_PRICES)) {
    const re = new RegExp(
      `(?:^|[^A-Za-z0-9])${escapeRegex(cat)}(?=$|[^A-Za-z0-9])`,
    );
    if (re.test(mat.spec) || re.test(mat.item)) {
      return ABILENE_PRICES[cat];
    }
  }
  return undefined;
}

/** Is this a 200A meter socket line? */
function is200AMeterSocket(mat: MaterialItem): boolean {
  return (
    /200A.*(?:meter|ringless)/i.test(mat.item) ||
    /1009874ACH|U5135-XL-200|UTRS213|UATRS213|U7040XLTG/i.test(mat.spec)
  );
}

/**
 * Force the correct Abilene meter socket into the materials list:
 * - Replace any existing SA 200A meter socket with Abilene default
 * - If no 200A meter socket exists in a 200A job, inject one at the top
 */
function forceMeterSocket(materials: MaterialItem[], jobId: string): MaterialItem[] {
  const is200AJob = /200a|meter-base|span-panel-upgrade|temp-power/i.test(jobId);
  if (!is200AJob) return materials;

  let replaced = false;
  const result = materials.map((mat) => {
    if (is200AMeterSocket(mat)) {
      replaced = true;
      return { ...ABILENE_200A_METER };
    }
    return mat;
  });

  if (!replaced) {
    result.splice(1, 0, { ...ABILENE_200A_METER });
  }

  return result;
}

function applyAbilenePricing(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
    // Don't overwrite the forced meter socket price
    if (is200AMeterSocket(mat)) return mat;
    const price = abilenePrice(mat);
    if (price !== undefined) {
      return { ...mat, unitPrice: price };
    }
    return mat;
  });
}

function patchRequirements(reqs: string[]): string[] {
  return reqs.map((r) =>
    r
      .replace(/CPS Energy/g, "AEP Texas North")
      .replace(/\bCPS\b/g, "AEP Texas")
      .replace(/City of San Antonio/g, "City of Abilene")
      .replace(/\(210\) 353-4050/g, "(877) 373-4858")
      .replace(/\(210\) 353-2222/g, "(877) 373-4858")
      .replace(/Eaton 1009874ACH/g, "Milbank U7040XLTG")
      .replace(/Milbank U5135-XL-200/g, "Milbank U7040XLTG")
      .replace(/approved ringless type/g, "approved meter socket (U7040XLTG)"),
  );
}

function patchBlueprintNotes(notes: string[] | undefined): string[] | undefined {
  if (!notes) return notes;
  return notes.map((n) =>
    n
      .replace(/CPS Energy/g, "AEP Texas North")
      .replace(/\bCPS\b/g, "AEP Texas")
      .replace(/Eaton 1009874ACH/g, "Milbank U7040XLTG")
      .replace(/1009874ACH/g, "U7040XLTG")
      .replace(/Milbank U5135-XL-200/g, "Milbank U7040XLTG")
      .replace(/200A ringless/g, "200A meter socket")
      .replace(/\(210\) 353-4050/g, "(877) 373-4858"),
  );
}

function patchSvg(svg: string | undefined): string | undefined {
  if (!svg) return svg;
  return svg
    .replace(/CPS Energy/g, "AEP Texas")
    .replace(/\bCPS\b/g, "AEP Texas")
    .replace(/1009874ACH/g, "U7040XLTG")
    .replace(/200A ringless/g, "200A meter socket")
    .replace(/Milbank U5135-XL-200/g, "U7040XLTG");
}

export const ABILENE_JOBS: Job[] = SA_JOBS.map((job) => ({
  ...job,
  materials: applyAbilenePricing(forceMeterSocket(job.materials, job.id)),
  requirements: patchRequirements(job.requirements),
  blueprintNotes: patchBlueprintNotes(job.blueprintNotes),
  svgDiagram: patchSvg(job.svgDiagram),
  suppliers: ABILENE_SUPPLIERS,
  officialDocs: ABILENE_OFFICIAL_DOCS,
}));
