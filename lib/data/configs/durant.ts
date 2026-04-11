import type { JurisdictionConfig } from "../jurisdiction-config";
import { DURANT_OFFICIAL_DOCS } from "../durant/official-docs";

export const DURANT_CONFIG: JurisdictionConfig = {
  id: "durant",
  label: "Durant, OK (Bryan County)",
  shortLabel: "Durant, OK",
  utility: "OG&E / PSO",
  county: "Bryan County",
  state: "OK",
  defaultZip: "74701",
  zipPrefixes: ["747"],
  baseline: "san-antonio",

  textReplacements: [

    ["CPS Energy Residential Service Application required", "OG&E / PSO service application required"],
    ["CPS Energy", "OG&E / PSO"],
    ["CPS", "OG&E"],
    ["City of San Antonio", "City of Durant"],
    ["Bexar County", "Bryan County"],
  ],
  officialDocs: DURANT_OFFICIAL_DOCS,
};
