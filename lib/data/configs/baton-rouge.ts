/**
 * Baton Rouge/Gonzales, LA — Entergy Louisiana territory
 * Covers stores: #102 Baton Rouge, #170 Gonzales
 * BR series, Milbank U7021DLTG meter (built-in hub)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { BATON_ROUGE_OFFICIAL_DOCS } from "../baton-rouge/official-docs";

export const BATON_ROUGE_CONFIG: JurisdictionConfig = {
  id: "baton-rouge",
  label: "Baton Rouge, LA (East Baton Rouge Parish)",
  shortLabel: "Baton Rouge, LA",
  utility: "Entergy Louisiana",
  county: "East Baton Rouge Parish",
  state: "LA",
  defaultZip: "70816",
  zipPrefixes: ["708", "709"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "U7021DLTG",
    description: "200A single-phase OH/UG meter socket w/ built-in hub, Entergy Louisiana approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Milbank U7021DLTG"],
    ["1009874ACH", "U7021DLTG"],
    ["1006352CCH", "U7021DLTG"],
    ["Milbank U5135-XL-200", "Milbank U7021DLTG"],
    ["Milbank U5135", "Milbank U7021DLTG"],
    ["CPS Energy Residential Service Application required", "Entergy Louisiana service application required"],
    ["CPS Energy", "Entergy Louisiana"],
    ["CPS", "Entergy"],
    ["City of San Antonio", "City of Baton Rouge / EBR Parish"],
    ["Bexar County", "East Baton Rouge Parish"],
    ["(210) 353-4050", "(800) 368-3749"],
    ["(210) 353-2222", "(800) 368-3749"],
  ],
  officialDocs: BATON_ROUGE_OFFICIAL_DOCS,
};
