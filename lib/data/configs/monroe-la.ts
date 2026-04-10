/**
 * Monroe/West Monroe/Ruston, LA — Entergy Louisiana territory
 * Covers stores: #79 Monroe, #55 West Monroe, #67 Ruston
 * BR series, Eaton UTRS213BE meter
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
    catalog: "UTRS213BE",
    description: "200A ringless single-phase OH/UG meter socket, Entergy Louisiana approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Eaton UTRS213BE"],
    ["1009874ACH", "UTRS213BE"],
    ["1006352CCH", "UTRS213BE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213BE"],
    ["Milbank U5135", "Eaton UTRS213BE"],
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
