/**
 * Takeoff Item Classifier
 *
 * Splits AI Plan Takeoff results into two buckets:
 *   - "collaborate" — Big ticket items that need vendor coordination
 *   - "quicklist"   — Commodity/misc items the Elliott rep handles
 *
 * BIG TICKET (collaborate):
 *   - Panels, loadcenters, switchgear, bus duct, MCC
 *   - Lighting fixtures (Lithonia, Juno, Acuity, any named fixture)
 *   - Generators, ATS, UPS, battery systems
 *   - Transformers
 *   - Large enclosures (Hoffman, nVent, NEMA-rated)
 *   - Underground: pull boxes, manholes, handholes, vault covers
 *   - Conduit ≥ 5" (non-stock sizing)
 *   - Solar inverters, EV chargers, charging stations
 *   - Fire alarm panels, access control panels
 *   - Motor control centers, VFDs
 *   - Metering equipment (CT cabinets, meter sockets/stacks)
 *
 * COMMODITY (quicklist — Elliott handles):
 *   - Wire & cable (all sizes — Elliott stocks this)
 *   - Standard conduit (< 5")
 *   - Fittings (connectors, couplings, straps, elbows, LBs)
 *   - Wire nuts, lever nuts, splices
 *   - Devices (receptacles, switches, dimmers, wall plates)
 *   - Device boxes, 4-square boxes, mud rings
 *   - Tape, ties, labels, misc hardware
 *   - Ground rods, clamps, lugs
 *   - Standard weatherproof covers
 *   - Staples, straps, hangers, beam clamps
 */

interface TakeoffItem {
  item: string;
  spec: string;
  quantity: string;
}

// ── Big Ticket Patterns ────────────────────────────────────────────

const BIG_TICKET_PATTERNS: RegExp[] = [
  // Panels, loadcenters, switchgear, breakers
  /\b(panel|loadcenter|load\s*center|switchgear|panelboard|distribution\s*board)\b/i,
  /\b(MDP|MCC|SWB|SWBD|switchboard)\b/i,
  /\bpow-r-line\b/i,
  /\bPRL[123]/i,
  /\b(bus\s*duct|busway|bus\s*plug)\b/i,
  // Breakers — these are part of the panel/gear package, not commodity
  /\b(breaker|circuit\s*breaker|MCB|MCCB)\b/i,
  /\b(QBH|BKD|CHF|CHFP|BAB|GHB|HQP)\d/i,
  /\bmain\s*breaker\b/i,

  // Lighting fixtures (named manufacturers or fixture types)
  /\b(lithonia|juno|acuity|hubbell\s*lighting|cree|eaton\s*lighting|rab|kim|cooper|halo|metalux|columbia)\b/i,
  /\b(fixture|luminaire|troffer|high[\s-]?bay|low[\s-]?bay|wall\s*pack|flood\s*light)\b/i,
  /\b(downlight|pendant|strip\s*light|vapor[\s-]?tight|wrap\s*light)\b/i,
  /\b(pole\s*light|area\s*light|bollard|sconce|exit\s*sign|emergency\s*light)\b/i,
  /\b(LED\s*flat\s*panel|LED\s*panel|recessed\s*light|can\s*light)\b/i,
  /\b(parking\s*(garage|lot)\s*light)\b/i,
  // Fixture schedule items often labeled as "Type A", "Type B", etc.
  /\btype\s*[A-Z]\b.*\b(light|fixture|luminaire|LED|troffer|2x[24]|1x4|4ft|2ft)\b/i,
  /\b(2x4|2x2|1x4|4ft|2ft|8ft)\s*(LED|fluorescent|troffer|fixture|strip|wrap)\b/i,
  /\bfixture\s*(type|schedule|mark)\b/i,

  // Generators, ATS, UPS, battery
  /\b(generator|genset|ATS|automatic\s*transfer|UPS|battery\s*(system|cabinet|rack))\b/i,
  /\b(generac|kohler|cummins|caterpillar|eaton.*ATS)\b/i,

  // Transformers
  /\b(transformer|xfmr)\b/i,

  // Large enclosures
  /\b(hoffman|nvent|stahlin)\b/i,
  /\bNEMA\s*(3R|4|4X|12)\b/i,
  /\b(enclosure|cabinet|disconnect)\b.*\b(fused|non[\s-]?fused|safety\s*switch)\b/i,
  /\b(safety\s*switch|disconnect\s*switch)\b/i,

  // Underground
  /\b(pull\s*box|manhole|handhole|vault|underground\s*box)\b/i,
  /\b(american\s*polymer|quazite|armorcast|oldcastle)\b/i,
  /\bduct\s*bank\b/i,

  // Solar, EV
  /\b(inverter|solaredge|enphase|solar\s*edge)\b/i,
  /\b(EV\s*charger|charging\s*station|chargepoint|EVSE)\b/i,

  // Fire alarm, access control
  /\b(fire\s*alarm\s*panel|FACP|fire\s*alarm\s*control)\b/i,
  /\b(access\s*control\s*panel)\b/i,

  // Motor control, VFD
  /\b(VFD|variable\s*frequency|motor\s*control|motor\s*starter|soft\s*start)\b/i,

  // Metering
  /\b(CT\s*cabinet|meter\s*socket|meter\s*stack|meter\s*base|revenue\s*meter)\b/i,
  /\bmilbank\b/i,
];

