/**
 * Plumbing Trade Module — TradeModule implementation.
 */

import type { MaterialItem } from "../../core/types";
import type { TradeModule, TradeJurisdiction, TradeJobType, MaterialGroup } from "../types";
import { groupPlumbingMaterials } from "./material-classifier";
import {
  buildAustinPlumbingJobs,
  buildSanAntonioPlumbingJobs,
  PLUMBING_JOB_TYPES,
} from "./jobs";

// ── Jurisdictions ────────────────────────────────────────────────

const JURISDICTIONS: TradeJurisdiction[] = [
  {
    id: "austin",
    label: "Austin, TX (Travis County)",
    shortLabel: "Austin, TX",
    utility: "Austin Water",
    county: "Travis County",
    state: "TX",
    defaultZip: "78744",
    zipPrefixes: ["787", "786", "785"],
    jobs: buildAustinPlumbingJobs(),
  },
  {
    id: "san-antonio",
    label: "San Antonio, TX (Bexar County)",
    shortLabel: "San Antonio, TX",
    utility: "SAWS",
    county: "Bexar County",
    state: "TX",
    defaultZip: "78205",
    zipPrefixes: ["782", "781"],
    jobs: buildSanAntonioPlumbingJobs(),
  },
];

const STATE_OPTIONS = [
  { value: "ALL", label: "All States" },
  { value: "TX", label: "Texas" },
];

// ── Module instance ──────────────────────────────────────────────

export const plumbingModule: TradeModule = {
  id: "plumbing",
  name: "Plumbing",
  icon: "🔧",

  groupMaterials(materials: MaterialItem[]): MaterialGroup[] {
    return groupPlumbingMaterials(materials);
  },

  get jurisdictions(): TradeJurisdiction[] {
    return JURISDICTIONS;
  },

  get jobTypes(): TradeJobType[] {
    return PLUMBING_JOB_TYPES.map((jt) => ({
      id: jt.id,
      label: jt.label,
    }));
  },

  get stateOptions() {
    return STATE_OPTIONS;
  },

  get defaultJurisdictionId() {
    return "austin";
  },

  getJurisdictionById(id: string) {
    return JURISDICTIONS.find((j) => j.id === id);
  },

  getJurisdictionByZip(zip: string) {
    const match = JURISDICTIONS.find((j) =>
      j.zipPrefixes.some((p) => zip.startsWith(p))
    );
    return match ?? JURISDICTIONS[0];
  },

  getJobForJurisdiction(jurisdictionId: string, jobId: string) {
    const jur = JURISDICTIONS.find((j) => j.id === jurisdictionId);
    return jur?.jobs.find((job) => job.id === jobId);
  },
};
