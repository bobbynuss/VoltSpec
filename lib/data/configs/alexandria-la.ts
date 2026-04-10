/**
 * Alexandria/Pineville/Natchitoches, LA — CLECO / Entergy Louisiana territory
 * Covers stores: #54 Alexandria, #35 Pineville, #20 Natchitoches, #57 Leesville, #74 Vidalia
 * BR series, Eaton UTRS213BE meter
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
    catalog: "UTRS213BE",
    description: "200A ringless single-phase OH/UG meter socket, CLECO / Entergy Louisiana approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Eaton UTRS213BE"],
    ["1009874ACH", "UTRS213BE"],
    ["1006352CCH", "UTRS213BE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213BE"],
    ["Milbank U5135", "Eaton UTRS213BE"],
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
