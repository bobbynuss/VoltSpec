import type { JurisdictionConfig } from "../jurisdiction-config";
import { CORSICANA_OFFICIAL_DOCS } from "../corsicana/official-docs";

export const CORSICANA_CONFIG: JurisdictionConfig = {
  id: "corsicana",
  label: "Corsicana/Navarro County, TX",
  shortLabel: "Corsicana, TX",
  utility: "Oncor Electric Delivery",
  county: "Navarro County",
  state: "TX",
  defaultZip: "75110",
  zipPrefixes: ["7511"],
  baseline: "san-antonio",

  textReplacements: [

    ["CPS Energy Residential Service Application required", "Oncor Electric Delivery service application required"],
    ["CPS Energy", "Oncor Electric Delivery"],
    ["CPS", "Oncor"],
    ["City of San Antonio", "City of Corsicana"],
    ["Bexar County", "Navarro County"],
  ],
  officialDocs: CORSICANA_OFFICIAL_DOCS,
};
