import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { ODESSA_SUPPLIERS } from "./suppliers";
import { ODESSA_OFFICIAL_DOCS } from "./official-docs";
import { ODESSA_PRICES } from "./pricing";

/**
 * Odessa / Oncor Electric Delivery jobs inherit San Antonio BR-series
 * definitions with:
 *   1. Odessa-specific suppliers & official docs
 *   2. Odessa pricing overlay from Elliott Permian Basin invoices (+15% markup)
 *   3. Meter socket swap: UTRS213CE replaces SA's 1009874ACH / Milbank U5135
 *   4. Utility references patched: CPS Energy → Oncor Electric Delivery
 *
 * BR-series breakers and loadcenters are standard.
 */

// ── Odessa 200A Meter Socket ───────────────────────────────────────
const ODESSA_METER_SOCKET: MaterialItem = {
  item: "200A Ringless OH/UG Meter Socket",
  quantity: "1",
  spec: "Eaton UTRS213CE - 200A ringless single-phase OH/UG meter socket, Oncor approved for Odessa/Permian Basin service territory",
  unitPrice: ODESSA_PRICES["UTRS213CE"], // $103.68
};

/** SA catalog numbers that should be swapped for Odessa */
const SA_200A_METER_CATS = ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"];

function isSA200AMeter(mat: MaterialItem): boolean {
  return SA_200A_METER_CATS.some((cat) => mat.spec.includes(cat));
}

// ── Pricing Overlay ────────────────────────────────────────────────

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function odessaPrice(mat: MaterialItem): number | undefined {
  for (const cat of Object.keys(ODESSA_PRICES)) {
    const re = new RegExp(
      `(?:^|[^A-Za-z0-9])${escapeRegex(cat)}(?=$|[^A-Za-z0-9])`,
    );
    if (re.test(mat.spec) || re.test(mat.item)) {
      return ODESSA_PRICES[cat];
    }
  }
  return undefined;
}

function applyOdessaMaterials(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
    if (isSA200AMeter(mat)) {
      return { ...ODESSA_METER_SOCKET };
    }
    const price = odessaPrice(mat);
    if (price !== undefined) {
      return { ...mat, unitPrice: price };
    }
    return mat;
  });
}

// ── SVG Diagram Patches ────────────────────────────────────────────

function patchSvg(svg: string | undefined, meterSwap: boolean): string | undefined {
  if (!svg) return svg;
  let s = svg
    .replace(/CPS Energy/g, "Oncor")
    .replace(/\bCPS\b/g, "Oncor");
  if (meterSwap) {
    s = s
      .replace(/1009874ACH/g, "UTRS213CE")
      .replace(/1006352CCH/g, "UTRS213CE")
      .replace(/Milbank U5135-XL-200/g, "Eaton UTRS213CE")
      .replace(/Milbank U5135/g, "Eaton UTRS213CE")
      .replace(/Eaton 1009874ACH/g, "Eaton UTRS213CE");
  }
  return s;
}

// ── Requirements / Notes Patches ───────────────────────────────────

function patchRequirements(reqs: string[], meterSwap: boolean): string[] {
  return reqs.map((r) => {
    let patched = r
      .replace(/CPS Energy/g, "Oncor Electric Delivery")
      .replace(/\bCPS\b/g, "Oncor")
      .replace(/City of San Antonio/g, "City of Odessa")
      .replace(/\(210\) 353-4050/g, "(888) 313-6862")
      .replace(/\(210\) 353-2222/g, "(888) 313-6862");
    if (meterSwap) {
      patched = patched
        .replace(/Eaton 1009874ACH[^,]*/g, "Eaton UTRS213CE 200A ringless OH/UG meter socket, Oncor approved")
        .replace(/Milbank U5135-XL-200/g, "Eaton UTRS213CE");
    }
    return patched;
  });
}

function patchBlueprintNotes(notes: string[] | undefined, meterSwap: boolean): string[] | undefined {
  if (!notes) return notes;
  return notes.map((n) => {
    let patched = n
      .replace(/CPS Energy/g, "Oncor Electric Delivery")
      .replace(/\bCPS\b/g, "Oncor");
    if (meterSwap) {
      patched = patched
        .replace(/1009874ACH/g, "UTRS213CE")
        .replace(/1006352CCH/g, "UTRS213CE")
        .replace(/Milbank U5135-XL-200/g, "Eaton UTRS213CE")
        .replace(/Milbank U5135/g, "Eaton UTRS213CE");
    }
    return patched;
  });
}

// ── Jobs needing meter socket swap ─────────────────────────────────
const METER_SWAP_JOBS = new Set([
  "200a-upgrade",
  "new-200a-residential",
  "meter-base-replacement",
  "temp-power-pole",
]);

// ── Build final Odessa jobs array ──────────────────────────────────

export const ODESSA_JOBS: Job[] = SA_JOBS.map((job) => {
  const needsMeterSwap = METER_SWAP_JOBS.has(job.id);

  return {
    ...job,
    materials: applyOdessaMaterials(job.materials),
    requirements: patchRequirements(job.requirements, needsMeterSwap),
    blueprintNotes: patchBlueprintNotes(job.blueprintNotes, needsMeterSwap),
    svgDiagram: patchSvg(job.svgDiagram, needsMeterSwap),
    suppliers: ODESSA_SUPPLIERS,
    officialDocs: ODESSA_OFFICIAL_DOCS,
  };
});
