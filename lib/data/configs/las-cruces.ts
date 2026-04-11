import type { JurisdictionConfig } from "../jurisdiction-config";
import { LAS_CRUCES_OFFICIAL_DOCS } from "../las-cruces/official-docs";

export const LAS_CRUCES_CONFIG: JurisdictionConfig = {
  id: "las-cruces",
  label: "Las Cruces, NM (Dona Ana County)",
  shortLabel: "Las Cruces, NM",
  utility: "El Paso Electric",
  county: "Dona Ana County",
  state: "NM",
  defaultZip: "88005",
  zipPrefixes: ["880", "881"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "El Paso Electric service application required"],
    ["CPS Energy", "El Paso Electric"],
    ["CPS", "El"],
    ["City of San Antonio", "City of Las Cruces"],
    ["Bexar County", "Dona Ana County"],
  ],
  officialDocs: LAS_CRUCES_OFFICIAL_DOCS,
};
