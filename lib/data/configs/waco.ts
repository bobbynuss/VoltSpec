import type { JurisdictionConfig } from "../jurisdiction-config";
import { WACO_OFFICIAL_DOCS } from "../waco/official-docs";

export const WACO_CONFIG: JurisdictionConfig = {
  id: "waco",
  label: "Waco, TX (McLennan County)",
  shortLabel: "Waco, TX",
  utility: "Oncor Electric Delivery",
  county: "McLennan County",
  state: "TX",
  defaultZip: "76701",
  zipPrefixes: ["767"],
  baseline: "austin",
  meterSocket: {
    catalog: "UTRS213CE",
    description: "200A ringless single-phase OH/UG meter socket, Oncor approved",
    replaces: ["1006352CCH", "U5135-XL-200", "U5135"],
  },
  textReplacements: [
    ["Eaton 1006352CCH", "Eaton UTRS213CE"],
    ["1006352CCH", "UTRS213CE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213CE"],
    ["Milbank U5135", "Eaton UTRS213CE"],
    ["AE-approved", "Oncor approved"],
    ["Austin Energy approved", "Oncor approved"],
    ["AE approved", "Oncor approved"],
    ["Austin Energy ESPA required", "Oncor service application required"],
    ["Austin Energy ESPA", "Oncor service application"],
    ["Austin Energy", "Oncor Electric Delivery"],
    ["City of Austin", "City of Waco"],
    ["Travis County", "McLennan County"],
  ],
  officialDocs: WACO_OFFICIAL_DOCS,
};
