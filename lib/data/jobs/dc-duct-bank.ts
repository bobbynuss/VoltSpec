import type { Job } from "../types";
import { diagram } from "../diagrams/dc-duct-bank";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "dc-duct-bank",
  label: "Data Center Build-Out \u2013 Phase 2: Underground Duct Bank / Site Utilities",
  requirements: [
    "NEC 2026 Art. 300.5: Minimum burial depth 24 in. for rigid nonmetallic conduit (direct buried); 18 in. under concrete",
    "NEC 2026 Art. 300.5(D)(3): Detectable warning tape required 12 in. above underground electrical installations",
    "NEC 2026 Art. 352: PVC conduit (Schedule 40) permitted for underground duct bank; Schedule 80 required where subject to physical damage",
    "NEC 2026 Art. 344: Rigid Metal Conduit (RMC) required for all above-grade risers and within 5 ft of building penetrations",
    "NEC 2026 Art. 250.50 / 250.52: Building grounding electrode system — concrete-encased electrode (Ufer), ground ring, and supplemental ground rods required",
    "NEC 2026 Art. 250.166: Grounding of systems supplying data processing equipment — mesh ground grid recommended for data center applications",
    "NEC 2026 Art. 300.5(I): Spare conduits required in duct bank for future capacity — minimum 2 spares per bank recommended",
    "Concrete encasement: minimum 3 in. cover around all conduits, 3500 PSI concrete minimum, red-dyed for identification",
    "Duct bank spacers required to maintain minimum 3 in. separation between conduits throughout entire run",
    "Manhole/handhole sizing: verify with engineer — typical data center uses 6\u2019\u00d78\u2019 precast manholes with H-20 rated covers for vehicle traffic areas",
    "Utility coordination: submit site utility plan to utility company before excavation — verify transformer pad location and service lateral routing",
    "Permit required: building permit + utility excavation permit + right-of-way permit if crossing public easements",
    "OSHA 1926.651: Trench safety — shoring/sloping/shielding required for excavations over 5 ft deep",
    "Fiber optic innerduct: install dedicated conduit path for low-voltage/fiber — maintain 12 in. separation from power conduits where not in shared duct bank",
  ],
  materials: [
    // ── PVC Conduit (Schedule 40 — Main Runs) ───────────────────────
    {
      item: "4 in. PVC Sch 40 Conduit",
      quantity: "500 ft",
      spec: "PVC PVC4 - 4 in. Schedule 40 PVC conduit, 10 ft sticks, UL listed, main duct bank runs",
    },
    {
      item: "4 in. PVC Sch 40 90\u00b0 Elbow",
      quantity: "12",
      spec: "PVF 4ELL90 - 4 in. Schedule 40 PVC 90\u00b0 long-radius elbow, non-bell end (requires couplings), direction changes and risers",
      unitPrice: 28.50,
    },
    {
      item: "4 in. PVC Sch 40 Coupling",
      quantity: "75",
      spec: "PVF CPL4 - 4 in. PVC coupling, stick-to-stick and elbow connections (non-bell end elbows need couplings)",
      unitPrice: 5.75,
    },
    // ── PVC Conduit (Schedule 80 — High Traffic / Damage Areas) ─────
    {
      item: "4 in. PVC Sch 80 Conduit",
      quantity: "100 ft",
      spec: "PVC 80PVC4 - 4 in. Schedule 80 PVC conduit, 10 ft sticks, high-impact areas, road crossings, under driveways",
    },
    {
      item: "4 in. PVC Sch 80 90\u00b0 Elbow",
      quantity: "4",
      spec: "PVF 804ELL90 - 4 in. Schedule 80 PVC 90\u00b0 long-radius elbow, non-bell end (requires couplings)",
      unitPrice: 42.00,
    },
    {
      item: "4 in. PVC Sch 80 Coupling",
      quantity: "10",
      spec: "PVF CPL4 - 4 in. PVC coupling (Sch 80 connections)",
      unitPrice: 5.75,
    },
    // ── Rigid Metal Conduit (RMC — Risers & Building Entry) ─────────
    {
      item: "4 in. Rigid Metal Conduit",
      quantity: "60 ft",
      spec: "CON GAL4 - 4 in. galvanized rigid metal conduit, 10 ft sticks, building entry risers and above-grade transitions",
    },
    {
      item: "4 in. RMC 90\u00b0 Elbow",
      quantity: "6",
      spec: "ROB GAL490 - 4 in. rigid galvanized 90\u00b0 elbow, PVC-to-RMC transition at grade",
      unitPrice: 62.00,
    },
    {
      item: "4 in. RMC Coupling",
      quantity: "8",
      spec: "CON 4CPL - 4 in. rigid coupling, galvanized",
      unitPrice: 12.50,
    },
    {
      item: "4 in. PVC-to-RMC Adapter",
      quantity: "12",
      spec: "PVF TA4 - 4 in. PVC male adapter, PVC-to-rigid transition fittings at risers",
      unitPrice: 7.80,
    },
    {
      item: "4 in. Insulating Bushing",
      quantity: "12",
      spec: "Bridgeport 369 - 4 in. insulating bushing, protect conductors at all conduit terminations",
      unitPrice: 8.50,
    },
    {
      item: "4 in. Rigid Locknut",
      quantity: "24",
      spec: "BRI 110S - 4 in. steel locknut, two per termination point",
      unitPrice: 3.25,
    },
    // ── Fiber Optic / Low Voltage Innerduct ─────────────────────────
    {
      item: "2 in. PVC Sch 40 Conduit (Fiber)",
      quantity: "500 ft",
      spec: "PVC PVC2 - 2 in. Schedule 40 PVC conduit, 10 ft sticks, dedicated fiber optic / low-voltage path",
    },
    {
      item: "1 in. Corrugated Innerduct",
      quantity: "500 ft",
      spec: "CDW ID100OR - 1 in. corrugated HDPE innerduct with pull tape, orange, for fiber optic cable inside 2 in. conduit",
      unitPrice: 0.65,
    },
    // ── Duct Bank Spacers & Supports ────────────────────────────────
    {
      item: "4 in. Duct Bank Spacer (6-way)",
      quantity: "100",
      spec: "CDW DBS46 - 4 in. 6-conduit duct bank spacer, maintains 3 in. separation, placed every 5 ft",
      unitPrice: 4.50,
    },
    {
      item: "4 in. Duct Bank Spacer (2-way)",
      quantity: "50",
      spec: "CDW DBS42 - 4 in. 2-conduit duct bank spacer, branch runs and riser transitions",
      unitPrice: 2.75,
    },
    // ── Manholes & Handholes ────────────────────────────────────────
    {
      item: "Precast Manhole 6\u2019\u00d78\u2019\u00d77\u2019",
      quantity: "2",
      spec: "Precast concrete manhole, 6 ft \u00d7 8 ft \u00d7 7 ft deep, with H-20 rated cast iron traffic cover, ground-level pull point \u2014 verify with civil engineer, order from local precast supplier",
      unitPrice: 4800.00,
    },
    {
      item: "Handhole 36\u2033\u00d736\u2033\u00d736\u2033",
      quantity: "4",
      spec: "Quazite PG3636BA36 - 36 in. \u00d7 36 in. \u00d7 36 in. polymer concrete handhole with bolted cover, branch distribution points",
      unitPrice: 680.00,
    },
    {
      item: "Pull Box 24\u2033\u00d724\u2033\u00d712\u2033",
      quantity: "6",
      spec: "Hoffman F242412CHSC - 24\u00d724\u00d712 in. NEMA 3R screw cover pull box, above-grade junction and transition points",
      unitPrice: 185.00,
    },
    // ── Grounding Grid ──────────────────────────────────────────────
    {
      item: "2/0 Bare Copper Ground Conductor",
      quantity: "2000 ft",
      spec: "COP BARE20STR500 - 2/0 stranded bare copper conductor, ground grid mesh \u2014 20 ft spacing typical, sold per ft",
    },
    {
      item: "5/8 x 10 ft Ground Rod",
      quantity: "20",
      spec: "Erico 615810 - 5/8 in. \u00d7 10 ft copper-bonded ground rod, placed at grid intersections and building corners",
      unitPrice: 34.50,
    },
    {
      item: "Ground Rod Clamp",
      quantity: "20",
      spec: "NSI GRC58 - 5/8 in. ground rod bronze clamp, UL listed, one per rod",
      unitPrice: 4.21,
    },
    {
      item: "Exothermic Weld Kit",
      quantity: "1",
      spec: "Erico Cadweld - exothermic weld kit with molds for 2/0 to 2/0 and 2/0 to ground rod connections \u2014 50 shots minimum, data center grounding grid requires welded connections per IEEE 80",
      unitPrice: 450.00,
    },
    {
      item: "Exothermic Weld Shots (2/0-2/0)",
      quantity: "50",
      spec: "Erico Cadweld 115PLUSF20 - exothermic weld shots, 2/0 AWG cable-to-cable, for grid intersections",
      unitPrice: 8.50,
    },
    {
      item: "Exothermic Weld Shots (2/0-Rod)",
      quantity: "20",
      spec: "Erico Cadweld 115PLUSF25 - exothermic weld shots, 2/0 AWG cable-to-ground rod",
      unitPrice: 8.50,
    },
    {
      item: "Ground Bar Kit (MH/HH)",
      quantity: "6",
      spec: "NSI GBK21 - 21-terminal ground bar kit, installed in each manhole and handhole for conductor bonding",
      unitPrice: 32.97,
    },
    // ── Concrete Encasement Materials ───────────────────────────────
    {
      item: "Red Concrete Dye",
      quantity: "12",
      spec: "Solomon Colors 11 - red concrete dye, 1 lb bag \u2014 dye duct bank concrete red for identification per AHJ requirements",
      unitPrice: 14.00,
    },
    // ── Warning Tape & Marking ──────────────────────────────────────
    {
      item: "Detectable Underground Warning Tape",
      quantity: "2000 ft",
      spec: "NSI EWDT-632 - 6 in. detectable underground warning tape, red, \u201cCAUTION BURIED ELECTRIC LINE BELOW\u201d, metallic tracer wire, placed 12 in. above duct bank per NEC 300.5(D)(3)",
      unitPrice: 0.18,
    },
    {
      item: "Non-Detectable Warning Tape",
      quantity: "500 ft",
      spec: "NSI EWT-632 - 6 in. non-detectable underground warning tape, red, secondary marking for shallow conduit runs",
      unitPrice: 0.08,
    },
    // ── Pulling Supplies ────────────────────────────────────────────
    {
      item: "Wire Pulling Lubricant (5 gal)",
      quantity: "2",
      spec: "Ideal 31-375 - Yellow 77 wire pulling lubricant, 5 gallon pail, for future conductor pulls through duct bank",
      unitPrice: 165.00,
    },
    {
      item: "Mule Tape (3/4 in.)",
      quantity: "3000 ft",
      spec: "Greenlee 452 - 3/4 in. polyester mule tape, 2500 lb tensile, installed in each conduit as pull line for future conductor installation",
      unitPrice: 0.15,
    },
    // ── PVC Cement & Primer ─────────────────────────────────────────
    {
      item: "PVC Cement (quart)",
      quantity: "6",
      spec: "REC 55985 - PVC heavy-duty cement, quart, for 4 in. Schedule 40/80 joints",
      unitPrice: 18.50,
    },
    {
      item: "PVC Primer (quart)",
      quantity: "6",
      spec: "REC 55981 - purple PVC primer, quart, required before cementing per code \u2014 purple stain confirms primed joint at inspection (verify PN)",
      unitPrice: 10.25,
    },
    // ── Miscellaneous ───────────────────────────────────────────────
    {
      item: "Conduit Sealing Compound",
      quantity: "4",
      spec: "PECO DS5 - duct seal compound, 5 lb, seal conduit entries at manholes, handholes, and building penetrations",
      unitPrice: 22.00,
    },
    {
      item: "Manhole Pulling Iron / Eye Bolt",
      quantity: "6",
      spec: "CDW MPI34 - 3/4 in. forged pulling iron / eye bolt, anchored in manhole walls for cable pulling rigging",
      unitPrice: 45.00,
    },
    {
      item: "Cable Rack / Stanchion (Manhole)",
      quantity: "8",
      spec: "CDW CRA3 - 3-arm cable rack stanchion, mounted in manholes for cable support and organization after pull",
      unitPrice: 38.00,
    },
  ],
  blueprintNotes: [
    "Duct bank layout per site civil drawings \u2014 verify routing with structural and civil engineer before excavation",
    "Minimum 24 in. cover over top of duct bank \u2014 increase to 36 in. under roadways and parking areas",
    "Concrete encasement: 3500 PSI minimum, 3 in. minimum cover around all conduits, red-dyed for identification",
    "Spacers every 5 ft to maintain 3 in. conduit separation throughout entire run",
    "Install spare conduits: minimum 2 spare 4 in. conduits per duct bank for future capacity \u2014 cap and install mule tape",
    "PVC Schedule 80 required at road crossings, driveways, and any area subject to vehicular traffic or physical damage",
    "RMC transition: PVC-to-RMC adapter at 5 ft below grade, RMC continues to 18 in. above slab at building entry",
    "Manholes sized for cable bend radius \u2014 600V+ cables require 12\u00d7 cable OD minimum bend radius",
    "Grounding grid: 2/0 bare copper at 20 ft spacing, 10 ft ground rods at intersections, all connections exothermic welded per IEEE 80",
    "Ground grid must bond to building steel, water pipe, Ufer electrode, and all metallic conduit entering building",
    "Detectable warning tape 12 in. above duct bank on ALL runs \u2014 inspector will verify",
    "Fiber/low-voltage innerduct in dedicated 2 in. PVC conduit \u2014 maintain 12 in. separation from power where not in shared bank",
    "Install pull line (mule tape) in every conduit \u2014 including spares \u2014 before backfill",
    "Coordinate with utility for transformer pad location before beginning excavation \u2014 long lead item",
    "OSHA trench safety: shoring or trench box required for excavations over 5 ft deep",
    "Adjust all quantities based on actual site survey, run lengths, and number of buildings served",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
