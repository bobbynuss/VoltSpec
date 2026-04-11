import type { JurisdictionConfig } from "../jurisdiction-config";
import { SHAWNEE_OFFICIAL_DOCS } from "../shawnee/official-docs";

export const SHAWNEE_CONFIG: JurisdictionConfig = {
  id: "shawnee",
  label: "Shawnee, OK (Pottawatomie County)",
  shortLabel: "Shawnee, OK",
  utility: "OG&E (Oklahoma Gas & Electric)",
  county: "Pottawatomie County",
  state: "OK",
  defaultZip: "74804",
  zipPrefixes: ["748"],
  baseline: "san-antonio",

  textReplacements: [

    ["CPS Energy Residential Service Application required", "OG&E (Oklahoma Gas & Electric) service application required"],
    ["CPS Energy", "OG&E (Oklahoma Gas & Electric)"],
    ["CPS", "OG&E"],
    ["City of San Antonio", "City of Shawnee"],
    ["Bexar County", "Pottawatomie County"],
  ],
  officialDocs: SHAWNEE_OFFICIAL_DOCS,
};
