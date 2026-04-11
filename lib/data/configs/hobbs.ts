import type { JurisdictionConfig } from "../jurisdiction-config";
import { HOBBS_OFFICIAL_DOCS } from "../hobbs/official-docs";

export const HOBBS_CONFIG: JurisdictionConfig = {
  id: "hobbs",
  label: "Hobbs/Carlsbad, NM (Lea County)",
  shortLabel: "Hobbs, NM",
  utility: "Xcel Energy (SPS)",
  county: "Lea County",
  state: "NM",
  defaultZip: "88240",
  zipPrefixes: ["882", "883"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Xcel Energy (SPS) service application required"],
    ["CPS Energy", "Xcel Energy (SPS)"],
    ["CPS", "Xcel"],
    ["City of San Antonio", "City of Hobbs"],
    ["Bexar County", "Lea County"],
  ],
  officialDocs: HOBBS_OFFICIAL_DOCS,
};
