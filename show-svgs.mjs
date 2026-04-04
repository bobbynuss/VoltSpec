import { readFileSync } from 'fs';
const f = readFileSync('lib/data.ts', 'utf8');
const parts = f.split('svgDiagram:`');
// Print SVG content for jobs 5 (subpanel), 6 (generator), 8 (temp pole), 11 (battery)
[5,6,8,11].forEach(i => {
  const end = parts[i].indexOf('</svg>`');
  console.log(`\n=== JOB ${i} ===`);
  console.log(parts[i].slice(0, end + 7));
});
