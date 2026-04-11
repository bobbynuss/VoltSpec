import type { JurisdictionConfig } from "../jurisdiction-config";
import { WICHITA_OFFICIAL_DOCS } from "../wichita/official-docs";

export const WICHITA_CONFIG: JurisdictionConfig = {
  id: "wichita",
  label: "Wichita, KS (Sedgwick County)",
  shortLabel: "Wichita, KS",
  utility: "Evergy",
  county: "Sedgwick County",
  state: "KS",
  defaultZip: "67213",
  zipPrefixes: ["672", "670", "671"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Evergy service application required"],
    ["CPS Energy", "Evergy"],
    ["CPS", "Evergy"],
    ["City of San Antonio", "City of Wichita"],
    ["Bexar County", "Sedgwick County"],
  ],
  officialDocs: WICHITA_OFFICIAL_DOCS,
};
