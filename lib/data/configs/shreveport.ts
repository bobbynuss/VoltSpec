/**
 * Shreveport/Bossier City, LA — SWEPCO territory
 * Covers stores: #14 Shreveport, #3 Bossier City
 * BR series, Milbank U7040XLTG meter (same as Tyler SWEPCO)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { SHREVEPORT_OFFICIAL_DOCS } from "../shreveport/official-docs";

export const SHREVEPORT_CONFIG: JurisdictionConfig = {
  id: "shreveport",
  label: "Shreveport/Bossier City, LA (Caddo Parish)",
  shortLabel: "Shreveport, LA",
  utility: "SWEPCO",
  county: "Caddo Parish",
  state: "LA",
  defaultZip: "71106",
  zipPrefixes: ["711", "710"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "U7040XLTG",
    description: "200A single-phase OH/UG 4-terminal meter socket, SWEPCO approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Milbank U7040XLTG"],
    ["1009874ACH", "U7040XLTG"],
    ["1006352CCH", "U7040XLTG"],
    ["Milbank U5135-XL-200", "Milbank U7040XLTG"],
    ["Milbank U5135", "Milbank U7040XLTG"],
    ["CPS Energy Residential Service Application required", "SWEPCO service application required"],
    ["CPS Energy", "SWEPCO"],
    ["CPS", "SWEPCO"],
    ["City of San Antonio", "City of Shreveport / Bossier City"],
    ["Bexar County", "Caddo Parish"],
    ["(210) 353-4050", "(888) 216-3523"],
    ["(210) 353-2222", "(888) 216-3523"],
  ],
  officialDocs: SHREVEPORT_OFFICIAL_DOCS,
};
