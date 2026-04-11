import type { JurisdictionConfig } from "../jurisdiction-config";
import { COLORADO_SPRINGS_OFFICIAL_DOCS } from "../colorado-springs/official-docs";

export const COLORADO_SPRINGS_CONFIG: JurisdictionConfig = {
  id: "colorado-springs",
  label: "Colorado Springs, CO (El Paso County)",
  shortLabel: "Colorado Springs, CO",
  utility: "Colorado Springs Utilities",
  county: "El Paso County",
  state: "CO",
  defaultZip: "80915",
  zipPrefixes: ["809", "808"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Colorado Springs Utilities service application required"],
    ["CPS Energy", "Colorado Springs Utilities"],
    ["CPS", "Colorado"],
    ["City of San Antonio", "City of Colorado Springs"],
    ["Bexar County", "El Paso County"],
  ],
  officialDocs: COLORADO_SPRINGS_OFFICIAL_DOCS,
};
