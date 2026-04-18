/**
 * Vendor Grouping Engine
 *
 * Automatically groups BOM materials by manufacturer/vendor based on
 * Elliott vendor codes, part number prefixes, and spec text analysis.
 * Used by the multi-party collaboration system so sales reps can assign
 * product lines to vendor collaborators.
 */

import type { MaterialItem } from "./core/types";
import { elliottVendorCode, extractPartNumber } from "./distributors/elliott/vendor-codes";

// ── Manufacturer Definitions ───────────────────────────────────────

export interface ManufacturerDef {
  key: string;           // Normalized key: 'eaton', 'southwire', etc.
  name: string;          // Display name
  vendorCodes: string[]; // Elliott vendor codes that map to this manufacturer
  specPatterns?: RegExp[];// Additional spec-text patterns
}

/**
 * Master manufacturer → vendor-code mapping.
 * This is the single source of truth for grouping materials by manufacturer.
 */
export const MANUFACTURERS: ManufacturerDef[] = [
  {
    key: "eaton-power",
    name: "Eaton Power Distribution (Panels / Breakers / Gear)",
    vendorCodes: ["ETN", "CHD", "CHS"],
    specPatterns: [/\bpow-r-line\b/i, /\bcutler.hammer\b/i],
  },
  {
    key: "eaton-wiring",
    name: "Eaton Wiring Devices (Receptacles / Switches / Dimmers)",
    vendorCodes: ["EWD"],
    specPatterns: [],
  },
  {
    key: "eaton-lighting",
    name: "Eaton Crouse-Hinds Lighting",
    vendorCodes: ["ETL"],
    specPatterns: [/\bcrouse.hinds.*light\b/i],
  },
  {
    key: "southwire",
    name: "Southwire",
    vendorCodes: ["COP", "ALU", "ALF"],
    specPatterns: [/\bsouthwire\b/i, /\bromex\b/i],
  },
  {
    key: "lithonia",
    name: "Lithonia / Acuity Brands",
    vendorCodes: ["LIT", "JUN"],
    specPatterns: [/\blithonia\b/i, /\bacuity\b/i, /\bjuno\b/i],
  },
  {
    key: "hubbell",
    name: "Hubbell / Bridgeport",
    vendorCodes: ["BRI", "TAM", "CRS"],
    specPatterns: [/\bhubbell\b/i, /\bbridgeport\b/i, /\btaymac\b/i],
  },
  {
    key: "leviton",
    name: "Leviton",
    vendorCodes: ["LEV"],
    specPatterns: [/\bleviton\b/i],
  },
  {
    key: "lutron",
    name: "Lutron",
    vendorCodes: ["LUT"],
    specPatterns: [/\blutron\b/i],
  },
  {
    key: "pass-seymour",
    name: "Pass & Seymour / Legrand",
    vendorCodes: ["PAS"],
    specPatterns: [/\bpass\s*[&+]\s*seymour\b/i, /\blegrand\b/i],
  },
  {
    key: "generac",
    name: "Generac",
    vendorCodes: ["GNR"],
    specPatterns: [/\bgenerac\b/i],
  },
  {
    key: "conduit-pvc",
    name: "PVC Conduit & Fittings",
    vendorCodes: ["PVC", "PVF", "CON"],
    specPatterns: [/\bcarlon\b/i],
  },
  {
    key: "arlington",
    name: "Arlington Industries",
    vendorCodes: ["ARL"],
    specPatterns: [/\barlington\b/i],
  },
  {
    key: "ideal",
    name: "Ideal / Wago",
    vendorCodes: ["IDL", "WAG"],
    specPatterns: [/\bideal\b/i, /\bwago\b/i],
  },
  {
    key: "burndy",
    name: "Burndy",
    vendorCodes: ["BUR"],
    specPatterns: [/\bburndy\b/i],
  },
  {
    key: "nsi",
    name: "NSI / Polaris",
    vendorCodes: ["NSI"],
    specPatterns: [/\bnsi\b/i, /\bpolaris\b/i],
  },
  {
    key: "pentair",
    name: "Pentair",
    vendorCodes: ["PEN"],
    specPatterns: [/\bpentair\b/i],
  },
  {
    key: "solaredge",
    name: "SolarEdge",
    vendorCodes: ["SED"],
    specPatterns: [/\bsolaredge\b/i],
  },
  {
    key: "enphase",
    name: "Enphase",
    vendorCodes: ["ENP"],
    specPatterns: [/\benphase\b/i],
  },
  {
    key: "milbank",
    name: "Milbank",
    vendorCodes: ["MIB"],
    specPatterns: [/\bmilbank\b/i],
  },
  {
    key: "hoffman",
    name: "Hoffman / nVent",
    vendorCodes: ["HOF"],
    specPatterns: [/\bhoffman\b/i, /\bnvent\b/i],
  },
  {
    key: "keystone",
    name: "Keystone Technologies",
    vendorCodes: ["KST"],
    specPatterns: [/\bkeystone\b/i],
  },
  {
    key: "tork",
    name: "Tork",
    vendorCodes: ["TOR"],
    specPatterns: [/\btork\b/i],
  },
  {
    key: "american-polymer",
    name: "American Polymer",
    vendorCodes: ["AMY"],
    specPatterns: [/\bamerican\s*polymer\b/i],
  },
  {
    key: "mw-hardware",
    name: "M-W Service Hardware",
    vendorCodes: ["M-W"],
  },
  {
    key: "erico",
    name: "Erico / nVent",
    vendorCodes: ["ERI", "CDW"],
    specPatterns: [/\berico\b/i],
  },
  {
    key: "brk",
    name: "BRK Electronics",
    vendorCodes: ["BRK"],
    specPatterns: [/\bBRK\b/],
  },
  {
    key: "allied-moulded",
    name: "Allied Moulded / Stahlin",
    vendorCodes: ["AMF", "SPX"],
    specPatterns: [/\ballied\b/i, /\bstahlin\b/i],
  },
];

