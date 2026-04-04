import type { Job, MaterialItem } from "../types";
import { JOBS as AUSTIN_JOBS } from "../jobs";
import { DALLAS_SUPPLIERS } from "./suppliers";
import { DALLAS_OFFICIAL_DOCS } from "./official-docs";
import { DFW_PRICES } from "./pricing";

/**
 * Dallas/DFW jobs inherit Austin job definitions (requirements, materials, diagrams)
 * with:
 *   1. Dallas-specific suppliers & official docs swapped in
 *   2. DFW pricing overlay from Elliott Ft. Worth cash-sale invoices (+15% markup)
 *   3. DFW meter socket swap: UTRS213CE replaces Austin's 1006352CCH / Milbank U5135
 *      for all 200A single-phase meter socket references
 *
 * CH-series rules are unchanged — Austin and DFW both use Eaton CH.
 */

// ── DFW 200A Meter Socket ──────────────────────────────────────────
// Oncor / DFW standard: Eaton UTRS213CE — 200A ringless OH/UG meter socket
const DFW_METER_SOCKET: MaterialItem = {
  item: "200A Ringless OH/UG Meter Socket",
  quantity: "1",
  spec: "Eaton UTRS213CE - 200A ringless single-phase meter socket, overhead/underground, Oncor approved for DFW service territory",
  unitPrice: DFW_PRICES["UTRS213CE"], // $97.41 from invoices
};

/** Austin catalog numbers that should be swapped to UTRS213CE for DFW 200A jobs */
const AUSTIN_200A_METER_CATS = ["1006352CCH", "U5135-XL-200", "U5135"];

/**
 * Returns true if the material line is a 200A meter socket that should be
 * replaced with UTRS213CE for DFW.
 */
function isAustin200AMeter(mat: MaterialItem): boolean {
  return AUSTIN_200A_METER_CATS.some((cat) => mat.spec.includes(cat));
}

// ── DFW Pricing Overlay ────────────────────────────────────────────

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function dfwPrice(mat: MaterialItem): number | undefined {
  for (const cat of Object.keys(DFW_PRICES)) {
    const re = new RegExp(
      `(?:^|[^A-Za-z0-9])${escapeRegex(cat)}(?=$|[^A-Za-z0-9])`,
    );
    if (re.test(mat.spec) || re.test(mat.item)) {
      return DFW_PRICES[cat];
    }
  }
  return undefined;
}

function applyDfwMaterials(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
    // Swap Austin 200A meter socket → DFW UTRS213CE
    if (isAustin200AMeter(mat)) {
      return { ...DFW_METER_SOCKET };
    }
    // Apply DFW pricing overlay for everything else
    const price = dfwPrice(mat);
    if (price !== undefined) {
      return { ...mat, unitPrice: price };
    }
    return mat;
  });
}

// ── DFW SVG Diagram Patches ────────────────────────────────────────
// Replace Austin meter socket catalog numbers in SVG text labels

function patchDfwSvg(svg: string | undefined): string | undefined {
  if (!svg) return svg;
  return svg
    .replace(/1006352CCH/g, "UTRS213CE")
    .replace(/Milbank U5135-XL-200/g, "Eaton UTRS213CE")
    .replace(/Milbank U5135/g, "Eaton UTRS213CE");
}

// ── DFW Requirements / Notes Patches ───────────────────────────────

function patchDfwRequirements(reqs: string[], jobId: string): string[] {
  return reqs.map((r) => {
    // Swap Austin Energy-specific meter socket refs to Oncor
    let patched = r
      .replace(
        /Eaton 1006352CCH[^,]*/g,
        "Eaton UTRS213CE 200A ringless OH/UG meter socket, Oncor approved",
      )
      .replace(/Milbank U5135-XL-200/g, "Eaton UTRS213CE")
      .replace(
        /AE-approved|Austin Energy approved|AE approved/g,
        "Oncor approved",
      );
    // Swap utility references for meter-specific lines
    if (/meter.*socket/i.test(r) || /meter.*base/i.test(r)) {
      patched = patched
        .replace(/Austin Energy/g, "Oncor Electric Delivery")
        .replace(/\bAE\b/g, "Oncor");
    }
    return patched;
  });
}

function patchDfwBlueprintNotes(notes: string[] | undefined): string[] | undefined {
  if (!notes) return notes;
  return notes.map((n) =>
    n
      .replace(/1006352CCH/g, "UTRS213CE")
      .replace(/Milbank U5135-XL-200/g, "Eaton UTRS213CE")
      .replace(/Milbank U5135/g, "Eaton UTRS213CE"),
  );
}

// ── Jobs that need 200A meter socket swap ──────────────────────────
const METER_SWAP_JOBS = new Set([
  "200a-upgrade",
  "new-200a-residential",
  "meter-base-replacement",
  "temp-power-pole",
]);

// ── Build final DFW jobs array ─────────────────────────────────────

export const DALLAS_JOBS: Job[] = AUSTIN_JOBS.map((job) => {
  const needsMeterSwap = METER_SWAP_JOBS.has(job.id);

  return {
    ...job,
    materials: applyDfwMaterials(job.materials),
    requirements: needsMeterSwap
      ? patchDfwRequirements(job.requirements, job.id)
      : job.requirements,
    blueprintNotes: needsMeterSwap
      ? patchDfwBlueprintNotes(job.blueprintNotes)
      : job.blueprintNotes,
    svgDiagram: needsMeterSwap
      ? patchDfwSvg(job.svgDiagram)
      : job.svgDiagram,
    suppliers: DALLAS_SUPPLIERS,
    officialDocs:
      job.id === "ev-charger-80a"
        ? [
            ...DALLAS_OFFICIAL_DOCS,
            {
              title: "EV Charger Information – Oncor Electric Delivery",
              url: "https://www.oncor.com/content/oncorwww/us/en/home/smart-energy/electric-vehicles.html",
              description:
                "Oncor Electric Delivery EV charger information — service upgrades, new construction requirements, and energy efficiency programs for DFW customers",
            },
          ]
        : DALLAS_OFFICIAL_DOCS,
  };
});
