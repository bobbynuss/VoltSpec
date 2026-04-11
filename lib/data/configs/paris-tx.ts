import type { JurisdictionConfig } from "../jurisdiction-config";
import { PARIS_TX_OFFICIAL_DOCS } from "../paris-tx/official-docs";

export const PARIS_TX_CONFIG: JurisdictionConfig = {
  id: "paris-tx",
  label: "Paris, TX (Lamar County)",
  shortLabel: "Paris, TX",
  utility: "SWEPCO",
  county: "Lamar County",
  state: "TX",
  defaultZip: "75462",
  zipPrefixes: ["7546", "7545"],
  baseline: "san-antonio",

  textReplacements: [

    ["CPS Energy Residential Service Application required", "SWEPCO service application required"],
    ["CPS Energy", "SWEPCO"],
    ["CPS", "SWEPCO"],
    ["City of San Antonio", "City of Paris"],
    ["Bexar County", "Lamar County"],
  ],
  officialDocs: PARIS_TX_OFFICIAL_DOCS,
};
