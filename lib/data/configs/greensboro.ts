import type { JurisdictionConfig } from "../jurisdiction-config";
import { GREENSBORO_OFFICIAL_DOCS } from "../greensboro/official-docs";

export const GREENSBORO_CONFIG: JurisdictionConfig = {
  id: "greensboro",
  label: "Greensboro, NC (Guilford County)",
  shortLabel: "Greensboro, NC",
  utility: "Duke Energy Carolinas",
  county: "Guilford County",
  state: "NC",
  defaultZip: "27406",
  zipPrefixes: ["274", "270", "271", "272", "273"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Duke Energy Carolinas service application required"],
    ["CPS Energy", "Duke Energy Carolinas"],
    ["CPS", "Duke"],
    ["City of San Antonio", "City of Greensboro"],
    ["Bexar County", "Guilford County"],
  ],
  officialDocs: GREENSBORO_OFFICIAL_DOCS,
};
