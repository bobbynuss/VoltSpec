import type { JurisdictionConfig } from "../jurisdiction-config";
import { PRESCOTT_VALLEY_OFFICIAL_DOCS } from "../prescott-valley/official-docs";

export const PRESCOTT_VALLEY_CONFIG: JurisdictionConfig = {
  id: "prescott-valley",
  label: "Prescott Valley, AZ (Yavapai County)",
  shortLabel: "Prescott Valley, AZ",
  utility: "APS (Arizona Public Service)",
  county: "Yavapai County",
  state: "AZ",
  defaultZip: "86314",
  zipPrefixes: ["863", "860", "861", "862"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "APS (Arizona Public Service) service application required"],
    ["CPS Energy", "APS (Arizona Public Service)"],
    ["CPS", "APS"],
    ["City of San Antonio", "City of Prescott Valley"],
    ["Bexar County", "Yavapai County"],
  ],
  officialDocs: PRESCOTT_VALLEY_OFFICIAL_DOCS,
};
