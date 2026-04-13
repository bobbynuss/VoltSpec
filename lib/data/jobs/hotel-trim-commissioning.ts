import type { Job } from "../types";
import { diagram } from "../diagrams/hotel-trim-commissioning";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "hotel-trim-commissioning",
  label: "Hotel Build-Out – Phase 7: Trim-Out & Commissioning",
  requirements: [
    "NEC 2026 Art. 110.14(D): Torque all terminations to manufacturer specifications — enforced at inspection",
    "NEC 2026 Art. 408.36: Panel directories — complete, typed circuit identification at EVERY panel",
    "NEC 2026 Art. 314.25: All outlet boxes must have proper cover plates — no exposed boxes anywhere",
    "NEC 2026 Art. 406.6: Receptacle faceplates on all outlets — breakage-free, properly fitted",
    "NEC 2026 Art. 210.8: GFCI verification — test every GFCI device and breaker, document results",
    "NFPA 72: Fire alarm acceptance test — 100% device verification with fire marshal witness",
    "NFPA 110: Generator commissioning — load bank test, transfer switch verification, fuel system check",
    "IBC 1008: Emergency lighting — 90-minute full discharge test with documentation",
    "NEC 2026 Art. 620: Elevator — safety test with elevator inspector, car-top disconnect, shunt trip",
    "Hotel brand QC: many brands require brand inspector walkthrough before opening — verify standards met",
    "AHJ final electrical, fire marshal, health dept (kitchen/pool), utility — all must pass for CO",
  ],
  materials: [
    // ── Guest Room Fixtures ─────────────────────────────────────
    { item: "LED Recessed Downlight 4 in.", quantity: "per plan", spec: "Lithonia WF4-LED-30K-MW-M6 — 4 in. LED wafer, 3000K — entry, closet, bathroom locations", unitPrice: 18.00 },
    { item: "LED Recessed Downlight 6 in.", quantity: "per plan", spec: "Lithonia WF6-LED-30K-MW-M6 — 6 in. LED wafer, 3000K — main room, per design", unitPrice: 24.00 },
    { item: "Wall Sconce (bedside)", quantity: "2 per room", spec: "Per hotel brand specification — bedside reading sconces, hardwired, switched — coordinate with interior designer", unitPrice: 85.00 },
    { item: "Bath Vanity Light", quantity: "1 per room", spec: "Sea Gull 4428803-962 — 3-light bath vanity, brushed nickel — or per brand spec", unitPrice: 55.00 },
    // ── Wall Plates ─────────────────────────────────────────────
    { item: "Decorator Wall Plate (1-gang)", quantity: "per plan", spec: "Eaton PJS26W-10-L — screwless decorator plate, white — per brand standard color", unitPrice: 1.25 },
    { item: "Decorator Wall Plate (2-gang)", quantity: "per plan", spec: "Eaton PJS262W — 2-gang screwless plate, white", unitPrice: 2.50 },
    // ── Common Area Fixtures ────────────────────────────────────
    { item: "4 ft LED Strip/Wrap (corridor)", quantity: "per plan", spec: "Lithonia FMLWL-48-840 — 4 ft LED wrap, 4000K — corridor and BOH lighting", unitPrice: 38.00 },
    { item: "LED Exit/Emergency Combo", quantity: "per plan", spec: "Lithonia LHQM-LED-R-M6 — exit with emergency heads, 90-min battery", unitPrice: 65.00 },
    { item: "Lobby Decorative Fixtures", quantity: "per plan", spec: "Per interior design specification — chandeliers, pendants, cove lighting — budget per owner/designer selections" },
    // ── Equipment Connections ────────────────────────────────────
    { item: "Dishwasher Cord", quantity: "per room", spec: "Eastman 61313 — dishwasher power cord, 6 ft — if rooms have kitchenette", unitPrice: 12.00 },
    { item: "PTAC Final Connection Kit", quantity: "per room", spec: "Includes whip verification, thermostat hookup, and operational test — labor item, no material cost", unitPrice: 0 },
    // ── Testing Equipment ───────────────────────────────────────
    { item: "Receptacle Tester", quantity: "2", spec: "Klein RT210 — GFCI tester with LCD — test every outlet, every room", unitPrice: 28.00 },
    { item: "Voltage Tester", quantity: "1", spec: "Fluke T6-600 — FieldSense tester — panel and feeder verification", unitPrice: 285.00 },
    { item: "Megger (insulation tester)", quantity: "1", spec: "Fluke 1587FC — insulation multimeter — feeder and riser testing", unitPrice: 895.00 },
    { item: "Torque Screwdriver", quantity: "2", spec: "Klein 57010 — 20-120 in-lb torque screwdriver — breaker and lug terminations", unitPrice: 85.00 },
    { item: "Infrared Thermometer", quantity: "1", spec: "Fluke 62 MAX — IR thermometer — verify connection temperatures under load after energization", unitPrice: 125.00 },
    // ── Labeling ────────────────────────────────────────────────
    { item: "Panel Directory Label Kit", quantity: "per panel", spec: "Brady 95543 — panel directory label kit — ALL panels, every floor, every room with panel", unitPrice: 12.00 },
    { item: "Wire/Cable Labels", quantity: "2", spec: "Brady WML-511-502 — self-laminating wire markers, 500/roll — feeder and homerun identification", unitPrice: 45.00 },
    // ── Misc ────────────────────────────────────────────────────
    { item: "Wire Nuts (assorted)", quantity: "2 boxes", spec: "Ideal 30-074 — Twister assortment, 100-count — trim connections", unitPrice: 18.00 },
    { item: "Electrical Tape", quantity: "12", spec: "3M 1700 — Temflex vinyl, 3/4 in. x 60 ft", unitPrice: 2.50 },
  ],
  blueprintNotes: [
    "Room trim: install in a logical sequence — devices first, then plates, then fixtures, then test",
    "Brand QC: many hotel brands (Marriott, Hilton, IHG) require brand-specific inspection before opening",
    "Torque ALL terminations — NEC 110.14(D) enforced, especially at switchgear, panels, and large feeders",
    "Generator commissioning: full load bank test, ATS transfer test (normal-to-emergency and back), document",
    "Fire alarm: 100% acceptance test — every device activated, every notification appliance verified, with fire marshal",
    "Emergency lighting: 90-minute discharge test — log every fixture, battery condition, and pass/fail",
    "Pool/spa: bonding verification before filling — inspect bonding grid, equipotential bonding, GFCI",
    "Elevator: safety test with certified elevator inspector — separate from electrical inspection",
    "Kitchen: health department may need to inspect equipment electrical connections before CO",
    "Panel schedules: VoltSpec PDF export for professional typed directories at every panel",
    "Punchlist: walk every room with a checklist — outlets, lights, switches, PTAC, smoke detector",
    "Coordinate final inspections: AHJ, fire marshal, health dept, elevator, utility — typically 1-2 weeks for all",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
