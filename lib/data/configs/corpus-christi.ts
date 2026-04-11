/**
 * Corpus Christi, TX — AEP Texas Central territory
 * Covers stores nearby: Brownsville, Laredo areas
 * BR series, SA baseline pricing (real pricing TBD from invoices)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { CORPUS_CHRISTI_OFFICIAL_DOCS } from "../corpus-christi/official-docs";

export const CORPUS_CHRISTI_CONFIG: JurisdictionConfig = {
  id: "corpus-christi",
  label: "Corpus Christi, TX (Nueces County)",
  shortLabel: "Corpus Christi, TX",
  utility: "AEP Texas Central",
  county: "Nueces County",
  state: "TX",
  defaultZip: "78401",
  zipPrefixes: ["784"],
  baseline: "san-antonio",

  textReplacements: [
    ["CPS Energy Residential Service Application required", "AEP Texas service application required"],
    ["CPS Energy", "AEP Texas Central"],
    ["CPS", "AEP Texas"],
    ["City of San Antonio", "City of Corpus Christi"],
    ["Bexar County", "Nueces County"],
  ],

  officialDocs: CORPUS_CHRISTI_OFFICIAL_DOCS,
};
