/**
 * PEC (Pedernales Electric Cooperative) — Hill Country Jurisdiction Config
 *
 * Inherits from Austin (CH series). Patches:
 *   - Meter socket: Milbank U4801XL5T9 (PEC approved)
 *   - 320A meter socket: Milbank U2448X (no dash)
 *   - Utility refs: Austin Energy → PEC
 *   - No pricing overlay (uses Austin baseline)
 *   - patchMaterialText: true (catalog swaps in material specs)
 */

import type { JurisdictionConfig } from "../jurisdiction-config";
import { PEC_OFFICIAL_DOCS } from "../pec/official-docs";

export const PEC_CONFIG: JurisdictionConfig = {
  id: "pec",
  label: "Hill Country, TX (PEC)",
  shortLabel: "Hill Country (PEC)",
  utility: "Pedernales Electric Cooperative",
  county: "Multiple Counties",
  state: "TX",
  defaultZip: "78620",
  zipPrefixes: ["7862", "7861", "7865"],

  baseline: "austin",
  patchMaterialText: true,

  meterSocket: {
    catalog: "U4801XL5T9",
    description: "200A single-phase 5-terminal lever-bypass ringless meter socket, PEC-approved for Hill Country",
    replaces: ["1006352CCH", "U5135-XL-200", "U5135"],
  },

  textReplacements: [
    // Meter socket swaps
    ["Eaton 1006352CCH", "Milbank U4801XL5T9"],
    ["1006352CCH", "U4801XL5T9"],
    ["Milbank U5135-XL-200", "Milbank U4801XL5T9"],
    ["U5135-XL-200", "U4801XL5T9"],
    // 320A meter socket
    ["Milbank U2448-X", "Milbank U2448X"],
    ["U2448-X", "U2448X"],
    // Utility references (order matters — specific before general)
    ["AE-approved for Central Texas", "PEC-approved for Hill Country"],
    ["AE-approved", "PEC-approved"],
    ["AE approved", "PEC approved"],
    ["Austin Energy approved", "PEC approved"],
    ["Austin Energy standard", "PEC standard"],
    ["Austin Energy amendment", "PEC requirement"],
    ["AE Design Criteria", "PEC service standards"],
    ["AE engineering", "PEC engineering"],
    ["AE inspection", "PEC inspection"],
    ["AE ESPA", "PEC service application"],
    ["Austin Energy ESPA", "PEC service application"],
    ["Austin Energy", "PEC"],
    ["City of Austin electrical permit", "County electrical permit (PEC territory)"],
    ["City of Austin", "Local AHJ"],
    ["Austin permit required", "Local permit required"],
    ["contact AE", "contact PEC"],
    ["AE requires", "PEC requires"],
    ["AE will", "PEC will"],
    ["AE may", "PEC may"],
    ["submit to AE", "submit to PEC"],
    ["(AE)", "(PEC)"],
    ["(AE ", "(PEC "],
  ],

  officialDocs: PEC_OFFICIAL_DOCS,
};
