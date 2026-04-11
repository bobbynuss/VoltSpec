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
