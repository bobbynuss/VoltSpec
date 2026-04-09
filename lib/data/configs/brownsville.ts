/**
 * Brownsville Jurisdiction Config
 *
 * Inherits from San Antonio (BR series). Patches:
 *   - Meter socket: Eaton UATRS213CFLCH (AEP Texas Central approved)
 *   - Utility refs: CPS Energy → AEP Texas Central
 *   - Pricing: from Elliott Harlingen/Brownsville cash-sale invoices
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { BROWNSVILLE_OFFICIAL_DOCS } from "../brownsville/official-docs";
import { BROWNSVILLE_PRICES } from "../brownsville/pricing";

export const BROWNSVILLE_CONFIG: JurisdictionConfig = {
  id: "brownsville",
  label: "Brownsville, TX (Cameron County)",
  shortLabel: "Brownsville, TX",
  utility: "AEP Texas Central",
  county: "Cameron County",
  state: "TX",
  defaultZip: "78520",
  zipPrefixes: ["785"],

  baseline: "san-antonio",

  meterSocket: {
    catalog: "UATRS213CFLCH",
    description: "200A aluminum enclosure meter socket, OH/UG, UL listed, AEP Texas Central approved",
    price: 119.88,
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },

  textReplacements: [
    ["Eaton 1009874ACH", "Eaton UATRS213CFLCH"],
    ["1009874ACH", "UATRS213CFLCH"],
    ["1006352CCH", "UATRS213CFLCH"],
    ["Milbank U5135-XL-200", "Eaton UATRS213CFLCH"],
    ["Milbank U5135", "Eaton UATRS213CFLCH"],
    ["CPS-approved ringless type", "AEP Texas Central approved meter socket"],
    ["CPS Energy Residential Service Application required", "AEP Texas Central service application required"],
    ["CPS Energy", "AEP Texas Central"],
    ["CPS", "AEP Texas"],
    ["City of San Antonio", "City of Brownsville"],
    ["Bexar County", "Cameron County"],
    ["(210) 353-4050", "(877) 373-4858"],
    ["(210) 353-2222", "(877) 373-4858"],
  ],

  pricing: BROWNSVILLE_PRICES,
  officialDocs: BROWNSVILLE_OFFICIAL_DOCS,
};
