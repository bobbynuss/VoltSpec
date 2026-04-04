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
