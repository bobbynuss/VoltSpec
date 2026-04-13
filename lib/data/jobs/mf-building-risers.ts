import type { Job } from "../types";
import { diagram } from "../diagrams/mf-building-risers";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "mf-building-risers",
  label: "Multifamily Build-Out – Phase 3: Building Risers & House Panels",
  requirements: [
    "NEC 2026 Art. 225.30: Number of supplies — each building limited to one service unless exceptions apply",
    "NEC 2026 Art. 366: Auxiliary gutters — wireways for riser taps and floor distribution",
    "NEC 2026 Art. 368: Busways — if using bus duct risers, support and tap requirements per manufacturer",
    "NEC 2026 Art. 408: Switchboards, switchgear, and panelboards — house panels for common area loads",
    "NEC 2026 Art. 210.70: Lighting outlets — required locations in hallways, stairways, and common areas",
    "NEC 2026 Art. 700: Emergency systems — emergency lighting in stairways and egress paths requires separate circuit",
    "NEC 2026 Art. 620: Elevators — dedicated feeder, shunt trip breaker at top of shaft, machine room disconnect",
    "IBC/local fire code: fire-rated electrical closet per floor, minimum 2-hour rated where required",
    "Coordinate with elevator contractor for feeder sizing, machine room location, and pit sump pump circuit",
    "House panels serve building-common loads — hallways, lobbies, elevators, mechanical, laundry, fire alarm",
    "Permit: building electrical permit, riser plan review, fire marshal approval for electrical closet locations",
  ],
  materials: [
    // ── Risers ──────────────────────────────────────────────────
    { item: "4 in. EMT Conduit (riser)", quantity: "per plan (ft)", spec: "CON EMT4 - 4 in. EMT conduit, 10 ft sticks, vertical electrical riser through building — sold per ft", unitPrice: 18.50 },
    { item: "4 in. EMT Connector", quantity: "per floor", spec: "Bridgeport 262-DC - 4 in. EMT die-cast connector, riser to panel/gutter entry", unitPrice: 12.50 },
    { item: "4 in. EMT Coupling", quantity: "per plan", spec: "Bridgeport 268-DC - 4 in. EMT die-cast coupling, riser splices", unitPrice: 8.75 },
    { item: "4 in. Conduit Supports", quantity: "per plan", spec: "B-Line B2012 - 4 in. conduit hanger with hardware, support riser per NEC 358.30", unitPrice: 6.50 },
    // ── Riser Conductors ────────────────────────────────────────
    { item: "500 kcmil AL XHHW-2 (Phases)", quantity: "per plan (ft)", spec: "ALU XHHW500AL - 500 kcmil aluminum XHHW-2 600V, riser feeder phase conductors (3 per circuit), sold per ft" },
    { item: "3/0 AL XHHW-2 (Neutral)", quantity: "per plan (ft)", spec: "ALU XHHW30AL - 3/0 aluminum XHHW-2 600V, riser neutral, sold per ft" },
    { item: "2 AWG Bare Copper (EGC)", quantity: "per plan (ft)", spec: "COP BARE2SOL500 - 2 AWG solid bare copper, equipment grounding conductor in riser, sold per ft" },
    // ── Floor Panels ────────────────────────────────────────────
    { item: "Floor Distribution Panel 225A", quantity: "per floor", spec: "Eaton PRL1A-225 - 225A 120/208V 3-phase panelboard, 42-space, main lug, flush mount — floor electrical closet", unitPrice: 1250.00 },
    { item: "225A 3-Pole Breaker (floor tap)", quantity: "per floor", spec: "Eaton CHK3225 - 3-pole 225A CH bolt-on breaker, riser panel tap to floor distribution", unitPrice: 285.00 },
    // ── House Panels ────────────────────────────────────────────
    { item: "House Panel 200A", quantity: "per building", spec: "Eaton CHP20L200F - 20-space 200A CH main lug flush panel, house panel for common area loads — hallway, lobby, laundry, mechanical", unitPrice: 385.00 },
    { item: "100A 3-Pole Breaker (house feed)", quantity: "per building", spec: "Eaton CHK3100 - 3-pole 100A bolt-on breaker, MDP tap to house panel", unitPrice: 165.00 },
    // ── House Panel Breakers ────────────────────────────────────
    { item: "1-Pole 20A Breaker", quantity: "12 per building", spec: "Eaton CHF120 - CH 1-pole 20A breaker, hallway lighting, receptacles, laundry circuits", unitPrice: 8.50 },
    { item: "1-Pole 15A Breaker", quantity: "6 per building", spec: "Eaton CHF115 - CH 1-pole 15A breaker, stairway lighting, exit signs", unitPrice: 8.50 },
    { item: "2-Pole 30A Breaker", quantity: "2 per building", spec: "Eaton CHF230 - CH 2-pole 30A breaker, laundry dryer circuits", unitPrice: 18.50 },
    { item: "2-Pole 40A Breaker", quantity: "1 per building", spec: "Eaton CHF240 - CH 2-pole 40A breaker, elevator machine room feeder", unitPrice: 21.00 },
    // ── Elevator ────────────────────────────────────────────────
    { item: "Elevator Disconnect 60A", quantity: "per elevator", spec: "Eaton DH362FRK - 60A 600V 3-pole fused safety switch, NEMA 1, top of elevator shaft — with shunt trip per NEC 620.51", unitPrice: 185.00 },
    { item: "Elevator Machine Room Disconnect", quantity: "per elevator", spec: "Eaton DH363FRK - 100A 600V 3-pole fused safety switch, NEMA 1, in machine room per NEC 620.51(C)", unitPrice: 245.00 },
    // ── Wireway & Gutter ────────────────────────────────────────
    { item: "6x6 Wireway (per floor)", quantity: "per plan (ft)", spec: "B-Line 6624HSNK - 6x6 in. NEMA 1 hinged screw cover wireway, floor electrical closet for riser taps", unitPrice: 32.00 },
    { item: "Wireway Connector", quantity: "per plan", spec: "B-Line 6624C - 6x6 in. wireway connector fitting", unitPrice: 14.00 },
    // ── Grounding ───────────────────────────────────────────────
    { item: "Ground Bus Bar Kit", quantity: "per floor", spec: "Eaton GBKP1020 - ground bus bar kit, 10 terminals, one per floor panel and house panel", unitPrice: 28.00 },
    { item: "Bonding Jumper #4 Copper", quantity: "per plan (ft)", spec: "COP THHN4STGN - #4 AWG THHN stranded green, riser-to-floor bonding jumpers, sold per ft" },
    // ── Fire Alarm Rough ────────────────────────────────────────
    { item: "Fire Alarm Panel Circuit", quantity: "1 per building", spec: "Eaton CHFP120AF - CH 1-pole 20A AFCI breaker, dedicated fire alarm panel circuit with lock-on device", unitPrice: 45.00 },
    // ── Misc ────────────────────────────────────────────────────
    { item: "Panel Directory Label Kit", quantity: "per panel", spec: "Brady 95543 - adhesive panel directory label kit", unitPrice: 12.00 },
    { item: "Anti-Oxidant Compound", quantity: "2", spec: "Ideal 30-030 - Noalox anti-oxidant compound, 8 oz", unitPrice: 12.75 },
    { item: "Wire Pulling Lubricant", quantity: "1", spec: "Ideal 31-378 - Yellow 77 wire pulling lubricant, 1 gallon", unitPrice: 42.00 },
  ],
  blueprintNotes: [
    "Electrical riser: coordinate location with architect — dedicated fire-rated closet per floor, stacked vertically",
    "Riser sizing: 4 in. EMT for conduit riser or specify bus duct if preferred — bus duct simplifies floor taps",
    "House panels serve ONLY building-common loads — do not feed individual units from house panels",
    "Elevator: dedicated feeder per NEC 620, shunt trip at top of shaft, machine room disconnect — coordinate with elevator contractor",
    "Floor panels: one per floor minimum — size per unit count × anticipated diversified load",
    "Fire-rated assemblies: 2-hour minimum at all floor penetrations — use listed firestop systems (Hilti, 3M, STI)",
    "Emergency/egress lighting on separate circuit from house panel — battery backup or emergency generator",
    "Low-voltage coordination: telecom/data riser in same closet or adjacent — maintain NEC separation distances",
    "Adjust floor count, riser size, and panel quantities to actual building design",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
