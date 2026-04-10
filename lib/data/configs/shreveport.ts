/**
 * Shreveport/Bossier City, LA — SWEPCO territory
 * Covers stores: #14 Shreveport, #3 Bossier City
 * BR series — SWEPCO provides the meter socket (contractor picks up from utility)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { DEFAULT_METER_SWAP_JOBS } from "../jurisdiction-config";
import { SHREVEPORT_OFFICIAL_DOCS } from "../shreveport/official-docs";

export const SHREVEPORT_CONFIG: JurisdictionConfig = {
  id: "shreveport",
  label: "Shreveport/Bossier City, LA (Caddo Parish)",
  shortLabel: "Shreveport, LA",
  utility: "SWEPCO",
  county: "Caddo Parish",
  state: "LA",
  defaultZip: "71106",
  zipPrefixes: ["711", "710"],
  baseline: "san-antonio",

  // SWEPCO provides the meter socket — remove it from BOM entirely
  removeMeterSocket: {
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH"],
  },

  textReplacements: [
    ["CPS Energy Residential Service Application required", "SWEPCO service application required"],
    ["CPS Energy", "SWEPCO"],
    ["CPS", "SWEPCO"],
    ["City of San Antonio", "City of Shreveport / Bossier City"],
    ["Bexar County", "Caddo Parish"],
    ["(210) 353-4050", "(888) 216-3523"],
    ["(210) 353-2222", "(888) 216-3523"],
  ],

  // Add SWEPCO meter socket note to all jobs that normally get a meter socket
  extraRequirements: Object.fromEntries(
    DEFAULT_METER_SWAP_JOBS.map((jobId) => [
      jobId,
      ["Meter socket provided by SWEPCO — contractor to pick up from utility"],
    ]),
  ),

  extraBlueprintNotes: Object.fromEntries(
    DEFAULT_METER_SWAP_JOBS.map((jobId) => [
      jobId,
      ["Meter socket provided by SWEPCO — contractor to pick up from utility"],
    ]),
  ),

  officialDocs: SHREVEPORT_OFFICIAL_DOCS,
};
