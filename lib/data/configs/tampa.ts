import type { JurisdictionConfig } from "../jurisdiction-config";
import { TAMPA_OFFICIAL_DOCS } from "../tampa/official-docs";

export const TAMPA_CONFIG: JurisdictionConfig = {
  id: "tampa",
  label: "Tampa Bay, FL (Hillsborough County)",
  shortLabel: "Tampa, FL",
  utility: "Tampa Electric (TECO Energy)",
  county: "Hillsborough County",
  state: "FL",
  defaultZip: "33634",
  zipPrefixes: ["336", "335", "337", "338"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Tampa Electric (TECO Energy) service application required"],
    ["CPS Energy", "Tampa Electric (TECO Energy)"],
    ["CPS", "Tampa"],
    ["City of San Antonio", "City of Tampa"],
    ["Bexar County", "Hillsborough County"],
  ],
  officialDocs: TAMPA_OFFICIAL_DOCS,
};
