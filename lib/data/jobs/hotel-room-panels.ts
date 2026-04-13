import type { Job } from "../types";
import { diagram } from "../diagrams/hotel-room-panels";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "hotel-room-panels",
  label: "Hotel Build-Out – Phase 5: Guest Room Panels & Low-Voltage",
  requirements: [
    "NEC 2026 Art. 408: Panelboard ratings — bus rating and overcurrent device count for floor panels",
    "NEC 2026 Art. 210.8: GFCI protection — bathroom circuits, within 6 ft of sink",
    "NEC 2026 Art. 440: PTAC/fan coil — dedicated 2-pole breaker per unit nameplate",
    "NEC 2026 Art. 408.36: Panel schedule — typed circuit directory at each floor panel",
    "NEC 2026 Art. 725: Class 2 low-voltage wiring — card readers, thermostats, data per Article 725",
    "NEC 2026 Art. 800: Communication circuits — Cat6A and coax installation requirements",
    "NEC 2026 Art. 300.11: Wiring support — low-voltage cables independently supported, not on ceiling grid",
    "Hotel brand standards: verify receptacle types, USB availability, and circuit sharing per brand specs",
    "Low-voltage contractor coordination: data, TV, card reader, thermostat — pull wires through Phase 4 stubs",
    "ADA rooms: specific circuit configurations per ADA/ABA — coordinated with brand compliance",
  ],
  materials: [
    // ── Floor Breakers ──────────────────────────────────────────
    { item: "2-Pole 30A Breaker (PTAC)", quantity: "per room", spec: "Eaton CHF230 - CH 2-pole 30A breaker — one per PTAC/fan coil unit, 240V dedicated", unitPrice: 18.50 },
    { item: "1-Pole 20A Breaker (receptacles)", quantity: "1 per 2 rooms", spec: "Eaton CHF120 - CH 1-pole 20A breaker — room receptacle circuit, 2 rooms per circuit typical", unitPrice: 8.50 },
    { item: "1-Pole 20A GFCI Breaker (bath)", quantity: "1 per 2 rooms", spec: "Eaton CHFP120GF - CH 1-pole 20A GFCI breaker — bathroom circuits, 2 rooms per circuit", unitPrice: 85.19 },
    { item: "1-Pole 15A Breaker (lighting)", quantity: "1 per 3 rooms", spec: "Eaton CHF115 - CH 1-pole 15A breaker — room lighting, 3 rooms per circuit typical", unitPrice: 8.50 },
    { item: "1-Pole 20A Breaker (mini-fridge)", quantity: "1 per 2 rooms", spec: "Eaton CHF120 - CH 1-pole 20A breaker — mini-fridge/microwave dedicated per 2 rooms", unitPrice: 8.50 },
    { item: "1-Pole 15A Breaker (corridor)", quantity: "2 per floor", spec: "Eaton CHF115 - CH 1-pole 15A breaker — corridor lighting and emergency egress", unitPrice: 8.50 },
    { item: "1-Pole 20A Breaker (fire alarm)", quantity: "1 per floor", spec: "Eaton CHF120 + lock-on - CH 1-pole 20A with handle lock — fire alarm NAC devices per floor", unitPrice: 14.50 },
    // ── Low-Voltage Cable ───────────────────────────────────────
    { item: "Cat6A Cable (plenum)", quantity: "per plan (ft)", spec: "Belden 10GXS12 — Cat6A U/UTP plenum cable, 23 AWG, blue jacket — 2 drops per room (desk + TV), sold per ft" },
    { item: "RG6 Coax Cable (plenum)", quantity: "per plan (ft)", spec: "Belden 1694P — RG6 plenum coax cable, 18 AWG — TV location, 1 per room, sold per ft" },
    { item: "18/2 Unshielded (card reader)", quantity: "per plan (ft)", spec: "West Penn 224 — 18/2 unshielded cable, plenum, for card reader/door lock low-voltage, sold per ft" },
    { item: "18/8 Thermostat Wire", quantity: "per plan (ft)", spec: "Honeywell CL3R 18/8 — 18 AWG 8-conductor thermostat cable, PTAC thermostat wiring, sold per ft" },
    // ── Low-Voltage Hardware ────────────────────────────────────
    { item: "Cat6A Keystone Jack", quantity: "2 per room", spec: "Belden AX104562 — Cat6A keystone jack, UTP, blue — desk and TV wall data drops", unitPrice: 12.50 },
    { item: "RG6 Coax Connector (F-type)", quantity: "1 per room", spec: "Belden 1694ABHD3 — RG6 BNC/F-type compression connector, TV wall", unitPrice: 3.50 },
    { item: "2-Gang Low-Voltage Bracket", quantity: "1 per room", spec: "Arlington LV2 — 2-gang low-voltage mounting bracket, old work — TV wall plate", unitPrice: 2.50 },
    { item: "Cat6A Patch Panel (24-port)", quantity: "per floor", spec: "Belden AX103254 — 24-port Cat6A patch panel, 1U rack mount — floor telecom closet", unitPrice: 185.00 },
    // ── Misc ────────────────────────────────────────────────────
    { item: "Panel Directory Label Kit", quantity: "per panel", spec: "Brady 95543 — panel directory label kit", unitPrice: 12.00 },
    { item: "J-Hooks (low-voltage support)", quantity: "per plan", spec: "B-Line BCH64 — 4 in. J-hook, supports Cat6A/coax bundles per NEC 300.11", unitPrice: 2.50 },
  ],
  blueprintNotes: [
    "Floor panel: 42-space typical for 12-room floor — PTAC takes 2 spaces each, adjust for room count",
    "Circuit sharing: receptacles share 2 rooms, lighting shares 3 rooms, baths share 2 rooms — per brand standards",
    "PTAC: always dedicated 2-pole 30A per room — never share HVAC circuits between rooms",
    "Low-voltage: pull through EMT stubs from Phase 4 — card reader, data, coax, thermostat",
    "Cat6A: 2 drops per room (desk + TV wall), homerun to floor telecom closet patch panel",
    "Card reader: 18/2 from above ceiling to door frame — door lock contractor terminates",
    "Thermostat: 18/8 for communicating PTAC thermostats — verify conductor count with HVAC spec",
    "Floor telecom closet: coordinate with IT — patch panels, switch, and Wi-Fi controller per floor",
    "ADA rooms: verify specific low-voltage requirements (visual notification devices, phone amplifier)",
    "Multiply breaker and cable quantities by actual room count per floor",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
