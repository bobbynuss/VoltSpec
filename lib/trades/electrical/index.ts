/**
 * Electrical Trade Module — TradeModule implementation.
 *
 * Wraps all electrical-specific logic (material classification, panel system,
 * load calc, POA, jurisdictions) behind the standard trade interface.
 */

import type { Job, MaterialItem } from "../../core/types";
import type { TradeModule, TradeJurisdiction, TradeJobType, MaterialGroup } from "../types";
import { groupMaterials } from "./material-classifier";
import {
  JURISDICTIONS,
  STATE_OPTIONS,
  DEFAULT_JURISDICTION,
  getJurisdictionById,
  getJurisdictionByZip,
  getJobForJurisdiction,
} from "../../data/jurisdictions";
import { JOB_TYPES } from "../../data/jobs";

// ── Adapter: map existing Jurisdiction to TradeJurisdiction ──────

function toTradeJurisdiction(j: any): TradeJurisdiction {
  return {
    id: j.id,
    label: j.label,
    shortLabel: j.shortLabel,
    utility: j.utility,
    county: j.county,
    state: j.state,
    defaultZip: j.defaultZip,
    zipPrefixes: j.zipPrefixes,
    jobs: j.jobs,
  };
}

// ── Job categories ───────────────────────────────────────────────

/**
 * Categories for grouping jobs in the UI dropdown.
 * Order matters — this is the display order.
 */
export const JOB_CATEGORIES = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "new-home", label: "New Home Build (Phased)" },
  { id: "multifamily", label: "Multifamily Build-Out (Phased)" },
  { id: "hotel", label: "Hotel Build-Out (Phased)" },
  { id: "datacenter", label: "Data Center Build-Out (Phased)" },
] as const;

export type JobCategoryId = (typeof JOB_CATEGORIES)[number]["id"];

const CATEGORY_MAP: Record<string, JobCategoryId> = {
  // ── Residential ────────────────────────────────────────
  "new-200a-residential":          "residential",
  "200a-upgrade":                  "residential",
  "new-320a-service":              "residential",
  "new-400a-service":              "residential",
  "100a-subpanel":                 "residential",
  "detached-garage-subpanel":      "residential",
  "meter-base-replacement":        "residential",
  "ev-charger-50a":                "residential",
  "ev-charger-80a":                "residential",
  "generator-ats":                 "residential",
  "solar-pv-20kw":                 "residential",
  "battery-storage":               "residential",
  "whole-house-battery-solar":     "residential",
  "span-panel-upgrade":            "residential",
  "span-subpanel":                 "residential",
  "pool-electrical":               "residential",
  "hot-tub-spa":                   "residential",
  "landscape-lighting":            "residential",
  "temp-power-pole":               "residential",
  "residential-trim-out":          "residential",
  "pole-light-takeoff":            "commercial",

  // ── Commercial ─────────────────────────────────────────
  "commercial-3phase-200a":        "commercial",
  "commercial-400a-3phase":        "commercial",

  // ── New Home Build (Phased) ────────────────────────────
  "res-service-entrance":          "new-home",
  "res-rough-in":                  "new-home",
  "res-rough-in-dedicated":        "new-home",
  "res-trim-out":                  "new-home",
  "res-final-inspection":          "new-home",

  // ── Multifamily Build-Out (Phased) ─────────────────────
  "mf-temp-power":                 "multifamily",
  "mf-site-distribution":          "multifamily",
  "mf-building-risers":            "multifamily",
  "mf-unit-roughin":               "multifamily",
  "mf-unit-panels":                "multifamily",
  "mf-common-areas":               "multifamily",
  "mf-trim-commissioning":         "multifamily",

  // ── Hotel Build-Out (Phased) ───────────────────────────
  "hotel-temp-power":              "hotel",
  "hotel-switchgear":              "hotel",
  "hotel-floor-dist":              "hotel",
  "hotel-room-roughin":            "hotel",
  "hotel-room-panels":             "hotel",
  "hotel-common-areas":            "hotel",
  "hotel-trim-commissioning":      "hotel",

  // ── Data Center Build-Out (Phased) ─────────────────────
  "dc-temp-power":                 "datacenter",
  "dc-duct-bank":                  "datacenter",
  "dc-switchgear":                 "datacenter",
  "dc-generator-ups":              "datacenter",
  "dc-critical-dist":              "datacenter",
  "dc-structured-cabling":         "datacenter",
  "dc-final-commissioning":        "datacenter",
};

function getJobCategory(jobId: string): JobCategoryId {
  return CATEGORY_MAP[jobId] ?? "residential";
}

// ── Module instance ──────────────────────────────────────────────

export const electricalModule: TradeModule = {
  id: "electrical",
  name: "Electrical",
  icon: "⚡",

  groupMaterials(materials: MaterialItem[]): MaterialGroup[] {
    return groupMaterials(materials);
  },

  get jurisdictions(): TradeJurisdiction[] {
    return JURISDICTIONS.map(toTradeJurisdiction);
  },

  get jobTypes(): TradeJobType[] {
    return JOB_TYPES.map((jt) => ({
      id: jt.id,
      label: jt.label,
      category: getJobCategory(jt.id),
    }));
  },

  get stateOptions() {
    return STATE_OPTIONS;
  },

  get defaultJurisdictionId() {
    return DEFAULT_JURISDICTION.id;
  },

  getJurisdictionById(id: string): TradeJurisdiction | undefined {
    const j = getJurisdictionById(id);
    return j ? toTradeJurisdiction(j) : undefined;
  },

  getJurisdictionByZip(zip: string): TradeJurisdiction {
    return toTradeJurisdiction(getJurisdictionByZip(zip));
  },

  getJobForJurisdiction(jurisdictionId: string, jobId: string): Job | undefined {
    return getJobForJurisdiction(jurisdictionId, jobId);
  },
};

// Re-export individual pieces for backward-compatible imports
export { groupMaterials } from "./material-classifier";
export type { MaterialGroupId, MaterialGroup } from "./material-classifier";
export {
  PANEL_TYPE_OPTIONS,
  PANEL_ELIGIBLE_JOBS,
  getDefaultPanelType,
  applyPanelOverride,
} from "./panel-system";
export type { PanelTypeId, PanelTypeOption } from "./panel-system";
export { SPAN_ELIGIBLE_JOBS, applySpanOverride } from "./span-overrides";
export { POA_OPTIONS, DEFAULT_POA_ID, isMeterJob } from "./poa";
export type { POAOption } from "./poa";
export type {
  LoadCalcInputs,
  LoadCalcResult,
} from "./load-calc";
export {
  calculateLoad,
  DEFAULT_INPUTS,
} from "./load-calc";
