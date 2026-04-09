import type { JurisdictionConfig } from "../jurisdiction-config";
import { TEMPLE_KILLEEN_OFFICIAL_DOCS } from "../temple-killeen/official-docs";

export const TEMPLE_KILLEEN_CONFIG: JurisdictionConfig = {
  id: "temple-killeen",
  label: "Temple/Killeen, TX (Bell County)",
  shortLabel: "Temple/Killeen, TX",
  utility: "Oncor Electric Delivery",
  county: "Bell County",
  state: "TX",
  defaultZip: "76504",
  zipPrefixes: ["765"],
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
    ["City of Austin", "City of Temple / City of Killeen"],
    ["Travis County", "Bell County"],
  ],
  officialDocs: TEMPLE_KILLEEN_OFFICIAL_DOCS,
};
