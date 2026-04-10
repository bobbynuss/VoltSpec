/**
 * Tulsa, OK — PSO (Public Service Company of Oklahoma / AEP) territory
 * Covers stores: #134 Tulsa, #176 Bartlesville, #147 Stillwater, #162 Pryor
 * BR series, placeholder pricing (SA baseline)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { TULSA_OFFICIAL_DOCS } from "../tulsa/official-docs";

export const TULSA_CONFIG: JurisdictionConfig = {
  id: "tulsa",
  label: "Tulsa, OK (Tulsa County)",
  shortLabel: "Tulsa, OK",
  utility: "PSO (AEP Oklahoma)",
  county: "Tulsa County",
  state: "OK",
  defaultZip: "74129",
  zipPrefixes: ["740", "741", "743", "744"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "PSO service application required"],
    ["CPS Energy", "PSO"],
    ["CPS", "PSO"],
    ["City of San Antonio", "City of Tulsa"],
    ["Bexar County", "Tulsa County"],
    ["(210) 353-4050", "(888) 216-3523"],
    ["(210) 353-2222", "(888) 216-3523"],
  ],
  officialDocs: TULSA_OFFICIAL_DOCS,
};
