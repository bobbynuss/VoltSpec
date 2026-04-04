import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { CORPUS_SUPPLIERS } from "./suppliers";
import { CORPUS_OFFICIAL_DOCS } from "./official-docs";
import { CORPUS_PRICES } from "./pricing";

/**
 * Corpus Christi / AEP Texas Central jobs inherit San Antonio BR-series
 * definitions with Corpus-specific suppliers, official docs, and utility refs.
 *
 * Pricing: placeholder — SA prices used until Corpus Elliott invoices arrive.
 * Meter socket: inherits SA's until confirmed with AEP Texas.
 * BR-series breakers and loadcenters are standard.
 */

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function corpusPrice(mat: MaterialItem): number | undefined {
  for (const cat of Object.keys(CORPUS_PRICES)) {
    const re = new RegExp(
      `(?:^|[^A-Za-z0-9])${escapeRegex(cat)}(?=$|[^A-Za-z0-9])`,
    );
    if (re.test(mat.spec) || re.test(mat.item)) {
      return CORPUS_PRICES[cat];
    }
  }
  return undefined;
}

function applyCorpusPricing(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
    const price = corpusPrice(mat);
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
      .replace(/City of San Antonio/g, "City of Corpus Christi")
      .replace(/\(210\) 353-4050/g, "(877) 373-4858")
      .replace(/\(210\) 353-2222/g, "(877) 373-4858"),
  );
}

function patchBlueprintNotes(notes: string[] | undefined): string[] | undefined {
  if (!notes) return notes;
  return notes.map((n) =>
    n
      .replace(/CPS Energy/g, "AEP Texas Central")
      .replace(/\bCPS\b/g, "AEP Texas"),
  );
}

function patchSvg(svg: string | undefined): string | undefined {
  if (!svg) return svg;
  return svg
    .replace(/CPS Energy/g, "AEP Texas")
    .replace(/\bCPS\b/g, "AEP Texas");
}

export const CORPUS_JOBS: Job[] = SA_JOBS.map((job) => ({
  ...job,
  materials: applyCorpusPricing(job.materials),
  requirements: patchRequirements(job.requirements),
  blueprintNotes: patchBlueprintNotes(job.blueprintNotes),
  svgDiagram: patchSvg(job.svgDiagram),
  suppliers: CORPUS_SUPPLIERS,
  officialDocs: CORPUS_OFFICIAL_DOCS,
}));
