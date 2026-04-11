import type { Job, MaterialItem } from "../../core/types";
import { diagram as spanUpgradeDiagram } from "../../data/diagrams/span-panel-upgrade";
import { diagram as spanSubpanelDiagram } from "../../data/diagrams/span-subpanel";

/**
 * Panel type identifiers
 */
export type PanelTypeId = "ch" | "br" | "prl" | "span" | "mbt";

export interface PanelTypeOption {
  id: PanelTypeId;
  label: string;
  shortLabel: string;
  description: string;
}

export const PANEL_TYPE_OPTIONS: PanelTypeOption[] = [
  { id: "ch", label: "Eaton CH Series", shortLabel: "Eaton CH", description: "Plug-on residential, Austin standard" },
  { id: "br", label: "Eaton BR Series", shortLabel: "Eaton BR", description: "Plug-on residential, SA/Houston standard" },
  { id: "prl", label: "Pow-R-Line (PRL) Bolt-On", shortLabel: "Pow-R-Line", description: "Commercial bolt-on panelboards" },
  { id: "span", label: "SPAN Smart Panel", shortLabel: "SPAN", description: "Wi-Fi enabled, per-circuit control" },
  { id: "mbt", label: "Eaton MBT Meter-Breaker Combo", shortLabel: "MBT Combo", description: "All-in-one 200A meter + main breaker panel" },
];

/**
 * Job IDs where panel type selection makes sense
 */
export const PANEL_ELIGIBLE_JOBS = new Set([
  "200a-upgrade",
  "new-200a-residential",
  "new-320a-service",
  "new-400a-service",
  "100a-subpanel",
  "detached-garage-subpanel",
]);

/** Jobs that are subpanel-type */
const SUBPANEL_JOBS = new Set(["100a-subpanel", "detached-garage-subpanel"]);

/**
 * Default panel type per jurisdiction
 */
const JURISDICTION_DEFAULTS: Record<string, PanelTypeId> = {
  austin: "ch",
  dallas: "ch",
  pec: "ch",
  gvec: "ch",
  bec: "ch",
  "san-antonio": "br",
  houston: "br",
  amarillo: "br",
  elpaso: "br",
  brownsville: "br",
  abilene: "ch",
  odessa: "br",
  // Oklahoma — BR series
  "oklahoma-city": "br",
  tulsa: "br",
  lawton: "br",
  // Arkansas — BR series
  "little-rock": "br",
  "fort-smith": "br",
  springdale: "br",
};

export function getDefaultPanelType(jurisdictionId: string): PanelTypeId {
  return JURISDICTION_DEFAULTS[jurisdictionId] ?? "ch";
}

// ── Detection patterns ─────────────────────────────────────────────

function isPanelItem(mat: MaterialItem): boolean {
  const combined = `${mat.item} ${mat.spec}`;
  return [
    /\b(CH|BR)\s*(main\s*breaker\s*panel|loadcenter|panel)/i,
    /\bCHP\d/i,
    /\bBRP\d/i,
    /\bMLO\s*(sub)?panel/i,
    /\bfeed-through\s*panel/i,
    /\bPRL[123]/i,
    /\bPow-R/i,
    /\bEZB\d/i,
    /\bEZT\d/i,
    /\bSPAN\b.*\b(panel|PNL)\b/i,
    /\bSmart\s*Panel\b/i,
    /\bSmart\s*Subpanel\b/i,
  ].some((p) => p.test(combined));
}

function isBreakerItem(mat: MaterialItem): boolean {
  const combined = `${mat.item} ${mat.spec}`;
  return [
    /\b(CHFP|CHF|BRP|BR|BRN)\d+/i,
    /\bQBH\d/i,
    /\bSPAN\s*BRK/i,
    /\bDual\s*Function\s*AFCI/i,
    /\bGFCI\s*Breaker/i,
    /\b\d+-Pole\s*\d+A\s*Breaker\b/i,
    /\b1-Pole\s*\d+A\s*Breaker\b/i,
    /\bAFCI\+GFCI\s*Breaker/i,
    /\bmain\s*breaker\s*kit\b/i,
    /\bBKD\d/i,
  ].some((p) => p.test(combined));
}

function isSurgeItem(mat: MaterialItem): boolean {
  return /\bsurge\b|\bSPD\b|\bSPT\b/i.test(`${mat.item} ${mat.spec}`);
}

