/**
 * Amarillo Jurisdiction Config
 *
 * Inherits from San Antonio (BR series). Patches:
 *   - Meter socket: Milbank U4801XL5T9 (Xcel Energy SPS approved)
 *   - Utility refs: CPS Energy → Xcel Energy (SPS)
 *   - Pricing: from Elliott Amarillo cash-sale invoices
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { AMARILLO_OFFICIAL_DOCS } from "../amarillo/official-docs";
import { AMARILLO_PRICES } from "../amarillo/pricing";

export const AMARILLO_CONFIG: JurisdictionConfig = {
  id: "amarillo",
  label: "Amarillo, TX (Potter County)",
  shortLabel: "Amarillo, TX",
  utility: "Xcel Energy (SPS)",
  county: "Potter County",
  state: "TX",
  defaultZip: "79101",
  zipPrefixes: ["791", "790"],

  baseline: "san-antonio",

  meterSocket: {
    catalog: "U4801XL5T9",
    description: "200A single-phase 5-terminal lever-bypass ringless meter socket, OH/UG, Xcel Energy (SPS) approved for Amarillo service territory",
    price: AMARILLO_PRICES["U4801XL5T9"],
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },

  textReplacements: [
    ["Eaton 1009874ACH", "Milbank U4801XL5T9"],
    ["1009874ACH", "U4801XL5T9"],
    ["1006352CCH", "U4801XL5T9"],
    ["Milbank U5135-XL-200", "Milbank U4801XL5T9"],
    ["Milbank U5135", "Milbank U4801XL5T9"],
    ["CPS Energy Residential Service Application required", "Xcel Energy (SPS) service application required"],
    ["CPS Energy", "Xcel Energy (SPS)"],
    ["CPS", "Xcel Energy"],
    ["City of San Antonio", "City of Amarillo"],
    ["Bexar County", "Potter County"],
    ["(210) 353-4050", "(800) 895-4999"],
    ["(210) 353-2222", "(800) 895-4999"],
  ],

  pricing: AMARILLO_PRICES,
  officialDocs: AMARILLO_OFFICIAL_DOCS,
};
