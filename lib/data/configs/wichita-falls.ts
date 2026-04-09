import type { JurisdictionConfig } from "../jurisdiction-config";
import { WICHITA_FALLS_OFFICIAL_DOCS } from "../wichita-falls/official-docs";

export const WICHITA_FALLS_CONFIG: JurisdictionConfig = {
  id: "wichita-falls",
  label: "Wichita Falls, TX (Wichita County)",
  shortLabel: "Wichita Falls, TX",
  utility: "Oncor Electric Delivery",
  county: "Wichita County",
  state: "TX",
  defaultZip: "76301",
  zipPrefixes: ["763"],
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
    ["City of Austin", "City of Wichita Falls"],
    ["Travis County", "Wichita County"],
  ],
  officialDocs: WICHITA_FALLS_OFFICIAL_DOCS,
};