// Build lookup maps for fast resolution
const _vendorCodeToMfr = new Map<string, string>();
for (const m of MANUFACTURERS) {
  for (const vc of m.vendorCodes) {
    _vendorCodeToMfr.set(vc, m.key);
  }
}

// ── Resolve manufacturer for a single material item ────────────────

export interface MaterialWithManufacturer extends MaterialItem {
  index: number;
  manufacturerKey: string | null;
  manufacturerName: string | null;
  vendorCode: string | null;
}

/**
 * Determine which manufacturer a material item belongs to.
 */
export function resolveManufacturer(
  item: MaterialItem,
  index: number
): MaterialWithManufacturer {
  const part = extractPartNumber(item.spec);
  const vendorCode = part ? elliottVendorCode(part, item.spec) : null;

  // Try vendor code first
  if (vendorCode) {
    const mfrKey = _vendorCodeToMfr.get(vendorCode);
    if (mfrKey) {
      const mfr = MANUFACTURERS.find((m) => m.key === mfrKey)!;
      return {
        ...item,
        index,
        manufacturerKey: mfr.key,
        manufacturerName: mfr.name,
        vendorCode,
      };
    }
  }

  // Fall back to spec pattern matching
  for (const mfr of MANUFACTURERS) {
    if (mfr.specPatterns) {
      for (const pat of mfr.specPatterns) {
        if (pat.test(item.spec) || pat.test(item.item)) {
          return {
            ...item,
            index,
            manufacturerKey: mfr.key,
            manufacturerName: mfr.name,
            vendorCode,
          };
        }
      }
    }
  }

  return {
    ...item,
    index,
    manufacturerKey: null,
    manufacturerName: null,
    vendorCode,
  };
}

// ── Group all materials by manufacturer ────────────────────────────

export interface ManufacturerGroup {
  key: string;
  name: string;
  vendorCodes: string[];
  items: MaterialWithManufacturer[];
}

/**
 * Group an entire BOM by manufacturer. Returns groups sorted by item count (desc),
 * with an "unassigned" group at the end for items that couldn't be mapped.
 */
export function groupByManufacturer(
  materials: MaterialItem[]
): ManufacturerGroup[] {
  const resolved = materials.map((m, i) => resolveManufacturer(m, i));

  const groups = new Map<string, ManufacturerGroup>();

  for (const item of resolved) {
    const key = item.manufacturerKey ?? "__unassigned__";
    if (!groups.has(key)) {
      if (key === "__unassigned__") {
        groups.set(key, {
          key: "__unassigned__",
          name: "Unassigned / Other",
          vendorCodes: [],
          items: [],
        });
      } else {
        const mfr = MANUFACTURERS.find((m) => m.key === key)!;
        groups.set(key, {
          key: mfr.key,
          name: mfr.name,
          vendorCodes: [...mfr.vendorCodes],
          items: [],
        });
      }
    }
    groups.get(key)!.items.push(item);
  }

  // Sort: largest groups first, unassigned last
  return Array.from(groups.values()).sort((a, b) => {
    if (a.key === "__unassigned__") return 1;
    if (b.key === "__unassigned__") return -1;
    return b.items.length - a.items.length;
  });
}

/**
 * Get the list of vendor codes assigned to a specific vendor collaborator,
 * so we can filter the BOM to only show their materials.
 */
export function filterMaterialsForVendor(
  materials: MaterialItem[],
  assignedVendorCodes: string[]
): MaterialWithManufacturer[] {
  const codeSet = new Set(assignedVendorCodes.map((c) => c.toUpperCase()));
  const resolved = materials.map((m, i) => resolveManufacturer(m, i));
  return resolved.filter(
    (item) => item.vendorCode && codeSet.has(item.vendorCode.toUpperCase())
  );
}

/**
 * Get all unique manufacturer keys present in a BOM.
 * Useful for the sales rep's assignment UI.
 */
export function getManufacturersInBom(
  materials: MaterialItem[]
): Array<{ key: string; name: string; vendorCodes: string[]; itemCount: number }> {
  const groups = groupByManufacturer(materials);
  return groups.map((g) => ({
    key: g.key,
    name: g.name,
    vendorCodes: g.vendorCodes,
    itemCount: g.items.length,
  }));
}
