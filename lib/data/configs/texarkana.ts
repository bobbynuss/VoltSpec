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
  meterSocket: {
    catalog: "U7040XLTG",
    description: "200A ringless single-phase meter socket, SWEPCO approved",
    replaces: ["U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Milbank U5135-XL-200", "Milbank U7040XLTG"],
    ["Milbank U5135", "Milbank U7040XLTG"],
    ["1006352CCH", "U7040XLTG"],
    ["CPS Energy Residential Service Application required", "SWEPCO service application required"],
    ["CPS Energy", "SWEPCO"],
    ["CPS", "SWEPCO"],
    ["City of San Antonio", "City of Texarkana"],
    ["Bexar County", "Bowie County"],
  ],

  officialDocs: TEXARKANA_OFFICIAL_DOCS,
};
