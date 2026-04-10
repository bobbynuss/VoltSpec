/**
 * Tulsa, OK — PSO (Public Service Company of Oklahoma / AEP) territory
 * Covers stores: #134 Tulsa, #176 Bartlesville, #147 Stillwater, #162 Pryor
 * BR series, UTRS213BE meter socket, placeholder pricing (SA baseline)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { DEFAULT_METER_SWAP_JOBS } from "../jurisdiction-config";
import { TULSA_OFFICIAL_DOCS } from "../tulsa/official-docs";

export const TULSA_CONFIG: JurisdictionConfig = {
  id: "tulsa",
  label: "Tulsa, OK (Tulsa County)",
  shortLabel: "Tulsa, OK",
  utility: "PSO (AEP Oklahoma)",
  county: "Tulsa County",
  state: "OK",
  defaultZip: "74129",
  zipPrefixes: ["740", "741", "743", "744"],
  baseline: "san-antonio",
  meterSocket: {
    catalog: "UTRS213BE",
    description: "200A ringless single-phase OH/UG meter socket, PSO approved",
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
  textReplacements: [
    ["Eaton 1009874ACH", "Eaton UTRS213BE"],
    ["1009874ACH", "UTRS213BE"],
    ["1006352CCH", "UTRS213BE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213BE"],
    ["Milbank U5135", "Eaton UTRS213BE"],
    ["CPS Energy Residential Service Application required", "PSO service application required"],
    ["CPS Energy", "PSO"],
    ["CPS", "PSO"],
    ["City of San Antonio", "City of Tulsa"],
    ["Bexar County", "Tulsa County"],
    ["(210) 353-4050", "(888) 216-3523"],
    ["(210) 353-2222", "(888) 216-3523"],
  ],
  officialDocs: TULSA_OFFICIAL_DOCS,
};
