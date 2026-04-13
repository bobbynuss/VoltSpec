import type { Job } from "../types";
import { diagram } from "../diagrams/mf-unit-panels";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "mf-unit-panels",
  label: "Multifamily Build-Out – Phase 5: Unit Panels & Metering",
  requirements: [
    "NEC 2026 Art. 220: Branch-circuit, feeder, and service load calculations — per-unit load calc required",
    "NEC 2026 Art. 408: Panelboard ratings — bus rating, number of overcurrent devices, and marking requirements",
    "NEC 2026 Art. 210.12: AFCI protection required on all 120V 15/20A circuits in dwelling units (bedrooms, living, hallways, closets)",
    "NEC 2026 Art. 210.8: GFCI protection — kitchen (within 6 ft of sink), bathrooms, laundry, dishwasher",
    "NEC 2026 Art. 240.24(B): Panel accessibility — not located in bathrooms, clothes closets, or over stairs",
    "NEC 2026 Art. 408.36: Panel schedule required — typed circuit directory, updated and accurate at final inspection",
    "NEC 2026 Art. 215.2(A)(4): Feeder voltage drop — not to exceed 3% on feeder, 5% total (feeder + branch)",
    "NEC 2026 Art. 230.82: Metering equipment — utility-approved meter socket/CT cabinet configuration",
    "Utility metering: one revenue meter per unit — verify meter bank/CT cabinet model with local utility",
    "Load calculation per NEC Art. 220: general lighting (3 VA/sq ft) + small appliance (3,000 VA) + laundry (1,500 VA) + dedicated loads",
    "Permit: panel installation and metering inspection — panels must be energized for final inspection",
  ],
  materials: [
    // ── Unit Panels ─────────────────────────────────────────────
    { item: "100A Unit Panel (1BR)", quantity: "per unit", spec: "Eaton CHP20B100F - 20-space 100A CH main breaker panel, flush mount, NEMA 1 — typical 1BR/studio unit", unitPrice: 245.00 },
    { item: "125A Unit Panel (2BR+)", quantity: "per unit", spec: "Eaton CHP24B125F - 24-space 125A CH main breaker panel, flush mount, NEMA 1 — typical 2BR and larger units", unitPrice: 295.00 },
    // ── Metering ────────────────────────────────────────────────
    { item: "Meter Bank (4-position)", quantity: "per plan", spec: "Eaton 1MP4124RRLP - 4-position meter bank, 125A per position, 3-phase, ringless, utility-approved — one per 4 units, or as required by floor layout", unitPrice: 1650.00 },
    { item: "CT Cabinet (8-position)", quantity: "per plan", spec: "Eaton 1MM812RRLCTS - 8-position CT metering cabinet, 200A per position, 3-phase — for floors with 8+ units", unitPrice: 3200.00 },
    // ── AFCI Breakers ───────────────────────────────────────────
    { item: "1-Pole 15A AFCI Breaker", quantity: "5 per unit", spec: "Eaton CHFP115AF - CH 1-pole 15A combination AFCI breaker — bedrooms, living, hallway, closets per NEC 210.12", unitPrice: 45.00 },
    { item: "1-Pole 20A AFCI Breaker", quantity: "3 per unit", spec: "Eaton CHFP120AF - CH 1-pole 20A combination AFCI breaker — kitchen SABC, dining per NEC 210.12", unitPrice: 45.00 },
    // ── GFCI Breakers ───────────────────────────────────────────
    { item: "1-Pole 20A GFCI Breaker", quantity: "2 per unit", spec: "Eaton CHFP120GF - CH 1-pole 20A GFCI breaker — bathroom, dishwasher dedicated circuits", unitPrice: 85.19 },
    // ── Standard Breakers ───────────────────────────────────────
    { item: "1-Pole 20A Breaker", quantity: "2 per unit", spec: "Eaton CHF120 - CH 1-pole 20A breaker — refrigerator dedicated, laundry washer", unitPrice: 8.50 },
    { item: "1-Pole 15A Breaker", quantity: "2 per unit", spec: "Eaton CHF115 - CH 1-pole 15A breaker — general lighting, spare", unitPrice: 8.50 },
    { item: "2-Pole 30A Breaker", quantity: "1 per unit", spec: "Eaton CHF230 - CH 2-pole 30A breaker — electric dryer 240V circuit", unitPrice: 18.50 },
    { item: "2-Pole 40A Breaker", quantity: "1 per unit", spec: "Eaton CHF240 - CH 2-pole 40A breaker — HVAC 240V dedicated (verify nameplate)", unitPrice: 21.00 },
    // ── Feeder (meter bank to unit panel) ───────────────────────
    { item: "#2 AL XHHW-2 (per unit feeder)", quantity: "per plan (ft)", spec: "ALU XHHW2AL - #2 aluminum XHHW-2 600V, unit feeder hot conductors (2 per unit), sold per ft" },
    { item: "#6 AL XHHW-2 (neutral)", quantity: "per plan (ft)", spec: "ALU XHHW6AL - #6 aluminum XHHW-2 600V, unit feeder neutral, sold per ft" },
    { item: "#8 Copper THHN Green (EGC)", quantity: "per plan (ft)", spec: "COP THHN8STGN - #8 AWG THHN stranded green, equipment ground per unit feeder, sold per ft" },
    { item: "1-1/4 in. EMT Conduit", quantity: "per plan (ft)", spec: "CON EMT114 - 1-1/4 in. EMT conduit, 10 ft sticks, meter bank to unit panel feeders, sold per ft", unitPrice: 6.50 },
    { item: "1-1/4 in. EMT Connector", quantity: "per plan", spec: "Bridgeport 255-DC - 1-1/4 in. EMT die-cast connector", unitPrice: 3.50 },
    // ── Misc ────────────────────────────────────────────────────
    { item: "Panel Directory Label Kit", quantity: "per unit", spec: "Brady 95543 - adhesive panel directory label kit — typed schedule required at inspection", unitPrice: 12.00 },
    { item: "Anti-Oxidant Compound", quantity: "2", spec: "Ideal 30-030 - Noalox anti-oxidant compound, 8 oz, ALL aluminum feeder terminations", unitPrice: 12.75 },
    { item: "Torque Wrench (inch-lb)", quantity: "1", spec: "Klein 57010 - torque screwdriver, 20-120 in-lb, required for breaker and lug terminations per NEC 110.14(D)", unitPrice: 85.00 },
    { item: "Ground Bus Bar Kit", quantity: "per unit", spec: "Eaton GBKP1020 - ground bus bar kit, 10 terminals, per unit panel", unitPrice: 28.00 },
  ],
  blueprintNotes: [
    "Unit panel sizing: 100A for studio/1BR, 125A for 2BR+, 150A if EV-ready or all-electric — per NEC 220 load calc",
    "AFCI breakers: required on ALL 120V 15/20A circuits in dwelling units except bathrooms, kitchens, laundry, garage",
    "GFCI: use breaker-type for dishwasher and bath circuits — simplifies wiring vs. receptacle GFCI",
    "Meter bank/CT cabinet: coordinate model and position count with utility — order 6-8 weeks lead time",
    "Panel location: interior wall of utility/laundry closet typical — not in bathroom or clothes closet per NEC",
    "Feeder sizing per NEC 220 optional calculation for dwelling units — typically #2 AL for 100A, #1/0 AL for 125A",
    "Panel schedule: complete typed directory required at final inspection — use VoltSpec PDF export",
    "All aluminum terminations: anti-oxidant compound (Noalox) and proper torque per manufacturer specs",
    "Spare spaces: minimum 2 spare breaker spaces per panel for future circuits",
    "Multiply ALL 'per unit' quantities by total unit count for project totals",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
