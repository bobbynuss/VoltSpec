/**
 * Abilene Jurisdiction Config
 *
 * Inherits from San Antonio (BR series). Patches:
 *   - Meter socket: Milbank U7040XLTG (AEP Texas North approved)
 *   - Utility refs: CPS Energy → AEP Texas North
 *   - Pricing: from Elliott Abilene cash-sale invoices
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { ABILENE_OFFICIAL_DOCS } from "../abilene/official-docs";
import { ABILENE_PRICES } from "../abilene/pricing";

export const ABILENE_CONFIG: JurisdictionConfig = {
  id: "abilene",
  label: "Abilene, TX (Taylor County)",
  shortLabel: "Abilene, TX",
  utility: "AEP Texas North",
  county: "Taylor County",
  state: "TX",
  defaultZip: "79601",
  zipPrefixes: ["796"],

  baseline: "san-antonio",

  meterSocket: {
    catalog: "U7040XLTG",
    description: "200A single-phase OH/UG 4-terminal meter socket, AEP Texas North approved",
    price: 84.42,
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },

  textReplacements: [
    ["Eaton 1009874ACH", "Milbank U7040XLTG"],
    ["1009874ACH", "U7040XLTG"],
    ["1006352CCH", "U7040XLTG"],
    ["Milbank U5135-XL-200", "Milbank U7040XLTG"],
    ["Milbank U5135", "Milbank U7040XLTG"],
    ["CPS-approved ringless type", "AEP Texas North approved meter socket"],
    ["CPS Energy Residential Service Application required", "AEP Texas North service application required"],
    ["CPS Energy", "AEP Texas North"],
    ["CPS", "AEP Texas"],
    ["City of San Antonio", "City of Abilene"],
    ["Bexar County", "Taylor County"],
    ["(210) 353-4050", "(877) 373-4858"],
    ["(210) 353-2222", "(877) 373-4858"],
  ],

  pricing: ABILENE_PRICES,
  officialDocs: ABILENE_OFFICIAL_DOCS,
};
