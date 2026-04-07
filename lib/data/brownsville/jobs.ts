import type { Job, MaterialItem } from "../types";
import { SA_JOBS } from "../san-antonio/jobs";
import { BROWNSVILLE_SUPPLIERS } from "./suppliers";
import { BROWNSVILLE_OFFICIAL_DOCS } from "./official-docs";
import { BROWNSVILLE_PRICES } from "./pricing";

/**
 * Brownsville / AEP Texas Central jobs inherit San Antonio BR-series
 * definitions with Brownsville-specific suppliers, official docs, and utility refs.
 *
 * Pricing: derived from Elliott Electric Supply Brownsville (Store 151) invoices.
 * Meter socket: UATRS213CFLCH / BR-style meter main.
 * BR-series breakers and loadcenters are standard.
 */

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function brownsvillePrice(mat: MaterialItem): number | undefined {
  for (const cat of Object.keys(BROWNSVILLE_PRICES)) {
    const re = new RegExp(
      `(?:^|[^A-Za-z0-9])${escapeRegex(cat)}(?=$|[^A-Za-z0-9])`,
    );
    if (re.test(mat.spec) || re.test(mat.item)) {
      return BROWNSVILLE_PRICES[cat];
    }
  }
  return undefined;
}

/** Swap SA 200A meter sockets to Brownsville default: UATRS213CFLCH */
function patchMeterSocket(mat: MaterialItem): MaterialItem {
  const is200AMeter =
    /200A.*(?:meter|ringless)/i.test(mat.item) ||
    /1009874ACH|U5135-XL-200/i.test(mat.spec);
  if (is200AMeter) {
    return {
      ...mat,
      item: "200A Meter Socket",
      spec: "Eaton UATRS213CFLCH - 200A aluminum enclosure meter socket, OH/UG, UL listed, AEP Texas Central approved",
      unitPrice: BROWNSVILLE_PRICES["UATRS213CFLCH"] ?? mat.unitPrice,
    };
  }
  return mat;
}

function applyBrownsvillePricing(materials: MaterialItem[]): MaterialItem[] {
  return materials.map((mat) => {
    const patched = patchMeterSocket(mat);
    const price = brownsvillePrice(patched);
    if (price !== undefined) {
      return { ...patched, unitPrice: price };
    }
    return patched;
  });
}

function patchRequirements(reqs: string[]): string[] {
  return reqs.map((r) =>
    r
      .replace(/CPS Energy/g, "AEP Texas Central")
      .replace(/\bCPS\b/g, "AEP Texas")
      .replace(/City of San Antonio/g, "City of Brownsville")
      .replace(/\(210\) 353-4050/g, "(877) 373-4858")
      .replace(/\(210\) 353-2222/g, "(877) 373-4858")
      .replace(/Eaton 1009874ACH/g, "Eaton UATRS213CFLCH")
      .replace(/Milbank U5135-XL-200/g, "Eaton UATRS213CFLCH")
      .replace(/CPS-approved ringless type/g, "AEP Texas Central approved meter socket"),
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

export const BROWNSVILLE_JOBS: Job[] = SA_JOBS.map((job) => ({
  ...job,
  materials: applyBrownsvillePricing(job.materials),
  requirements: patchRequirements(job.requirements),
  blueprintNotes: patchBlueprintNotes(job.blueprintNotes),
  svgDiagram: patchSvg(job.svgDiagram),
  suppliers: BROWNSVILLE_SUPPLIERS,
  officialDocs: BROWNSVILLE_OFFICIAL_DOCS,
}));
