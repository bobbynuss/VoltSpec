import type { JurisdictionConfig } from "../jurisdiction-config";
import { GREENVILLE_TX_OFFICIAL_DOCS } from "../greenville-tx/official-docs";

export const GREENVILLE_TX_CONFIG: JurisdictionConfig = {
  id: "greenville-tx",
  label: "Greenville/Hunt County, TX",
  shortLabel: "Greenville, TX",
  utility: "Oncor Electric Delivery",
  county: "Hunt County",
  state: "TX",
  defaultZip: "75402",
  zipPrefixes: ["7540", "7548"],
  baseline: "san-antonio",

  textReplacements: [

    ["CPS Energy Residential Service Application required", "Oncor Electric Delivery service application required"],
    ["CPS Energy", "Oncor Electric Delivery"],
    ["CPS", "Oncor"],
    ["City of San Antonio", "City of Greenville"],
    ["Bexar County", "Hunt County"],
  ],
  officialDocs: GREENVILLE_TX_OFFICIAL_DOCS,
};