function isCTItem(mat: MaterialItem): boolean {
  return /\bCT\s*sensor/i.test(`${mat.item} ${mat.spec}`);
}

function isEnclosureTrimItem(mat: MaterialItem): boolean {
  const combined = `${mat.item} ${mat.spec}`;
  // Don't treat meter sockets as enclosure items even if spec says "enclosure"
  if (/\bmeter\b/i.test(combined)) return false;
  return /\bEZB\d|\bEZT\d|\benclosure\b|\btrim\b.*\b(surface|flush)\b/i.test(combined);
}

function isGroundBusItem(mat: MaterialItem): boolean {
  return /\bCUGROUND\b|\bground\s*bus\b/i.test(`${mat.item} ${mat.spec}`);
}

function isMeterSocketItem(mat: MaterialItem): boolean {
  const combined = `${mat.item} ${mat.spec}`;
  return /\bmeter\s*(socket|base)\b/i.test(combined) && !(/\bseal\s*kit\b/i.test(combined));
}

function isFeedThroughPanel(mat: MaterialItem): boolean {
  return /\bfeed-through\b|\bfeed\s*through\b/i.test(`${mat.item} ${mat.spec}`);
}

// ── Extract breaker info ───────────────────────────────────────────

interface BreakerInfo {
  poles: number;
  amps: number;
  isAFCI: boolean;
  isGFCI: boolean;
  isDualFunction: boolean;
  quantity: string;
}

function parseBreakerInfo(mat: MaterialItem): BreakerInfo {
  const combined = `${mat.item} ${mat.spec}`;
  const ampMatch = combined.match(/(\d+)\s*A/);
  const amps = ampMatch ? parseInt(ampMatch[1]) : 20;
  const poles = /2-pole|2P|\/2-pole|3-pole|3P/i.test(combined)
    ? (/3-pole|3P/i.test(combined) ? 3 : 2)
    : 1;
  const isDualFunction = /dual\s*function|AFCI.*GFCI|DF\b/i.test(combined);
  const isAFCI = isDualFunction || /AFCI/i.test(combined);
  const isGFCI = isDualFunction || /GFCI/i.test(combined);

  return { poles, amps, isAFCI, isGFCI, isDualFunction, quantity: mat.quantity };
}

// ── CH series materials ────────────────────────────────────────────

function chPanel(jobId: string): MaterialItem {
  if (SUBPANEL_JOBS.has(jobId)) {
    return { item: "100A CH MLO Subpanel", quantity: "1", spec: "Eaton CHP24L125X2 - 100/125A 24-space CH MLO indoor subpanel, plug-on neutral, isolated neutral bar included", unitPrice: 28 };
  }
  return { item: "200A CH Main Breaker Panel", quantity: "1", spec: "Eaton CHP42B200R - 42-space 200A CH plug-on neutral main breaker panel, indoor/outdoor", unitPrice: 351.8 };
}

function chBreaker(info: BreakerInfo): MaterialItem {
  if (info.isDualFunction) {
    return { item: `Dual Function AFCI+GFCI Breaker ${info.amps}A`, quantity: info.quantity, spec: `Eaton CHFP1${info.amps}DF - 1-pole ${info.amps}A CH plug-on dual function AFCI+GFCI breaker`, unitPrice: 77.17 };
  }
  if (info.isGFCI) {
    if (info.poles === 2) {
      return { item: `GFCI Breaker ${info.amps}A 2-Pole`, quantity: info.quantity, spec: `Eaton CHF2${info.amps}GF - CH 2-pole ${info.amps}A GFCI breaker 120/240V`, unitPrice: 165 };
    }
    return { item: `GFCI Breaker ${info.amps}A`, quantity: info.quantity, spec: `Eaton CHFP1${info.amps}GF - 1-pole ${info.amps}A CH plug-on GFCI breaker`, unitPrice: 85.19 };
  }
  if (info.poles === 2) {
    return { item: `2-Pole ${info.amps}A Breaker`, quantity: info.quantity, spec: `Eaton CHF2${info.amps} - CH 2-pole ${info.amps}A breaker`, unitPrice: info.amps >= 50 ? 23.73 : 18.5 };
  }
  return { item: `1-Pole ${info.amps}A Breaker`, quantity: info.quantity, spec: `Eaton CHF1${info.amps} - CH 1-pole ${info.amps}A breaker`, unitPrice: 9.0 };
}

