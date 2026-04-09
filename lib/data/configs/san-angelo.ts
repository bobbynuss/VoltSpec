import type { JurisdictionConfig } from "../jurisdiction-config";
import { SAN_ANGELO_OFFICIAL_DOCS } from "../san-angelo/official-docs";

export const SAN_ANGELO_CONFIG: JurisdictionConfig = {
  id: "san-angelo",
  label: "San Angelo, TX (Tom Green County)",
  shortLabel: "San Angelo, TX",
  utility: "AEP Texas",
  county: "Tom Green County",
  state: "TX",
  defaultZip: "76901",
  zipPrefixes: ["769"],
  baseline: "austin",
  meterSocket: {
    catalog: "UTRS213CE",
    description: "200A ringless single-phase OH/UG meter socket, AEP Texas approved",
    replaces: ["1006352CCH", "U5135-XL-200", "U5135"],
  },
  textReplacements: [
    ["Eaton 1006352CCH", "Eaton UTRS213CE"],
    ["1006352CCH", "UTRS213CE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213CE"],
    ["Milbank U5135", "Eaton UTRS213CE"],
    ["AE-approved", "AEP Texas approved"],
    ["Austin Energy approved", "AEP Texas approved"],
    ["AE approved", "AEP approved"],
    ["Austin Energy ESPA required", "AEP Texas service application required"],
    ["Austin Energy ESPA", "AEP Texas service application"],
    ["Austin Energy", "AEP Texas"],
    ["City of Austin", "City of San Angelo"],
    ["Travis County", "Tom Green County"],
  ],
  officialDocs: SAN_ANGELO_OFFICIAL_DOCS,
};
