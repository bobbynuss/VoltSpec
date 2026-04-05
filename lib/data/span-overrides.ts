import type { Job, MaterialItem } from "./types";
import { diagram as spanUpgradeDiagram } from "./diagrams/span-panel-upgrade";
import { diagram as spanSubpanelDiagram } from "./diagrams/span-subpanel";

/**
 * Job IDs where SPAN panel option makes sense (panel install/replacement jobs)
 */
export const SPAN_ELIGIBLE_JOBS = new Set([
  "200a-upgrade",
  "new-200a-residential",
  "new-320a-service",
  "new-400a-service",
  "100a-subpanel",
  "detached-garage-subpanel",
]);

/** Jobs that are subpanel-type (use MLO SPAN config + subpanel diagram) */
const SUBPANEL_JOBS = new Set(["100a-subpanel", "detached-garage-subpanel"]);

/** Jobs at 320A+ service level */
const HIGH_AMP_JOBS = new Set(["new-320a-service", "new-400a-service"]);

// ── Panel material patterns to detect and replace ──────────────────
const PANEL_PATTERNS = [
  /\b(CH|BR)\s*(main\s*breaker\s*panel|loadcenter|panel)/i,
  /\bCHP\d/i,
  /\bBRP\d/i,
  /\bMLO\s*(sub)?panel/i,
  /\bfeed-through\s*panel/i,
  /\bCHP\d+[A-Z]*\d*[A-Z]*/i,
  /\bBRP\d+[A-Z]*\d*[A-Z]*/i,
];

const BREAKER_PATTERNS = [
  /\b(CHFP|CHF|BRP|BR)\d+/i,
  /\bDual\s*Function\s*AFCI/i,
  /\bGFCI\s*Breaker/i,
  /\b\d+-Pole\s*\d+A\s*Breaker\b/i,
  /\b1-Pole\s*\d+A\s*Breaker\b/i,
];

function isPanelItem(mat: MaterialItem): boolean {
  return PANEL_PATTERNS.some((p) => p.test(mat.item) || p.test(mat.spec));
}

function isBreakerItem(mat: MaterialItem): boolean {
  return BREAKER_PATTERNS.some((p) => p.test(mat.item) || p.test(mat.spec));
}

// ── SPAN replacement materials ─────────────────────────────────────

function getSpanPanel(jobId: string): MaterialItem {
  if (SUBPANEL_JOBS.has(jobId)) {
    return {
      item: "SPAN Smart Subpanel 100A",
      quantity: "1",
      spec: "SPAN PNL-100-32-MLO - 100A 32-space SPAN Smart Panel, MLO configuration for subpanel use, Wi-Fi enabled, per-circuit monitoring and control, UL 67 listed",
      unitPrice: 4200,
    };
  }
  if (HIGH_AMP_JOBS.has(jobId)) {
    return {
      item: "SPAN Smart Panel 200A",
      quantity: "1",
      spec: "SPAN PNL-200-32 - 200A 32-space SPAN Smart Panel, Wi-Fi enabled, per-circuit monitoring and control, UL 67 listed (Note: SPAN max 200A — requires load management for 320/400A services)",
      unitPrice: 4500,
    };
  }
  return {
    item: "SPAN Smart Panel 200A",
    quantity: "1",
    spec: "SPAN PNL-200-32 - 200A 32-space SPAN Smart Panel, Wi-Fi enabled, per-circuit monitoring and control, UL 67 listed",
    unitPrice: 4500,
  };
}

function getSpanCTKit(jobId: string): MaterialItem {
  if (SUBPANEL_JOBS.has(jobId)) {
    return {
      item: "SPAN CT Sensor Kit",
      quantity: "1",
      spec: "SPAN CT-100-KIT - Split-core CT sensor clamps for feeder monitoring, includes mounting hardware",
      unitPrice: 130,
    };
  }
  return {
    item: "SPAN CT Sensor Kit",
    quantity: "1",
    spec: "SPAN CT-200-KIT - Split-core CT sensor clamps for service entrance monitoring, includes mounting hardware",
    unitPrice: 150,
  };
}

