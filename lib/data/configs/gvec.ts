/**
 * GVEC (Guadalupe Valley Electric Cooperative) Jurisdiction Config
 *
 * Inherits from Austin (CH series). Same equipment/meter sockets as Austin.
 * Patches: Utility refs only (Austin Energy → GVEC).
 * No pricing overlay, no meter socket swap.
 * patchMaterialText: true (utility name swaps in material specs).
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { GVEC_OFFICIAL_DOCS } from "../gvec/official-docs";

export const GVEC_CONFIG: JurisdictionConfig = {
  id: "gvec",
  label: "Guadalupe Valley, TX (GVEC)",
  shortLabel: "Guadalupe Valley (GVEC)",
  utility: "Guadalupe Valley Electric Cooperative",
  county: "Multiple Counties",
  state: "TX",
  defaultZip: "78130",
  zipPrefixes: ["7813", "7816", "7815"],

  baseline: "austin",
  patchMaterialText: true,

  textReplacements: [
    ["AE-approved for Central Texas", "GVEC-approved for South Central Texas"],
    ["AE-approved", "GVEC-approved"],
    ["AE approved", "GVEC approved"],
    ["Austin Energy approved", "GVEC approved"],
    ["Austin Energy standard", "GVEC standard"],
    ["Austin Energy amendment", "GVEC requirement"],
    ["AE Design Criteria", "GVEC service standards"],
    ["AE engineering", "GVEC engineering"],
    ["AE inspection", "GVEC inspection"],
    ["AE ESPA", "GVEC service application"],
    ["Austin Energy ESPA", "GVEC service application"],
    ["Austin Energy", "GVEC"],
    ["City of Austin electrical permit", "County electrical permit (GVEC territory)"],
    ["City of Austin", "Local AHJ"],
    ["Austin permit required", "Local permit required"],
    ["contact AE", "contact GVEC"],
    ["AE requires", "GVEC requires"],
    ["AE will", "GVEC will"],
    ["AE may", "GVEC may"],
    ["submit to AE", "submit to GVEC"],
    ["(AE)", "(GVEC)"],
    ["(AE ", "(GVEC "],
  ],

  officialDocs: GVEC_OFFICIAL_DOCS,
};