function chSurge(): MaterialItem {
  return { item: "Surge Protective Device", quantity: "1", spec: "Eaton CHSPT2ULTRA - CH Type 2 SPD whole-panel surge protector per NEC 242", unitPrice: 75 };
}

// ── BR series materials ────────────────────────────────────────────

function brPanel(jobId: string): MaterialItem {
  if (SUBPANEL_JOBS.has(jobId)) {
    return { item: "125A BR MLO Subpanel", quantity: "1", spec: "Eaton BRP24L125G - BR PON loadcenter 125A MLO 24 space with ground bar, plug-on neutral", unitPrice: 109.79 };
  }
  return { item: "200A BR Main Breaker Panel", quantity: "1", spec: "Eaton BRP20B200R - BR PON loadcenter 200A main breaker 20 space NEMA 3R, plug-on neutral", unitPrice: 343.97 };
}

function brBreaker(info: BreakerInfo): MaterialItem {
  if (info.isDualFunction) {
    return { item: `Dual Function AFCI+GFCI Breaker ${info.amps}A`, quantity: info.quantity, spec: `Eaton BRP1${info.amps}DF - BR dual function AF/GF 1-pole ${info.amps}A plug-on neutral breaker`, unitPrice: 75.6 };
  }
  if (info.isGFCI) {
    if (info.poles === 2) {
      return { item: `GFCI Breaker ${info.amps}A 2-Pole`, quantity: info.quantity, spec: `Eaton BRN2${info.amps}GF - BR 2-pole ${info.amps}A GFCI 120/240V 10kAIC`, unitPrice: 244.49 };
    }
    return { item: `GFCI Breaker ${info.amps}A`, quantity: info.quantity, spec: `Eaton BRP1${info.amps}GF - BR 1-pole ${info.amps}A plug-on GFCI breaker`, unitPrice: 85 };
  }
  if (info.poles === 2) {
    return { item: `2-Pole ${info.amps}A Breaker`, quantity: info.quantity, spec: `Eaton BR2${info.amps} - Type BR breaker ${info.amps}A/2-pole 120/240V 10K`, unitPrice: info.amps >= 50 ? 26.4 : 21.67 };
  }
  return { item: `1-Pole ${info.amps}A Breaker`, quantity: info.quantity, spec: `Eaton BR1${info.amps} - Type BR breaker ${info.amps}A/1-pole 120/240V 10K`, unitPrice: 9.43 };
}

