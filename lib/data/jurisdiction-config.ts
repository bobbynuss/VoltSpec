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

/**
 * NEC adoption year per state (as of April 2026).
 *
 * Source: NFPA enforcement maps (nfpa.org), state agency publications.
 * 25 states on NEC 2023, 15 on NEC 2020, 3 on NEC 2017, 2 on NEC 2008.
 * States not listed default to NEC 2023.
 *
 * Note: AZ is local-adoption (varies by city); we default to NEC 2023
 * since most AZ cities in our coverage have adopted it.
 */
export const STATE_NEC_YEAR: Record<string, number> = {
  // NEC 2023 states (our coverage)
  TX: 2023,  // Adopting NEC 2026 on Sept 1, 2026
  OK: 2023,  // Effective Sept 14, 2024
  CO: 2023,
  FL: 2023,
  LA: 2023,
  NM: 2023,
  SC: 2023,
  TN: 2023,
  AZ: 2023,  // Local adoption — most cities on 2023
  // NEC 2020 states (our coverage)
  AR: 2020,
  GA: 2020,
  MO: 2020,
  NC: 2020,  // No current plans to update past 2020
  // NEC 2008 (!)
  KS: 2008,
};

/** Look up the NEC year for a state. Defaults to 2023 if not mapped. */
export function getNecYear(state: string): number {
  return STATE_NEC_YEAR[state] ?? 2023;
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
   * If set, meter socket line items matching these catalog numbers are REMOVED
   * from the BOM entirely (utility provides the meter socket).
   * Mutually exclusive with meterSocket — use one or the other.
   */
  removeMeterSocket?: {
    /** Catalog numbers from the baseline to match and remove */
    replaces: string[];
  };

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

  /** Extra blueprint notes to append for specific job IDs */
  extraBlueprintNotes?: Record<string, string[]>;

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
