/**
 * Monroe/West Monroe/Ruston, LA — Entergy Louisiana territory
 * Covers stores: #79 Monroe, #55 West Monroe, #67 Ruston
 * BR series, Milbank U7021DLTG meter (built-in hub)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { MONROE_OFFICIAL_DOCS } from "../monroe-la/official-docs";

export const MONROE_CONFIG: JurisdictionConfig = {
  id: "monroe-la",
  label: "Monroe/West Monroe, LA (Ouachita Parish)",
  shortLabel: "Monroe, LA",
  utility: "Entergy Louisiana",
  county: "Ouachita Parish",
  state: "LA",
  defaultZip: "71203",
  zipPrefixes: ["712"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "U7021DLTG",
    description: "200A single-phase OH/UG meter socket w/ built-in hub, Entergy Louisiana approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Milbank U7021DLTG"],
    ["1009874ACH", "U7021DLTG"],
    ["1006352CCH", "U7021DLTG"],
    ["Milbank U5135-XL-200", "Milbank U7021DLTG"],
    ["Milbank U5135", "Milbank U7021DLTG"],
    ["CPS Energy Residential Service Application required", "Entergy Louisiana service application required"],
    ["CPS Energy", "Entergy Louisiana"],
    ["CPS", "Entergy"],
    ["City of San Antonio", "City of Monroe"],
    ["Bexar County", "Ouachita Parish"],
    ["(210) 353-4050", "(800) 368-3749"],
    ["(210) 353-2222", "(800) 368-3749"],
  ],
  officialDocs: MONROE_OFFICIAL_DOCS,
};
