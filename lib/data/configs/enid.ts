/**
 * Enid, OK — OG&E territory
 * Covers store: #133 Enid
 * BR series, SA baseline pricing (real pricing TBD from invoices)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { ENID_OFFICIAL_DOCS } from "../enid/official-docs";

export const ENID_CONFIG: JurisdictionConfig = {
  id: "enid",
  label: "Enid, OK (Garfield County)",
  shortLabel: "Enid, OK",
  utility: "OG&E (Oklahoma Gas & Electric)",
  county: "Garfield County",
  state: "OK",
  defaultZip: "73701",
  zipPrefixes: ["737"],
  baseline: "san-antonio",
  removeMeterSocket: {
    replaces: ["U5135-XL-200", "U5135", "1006352CCH", "Milbank U5135-XL-200", "Milbank U5135"],
  },
  textReplacements: [
    ["CPS Energy Residential Service Application required", "OG&E service application required"],
    ["CPS Energy", "OG&E (Oklahoma Gas & Electric)"],
    ["CPS", "OG&E"],
    ["City of San Antonio", "City of Enid"],
    ["Bexar County", "Garfield County"],
  ],

  officialDocs: ENID_OFFICIAL_DOCS,
};
