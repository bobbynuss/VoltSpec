/**
 * buildJobs — generates a full Job[] array from a JurisdictionConfig.
 *
 * Inherits from the appropriate baseline (Austin CH or San Antonio BR),
 * then applies meter socket swaps, pricing overlays, text replacements,
 * and jurisdiction-specific docs/requirements.
 *
 * Adding a new city = write a ~60-line config file, done.
 */

import type { Job, MaterialItem, OfficialDoc } from "./types";
import { JOBS as AUSTIN_JOBS } from "./jobs";
import { SA_JOBS } from "./san-antonio/jobs";
import type { JurisdictionConfig, MeterSocketConfig } from "./jurisdiction-config";
import { DEFAULT_METER_SWAP_JOBS, getNecYear } from "./jurisdiction-config";

// ── Helpers ────────────────────────────────────────────────────────

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Apply text replacements to a string.
 * Each [search, replace] pair is applied in order as a global replace.
 */
function applyTextReplacements(text: string, replacements: [string, string][]): string {
  let result = text;
  for (const [search, replace] of replacements) {
    // Use global regex for each replacement
    result = result.replace(new RegExp(escapeRegex(search), "g"), replace);
  }
  return result;
}

// ── Meter Socket ───────────────────────────────────────────────────

function isMeterSocketMatch(mat: MaterialItem, replaces: string[]): boolean {
  return replaces.some((cat) => mat.spec.includes(cat));
}

function buildMeterSocketItem(config: MeterSocketConfig): MaterialItem {
  return {
    item: "200A Ringless OH/UG Meter Socket",
    quantity: "1",
    spec: `${config.catalog} - ${config.description}`,
    unitPrice: config.price,
  };
}

// ── Pricing Overlay ────────────────────────────────────────────────

function applyPricingOverlay(
  mat: MaterialItem,
  pricing: Record<string, number>,
): MaterialItem {
  for (const cat of Object.keys(pricing)) {
    const re = new RegExp(
      `(?:^|[^A-Za-z0-9])${escapeRegex(cat)}(?=$|[^A-Za-z0-9])`,
    );
    if (re.test(mat.spec) || re.test(mat.item)) {
      return { ...mat, unitPrice: pricing[cat] };
    }
  }
  return mat;
}

// ── Material Processing ────────────────────────────────────────────

function processMaterials(
  materials: MaterialItem[],
  config: JurisdictionConfig,
  needsMeterSwap: boolean,
  necYear: number = 2026,
): MaterialItem[] {
  // 0. Filter out meter socket items when utility provides them
  let filtered = materials;
  if (needsMeterSwap && config.removeMeterSocket) {
    filtered = materials.filter(
      (mat) => !isMeterSocketMatch(mat, config.removeMeterSocket!.replaces),
    );
  }

  return filtered.map((mat) => {
    // 1. Meter socket swap
    if (needsMeterSwap && config.meterSocket && isMeterSocketMatch(mat, config.meterSocket.replaces)) {
      return buildMeterSocketItem(config.meterSocket);
    }

    // 2. Text replacements on material item/spec (for co-ops etc.)
    let result = mat;
    if (config.patchMaterialText && config.textReplacements.length > 0) {
      result = {
        ...result,
        item: applyTextReplacements(result.item, config.textReplacements),
        spec: applyTextReplacements(result.spec, config.textReplacements),
      };
    }

    // 3. Pricing overlay
    if (config.pricing) {
      result = applyPricingOverlay(result, config.pricing);
    }

    // 4. NEC year replacement in spec strings
    if (necYear !== 2026) {
      result = {
        ...result,
        spec: applyNecYearReplacement(result.spec, necYear),
      };
    }

    return result;
  });
}

// ── Text Processing ────────────────────────────────────────────────

function processRequirements(
  reqs: string[],
  config: JurisdictionConfig,
  jobId: string,
): string[] {
  let result = reqs.map((r) => applyTextReplacements(r, config.textReplacements));

  // Append extra requirements for this job
  const extras = config.extraRequirements?.[jobId];
  if (extras) {
    result = [...result, ...extras];
  }

  return result;
}

function processBlueprintNotes(
  notes: string[] | undefined,
  config: JurisdictionConfig,
  jobId: string,
): string[] | undefined {
  if (!notes) return notes;
  let result = notes.map((n) => applyTextReplacements(n, config.textReplacements));

  // Append extra blueprint notes for this job
  const extras = config.extraBlueprintNotes?.[jobId];
  if (extras) {
    result = [...result, ...extras];
  }

  return result;
}

function processSvgDiagram(
  svg: string | undefined,
  config: JurisdictionConfig,
): string | undefined {
  if (!svg) return svg;
  return applyTextReplacements(svg, config.textReplacements);
}

function processOfficialDocs(
  config: JurisdictionConfig,
  jobId: string,
): OfficialDoc[] {
  const extras = config.extraDocs?.[jobId];
  return extras ? [...config.officialDocs, ...extras] : config.officialDocs;
}

// ── Main Builder ───────────────────────────────────────────────────

/**
 * Replace baseline NEC year references with the jurisdiction's actual adopted year.
 * Baselines are authored with "NEC 2026" — this swaps to the state's actual year.
 * Only applies when the state's adopted year differs from the baseline year (2026).
 */
function applyNecYearReplacement(text: string, necYear: number): string {
  if (necYear === 2026) return text; // baseline year, no change needed
  return text.replace(/\bNEC 2026\b/g, `NEC ${necYear}`);
}

export function buildJobs(config: JurisdictionConfig): Job[] {
  const baselineJobs = config.baseline === "austin" ? AUSTIN_JOBS : SA_JOBS;
  const meterSwapJobs = new Set(config.meterSwapJobs ?? DEFAULT_METER_SWAP_JOBS);
  const necYear = getNecYear(config.state);

  return baselineJobs.map((job) => {
    const needsMeterSwap = (config.meterSocket != null || config.removeMeterSocket != null) && meterSwapJobs.has(job.id);

    // Process requirements and notes with text replacements, then apply NEC year
    const reqs = processRequirements(job.requirements, config, job.id)
      .map((r) => applyNecYearReplacement(r, necYear));
    const notes = processBlueprintNotes(job.blueprintNotes, config, job.id)
      ?.map((n) => applyNecYearReplacement(n, necYear));

    return {
      ...job,
      materials: processMaterials(job.materials, config, needsMeterSwap, necYear),
      requirements: reqs,
      blueprintNotes: notes,
      svgDiagram: processSvgDiagram(job.svgDiagram, config),
      suppliers: [],  // Suppliers now come from ZIP-to-branch dynamically
      officialDocs: processOfficialDocs(config, job.id),
    };
  });
}
