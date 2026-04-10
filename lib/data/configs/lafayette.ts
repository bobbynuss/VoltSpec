/**
 * Lafayette, LA — Entergy Louisiana / LUS territory
 * Covers store: #59 Lafayette
 * BR series, Milbank U7021DLTG meter (built-in hub)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { LAFAYETTE_OFFICIAL_DOCS } from "../lafayette/official-docs";

export const LAFAYETTE_CONFIG: JurisdictionConfig = {
  id: "lafayette",
  label: "Lafayette, LA (Lafayette Parish)",
  shortLabel: "Lafayette, LA",
  utility: "Entergy Louisiana / LUS",
  county: "Lafayette Parish",
  state: "LA",
  defaultZip: "70507",
  zipPrefixes: ["705", "704"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "U7021DLTG",
    description: "200A single-phase OH/UG meter socket w/ built-in hub, Entergy Louisiana / LUS approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Milbank U7021DLTG"],
    ["1009874ACH", "U7021DLTG"],
    ["1006352CCH", "U7021DLTG"],
    ["Milbank U5135-XL-200", "Milbank U7021DLTG"],
    ["Milbank U5135", "Milbank U7021DLTG"],
    ["CPS Energy Residential Service Application required", "Entergy Louisiana / LUS service application required"],
    ["CPS Energy", "Entergy Louisiana"],
    ["CPS", "Entergy"],
    ["City of San Antonio", "City of Lafayette"],
    ["Bexar County", "Lafayette Parish"],
    ["(210) 353-4050", "(800) 368-3749"],
    ["(210) 353-2222", "(800) 368-3749"],
  ],
  officialDocs: LAFAYETTE_OFFICIAL_DOCS,
};
