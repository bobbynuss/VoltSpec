import type { JurisdictionConfig } from "../jurisdiction-config";
import { BROWNWOOD_OFFICIAL_DOCS } from "../brownwood/official-docs";

export const BROWNWOOD_CONFIG: JurisdictionConfig = {
  id: "brownwood",
  label: "Brownwood, TX (Brown County)",
  shortLabel: "Brownwood, TX",
  utility: "AEP Texas",
  county: "Brown County",
  state: "TX",
  defaultZip: "76801",
  zipPrefixes: ["768"],
  baseline: "san-antonio",

  textReplacements: [

    ["CPS Energy Residential Service Application required", "AEP Texas service application required"],
    ["CPS Energy", "AEP Texas"],
    ["CPS", "AEP"],
    ["City of San Antonio", "City of Brownwood"],
    ["Bexar County", "Brown County"],
  ],
  officialDocs: BROWNWOOD_OFFICIAL_DOCS,
};
