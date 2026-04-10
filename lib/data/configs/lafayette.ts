/**
 * Lafayette, LA — Entergy Louisiana / LUS territory
 * Covers store: #59 Lafayette
 * BR series, Eaton UTRS213BE meter
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
    catalog: "UTRS213BE",
    description: "200A ringless single-phase OH/UG meter socket, Entergy Louisiana / LUS approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Eaton UTRS213BE"],
    ["1009874ACH", "UTRS213BE"],
    ["1006352CCH", "UTRS213BE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213BE"],
    ["Milbank U5135", "Eaton UTRS213BE"],
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
