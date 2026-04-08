import { SA_JOBS } from "../lib/data/san-antonio/jobs.js";
const targets = ['new-200a-residential','200a-upgrade','meter-base-replacement'];
for (const job of SA_JOBS) {
  if (!targets.includes(job.id)) continue;
  const svg = job.svgDiagram || '';
  // Find viewBox
  const vb = svg.match(/viewBox="([^"]+)"/);
  console.log(`=== ${job.id} ===`);
  console.log('viewBox:', vb?.[1]);
  // Find all text elements with y < 50
  const texts = [...svg.matchAll(/<text[^>]*y="(\d+)"[^>]*>([^<]+)/g)];
  texts.filter(m => parseInt(m[1]) < 55).forEach(m => console.log(`  y=${m[1]}: "${m[2].trim()}"`));
  console.log();
}
