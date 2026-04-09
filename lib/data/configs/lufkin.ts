/**
 * Lufkin / East TX (Entergy Texas) — CH series
 * Covers Lufkin (#22) and Jasper (#32) Elliott stores.
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { LUFKIN_OFFICIAL_DOCS } from "../lufkin/official-docs";

export const LUFKIN_CONFIG: JurisdictionConfig = {
  id: "lufkin",
  label: "Lufkin/East TX (Angelina County)",
  shortLabel: "Lufkin/East TX",
  utility: "Entergy Texas",
  county: "Angelina County",
  state: "TX",
  defaultZip: "75901",
  zipPrefixes: ["759"],
  baseline: "austin",
  meterSocket: {
    catalog: "UTRS213CE",
    description: "200A ringless single-phase OH/UG meter socket, Entergy Texas approved",
    replaces: ["1006352CCH", "U5135-XL-200", "U5135"],
  },
  textReplacements: [
    ["Eaton 1006352CCH", "Eaton UTRS213CE"],
    ["1006352CCH", "UTRS213CE"],
    ["Milbank U5135-XL-200", "Eaton UTRS213CE"],
    ["Milbank U5135", "Eaton UTRS213CE"],
    ["AE-approved", "Entergy Texas approved"],
    ["Austin Energy approved", "Entergy Texas approved"],
    ["AE approved", "Entergy approved"],
    ["Austin Energy ESPA required", "Entergy Texas service application required"],
    ["Austin Energy ESPA", "Entergy Texas service application"],
    ["Austin Energy", "Entergy Texas"],
    ["City of Austin", "City of Lufkin"],
    ["Travis County", "Angelina County"],
  ],
  officialDocs: LUFKIN_OFFICIAL_DOCS,
};
