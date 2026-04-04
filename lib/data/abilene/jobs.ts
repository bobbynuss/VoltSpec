import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { ABILENE_SUPPLIERS } from "./suppliers";
import { ABILENE_OFFICIAL_DOCS } from "./official-docs";
import { ABILENE_PRICES } from "./pricing";

/**
 * Abilene / AEP Texas North jobs inherit San Antonio BR-series definitions
 * with Abilene-specific suppliers, official docs, and utility references.
 *
 * Pricing: placeholder — SA prices used until Abilene Elliott invoices arrive.
 * Meter socket: inherits SA's until confirmed with AEP Texas North.
 * BR-series breakers and loadcenters are standard.
 */

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

function applyAbilenePricing(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
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
      .replace(/\(210\) 353-2222/g, "(877) 373-4858"),
  );
}

function patchBlueprintNotes(notes: string[] | undefined): string[] | undefined {
  if (!notes) return notes;
  return notes.map((n) =>
    n
      .replace(/CPS Energy/g, "AEP Texas North")
      .replace(/\bCPS\b/g, "AEP Texas"),
  );
}

function patchSvg(svg: string | undefined): string | undefined {
  if (!svg) return svg;
  return svg
    .replace(/CPS Energy/g, "AEP Texas")
    .replace(/\bCPS\b/g, "AEP Texas");
}

export const ABILENE_JOBS: Job[] = SA_JOBS.map((job) => ({
  ...job,
  materials: applyAbilenePricing(job.materials),
  requirements: patchRequirements(job.requirements),
  blueprintNotes: patchBlueprintNotes(job.blueprintNotes),
  svgDiagram: patchSvg(job.svgDiagram),
  suppliers: ABILENE_SUPPLIERS,
  officialDocs: ABILENE_OFFICIAL_DOCS,
}));