function spanBreaker(mat: MaterialItem): MaterialItem {
  const spec = mat.spec.toLowerCase();
  const item = mat.item.toLowerCase();

  // Dual function AFCI+GFCI
  if (/afci.*gfci|dual.*function/i.test(item) || /afci.*gfci|dual.*function/i.test(spec)) {
    const ampMatch = mat.item.match(/(\d+)A/) || mat.spec.match(/(\d+)A/);
    const amps = ampMatch ? ampMatch[1] : "20";
    return {
      item: `SPAN ${amps}A AFCI+GFCI Breaker`,
      quantity: mat.quantity,
      spec: `SPAN BRK-1${amps}-DF - SPAN-compatible 1-pole ${amps}A dual function AFCI+GFCI breaker`,
      unitPrice: 85,
    };
  }

  // GFCI only
  if (/gfci/i.test(item) || /gfci/i.test(spec)) {
    const ampMatch = mat.item.match(/(\d+)A/) || mat.spec.match(/(\d+)A/);
    const amps = ampMatch ? ampMatch[1] : "20";
    const poles = /2-pole|2P/i.test(item) ? "2" : "1";
    return {
      item: `SPAN ${amps}A ${poles === "2" ? "2-Pole " : ""}GFCI Breaker`,
      quantity: mat.quantity,
      spec: `SPAN BRK-${poles}${amps}-GF - SPAN-compatible ${poles}-pole ${amps}A GFCI breaker`,
      unitPrice: poles === "2" ? 120 : 90,
    };
  }

  // Standard breakers (2-pole)
  if (/2-pole|2P/i.test(item) || /2-pole|2P|\/2-pole/i.test(spec)) {
    const ampMatch = mat.item.match(/(\d+)A/) || mat.spec.match(/(\d+)A/);
    const amps = ampMatch ? ampMatch[1] : "30";
    return {
      item: `SPAN 2-Pole ${amps}A Breaker`,
      quantity: mat.quantity,
      spec: `SPAN BRK-2${amps} - SPAN-compatible 2-pole ${amps}A breaker`,
      unitPrice: parseInt(amps) >= 50 ? 55 : 45,
    };
  }

  // Standard 1-pole
  const ampMatch = mat.item.match(/(\d+)A/) || mat.spec.match(/(\d+)A/);
  const amps = ampMatch ? ampMatch[1] : "20";
  return {
    item: `SPAN 1-Pole ${amps}A Breaker`,
    quantity: mat.quantity,
    spec: `SPAN BRK-1${amps} - SPAN-compatible 1-pole ${amps}A breaker`,
    unitPrice: 35,
  };
}

// ── Main override function ─────────────────────────────────────────

export function applySpanOverride(job: Job): Job {
  if (!SPAN_ELIGIBLE_JOBS.has(job.id)) return job;

  let panelReplaced = false;
  const newMaterials: MaterialItem[] = [];

  for (const mat of job.materials) {
    if (isPanelItem(mat) && !panelReplaced) {
      // Replace first panel item with SPAN panel
      newMaterials.push(getSpanPanel(job.id));
      newMaterials.push(getSpanCTKit(job.id));
      panelReplaced = true;
      continue;
    }
    if (isPanelItem(mat)) {
      // Skip additional panel items (feed-through, MLO, etc.)
      continue;
    }
    if (isBreakerItem(mat)) {
      newMaterials.push(spanBreaker(mat));
      continue;
    }
    // Keep non-panel materials as-is
    newMaterials.push(mat);
  }

  // If no panel was found to replace, prepend SPAN panel
  if (!panelReplaced) {
    newMaterials.unshift(getSpanPanel(job.id));
    newMaterials.unshift(getSpanCTKit(job.id));
  }

  // Add SPAN-specific requirements
  const spanRequirements = [
    "SPAN Panel requires dedicated 2.4 GHz Wi-Fi network within range of panel location",
    "SPAN installation must follow SPAN Installation Guide and UL 67 listing requirements",
    "CT sensor clamps required on service entrance conductors for whole-home monitoring",
    "SPAN app setup and circuit labeling required after installation",
    "SPAN panel is UL 67 listed - verify AHJ acceptance before ordering",
  ];

  const newRequirements = [
    ...job.requirements,
    ...spanRequirements.filter((r) => !job.requirements.includes(r)),
  ];

  // Add SPAN-specific blueprint notes
  const spanNotes = [
    "Verify 2.4 GHz Wi-Fi signal strength at panel location before installation",
    "Install CT sensor clamps on service entrance conductors before closing panel",
    "Configure SPAN app and label all circuits after energization",
  ];

  const newBlueprintNotes = [
    ...(job.blueprintNotes ?? []),
    ...spanNotes.filter((n) => !(job.blueprintNotes ?? []).includes(n)),
  ];

  // Use SPAN diagram
  const spanDiagram = SUBPANEL_JOBS.has(job.id)
    ? spanSubpanelDiagram
    : spanUpgradeDiagram;

  // Add SPAN docs
  const spanDocs = [
    {
      title: "SPAN Panel Installation Guide",
      url: "https://support.span.io/hc/en-us/categories/360002287393-Installation",
      description: "Official SPAN installation documentation, wiring diagrams, and commissioning procedures",
    },
    {
      title: "SPAN Panel Specifications",
      url: "https://www.span.io/panel",
      description: "SPAN Smart Panel product specifications, features, and compatibility information",
    },
  ];

  const existingDocUrls = new Set(job.officialDocs.map((d) => d.url));
  const newDocs = [
    ...job.officialDocs,
    ...spanDocs.filter((d) => !existingDocUrls.has(d.url)),
  ];

  return {
    ...job,
    label: job.label + " (SPAN)",
    materials: newMaterials,
    requirements: newRequirements,
    blueprintNotes: newBlueprintNotes,
    svgDiagram: spanDiagram,
    officialDocs: newDocs,
  };
}
