/**
 * Little Rock, AR — Entergy Arkansas territory
 * Covers stores: #91 Little Rock, #86 N Little Rock, #94 Cabot, #131 Benton, #99 Conway, #149 Pine Bluff
 * BR series, UTE7213TCH meter socket, placeholder pricing (SA baseline)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { LITTLE_ROCK_OFFICIAL_DOCS } from "../little-rock/official-docs";

export const LITTLE_ROCK_CONFIG: JurisdictionConfig = {
  id: "little-rock",
  label: "Little Rock, AR (Pulaski County)",
  shortLabel: "Little Rock, AR",
  utility: "Entergy Arkansas",
  county: "Pulaski County",
  state: "AR",
  defaultZip: "72209",
  zipPrefixes: ["720", "721", "722"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "UTE7213TCH",
    description: "200A single-phase OH/UG meter socket, Entergy Arkansas approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  textReplacements: [
    ["Eaton 1009874ACH", "Eaton UTE7213TCH"],
    ["1009874ACH", "UTE7213TCH"],
    ["1006352CCH", "UTE7213TCH"],
    ["Milbank U5135-XL-200", "Eaton UTE7213TCH"],
    ["Milbank U5135", "Eaton UTE7213TCH"],
    ["CPS Energy Residential Service Application required", "Entergy Arkansas service application required"],
    ["CPS Energy", "Entergy Arkansas"],
    ["CPS", "Entergy"],
    ["City of San Antonio", "City of Little Rock"],
    ["Bexar County", "Pulaski County"],
    ["(210) 353-4050", "(800) 368-3749"],
    ["(210) 353-2222", "(800) 368-3749"],
  ],
  officialDocs: LITTLE_ROCK_OFFICIAL_DOCS,
};
