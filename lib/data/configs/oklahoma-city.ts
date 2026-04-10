/**
 * Oklahoma City, OK — OG&E (Oklahoma Gas & Electric) territory
 * Covers stores: #122 Oklahoma City, #128 Edmond, #132 Moore, #184 Yukon, #179 Midwest City
 * BR series, placeholder pricing (SA baseline)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { OKC_OFFICIAL_DOCS } from "../oklahoma-city/official-docs";

export const OKC_CONFIG: JurisdictionConfig = {
  id: "oklahoma-city",
  label: "Oklahoma City, OK (Oklahoma County)",
  shortLabel: "Oklahoma City, OK",
  utility: "OG&E (Oklahoma Gas & Electric)",
  county: "Oklahoma County",
  state: "OK",
  defaultZip: "73108",
  zipPrefixes: ["730", "731", "731", "733", "734"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "OG&E service application required"],
    ["CPS Energy", "OG&E"],
    ["CPS", "OG&E"],
    ["City of San Antonio", "City of Oklahoma City"],
    ["Bexar County", "Oklahoma County"],
    ["(210) 353-4050", "(405) 272-9741"],
    ["(210) 353-2222", "(405) 272-9741"],
  ],
  officialDocs: OKC_OFFICIAL_DOCS,
};
