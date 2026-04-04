/**
 * Add unitPrice to every material item across all job files.
 * Prices are realistic rough contractor house-account estimates.
 * The script parses each materials array and injects unitPrice fields.
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { readdirSync } from "fs";

const BASE = "C:\\Users\\bobnu\\projects\\voltspec\\lib\\data";

// ── Price lookup by item name substring match (case-insensitive) ──
// These are rough contractor cash/house-account prices.
const PRICES = [
  // Panels & loadcenters
  [/200A.*Main Breaker Panel/i, 189],
  [/200A BR Main Breaker Panel/i, 179],
  [/40-Space MLO Panel/i, 210],
  [/125A.*MLO Subpanel|125A BR MLO/i, 135],
  [/200A.*Feed-Through|CH Feed-Through|BR Feed-Through/i, 165],
  [/200A Ringless Meter/i, 95],
  [/320A Meter Socket/i, 285],
  [/MDP Enclosure.*Pow-R-Line/i, 680],
  [/200A 3-Phase Main Breaker/i, 245],
  [/125A LOAD CENTER|125A.*Load Center/i, 135],

  // Breakers - dual function / specialty
  [/Dual Function.*20A/i, 52],
  [/Dual Function.*15A/i, 48],
  [/AFCI Breaker.*20A/i, 38],
  [/AFCI Breaker.*15A/i, 36],
  [/GFCI Breaker.*50A/i, 85],
  [/GFCI Breaker.*30A/i, 68],
  [/GFCI Breaker.*20A/i, 42],
  [/2-Pole 60A Breaker/i, 22],
  [/2-Pole 50A Breaker/i, 19],
  [/2-Pole 40A Breaker/i, 17],
  [/2-Pole 35A.*Solar/i, 16],
  [/2-Pole 30A Breaker/i, 15],
  [/1-Pole 20A Breaker/i, 8],
  [/1-Pole 15A Breaker/i, 7],
  [/3-Pole 50A Breaker/i, 95],
  [/3-Pole 20A Breaker/i, 72],
  [/Feeder Breaker|2-Pole 60A Feeder/i, 22],
  [/Surge Protective Device/i, 42],

  // Wire & cable
  [/2\/0.*AL SER Cable|2-2-2-4 AL SER/i, 3.85],
  [/2\/0-2\/0-1\/0 AL SER/i, 4.50],
  [/2 AWG AL SER/i, 3.20],
  [/3\/0 AWG AL XHHW/i, 2.85],
  [/350 kcmil AL XHHW/i, 4.75],
  [/4 AWG Bare Copper GEC/i, 2.10],
  [/6 AWG Bare Copper GEC/i, 1.45],
  [/6 AWG THHN/i, 0.85],
  [/8 AWG THHN/i, 0.65],
  [/10 AWG THHN/i, 0.48],
  [/12 AWG THHN/i, 0.32],
  [/14 AWG THHN/i, 0.24],
  [/20A THHN.*branch/i, 0.32],
  [/10 AWG USE-2/i, 0.55],
  [/16\/2 direct-burial/i, 0.42],

  // Conduit
  [/3 in\. Schedule 40 PVC/i, 12.50],
  [/2 in\. Schedule 40 PVC/i, 7.80],
  [/1-1\/4 in\. Schedule 80 PVC/i, 8.50],
  [/1 in\. Schedule 80 PVC/i, 6.25],
  [/3\/4 in\. Schedule 80 PVC/i, 4.80],
  [/1 in\. ENT Blue Flex/i, 0.65],
  [/3\/4 in\. EMT/i, 4.50],
  [/1 in\. EMT/i, 6.20],
  [/1-1\/4 in\. PVC 90|PVC.*Elbow/i, 3.75],
  [/1-1\/4 in\. PVC Male Adapter/i, 2.10],
  [/LB Condulet|LB25/i, 12.50],

  // Grounding
  [/5\/8 x 8 ft Ground Rod/i, 18],
  [/Ground Rod Clamp/i, 4.50],
  [/Ufer Ground Clamp/i, 8.50],

  // Boxes, covers, fittings
  [/4-Square Box Deep|4 in\. square/i, 2.85],
  [/4-Square Cover/i, 1.95],
  [/In-Use Weatherproof Cover/i, 9.50],
  [/Duct Seal/i, 5.50],
  [/PVC Conduit Cement/i, 6.50],
  [/Weatherhead/i, 14.50],
  [/Grounding Bushing/i, 6.75],
  [/Panel Directory Label/i, 12],
  [/Guy Wire and Anchors/i, 45],

  // Receptacles & devices
  [/15A TR Duplex Receptacle/i, 1.85],
  [/20A TR Duplex Receptacle|20A TR Receptacle/i, 2.25],
  [/20A TR Single Receptacle/i, 3.50],
  [/15A TR GFCI Receptacle/i, 16],
  [/20A.*GFCI.*Dual Function/i, 22],
  [/15A TR WR Duplex/i, 2.85],
  [/20A Outdoor GFCI/i, 22],
  [/NEMA 14-50R/i, 14],
  [/NEMA 6-50R/i, 12],
  [/NEMA 6-30R/i, 10],

  // Disconnects
  [/60A AC Disconnect|60A Spa Disconnect|Solar AC Disconnect/i, 32],

  // Generator / ATS
  [/Whole-House Generator/i, 5800],
  [/200A Service Entrance ATS/i, 850],
  [/1 in\. LFMC/i, 2.85],
  [/Concrete Pad Kit/i, 185],
  [/Gas Shutoff Valve/i, 35],

  // Battery / Solar
  [/Powerwall/i, 9200],
  [/Gateway.*Transfer/i, 1850],
  [/String Inverter.*SolarEdge/i, 2400],
  [/Rapid Shutdown/i, 185],
  [/PV Optimizers/i, 42],
  [/Roof.*Flashing/i, 6.50],
  [/Rail.*Mounting/i, 125],
  [/Mid Clamps/i, 2.50],
  [/End Clamps/i, 3.25],
  [/Production Meter/i, 165],
  [/MC4.*Extension/i, 18],
  [/Wire Clips/i, 0.45],

  // Landscape / Pool
  [/Low-Voltage Transformer.*600W/i, 385],
  [/Low-Voltage Transformer.*300W/i, 225],
  [/LED Path Light/i, 42],
  [/LED Spot Light/i, 65],
  [/LED.*Well Light/i, 78],
  [/Pool.*Spa Panel/i, 85],
  [/12V Transformer.*Pentair/i, 165],

  // EV
  [/EVSE/i, 550],

  // Kichler transformer
  [/Kichler.*15TP/i, 265],
  [/Kichler.*15PR/i, 385],

  // Catch-all Eaton devices
  [/Eaton.*receptacle/i, 2.50],

  // Subpanel / specialty panels
  [/100A CH MLO Subpanel/i, 125],
  [/Critical Loads Subpanel/i, 135],
  [/Pool.*Spa Panel/i, 85],
  [/Whole-Home Surge Protector/i, 65],
  [/AE Interconnect Amendment/i, 0],

  // Wire - 3 AWG, 8 AWG bare, etc.
  [/3 AWG THHN/i, 1.15],
  [/3\/0 AWG Bare Copper GEC/i, 3.85],
  [/2\/0 AWG Bare Copper GEC/i, 2.95],
  [/8 AWG Solid Bare Copper|8 AWG Bare Copper/i, 0.95],
  [/500 kcmil AL XHHW/i, 6.50],
  [/12\/2 Low-Voltage Cable/i, 0.55],

  // EMT conduit & fittings
  [/1-1\/4 in\. EMT Conduit/i, 8.50],
  [/1-1\/4 in\. EMT Set-Screw Connector/i, 2.25],
  [/1-1\/4 in\. EMT Set-Screw Coupling/i, 1.85],
  [/1-1\/4 in\. EMT One-Hole Strap/i, 0.65],
  [/2 in\. EMT Set-Screw Connector/i, 3.50],
  [/3\/4 in\. EMT/i, 4.50],

  // PVC fittings
  [/1 in\. PVC 90|1 in\. PVC.*Sweep Ell/i, 2.85],
  [/1 in\. PVC Male Adapter/i, 1.75],
  [/1 in\. PVC Coupling/i, 1.25],
  [/3\/4 in\. PVC 90|3\/4 in\. PVC.*Sweep Ell/i, 2.15],
  [/3\/4 in\. PVC Male Adapter/i, 1.45],
  [/3\/4 in\. PVC Coupling/i, 0.95],
  [/1 in\. Schedule 40 PVC Conduit/i, 4.50],
  [/3\/4 in\. Schedule 40 PVC Conduit/i, 3.50],
  [/3 in\. PVC Male Adapter/i, 5.50],
  [/2-1\/2 in\. PVC Male Adapter/i, 4.25],
  [/3 in\. Steel Locknut/i, 2.75],
  [/2-1\/2 in\. Steel Locknut/i, 2.25],
  [/2 in\. Steel Locknut/i, 1.85],
  [/2 in\. Plastic Bushing/i, 0.95],

  // Connectors / lugs
  [/AL-CU Multi-Tap Connector/i, 18],
  [/Red Wire Connector/i, 0.15],
  [/Bronze Bonding Lug/i, 4.50],
  [/NM Liquid-Tight Connector|NM Liquidtight/i, 3.25],

  // Generator items
  [/Standby Generator.*22kW/i, 5800],
  [/200A Whole-Home Transfer/i, 850],
  [/Generator Interlock Kit/i, 42],
  [/2-Pole 30A Generator Input/i, 15],
  [/Generator Mounting Pad/i, 185],
  [/1 in\. Liquidtight Flex/i, 2.85],
  [/1 in\. Liquidtight Straight/i, 4.50],
  [/Ground Rod$/i, 18],

  // Commercial
  [/MDP Trim.*Cover/i, 145],
  [/MDP Interior.*PRL3A/i, 425],
  [/Main Lug Kit.*400A/i, 85],
  [/Ground Bar Kit/i, 22],
  [/AE CT Meter Cabinet/i, 285],
  [/CT Cabinet/i, 285],
  [/3-Phase.*Fusible Disconnect/i, 245],
  [/3-Pole 20A Branch Breaker/i, 72],
  [/3-Pole 30A Branch Breaker/i, 78],
  [/Arc Flash Label Kit|Arc Flash Warning/i, 18],
  [/Emergency Disconnect Sign/i, 12],
  [/3-Phase Meter Socket/i, 185],

  // Disconnects - more patterns
  [/60A Non-Fusible Disconnect/i, 32],

  // Spa / Hot Tub
  [/Spa Disconnect Warning Label/i, 8],
  [/Underground Warning Tape/i, 6.50],

  // Pool
  [/12V Pool Light Transformer/i, 165],
  [/LED Pool Light Fixture/i, 145],
  [/Pool Light Niche/i, 85],
  [/Pool Equipotential Bonding Label/i, 8],

  // Solar
  [/Solar PV Modules 400W/i, 185],
  [/Racking System/i, 125],
  [/MC4 Connectors/i, 4.50],
  [/20A 2-Pole AC Backfed Breaker/i, 16],
  [/Grid-Tie Inverter/i, 1850],
  [/Solar Warning Labels/i, 15],
  [/PV System Monitoring/i, 195],

  // Battery / ESS
  [/ESS Warning Labels/i, 15],

  // Weatherproof box cover
  [/Weatherproof Box Cover/i, 9.50],

  // Direct burial
  [/Direct Burial Splice Kit/i, 8.50],

  // Temp power
  [/Temporary Power Pole/i, 85],
  [/320A Ringless Meter/i, 285],
];

function getPrice(itemName, spec) {
  const combined = `${itemName} ${spec}`;
  for (const [regex, price] of PRICES) {
    if (regex.test(combined)) return price;
  }
  return null;
}

// ── Parse quantity to a numeric value for extended price ──
function parseQty(qtyStr) {
  const m = qtyStr.match(/^(\d+)/);
  return m ? parseInt(m[1]) : 1;
}

// ── Process all job files ──
function processJobFiles(dir) {
  const files = readdirSync(dir).filter(f => f.endsWith(".ts"));
  let updated = 0;
  for (const file of files) {
    const fp = join(dir, file);
    let content = readFileSync(fp, "utf-8");

    // Process even if some items already have unitPrice — we'll add to those that don't

    // Find all material objects and add unitPrice
    // Pattern: { item: "...", quantity: "...", spec: "..." }
    let changed = false;
    // Match items both with and without unitPrice — only add/update those missing it
    content = content.replace(
      /\{\s*item\s*:\s*"([^"]+)"\s*,\s*quantity\s*:\s*"([^"]+)"\s*,\s*spec\s*:\s*"([^"]+)"\s*\}/g,
      (match, item, qty, spec) => {
        // Only process if this item doesn't already have unitPrice
        if (match.includes("unitPrice")) return match;
        const price = getPrice(item, spec);
        if (price !== null) {
          changed = true;
          return `{ item: "${item}", quantity: "${qty}", spec: "${spec}", unitPrice: ${price} }`;
        }
        return match;
      }
    );

    if (changed) {
      writeFileSync(fp, content, "utf-8");
      console.log(`OK: ${file} (${dir.includes("san-antonio") ? "SA" : "Austin"})`);
      updated++;
    } else {
      console.log(`NO MATCHES: ${file}`);
    }
  }
  return updated;
}

const austinDir = join(BASE, "jobs");
const saDir = join(BASE, "san-antonio", "jobs");

let total = 0;
total += processJobFiles(austinDir);
total += processJobFiles(saDir);

console.log(`\nDone: ${total} files updated with pricing`);
