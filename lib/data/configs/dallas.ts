/**
 * Dallas/DFW Jurisdiction Config
 *
 * Inherits from Austin (CH series). Patches:
 *   - Meter socket: Eaton UTRS213CE (Oncor approved)
 *   - Utility refs: Austin Energy → Oncor Electric Delivery
 *   - Pricing: from Elliott Ft. Worth cash-sale invoices
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { DALLAS_OFFICIAL_DOCS } from "../dallas/official-docs";
import { DFW_PRICES } from "../dallas/pricing";

export const DALLAS_CONFIG: JurisdictionConfig = {
  id: "dallas",
  label: "Dallas/DFW, TX (Dallas County)",
  shortLabel: "Dallas/DFW, TX",
  utility: "Oncor Electric Delivery",
  county: "Dallas County",
  state: "TX",
  defaultZip: "75201",
  zipPrefixes: ["750", "751", "752", "753", "760", "761", "762"],

  baseline: "austin",

  meterSocket: {
    catalog: "UTRS213CE",
    description: "200A ringless single-phase meter socket, overhead/underground, Oncor approved for DFW service territory",
    price: DFW_PRICES["UTRS213CE"],
    replaces: ["1006352CCH", "U5135-XL-200", "U5135"],
  },

  textReplacements: [
    // Meter socket catalog swaps
    ["Eaton 1006352CCH", "Eaton UTRS213CE"],
    ["1006352CCH", "UTRS213CE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213CE"],
    ["Milbank U5135", "Eaton UTRS213CE"],
    // Utility name swaps
    ["AE-approved", "Oncor approved"],
    ["Austin Energy approved", "Oncor approved"],
    ["AE approved", "Oncor approved"],
    ["Austin Energy ESPA required", "Oncor service application required"],
    ["Austin Energy ESPA", "Oncor service application"],
    ["Austin Energy", "Oncor Electric Delivery"],
    ["City of Austin", "City of Dallas"],
    ["Travis County", "Dallas County"],
  ],

  pricing: DFW_PRICES,

  officialDocs: DALLAS_OFFICIAL_DOCS,

  extraDocs: {
    "ev-charger-80a": [
      {
        title: "EV Charger Information – Oncor Electric Delivery",
        url: "https://www.oncor.com/content/oncorwww/us/en/home/smart-energy/electric-vehicles.html",
        description:
          "Oncor Electric Delivery EV charger information — service upgrades, new construction requirements, and energy efficiency programs for DFW customers",
      },
    ],
  },
};
