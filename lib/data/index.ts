// Barrel re-export — keeps "@/lib/data" imports working
export type { Supplier, OfficialDoc, MaterialItem, Job } from "./types";
export { AUSTIN_SUPPLIERS } from "./suppliers";
export { AUSTIN_OFFICIAL_DOCS } from "./official-docs";
export { JOBS, JOB_TYPES, getJobById } from "./jobs";

// Multi-jurisdiction support
export type { Jurisdiction } from "./jurisdictions";
export {
  JURISDICTIONS,
  DEFAULT_JURISDICTION,
  getJurisdictionById,
  getJurisdictionByZip,
  getJobForJurisdiction,
} from "./jurisdictions";

// Panel type overrides (4-option: CH, BR, PRL, SPAN)
export type { PanelTypeId, PanelTypeOption } from "./panel-overrides";
export {
  PANEL_TYPE_OPTIONS,
  PANEL_ELIGIBLE_JOBS,
  getDefaultPanelType,
  applyPanelOverride,
} from "./panel-overrides";

// Material grouping
export type { MaterialGroupId, MaterialGroup } from "./material-groups";
export { groupMaterials } from "./material-groups";

// Legacy SPAN overrides (kept for backward compat)
export { SPAN_ELIGIBLE_JOBS, applySpanOverride } from "./span-overrides";
