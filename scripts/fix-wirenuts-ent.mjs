/**
 * Fix two items across all Austin + SA job files:
 *
 * 1. WWCRB wire nuts: quantity "1 bag" → "1 bag (500)", unitPrice 0.084 → 42
 *    (bag of 500 @ $0.08 each = ~$42 per bag, sold as full bag)
 *
 * 2. ENT1BOX coil: Update to full-coil sales unit (100 ft coil, not cut to length)
 *    quantity "X ft" → "1 coil (100 ft)", update spec and price to per-coil
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const dirs = [
  "C:\\Users\\bobnu\\projects\\voltspec\\lib\\data\\jobs",
  "C:\\Users\\bobnu\\projects\\voltspec\\lib\\data\\san-antonio\\jobs",
];

let totalChanged = 0;

for (const dir of dirs) {
  for (const file of readdirSync(dir).filter(f => f.endsWith(".ts"))) {
    const fp = join(dir, file);
    let c = readFileSync(fp, "utf-8");
    let changed = false;

    // ── Fix WWCRB wire nuts ──
    // Match: quantity: "1 bag", spec contains WWCRB, unitPrice: 0.084
    // Change to: quantity: "1 bag (500)", unitPrice: 42
    c = c.replace(
      /(\{\s*item:\s*"Red Wire Connectors?",\s*quantity:\s*)"1 bag"(,\s*spec:\s*"[^"]*WWCRB[^"]*",\s*unitPrice:\s*)[\d.]+(\s*\})/g,
      (match, pre, mid, post) => {
        changed = true;
        return `${pre}"1 bag (500)"${mid}42${post}`;
      }
    );

    // ── Fix ENT1BOX coil ──
    // Various patterns: quantity "100 ft", "30 ft", "50 ft", etc.
    // Change all to full coil: quantity "1 coil (100 ft)", update spec, price per coil
    // Austin price: $130.43/coil (from SA quote, ENT1BOX $130.43/C = per 100ft = per coil)
    // SA price: $130.43/coil (same)
    c = c.replace(
      /(\{\s*item:\s*")([^"]*ENT[^"]*)"(,\s*quantity:\s*)"[^"]+"(,\s*spec:\s*")([^"]*ENT1B[^"]*)"(,?\s*(?:unitPrice:\s*[\d.]+\s*)?\})/g,
      (match, itemPre, itemName, qtyPre, specPre, specText, rest) => {
        changed = true;
        const newSpec = specText
          .replace(/sold per ft/i, "sold as full 100 ft coil only — not cut to length")
          .replace(/\d+ ft\b/g, "100 ft");
        const newRest = rest.includes("unitPrice")
          ? rest.replace(/unitPrice:\s*[\d.]+/, "unitPrice: 130.43")
          : `, unitPrice: 130.43 }`;
        return `${itemPre}${itemName}"${qtyPre}"1 coil (100 ft)"${specPre}${newSpec}"${newRest}`;
      }
    );

    if (changed) {
      writeFileSync(fp, c, "utf-8");
      console.log(`OK: ${file} (${dir.includes("san-antonio") ? "SA" : "Austin"})`);
      totalChanged++;
    }
  }
}

console.log(`\nDone: ${totalChanged} files updated`);
