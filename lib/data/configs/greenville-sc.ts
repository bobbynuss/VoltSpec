import type { JurisdictionConfig } from "../jurisdiction-config";
import { GREENVILLE_SC_OFFICIAL_DOCS } from "../greenville-sc/official-docs";

export const GREENVILLE_SC_CONFIG: JurisdictionConfig = {
  id: "greenville-sc",
  label: "Greenville, SC (Greenville County)",
  shortLabel: "Greenville, SC",
  utility: "Duke Energy Progress",
  county: "Greenville County",
  state: "SC",
  defaultZip: "29615",
  zipPrefixes: ["296", "293", "294", "295"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Duke Energy Progress service application required"],
    ["CPS Energy", "Duke Energy Progress"],
    ["CPS", "Duke"],
    ["City of San Antonio", "City of Greenville"],
    ["Bexar County", "Greenville County"],
  ],
  officialDocs: GREENVILLE_SC_OFFICIAL_DOCS,
};
