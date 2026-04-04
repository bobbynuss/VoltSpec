/**
 * Expand panel boxes by 80-100px, enlarge breakers (34×7, 3px gap, 5px bus),
 * grow viewBox, and cascade-shift all downstream elements.
 *
 * Strategy:
 *   1. Expand viewBox + background by delta
 *   2. Y-shift every y/y1/y2/cy >= old_panel_bottom by +delta
 *   3. Expand the panel box height
 *   4. Replace breaker block + reposition text inside the panel
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const BASE = "C:\\Users\\bobnu\\projects\\voltspec\\lib\\data";

// ── Breaker generator ──────────────────────────────────────────────────────
const G = "#22c55e", B = "#3b82f6", S = "#334155", Y = "#f59e0b";

function mkBreakers(cx, startY, colors, bw = 34) {
  const bh = 7, rowGap = 3, busW = 5, colGap = 3;
  const rows = [];
  for (let i = 0; i < colors.length; i += 2)
    rows.push([colors[i], colors[i + 1] || null]);
  const totalH = rows.length * bh + (rows.length - 1) * rowGap;
  const lx = cx - busW / 2 - colGap - bw;
  const rx = cx + busW / 2 + colGap;
  let s = `  <!-- Two-column breaker layout -->\n`;
  s += `  <rect x="${cx - busW / 2}" y="${startY - 2}" width="${busW}" height="${totalH + 4}" rx="1" fill="#475569" opacity="0.6"/>\n`;
  for (let r = 0; r < rows.length; r++) {
    const y = startY + r * (bh + rowGap);
    const [L, R] = rows[r];
    if (L) { const o = L === S ? "" : ' opacity="0.85"'; s += `  <rect x="${lx}" y="${y}" width="${bw}" height="${bh}" rx="1.5" fill="${L}"${o}/>\n`; }
    if (R) { const o = R === S ? "" : ' opacity="0.85"'; s += `  <rect x="${rx}" y="${y}" width="${bw}" height="${bh}" rx="1.5" fill="${R}"${o}/>\n`; }
  }
  return s.trimEnd();
}

// ── Y-shift helper ─────────────────────────────────────────────────────────
function yShift(content, threshold, delta) {
  // Shift y, y1, y2, cy attributes whose numeric value >= threshold
  return content.replace(/\b(y[12]?|cy)="(\d+(?:\.\d+)?)"/g, (m, attr, val) => {
    const n = parseFloat(val);
    return n >= threshold ? `${attr}="${n + delta}"` : m;
  });
}

// ── Process a single file ──────────────────────────────────────────────────
function process(relPath, cfg) {
  const fp = join(BASE, relPath);
  let c;
  try { c = readFileSync(fp, "utf-8"); } catch { console.error(`SKIP ${relPath}`); return false; }

  const {
    delta,              // px to expand
    panelY,             // panel box y
    oldH,               // panel box old height
    newH,               // panel box new height  (= oldH + delta)
    panelHeightStr,     // unique substring to find the height attr, e.g. `height="96"`
    newPanelHeightStr,  // replacement, e.g. `height="176"`
    breakerRegex,       // regex to find old breaker block (including comment)
    breakerNew,         // new breaker SVG string
    textEdits,          // [{old,new}] for text repositioning inside the panel
  } = cfg;

  const threshold = panelY + oldH; // old bottom edge

  // 1. viewBox & background
  const oldVB = c.match(/viewBox="0 0 340 (\d+)"/);
  if (oldVB) {
    const vbH = parseInt(oldVB[1]);
    c = c.replace(`viewBox="0 0 340 ${vbH}"`, `viewBox="0 0 340 ${vbH + delta}"`);
    c = c.replace(`<rect width="340" height="${vbH}"`, `<rect width="340" height="${vbH + delta}"`);
  }

  // 2. Y-shift everything >= threshold
  c = yShift(c, threshold, delta);

  // 3. Expand panel box height
  if (panelHeightStr && newPanelHeightStr) {
    c = c.replace(panelHeightStr, newPanelHeightStr);
  }

  // 4. Replace breakers
  if (breakerRegex && breakerNew) {
    c = c.replace(breakerRegex, breakerNew);
  }

  // 5. Reposition text inside panel
  if (textEdits) {
    for (const { old: o, new: n } of textEdits) {
      c = c.replace(o, n);
    }
  }

  writeFileSync(fp, c, "utf-8");
  console.log(`OK: ${relPath}`);
  return true;
}

let ok = 0, fail = 0;
function run(files, cfg) {
  for (const f of files) process(f, cfg) ? ok++ : fail++;
}

// ============================================================================
// 200A UPGRADE — main panel y=284 h=108→188 (+80)
// ============================================================================
{
  const D = 80, panelY = 284, oldH = 108, newH = 188;
  const breakerRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="3[56]\d")/;
  const breakerNew = mkBreakers(170, 352, [S,G, G,B, B,S, S,G, B,S]);
  run(["diagrams/200a-upgrade.ts", "san-antonio/diagrams/200a-upgrade.ts"], {
    delta: D, panelY, oldH, newH,
    panelHeightStr: `height="108"`, newPanelHeightStr: `height="${newH}"`,
    breakerRegex, breakerNew,
    textEdits: [
      { old: `y="360" text-anchor="middle" fill="#64748b" font-size="8">Transfer`, new: `y="416" text-anchor="middle" fill="#64748b" font-size="8">Transfer` },
      { old: `y="372" text-anchor="middle" fill="#64748b" font-size="8">Verify`, new: `y="430" text-anchor="middle" fill="#64748b" font-size="8">Verify` },
      { old: `y="384" text-anchor="middle" fill="#475569" font-size="7">Install arc`, new: `y="444" text-anchor="middle" fill="#475569" font-size="7">Install arc` },
    ],
  });
}

// ============================================================================
// NEW 200A RESIDENTIAL — main panel y=306 h=96→176 (+80)
// ============================================================================
{
  const D = 80, panelY = 306, oldH = 96, newH = 176;
  const breakerRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="38\d")/;
  const breakerNew = mkBreakers(170, 362, [S,G, G,B, B,S, G,S, B,S]);
  run(["diagrams/new-200a-residential.ts", "san-antonio/diagrams/new-200a-residential.ts"], {
    delta: D, panelY, oldH, newH,
    panelHeightStr: `height="96"`, newPanelHeightStr: `height="${newH}"`,
    breakerRegex, breakerNew,
    textEdits: [
      { old: `y="380" text-anchor="middle" fill="#64748b" font-size="8">Garage`, new: `y="430" text-anchor="middle" fill="#64748b" font-size="8">Garage` },
      { old: `y="393" text-anchor="middle" fill="#475569" font-size="7">AFCI:`, new: `y="446" text-anchor="middle" fill="#475569" font-size="7">AFCI:` },
    ],
  });
}

// ============================================================================
// GENERATOR ATS — main panel y=152 h=90→170 (+80)
// ============================================================================
{
  const D = 80, panelY = 152, oldH = 90, newH = 170;
  const breakerRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="23\d")/;
  const breakerNew = mkBreakers(170, 210, [S,G, B,G, S,B, S,G, B,S]);
  run(["diagrams/generator-ats.ts", "san-antonio/diagrams/generator-ats.ts"], {
    delta: D, panelY, oldH, newH,
    panelHeightStr: `height="90"`, newPanelHeightStr: `height="${newH}"`,
    breakerRegex, breakerNew,
    textEdits: [
      { old: `y="232" text-anchor="middle" fill="#475569" font-size="8">All house loads`, new: `y="290" text-anchor="middle" fill="#475569" font-size="8">All house loads` },
    ],
  });
}

// ============================================================================
// BATTERY STORAGE — main panel y=148 h=86→166 (+80)
// ============================================================================
{
  const D = 80, panelY = 148, oldH = 86, newH = 166;
  const breakerRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="22\d")/;
  const breakerNew = mkBreakers(170, 206, [S,G, B,S, G,B, S,G, B,S]);
  run(["diagrams/battery-storage.ts", "san-antonio/diagrams/battery-storage.ts"], {
    delta: D, panelY, oldH, newH,
    panelHeightStr: `height="86"`, newPanelHeightStr: `height="${newH}"`,
    breakerRegex, breakerNew,
    textEdits: [
      { old: `y="226" text-anchor="middle" fill="#475569" font-size="7">All loads`, new: `y="284" text-anchor="middle" fill="#475569" font-size="7">All loads` },
    ],
  });
}

// ============================================================================
// 100A SUBPANEL — subpanel y=220 h=96→166 (+70)
// ============================================================================
{
  const D = 70, panelY = 220, oldH = 96, newH = 166;
  const breakerRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="29\d")/;
  const breakerNew = mkBreakers(170, 280, [G,G, B,B, S,S, G,B]);
  run(["diagrams/100a-subpanel.ts", "san-antonio/diagrams/100a-subpanel.ts"], {
    delta: D, panelY, oldH, newH,
    panelHeightStr: `height="96"`, newPanelHeightStr: `height="${newH}"`,
    breakerRegex, breakerNew,
    textEdits: [
      { old: `y="294" text-anchor="middle" fill="#64748b" font-size="8">Garage`, new: `y="340" text-anchor="middle" fill="#64748b" font-size="8">Garage` },
      { old: `y="308" text-anchor="middle" fill="#475569" font-size="7">AFCI`, new: `y="354" text-anchor="middle" fill="#475569" font-size="7">AFCI` },
    ],
  });
}

// ============================================================================
// NEW 400A SERVICE — Panel A (y=196 h=82→152 +70) & Panel B (same)
// Both share the same y, so one threshold works.
// ============================================================================
{
  const D = 70, panelY = 196, oldH = 82, newH = 152;
  // Panel A breakers
  const breakerARegex = /  <!-- Two-column breaker layout -->\n  <rect x="82[\s\S]*?fill="#3b82f6" opacity="0.85"\/>\n(?=  <text x="84" y="27\d")/;
  const breakerANew = mkBreakers(84, 250, [S,G, B,G, S,B], 24) + "\n";
  // Panel B breakers
  const breakerBRegex = /  <!-- Two-column breaker layout -->\n  <rect x="254[\s\S]*?fill="#3b82f6" opacity="0.85"\/>\n(?=  <text x="256" y="27\d")/;
  const breakerBNew = mkBreakers(256, 250, [S,G, B,G, S,B], 24) + "\n";

  for (const f of ["diagrams/new-400a-service.ts", "san-antonio/diagrams/new-400a-service.ts"]) {
    const fp = join(BASE, f);
    let c;
    try { c = readFileSync(fp, "utf-8"); } catch { console.error(`SKIP ${f}`); fail++; continue; }

    // viewBox + background
    const oldVB = c.match(/viewBox="0 0 340 (\d+)"/);
    if (oldVB) {
      const vbH = parseInt(oldVB[1]);
      c = c.replace(`viewBox="0 0 340 ${vbH}"`, `viewBox="0 0 340 ${vbH + D}"`);
      c = c.replace(`<rect width="340" height="${vbH}"`, `<rect width="340" height="${vbH + D}"`);
    }

    // Y-shift everything below old bottom of panels
    c = yShift(c, panelY + oldH, D);

    // Expand both panel boxes — they both have the old height
    c = c.replace(new RegExp(`height="${oldH}"`, "g"), `height="${newH}"`);

    // Replace breakers A and B
    if (breakerARegex.test(c)) c = c.replace(breakerARegex, breakerANew);
    if (breakerBRegex.test(c)) c = c.replace(breakerBRegex, breakerBNew);

    // Reposition text
    c = c.replace(`y="270" text-anchor="middle" fill="#475569" font-size="8">Main house`, `y="320" text-anchor="middle" fill="#475569" font-size="8">Main house`);
    c = c.replace(`y="270" text-anchor="middle" fill="#475569" font-size="8">Garage`, `y="320" text-anchor="middle" fill="#475569" font-size="8">Garage`);

    writeFileSync(fp, c, "utf-8");
    console.log(`OK: ${f}`);
    ok++;
  }
}

// ============================================================================
// TEMP POWER POLE — load center y=154 h=78→138 (+60)
// ============================================================================
{
  const D = 60, panelY = 154, oldH = 78, newH = 138;
  const breakerRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="89" y="22\d")/;
  const breakerNew = mkBreakers(89, 206, [B,B, B,B, S,S], 24);
  run(["diagrams/temp-power-pole.ts", "san-antonio/diagrams/temp-power-pole.ts"], {
    delta: D, panelY, oldH, newH,
    panelHeightStr: `height="${oldH}"`, newPanelHeightStr: `height="${newH}"`,
    breakerRegex, breakerNew,
    textEdits: [
      { old: `y="224" text-anchor="middle" fill="#64748b" font-size="7">All outlets`, new: `y="264" text-anchor="middle" fill="#64748b" font-size="7">All outlets` },
    ],
  });
}

// ============================================================================
// POOL ELECTRICAL — pool panel y=96 h=72→142 (+70)
// Austin only (SA has no pool diagram)
// ============================================================================
{
  const D = 70, panelY = 96, oldH = 72, newH = 142;
  const breakerRegex = /  <!-- Two-column breaker layout -->[\s\S]*?<text x="\d+" y="\d+" fill="#64748b" font-size="6">RCPT<\/text>/;
  const breakerNew = [
    '  <!-- Two-column breaker layout -->',
    '  <rect x="78" y="148" width="5" height="28" rx="1" fill="#475569" opacity="0.6"/>',
    '  <rect x="44" y="150" width="30" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="87" y="150" width="30" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="44" y="160" width="30" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>',
    '  <text x="48" y="182" fill="#64748b" font-size="7">PUMP</text>',
    '  <text x="90" y="182" fill="#64748b" font-size="7">LIGHT</text>',
    '  <text x="48" y="195" fill="#64748b" font-size="7">RCPT</text>',
  ].join("\n");

  run(["diagrams/pool-electrical.ts"], {
    delta: D, panelY, oldH, newH,
    panelHeightStr: `height="${oldH}"`, newPanelHeightStr: `height="${newH}"`,
    breakerRegex, breakerNew,
    textEdits: [],
  });
}

// ============================================================================
// COMMERCIAL 3-PHASE — MDP y=264 h=102→182 (+80)
// ============================================================================
{
  const D = 80, panelY = 264, oldH = 102, newH = 182;
  const breakerRegex = /  <!-- Two-column breaker layout -->[\s\S]*?(?=  <text x="170" y="35\d")/;
  const breakerNew = mkBreakers(170, 340, [S,S, S,Y, Y,S, S,Y]);
  run(["diagrams/commercial-3phase-200a.ts", "san-antonio/diagrams/commercial-3phase-200a.ts"], {
    delta: D, panelY, oldH, newH,
    panelHeightStr: `height="102"`, newPanelHeightStr: `height="${newH}"`,
    breakerRegex, breakerNew,
    textEdits: [
      { old: `y="352" text-anchor="middle" fill="#475569" font-size="7">Arc Flash`, new: `y="408" text-anchor="middle" fill="#475569" font-size="7">Arc Flash` },
    ],
  });
}

console.log(`\nDone: ${ok} OK, ${fail} failed`);
