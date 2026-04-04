import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const dirs = [
  "C:\\Users\\bobnu\\projects\\voltspec\\lib\\data\\jobs",
  "C:\\Users\\bobnu\\projects\\voltspec\\lib\\data\\san-antonio\\jobs",
];

let unpriced = 0;
for (const dir of dirs) {
  for (const f of readdirSync(dir).filter(x => x.endsWith(".ts"))) {
    const c = readFileSync(join(dir, f), "utf-8");
    const matches = [...c.matchAll(/\{\s*item:\s*"([^"]+)"[^}]*\}/g)];
    const noPrice = matches.filter(m => !m[0].includes("unitPrice"));
    for (const m of noPrice) {
      console.log(`${f}: ${m[1]}`);
      unpriced++;
    }
  }
}
console.log(`\nTotal unpriced items: ${unpriced}`);
