import type { Job } from "../types";
import { diagram } from "../diagrams/pole-light-takeoff";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "pole-light-takeoff",
  label: "Pole Light Takeoff – Parking Lot / Site Lighting",
  requirements: [
    "NEC 2026 Art. 225: Outside branch circuits and feeders — overcurrent protection, conductor sizing, and support requirements",
    "NEC 2026 Art. 225.18: Minimum clearance of overhead spans — 18 ft over public roads, 12 ft over residential driveways",
    "NEC 2026 Art. 410: Luminaire installation — grounding, wiring methods, and environmental ratings for outdoor wet locations",
    "NEC 2026 Art. 410.36: Luminaires in wet/damp locations must be marked 'suitable for wet locations' and installed to prevent water entry",
    "NEC 2026 Art. 300.5: Underground burial depth — 24 in. for direct burial, 18 in. for rigid/IMC, 12 in. for PVC with GFCI protection",
    "NEC 2026 Art. 300.5(D)(4): Underground splices must be listed for direct burial or in listed enclosures",
    "NEC 2026 Art. 314.29: Boxes and conduit bodies used as pull/junction must remain accessible (hand holes)",
    "NEC 2026 Art. 250.52: Grounding electrode at each pole — ground rod or concrete-encased electrode (Ufer ground)",
    "NEC 2026 Art. 215.2: Feeder conductor sizing — voltage drop not to exceed 3% feeder + 2% branch (5% total)",
    "IES RP-8: Recommended Practice for Roadway Lighting — use as reference for photometric layouts",
    "Pole foundation design per local wind load requirements — engineer-stamped base design for poles over 20 ft",
    "All fixtures must be DLC (DesignLights Consortium) listed for utility rebate eligibility where available",
    "Permit: site electrical permit required, photometric plan may be required by AHJ for parking lot lighting",
  ],
  materials: [
    // ── Poles ──────────────────────────────────────────────────────
    {
      item: "15 ft Steel Round Pole",
      quantity: "per plan",
      spec: "Valmont STR-R15-4-11G — 15 ft round straight steel pole, 4 in. shaft OD, 11-gauge wall, hot-dip galvanized, anchor base, hand hole, with base cover — walkway and small lot applications",
      unitPrice: 485.00,
    },
    {
      item: "20 ft Steel Round Pole",
      quantity: "per plan",
      spec: "Valmont STR-R20-4-11G — 20 ft round straight steel pole, 4 in. shaft OD, 11-gauge wall, hot-dip galvanized, anchor base, hand hole, with base cover — standard parking lot",
      unitPrice: 625.00,
    },
    {
      item: "25 ft Steel Round Pole",
      quantity: "per plan",
      spec: "Valmont STR-R25-5-7G — 25 ft round straight steel pole, 5 in. shaft OD, 7-gauge wall, hot-dip galvanized, anchor base, hand hole, with base cover — medium parking lot / commercial",
      unitPrice: 820.00,
    },
    {
      item: "30 ft Steel Round Pole",
      quantity: "per plan",
      spec: "Valmont STR-R30-6-7G — 30 ft round tapered steel pole, 6 in. shaft OD, 7-gauge wall, hot-dip galvanized, anchor base, hand hole, with base cover — large lot / high-mount application",
      unitPrice: 1150.00,
    },
    // ── Mounting Arms ──────────────────────────────────────────────
    {
      item: "Single Tenon Adapter",
      quantity: "per plan",
      spec: "Valmont RTA-1 — single round tenon top adapter, 2-3/8 in. OD tenon, for 1-head configuration, fits 4-6 in. poles",
      unitPrice: 45.00,
    },
    {
      item: "2-Arm Bracket",
      quantity: "per plan",
      spec: "Valmont RBA-2-180 — 2-arm bullhorn bracket, 180° spread, 2-3/8 in. tenon at each arm, for 2-head configuration",
      unitPrice: 185.00,
    },
    {
      item: "3-Arm Bracket",
      quantity: "per plan",
      spec: "Valmont RBA-3-120 — 3-arm bracket, 120° spread, 2-3/8 in. tenon at each arm, for 3-head configuration",
      unitPrice: 265.00,
    },
    {
      item: "4-Arm Bullhorn Bracket",
      quantity: "per plan",
      spec: "Valmont RBA-4-90 — 4-arm bullhorn bracket, 90° spread, 2-3/8 in. tenon at each arm, for 4-head configuration — large lot coverage",
      unitPrice: 340.00,
    },
    // ── LED Fixtures ───────────────────────────────────────────────
    {
      item: "LED Shoebox 100W (Small)",
      quantity: "per plan",
      spec: "Lithonia DSXF1-LED-P2-50K-T3M-MVOLT — LED shoebox area light, 100W, 13,000 lumens, 5000K, Type III medium distribution, 120-277V, slip fitter mount — walkway/pedestrian areas",
      unitPrice: 285.00,
    },
    {
      item: "LED Shoebox 200W (Medium)",
      quantity: "per plan",
      spec: "Lithonia DSXF2-LED-P3-50K-T3M-MVOLT — LED shoebox area light, 200W, 26,000 lumens, 5000K, Type III medium distribution, 120-277V, slip fitter mount — standard parking lot",
      unitPrice: 425.00,
    },
    {
      item: "LED Shoebox 300W (Large)",
      quantity: "per plan",
      spec: "Lithonia DSXF3-LED-P4-50K-T5W-MVOLT — LED shoebox area light, 300W, 39,000 lumens, 5000K, Type V wide distribution, 120-277V, slip fitter mount — large lot / high-mount",
      unitPrice: 595.00,
    },
    {
      item: "LED Flood/Area Light 150W",
      quantity: "per plan",
      spec: "Lithonia DSXF-LED-P2-50K-T4W-MVOLT — LED flood/area light, 150W, 20,000 lumens, 5000K, Type IV wide, 120-277V, trunnion or slip fitter — security / perimeter lighting",
      unitPrice: 345.00,
    },
    // ── Anchor Bolts & Base ────────────────────────────────────────
    {
      item: "Anchor Bolt Kit (4-bolt)",
      quantity: "per plan",
      spec: "Valmont ABK-4-1-30 — 4-bolt L-shaped anchor bolt kit, 1 in. x 30 in. galvanized, with template, nuts, and washers — matches standard round pole base",
      unitPrice: 85.00,
    },
    {
      item: "Pole Base Cover",
      quantity: "per plan",
      spec: "Valmont BC-4R — round aluminum base cover, fits 4-6 in. shaft poles, conceals anchor bolts and base plate",
      unitPrice: 42.00,
    },
    // ── Underground Wiring ─────────────────────────────────────────
    {
      item: "#8 THHN/THWN-2 Black",
      quantity: "per plan (ft)",
      spec: "COP THHN8STBK — #8 AWG THHN/THWN-2 stranded black, 600V, feeder circuit hot conductor from panel to poles, sold per ft",
    },
    {
      item: "#8 THHN/THWN-2 White",
      quantity: "per plan (ft)",
      spec: "COP THHN8STWH — #8 AWG THHN/THWN-2 stranded white, 600V, neutral conductor, sold per ft",
    },
    {
      item: "#10 THHN/THWN-2 Green",
      quantity: "per plan (ft)",
      spec: "COP THHN10STGN — #10 AWG THHN/THWN-2 stranded green, 600V, equipment grounding conductor, sold per ft",
    },
    {
      item: "#10 THHN/THWN-2 Black (up pole)",
      quantity: "per plan (ft)",
      spec: "COP THHN10STBK — #10 AWG THHN/THWN-2 stranded black, 600V, branch circuit up pole shaft to fixture(s), sold per ft",
    },
    {
      item: "#10 THHN/THWN-2 White (up pole)",
      quantity: "per plan (ft)",
      spec: "COP THHN10STWH — #10 AWG THHN/THWN-2 stranded white, 600V, neutral up pole shaft, sold per ft",
    },
    {
      item: "#10 THHN/THWN-2 Green (up pole)",
      quantity: "per plan (ft)",
      spec: "COP THHN10STGN — #10 AWG THHN/THWN-2 stranded green, 600V, EGC up pole shaft, sold per ft",
    },
    // ── Conduit ────────────────────────────────────────────────────
    {
      item: "1 in. Schedule 40 PVC Conduit",
      quantity: "per plan (ft)",
      spec: "PVC PVC1SCH40 — 1 in. Schedule 40 PVC conduit, 10 ft sticks, underground run between poles, minimum 18 in. burial per NEC 300.5",
      unitPrice: 4.25,
    },
    {
      item: "1 in. PVC 90° Sweep Ell",
      quantity: "per plan",
      spec: "PVF 1ELL90 — 1 in. Schedule 40 PVC 90° sweep ell, underground-to-vertical transitions at each pole base",
      unitPrice: 3.50,
    },
    {
      item: "1 in. PVC Coupling",
      quantity: "per plan",
      spec: "PVF CPL1 — 1 in. PVC coupling, conduit joins in underground runs",
      unitPrice: 1.25,
    },
    {
      item: "1 in. PVC Male Adapter",
      quantity: "per plan",
      spec: "PVF TA1 — 1 in. PVC terminal adapter (male), conduit to junction box entry at pole base",
      unitPrice: 1.85,
    },
    {
      item: "1 in. Rigid Nipple (pole base)",
      quantity: "per plan",
      spec: "CON 1NIP6RIG — 1 in. galvanized rigid nipple, 6 in., PVC-to-pole base transition, corrosion resistance at grade",
      unitPrice: 4.50,
    },
    // ── Photocell & Controls ───────────────────────────────────────
    {
      item: "Twist-Lock Photocell",
      quantity: "per plan",
      spec: "Intermatic EK4236S — twist-lock dusk-to-dawn photocell, 120-277V, ANSI C136.10, mounts on fixture — per-fixture control",
      unitPrice: 18.50,
    },
    {
      item: "Lighting Contactor 30A",
      quantity: "1",
      spec: "Eaton C30CNE20A0 — 30A 2-pole lighting contactor, 120V coil, NEMA 1, photocell-controlled — for centralized panel control of all pole circuits",
      unitPrice: 125.00,
    },
    {
      item: "Contactor Photocell (Panel Mount)",
      quantity: "1",
      spec: "Intermatic EK4036S — stem-mount photocell for contactor, 120-277V, mounts on panel exterior with weather shield",
      unitPrice: 22.00,
    },
    // ── Junction & Grounding ───────────────────────────────────────
    {
      item: "PVC Junction Box (at base)",
      quantity: "per plan",
      spec: "Cantex 5133710 — PVC junction box, 12x12x6 in., NEMA 4X, underground-rated, at each pole base for conductor splicing",
      unitPrice: 38.00,
    },
    {
      item: "5/8 x 8 ft Ground Rod",
      quantity: "per plan",
      spec: "Erico 615880 — 5/8 in. x 8 ft copper-bonded ground rod — one per pole base per NEC 250.52",
      unitPrice: 26.43,
    },
    {
      item: "Ground Rod Clamp",
      quantity: "per plan",
      spec: "NSI GRC58 — 5/8 in. ground rod bronze clamp, UL listed",
      unitPrice: 4.21,
    },
    {
      item: "Hand Hole Cover Gasket",
      quantity: "per plan",
      spec: "Valmont HHG-4 — replacement hand hole gasket for 4 in. hand hole opening, EPDM weatherproof",
      unitPrice: 8.50,
    },
    // ── Breakers ───────────────────────────────────────────────────
    {
      item: "2-Pole 20A Breaker (lighting circuit)",
      quantity: "per plan",
      spec: "Eaton CHF220 — CH 2-pole 20A breaker, one per pole lighting circuit or per contactor feed",
      unitPrice: 14.50,
    },
    {
      item: "2-Pole 30A Breaker (feeder)",
      quantity: "1",
      spec: "Eaton CHF230 — CH 2-pole 30A breaker, main feeder to lighting contactor (size per total fixture load)",
      unitPrice: 18.50,
    },
    // ── Miscellaneous ──────────────────────────────────────────────
    {
      item: "PVC Cement and Primer Kit",
      quantity: "1",
      spec: "Oatey 30246 — PVC cement + purple primer combo pack, for all PVC conduit joints",
      unitPrice: 12.50,
    },
    {
      item: "Duct Seal",
      quantity: "per plan",
      spec: "PECO DS1 — duct seal compound, 1 lb, seal conduit entries at each pole base and panel",
      unitPrice: 6.36,
    },
    {
      item: "Warning Tape (underground)",
      quantity: "per plan (ft)",
      spec: "Presco DOTD3105R612 — detectable underground warning tape, 'CAUTION BURIED ELECTRIC LINE BELOW', 6 in. wide, placed 12 in. above conduit",
      unitPrice: 0.12,
    },
    {
      item: "Wire Pulling Lubricant",
      quantity: "1",
      spec: "Ideal 31-371 — Yellow 77 wire pulling lubricant, 1 quart, for long underground conduit pulls",
      unitPrice: 18.00,
    },
    {
      item: "Anti-Oxidant Compound",
      quantity: "1",
      spec: "Ideal 30-030 — Noalox anti-oxidant compound, 8 oz, for all aluminum pole-to-wire connections if applicable",
      unitPrice: 12.75,
    },
  ],
  blueprintNotes: [
    "ADJUST POLE HEIGHTS per application: 15 ft (walkway), 20 ft (small lot), 25 ft (medium lot), 30 ft (large commercial lot)",
    "SELECT HEADS PER POLE: 1-head (walkway/accent), 2-head (parking rows), 3-head (intersections), 4-head (large area coverage)",
    "SCALE ALL 'per plan' QUANTITIES to actual pole count — multiply poles × per-pole items (ground rod, base, JB, etc.)",
    "Wire quantities: measure actual underground run + pole height + 10% slack at each junction point",
    "Photometric layout should be completed before ordering — fixture wattage and distribution type depend on pole spacing and mounting height",
    "IES recommends minimum 1.0 fc average for parking lots, 0.5 fc for walkways — verify with local AHJ requirements",
    "Pole spacing typically 3-4x mounting height (e.g., 25 ft poles → 75-100 ft spacing) — adjust per photometric plan",
    "Foundation design: poles over 20 ft typically require engineer-stamped base design per local wind load codes",
    "Underground conduit: maintain minimum 18 in. cover for PVC, use rigid/IMC at pole base transitions above grade",
    "Ground rod at each pole base — bond to EGC in conduit per NEC 250.52",
    "Consider centralized contactor control vs. per-fixture photocells — contactor is simpler for large installations",
    "DLC-listed fixtures qualify for utility rebates in most service territories — verify before ordering",
    "For 277V systems (commercial), adjust conductor sizing and breaker voltage accordingly",
    "Hand hole access must remain unobstructed after installation — orient toward service path",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
