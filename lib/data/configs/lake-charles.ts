/**
 * Lake Charles/Sulphur, LA — Entergy Louisiana territory
 * Covers store: #80 Sulphur
 * BR series, Eaton UTRS213BE meter
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { LAKE_CHARLES_OFFICIAL_DOCS } from "../lake-charles/official-docs";

export const LAKE_CHARLES_CONFIG: JurisdictionConfig = {
  id: "lake-charles",
  label: "Lake Charles/Sulphur, LA (Calcasieu Parish)",
  shortLabel: "Lake Charles, LA",
  utility: "Entergy Louisiana",
  county: "Calcasieu Parish",
  state: "LA",
  defaultZip: "70601",
  zipPrefixes: ["706", "707"],
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
    ["City of San Antonio", "City of Lake Charles / City of Sulphur"],
    ["Bexar County", "Calcasieu Parish"],
    ["(210) 353-4050", "(800) 368-3749"],
    ["(210) 353-2222", "(800) 368-3749"],
  ],
  officialDocs: LAKE_CHARLES_OFFICIAL_DOCS,
};
