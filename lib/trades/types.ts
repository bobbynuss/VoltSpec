/**
 * TradeModule — the interface every trade plugin implements.
 *
 * Each trade module provides the domain-specific logic for:
 * - Material classification (grouping into display categories)
 * - Job baselines (template recipes for each job type)
 * - Equipment system overrides (panel types for electrical, pipe materials for plumbing)
 * - Code-based calculations (load calc for electrical, fixture units for plumbing)
 * - Jurisdiction definitions (city/utility/code configurations)
 * - SVG diagram generation
 */

import type { Job, MaterialItem } from "../core/types";

/** A material group for display in the results panel */
export interface MaterialGroup {
  id: string;
  label: string;
  icon: string;
  items: MaterialItem[];
}

/** A jurisdiction/city within this trade's coverage */
export interface TradeJurisdiction {
  id: string;
  label: string;
  shortLabel: string;
  utility: string;
  county: string;
  state: string;
  defaultZip: string;
  zipPrefixes: string[];
  jobs: Job[];
}

/** A job type template available in this trade */
export interface TradeJobType {
  id: string;
  label: string;
  category?: string;
}

export interface TradeModule {
  /** Unique identifier for this trade */
  readonly id: string;

  /** Display name */
  readonly name: string;

  /** Icon/emoji for this trade */
  readonly icon: string;

  // ── Material Classification ─────────────────────────────────────

  /** Group a flat materials list into categorized sections */
  groupMaterials(materials: MaterialItem[]): MaterialGroup[];

  // ── Jurisdictions & Jobs ────────────────────────────────────────

  /** All jurisdictions configured for this trade */
  readonly jurisdictions: TradeJurisdiction[];

  /** All available job types */
  readonly jobTypes: TradeJobType[];

  /** State/region filter options */
  readonly stateOptions: { value: string; label: string }[];

  /** Default jurisdiction ID */
  readonly defaultJurisdictionId: string;

  // ── Lookups ─────────────────────────────────────────────────────

  /** Find a jurisdiction by ID */
  getJurisdictionById(id: string): TradeJurisdiction | undefined;

  /** Find a jurisdiction by ZIP code */
  getJurisdictionByZip(zip: string): TradeJurisdiction;

  /** Find a specific job within a jurisdiction */
  getJobForJurisdiction(jurisdictionId: string, jobId: string): Job | undefined;
}
