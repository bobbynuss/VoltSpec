/**
 * Alexandria/Pineville/Natchitoches, LA — CLECO / Entergy Louisiana territory
 * Covers stores: #54 Alexandria, #35 Pineville, #20 Natchitoches, #57 Leesville, #74 Vidalia
 * BR series, Milbank U7021DLTG meter (built-in hub)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { ALEXANDRIA_OFFICIAL_DOCS } from "../alexandria-la/official-docs";

export const ALEXANDRIA_CONFIG: JurisdictionConfig = {
  id: "alexandria-la",
  label: "Alexandria/Central LA (Rapides Parish)",
  shortLabel: "Alexandria, LA",
  utility: "CLECO / Entergy Louisiana",
  county: "Rapides Parish",
  state: "LA",
  defaultZip: "71302",
  zipPrefixes: ["713", "714"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "U7021DLTG",
    description: "200A single-phase OH/UG meter socket w/ built-in hub, CLECO / Entergy Louisiana approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Milbank U7021DLTG"],
    ["1009874ACH", "U7021DLTG"],
    ["1006352CCH", "U7021DLTG"],
    ["Milbank U5135-XL-200", "Milbank U7021DLTG"],
    ["Milbank U5135", "Milbank U7021DLTG"],
    ["CPS Energy Residential Service Application required", "CLECO/Entergy service application required"],
    ["CPS Energy", "CLECO / Entergy Louisiana"],
    ["CPS", "CLECO"],
    ["City of San Antonio", "City of Alexandria"],
    ["Bexar County", "Rapides Parish"],
    ["(210) 353-4050", "(800) 622-6537"],
    ["(210) 353-2222", "(800) 622-6537"],
  ],
  officialDocs: ALEXANDRIA_OFFICIAL_DOCS,
};
