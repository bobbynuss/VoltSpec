import type { JurisdictionConfig } from "../jurisdiction-config";
import { NASHVILLE_OFFICIAL_DOCS } from "../nashville/official-docs";

export const NASHVILLE_CONFIG: JurisdictionConfig = {
  id: "nashville",
  label: "Nashville, TN (Davidson County)",
  shortLabel: "Nashville, TN",
  utility: "Nashville Electric Service (NES)",
  county: "Davidson County",
  state: "TN",
  defaultZip: "37211",
  zipPrefixes: ["372", "371", "370", "373", "374", "375", "376"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Nashville Electric Service (NES) service application required"],
    ["CPS Energy", "Nashville Electric Service (NES)"],
    ["CPS", "Nashville"],
    ["City of San Antonio", "City of Nashville"],
    ["Bexar County", "Davidson County"],
  ],
  officialDocs: NASHVILLE_OFFICIAL_DOCS,
};
