import type { MaterialItem } from "../../core/types";

/**
 * Material group categories in display order
 */
export type MaterialGroupId =
  | "gear"
  | "panel-breakers"
  | "wire-conductors"
  | "conduit-raceway"
  | "devices"
  | "lighting"
  | "fittings-accessories"
  | "miscellaneous";

export interface MaterialGroup {
  id: MaterialGroupId;
  label: string;
  icon: string; // emoji for display
  items: MaterialItem[];
}

// ── Classification patterns ────────────────────────────────────────

// ── Gear (large commercial / data center equipment) ────────────────
const GEAR_PATTERNS = [
  /\bswitchgear\b/i,
  /\bPow-R-Line\b/i,
  /\bMagnum\s*DS\b/i,
  /\bbus\s*duct\b/i,
  /\bbusway\b/i,
  /\bPow-R-Way\b/i,
  /\bbus\s*duct\s*(elbow|tee|end\s*closure|section)\b/i,
  /\bgenerator\b/i,
  /\bgenset\b/i,
  /\bGNR\b.*\bSDMD\b/i,
  /\bUPS\b/i,
  /\bbattery\s*(cabinet|string|room)\b/i,
  /\bPDU\b/i,
  /\bpower\s*distribution\s*unit\b/i,
  /\bRPP\b.*\b(panel|remote)\b/i,
  /\bparalleling\b/i,
  /\bATC-\d/i,
  /\bCT\s*cabinet\b/i,
  /\brevenue.*CT\b/i,
  /\b(4000|3000|2500|2000|1600)A\b.*\b(switchgear|lineup|breaker|busway|bus\s*duct|MLO|main)\b/i,
  /\bfuel\s*(tank|storage|transfer|piping)\b/i,
  /\bday\s*tank\b/i,
  /\bexhaust\s*(silencer|stack)\b/i,
  /\bload\s*bank\b/i,
  /\bconcrete\s*pad\b/i,
  /\bgenerator.*cable\b/i,
  /\bmanhole\b/i,
  /\bhandhole\b/i,
  /\bpull\s*box\b/i,
  /\bduct\s*bank\s*spacer\b/i,
  /\bcable\s*tray\b/i,
  /\bladder\s*tray\b/i,
  /\bcable\s*rack\b/i,
  /\bpulling\s*iron\b/i,
  /\bhydrogen\s*detect/i,
  /\bspill\s*containment\b/i,
  /\beyewash\b/i,
  /\bexothermic\b/i,
  /\bCadweld\b/i,
];

const PANEL_BREAKER_PATTERNS = [
  // Panels / loadcenters — must be actual panel products, not items that mention "panel" in passing
  /\b(load\s*center|panelboard|sub-?panel|main\s*panel|unit\s*panel|floor\s*panel|house\s*panel)\b/i,
  /\b\d+[-\s]space\b.*\bpanel\b/i,
  /\bpanel\b.*\b(MLO|main\s*lug|main\s*breaker|flush|surface|NEMA)\b/i,
  /\bCHP\d/i,
  /\bloadcenter\b/i,
  /\bsmart panel\b/i,
  /\bSPAN\b.*\b(panel|PNL|subpanel)\b/i,
  /\bPRL[123]/i,
  /\bPow-R/i,
  /\bEZB\b/i,
  /\bEZT\b/i,
  /\benclosure\b/i,
  /\btrim\b.*\b(surface|flush)\b/i,
  // Breakers
  /\bbreaker\b/i,
  /\bAFCI\b/i,
  /\bGFCI\s*Breaker/i,
  /\bDual\s*Function/i,
  /\bBRK-/i,
  /\bCHF\b|\bCHFP\b|\bBRP\d|\bBR\d|\bBRN\d|\bQBH\b/i,
  /\bmain\s*breaker\s*kit/i,
  /\bBKD\d/i,
  // Surge / SPD
  /\bsurge\b/i,
  /\bSPD\b/i,
  /\bSPT\b/i,
  // CT sensors (SPAN)
  /\bCT\s*sensor/i,
  /\bCT-\d/i,
  // Meter bases / sockets
  /\bmeter\s*(base|socket|cabinet)\b/i,
  /\bringless\b/i,
  // Disconnect switches
  /\bdisconnect\b/i,
  /\bDPB\d/i,
  /\bDH\d/i,
  // Ground bus / copper bus
  /\bground\s*bus\b/i,
  /\bCUGROUND\b/i,
  // Feed-through
  /\bfeed-through\b/i,
  // ATS / transfer switch (paired with generator panel)
  /\btransfer\s*switch\b/i,
  /\bATS\b/i,
  // Interlock kit
  /\binterlock\b/i,
];

