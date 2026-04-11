import type { JurisdictionConfig } from "../jurisdiction-config";
import { ROSWELL_OFFICIAL_DOCS } from "../roswell/official-docs";

export const ROSWELL_CONFIG: JurisdictionConfig = {
  id: "roswell",
  label: "Roswell, NM (Chaves County)",
  shortLabel: "Roswell, NM",
  utility: "Xcel Energy (SPS)",
  county: "Chaves County",
  state: "NM",
  defaultZip: "88201",
  zipPrefixes: ["882"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Xcel Energy (SPS) service application required"],
    ["CPS Energy", "Xcel Energy (SPS)"],
    ["CPS", "Xcel"],
    ["City of San Antonio", "City of Roswell"],
    ["Bexar County", "Chaves County"],
  ],
  officialDocs: ROSWELL_OFFICIAL_DOCS,
};
