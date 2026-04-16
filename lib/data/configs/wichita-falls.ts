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
  baseline: "san-antonio",
  meterSocket: {
    catalog: "UTRS213CE",
    description: "200A ringless single-phase OH/UG meter socket, Oncor approved",
    replaces: ["U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Milbank U5135-XL-200", "Eaton UTRS213CE"],
    ["Milbank U5135", "Eaton UTRS213CE"],
    ["1006352CCH", "UTRS213CE"],
    ["CPS Energy Residential Service Application required", "Oncor service application required"],
    ["CPS Energy", "Oncor Electric Delivery"],
    ["CPS", "Oncor"],
    ["City of San Antonio", "City of Wichita Falls"],
    ["Bexar County", "Wichita County"],
  ],
  officialDocs: WICHITA_FALLS_OFFICIAL_DOCS,
};
