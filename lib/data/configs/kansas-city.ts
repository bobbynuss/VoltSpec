import type { JurisdictionConfig } from "../jurisdiction-config";
import { KANSAS_CITY_OFFICIAL_DOCS } from "../kansas-city/official-docs";

export const KANSAS_CITY_CONFIG: JurisdictionConfig = {
  id: "kansas-city",
  label: "Kansas City Metro, KS/MO",
  shortLabel: "Kansas City, KS",
  utility: "Evergy",
  county: "Multiple Counties",
  state: "KS",
  defaultZip: "66219",
  zipPrefixes: ["662", "660", "661", "640", "641"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Evergy service application required"],
    ["CPS Energy", "Evergy"],
    ["CPS", "Evergy"],
    ["City of San Antonio", "City of Kansas City"],
    ["Bexar County", "Multiple Counties"],
  ],
  officialDocs: KANSAS_CITY_OFFICIAL_DOCS,
};