const WIRE_CONDUCTOR_PATTERNS = [
  /\bTHHN\b/i,
  /\bTHWN\b/i,
  /\bXHHW\b/i,
  /\bSER\s*cable\b/i,
  /\bSER\d/i,
  /\bSEU\b/i,
  /\bUSE-2\b/i,
  /\bURD\b/i,
  /\bNM-B\b/i,
  /\bROMEX\b/i,
  /\bMC\s*cable\b/i,
  /\bPV\s*wire\b/i,
  /\bAWG\b.*\b(copper|aluminum|bare|black|red|white|green)\b/i,
  /\bkcmil\b/i,
  /\bconductor\b/i,
  /\b(?:4\/0|3\/0|2\/0|1\/0)\b.*\b(AL|copper|SER|XHHW)\b/i,
  /\bAL\s*SER\b/i,
  /\bbare\s*copper\b/i,
  /\bGEC\b/i,
];

const CONDUIT_RACEWAY_PATTERNS = [
  /\bEMT\s*conduit\b/i,
  /\bEMT\b.*\bstick\b/i,
  /\bPVC\s*conduit\b/i,
  /\brigid\s*(metal\s*)?conduit\b/i,
  /\bRMC\b/i,
  /\bIMC\b/i,
  /\bliquidtight\b/i,
  /\bflex\s*conduit\b/i,
  /\bENT\b/i,
  /\bconduit\b.*\b(stick|10\s*ft|20\s*ft)\b/i,
  /\bin\.\s*EMT\b(?!\s*(set-screw|connector|coupling|strap|one-hole))/i,
];

const FITTING_ACCESSORY_PATTERNS = [
  /\bconnector\b/i,
  /\bcoupling\b/i,
  /\bstrap\b/i,
  /\belbow\b/i,
  /\bweatherhead\b/i,
  /\bLB\s*condulet\b/i,
  /\bcondulet\b/i,
  /\badapter\b/i,
  /\breceptacle\b/i,
  /\bGFCI\s*receptacle\b/i,
  /\boutlet\s*box\b/i,
  /\b4-square\b/i,
  /\bcover\b/i,
  /\bin-use\s*cover\b/i,
  /\bweather.?proof\b/i,
  /\bjunction\s*box\b/i,
  /\bset-screw\b/i,
  /\bone-hole\b/i,
  /\bdevice\s*box\b/i,
  /\bTP\d{3}/i,
  /\bBridgeport\s*\d{3}/i,
  /\bmast\s*wire\s*holder\b/i,
  /\bservice\s*mast\b/i,
  /\bbracket\b/i,
  /\bbolt\b.*\b(machine|lag|carriage)\b/i,
  /\bporcelain\b/i,
  /\bpolaris\b/i,
  /\bmulti-tap\b/i,
  /\bconnector\b.*\bAL-CU\b/i,
  /\bIPLD\b/i,
];

// ── Lighting ────────────────────────────────────────────────────────
// All light fixtures (indoor, outdoor, landscape, exit, emergency, pole lights)
const LIGHTING_PATTERNS = [
  // Light fixtures (generic)
  /\blight\s*fixture\b/i,
  /\brecessed\s*(down)?light\b/i,
  /\bcan\s*light\b/i,
  /\bdownlight\b/i,
  /\bwafer\b.*\blight\b/i,
  /\bflush\s*mount\b.*\b(ceil|light|LED)\b/i,
  /\bsconce\b/i,
  /\bvanity\s*light\b/i,
  /\bpendant\b/i,
  /\bchandelier\b/i,
  /\bcove\s*light\b/i,
  /\bunder.cabinet\b.*\b(LED|light)\b/i,
  // Outdoor / area lighting
  /\bfloodlight\b/i,
  /\barea\s*light\b/i,
  /\bshoebox\b/i,
  /\bpole\s*light\b/i,
  /\bsite\s*light\b/i,
  /\bparking\b.*\blight\b/i,
  /\bDSXF\b/i,
  // Landscape lighting
  /\blandscape\s*(light|transform)\b/i,
  /\bpath\s*light\b/i,
  /\bspot\s*light\b/i,
  /\b12V\s*LED\b.*\b(path|spot|light)\b/i,
  /\blandscape\s*wire\b/i,
  /\blandscape\s*transformer\b/i,
  /\bKichler\b/i,
  // Emergency / exit lighting
  /\bexit\s*sign\b/i,
  /\bemergency\s*(light|bug|head)\b/i,
  /\bbug-eye\b/i,
  /\bLHQM\b/i,
  /\bELM\d\b/i,
  /\bEDGR\b/i,
  // LED fixture patterns (Lithonia, etc.)
  /\bLED\s*(fixture|strip|wrap|vapor|troffer|flat\s*panel)\b/i,
  /\bLithonia\b.*\b(LED|WF\d|FMLWL|FMML|GEMINI|DSXF)\b/i,
  /\bvapor.tight\b.*\b(fixture|LED)\b/i,
  // Dimming panels / lighting control (not dimmer switches — those are devices)
  /\bdimming\s*panel\b/i,
  /\bGrafik\b/i,
  // Ceiling fan (lighting + fan combo)
  /\bceiling\s*fan\b/i,
  // Generic LED fixture catch
  /\bLED\b.*\b(lumen|5000K|4000K|3000K|2700K)\b.*\b(fixture|mount|recessed|surface|flush|troffer)\b/i,
  // Photocells and lighting contactors (lighting control)
  /\bphotocell\b/i,
  /\bdusk.to.dawn\b/i,
  /\blighting\s*contactor\b/i,
  // Occupancy/vacancy sensors (lighting control)
  /\boccupancy\s*(sensor|detector)\b/i,
  /\bvacancy\s*sensor\b/i,
  // Range hood (has a light, but it's more of a device — exclude)
];

