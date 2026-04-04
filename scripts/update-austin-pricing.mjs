/**
 * Update Austin job files with actual Cash Sale 53-House quote pricing.
 * Quote: 53-93065 dated 2026-04-01
 *
 * UOM: E=Each, C=per 100, M=per 1000
 * We convert everything to per-unit pricing.
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const AUSTIN_JOBS = "C:\\Users\\bobnu\\projects\\voltspec\\lib\\data\\jobs";

// ── Quote prices mapped by part number → unit price (each) ──
// Wire items are excluded (will show "Speak to sales")
const QUOTE_PRICES = {
  // Panels & loadcenters
  "CHP42B200R": 351.80,     // CH 42-space 200A main breaker panel
  "1006352CCH": 478.69,     // 200A meter socket
  "CHP08B200RF": 261.20,    // CH 8-space feed-through panel
  
  // Conduit (C = per 100, so ÷ 100 for per-unit)
  "PVC114": 0.776,          // 1-1/4" Sch 40 PVC conduit per ft (7760¢/100)
  "114ELL90": 3.42,         // 1-1/4" PVC 90° elbow ($341.78/100)
  "TA114": 0.93,            // 1-1/4" PVC male adapter ($92.94/100)
  
  // Grounding
  "615880": 26.43,          // 5/8"x8' ground rod ($2642.55/100)
  "GRC58": 4.21,            // Ground rod clamp ($421.27/100)
  "GLC140DB": 28.28,        // Bronze ground clamp ($2827.90/100)
  
  // Fittings
  "1256": 18.46,            // 2" weatherhead ($1845.85/100)
  "386DC": 12.78,           // Grounding bushing ($1278.20/100)
  
  // Breakers (E = each)
  "CHFP120DF": 77.17,       // CH dual function AF/GF 20A
  "CHFP120GF": 85.19,       // CH GFCI 20A
  "CHFP120AF": 66.90,       // CH AFCI 20A
  "CHF250": 23.73,          // CH 2-pole 50A breaker
  
  // Devices (E = each)
  "TRBR20WBXSP": 7.99,      // 20A TR duplex receptacle
  "TRBR20W-BXSP": 7.99,     // alternate dash format
  "TWRGF20W": 28.34,        // 20A WR GFCI receptacle
  
  // Boxes & covers (C = per 100)
  "TP403": 4.44,            // 4-square box ($443.61/100)
  "TP516": 3.68,            // 4-square cover ($368.00/100)
  
  // Misc (E = each)
  "MM420C": 11.47,          // In-use WP cover
  "DS1": 6.36,              // Duct seal
  "IPLD104": 30.06,         // Multi-tap connector
  
  // Rigid conduit (C = per 100 → per ft)
  "GAL2": 10.44,            // 2" rigid conduit per 10ft stick ($1044.27/100)
};

// ── Additional price lookups by item name pattern ──
// For items not in the quote but common across Austin jobs
const NAME_PRICES = [
  // CH breakers not in this specific quote but priced consistently
  [/CH.*SPD|CHSPT/i, 48],
  [/CH.*2.*100|CH2100/i, 28],
  [/CHF230|CH.*2-Pole 30A/i, 18.50],
  [/CHF260|CH.*2-Pole 60A/i, 25.50],
  [/CHP24L125/i, 185],       // CH 24-space MLO subpanel
  [/CHP22B125/i, 165],       // CH outdoor load center
  [/CHFP250GF/i, 125],       // CH 2-pole 50A GFCI
  [/CHFP120DF/i, 77.17],     // Dual function 20A (from quote)
  [/CHFP115DF/i, 72.50],     // Dual function 15A (estimated)
  [/CHFP120GF/i, 85.19],     // GFCI 20A
  [/CHFP115GF/i, 80],        // GFCI 15A
  [/CHFP120AF/i, 66.90],     // AFCI 20A (from quote)
  [/DPB222R|DG222NGB/i, 38], // AC disconnect
  [/CHSURGE/i, 48],          // Surge protector
  
  // Common items across all Austin jobs
  [/Kichler.*15PR600/i, 425],
  [/Kichler.*15TP300/i, 295],
  [/Kichler.*15820/i, 48],
  [/Kichler.*16224/i, 72],
  [/CH60SPAST/i, 95],        // Pool/spa panel
  [/Pentair.*601100/i, 185],  // Pool transformer
  [/Generac.*7043/i, 6200],  // Generator
  [/RXSW200A3/i, 920],       // ATS
  [/SolarEdge.*SE17400/i, 2650], // Inverter
  [/Tesla.*Gateway/i, 1950],     // Gateway
  [/Powerwall/i, 9800],         // Powerwall
];

function getQuotePrice(spec, itemName) {
  // Try exact part number match first
  for (const [partNo, price] of Object.entries(QUOTE_PRICES)) {
    if (spec.includes(partNo)) return price;
  }
  // Try name pattern match
  const combined = `${itemName} ${spec}`;
  for (const [regex, price] of NAME_PRICES) {
    if (regex.test(combined)) return price;
  }
  return null;
}

// ── Process Austin job files ──
const files = readdirSync(AUSTIN_JOBS).filter(f => f.endsWith(".ts"));
let totalUpdated = 0;

for (const file of files) {
  const fp = join(AUSTIN_JOBS, file);
  let content = readFileSync(fp, "utf-8");
  let changed = false;

  // Replace unitPrice values for items that match quote
  content = content.replace(
    /\{\s*item:\s*"([^"]+)"\s*,\s*quantity:\s*"([^"]+)"\s*,\s*spec:\s*"([^"]+)"\s*,\s*unitPrice:\s*[\d.]+\s*\}/g,
    (match, item, qty, spec) => {
      const quotePrice = getQuotePrice(spec, item);
      if (quotePrice !== null) {
        changed = true;
        return `{ item: "${item}", quantity: "${qty}", spec: "${spec}", unitPrice: ${quotePrice} }`;
      }
      return match; // keep existing price if no quote match
    }
  );

  // Also handle items without unitPrice
  content = content.replace(
    /\{\s*item:\s*"([^"]+)"\s*,\s*quantity:\s*"([^"]+)"\s*,\s*spec:\s*"([^"]+)"\s*\}/g,
    (match, item, qty, spec) => {
      const quotePrice = getQuotePrice(spec, item);
      if (quotePrice !== null) {
        changed = true;
        return `{ item: "${item}", quantity: "${qty}", spec: "${spec}", unitPrice: ${quotePrice} }`;
      }
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

console.log(`\nDone: ${totalUpdated} Austin files updated with quote pricing`);
