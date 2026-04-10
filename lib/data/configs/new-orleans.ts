/**
 * New Orleans / Northshore, LA — Entergy New Orleans territory
 * Covers stores: #111 New Orleans (Harahan), #137 Covington
 * BR series, Milbank U7021DLTG meter (built-in hub)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { NEW_ORLEANS_OFFICIAL_DOCS } from "../new-orleans/official-docs";

export const NEW_ORLEANS_CONFIG: JurisdictionConfig = {
  id: "new-orleans",
  label: "New Orleans, LA (Orleans Parish)",
  shortLabel: "New Orleans, LA",
  utility: "Entergy New Orleans",
  county: "Orleans Parish",
  state: "LA",
  defaultZip: "70123",
  zipPrefixes: ["700", "701", "703"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "U7021DLTG",
    description: "200A single-phase OH/UG meter socket w/ built-in hub, Entergy New Orleans approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Milbank U7021DLTG"],
    ["1009874ACH", "U7021DLTG"],
    ["1006352CCH", "U7021DLTG"],
    ["Milbank U5135-XL-200", "Milbank U7021DLTG"],
    ["Milbank U5135", "Milbank U7021DLTG"],
    ["CPS Energy Residential Service Application required", "Entergy New Orleans service application required"],
    ["CPS Energy", "Entergy New Orleans"],
    ["CPS", "Entergy"],
    ["City of San Antonio", "City of New Orleans"],
    ["Bexar County", "Orleans Parish"],
    ["(210) 353-4050", "(800) 368-3749"],
    ["(210) 353-2222", "(800) 368-3749"],
  ],
  officialDocs: NEW_ORLEANS_OFFICIAL_DOCS,
};