function brSurge(): MaterialItem {
  return { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, whole-panel SPD per NEC 242", unitPrice: 136.51 };
}

// ── PRL (Pow-R-Line) materials ─────────────────────────────────────

function prlPanel(jobId: string): MaterialItem[] {
  if (SUBPANEL_JOBS.has(jobId)) {
    return [
      { item: "PRL1X Interior (125A Cu, 24-ckt)", quantity: "1", spec: "Eaton PRL1X3125X24C - Pow-R-Xpress interior, 120/240V 1P 3W, 125A copper bus, 24 circuit", unitPrice: 350 },
      { item: "EZB Enclosure (20×32 NEMA 1)", quantity: "1", spec: "Eaton EZB2032RBS - EZ Box stocking enclosure, 20 in. wide × 32 in. high, NEMA 1 indoor", unitPrice: 15 },
      { item: "EZT Surface Trim (20×32)", quantity: "1", spec: "Eaton EZT2032S - EZ Trim surface mount, for 20×32 box", unitPrice: 120 },
    ];
  }
  return [
    { item: "PRL1X Interior (225A Cu, 42-ckt)", quantity: "1", spec: "Eaton PRL1X3225X42C - Pow-R-Xpress interior, 208Y/120V 3P 4W, 225A copper bus, 42 circuit, with TFL provisions", unitPrice: 416.46 },
    { item: "EZB Enclosure (20×60 NEMA 1)", quantity: "1", spec: "Eaton EZB2060RBS - EZ Box stocking enclosure, 20 in. wide × 60 in. high, NEMA 1 indoor, accepts PRL1X interior", unitPrice: 17.58 },
    { item: "EZT Surface Trim (20×60)", quantity: "1", spec: "Eaton EZT2060S - EZ Trim surface mount, unvented, for 20×60 box, WEM2 keylock, matches EZB2060RBS", unitPrice: 139.79 },
    { item: "225A Main Breaker Kit (65 kAIC)", quantity: "1", spec: "Eaton BKD2G225 - Pow-R-Xpress MCB kit, PDD23G 225A 240V 65 kAIC convertible, 3-pole", unitPrice: 686.27 },
    { item: "Copper Ground Bus Assembly", quantity: "1", spec: "Eaton CUGROUND - PRL1A/2A 42-48 circuit copper ground bus assembly", unitPrice: 73 },
  ];
}

function prlBreaker(info: BreakerInfo): MaterialItem {
  // PRL uses QBH bolt-on breakers
  const poles = Math.max(info.poles, 1);
  const prefix = poles === 3 ? "QBH3" : poles === 2 ? "QBH2" : "QBH1";
  const price = poles === 3 ? 72 : poles === 2 ? 56 : 38;
  let label = `${poles}-Pole ${info.amps}A Branch Breaker (QBH)`;
  let spec = `Eaton ${prefix}${info.amps} - QBH ${poles}-pole ${info.amps}A 240V 22 kAIC bolt-on breaker for PRL1X panelboard`;

  if (info.isDualFunction || info.isAFCI) {
    label += " w/ AFCI";
    spec += ", AFCI function";
  } else if (info.isGFCI) {
    label += " w/ GFCI";
    spec += ", GFCI function";
  }

  return { item: label, quantity: info.quantity, spec, unitPrice: price };
}

// ── SPAN materials ─────────────────────────────────────────────────

function spanPanel(jobId: string): MaterialItem[] {
  const items: MaterialItem[] = [];
  if (SUBPANEL_JOBS.has(jobId)) {
    items.push({ item: "SPAN Smart Subpanel 100A", quantity: "1", spec: "SPAN PNL-100-32-MLO - 100A 32-space SPAN Smart Panel, MLO configuration for subpanel use, Wi-Fi enabled, per-circuit monitoring and control, UL 67 listed", unitPrice: 4200 });
    items.push({ item: "SPAN CT Sensor Kit", quantity: "1", spec: "SPAN CT-100-KIT - Split-core CT sensor clamps for feeder monitoring, includes mounting hardware", unitPrice: 130 });
  } else {
    items.push({ item: "SPAN Smart Panel 200A", quantity: "1", spec: "SPAN PNL-200-32 - 200A 32-space SPAN Smart Panel, Wi-Fi enabled, per-circuit monitoring and control, UL 67 listed", unitPrice: 4500 });
    items.push({ item: "SPAN CT Sensor Kit", quantity: "1", spec: "SPAN CT-200-KIT - Split-core CT sensor clamps for 200A service, includes mounting hardware", unitPrice: 150 });
  }
  return items;
}

function spanBreaker(info: BreakerInfo): MaterialItem {
  if (info.isDualFunction) {
    return { item: `SPAN ${info.amps}A AFCI+GFCI Breaker`, quantity: info.quantity, spec: `SPAN BRK-1${info.amps}-DF - SPAN-compatible 1-pole ${info.amps}A dual function AFCI+GFCI breaker`, unitPrice: 85 };
  }
  if (info.isGFCI) {
    const poles = info.poles === 2 ? "2" : "1";
    return { item: `SPAN ${info.amps}A ${info.poles === 2 ? "2-Pole " : ""}GFCI Breaker`, quantity: info.quantity, spec: `SPAN BRK-${poles}${info.amps}-GF - SPAN-compatible ${poles}-pole ${info.amps}A GFCI breaker`, unitPrice: info.poles === 2 ? 120 : 90 };
  }
  if (info.poles === 2) {
    return { item: `SPAN 2-Pole ${info.amps}A Breaker`, quantity: info.quantity, spec: `SPAN BRK-2${info.amps} - SPAN-compatible 2-pole ${info.amps}A breaker`, unitPrice: info.amps >= 50 ? 55 : 45 };
  }
  return { item: `SPAN 1-Pole ${info.amps}A Breaker`, quantity: info.quantity, spec: `SPAN BRK-1${info.amps} - SPAN-compatible 1-pole ${info.amps}A breaker`, unitPrice: 35 };
}

// ── MBT (Meter-Breaker Combo) materials ────────────────────────────

function mbtComboUnit(): MaterialItem {
  return {
    item: "200A Meter-Breaker Combo Panel",
    quantity: "1",
    spec: "Eaton MBT48B200BTS - 200A all-in-one meter socket + main breaker + 48-space loadcenter, BR series plug-on neutral, outdoor rated, eliminates separate meter socket and feed-through panel",
    unitPrice: 850,
  };
}

// ── Main override function ─────────────────────────────────────────

export function applyPanelOverride(job: Job, targetType: PanelTypeId): Job {
  if (!PANEL_ELIGIBLE_JOBS.has(job.id)) return job;

  const newMaterials: MaterialItem[] = [];
  let panelReplaced = false;
  let surgeReplaced = false;

  for (const mat of job.materials) {
    // Skip CT sensor items (SPAN-specific, will be added if needed)
    if (isCTItem(mat)) continue;

    // Skip enclosure/trim items (PRL-specific, will be added if needed)
    if (isEnclosureTrimItem(mat)) continue;

    // Skip ground bus items (PRL-specific)
    if (isGroundBusItem(mat)) continue;

    // MBT combo replaces meter socket + panel + feed-through with single unit
    if (targetType === "mbt") {
      if (isMeterSocketItem(mat)) continue; // absorbed into combo
      if (isFeedThroughPanel(mat)) continue; // absorbed into combo
    }

    // Replace panel
    if (isPanelItem(mat) && !panelReplaced) {
      switch (targetType) {
        case "ch":
          newMaterials.push(chPanel(job.id));
          break;
        case "br":
          newMaterials.push(brPanel(job.id));
          break;
        case "prl":
          newMaterials.push(...prlPanel(job.id));
          break;
        case "span":
          newMaterials.push(...spanPanel(job.id));
          break;
        case "mbt":
          newMaterials.push(mbtComboUnit());
          break;
      }
      panelReplaced = true;
      continue;
    }

    // Skip additional panel items
    if (isPanelItem(mat)) continue;

    // Replace surge
    if (isSurgeItem(mat) && !surgeReplaced) {
      switch (targetType) {
        case "ch":
          newMaterials.push(chSurge());
          break;
        case "br":
          newMaterials.push(brSurge());
          break;
        case "prl":
          newMaterials.push({ item: "Panel Surge Protector", quantity: "1", spec: "Eaton PRLSPD - Pow-R-Line compatible Type 2 SPD per NEC 242", unitPrice: 150 });
          break;
        case "span":
          newMaterials.push({ item: "Surge Protective Device", quantity: "1", spec: "Whole-panel SPD per NEC 242 - install upstream of SPAN panel", unitPrice: 85 });
          break;
        case "mbt":
          newMaterials.push(brSurge()); // MBT uses BR breakers
          break;
      }
      surgeReplaced = true;
      continue;
    }

    // Replace breakers
    if (isBreakerItem(mat)) {
      const info = parseBreakerInfo(mat);
      switch (targetType) {
        case "ch":
          newMaterials.push(chBreaker(info));
          break;
        case "br":
          newMaterials.push(brBreaker(info));
          break;
        case "prl":
          newMaterials.push(prlBreaker(info));
          break;
        case "span":
          newMaterials.push(spanBreaker(info));
          break;
        case "mbt":
          newMaterials.push(brBreaker(info)); // MBT uses BR breakers
          break;
      }
      continue;
    }

    // Keep non-panel materials as-is
    newMaterials.push(mat);
  }

  // If no panel was found, prepend one
  if (!panelReplaced) {
    switch (targetType) {
      case "ch": newMaterials.unshift(chPanel(job.id)); break;
      case "br": newMaterials.unshift(brPanel(job.id)); break;
      case "prl": newMaterials.unshift(...prlPanel(job.id)); break;
      case "span": newMaterials.unshift(...spanPanel(job.id)); break;
      case "mbt": newMaterials.unshift(mbtComboUnit()); break;
    }
  }

  // Build updated job
  let label = job.label;
  let svgDiagram = job.svgDiagram;
  const requirements = [...job.requirements];
  const blueprintNotes = [...(job.blueprintNotes ?? [])];
  const officialDocs = [...job.officialDocs];

  // Add SPAN-specific extras
  if (targetType === "span") {
    const spanReqs = [
      "SPAN Panel requires dedicated 2.4 GHz Wi-Fi network within range of panel location",
      "SPAN installation must follow SPAN Installation Guide and UL 67 listing requirements",
      "CT sensor clamps required on service entrance conductors for whole-home monitoring",
      "SPAN app setup and circuit labeling required after installation",
      "SPAN panel is UL 67 listed - verify AHJ acceptance before ordering",
    ];
    for (const r of spanReqs) {
      if (!requirements.includes(r)) requirements.push(r);
    }

    const spanNotes = [
      "Verify 2.4 GHz Wi-Fi signal strength at panel location before installation",
      "Install CT sensor clamps on service entrance conductors before closing panel",
      "Configure SPAN app and label all circuits after energization",
    ];
    for (const n of spanNotes) {
      if (!blueprintNotes.includes(n)) blueprintNotes.push(n);
    }

    svgDiagram = SUBPANEL_JOBS.has(job.id) ? spanSubpanelDiagram : spanUpgradeDiagram;

    const spanDocs = [
      { title: "SPAN Panel Installation Guide", url: "https://support.span.io/hc/en-us/categories/360002287393-Installation", description: "Official SPAN installation documentation, wiring diagrams, and commissioning procedures" },
      { title: "SPAN Panel Specifications", url: "https://www.span.io/panel", description: "SPAN Smart Panel product specifications, features, and compatibility information" },
    ];
    const existingUrls = new Set(officialDocs.map((d) => d.url));
    for (const d of spanDocs) {
      if (!existingUrls.has(d.url)) officialDocs.push(d);
    }
  }

  // Add MBT-specific notes
  if (targetType === "mbt") {
    const mbtReqs = [
      "MBT48B200BTS is an all-in-one meter socket + main breaker + loadcenter — eliminates separate meter base and feed-through panel",
      "Verify utility approval for meter-breaker combo unit before ordering — not all utilities accept combo units",
      "48-space BR plug-on neutral panel built in — uses standard Type BR breakers",
    ];
    for (const r of mbtReqs) {
      if (!requirements.includes(r)) requirements.push(r);
    }

    const mbtNotes = [
      "MBT48B200BTS combo unit: mount at meter location — single enclosure replaces meter socket + panel",
      "No separate feed-through panel or meter-to-panel SE cable needed — all internal to combo unit",
      "Uses Type BR plug-on breakers — 48 spaces available for branch circuits",
    ];
    for (const n of mbtNotes) {
      if (!blueprintNotes.includes(n)) blueprintNotes.push(n);
    }
  }

  // Add PRL-specific notes
  if (targetType === "prl") {
    const prlNote = "Branch breakers: QBH series bolt-on for PRL1X interiors — do NOT use CH or BR plug-on breakers";
    if (!blueprintNotes.includes(prlNote)) blueprintNotes.push(prlNote);
  }

  // ── CH ↔ BR text patching in blueprint notes and SVG ──────────
  // When switching to CH from BR (or vice versa), update part number
  // references in blueprint notes and SVG diagrams so they match the
  // materials tab.
  if (targetType === "ch") {
    const chReplace = (s: string) =>
      s
        .replace(/BRP20B200R/g, "CHP32B200R")
        .replace(/BRP24L125G/g, "CHP20L125X2")
        .replace(/BRNSURGE10/g, "CHNSURGE")
        .replace(/\bBR series\b/g, "CH series")
        .replace(/\bBR PON\b/g, "CH PON")
        .replace(/\bType BR\b/g, "Type CH");
    for (let i = 0; i < blueprintNotes.length; i++) {
      blueprintNotes[i] = chReplace(blueprintNotes[i]);
    }
    for (let i = 0; i < requirements.length; i++) {
      requirements[i] = chReplace(requirements[i]);
    }
    if (svgDiagram) svgDiagram = chReplace(svgDiagram);
  } else if (targetType === "br" || targetType === "mbt") {
    const brReplace = (s: string) =>
      s
        .replace(/CHP32B200R|CHP42B200R|CHP42B200X7/g, "BRP20B200R")
        .replace(/CHP20L125X2|CHP24L125X2/g, "BRP24L125G")
        .replace(/CHNSURGE|CHSPT2ULTRA/g, "BRNSURGE10")
        .replace(/\bCH series\b/g, "BR series")
        .replace(/\bCH PON\b/g, "BR PON")
        .replace(/\bType CH\b/g, "Type BR");
    for (let i = 0; i < blueprintNotes.length; i++) {
      blueprintNotes[i] = brReplace(blueprintNotes[i]);
    }
    for (let i = 0; i < requirements.length; i++) {
      requirements[i] = brReplace(requirements[i]);
    }
    if (svgDiagram) svgDiagram = brReplace(svgDiagram);
  }

  return {
    ...job,
    label,
    materials: newMaterials,
    requirements,
    blueprintNotes,
    svgDiagram,
    officialDocs,
  };
}