// ── Oversized Conduit Detection ────────────────────────────────────
// Conduit ≥ 5" is big ticket (non-stock). Smaller is commodity.

function isOversizedConduit(item: string, spec: string): boolean {
  const combined = `${item} ${spec}`;
  // Match conduit with size ≥ 5"
  const conduitSizeMatch = combined.match(
    /\b(\d+(?:\.\d+)?)\s*(?:"|inch|in\.?)\s*(?:EMT|RMC|IMC|PVC|rigid|conduit)/i
  );
  if (conduitSizeMatch) {
    const size = parseFloat(conduitSizeMatch[1]);
    return size >= 5;
  }
  // Also match "5" conduit" or "6 inch EMT" patterns
  const altMatch = combined.match(
    /\b(?:EMT|RMC|IMC|PVC|rigid|conduit)\s*(?:,?\s*)(\d+(?:\.\d+)?)\s*(?:"|inch|in\.?)/i
  );
  if (altMatch) {
    const size = parseFloat(altMatch[1]);
    return size >= 5;
  }
  return false;
}

// ── Explicit Commodity Patterns ────────────────────────────────────
// Things that are NEVER big ticket even if they match loosely

const COMMODITY_OVERRIDES: RegExp[] = [
  /\bwire\s*nut\b/i,
  /\blever\s*nut\b/i,
  /\bwago\b/i,
  /\bideal\b.*\bconnector\b/i,
  /\bwall\s*plate\b/i,
  /\bcover\s*plate\b/i,
  /\bdevice\s*box\b/i,
  /\b(nail[\s-]?on|old\s*work|new\s*work)\s*box\b/i,
  /\b4[\s-]?square\s*box\b/i,
  /\bmud\s*ring\b/i,
  /\bground\s*rod\b/i,
  /\bground\s*clamp\b/i,
  /\bstaple\b/i,
  /\bcable\s*tie\b/i,
  /\bzip\s*tie\b/i,
  /\belectrical\s*tape\b/i,
  /\bstrap\b/i,
  /\bbeam\s*clamp\b/i,
  /\bhanger\b/i,
  /\bmineral\s*core\b/i,
  /\banti[\s-]?short\b/i,
  /\bbushing\b/i,
  /\bknockout\b/i,
];

// ── Main Classifier ────────────────────────────────────────────────

export type TakeoffBucket = "collaborate" | "quicklist";

export interface ClassifiedItem extends TakeoffItem {
  bucket: TakeoffBucket;
  reason?: string;
}

/**
 * Classify a single takeoff item as big-ticket (collaborate) or commodity (quicklist).
 */
export function classifyItem(item: TakeoffItem): ClassifiedItem {
  const combined = `${item.item} ${item.spec}`;

  // Check commodity overrides first — these are never big ticket
  for (const pat of COMMODITY_OVERRIDES) {
    if (pat.test(combined)) {
      return { ...item, bucket: "quicklist" };
    }
  }

  // Check oversized conduit
  if (isOversizedConduit(item.item, item.spec)) {
    return { ...item, bucket: "collaborate", reason: "Oversized conduit (≥5\")" };
  }

  // Check big ticket patterns
  for (const pat of BIG_TICKET_PATTERNS) {
    if (pat.test(combined)) {
      return { ...item, bucket: "collaborate" };
    }
  }

  // Default: commodity/quicklist
  return { ...item, bucket: "quicklist" };
}

/**
 * Split an array of takeoff items into collaborate and quicklist buckets.
 */
export function classifyTakeoffItems(items: TakeoffItem[]): {
  collaborate: ClassifiedItem[];
  quicklist: ClassifiedItem[];
} {
  const collaborate: ClassifiedItem[] = [];
  const quicklist: ClassifiedItem[] = [];

  for (const item of items) {
    const classified = classifyItem(item);
    if (classified.bucket === "collaborate") {
      collaborate.push(classified);
    } else {
      quicklist.push(classified);
    }
  }

  return { collaborate, quicklist };
}
