import type { JurisdictionConfig } from "../jurisdiction-config";
import { KERRVILLE_OFFICIAL_DOCS } from "../kerrville/official-docs";

export const KERRVILLE_CONFIG: JurisdictionConfig = {
  id: "kerrville",
  label: "Kerrville/Hill Country, TX (Kerr County)",
  shortLabel: "Kerrville, TX",
  utility: "KPUB (Kerrville Public Utility Board)",
  county: "Kerr County",
  state: "TX",
  defaultZip: "78028",
  zipPrefixes: ["780"],
  baseline: "san-antonio",

  textReplacements: [

    ["CPS Energy Residential Service Application required", "KPUB (Kerrville Public Utility Board) service application required"],
    ["CPS Energy", "KPUB (Kerrville Public Utility Board)"],
    ["CPS", "KPUB"],
    ["City of San Antonio", "City of Kerrville"],
    ["Bexar County", "Kerr County"],
  ],
  officialDocs: KERRVILLE_OFFICIAL_DOCS,
};
