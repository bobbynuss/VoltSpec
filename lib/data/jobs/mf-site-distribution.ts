import type { Job } from "../types";
import { diagram } from "../diagrams/mf-site-distribution";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "mf-site-distribution",
  label: "Multifamily Build-Out – Phase 2: Underground Site Distribution",
  requirements: [
    "NEC 2026 Art. 230: Services — main service entrance, metering, and overcurrent protection requirements",
    "NEC 2026 Art. 225: Outside branch circuits and feeders — conductor sizing, protection, and support for building feeders",
    "NEC 2026 Art. 300.5: Underground installations — minimum burial depth, protection, and marking requirements",
    "NEC 2026 Art. 300.5(D)(3): Direct-buried conductors and cables emerging from ground must be protected to 8 ft above grade",
    "NEC 2026 Art. 310.16: Conductor ampacity — derate for conduit fill and ambient temperature per NEC Tables",
    "NEC 2026 Art. 250.30: Separately derived systems grounding — if site has multiple transformers",
    "NEC 2026 Art. 408: Switchboards and panelboards — main distribution panel requirements",
    "Utility coordination: confirm transformer sizing, vault or pad-mount location, and metering configuration",
    "Duct bank design: engineer-stamped per local building code, concrete-encased where required",
    "Permit: site electrical permit, trench inspection before backfill, duct bank inspection before concrete pour",
    "Fire marshal review may be required for main switchgear room location and access",
  ],
  materials: [
    // ── Main Switchgear ─────────────────────────────────────────
    { item: "Main Distribution Switchboard", quantity: "1", spec: "Eaton PRL4B-equipped — 1200A or 2000A 120/208V 3-phase 4-wire main distribution switchboard, NEMA 1 indoor rated, with main breaker and distribution section — size per project load calc" },
    { item: "CT Metering Cabinet", quantity: "1", spec: "Eaton 1MP4206RRLP — CT metering cabinet, 200A, 3-phase 4-wire, ringless, utility-approved for master metering — at main switchgear", unitPrice: 1250.00 },
    // ── Building MDPs ───────────────────────────────────────────
    { item: "Building MDP 400A Panel", quantity: "per building", spec: "Eaton PRL1A — 400A 120/208V 3-phase main lug panelboard, 42-space, NEMA 1, building main distribution — one per building", unitPrice: 1850.00 },
    { item: "Building CT Cabinet", quantity: "per building", spec: "Eaton 1MP4124RRLP — CT metering cabinet, 125A, 3-phase, per-building utility metering point", unitPrice: 680.00 },
    // ── Underground Feeders ─────────────────────────────────────
    { item: "500 kcmil AL XHHW-2", quantity: "per plan (ft)", spec: "ALU XHHW500AL - 500 kcmil aluminum XHHW-2 600V, phase conductors for main building feeders, sold per ft — 3 per circuit" },
    { item: "3/0 AL XHHW-2 (Neutral)", quantity: "per plan (ft)", spec: "ALU XHHW30AL - 3/0 aluminum XHHW-2 600V, neutral conductor per building feeder, sold per ft" },
    { item: "2 AWG Bare Copper GEC", quantity: "per plan (ft)", spec: "COP BARE2SOL500 - 2 AWG solid bare copper, equipment grounding conductor per building feeder, sold per ft" },
    // ── Duct Bank ───────────────────────────────────────────────
    { item: "4 in. Schedule 40 PVC Conduit", quantity: "per plan (ft)", spec: "PVC PVC4SCH40 - 4 in. Schedule 40 PVC conduit, 10 ft sticks, underground duct bank, sold per ft", unitPrice: 12.50 },
    { item: "4 in. PVC 90° Sweep Ell", quantity: "per plan", spec: "PVF 4ELL90 - 4 in. Schedule 40 PVC 90° sweep ell, duct bank turns and building entries", unitPrice: 28.00 },
    { item: "4 in. PVC Coupling", quantity: "per plan", spec: "PVF CPL4 - 4 in. PVC coupling", unitPrice: 4.50 },
    { item: "4 in. PVC Male Adapter", quantity: "per plan", spec: "PVF TA4 - 4 in. PVC terminal adapter, conduit to switchgear/panel entries", unitPrice: 6.80 },
    { item: "Duct Bank Spacers", quantity: "per plan", spec: "Carlon S288HHN - 4-way duct bank spacer, holds 4 in. conduits at proper spacing in concrete pour", unitPrice: 3.50 },
    // ── Pull Boxes & Manholes ───────────────────────────────────
    { item: "Underground Pull Box (large)", quantity: "per plan", spec: "Quazite PG2436BA24 - 24x36x24 in. polymer concrete pull box with cover, underground rated, at duct bank direction changes", unitPrice: 485.00 },
    { item: "Pull Box Cover", quantity: "per plan", spec: "Quazite PG2436HH — 24x36 in. heavy-duty cover for pull box, H-20 load rated for vehicle traffic areas", unitPrice: 165.00 },
    // ── Grounding ───────────────────────────────────────────────
    { item: "5/8 x 10 ft Ground Rod", quantity: "per plan", spec: "Erico 618880 - 5/8 in. x 10 ft copper-bonded ground rod — at each building MDP and main switchgear", unitPrice: 32.00 },
    { item: "Ground Rod Clamp", quantity: "per plan", spec: "NSI GRC58 - 5/8 in. ground rod bronze clamp, UL listed", unitPrice: 4.21 },
    { item: "Exothermic Weld Kit", quantity: "1", spec: "Erico Cadweld PLUSCU200L - exothermic weld kit for ground rod to GEC connections, permanent bonds", unitPrice: 185.00 },
    { item: "Ground Bus Bar", quantity: "per plan", spec: "Eaton GBKP1020 - ground bus bar kit for panelboard, 10 terminals, one per MDP", unitPrice: 28.00 },
    // ── Miscellaneous ───────────────────────────────────────────
    { item: "Warning Tape (underground)", quantity: "per plan (ft)", spec: "Presco DOTD3105R612 - detectable underground warning tape, 'CAUTION BURIED ELECTRIC LINE BELOW', 6 in. wide", unitPrice: 0.12 },
    { item: "Wire Pulling Lubricant", quantity: "2", spec: "Ideal 31-378 - Yellow 77 wire pulling lubricant, 1 gallon, for 500 kcmil pulls through duct bank", unitPrice: 42.00 },
    { item: "Anti-Oxidant Compound", quantity: "2", spec: "Ideal 30-030 - Noalox anti-oxidant compound, 8 oz, ALL aluminum terminations", unitPrice: 12.75 },
    { item: "PVC Cement and Primer Kit", quantity: "2", spec: "Oatey 30246 - PVC cement + purple primer combo pack", unitPrice: 12.50 },
    { item: "Duct Seal", quantity: "6", spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit entries at all equipment", unitPrice: 6.36 },
  ],
  blueprintNotes: [
    "Main switchgear location: coordinate with architect — requires dedicated electrical room with ventilation and fire rating",
    "Duct bank routing: minimize turns, maintain minimum bend radius, concrete-encase per engineer's design",
    "Trench inspection required before backfill — AHJ must approve depth, spacing, and warning tape placement",
    "Size building feeders per NEC load calculation — typical 4+ story multifamily building: 400A-800A per building",
    "Each building gets its own MDP and CT metering — enables per-building utility billing",
    "Pull box locations: every 200 ft max on straight runs, at every direction change, and at building entries",
    "Spare conduits: install 1-2 spare 4 in. conduits in duct bank for future capacity / low-voltage",
    "Coordinate with plumbing, gas, and telecom for trench sharing where allowed by code",
    "Adjust all 'per building' and 'per plan' quantities to actual building count and site distances",
    "Site amenity feeds (pool, gym, clubhouse) may need separate feeders from main switchgear",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
