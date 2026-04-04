/**
 * v2: Compact two-column breaker layout with proper sizing.
 * Uses 20×4px breakers, 1px row gap, 3px bus bar.
 * Adjusts panel box heights and text positions to avoid overlap.
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const BASE = "C:\\Users\\bobnu\\projects\\voltspec\\lib\\data";

function twoColumnBreakers(cx, startY, colors, opts = {}) {
  const bw = opts.breakerWidth || 20;
  const bh = opts.breakerHeight || 4;
  const rowGap = opts.rowGap || 1;
  const busW = opts.busWidth || 3;
  const colGap = opts.colGap || 2;

  const rows = [];
  for (let i = 0; i < colors.length; i += 2) {
    rows.push([colors[i], colors[i + 1] || null]);
  }

  const totalH = rows.length * bh + (rows.length - 1) * rowGap;
  const leftX = cx - busW / 2 - colGap - bw;
  const rightX = cx + busW / 2 + colGap;

  let svg = `  <!-- Two-column breaker layout -->\n`;
  svg += `  <rect x="${cx - busW / 2}" y="${startY - 1}" width="${busW}" height="${totalH + 2}" rx="0.5" fill="#475569" opacity="0.6"/>\n`;

  for (let r = 0; r < rows.length; r++) {
    const y = startY + r * (bh + rowGap);
    const [leftColor, rightColor] = rows[r];
    if (leftColor) {
      const opacity = (leftColor === "#334155") ? "" : ' opacity="0.85"';
      svg += `  <rect x="${leftX}" y="${y}" width="${bw}" height="${bh}" rx="1" fill="${leftColor}"${opacity}/>\n`;
    }
    if (rightColor) {
      const opacity = (rightColor === "#334155") ? "" : ' opacity="0.85"';
      svg += `  <rect x="${rightX}" y="${y}" width="${bw}" height="${bh}" rx="1" fill="${rightColor}"${opacity}/>\n`;
    }
  }
  return svg.trimEnd();
}

const G = "#22c55e", B = "#3b82f6", S = "#334155", Y = "#f59e0b";

// For each file, define the entire block to replace (old breakers + text below)
// and the replacement (new breakers + repositioned text)
const edits = [];

// ============================================================================
// 200A UPGRADE — Austin & SA
// Panel box: x=28 y=284 w=284 h=100. Expand to h=110 (+10px)
// Old: breakers at y=330, text at y=354,368,380
// New: breakers at y=328, bus = 27px tall (5 rows), text at y=362,376,388
// ============================================================================
const upgrade200a_old = `  <rect x="28" y="284" width="284" height="100" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="304" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">NEW 200A MAIN PANEL</text>`;

const upgrade200a_old_breakers = `  <!-- Two-column breaker layout -->
  <rect x="168" y="327" width="4" height="50" rx="0.5" fill="#475569" opacity="0.6"/>
  <rect x="138" y="328" width="28" height="8" rx="1" fill="#334155"/>
  <rect x="174" y="328" width="28" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="138" y="338" width="28" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="174" y="338" width="28" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="138" y="348" width="28" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="174" y="348" width="28" height="8" rx="1" fill="#334155"/>
  <rect x="138" y="358" width="28" height="8" rx="1" fill="#334155"/>
  <rect x="174" y="358" width="28" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="138" y="368" width="28" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="174" y="368" width="28" height="8" rx="1" fill="#334155"/>
  <text x="170" y="354"`;

const upgrade200a_new_box = `  <rect x="28" y="284" width="284" height="108" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="304" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">NEW 200A MAIN PANEL</text>`;

// Helper for the 200a-upgrade text lines that follow breakers
// We'll do a full block replacement for each file

// ============================================================================
// Actually, let me take a simpler approach: just replace each file's breaker
// section directly and fix overlapping text positions.
// ============================================================================

function processFile(relPath, replaceFn) {
  const filePath = join(BASE, relPath);
  let content;
  try { content = readFileSync(filePath, "utf-8"); } catch { console.error(`SKIP: ${relPath}`); return false; }
  const newContent = replaceFn(content);
  if (newContent === content) { console.error(`NO CHANGE: ${relPath}`); return false; }
  writeFileSync(filePath, newContent, "utf-8");
  console.log(`OK: ${relPath}`);
  return true;
}

let ok = 0, fail = 0;

// ============================================================================
// 200A UPGRADE (Austin + SA)
// ============================================================================
function fix200aUpgrade(content) {
  // Expand panel box height 100 → 108
  content = content.replace(
    '<rect x="28" y="284" width="284" height="100"',
    '<rect x="28" y="284" width="284" height="108"'
  );
  // Replace breaker block (old v1 two-column OR old horizontal)
  const breakerBlockRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="35[0-9]")/;
  const oldHorizRegex = /  <rect x="46" y="330"[\s\S]*?<rect x="226" y="330"[^/]*\/>\n/;
  
  const newBreakers = twoColumnBreakers(170, 328, [S,G, G,B, B,S, S,G, B,S]) + "\n";
  
  if (breakerBlockRegex.test(content)) {
    content = content.replace(breakerBlockRegex, newBreakers);
  } else if (oldHorizRegex.test(content)) {
    content = content.replace(oldHorizRegex, newBreakers);
  }
  
  // Shift text lines down: 354→362, 368→374, 380→386
  content = content.replace(
    '<text x="170" y="354" text-anchor="middle" fill="#64748b" font-size="8">Transfer',
    '<text x="170" y="360" text-anchor="middle" fill="#64748b" font-size="8">Transfer'
  );
  content = content.replace(
    '<text x="170" y="368" text-anchor="middle" fill="#64748b" font-size="8">Verify',
    '<text x="170" y="372" text-anchor="middle" fill="#64748b" font-size="8">Verify'
  );
  content = content.replace(
    '<text x="170" y="380" text-anchor="middle" fill="#475569" font-size="7">Install arc',
    '<text x="170" y="384" text-anchor="middle" fill="#475569" font-size="7">Install arc'
  );
  return content;
}

["diagrams/200a-upgrade.ts", "san-antonio/diagrams/200a-upgrade.ts"].forEach(f => {
  processFile(f, fix200aUpgrade) ? ok++ : fail++;
});

// ============================================================================
// NEW 200A RESIDENTIAL (Austin + SA)
// Panel box: x=28 y=306 w=284 h=88 → h=96
// ============================================================================
function fix200aResidential(content) {
  content = content.replace(
    '<rect x="28" y="306" width="284" height="88"',
    '<rect x="28" y="306" width="284" height="96"'
  );
  
  const breakerBlockRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="37[0-9]")/;
  const oldHorizRegex = /  <rect x="46" y="352"[\s\S]*?<rect x="226" y="352"[^/]*\/>\n/;
  const newBreakers = twoColumnBreakers(170, 350, [S,G, G,B, B,S, G,S, B,S]) + "\n";
  
  if (breakerBlockRegex.test(content)) {
    content = content.replace(breakerBlockRegex, newBreakers);
  } else if (oldHorizRegex.test(content)) {
    content = content.replace(oldHorizRegex, newBreakers);
  }
  
  content = content.replace(
    '<text x="170" y="376" text-anchor="middle" fill="#64748b" font-size="8">Garage',
    '<text x="170" y="380" text-anchor="middle" fill="#64748b" font-size="8">Garage'
  );
  content = content.replace(
    '<text x="170" y="390" text-anchor="middle" fill="#475569" font-size="7">AFCI:',
    '<text x="170" y="393" text-anchor="middle" fill="#475569" font-size="7">AFCI:'
  );
  return content;
}

["diagrams/new-200a-residential.ts", "san-antonio/diagrams/new-200a-residential.ts"].forEach(f => {
  processFile(f, fix200aResidential) ? ok++ : fail++;
});

// ============================================================================
// GENERATOR ATS (Austin + SA)
// Panel box: x=50 y=152 w=240 h=82 → h=90
// ============================================================================
function fixGeneratorAts(content) {
  content = content.replace(
    '<rect x="50" y="152" width="240" height="82"',
    '<rect x="50" y="152" width="240" height="90"'
  );
  
  const breakerBlockRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="22[0-9]")/;
  const oldHorizRegex = /  <rect x="68" y="200"[\s\S]*?<rect x="230" y="200"[^/]*\/>\n/;
  const newBreakers = twoColumnBreakers(170, 198, [S,G, B,G, S,B, S,G, B,S]) + "\n";
  
  if (breakerBlockRegex.test(content)) {
    content = content.replace(breakerBlockRegex, newBreakers);
  } else if (oldHorizRegex.test(content)) {
    content = content.replace(oldHorizRegex, newBreakers);
  }
  
  content = content.replace(
    '<text x="170" y="226" text-anchor="middle" fill="#475569" font-size="8">All house loads',
    '<text x="170" y="232" text-anchor="middle" fill="#475569" font-size="8">All house loads'
  );
  return content;
}

["diagrams/generator-ats.ts", "san-antonio/diagrams/generator-ats.ts"].forEach(f => {
  processFile(f, fixGeneratorAts) ? ok++ : fail++;
});

// ============================================================================
// BATTERY STORAGE (Austin + SA)
// Main panel: x=40 y=148 w=260 h=78 → h=86
// ============================================================================
function fixBatteryStorage(content) {
  content = content.replace(
    '<rect x="40" y="148" width="260" height="78"',
    '<rect x="40" y="148" width="260" height="86"'
  );
  
  const breakerBlockRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="2[12][0-9]")/;
  const oldHorizRegex = /  <rect x="60" y="196"[\s\S]*?<rect x="222" y="196"[^/]*\/>\n/;
  const newBreakers = twoColumnBreakers(170, 194, [S,G, B,S, G,B, S,G, B,S]) + "\n";
  
  if (breakerBlockRegex.test(content)) {
    content = content.replace(breakerBlockRegex, newBreakers);
  } else if (oldHorizRegex.test(content)) {
    content = content.replace(oldHorizRegex, newBreakers);
  }
  
  content = content.replace(
    '<text x="170" y="220" text-anchor="middle" fill="#475569" font-size="7">All loads',
    '<text x="170" y="226" text-anchor="middle" fill="#475569" font-size="7">All loads'
  );
  return content;
}

["diagrams/battery-storage.ts", "san-antonio/diagrams/battery-storage.ts"].forEach(f => {
  processFile(f, fixBatteryStorage) ? ok++ : fail++;
});

// ============================================================================
// 100A SUBPANEL (Austin + SA)
// Subpanel box: x=40 y=220 w=260 h=90 → h=96
// 8 breakers = 4 rows
// ============================================================================
function fix100aSubpanel(content) {
  content = content.replace(
    '<rect x="40" y="220" width="260" height="90"',
    '<rect x="40" y="220" width="260" height="96"'
  );
  
  const breakerBlockRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="29[0-9]")/;
  const oldHorizRegex = /  <rect x="62" y="268"[\s\S]*?<rect x="202" y="268"[^/]*\/>\n/;
  const newBreakers = twoColumnBreakers(170, 266, [G,G, B,B, S,S, G,B]) + "\n";
  
  if (breakerBlockRegex.test(content)) {
    content = content.replace(breakerBlockRegex, newBreakers);
  } else if (oldHorizRegex.test(content)) {
    content = content.replace(oldHorizRegex, newBreakers);
  }
  
  content = content.replace(
    '<text x="170" y="290" text-anchor="middle" fill="#64748b" font-size="8">Garage',
    '<text x="170" y="294" text-anchor="middle" fill="#64748b" font-size="8">Garage'
  );
  content = content.replace(
    '<text x="170" y="306" text-anchor="middle" fill="#475569" font-size="7">AFCI',
    '<text x="170" y="308" text-anchor="middle" fill="#475569" font-size="7">AFCI'
  );
  return content;
}

["diagrams/100a-subpanel.ts", "san-antonio/diagrams/100a-subpanel.ts"].forEach(f => {
  processFile(f, fix100aSubpanel) ? ok++ : fail++;
});

// ============================================================================
// NEW 400A SERVICE (Austin + SA) — Panel A + Panel B
// Panel A: x=14 y=196 w=140 h=76 → h=82
// Panel B: x=186 y=196 w=140 h=76 → h=82
// 6 breakers each = 3 rows
// ============================================================================
function fix400aService(content) {
  // Expand both panels
  content = content.replace(
    '<rect x="14" y="196" width="140" height="76"',
    '<rect x="14" y="196" width="140" height="82"'
  );
  content = content.replace(
    '<rect x="186" y="196" width="140" height="76"',
    '<rect x="186" y="196" width="140" height="82"'
  );
  
  // Panel A breakers
  const breakerARegex = /  <!-- Two-column breaker layout -->\n  <rect x="82"[\s\S]*?fill="#3b82f6" opacity="0.85"\/>\n(?=  <text x="84" y="266")/;
  const oldHorizARegex = /  <rect x="26" y="242"[\s\S]*?<rect x="116" y="242"[^/]*\/>\n/;
  const newBreakersA = twoColumnBreakers(84, 240, [S,G, B,G, S,B], { breakerWidth: 24 }) + "\n";
  
  if (breakerARegex.test(content)) {
    content = content.replace(breakerARegex, newBreakersA);
  } else if (oldHorizARegex.test(content)) {
    content = content.replace(oldHorizARegex, newBreakersA);
  }
  
  // Panel B breakers
  const breakerBRegex = /  <!-- Two-column breaker layout -->\n  <rect x="254"[\s\S]*?fill="#3b82f6" opacity="0.85"\/>\n(?=  <text x="256" y="266")/;
  const oldHorizBRegex = /  <rect x="198" y="242"[\s\S]*?<rect x="288" y="242"[^/]*\/>\n/;
  const newBreakersB = twoColumnBreakers(256, 240, [S,G, B,G, S,B], { breakerWidth: 24 }) + "\n";
  
  if (breakerBRegex.test(content)) {
    content = content.replace(breakerBRegex, newBreakersB);
  } else if (oldHorizBRegex.test(content)) {
    content = content.replace(oldHorizBRegex, newBreakersB);
  }
  
  // Shift text down
  content = content.replace(
    '<text x="84" y="266" text-anchor="middle" fill="#475569" font-size="8">Main house',
    '<text x="84" y="270" text-anchor="middle" fill="#475569" font-size="8">Main house'
  );
  content = content.replace(
    '<text x="256" y="266" text-anchor="middle" fill="#475569" font-size="8">Garage',
    '<text x="256" y="270" text-anchor="middle" fill="#475569" font-size="8">Garage'
  );
  return content;
}

["diagrams/new-400a-service.ts", "san-antonio/diagrams/new-400a-service.ts"].forEach(f => {
  processFile(f, fix400aService) ? ok++ : fail++;
});

// ============================================================================
// TEMP POWER POLE (Austin + SA)
// Load center: x=18 y=154 w=142 h=72 → h=78
// 6 breakers = 3 rows
// ============================================================================
function fixTempPole(content) {
  content = content.replace(
    '<rect x="18" y="154" width="142" height="72"',
    '<rect x="18" y="154" width="142" height="78"'
  );
  
  const breakerBlockRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="89" y="220")/;
  const oldHorizRegex = /  <rect x="26" y="200"[\s\S]*?<rect x="126" y="200"[^/]*\/>\n/;
  const newBreakers = twoColumnBreakers(89, 198, [B,B, B,B, S,S], { breakerWidth: 24 }) + "\n";
  
  if (breakerBlockRegex.test(content)) {
    content = content.replace(breakerBlockRegex, newBreakers);
  } else if (oldHorizRegex.test(content)) {
    content = content.replace(oldHorizRegex, newBreakers);
  }
  
  content = content.replace(
    '<text x="89" y="220" text-anchor="middle" fill="#64748b" font-size="7">All outlets',
    '<text x="89" y="224" text-anchor="middle" fill="#64748b" font-size="7">All outlets'
  );
  return content;
}

["diagrams/temp-power-pole.ts", "san-antonio/diagrams/temp-power-pole.ts"].forEach(f => {
  processFile(f, fixTempPole) ? ok++ : fail++;
});

// ============================================================================
// POOL ELECTRICAL (Austin only — SA doesn't have pool diagram)
// Pool panel: x=40 y=96 w=260 h=68 → h=72
// 3 breakers = 2 rows (1 left + 1 right, 1 left)
// ============================================================================
function fixPool(content) {
  content = content.replace(
    '<rect x="40" y="96" width="260" height="68"',
    '<rect x="40" y="96" width="260" height="72"'
  );
  
  // Replace the v1 custom pool breakers or the original
  const v1Regex = /  <!-- Two-column breaker layout -->\n  <rect x="78"[\s\S]*?<text x="47" y="148" fill="#64748b" font-size="5">RCPT<\/text>/;
  const origRegex = /  <rect x="56" y="142"[\s\S]*?<text x="98" y="158" fill="#64748b" font-size="6">RCPT<\/text>/;
  
  const newPool = [
    '  <!-- Two-column breaker layout -->',
    '  <rect x="78" y="141" width="3" height="14" rx="0.5" fill="#475569" opacity="0.6"/>',
    '  <rect x="56" y="142" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="83" y="142" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="56" y="148" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <text x="56" y="160" fill="#64748b" font-size="6">PUMP</text>',
    '  <text x="83" y="160" fill="#64748b" font-size="6">LIGHT</text>',
    '  <text x="56" y="168" fill="#64748b" font-size="6">RCPT</text>',
  ].join("\n");
  
  if (v1Regex.test(content)) {
    content = content.replace(v1Regex, newPool);
  } else if (origRegex.test(content)) {
    content = content.replace(origRegex, newPool);
  }
  return content;
}

processFile("diagrams/pool-electrical.ts", fixPool) ? ok++ : fail++;

// ============================================================================
// COMMERCIAL 3-PHASE (Austin + SA)
// MDP box: x=28 y=264 w=284 h=96 → h=102
// 8 breakers (3-pole) = 4 rows
// ============================================================================
function fixCommercial(content) {
  content = content.replace(
    '<rect x="28" y="264" width="284" height="96"',
    '<rect x="28" y="264" width="284" height="102"'
  );
  
  const breakerBlockRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="348")/;
  const oldHorizRegex = /  <rect x="50" y="326"[\s\S]*?<rect x="176" y="326"[^/]*\/>\n/;
  const newBreakers = twoColumnBreakers(170, 324, [S,S, S,Y, Y,S, S,Y]) + "\n";
  
  if (breakerBlockRegex.test(content)) {
    content = content.replace(breakerBlockRegex, newBreakers);
  } else if (oldHorizRegex.test(content)) {
    content = content.replace(oldHorizRegex, newBreakers);
  }
  
  content = content.replace(
    '<text x="170" y="348" text-anchor="middle" fill="#475569" font-size="7">Arc Flash',
    '<text x="170" y="352" text-anchor="middle" fill="#475569" font-size="7">Arc Flash'
  );
  return content;
}

["diagrams/commercial-3phase-200a.ts", "san-antonio/diagrams/commercial-3phase-200a.ts"].forEach(f => {
  processFile(f, fixCommercial) ? ok++ : fail++;
});

console.log(`\nDone: ${ok} OK, ${fail} failed`);
