import type { JurisdictionConfig } from "../jurisdiction-config";
import { ATLANTA_OFFICIAL_DOCS } from "../atlanta/official-docs";

export const ATLANTA_CONFIG: JurisdictionConfig = {
  id: "atlanta",
  label: "Atlanta Metro, GA (Fulton County)",
  shortLabel: "Atlanta, GA",
  utility: "Georgia Power",
  county: "Fulton County",
  state: "GA",
  defaultZip: "30336",
  zipPrefixes: ["303", "300", "301", "302", "304", "305", "306"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Georgia Power service application required"],
    ["CPS Energy", "Georgia Power"],
    ["CPS", "Georgia"],
    ["City of San Antonio", "City of Atlanta"],
    ["Bexar County", "Fulton County"],
  ],
  officialDocs: ATLANTA_OFFICIAL_DOCS,
};