// ── Devices ─────────────────────────────────────────────────────────
// Wiring devices: switches, receptacles, wall plates, smoke/CO detectors, fans
const DEVICE_PATTERNS = [
  // Switches
  /\bswitch\b/i,
  /\bdimmer\b/i,
  /\bDecora\b/i,
  /\b(single-pole|3-way|4-way)\b.*\bswitch\b/i,
  // Receptacles (TR, GFCI, USB, WR, duplex)
  /\breceptacle\b/i,
  /\boutlet\b/i,
  /\bGFCI\b/i,
  /\bUSB\b/i,
  /\btamper.resistant\b/i,
  /\bTR\b.*\b(15A|20A|receptacle|duplex)\b/i,
  // Wall plates
  /\bwall\s*plate\b/i,
  /\bcover\s*plate\b/i,
  /\bfaceplate\b/i,
  /\bPJ\d/i,
  // Smoke & CO detectors
  /\bsmoke\b/i,
  /\bcarbon\s*monoxide\b/i,
  /\bCO\s*(detector|alarm|combo)\b/i,
  /\bSMI\d/i,
  /\bSMIC\d/i,
  /\bKidde\b/i,
  // Bath exhaust fan (device, not lighting)
  /\b(bath|exhaust)\s*fan\b/i,
  /\bBroan\b/i,
  /\bNuTone\b/i,
  // Range hood
  /\brange\s*hood\b/i,
  // Fan switch/control
  /\bfan\s*(switch|control)\b/i,
  // Heat lamp (bathroom device)
  /\bheat\s*lamp\b/i,
  // Vendor code patterns (EWD part numbers)
  /\bEaton\b.*\b(7501|7503|TR11|TR13|TRGF|TWRGF|TR77|PJ\d|DAL|SGD|1301|1303)\b/i,
  // Lutron dimmer switches (device, not lighting control panel)
  /\bLutron\b.*\b(dimmer|switch)\b/i,
  /\bDVCL\b/i,
];

// Items that look like devices but should stay in fittings (boxes, covers for boxes)
const DEVICE_EXCLUDE_PATTERNS = [
  /\b4-square\b.*\b(box|cover)\b/i,
  /\boutlet\s*box\b/i,
  /\bjunction\s*box\b/i,
  /\bdevice\s*box\b/i,
  /\bin-use\s*(cover|weatherproof)\b/i,
  /\bweather.?proof\s*cover\b/i,
  /\bconduit\b/i,
  /\bNEMA\s*14-50\b/i,
  /\b50A\b.*\b(receptacle|outlet)\b/i,
  /\b30A\b.*\b(receptacle|outlet|dryer)\b/i,
];

// Everything else falls to miscellaneous, but these patterns help catch common items
const MISC_PATTERNS = [
  /\bground\s*rod\b/i,
  /\bground\s*rod\s*clamp\b/i,
  /\bgrounding\b/i,
  /\bUfer\b/i,
  /\bduct\s*seal\b/i,
  /\blabel\b/i,
  /\barc\s*flash\b/i,
  /\bpanel\s*directory\b/i,
  /\banti-oxidant\b/i,
  /\bNoalox\b/i,
  /\bsealant\b/i,
  /\btape\b/i,
  /\bzip\s*tie\b/i,
  /\bstaple\b/i,
];

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

