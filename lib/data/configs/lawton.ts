/**
 * Lawton/Duncan, OK — PSO / OG&E territory
 * Covers stores: #109 Lawton, #118 Duncan
 * BR series, UTRS213BE meter socket, placeholder pricing (SA baseline)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { DEFAULT_METER_SWAP_JOBS } from "../jurisdiction-config";
import { LAWTON_OFFICIAL_DOCS } from "../lawton/official-docs";

export const LAWTON_CONFIG: JurisdictionConfig = {
  id: "lawton",
  label: "Lawton, OK (Comanche County)",
  shortLabel: "Lawton, OK",
  utility: "PSO / OG&E",
  county: "Comanche County",
  state: "OK",
  defaultZip: "73501",
  zipPrefixes: ["735"],
  baseline: "san-antonio",
  removeMeterSocket: {
    replaces: ["1009874ACH", "U5135-XL-200", "U5135", "1006352CCH", "Milbank U5135-XL-200", "Milbank U5135"],
  },
  extraRequirements: Object.fromEntries(
    DEFAULT_METER_SWAP_JOBS.map((jobId) => [
      jobId,
      ["Meter socket provided by PSO/OG&E — do NOT order, coordinate with utility for delivery"],
    ]),
  ),
  extraBlueprintNotes: Object.fromEntries(
    DEFAULT_METER_SWAP_JOBS.map((jobId) => [
      jobId,
      ["Meter socket provided by PSO/OG&E — do NOT order, coordinate with utility for delivery"],
    ]),
  ),
  textReplacements: [
    ["CPS Energy Residential Service Application required", "PSO/OG&E service application required"],
    ["CPS Energy", "PSO / OG&E"],
    ["CPS", "PSO"],
    ["City of San Antonio", "City of Lawton"],
    ["Bexar County", "Comanche County"],
    ["(210) 353-4050", "(888) 216-3523"],
    ["(210) 353-2222", "(888) 216-3523"],
  ],
  officialDocs: LAWTON_OFFICIAL_DOCS,
};
