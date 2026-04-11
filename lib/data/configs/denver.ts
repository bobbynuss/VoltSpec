import type { JurisdictionConfig } from "../jurisdiction-config";
import { DENVER_OFFICIAL_DOCS } from "../denver/official-docs";

export const DENVER_CONFIG: JurisdictionConfig = {
  id: "denver",
  label: "Denver Metro, CO (Denver County)",
  shortLabel: "Denver, CO",
  utility: "Xcel Energy",
  county: "Denver County",
  state: "CO",
  defaultZip: "80238",
  zipPrefixes: ["802", "801", "800", "803", "804"],
  baseline: "san-antonio",
  textReplacements: [
    ["CPS Energy Residential Service Application required", "Xcel Energy service application required"],
    ["CPS Energy", "Xcel Energy"],
    ["CPS", "Xcel"],
    ["City of San Antonio", "City of Denver"],
    ["Bexar County", "Denver County"],
  ],
  officialDocs: DENVER_OFFICIAL_DOCS,
};
