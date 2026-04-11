import type { JurisdictionConfig } from "../jurisdiction-config";
import { LONGVIEW_OFFICIAL_DOCS } from "../longview/official-docs";

export const LONGVIEW_CONFIG: JurisdictionConfig = {
  id: "longview",
  label: "Longview/Kilgore, TX (Gregg County)",
  shortLabel: "Longview, TX",
  utility: "SWEPCO",
  county: "Gregg County",
  state: "TX",
  defaultZip: "75604",
  zipPrefixes: ["756", "753"],
  baseline: "san-antonio",

  textReplacements: [

    ["CPS Energy Residential Service Application required", "SWEPCO service application required"],
    ["CPS Energy", "SWEPCO"],
    ["CPS", "SWEPCO"],
    ["City of San Antonio", "City of Longview"],
    ["Bexar County", "Gregg County"],
  ],
  officialDocs: LONGVIEW_OFFICIAL_DOCS,
};
