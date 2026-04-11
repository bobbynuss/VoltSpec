import type { JurisdictionConfig } from "../jurisdiction-config";
import { DODGE_CITY_OFFICIAL_DOCS } from "../dodge-city/official-docs";

export const DODGE_CITY_CONFIG: JurisdictionConfig = {
  id: "dodge-city",
  label: "Dodge City, KS (Ford County)",
  shortLabel: "Dodge City, KS",
  utility: "Victory Electric / Midwest Energy",
  county: "Ford County",
  state: "KS",
  defaultZip: "67801",
  zipPrefixes: ["678", "674", "675", "676", "677"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Victory Electric / Midwest Energy service application required"],
    ["CPS Energy", "Victory Electric / Midwest Energy"],
    ["CPS", "Victory"],
    ["City of San Antonio", "City of Dodge City"],
    ["Bexar County", "Ford County"],
  ],
  officialDocs: DODGE_CITY_OFFICIAL_DOCS,
};
