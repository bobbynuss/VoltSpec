import type { JurisdictionConfig } from "../jurisdiction-config";
import { ROME_GA_OFFICIAL_DOCS } from "../rome-ga/official-docs";

export const ROME_GA_CONFIG: JurisdictionConfig = {
  id: "rome-ga",
  label: "Rome, GA (Floyd County)",
  shortLabel: "Rome, GA",
  utility: "Georgia Power",
  county: "Floyd County",
  state: "GA",
  defaultZip: "30165",
  zipPrefixes: ["301"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Georgia Power service application required"],
    ["CPS Energy", "Georgia Power"],
    ["CPS", "Georgia"],
    ["City of San Antonio", "City of Rome"],
    ["Bexar County", "Floyd County"],
  ],
  officialDocs: ROME_GA_OFFICIAL_DOCS,
};
