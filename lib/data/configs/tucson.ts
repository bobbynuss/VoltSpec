import type { JurisdictionConfig } from "../jurisdiction-config";
import { TUCSON_OFFICIAL_DOCS } from "../tucson/official-docs";

export const TUCSON_CONFIG: JurisdictionConfig = {
  id: "tucson",
  label: "Tucson, AZ (Pima County)",
  shortLabel: "Tucson, AZ",
  utility: "TEP (Tucson Electric Power)",
  county: "Pima County",
  state: "AZ",
  defaultZip: "85713",
  zipPrefixes: ["857", "856"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "TEP (Tucson Electric Power) service application required"],
    ["CPS Energy", "TEP (Tucson Electric Power)"],
    ["CPS", "TEP"],
    ["City of San Antonio", "City of Tucson"],
    ["Bexar County", "Pima County"],
  ],
  officialDocs: TUCSON_OFFICIAL_DOCS,
};
