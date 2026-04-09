import type { JurisdictionConfig } from "../jurisdiction-config";
import { LUBBOCK_OFFICIAL_DOCS } from "../lubbock/official-docs";

export const LUBBOCK_CONFIG: JurisdictionConfig = {
  id: "lubbock",
  label: "Lubbock, TX (Lubbock County)",
  shortLabel: "Lubbock, TX",
  utility: "Lubbock Power & Light",
  county: "Lubbock County",
  state: "TX",
  defaultZip: "79401",
  zipPrefixes: ["794"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "UTRS213CE",
    description: "200A ringless single-phase OH/UG meter socket, LP&L approved for Lubbock service territory",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Eaton UTRS213CE"],
    ["1009874ACH", "UTRS213CE"],
    ["1006352CCH", "UTRS213CE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213CE"],
    ["Milbank U5135", "Eaton UTRS213CE"],
    ["CPS Energy Residential Service Application required", "LP&L service application required"],
    ["CPS Energy", "Lubbock Power & Light"],
    ["CPS", "LP&L"],
    ["City of San Antonio", "City of Lubbock"],
    ["Bexar County", "Lubbock County"],
    ["(210) 353-4050", "(806) 775-2509"],
    ["(210) 353-2222", "(806) 775-2509"],
  ],
  officialDocs: LUBBOCK_OFFICIAL_DOCS,
};
