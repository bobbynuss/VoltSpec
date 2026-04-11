import type { JurisdictionConfig } from "../jurisdiction-config";
import { COOKEVILLE_OFFICIAL_DOCS } from "../cookeville/official-docs";

export const COOKEVILLE_CONFIG: JurisdictionConfig = {
  id: "cookeville",
  label: "Cookeville, TN (Putnam County)",
  shortLabel: "Cookeville, TN",
  utility: "Cookeville Electric / TVA",
  county: "Putnam County",
  state: "TN",
  defaultZip: "38501",
  zipPrefixes: ["385", "384", "383", "381", "382"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Cookeville Electric / TVA service application required"],
    ["CPS Energy", "Cookeville Electric / TVA"],
    ["CPS", "Cookeville"],
    ["City of San Antonio", "City of Cookeville"],
    ["Bexar County", "Putnam County"],
  ],
  officialDocs: COOKEVILLE_OFFICIAL_DOCS,
};
