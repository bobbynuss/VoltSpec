/**
 * Beaumont/Port Arthur, TX — Entergy Texas territory
 * BR series, SA baseline pricing (real pricing TBD from invoices)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { BEAUMONT_OFFICIAL_DOCS } from "../beaumont/official-docs";

export const BEAUMONT_CONFIG: JurisdictionConfig = {
  id: "beaumont",
  label: "Beaumont/Port Arthur, TX (Jefferson County)",
  shortLabel: "Beaumont, TX",
  utility: "Entergy Texas",
  county: "Jefferson County",
  state: "TX",
  defaultZip: "77701",
  zipPrefixes: ["777", "776"],
  baseline: "san-antonio",

  textReplacements: [
    ["CPS Energy Residential Service Application required", "Entergy Texas service application required"],
    ["CPS Energy", "Entergy Texas"],
    ["CPS", "Entergy Texas"],
    ["City of San Antonio", "City of Beaumont"],
    ["Bexar County", "Jefferson County"],
  ],

  officialDocs: BEAUMONT_OFFICIAL_DOCS,
};
