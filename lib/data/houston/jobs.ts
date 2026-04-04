import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { HOUSTON_SUPPLIERS } from "./suppliers";
import { HOUSTON_OFFICIAL_DOCS } from "./official-docs";
import { HOUSTON_PRICES } from "./pricing";

/**
 * Houston / CenterPoint jobs inherit San Antonio's BR-series job definitions
 * (materials, requirements, diagrams) with:
 *   1. Houston-specific suppliers & official docs
 *   2. Houston pricing overlay from Elliott Stafford/Deer Park invoices (+15% markup)
 *   3. Meter socket swap: UNRRS213CEUSE replaces SA's 1009874ACH / Milbank U5135
 *   4. Utility references patched: CPS Energy → CenterPoint Energy
 *
 * BR-series is the standard for Houston, matching San Antonio's panel preference.
 */

// ── Houston 200A Meter Socket ──────────────────────────────────────
const HOUSTON_METER_SOCKET: MaterialItem = {
  item: "200A Ringless OH/UG Meter Socket",
  quantity: "1",
  spec: "Eaton UNRRS213CEUSE - 200A ringless single-phase OH/UG meter socket with hub closing plate, CenterPoint Energy approved for Houston service territory",
  unitPrice: HOUSTON_PRICES["UNRRS213CEUSE"], // $84.14 from invoices
};

/** SA catalog numbers that should be swapped to UNRRS213CEUSE for Houston */
const SA_200A_METER_CATS = ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"];

function isSA200AMeter(mat: MaterialItem): boolean {
  return SA_200A_METER_CATS.some((cat) => mat.spec.includes(cat));
}

// ── Pricing Overlay ────────────────────────────────────────────────

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function houstonPrice(mat: MaterialItem): number | undefined {
  for (const cat of Object.keys(HOUSTON_PRICES)) {
    const re = new RegExp(
      `(?:^|[^A-Za-z0-9])${escapeRegex(cat)}(?=$|[^A-Za-z0-9])`,
    );
    if (re.test(mat.spec) || re.test(mat.item)) {
      return HOUSTON_PRICES[cat];
    }
  }
  return undefined;
}

function applyHoustonMaterials(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
    // Swap SA 200A meter socket → Houston UNRRS213CEUSE
    if (isSA200AMeter(mat)) {
      return { ...HOUSTON_METER_SOCKET };
    }
    // Apply Houston pricing overlay
    const price = houstonPrice(mat);
    if (price !== undefined) {
      return { ...mat, unitPrice: price };
    }
    return mat;
  });
}

// ── SVG Diagram Patches ────────────────────────────────────────────

function patchHoustonSvg(svg: string | undefined, meterSwap: boolean): string | undefined {
  if (!svg) return svg;
  let s = svg
    .replace(/CPS Energy/g, "CenterPoint")
    .replace(/\bCPS\b/g, "CenterPoint");
  if (meterSwap) {
    s = s
      .replace(/1009874ACH/g, "UNRRS213CEUSE")
      .replace(/1006352CCH/g, "UNRRS213CEUSE")
      .replace(/Milbank U5135-XL-200/g, "Eaton UNRRS213CEUSE")
      .replace(/Milbank U5135/g, "Eaton UNRRS213CEUSE")
      .replace(/Eaton 1009874ACH/g, "Eaton UNRRS213CEUSE");
  }
  return s;
}

// ── Requirements / Notes Patches ───────────────────────────────────

function patchHoustonRequirements(reqs: string[]): string[] {
  return reqs.map((r) => {
    let patched = r
      .replace(
        /Eaton 1009874ACH[^,]*/g,
        "Eaton UNRRS213CEUSE 200A ringless OH/UG meter socket, CenterPoint approved",
      )
      .replace(/Milbank U5135-XL-200/g, "Eaton UNRRS213CEUSE")
      .replace(/1006352CCH/g, "UNRRS213CEUSE");

    // Swap CPS → CenterPoint for meter-related lines
    if (/meter|service.*application|service.*standard/i.test(r)) {
      patched = patched
        .replace(/CPS Energy/g, "CenterPoint Energy")
        .replace(/\bCPS\b/g, "CenterPoint");
    }
    // Swap city references
    patched = patched
      .replace(/City of San Antonio/g, "City of Houston / Harris County")
      .replace(/\(210\) 353-4050/g, "(713) 207-2222")
      .replace(/\(210\) 353-2222/g, "(713) 207-2222");

    return patched;
  });
}

function patchHoustonBlueprintNotes(notes: string[] | undefined): string[] | undefined {
  if (!notes) return notes;
  return notes.map((n) =>
    n
      .replace(/1009874ACH/g, "UNRRS213CEUSE")
      .replace(/1006352CCH/g, "UNRRS213CEUSE")
      .replace(/Milbank U5135-XL-200/g, "Eaton UNRRS213CEUSE")
      .replace(/Milbank U5135/g, "Eaton UNRRS213CEUSE")
      .replace(/CPS Energy/g, "CenterPoint Energy")
      .replace(/\bCPS\b/g, "CenterPoint"),
  );
}

// ── Jobs needing meter socket swap ─────────────────────────────────
const METER_SWAP_JOBS = new Set([
  "200a-upgrade",
  "new-200a-residential",
  "meter-base-replacement",
  "temp-power-pole",
]);

// ── Build final Houston jobs array ─────────────────────────────────

export const HOUSTON_JOBS: Job[] = SA_JOBS.map((job) => {
  const needsMeterSwap = METER_SWAP_JOBS.has(job.id);

  return {
    ...job,
    materials: applyHoustonMaterials(job.materials),
    requirements: needsMeterSwap
      ? patchHoustonRequirements(job.requirements)
      : job.requirements.map((r) =>
          r
            .replace(/CPS Energy/g, "CenterPoint Energy")
            .replace(/City of San Antonio/g, "City of Houston / Harris County")
            .replace(/\(210\) 353-4050/g, "(713) 207-2222")
            .replace(/\(210\) 353-2222/g, "(713) 207-2222"),
        ),
    blueprintNotes: needsMeterSwap
      ? patchHoustonBlueprintNotes(job.blueprintNotes)
      : job.blueprintNotes?.map((n) =>
          n
            .replace(/CPS Energy/g, "CenterPoint Energy")
            .replace(/\bCPS\b/g, "CenterPoint"),
        ),
    svgDiagram: patchHoustonSvg(job.svgDiagram, needsMeterSwap),
    suppliers: HOUSTON_SUPPLIERS,
    officialDocs:
      job.id === "ev-charger-80a"
        ? [
            ...HOUSTON_OFFICIAL_DOCS,
            {
              title: "EV Charger Rebate Program – CenterPoint Energy",
              url: "https://www.centerpointenergy.com/en-us/residential/save-energy-money/saving-energy",
              description:
                "CenterPoint Energy residential energy efficiency programs — includes EV charger rebates for Houston-area customers",
            },
          ]
        : HOUSTON_OFFICIAL_DOCS,
  };
});
