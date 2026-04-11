import type { JurisdictionConfig } from "../jurisdiction-config";
import { PHOENIX_OFFICIAL_DOCS } from "../phoenix/official-docs";

export const PHOENIX_CONFIG: JurisdictionConfig = {
  id: "phoenix",
  label: "Phoenix Metro, AZ (Maricopa County)",
  shortLabel: "Phoenix, AZ",
  utility: "APS (Arizona Public Service)",
  county: "Maricopa County",
  state: "AZ",
  defaultZip: "85009",
  zipPrefixes: ["850", "852", "853", "851"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "APS (Arizona Public Service) service application required"],
    ["CPS Energy", "APS (Arizona Public Service)"],
    ["CPS", "APS"],
    ["City of San Antonio", "City of Phoenix"],
    ["Bexar County", "Maricopa County"],
  ],
  officialDocs: PHOENIX_OFFICIAL_DOCS,
};
