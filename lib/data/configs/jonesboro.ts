/**
 * Jonesboro, AR — Entergy Arkansas territory
 * Covers store: #194 Jonesboro
 * BR series, PAS devices (AR standard), SA baseline pricing
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { JONESBORO_OFFICIAL_DOCS } from "../jonesboro/official-docs";

export const JONESBORO_CONFIG: JurisdictionConfig = {
  id: "jonesboro",
  label: "Jonesboro, AR (Craighead County)",
  shortLabel: "Jonesboro, AR",
  utility: "Entergy Arkansas",
  county: "Craighead County",
  state: "AR",
  defaultZip: "72401",
  zipPrefixes: ["724", "723"],
  baseline: "san-antonio",
  patchMaterialText: true,

  textReplacements: [
    // Pass & Seymour device swaps (AR stocks PAS instead of EWD)
    ["Eaton TR270W", "PAS 15WRTRWCC"],
    ["Eaton TWR270W", "PAS 15WRTRWRWCC"],
    ["Eaton TR1877WBXSP", "PAS TR5361WCC"],
    ["Eaton TR1107W", "PAS TR15WCC"],
    ["Eaton TR1307W", "PAS TR20WCC"],
    ["Eaton TRGF15W", "PAS 1597TRWRWCC4"],
    ["Eaton GFD20W", "PAS 2097TRWRW"],
    ["Eaton TWRGF20W", "PAS 2097TRWRWCC"],
    ["Eaton 7501W", "PAS TM870WCC"],
    ["Eaton 7503W", "PAS TM873WCC"],
    ["Eaton PJ263W", "PAS TP263WCC"],
    ["Eaton PJ262W", "PAS TP262WCC"],
    ["Eaton PJ26W", "PAS TP26WCC"],
    ["Eaton LT56079F51EWH", "PAS S9R6940CTK5"],
    ["Eaton AH1258BKF", "PAS 3804CC"],
    ["Eaton AH1257BKF", "PAS 3830CC"],
    ["Eaton 1230R", "PAS 3830CC"],
    ["Eaton 1250R", "PAS 3804CC"],
    // Utility / city
    ["CPS Energy Residential Service Application required", "Entergy Arkansas service application required"],
    ["CPS Energy", "Entergy Arkansas"],
    ["CPS", "Entergy Arkansas"],
    ["City of San Antonio", "City of Jonesboro"],
    ["Bexar County", "Craighead County"],
  ],

  officialDocs: JONESBORO_OFFICIAL_DOCS,
};
