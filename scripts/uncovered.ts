import { ELLIOTT_BRANCHES } from "../lib/distributors/elliott/branches";
import { JURISDICTIONS } from "../lib/data/jurisdictions";

const coveredPrefixes: string[] = [];
JURISDICTIONS.forEach(j => j.zipPrefixes.forEach(p => coveredPrefixes.push(p)));

const uncovered = ELLIOTT_BRANCHES.filter(b => {
  return !coveredPrefixes.some(p => b.zip.startsWith(p));
});

function zipState(zip: string): string {
  const z = parseInt(zip.slice(0,3));
  if (z >= 700 && z <= 714) return "LA";
  if (z >= 716 && z <= 729) return "AR";
  if (z >= 730 && z <= 749) return "OK";
  return "TX";
}

console.log(`Total: ${ELLIOTT_BRANCHES.length} | Covered: ${ELLIOTT_BRANCHES.length - uncovered.length} | Uncovered: ${uncovered.length}`);
console.log("");

const areas = new Map<string, string[]>();
uncovered.forEach(b => {
  const k = `${b.city}, ${zipState(b.zip)}`;
  if (!areas.has(k)) areas.set(k, []);
  areas.get(k)!.push(`#${b.store} ${b.name} (${b.zip})`);
});

[...areas.keys()].sort().forEach(k => {
  console.log(`${k}: ${areas.get(k)!.join(", ")}`);
});
