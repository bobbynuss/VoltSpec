/**
 * BEC (Bandera Electric Cooperative) Jurisdiction Config
 *
 * Inherits from Austin (CH series). Same equipment/meter sockets as Austin.
 * Patches: Utility refs only (Austin Energy → BEC).
 * No pricing overlay, no meter socket swap.
 * patchMaterialText: true (utility name swaps in material specs).
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { BEC_OFFICIAL_DOCS } from "../bec/official-docs";

export const BEC_CONFIG: JurisdictionConfig = {
  id: "bec",
  label: "Bandera Electric (BEC)",
  shortLabel: "Bandera Electric (BEC)",
  utility: "Bandera Electric Cooperative",
  county: "Bandera County",
  state: "TX",
  defaultZip: "78003",
  zipPrefixes: ["78003", "78063", "78006"],

  baseline: "austin",
  patchMaterialText: true,

  textReplacements: [
    ["AE-approved for Central Texas", "BEC-approved for Bandera County area"],
    ["AE-approved", "BEC-approved"],
    ["AE approved", "BEC approved"],
    ["Austin Energy approved", "BEC approved"],
    ["Austin Energy standard", "BEC standard"],
    ["Austin Energy amendment", "BEC requirement"],
    ["AE Design Criteria", "BEC service standards"],
    ["AE engineering", "BEC engineering"],
    ["AE inspection", "BEC inspection"],
    ["AE ESPA", "BEC service application"],
    ["Austin Energy ESPA", "BEC service application"],
    ["Austin Energy", "BEC"],
    ["City of Austin electrical permit", "County electrical permit (BEC territory)"],
    ["City of Austin", "Local AHJ"],
    ["Austin permit required", "Local permit required"],
    ["contact AE", "contact BEC"],
    ["AE requires", "BEC requires"],
    ["AE will", "BEC will"],
    ["AE may", "BEC may"],
    ["submit to AE", "submit to BEC"],
    ["(AE)", "(BEC)"],
    ["(AE ", "(BEC "],
  ],

  officialDocs: BEC_OFFICIAL_DOCS,
};
