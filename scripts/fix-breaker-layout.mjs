/**
 * Replace horizontal breaker square rows with realistic two-column vertical layout
 * inside panel boxes across all Austin and San Antonio diagram files.
 *
 * Rules:
 * - Two columns of breaker toggles (left + right) with a vertical bus bar in the middle
 * - Each toggle is 28×8 px, horizontal, with 2px gap between rows
 * - Bus bar is 4px wide, centered between columns
 * - Existing color coding preserved: #22c55e=AFCI, #3b82f6=GFCI, #334155=standard, #f59e0b=3-phase equip
 * - Panel box outline, labels, and dark theme unchanged
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const BASE = "C:\\Users\\bobnu\\projects\\voltspec\\lib\\data";

// Helper: generate two-column breaker SVG block
// cx = center x of panel box, startY = y where breakers start
// colors = array of color strings (left-to-right, top-to-bottom: L1,R1,L2,R2,...)
// colWidth = width of each breaker toggle
// options: { rowGap, colGap, busWidth }
function twoColumnBreakers(cx, startY, colors, opts = {}) {
  const bw = opts.breakerWidth || 28;  // breaker width
  const bh = opts.breakerHeight || 8;  // breaker height
  const rowGap = opts.rowGap || 2;     // vertical gap between rows
  const busW = opts.busWidth || 4;     // bus bar width
  const colGap = opts.colGap || 2;     // gap between breaker and bus

  // Pair colors into rows: [left, right]
  const rows = [];
  for (let i = 0; i < colors.length; i += 2) {
    rows.push([colors[i], colors[i + 1] || null]);
  }

  const totalH = rows.length * bh + (rows.length - 1) * rowGap;
  const leftX = cx - busW / 2 - colGap - bw;  // left column right edge at cx - busW/2 - colGap
  const rightX = cx + busW / 2 + colGap;       // right column left edge

  let svg = "";

  // Bus bar
  svg += `  <rect x="${cx - busW / 2}" y="${startY - 1}" width="${busW}" height="${totalH + 2}" rx="0.5" fill="#475569" opacity="0.6"/>\n`;

  // Breakers
  for (let r = 0; r < rows.length; r++) {
    const y = startY + r * (bh + rowGap);
    const [leftColor, rightColor] = rows[r];
    if (leftColor) {
      const opacity = leftColor === "#334155" ? "" : ' opacity="0.85"';
      svg += `  <rect x="${leftX}" y="${y}" width="${bw}" height="${bh}" rx="1" fill="${leftColor}"${opacity}/>\n`;
    }
    if (rightColor) {
      const opacity = rightColor === "#334155" ? "" : ' opacity="0.85"';
      svg += `  <rect x="${rightX}" y="${y}" width="${bw}" height="${bh}" rx="1" fill="${rightColor}"${opacity}/>\n`;
    }
  }

  return svg;
}

// Define breaker configs for each panel type
// Colors: G = #22c55e (AFCI), B = #3b82f6 (GFCI), S = #334155 (standard), Y = #f59e0b (3ph equip)
const C = {
  G: "#22c55e",
  B: "#3b82f6",
  S: "#334155",
  Y: "#f59e0b",
};

// ============================================================================
// FILE DEFINITIONS: Each entry describes which file, what to find, what to replace
// ============================================================================

const replacements = [];

// --- 200A UPGRADE (Austin) ---
// Panel box: x=28 y=284 w=284 h=100, center=170
// Old breakers at y=330, 10 squares, text below at y=354,368,380
// New: 5 rows x 2 cols starting at y=330
replacements.push({
  file: "diagrams/200a-upgrade.ts",
  old: [
    '  <rect x="46" y="330" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="66" y="330" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="86" y="330" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="106" y="330" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="126" y="330" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="146" y="330" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="166" y="330" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="186" y="330" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="206" y="330" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="226" y="330" width="16" height="8" rx="1" fill="#334155"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.G, C.B, C.B, C.S, C.S, C.G, C.B, C.S],
  cx: 170,
  startY: 328,
});

// --- 200A UPGRADE (San Antonio) ---
replacements.push({
  file: "san-antonio/diagrams/200a-upgrade.ts",
  old: [
    '  <rect x="46" y="330" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="66" y="330" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="86" y="330" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="106" y="330" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="126" y="330" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="146" y="330" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="166" y="330" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="186" y="330" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="206" y="330" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="226" y="330" width="16" height="8" rx="1" fill="#334155"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.G, C.B, C.B, C.S, C.S, C.G, C.B, C.S],
  cx: 170,
  startY: 328,
});

// --- NEW 200A RESIDENTIAL (Austin) ---
// Panel box: x=28 y=306 w=284 h=88, center=170
// Old breakers at y=352, 10 squares
replacements.push({
  file: "diagrams/new-200a-residential.ts",
  old: [
    '  <rect x="46" y="352" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="66" y="352" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="86" y="352" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="106" y="352" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="126" y="352" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="146" y="352" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="166" y="352" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="186" y="352" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="206" y="352" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="226" y="352" width="16" height="8" rx="1" fill="#334155"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.G, C.B, C.B, C.S, C.G, C.S, C.B, C.S],
  cx: 170,
  startY: 350,
});

// --- NEW 200A RESIDENTIAL (San Antonio) ---
replacements.push({
  file: "san-antonio/diagrams/new-200a-residential.ts",
  old: [
    '  <rect x="46" y="352" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="66" y="352" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="86" y="352" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="106" y="352" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="126" y="352" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="146" y="352" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="166" y="352" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="186" y="352" width="16" height="8" rx="1" fill="#334155"/>',
    '  <rect x="206" y="352" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="226" y="352" width="16" height="8" rx="1" fill="#334155"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.G, C.B, C.B, C.S, C.G, C.S, C.B, C.S],
  cx: 170,
  startY: 350,
});

// --- GENERATOR ATS (Austin) ---
// Panel box: x=50 y=152 w=240 h=82, center=170
// Old breakers at y=200, 10 squares (14x7 each)
replacements.push({
  file: "diagrams/generator-ats.ts",
  old: [
    '  <rect x="68" y="200" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="86" y="200" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="104" y="200" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="122" y="200" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="140" y="200" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="158" y="200" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="176" y="200" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="194" y="200" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="212" y="200" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="230" y="200" width="14" height="7" rx="1" fill="#334155"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.B, C.G, C.S, C.B, C.S, C.G, C.B, C.S],
  cx: 170,
  startY: 198,
});

// --- GENERATOR ATS (San Antonio) ---
replacements.push({
  file: "san-antonio/diagrams/generator-ats.ts",
  old: [
    '  <rect x="68" y="200" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="86" y="200" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="104" y="200" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="122" y="200" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="140" y="200" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="158" y="200" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="176" y="200" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="194" y="200" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="212" y="200" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="230" y="200" width="14" height="7" rx="1" fill="#334155"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.B, C.G, C.S, C.B, C.S, C.G, C.B, C.S],
  cx: 170,
  startY: 198,
});

// --- BATTERY STORAGE (Austin) ---
// Main panel: x=40 y=148 w=260 h=78, center=170
// Old breakers at y=196, 10 squares (14x7)
replacements.push({
  file: "diagrams/battery-storage.ts",
  old: [
    '  <rect x="60" y="196" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="78" y="196" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="96" y="196" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="114" y="196" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="132" y="196" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="150" y="196" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="168" y="196" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="186" y="196" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="204" y="196" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="222" y="196" width="14" height="7" rx="1" fill="#334155"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.B, C.S, C.G, C.B, C.S, C.G, C.B, C.S],
  cx: 170,
  startY: 194,
});

// --- BATTERY STORAGE (San Antonio) ---
replacements.push({
  file: "san-antonio/diagrams/battery-storage.ts",
  old: [
    '  <rect x="60" y="196" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="78" y="196" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="96" y="196" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="114" y="196" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="132" y="196" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="150" y="196" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="168" y="196" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="186" y="196" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="204" y="196" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="222" y="196" width="14" height="7" rx="1" fill="#334155"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.B, C.S, C.G, C.B, C.S, C.G, C.B, C.S],
  cx: 170,
  startY: 194,
});

// --- 100A SUBPANEL (Austin) ---
// Subpanel box: x=40 y=220 w=260 h=90, center=170
// Old breakers at y=268, 8 squares (16x7)
replacements.push({
  file: "diagrams/100a-subpanel.ts",
  old: [
    '  <rect x="62" y="268" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="82" y="268" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="102" y="268" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="122" y="268" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="142" y="268" width="16" height="7" rx="1" fill="#334155"/>',
    '  <rect x="162" y="268" width="16" height="7" rx="1" fill="#334155"/>',
    '  <rect x="182" y="268" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="202" y="268" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
  ].join("\n"),
  colors: [C.G, C.G, C.B, C.B, C.S, C.S, C.G, C.B],
  cx: 170,
  startY: 266,
});

// --- 100A SUBPANEL (San Antonio) ---
replacements.push({
  file: "san-antonio/diagrams/100a-subpanel.ts",
  old: [
    '  <rect x="62" y="268" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="82" y="268" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="102" y="268" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="122" y="268" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="142" y="268" width="16" height="7" rx="1" fill="#334155"/>',
    '  <rect x="162" y="268" width="16" height="7" rx="1" fill="#334155"/>',
    '  <rect x="182" y="268" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="202" y="268" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
  ].join("\n"),
  colors: [C.G, C.G, C.B, C.B, C.S, C.S, C.G, C.B],
  cx: 170,
  startY: 266,
});

// --- NEW 400A SERVICE (Austin) - Panel A ---
// Panel A box: x=14 y=196 w=140 h=76, center=84
// Old breakers at y=242, 6 squares (14x7)
replacements.push({
  file: "diagrams/new-400a-service.ts",
  old: [
    '  <rect x="26" y="242" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="44" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="62" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="80" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="98" y="242" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="116" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.B, C.G, C.S, C.B],
  cx: 84,
  startY: 240,
  breakerWidth: 24,
});

// --- NEW 400A SERVICE (Austin) - Panel B ---
// Panel B box: x=186 y=196 w=140 h=76, center=256
replacements.push({
  file: "diagrams/new-400a-service.ts",
  old: [
    '  <rect x="198" y="242" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="216" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="234" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="252" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="270" y="242" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="288" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.B, C.G, C.S, C.B],
  cx: 256,
  startY: 240,
  breakerWidth: 24,
});

// --- NEW 400A SERVICE (San Antonio) - Panel A ---
replacements.push({
  file: "san-antonio/diagrams/new-400a-service.ts",
  old: [
    '  <rect x="26" y="242" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="44" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="62" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="80" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="98" y="242" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="116" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.B, C.G, C.S, C.B],
  cx: 84,
  startY: 240,
  breakerWidth: 24,
});

// --- NEW 400A SERVICE (San Antonio) - Panel B ---
replacements.push({
  file: "san-antonio/diagrams/new-400a-service.ts",
  old: [
    '  <rect x="198" y="242" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="216" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="234" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="252" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>',
    '  <rect x="270" y="242" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="288" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
  ].join("\n"),
  colors: [C.S, C.G, C.B, C.G, C.S, C.B],
  cx: 256,
  startY: 240,
  breakerWidth: 24,
});

// --- TEMP POWER POLE (Austin) ---
// Load center box: x=18 y=154 w=142 h=72, center=89
// Old breakers at y=200, 6 squares (16x7)
replacements.push({
  file: "diagrams/temp-power-pole.ts",
  old: [
    '  <rect x="26" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="46" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="66" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="86" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="106" y="200" width="16" height="7" rx="1" fill="#334155"/>',
    '  <rect x="126" y="200" width="16" height="7" rx="1" fill="#334155"/>',
  ].join("\n"),
  colors: [C.B, C.B, C.B, C.B, C.S, C.S],
  cx: 89,
  startY: 198,
  breakerWidth: 24,
});

// --- TEMP POWER POLE (San Antonio) ---
replacements.push({
  file: "san-antonio/diagrams/temp-power-pole.ts",
  old: [
    '  <rect x="26" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="46" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="66" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="86" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="106" y="200" width="16" height="7" rx="1" fill="#334155"/>',
    '  <rect x="126" y="200" width="16" height="7" rx="1" fill="#334155"/>',
  ].join("\n"),
  colors: [C.B, C.B, C.B, C.B, C.S, C.S],
  cx: 89,
  startY: 198,
  breakerWidth: 24,
});

// --- POOL ELECTRICAL (Austin) ---
// Pool panel box: x=40 y=96 w=260 h=68, center=170
// Old breakers at y=142, 3 squares (16x7) with labels below
replacements.push({
  file: "diagrams/pool-electrical.ts",
  old: [
    '  <rect x="56" y="142" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="76" y="142" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="96" y="142" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <text x="56" y="158" fill="#64748b" font-size="6">PUMP</text>',
    '  <text x="78" y="158" fill="#64748b" font-size="6">LIGHT</text>',
    '  <text x="98" y="158" fill="#64748b" font-size="6">RCPT</text>',
  ].join("\n"),
  // Pool panel is small - use inline custom SVG instead of the generator
  customSvg: [
    '  <!-- Two-column breaker layout -->',
    '  <rect x="78" y="139" width="4" height="22" rx="0.5" fill="#475569" opacity="0.6"/>',
    '  <rect x="50" y="140" width="26" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="84" y="140" width="26" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="50" y="150" width="26" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <text x="47" y="158" fill="#64748b" font-size="5">PUMP</text>',
    '  <text x="85" y="158" fill="#64748b" font-size="5">LIGHT</text>',
    '  <text x="47" y="148" fill="#64748b" font-size="5">RCPT</text>',
  ].join("\n"),
});

// --- POOL ELECTRICAL (San Antonio) ---
// Read it first to check if same structure
replacements.push({
  file: "san-antonio/diagrams/pool-electrical.ts",
  old: [
    '  <rect x="56" y="142" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="76" y="142" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="96" y="142" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <text x="56" y="158" fill="#64748b" font-size="6">PUMP</text>',
    '  <text x="78" y="158" fill="#64748b" font-size="6">LIGHT</text>',
    '  <text x="98" y="158" fill="#64748b" font-size="6">RCPT</text>',
  ].join("\n"),
  customSvg: [
    '  <!-- Two-column breaker layout -->',
    '  <rect x="78" y="139" width="4" height="22" rx="0.5" fill="#475569" opacity="0.6"/>',
    '  <rect x="50" y="140" width="26" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="84" y="140" width="26" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <rect x="50" y="150" width="26" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>',
    '  <text x="47" y="158" fill="#64748b" font-size="5">PUMP</text>',
    '  <text x="85" y="158" fill="#64748b" font-size="5">LIGHT</text>',
    '  <text x="47" y="148" fill="#64748b" font-size="5">RCPT</text>',
  ].join("\n"),
});

// --- COMMERCIAL 3-PHASE (Austin) ---
// MDP box: x=28 y=264 w=284 h=96, center=170
// Old breakers at y=326, 8 squares (14x7) - uses #f59e0b for HVAC/equip
replacements.push({
  file: "diagrams/commercial-3phase-200a.ts",
  old: [
    '  <rect x="50" y="326" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="68" y="326" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="86" y="326" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="104" y="326" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>',
    '  <rect x="122" y="326" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>',
    '  <rect x="140" y="326" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="158" y="326" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="176" y="326" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>',
  ].join("\n"),
  colors: [C.S, C.S, C.S, C.Y, C.Y, C.S, C.S, C.Y],
  cx: 170,
  startY: 324,
});

// --- COMMERCIAL 3-PHASE (San Antonio) ---
replacements.push({
  file: "san-antonio/diagrams/commercial-3phase-200a.ts",
  old: [
    '  <rect x="50" y="326" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="68" y="326" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="86" y="326" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="104" y="326" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>',
    '  <rect x="122" y="326" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>',
    '  <rect x="140" y="326" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="158" y="326" width="14" height="7" rx="1" fill="#334155"/>',
    '  <rect x="176" y="326" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>',
  ].join("\n"),
  colors: [C.S, C.S, C.S, C.Y, C.Y, C.S, C.S, C.Y],
  cx: 170,
  startY: 324,
});

// ============================================================================
// EXECUTE REPLACEMENTS
// ============================================================================

let successCount = 0;
let failCount = 0;

for (const r of replacements) {
  const filePath = join(BASE, r.file);
  let content;
  try {
    content = readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error(`SKIP (file not found): ${r.file}`);
    failCount++;
    continue;
  }

  if (!content.includes(r.old)) {
    console.error(`SKIP (old text not found): ${r.file}`);
    failCount++;
    continue;
  }

  let newSvg;
  if (r.customSvg) {
    newSvg = r.customSvg;
  } else {
    newSvg = "  <!-- Two-column breaker layout -->\n" +
      twoColumnBreakers(r.cx, r.startY, r.colors, {
        breakerWidth: r.breakerWidth || 28,
      });
    // Remove trailing newline for clean replacement
    newSvg = newSvg.trimEnd();
  }

  content = content.replace(r.old, newSvg);
  writeFileSync(filePath, content, "utf-8");
  console.log(`OK: ${r.file}`);
  successCount++;
}

console.log(`\nDone: ${successCount} succeeded, ${failCount} failed`);
