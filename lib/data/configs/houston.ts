/**
 * Houston Jurisdiction Config
 *
 * Inherits from San Antonio (BR series). Patches:
 *   - Meter socket: Eaton UNRRS213CEUSE (CenterPoint approved)
 *   - Utility refs: CPS Energy → CenterPoint Energy
 *   - City refs: San Antonio → Houston / Harris County
 *   - Pricing: from Elliott Stafford/Deer Park cash-sale invoices
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { HOUSTON_OFFICIAL_DOCS } from "../houston/official-docs";
import { HOUSTON_PRICES } from "../houston/pricing";

export const HOUSTON_CONFIG: JurisdictionConfig = {
  id: "houston",
  label: "Houston, TX (Harris County)",
  shortLabel: "Houston, TX",
  utility: "CenterPoint Energy",
  county: "Harris County",
  state: "TX",
  defaultZip: "77002",
  zipPrefixes: ["770", "771", "772", "773", "774", "775"],

  baseline: "san-antonio",

  meterSocket: {
    catalog: "UNRRS213CEUSE",
    description: "200A ringless single-phase OH/UG meter socket with hub closing plate, CenterPoint Energy approved for Houston service territory",
    price: HOUSTON_PRICES["UNRRS213CEUSE"],
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },

  textReplacements: [
    // Meter socket catalog swaps
    ["Eaton 1009874ACH", "Eaton UNRRS213CEUSE"],
    ["1009874ACH", "UNRRS213CEUSE"],
    ["1006352CCH", "UNRRS213CEUSE"],
    ["Milbank U5135-XL-200", "Eaton UNRRS213CEUSE"],
    ["Milbank U5135", "Eaton UNRRS213CEUSE"],
    // Utility name swaps
    ["CPS Energy Residential Service Application required", "CenterPoint Energy service application required"],
    ["CPS Energy", "CenterPoint Energy"],
    ["CPS", "CenterPoint"],
    // City/county swaps
    ["City of San Antonio", "City of Houston / Harris County"],
    ["Bexar County", "Harris County"],
    // Phone number swaps
    ["(210) 353-4050", "(713) 207-2222"],
    ["(210) 353-2222", "(713) 207-2222"],
  ],

  pricing: HOUSTON_PRICES,

  officialDocs: HOUSTON_OFFICIAL_DOCS,

  extraDocs: {
    "ev-charger-80a": [
      {
        title: "EV Charger Rebate Program – CenterPoint Energy",
        url: "https://www.centerpointenergy.com/en-us/residential/save-energy-money/saving-energy",
        description:
          "CenterPoint Energy residential energy efficiency programs — includes EV charger rebates for Houston-area customers",
      },
    ],
  },
};
