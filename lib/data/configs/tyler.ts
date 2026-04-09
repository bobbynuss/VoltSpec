import type { JurisdictionConfig } from "../jurisdiction-config";
import { TYLER_OFFICIAL_DOCS } from "../tyler/official-docs";

export const TYLER_CONFIG: JurisdictionConfig = {
  id: "tyler",
  label: "Tyler/Longview, TX (Smith County)",
  shortLabel: "Tyler/Longview, TX",
  utility: "SWEPCO",
  county: "Smith County",
  state: "TX",
  defaultZip: "75701",
  zipPrefixes: ["757"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "U7040XLTG",
    description: "200A single-phase OH/UG 4-terminal meter socket, SWEPCO approved for East Texas",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Milbank U7040XLTG"],
    ["1009874ACH", "U7040XLTG"],
    ["1006352CCH", "U7040XLTG"],
    ["Milbank U5135-XL-200", "Milbank U7040XLTG"],
    ["Milbank U5135", "Milbank U7040XLTG"],
    ["CPS Energy Residential Service Application required", "SWEPCO service application required"],
    ["CPS Energy", "SWEPCO"],
    ["CPS", "SWEPCO"],
    ["City of San Antonio", "City of Tyler / City of Longview"],
    ["Bexar County", "Smith County"],
    ["(210) 353-4050", "(888) 216-3523"],
    ["(210) 353-2222", "(888) 216-3523"],
  ],
  officialDocs: TYLER_OFFICIAL_DOCS,
};
