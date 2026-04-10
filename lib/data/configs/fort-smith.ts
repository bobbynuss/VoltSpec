/**
 * Fort Smith, AR — OG&E / AEP SWEPCO territory
 * Covers stores: #105 Fort Smith, #104 Russellville
 * BR series, UTRS213BE meter socket, placeholder pricing (SA baseline)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { DEFAULT_METER_SWAP_JOBS } from "../jurisdiction-config";
import { FORT_SMITH_OFFICIAL_DOCS } from "../fort-smith/official-docs";

export const FORT_SMITH_CONFIG: JurisdictionConfig = {
  id: "fort-smith",
  label: "Fort Smith, AR (Sebastian County)",
  shortLabel: "Fort Smith, AR",
  utility: "OG&E / AEP SWEPCO",
  county: "Sebastian County",
  state: "AR",
  defaultZip: "72901",
  zipPrefixes: ["729", "728"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "UTRS213BE",
    description: "200A ringless single-phase OH/UG meter socket, OG&E/SWEPCO approved",
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },
  extraRequirements: Object.fromEntries(
    DEFAULT_METER_SWAP_JOBS.map((jobId) => [
      jobId,
      ["Meter socket often provided by local utility — confirm with utility before ordering"],
    ]),
  ),
  extraBlueprintNotes: Object.fromEntries(
    DEFAULT_METER_SWAP_JOBS.map((jobId) => [
      jobId,
      ["Meter socket often provided by local utility — confirm with utility before ordering"],
    ]),
  ),
  patchMaterialText: true,
  textReplacements: [
    // Meter socket
    ["Eaton 1009874ACH", "Eaton UTRS213BE"],
    ["1009874ACH", "UTRS213BE"],
    ["1006352CCH", "UTRS213BE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213BE"],
    ["Milbank U5135", "Eaton UTRS213BE"],
    // Pass & Seymour device swaps (AR stocks PAS instead of EWD)
    // Receptacles
    ["Eaton TR270W", "PAS 15WRTRWCC"],
    ["Eaton TWR270W", "PAS 15WRTRWRWCC"],
    ["Eaton TR1877WBXSP", "PAS TR5361WCC"],
    ["Eaton TR1107W", "PAS TR15WCC"],
    ["Eaton TR1307W", "PAS TR20WCC"],
    // GFCI / Dual Function
    ["Eaton TRGF15W", "PAS 1597TRWRWCC4"],
    ["Eaton GFD20W", "PAS 2097TRWRW"],
    ["Eaton TWRGF20W", "PAS 2097TRWRWCC"],
    // Switches
    ["Eaton 7501W", "PAS TM870WCC"],
    ["Eaton 7503W", "PAS TM873WCC"],
    // Wall plates
    ["Eaton PJ263W", "PAS TP263WCC"],
    ["Eaton PJ262W", "PAS TP262WCC"],
    ["Eaton PJ26W", "PAS TP26WCC"],
    // LED retrofit
    ["Eaton LT56079F51EWH", "PAS S9R6940CTK5"],
    // NEMA receptacles (EV charger / temp power)
    ["Eaton AH1258BKF", "PAS 3804CC"],
    ["Eaton AH1257BKF", "PAS 3830CC"],
    ["Eaton 1230R", "PAS 3830CC"],
    ["Eaton 1250R", "PAS 3804CC"],
    // Utility / city
    ["CPS Energy Residential Service Application required", "OG&E / SWEPCO service application required"],
    ["CPS Energy", "OG&E / SWEPCO"],
    ["CPS", "OG&E"],
    ["City of San Antonio", "City of Fort Smith"],
    ["Bexar County", "Sebastian County"],
    ["(210) 353-4050", "(888) 216-3523"],
    ["(210) 353-2222", "(888) 216-3523"],
  ],
  officialDocs: FORT_SMITH_OFFICIAL_DOCS,
};
