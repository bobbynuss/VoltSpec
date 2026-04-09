/**
 * Odessa/Midland Jurisdiction Config
 *
 * Inherits from San Antonio (BR series). Patches:
 *   - Meter socket: Eaton UTRS213CE (Oncor approved)
 *   - Utility refs: CPS Energy → Oncor Electric Delivery
 *   - Pricing: from Elliott Odessa/Midland cash-sale invoices
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { ODESSA_OFFICIAL_DOCS } from "../odessa/official-docs";
import { ODESSA_PRICES } from "../odessa/pricing";

export const ODESSA_CONFIG: JurisdictionConfig = {
  id: "odessa",
  label: "Odessa/Midland, TX (Ector County)",
  shortLabel: "Odessa/Midland, TX",
  utility: "Oncor Electric Delivery",
  county: "Ector County",
  state: "TX",
  defaultZip: "79761",
  zipPrefixes: ["797", "795"],

  baseline: "san-antonio",

  meterSocket: {
    catalog: "UTRS213CE",
    description: "200A ringless single-phase OH/UG meter socket, Oncor approved for Odessa/Permian Basin service territory",
    price: ODESSA_PRICES["UTRS213CE"],
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },

  textReplacements: [
    ["Eaton 1009874ACH", "Eaton UTRS213CE"],
    ["1009874ACH", "UTRS213CE"],
    ["1006352CCH", "UTRS213CE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213CE"],
    ["Milbank U5135", "Eaton UTRS213CE"],
    ["CPS Energy Residential Service Application required", "Oncor service application required"],
    ["CPS Energy", "Oncor Electric Delivery"],
    ["CPS", "Oncor"],
    ["City of San Antonio", "City of Odessa"],
    ["Bexar County", "Ector County"],
    ["(210) 353-4050", "(888) 313-6862"],
    ["(210) 353-2222", "(888) 313-6862"],
  ],

  pricing: ODESSA_PRICES,
  officialDocs: ODESSA_OFFICIAL_DOCS,
};
