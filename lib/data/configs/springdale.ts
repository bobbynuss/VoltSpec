/**
 * Springdale/NW Arkansas, AR — OG&E / SWEPCO / Carroll Electric territory
 * Covers stores: #106 Springdale, #112 Bentonville, #124 Rogers, #125 Fayetteville, #126 Siloam Springs
 * BR series, placeholder pricing (SA baseline)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { SPRINGDALE_OFFICIAL_DOCS } from "../springdale/official-docs";

export const SPRINGDALE_CONFIG: JurisdictionConfig = {
  id: "springdale",
  label: "Springdale/NW Arkansas (Washington County)",
  shortLabel: "NW Arkansas",
  utility: "OG&E / SWEPCO / Carroll Electric",
  county: "Washington County",
  state: "AR",
  defaultZip: "72762",
  zipPrefixes: ["727", "726"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "OG&E / SWEPCO service application required"],
    ["CPS Energy", "OG&E / SWEPCO"],
    ["CPS", "OG&E"],
    ["City of San Antonio", "City of Springdale / NW Arkansas"],
    ["Bexar County", "Washington County"],
    ["(210) 353-4050", "(888) 216-3523"],
    ["(210) 353-2222", "(888) 216-3523"],
  ],
  officialDocs: SPRINGDALE_OFFICIAL_DOCS,
};
