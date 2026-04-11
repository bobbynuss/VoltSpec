import type { JurisdictionConfig } from "../jurisdiction-config";
import { PALESTINE_OFFICIAL_DOCS } from "../palestine/official-docs";

export const PALESTINE_CONFIG: JurisdictionConfig = {
  id: "palestine",
  label: "Palestine/East TX (Anderson County)",
  shortLabel: "Palestine, TX",
  utility: "Oncor Electric Delivery",
  county: "Anderson County",
  state: "TX",
  defaultZip: "75803",
  zipPrefixes: ["758"],
  baseline: "san-antonio",

  textReplacements: [

    ["CPS Energy Residential Service Application required", "Oncor Electric Delivery service application required"],
    ["CPS Energy", "Oncor Electric Delivery"],
    ["CPS", "Oncor"],
    ["City of San Antonio", "City of Palestine"],
    ["Bexar County", "Anderson County"],
  ],
  officialDocs: PALESTINE_OFFICIAL_DOCS,
};
