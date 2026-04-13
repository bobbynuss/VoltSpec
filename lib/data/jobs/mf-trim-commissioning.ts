import type { Job } from "../types";
import { diagram } from "../diagrams/mf-trim-commissioning";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "mf-trim-commissioning",
  label: "Multifamily Build-Out – Phase 7: Trim-Out & Commissioning",
  requirements: [
    "NEC 2026 Art. 110.14(D): Torque requirements — all terminations torqued to manufacturer specifications",
    "NEC 2026 Art. 408.36: Panel directories — complete, legible, typed circuit identification at each panel",
    "NEC 2026 Art. 314.25: Covers and canopies — all outlet boxes must have proper cover plates installed",
    "NEC 2026 Art. 406.6: Receptacle faceplates — required on all receptacle outlets, breakage-free",
    "NEC 2026 Art. 404.9(B): Switch faceplates — grounding-type required if metal, proper fit",
    "NEC 2026 Art. 210.12: AFCI verification — test each AFCI breaker per manufacturer instructions",
    "NEC 2026 Art. 210.8: GFCI verification — test each GFCI device/breaker, verify trip and reset",
    "NFPA 72: Fire alarm system acceptance test — 100% device verification with fire marshal witness",
    "IBC 1008: Emergency lighting — 90-minute full discharge test, documented results",
    "Local AHJ: final electrical inspection required before certificate of occupancy — all units and common areas",
    "Utility: meter release and permanent service energization — coordinate with utility for service cutover",
  ],
  materials: [
    // ── Finish Devices (per unit) ───────────────────────────────
    { item: "Decorator Wall Plate (1-gang)", quantity: "per plan", spec: "Eaton PJS26W-10-L — decorator/GFCI wall plate, 1-gang, white, screwless — receptacles and switches", unitPrice: 1.25 },
    { item: "Decorator Wall Plate (2-gang)", quantity: "per plan", spec: "Eaton PJS262W — decorator wall plate, 2-gang, white, screwless — double switch/outlet locations", unitPrice: 2.50 },
    { item: "Blank Wall Plate", quantity: "per plan", spec: "Eaton PJ13W-10-L — blank wall plate, 1-gang, white — unused box covers", unitPrice: 0.85 },
    // ── Light Fixtures (per unit) ───────────────────────────────
    { item: "LED Recessed Downlight 6 in.", quantity: "per plan", spec: "Lithonia WF6-LED-30K-MW-M6 — 6 in. LED wafer downlight, 3000K, IC-rated, new construction housing — kitchens, baths, hallways", unitPrice: 24.00 },
    { item: "LED Recessed Downlight 4 in.", quantity: "per plan", spec: "Lithonia WF4-LED-30K-MW-M6 — 4 in. LED wafer downlight, 3000K — closets, small rooms", unitPrice: 18.00 },
    { item: "LED Flush Mount Ceiling", quantity: "per plan", spec: "Lithonia FMML-13-840-M4 — 13 in. LED flush mount, 4000K, 1400 lumens — bedrooms, living rooms", unitPrice: 28.00 },
    { item: "Ceiling Fan (52 in.)", quantity: "per plan", spec: "Hunter 53237 — 52 in. ceiling fan with light kit, 3-speed pull chain, white — living room locations", unitPrice: 125.00 },
    { item: "Bath Vanity Light", quantity: "per plan", spec: "Sea Gull 4428803-962 — 3-light bath vanity fixture, brushed nickel, LED compatible — above mirror", unitPrice: 55.00 },
    { item: "Under-Cabinet LED Strip", quantity: "per plan", spec: "GE 38846 — 24 in. LED under-cabinet light, hardwired, 3000K, dimmable — kitchen countertop task lighting", unitPrice: 32.00 },
    // ── Appliance Connections ───────────────────────────────────
    { item: "Dishwasher Power Cord", quantity: "per unit", spec: "Eastman 61313 — dishwasher power cord, 6 ft, 3-prong, right angle, 15A — GFCI protected circuit", unitPrice: 12.00 },
    { item: "Disposal Power Cord", quantity: "per unit", spec: "Eastman 61315 — garbage disposal power cord, 3 ft, 3-prong, 15A", unitPrice: 10.00 },
    { item: "Range Hood", quantity: "per unit", spec: "Broan-NuTone 413004 — 30 in. under-cabinet range hood, white, non-ducted, 120V hardwired", unitPrice: 65.00 },
    // ── Smoke/CO Detectors ──────────────────────────────────────
    { item: "Smoke/CO Combo Detector", quantity: "3 per unit", spec: "Kidde i12010SCO — hardwired smoke/CO combo detector, 120V with battery backup, interconnectable — bedrooms + hallway", unitPrice: 38.00 },
    // ── Testing Equipment ───────────────────────────────────────
    { item: "Receptacle Tester", quantity: "1", spec: "Klein RT210 — GFCI receptacle tester with LCD, tests wiring, GFCI trip, and voltage — every outlet", unitPrice: 28.00 },
    { item: "Voltage Tester", quantity: "1", spec: "Fluke T6-600 — FieldSense voltage and current tester — panel and feeder verification", unitPrice: 285.00 },
    { item: "Megger (insulation tester)", quantity: "1", spec: "Fluke 1587FC — insulation multimeter, 50-1000V test, Bluetooth — feeder insulation testing", unitPrice: 895.00 },
    { item: "Torque Screwdriver", quantity: "1", spec: "Klein 57010 — torque screwdriver, 20-120 in-lb — breaker and lug terminations per NEC 110.14(D)", unitPrice: 85.00 },
    // ── Labeling ────────────────────────────────────────────────
    { item: "Panel Directory Label Kit", quantity: "per panel", spec: "Brady 95543 — adhesive panel directory label kit — typed schedule required for ALL panels", unitPrice: 12.00 },
    { item: "Wire/Cable Labels", quantity: "1", spec: "Brady WML-511-502 — self-laminating wire marker labels, 500/roll — feeders, homerun labels, panel identification", unitPrice: 45.00 },
    // ── Misc ────────────────────────────────────────────────────
    { item: "Wire Nuts (assorted)", quantity: "1 box", spec: "Ideal 30-074 — Twister wire connector assortment, 100-count — trim connections", unitPrice: 18.00 },
    { item: "Electrical Tape", quantity: "6", spec: "3M 1700 — Temflex vinyl electrical tape, 3/4 in. x 60 ft", unitPrice: 2.50 },
    { item: "Touch-Up Paint (white)", quantity: "1", spec: "Rust-Oleum 249090 — painter's touch white spray, device and plate touch-up after installation", unitPrice: 6.50 },
  ],
  blueprintNotes: [
    "Trim-out is the final installation phase — all rough-in and panels must be inspected and approved before starting",
    "Install all devices before calling for final inspection — no open/exposed boxes permitted",
    "Torque ALL breaker and lug terminations per manufacturer specs — NEC 110.14(D) is enforced at inspection",
    "Panel schedules: typed, complete, accurate — use VoltSpec PDF export for professional panel directories",
    "AFCI test: press test button on each AFCI breaker, verify trip, reset — document results",
    "GFCI test: test each GFCI receptacle and breaker, verify downstream protection where applicable",
    "Smoke/CO: test interconnection per unit — activate one detector, all in unit must alarm",
    "Fire alarm: full system acceptance test with fire marshal — 100% device verification required",
    "Emergency lighting: 90-minute full discharge test — document all fixtures, battery condition",
    "Coordinate final inspection: AHJ, fire marshal, utility meter release — typically 3 separate inspections",
    "Certificate of occupancy requires ALL inspections passed — electrical, fire, mechanical, plumbing",
    "Adjust fixture types and quantities to actual finish schedule from architect/owner selections",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
