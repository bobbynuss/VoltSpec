/**
 * El Paso Jurisdiction Config
 *
 * Inherits from San Antonio (BR series). Patches:
 *   - Meter socket: Eaton MBE2040B200BTS (El Paso Electric approved)
 *   - Utility refs: CPS Energy → El Paso Electric
 *   - Pricing: from Elliott El Paso cash-sale invoices
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { ELPASO_OFFICIAL_DOCS } from "../elpaso/official-docs";
import { ELPASO_PRICES } from "../elpaso/pricing";

export const ELPASO_CONFIG: JurisdictionConfig = {
  id: "elpaso",
  label: "El Paso, TX (El Paso County)",
  shortLabel: "El Paso, TX",
  utility: "El Paso Electric",
  county: "El Paso County",
  state: "TX",
  defaultZip: "79901",
  zipPrefixes: ["799", "798"],

  baseline: "san-antonio",

  meterSocket: {
    catalog: "MBE2040B200BTS",
    description: "BR EUSERC 200A main breaker meter combo, 20/40 circuit, bottom/top feed, El Paso Electric approved",
    price: 265.07,
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },

  textReplacements: [
    ["Eaton 1009874ACH", "Eaton MBE2040B200BTS"],
    ["1009874ACH", "MBE2040B200BTS"],
    ["1006352CCH", "MBE2040B200BTS"],
    ["Milbank U5135-XL-200", "Eaton MBE2040B200BTS"],
    ["Milbank U5135", "Eaton MBE2040B200BTS"],
    ["CPS-approved ringless type", "El Paso Electric approved BR meter-breaker type"],
    ["CPS Energy Residential Service Application required", "El Paso Electric service application required"],
    ["CPS Energy", "El Paso Electric"],
    ["CPS", "EPE"],
    ["City of San Antonio", "City of El Paso"],
    ["Bexar County", "El Paso County"],
    ["(210) 353-4050", "(915) 543-5711"],
    ["(210) 353-2222", "(915) 543-5711"],
  ],

  pricing: ELPASO_PRICES,
  officialDocs: ELPASO_OFFICIAL_DOCS,
};
