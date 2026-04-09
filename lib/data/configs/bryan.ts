import type { JurisdictionConfig } from "../jurisdiction-config";
import { BRYAN_OFFICIAL_DOCS } from "../bryan/official-docs";

export const BRYAN_CONFIG: JurisdictionConfig = {
  id: "bryan",
  label: "Bryan/College Station, TX (Brazos County)",
  shortLabel: "Bryan/College Station, TX",
  utility: "Bryan Texas Utilities",
  county: "Brazos County",
  state: "TX",
  defaultZip: "77801",
  zipPrefixes: ["778"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "UTRS213BE",
    description: "200A ringless single-phase OH/UG meter socket, BTU approved for Bryan/College Station service territory",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Eaton UTRS213BE"],
    ["1009874ACH", "UTRS213BE"],
    ["1006352CCH", "UTRS213BE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213BE"],
    ["Milbank U5135", "Eaton UTRS213BE"],
    ["CPS Energy Residential Service Application required", "BTU service application required"],
    ["CPS Energy", "Bryan Texas Utilities"],
    ["CPS", "BTU"],
    ["City of San Antonio", "City of Bryan / City of College Station"],
    ["Bexar County", "Brazos County"],
    ["(210) 353-4050", "(979) 209-5900"],
    ["(210) 353-2222", "(979) 209-5900"],
  ],
  officialDocs: BRYAN_OFFICIAL_DOCS,
};
