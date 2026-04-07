import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { ELPASO_SUPPLIERS } from "./suppliers";
import { ELPASO_OFFICIAL_DOCS } from "./official-docs";
import { ELPASO_PRICES } from "./pricing";

/**
 * El Paso / El Paso Electric jobs inherit San Antonio BR-series definitions
 * with El Paso-specific suppliers, official docs, utility references, and
 * local meter socket defaults.
 *
 * Pricing: derived from Elliott Electric Supply El Paso (Store 191) invoices.
 * Default 200A meter socket: MBE2040B200BTS (BR EUSERC 200A meter-breaker 20/40).
 * BR-series breakers and loadcenters are standard.
 */

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

/** Swap SA 200A meter sockets to El Paso default: MBE2040B200BTS */
function patchMeterSocket(mat: MaterialItem): MaterialItem {
  // Match any 200A meter socket line item (Eaton 1009874ACH, Milbank U5135-XL-200, etc.)
  const is200AMeter =
    /200A.*(?:meter|ringless)/i.test(mat.item) ||
    /1009874ACH|U5135-XL-200|UTRS213|UATRS213/i.test(mat.spec);
  if (is200AMeter) {
    return {
      ...mat,
      item: "200A BR Meter-Breaker",
      spec: "Eaton MBE2040B200BTS - BR EUSERC 200A main breaker meter combo, 20/40 circuit, bottom/top feed, El Paso Electric approved",
      unitPrice: ELPASO_PRICES["MBE2040B200BTS"] ?? mat.unitPrice,
    };
  }
  return mat;
}

function applyElpasoPricing(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
    const patched = patchMeterSocket(mat);
    const price = elpasoPrice(patched);
    if (price !== undefined) {
      return { ...patched, unitPrice: price };
    }
    return patched;
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
      .replace(/CPS-approved ringless type/g, "El Paso Electric approved BR meter-breaker type"),
  );
}

function patchBlueprintNotes(notes: string[] | undefined): string[] | undefined {
  if (!notes) return notes;
  return notes.map((n) =>
    n
      .replace(/CPS Energy/g, "El Paso Electric")
      .replace(/\bCPS\b/g, "EPE"),
  );
}

function patchSvg(svg: string | undefined): string | undefined {
  if (!svg) return svg;
  return svg
    .replace(/CPS Energy/g, "El Paso Electric")
    .replace(/\bCPS\b/g, "EPE");
}

export const ELPASO_JOBS: Job[] = SA_JOBS.map((job) => ({
  ...job,
  materials: applyElpasoPricing(job.materials),
  requirements: patchRequirements(job.requirements),
  blueprintNotes: patchBlueprintNotes(job.blueprintNotes),
  svgDiagram: patchSvg(job.svgDiagram),
  suppliers: ELPASO_SUPPLIERS,
  officialDocs: ELPASO_OFFICIAL_DOCS,
}));
