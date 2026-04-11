import type { JurisdictionConfig } from "../jurisdiction-config";
import { JACKSONVILLE_FL_OFFICIAL_DOCS } from "../jacksonville-fl/official-docs";

export const JACKSONVILLE_FL_CONFIG: JurisdictionConfig = {
  id: "jacksonville-fl",
  label: "Jacksonville, FL (Duval County)",
  shortLabel: "Jacksonville, FL",
  utility: "JEA (Jacksonville Electric Authority)",
  county: "Duval County",
  state: "FL",
  defaultZip: "32256",
  zipPrefixes: ["322", "321", "320"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "JEA (Jacksonville Electric Authority) service application required"],
    ["CPS Energy", "JEA (Jacksonville Electric Authority)"],
    ["CPS", "JEA"],
    ["City of San Antonio", "City of Jacksonville"],
    ["Bexar County", "Duval County"],
  ],
  officialDocs: JACKSONVILLE_FL_OFFICIAL_DOCS,
};
