/**
 * Lake Charles/Sulphur, LA — Entergy Louisiana territory
 * Covers store: #80 Sulphur
 * BR series, Milbank U7021DLTG meter (built-in hub)
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
    ["City of San Antonio", "City of Lake Charles / City of Sulphur"],
    ["Bexar County", "Calcasieu Parish"],
    ["(210) 353-4050", "(800) 368-3749"],
    ["(210) 353-2222", "(800) 368-3749"],
  ],
  officialDocs: LAKE_CHARLES_OFFICIAL_DOCS,
};
