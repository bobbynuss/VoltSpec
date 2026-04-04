import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { AMARILLO_SUPPLIERS } from "./suppliers";
import { AMARILLO_OFFICIAL_DOCS } from "./official-docs";
import { AMARILLO_PRICES } from "./pricing";

/**
 * Amarillo / Xcel Energy (SPS) jobs inherit San Antonio BR-series definitions
 * with:
 *   1. Amarillo-specific suppliers & official docs
 *   2. Amarillo pricing overlay from Elliott Amarillo invoices (+15% markup)
 *   3. Meter socket swap: U4801XL5T9 replaces SA's 1009874ACH / Milbank U5135
 *   4. Utility references patched: CPS Energy → Xcel Energy (SPS)
 *
 * BR-series breakers and loadcenters are standard.
 */

// ── Amarillo 200A Meter Socket ─────────────────────────────────────
const AMARILLO_METER_SOCKET: MaterialItem = {
  item: "200A Ringless OH/UG Meter Socket",
  quantity: "1",
  spec: "Milbank U4801XL5T9 - 200A single-phase 5-terminal lever-bypass ringless meter socket, OH/UG, Xcel Energy (SPS) approved for Amarillo service territory",
  unitPrice: AMARILLO_PRICES["U4801XL5T9"], // $217.73
};

/** SA catalog numbers that should be swapped for Amarillo */
const SA_200A_METER_CATS = ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"];

function isSA200AMeter(mat: MaterialItem): boolean {
  return SA_200A_METER_CATS.some((cat) => mat.spec.includes(cat));
}

// ── Pricing Overlay ────────────────────────────────────────────────

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function amarilloPrice(mat: MaterialItem): number | undefined {
  for (const cat of Object.keys(AMARILLO_PRICES)) {
    const re = new RegExp(
      `(?:^|[^A-Za-z0-9])${escapeRegex(cat)}(?=$|[^A-Za-z0-9])`,
    );
    if (re.test(mat.spec) || re.test(mat.item)) {
      return AMARILLO_PRICES[cat];
    }
  }
  return undefined;
}

function applyAmarillMaterials(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
    // Swap SA 200A meter socket → Amarillo U4801XL5T9
    if (isSA200AMeter(mat)) {
      return { ...AMARILLO_METER_SOCKET };
    }
    // Apply Amarillo pricing overlay
    const price = amarilloPrice(mat);
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
    .replace(/CPS Energy/g, "Xcel Energy")
    .replace(/\bCPS\b/g, "Xcel");
  if (meterSwap) {
    s = s
      .replace(/1009874ACH/g, "U4801XL5T9")
      .replace(/1006352CCH/g, "U4801XL5T9")
      .replace(/Milbank U5135-XL-200/g, "Milbank U4801XL5T9")
      .replace(/Milbank U5135/g, "Milbank U4801XL5T9")
      .replace(/Eaton 1009874ACH/g, "Milbank U4801XL5T9");
  }
  return s;
}

// ── Requirements / Notes Patches ───────────────────────────────────

function patchRequirements(reqs: string[], meterSwap: boolean): string[] {
  return reqs.map((r) => {
    let patched = r
      .replace(/CPS Energy/g, "Xcel Energy (SPS)")
      .replace(/\bCPS\b/g, "Xcel Energy")
      .replace(/City of San Antonio/g, "City of Amarillo")
      .replace(/\(210\) 353-4050/g, "(800) 895-4999")
      .replace(/\(210\) 353-2222/g, "(800) 895-4999");
    if (meterSwap) {
      patched = patched
        .replace(/Eaton 1009874ACH[^,]*/g, "Milbank U4801XL5T9 200A ringless OH/UG meter socket, Xcel Energy approved")
        .replace(/Milbank U5135-XL-200/g, "Milbank U4801XL5T9");
    }
    return patched;
  });
}

function patchBlueprintNotes(notes: string[] | undefined, meterSwap: boolean): string[] | undefined {
  if (!notes) return notes;
  return notes.map((n) => {
    let patched = n
      .replace(/CPS Energy/g, "Xcel Energy (SPS)")
      .replace(/\bCPS\b/g, "Xcel Energy");
    if (meterSwap) {
      patched = patched
        .replace(/1009874ACH/g, "U4801XL5T9")
        .replace(/1006352CCH/g, "U4801XL5T9")
        .replace(/Milbank U5135-XL-200/g, "Milbank U4801XL5T9")
        .replace(/Milbank U5135/g, "Milbank U4801XL5T9");
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

// ── Build final Amarillo jobs array ────────────────────────────────

export const AMARILLO_JOBS: Job[] = SA_JOBS.map((job) => {
  const needsMeterSwap = METER_SWAP_JOBS.has(job.id);

  return {
    ...job,
    materials: applyAmarillMaterials(job.materials),
    requirements: patchRequirements(job.requirements, needsMeterSwap),
    blueprintNotes: patchBlueprintNotes(job.blueprintNotes, needsMeterSwap),
    svgDiagram: patchSvg(job.svgDiagram, needsMeterSwap),
    suppliers: AMARILLO_SUPPLIERS,
    officialDocs: AMARILLO_OFFICIAL_DOCS,
  };
});
