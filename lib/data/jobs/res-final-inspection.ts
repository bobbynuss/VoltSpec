import type { Job } from "../types";
import { diagram } from "../diagrams/res-final-inspection";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "res-final-inspection",
  label: "New Home Build – Phase 5: Testing & Final Inspection",
  requirements: [
    "NEC 2026 Art. 110.14(D): All terminations torqued to manufacturer specifications — enforced at inspection",
    "NEC 2026 Art. 408.36: Panel schedule — complete, typed, accurate circuit directory posted at panel",
    "NEC 2026 Art. 210.12: Verify AFCI breakers trip correctly on all required circuits",
    "NEC 2026 Art. 210.8: Verify all GFCI devices/breakers trip and reset correctly",
    "NEC 2026 Art. 314.25: All boxes must have cover plates — no exposed/open boxes anywhere",
    "NEC 2026 Art. 250: Grounding system — verify continuity from panel to all electrodes and bonding connections",
    "NFPA 72: Smoke/CO detectors — interconnected, test all units, verify hardwired + battery backup",
    "Local AHJ: final electrical inspection required before certificate of occupancy",
    "Utility: meter release for permanent service — coordinate with utility for energization",
    "All appliances connected and operational — HVAC, water heater, range, dishwasher, disposal",
  ],
  materials: [
    // ── Testing Equipment ───────────────────────────────────────
    { item: "Receptacle Tester", quantity: "1", spec: "Klein RT210 — GFCI tester with LCD — test EVERY outlet in the house", unitPrice: 28.00 },
    { item: "Voltage Tester", quantity: "1", spec: "Fluke T6-600 — FieldSense voltage/current tester — panel, feeders, 240V circuits", unitPrice: 285.00 },
    { item: "Torque Screwdriver", quantity: "1", spec: "Klein 57010 — 20-120 in-lb torque screwdriver — breaker and lug terminations", unitPrice: 85.00 },
    // ── Labeling ────────────────────────────────────────────────
    { item: "Panel Directory Label Kit", quantity: "1", spec: "Brady 95543 — typed panel schedule required — NOT handwritten", unitPrice: 12.00 },
    { item: "Wire/Cable Labels", quantity: "1", spec: "Brady WML-511-502 — self-laminating wire markers — identify homeruns at panel", unitPrice: 45.00 },
    { item: "Arc Flash / Warning Label", quantity: "1", spec: "Brady 121087 — electrical panel warning label per NEC 110.16 (if required by AHJ)", unitPrice: 8.00 },
    // ── Touch-up / Final ────────────────────────────────────────
    { item: "Wire Nuts (assorted)", quantity: "1 box", spec: "Ideal 30-074 — Twister assortment — for any last touch-up connections", unitPrice: 18.00 },
    { item: "Electrical Tape", quantity: "3", spec: "3M 1700 — Temflex vinyl, 3/4 in. x 60 ft", unitPrice: 2.50 },
    { item: "Blank Plates (spare)", quantity: "3", spec: "Eaton PJ13W-10-L — blank 1-gang plates — for any unused box covers", unitPrice: 0.85 },
  ],
  blueprintNotes: [
    "TEST EVERY OUTLET — receptacle tester in every single outlet, no exceptions",
    "AFCI test: press test button on each AFCI breaker, verify it trips, then reset",
    "GFCI test: test each device/breaker, verify downstream outlets lose power",
    "Smoke/CO interconnection: trigger one detector, verify all detectors in house alarm",
    "Panel torque: all breaker and lug connections torqued per manufacturer table — NEC 110.14(D)",
    "Panel schedule: typed, complete, accurate — every circuit labeled, every spare marked",
    "Verify 240V circuits: range, dryer, HVAC, water heater, EV — measure voltage at receptacle/disconnect",
    "Exterior: test all outdoor GFCI receptacles, porch lights, flood lights, landscape power",
    "HVAC: run full cycle — heat and cool — verify thermostat control and proper operation",
    "Walk every room with checklist: lights on, switches correct, fans operational, outlets tested",
    "This phase is mostly labor + testing equipment — minimal material cost",
    "Certificate of Occupancy requires passing electrical inspection — coordinate with builder/GC",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
