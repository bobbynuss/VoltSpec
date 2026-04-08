import { SA_JOBS } from "../lib/data/san-antonio/jobs";
const targets = ["new-200a-residential", "200a-upgrade", "meter-base-replacement", "span-panel-upgrade"];
for (const job of SA_JOBS) {
  if (!targets.includes(job.id)) continue;
  const svg = job.svgDiagram || "";
  const vb = svg.match(/viewBox="([^"]+)"/);
  console.log(`=== ${job.id} ===`);
  console.log("viewBox:", vb?.[1]);
  const re = /<text[^>]*y="(\d+)"[^>]*>([^<]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(svg)) !== null) {
    if (parseInt(m[1]) < 55) console.log(`  y=${m[1]}: "${m[2].trim()}"`);
  }
  console.log();
}
