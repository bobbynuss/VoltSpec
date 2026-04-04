/**
 * Update San Antonio job files with Cash Sale 129-House quote pricing.
 * Quote: 53-93083 dated 2026-04-01
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const SA_JOBS = "C:\\Users\\bobnu\\projects\\voltspec\\lib\\data\\san-antonio\\jobs";

// ── Quote prices by part number → per-unit price ──
const QUOTE = {
  // Panels & loadcenters
  "BRP20B200R": 343.97,
  "1009874ACH": 206.32,
  "BRP40L200G": 235.17,
  "BRP24L125G": 109.79,

  // Breakers (E = each)
  "BRNSURGE10": 136.51,
  "BRP120DF": 75.60,
  "BRP115DF": 75.60,
  "BRP115AF": 76.57,
  "BR230": 21.67,
  "BR250": 26.40,
  "BR120": 9.43,
  "BR260": 26.40,
  "BRN230GF": 244.49,
  "BRN250GF": 244.48,

  // Grounding (C = per 100)
  "615880": 29.81,    // $2981.33/100
  "GRC58": 4.75,      // $475.28/100
  "GLC140DB": 31.90,  // $3190.45/100

  // Conduit (C = per 100)
  "PVC3": 2.44,       // $243.61/100 per ft
  "TA3": 4.51,        // $451.47/100
  "108S": 5.38,       // $537.78/100 (3" locknut)
  "106S": 1.86,       // $185.56/100 (2" locknut)
  "326": 0.78,        // $77.76/100 (2" plastic bushing)
  "TA212": 3.08,      // $308.15/100 (2-1/2" PVC male adapter)
  "107S": 4.91,       // $491.11/100 (2-1/2" locknut)

  // ENT flex (C = per 100)
  "ENT1BOX": 1.30,    // $130.43/100 per ft

  // Devices (E = each)
  "TR270W": 1.93,
  "TR1877WBXSP": 8.38,
  "TRGF15W": 26.14,
  "GFD20W": 32.63,
  "TWR270W": 3.80,
  "AH1258BKF": 10.40,
  "AH1257BKF": 10.40,

  // Covers & misc (E = each)
  "MM420C": 12.90,
  "DPB222R": 61.22,
  "DS1": 8.55,
  "1256": 20.82,      // weatherhead ($2082.50/100)

  // Wire connectors (M = per 1000)
  "WWCRB": 0.084,     // $84.37/1000 — red wire connectors

  // Panel directory label
  "95543": 12,         // Brady label kit (quote shows $0, use estimate)

  // Generator & ATS
  "7043": 9048.44,
  "RXSW200A3": 1213.73,
};

// ── Name-based fallback prices for items not on this quote ──
const NAME_PRICES = [
  // Disconnects
  [/DG222NGB/i, 61.22],       // Same price as DPB222R
  [/DPB222R/i, 61.22],

  // Solar items
  [/SolarEdge.*SE17400/i, 2650],
  [/BR235/i, 18.50],          // BR 2-pole 35A solar breaker

  // Battery items
  [/Tesla.*Gateway/i, 1950],
  [/Powerwall/i, 9800],
  [/CHP24L125X2|100A subpanel.*CHP/i, 135],

  // Commercial items
  [/EZB2072R/i, 720],
  [/PRL3A/i, 450],
  [/FD3200/i, 265],
  [/FD3050/i, 105],
  [/FD3020/i, 82],
  [/DH365FGK/i, 265],
  [/BRSPT2ULTRA/i, 48],

  // Pool
  [/CH60SPAST/i, 95],
  [/Pentair.*601100/i, 185],

  // Landscape
  [/Kichler.*15PR600/i, 425],
  [/Kichler.*15TP300/i, 295],
  [/Kichler.*15820/i, 48],
  [/Kichler.*16224/i, 72],

  // PVC fittings not in quote
  [/PVC100.*1 in.*Schedule 80/i, 6.25],
  [/PVC.*3\/4.*Schedule/i, 3.50],

  // Misc fittings
  [/IPLD104/i, 30.06],
  [/GAL3445/i, 9.09],     // 3/4" 45° rigid elbow ($908.96/100)
];

function getPrice(spec, itemName) {
  for (const [partNo, price] of Object.entries(QUOTE)) {
    if (spec.includes(partNo)) return price;
  }
  const combined = `${itemName} ${spec}`;
  for (const [regex, price] of NAME_PRICES) {
    if (regex.test(combined)) return price;
  }
  return null;
}

// ── Process SA job files ──
const files = readdirSync(SA_JOBS).filter(f => f.endsWith(".ts"));
let totalUpdated = 0;

for (const file of files) {
  const fp = join(SA_JOBS, file);
  let content = readFileSync(fp, "utf-8");
  let changed = false;

  // Update items with existing unitPrice
  content = content.replace(
    /\{\s*item:\s*"([^"]+)"\s*,\s*quantity:\s*"([^"]+)"\s*,\s*spec:\s*"([^"]+)"\s*,\s*unitPrice:\s*[\d.]+\s*\}/g,
    (match, item, qty, spec) => {
      const p = getPrice(spec, item);
      if (p !== null) { changed = true; return `{ item: "${item}", quantity: "${qty}", spec: "${spec}", unitPrice: ${p} }`; }
      return match;
    }
  );

  // Add unitPrice to items missing it
  content = content.replace(
    /\{\s*item:\s*"([^"]+)"\s*,\s*quantity:\s*"([^"]+)"\s*,\s*spec:\s*"([^"]+)"\s*\}/g,
    (match, item, qty, spec) => {
      const p = getPrice(spec, item);
      if (p !== null) { changed = true; return `{ item: "${item}", quantity: "${qty}", spec: "${spec}", unitPrice: ${p} }`; }
      return match;
    }
  );

  if (changed) {
    writeFileSync(fp, content, "utf-8");
    console.log(`OK: ${file}`);
    totalUpdated++;
  } else {
    console.log(`NO CHANGES: ${file}`);
  }
}

console.log(`\nDone: ${totalUpdated} SA files updated with quote pricing`);
