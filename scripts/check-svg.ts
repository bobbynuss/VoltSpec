import { SA_JOBS } from "../lib/data/san-antonio/jobs";
const targets = ["new-200a-residential", "200a-upgrade", "meter-base-replacement", "span-panel-upgrade"];
for (const job of SA_JOBS) {
  if (!targets.includes(job.id)) continue;
  const svg = job.svgDiagram || "";
  // Find the LEGEND text y position
  const legendMatch = svg.match(/<text[^>]*y="(\d+)"[^>]*>LEGEND/);
  // Find the legend box rect
  const legendBoxMatch = svg.match(/<rect[^>]*y="(\d+)"[^>]*>[^]*?LEGEND/);
  // Find all rects near the bottom
  const rects = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/g)];
  const bottomRects = rects.filter(m => parseInt(m[2]) > 400);
  console.log(`=== ${job.id} ===`);
  console.log("LEGEND text y:", legendMatch?.[1]);
  bottomRects.forEach(m => console.log(`  rect: x=${m[1]} y=${m[2]} w=${m[3]} h=${m[4]}`));
  console.log();
}
