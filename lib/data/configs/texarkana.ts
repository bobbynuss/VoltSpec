/**
 * Texarkana, TX — SWEPCO territory
 * Covers store: #30 Texarkana
 * BR series, SA baseline pricing (real pricing TBD from invoices)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { TEXARKANA_OFFICIAL_DOCS } from "../texarkana/official-docs";

export const TEXARKANA_CONFIG: JurisdictionConfig = {
  id: "texarkana",
  label: "Texarkana, TX (Bowie County)",
  shortLabel: "Texarkana, TX",
  utility: "SWEPCO",
  county: "Bowie County",
  state: "TX",
  defaultZip: "75501",
  zipPrefixes: ["755"],
  baseline: "san-antonio",

  textReplacements: [
    ["CPS Energy Residential Service Application required", "SWEPCO service application required"],
    ["CPS Energy", "SWEPCO"],
    ["CPS", "SWEPCO"],
    ["City of San Antonio", "City of Texarkana"],
    ["Bexar County", "Bowie County"],
  ],

  officialDocs: TEXARKANA_OFFICIAL_DOCS,
};
