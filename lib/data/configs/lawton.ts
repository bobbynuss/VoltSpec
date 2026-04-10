/**
 * Lawton/Duncan, OK — PSO / OG&E territory
 * Covers stores: #109 Lawton, #118 Duncan
 * BR series, placeholder pricing (SA baseline)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { LAWTON_OFFICIAL_DOCS } from "../lawton/official-docs";

export const LAWTON_CONFIG: JurisdictionConfig = {
  id: "lawton",
  label: "Lawton, OK (Comanche County)",
  shortLabel: "Lawton, OK",
  utility: "PSO / OG&E",
  county: "Comanche County",
  state: "OK",
  defaultZip: "73501",
  zipPrefixes: ["735"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "PSO/OG&E service application required"],
    ["CPS Energy", "PSO / OG&E"],
    ["CPS", "PSO"],
    ["City of San Antonio", "City of Lawton"],
    ["Bexar County", "Comanche County"],
    ["(210) 353-4050", "(888) 216-3523"],
    ["(210) 353-2222", "(888) 216-3523"],
  ],
  officialDocs: LAWTON_OFFICIAL_DOCS,
};
