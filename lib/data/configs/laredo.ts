import type { JurisdictionConfig } from "../jurisdiction-config";
import { LAREDO_OFFICIAL_DOCS } from "../laredo/official-docs";

export const LAREDO_CONFIG: JurisdictionConfig = {
  id: "laredo",
  label: "Laredo, TX (Webb County)",
  shortLabel: "Laredo, TX",
  utility: "AEP Texas",
  county: "Webb County",
  state: "TX",
  defaultZip: "78040",
  zipPrefixes: ["7804"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "UTRS213CE",
    description: "200A ringless single-phase OH/UG meter socket, AEP Texas approved for Laredo service territory",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Eaton UTRS213CE"],
    ["1009874ACH", "UTRS213CE"],
    ["1006352CCH", "UTRS213CE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213CE"],
    ["Milbank U5135", "Eaton UTRS213CE"],
    ["CPS Energy Residential Service Application required", "AEP Texas service application required"],
    ["CPS Energy", "AEP Texas"],
    ["CPS", "AEP Texas"],
    ["City of San Antonio", "City of Laredo"],
    ["Bexar County", "Webb County"],
    ["(210) 353-4050", "(877) 373-4858"],
    ["(210) 353-2222", "(877) 373-4858"],
  ],
  officialDocs: LAREDO_OFFICIAL_DOCS,
};
