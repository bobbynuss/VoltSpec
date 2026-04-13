import type { Job } from "../types";
import { diagram } from "../diagrams/res-rough-in-dedicated";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "res-rough-in-dedicated",
  label: "New Home Build – Phase 3: Dedicated Circuits & HVAC",
  requirements: [
    "NEC 2026 Art. 220.55: Range/oven demand calculation — 50A circuit standard for residential range",
    "NEC 2026 Art. 422.16(B)(2): Dishwasher — dedicated 20A circuit, GFCI protection required per 2026 code",
    "NEC 2026 Art. 210.11(C)(3): Dedicated 20A laundry circuit — no other outlets on this circuit",
    "NEC 2026 Art. 440: HVAC equipment — dedicated circuit per nameplate, disconnect within sight",
    "NEC 2026 Art. 440.14: HVAC disconnect — within sight and within 50 ft of equipment",
    "NEC 2026 Art. 422.12: Electric water heater — dedicated circuit, 125% of nameplate rating",
    "NEC 2026 Art. 625: EV charging — dedicated 50A circuit if EV-ready, GFCI on cord-and-plug EVSE",
    "NEC 2026 Art. 210.52(E): Outdoor receptacles — minimum 2 required (front + rear), GFCI protected",
    "NEC 2026 Art. 210.52(G): Garage — minimum 1 GFCI receptacle per car space + 1 for garage door opener",
    "All dedicated circuits: homerun from panel, properly sized conductor, no shared neutrals",
    "Coordinate with HVAC contractor for condenser location, wire size per nameplate MCA/MOP",
  ],
  materials: [
    // ── Kitchen Dedicated ───────────────────────────────────────
    { item: "6/3 NM-B (Range)", quantity: "40 ft", spec: "Southwire 6/3 NM-B - 6 AWG 3-conductor + ground, 50A range/oven circuit, sold per ft" },
    { item: "12/2 NM-B (Dishwasher)", quantity: "40 ft", spec: "Southwire 12/2 NM-B - 12 AWG, 20A dedicated dishwasher circuit, GFCI protected, sold per ft" },
    { item: "12/2 NM-B (Disposal)", quantity: "15 ft", spec: "Southwire 12/2 NM-B - 12 AWG, 20A dedicated garbage disposal, sold per ft" },
    { item: "12/2 NM-B (Refrigerator)", quantity: "30 ft", spec: "Southwire 12/2 NM-B - 12 AWG, 20A dedicated refrigerator, sold per ft" },
    { item: "12/2 NM-B (Microwave)", quantity: "25 ft", spec: "Southwire 12/2 NM-B - 12 AWG, 20A dedicated over-the-range microwave, sold per ft" },
    // ── Laundry ─────────────────────────────────────────────────
    { item: "12/2 NM-B (Washer)", quantity: "30 ft", spec: "Southwire 12/2 NM-B - 12 AWG, 20A dedicated washer circuit, sold per ft" },
    { item: "10/3 NM-B (Dryer)", quantity: "30 ft", spec: "Southwire 10/3 NM-B - 10 AWG 3-conductor + ground, 30A 240V dryer circuit, sold per ft" },
    // ── HVAC ────────────────────────────────────────────────────
    { item: "8/2 NM-B (A/C Condenser)", quantity: "50 ft", spec: "Southwire 8/2 NM-B - 8 AWG 2-conductor + ground, 40A 240V A/C condenser (verify MCA on nameplate), sold per ft" },
    { item: "12/2 NM-B (Air Handler)", quantity: "30 ft", spec: "Southwire 12/2 NM-B - 12 AWG, 20A air handler / furnace circuit, sold per ft" },
    { item: "HVAC Disconnect 60A", quantity: "1", spec: "Eaton DPU222RP - 60A pullout non-fused disconnect, NEMA 3R, within sight of condenser", unitPrice: 32.00 },
    { item: "HVAC Whip (liquid-tight)", quantity: "1", spec: "Southwire 55189407 - 3/4 in. x 6 ft liquid-tight flex whip, pre-wired 8 AWG, disconnect to condenser", unitPrice: 28.00 },
    // ── Water Heater ────────────────────────────────────────────
    { item: "10/2 NM-B (Water Heater)", quantity: "30 ft", spec: "Southwire 10/2 NM-B - 10 AWG 2-conductor + ground, 30A 240V electric water heater, sold per ft" },
    // ── EV Ready ────────────────────────────────────────────────
    { item: "6/3 NM-B (EV Ready)", quantity: "40 ft", spec: "Southwire 6/3 NM-B - 6 AWG 3-conductor + ground, 50A 240V EV charger circuit to garage, sold per ft" },
    // ── Outdoor ─────────────────────────────────────────────────
    { item: "12/2 NM-B (Outdoor receps)", quantity: "60 ft", spec: "Southwire 12/2 NM-B - 12 AWG, 20A GFCI outdoor receptacle circuits (front + rear), sold per ft" },
    // ── Garage ──────────────────────────────────────────────────
    { item: "12/2 NM-B (Garage receps)", quantity: "40 ft", spec: "Southwire 12/2 NM-B - 12 AWG, 20A GFCI garage receptacle circuits, sold per ft" },
    { item: "14/2 NM-B (Garage lights)", quantity: "40 ft", spec: "Southwire 14/2 NM-B - 14 AWG, 15A garage lighting + garage door opener, sold per ft" },
    // ── Receptacles for dedicated circuits ───────────────────────
    { item: "50A Range Receptacle", quantity: "1", spec: "Eaton 1258-SP - 50A 125/250V NEMA 14-50R flush mount receptacle — range/oven", unitPrice: 16.50 },
    { item: "30A Dryer Receptacle", quantity: "1", spec: "Eaton 38B-BOX - 30A 125/250V NEMA 14-30R flush mount receptacle — electric dryer", unitPrice: 14.50 },
    { item: "50A EV Receptacle", quantity: "1", spec: "Eaton 1258-SP - 50A 125/250V NEMA 14-50R flush mount receptacle — EV charger ready", unitPrice: 16.50 },
    { item: "WR GFCI Receptacle (outdoor)", quantity: "3", spec: "Eaton TWRGF20W - 20A 125V TR weather-resistant GFCI — front, rear, and garage exterior", unitPrice: 28.34 },
    { item: "In-Use Outdoor Cover", quantity: "3", spec: "Taymac MM420C - extra-duty while-in-use weatherproof cover", unitPrice: 11.47 },
    // ── Misc ────────────────────────────────────────────────────
    { item: "NM Cable Connector", quantity: "30", spec: "Bridgeport 630-NM - 1/2 in. NM connector", unitPrice: 0.45 },
    { item: "NM Cable Staples", quantity: "100", spec: "Gardner Bender PS-150B - 1/2 in. NM staples", unitPrice: 0.10 },
    { item: "Nail Plates", quantity: "15", spec: "Simpson Strong-Tie PNAP - nail plates for drilled studs", unitPrice: 0.35 },
  ],
  blueprintNotes: [
    "Range: 50A circuit with NEMA 14-50R — homerun from panel, no shared circuits",
    "Dishwasher: 20A GFCI per 2026 NEC — can use GFCI breaker or GFCI receptacle under sink",
    "HVAC condenser: wire size per nameplate MCA (minimum circuit ampacity) — 8 AWG / 40A typical for 3-5 ton",
    "HVAC disconnect: within sight AND within 50 ft of condenser — pullout style standard",
    "Dryer: 30A 240V with 4-wire connection (NEMA 14-30R) — no 3-wire in new construction",
    "EV-ready: stub 50A 240V to garage even if not installing charger now — future-proofing",
    "Outdoor: minimum 2 GFCI receptacles (front + rear) — code minimum, add more per builder spec",
    "Garage: GFCI on ALL receptacles per NEC 210.8(A)(2), including garage door opener",
    "Water heater: 30A 240V for electric — if gas, still need 120V circuit for power vent models",
    "All wire sold per ft — adjust quantities for actual home layout and distances",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
