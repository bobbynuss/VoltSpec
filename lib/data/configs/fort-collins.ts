import type { JurisdictionConfig } from "../jurisdiction-config";
import { FORT_COLLINS_OFFICIAL_DOCS } from "../fort-collins/official-docs";

export const FORT_COLLINS_CONFIG: JurisdictionConfig = {
  id: "fort-collins",
  label: "Fort Collins, CO (Larimer County)",
  shortLabel: "Fort Collins, CO",
  utility: "Xcel Energy",
  county: "Larimer County",
  state: "CO",
  defaultZip: "80525",
  zipPrefixes: ["805", "806"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Xcel Energy service application required"],
    ["CPS Energy", "Xcel Energy"],
    ["CPS", "Xcel"],
    ["City of San Antonio", "City of Fort Collins"],
    ["Bexar County", "Larimer County"],
  ],
  officialDocs: FORT_COLLINS_OFFICIAL_DOCS,
};
