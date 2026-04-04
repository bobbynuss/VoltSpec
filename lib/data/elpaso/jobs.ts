import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { ELPASO_SUPPLIERS } from "./suppliers";
import { ELPASO_OFFICIAL_DOCS } from "./official-docs";
import { ELPASO_PRICES } from "./pricing";

/**
 * El Paso / El Paso Electric jobs inherit San Antonio BR-series definitions
 * with El Paso-specific suppliers, official docs, and utility references.
 *
 * Pricing: placeholder — SA prices used until El Paso Elliott invoices arrive.
 * Meter socket: inherits SA's until confirmed with El Paso Electric.
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

function applyElpasoPricing(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
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
      .replace(/\(210\) 353-2222/g, "(915) 543-5711"),
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
