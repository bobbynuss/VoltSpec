import type { JurisdictionConfig } from "../jurisdiction-config";
import { CHARLOTTE_OFFICIAL_DOCS } from "../charlotte/official-docs";

export const CHARLOTTE_CONFIG: JurisdictionConfig = {
  id: "charlotte",
  label: "Charlotte, NC (Mecklenburg County)",
  shortLabel: "Charlotte, NC",
  utility: "Duke Energy Carolinas",
  county: "Mecklenburg County",
  state: "NC",
  defaultZip: "28214",
  zipPrefixes: ["282", "280", "281"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Duke Energy Carolinas service application required"],
    ["CPS Energy", "Duke Energy Carolinas"],
    ["CPS", "Duke"],
    ["City of San Antonio", "City of Charlotte"],
    ["Bexar County", "Mecklenburg County"],
  ],
  officialDocs: CHARLOTTE_OFFICIAL_DOCS,
};
