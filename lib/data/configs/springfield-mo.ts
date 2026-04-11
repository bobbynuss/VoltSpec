import type { JurisdictionConfig } from "../jurisdiction-config";
import { SPRINGFIELD_MO_OFFICIAL_DOCS } from "../springfield-mo/official-docs";

export const SPRINGFIELD_MO_CONFIG: JurisdictionConfig = {
  id: "springfield-mo",
  label: "Springfield, MO (Greene County)",
  shortLabel: "Springfield, MO",
  utility: "City Utilities of Springfield",
  county: "Greene County",
  state: "MO",
  defaultZip: "65803",
  zipPrefixes: ["658", "656", "657"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "City Utilities of Springfield service application required"],
    ["CPS Energy", "City Utilities of Springfield"],
    ["CPS", "City"],
    ["City of San Antonio", "City of Springfield"],
    ["Bexar County", "Greene County"],
  ],
  officialDocs: SPRINGFIELD_MO_OFFICIAL_DOCS,
};
