import type { Job } from "../types";
import { diagram } from "../diagrams/hotel-room-roughin";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "hotel-room-roughin",
  label: "Hotel Build-Out – Phase 4: Guest Room Rough-In",
  requirements: [
    "NEC 2026 Art. 210.52: Receptacle outlet spacing — guest rooms treated as dwelling units for outlet requirements",
    "NEC 2026 Art. 210.60: Guest rooms/suites — receptacle outlet requirements for hotels and motels",
    "NEC 2026 Art. 210.8(A): GFCI required in bathrooms and within 6 ft of sinks",
    "NEC 2026 Art. 440: PTAC/fan coil unit — dedicated circuit per nameplate, disconnect accessible",
    "NEC 2026 Art. 314.16: Box fill calculations — proper sizing for all outlet and junction boxes",
    "NEC 2026 Art. 330: MC cable — required in hotel construction (Type I/II construction typically)",
    "NEC 2026 Art. 210.70: Lighting outlets — switched lighting at entry, bathroom, closet",
    "Card reader/door lock: low-voltage prep — conduit stub from above ceiling to door frame (Phase 5)",
    "PTAC sleeve: coordinate with HVAC contractor — electrical rough to sleeve location before drywall",
    "ADA rooms: additional outlets, specific heights per ADA/ABA Guidelines — coordinate with architect",
    "Rough-in inspection before drywall closure — all boxes, wiring, and supports visible",
  ],
  materials: [
    // ── Per-room quantities (multiply × room count) ─────────────
    // PTAC/HVAC
    { item: "PTAC Disconnect", quantity: "1 per room", spec: "Eaton DPU222RP - 60A pullout disconnect, non-fused, NEMA 3R — PTAC/fan coil accessible disconnect", unitPrice: 32.00 },
    { item: "PTAC Whip (liquid-tight)", quantity: "1 per room", spec: "Southwire 55189407 - 3/4 in. x 6 ft liquid-tight flex whip, pre-wired 10 AWG, disconnect to PTAC unit", unitPrice: 28.00 },
    // Bathroom
    { item: "20A GFCI Receptacle (bath)", quantity: "1 per room", spec: "Eaton TWRGF20W - 20A 125V TR GFCI receptacle — bathroom vanity, 1,875W hair dryer rated", unitPrice: 28.34 },
    { item: "Bath Exhaust Fan", quantity: "1 per room", spec: "Broan-NuTone AE110BF - 110 CFM bath exhaust fan, ENERGY STAR — hotel rooms need higher CFM for guest comfort", unitPrice: 85.00 },
    { item: "Heat Lamp (bath ceiling)", quantity: "1 per room", spec: "Broan-NuTone 161 - single-bulb ceiling-mount heat lamp, 250W — per brand standard (verify with owner)", unitPrice: 42.00 },
    // Room receptacles
    { item: "20A USB Receptacle (bedside)", quantity: "2 per room", spec: "Eaton TR7756W-BOX - 20A 125V TR duplex receptacle with USB-A+C, white — left and right bedside", unitPrice: 28.00 },
    { item: "20A USB Receptacle (desk)", quantity: "1 per room", spec: "Eaton TR7756W-BOX - 20A 125V TR duplex receptacle with USB-A+C, white — desk/work area", unitPrice: 28.00 },
    { item: "15A TR Duplex Receptacle", quantity: "4 per room", spec: "Eaton TR1107W-BOX - 15A 125V TR duplex receptacle — entry, TV wall, closet, mini-fridge", unitPrice: 1.85 },
    { item: "20A Receptacle (mini-fridge)", quantity: "1 per 2 rooms", spec: "Eaton TR1877W-BOX - 20A 125V TR duplex receptacle — dedicated mini-fridge/microwave circuit", unitPrice: 3.85 },
    // Switches
    { item: "Single-Pole Switch", quantity: "3 per room", spec: "Eaton 1301-7W-BOX - 15A single-pole toggle switch — entry, bathroom, closet", unitPrice: 2.15 },
    { item: "Dimmer Switch", quantity: "1 per room", spec: "Eaton DAL06P-C2-KB - decorator dimmer, 600W — main room lighting, adjustable for guest comfort", unitPrice: 18.50 },
    // Boxes
    { item: "4-Square Box Deep", quantity: "12 per room", spec: "Crouse-Hinds TP403 - 4 in. square 2-1/8 in. deep box", unitPrice: 4.44 },
    { item: "4-Square Raised Cover (duplex)", quantity: "8 per room", spec: "Crouse-Hinds TP516 - 4 in. square raised cover for duplex", unitPrice: 3.68 },
    { item: "4 in. Octagon Box (ceiling)", quantity: "3 per room", spec: "Crouse-Hinds TP302 - 4 in. octagon ceiling box", unitPrice: 3.25 },
    // Wiring
    { item: "12/2 MC Cable", quantity: "100 ft per room", spec: "Southwire MC 12/2 - 12 AWG 2-conductor + ground MC cable, 20A room circuits, sold per ft" },
    { item: "14/2 MC Cable", quantity: "150 ft per room", spec: "Southwire MC 14/2 - 14 AWG 2-conductor + ground MC cable, 15A lighting circuits, sold per ft" },
    { item: "10/2 MC Cable", quantity: "20 ft per room", spec: "Southwire MC 10/2 - 10 AWG 2-conductor + ground MC cable, PTAC 240V circuit, sold per ft" },
    // Low-voltage prep
    { item: "3/4 in. EMT Stub (card reader)", quantity: "1 per room", spec: "CON EMT34 - 3/4 in. EMT conduit stub, above ceiling to door frame — card reader/lock low-voltage prep", unitPrice: 3.50 },
    { item: "1 in. EMT Stub (TV/data)", quantity: "1 per room", spec: "CON EMT1 - 1 in. EMT conduit stub, above ceiling to TV wall — coax + data pull box prep", unitPrice: 4.25 },
    // Connectors
    { item: "MC Cable Connectors", quantity: "30 per room", spec: "Bridgeport 38ASP - 3/8 in. MC cable snap-in connector", unitPrice: 0.85 },
    { item: "MC Cable Staples", quantity: "50 per room", spec: "Caddy MSM50 - MC/BX cable support staple", unitPrice: 0.35 },
  ],
  blueprintNotes: [
    "ALL QUANTITIES ARE PER ROOM — multiply by total room count for floor/building totals",
    "PTAC: coordinate sleeve location with HVAC — electrical rough before drywall, whip connects later",
    "Bathroom GFCI: 20A required — hair dryer load is 1,875W, standard 15A will trip",
    "USB receptacles at both bedsides + desk — guest expectation for modern hotels",
    "Card reader prep: 3/4 in. EMT stub from above ceiling to door frame — low-voltage contractor pulls wire in Phase 5",
    "TV wall: 1 in. EMT stub for coax + data + HDMI — coordinates with AV/low-voltage Phase 5",
    "ADA rooms: receptacles at accessible heights (15-48 in. AFF), additional outlets per ADA Guidelines",
    "Mini-fridge circuit: one 20A circuit per 2 rooms typical — verify with brand standard",
    "Smoke detector: one per room + one per corridor — hardwired, interconnected per NFPA 72 (common area scope)",
    "Rough-in inspection before drywall — all boxes, wiring, MC cable supports per NEC 330.30",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