// ── Items that should be conduit/raceway even if other patterns match ──
const CONDUIT_OVERRIDE_PATTERNS = [
  /\bENT\b.*\b(flex|coil|tubing|conduit|blue)\b/i,
  /\bflex\b.*\b(conduit|tubing|nonmetallic)\b/i,
  /\bliquidtight\b.*\b(flex|conduit)\b/i,
  /\bENT\d/i,  // part numbers like ENT1B0X
  /\bLT\d/i,   // liquidtight part numbers like LT34
  /\bcarflex\b/i,
];

// ── Items that look like "panel" but are really misc/labels ──
const PANEL_EXCLUDE_PATTERNS = [
  /\bpanel\s*directory\b/i,
  /\blabel\s*kit\b/i,
  /\barc\s*flash\s*label\b/i,
];

function classifyMaterial(mat: MaterialItem): MaterialGroupId {
  const combined = `${mat.item} ${mat.spec}`;

  // Priority 0: Gear — large commercial/data center equipment (before panels grab switchgear/ATS)
  if (matchesAny(combined, GEAR_PATTERNS)) return "gear";

  // Priority 1: Conduit overrides — catch ENT/flex/liquidtight before panel patterns grab them
  if (matchesAny(combined, CONDUIT_OVERRIDE_PATTERNS)) return "conduit-raceway";

  // Priority 2: Miscellaneous overrides — catch label kits before panel patterns grab "panel directory"
  if (matchesAny(combined, PANEL_EXCLUDE_PATTERNS)) return "miscellaneous";

  // Panel & Breakers
  if (matchesAny(combined, PANEL_BREAKER_PATTERNS)) return "panel-breakers";

  // Wire
  if (matchesAny(combined, WIRE_CONDUCTOR_PATTERNS)) return "wire-conductors";

  // Lighting — check before devices since some items match both (e.g., "LED" + "fixture")
  if (matchesAny(combined, LIGHTING_PATTERNS) && !matchesAny(combined, DEVICE_EXCLUDE_PATTERNS))
    return "lighting";

  // Devices — switches, receptacles, wall plates, smoke/CO, exhaust fans
  if (matchesAny(combined, DEVICE_PATTERNS) && !matchesAny(combined, DEVICE_EXCLUDE_PATTERNS))
    return "devices";

  // Fittings: check before conduit since "EMT connector" should be fitting not conduit
  if (matchesAny(combined, FITTING_ACCESSORY_PATTERNS)) return "fittings-accessories";

  // Conduit
  if (matchesAny(combined, CONDUIT_RACEWAY_PATTERNS)) return "conduit-raceway";

  // Miscellaneous explicit patterns
  if (matchesAny(combined, MISC_PATTERNS)) return "miscellaneous";

  // Default to miscellaneous
  return "miscellaneous";
}

const GROUP_META: Record<MaterialGroupId, { label: string; icon: string }> = {
  gear: { label: "Gear", icon: "🏗️" },
  "panel-breakers": { label: "Panel & Breakers", icon: "⚡" },
  "wire-conductors": { label: "Wire / Service Entrance Conductors", icon: "🔌" },
  "conduit-raceway": { label: "Conduit & Raceway", icon: "🔧" },
  devices: { label: "Devices", icon: "🔲" },
  lighting: { label: "Lighting", icon: "💡" },
  "fittings-accessories": { label: "Fittings & Accessories", icon: "🔩" },
  miscellaneous: { label: "Miscellaneous / Grounding / Other", icon: "📦" },
};

const GROUP_ORDER: MaterialGroupId[] = [
  "gear",
  "panel-breakers",
  "wire-conductors",
  "conduit-raceway",
  "devices",
  "lighting",
  "fittings-accessories",
  "miscellaneous",
];

/**
 * Group a flat materials list into 6 ordered sections.
 * Items within each group preserve their original order.
 */
export function groupMaterials(materials: MaterialItem[]): MaterialGroup[] {
  const buckets = new Map<MaterialGroupId, MaterialItem[]>();
  for (const id of GROUP_ORDER) buckets.set(id, []);

  for (const mat of materials) {
    const groupId = classifyMaterial(mat);
    buckets.get(groupId)!.push(mat);
  }

  return GROUP_ORDER
    .map((id) => ({
      id,
      label: GROUP_META[id].label,
      icon: GROUP_META[id].icon,
      items: buckets.get(id)!,
    }))
    .filter((g) => g.items.length > 0);
}
