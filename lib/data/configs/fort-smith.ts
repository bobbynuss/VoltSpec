/**
 * Fort Smith, AR — OG&E / AEP SWEPCO territory
 * Covers stores: #105 Fort Smith, #104 Russellville
 * BR series, placeholder pricing (SA baseline)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { FORT_SMITH_OFFICIAL_DOCS } from "../fort-smith/official-docs";

export const FORT_SMITH_CONFIG: JurisdictionConfig = {
  id: "fort-smith",
  label: "Fort Smith, AR (Sebastian County)",
  shortLabel: "Fort Smith, AR",
  utility: "OG&E / AEP SWEPCO",
  county: "Sebastian County",
  state: "AR",
  defaultZip: "72901",
  zipPrefixes: ["729", "728"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "OG&E / SWEPCO service application required"],
    ["CPS Energy", "OG&E / SWEPCO"],
    ["CPS", "OG&E"],
    ["City of San Antonio", "City of Fort Smith"],
    ["Bexar County", "Sebastian County"],
    ["(210) 353-4050", "(888) 216-3523"],
    ["(210) 353-2222", "(888) 216-3523"],
  ],
  officialDocs: FORT_SMITH_OFFICIAL_DOCS,
};
