/**
 * JurisdictionConfig — the template interface for generating jurisdiction-specific jobs.
 *
 * Each new city/jurisdiction defines a config file (~60-80 lines) instead of
 * hand-building 23 job files. The `buildJobs()` function takes a config and
 * produces the full Job[] array by inheriting from a baseline (Austin CH or
 * San Antonio BR) and applying patches.
 */

import type { OfficialDoc } from "./types";

export interface MeterSocketConfig {
  /** Catalog number, e.g. "UTRS213CE" */
  catalog: string;
  /** Human description, e.g. "200A ringless OH/UG, Oncor approved" */
  description: string;
  /** Unit price from invoices (if available) */
  price?: number;
  /** Catalog numbers from the baseline that this replaces */
  replaces: string[];
}

export interface JurisdictionConfig {
  id: string;
  label: string;
  shortLabel: string;
  utility: string;
  county: string;
  state: string;
  defaultZip: string;
  zipPrefixes: string[];

  /** Which baseline to inherit from: "austin" (CH series) or "san-antonio" (BR series) */
  baseline: "austin" | "san-antonio";

  /** 200A meter socket config — if different from baseline */
  meterSocket?: MeterSocketConfig;

  /**
   * Text replacements applied to requirements, blueprint notes, SVG diagrams,
   * and (if patchMaterialText is true) material item names and spec strings.
   * Each entry is [searchString, replacement]. Applied in order.
   * Use these for utility names, city names, phone numbers, catalog refs, etc.
   */
  textReplacements: [string, string][];

  /**
   * If true, textReplacements are also applied to material item/spec strings.
   * Useful for co-ops and jurisdictions that need catalog number and utility
   * name swaps directly in material descriptions (e.g. PEC, GVEC, BEC).
   * Default: false (only requirements/notes/SVGs are patched).
   */
  patchMaterialText?: boolean;

  /** Pricing overlay: catalog number → unit price. Undefined = use baseline pricing. */
  pricing?: Record<string, number>;

  /** Official docs for this jurisdiction */
  officialDocs: OfficialDoc[];

  /** Extra official docs to append for specific job IDs */
  extraDocs?: Record<string, OfficialDoc[]>;

  /** Extra requirements to append for specific job IDs */
  extraRequirements?: Record<string, string[]>;

  /** Job IDs that need meter socket swaps. Defaults to standard set if meterSocket is defined. */
  meterSwapJobs?: string[];
}

/** Standard jobs that get meter socket swaps when a jurisdiction defines a custom meter socket */
export const DEFAULT_METER_SWAP_JOBS = [
  "200a-upgrade",
  "new-200a-residential",
  "meter-base-replacement",
  "temp-power-pole",
];
