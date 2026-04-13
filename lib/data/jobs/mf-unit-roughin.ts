import type { Job } from "../types";
import { diagram } from "../diagrams/mf-unit-roughin";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "mf-unit-roughin",
  label: "Multifamily Build-Out – Phase 4: Unit Rough-In",
  requirements: [
    "NEC 2026 Art. 210.11(C)(1): Two or more 20A small-appliance branch circuits required in kitchen/dining",
    "NEC 2026 Art. 210.11(C)(3): One 20A dedicated laundry circuit required",
    "NEC 2026 Art. 210.52: Receptacle outlet spacing — 6 ft rule for habitable rooms, 12 ft max between outlets",
    "NEC 2026 Art. 210.52(B): Kitchen countertop receptacles — within 24 in. of each countertop space, GFCI protected",
    "NEC 2026 Art. 210.8(A): GFCI required in bathrooms, kitchens (within 6 ft of sink), laundry, and all 120V outdoor outlets",
    "NEC 2026 Art. 210.12: AFCI protection required in bedrooms, living rooms, hallways, closets, and similar areas",
    "NEC 2026 Art. 422.16: Dishwasher — dedicated 20A circuit, GFCI protected per 2026 code",
    "NEC 2026 Art. 440: HVAC equipment — dedicated circuit per nameplate, disconnect within sight of unit",
    "NEC 2026 Art. 210.70: Lighting outlets — at least one switched outlet per habitable room, hallway, stairway, bathroom",
    "NEC 2026 Art. 314.16: Box fill calculations — proper box size for conductor count in each box",
    "NEC 2026 Art. 334 or 330: Wiring method — NM cable (if permitted by local code) or MC cable/EMT in multifamily",
    "Smoke/CO detectors: interconnected per unit, locations per NFPA 72 and local fire code — bedroom, hallway, each level",
    "Rough-in inspection required before drywall — all boxes, wiring, supports, and fire blocking must be visible",
  ],
  materials: [
    // ── Per-unit quantities (multiply × total units) ────────────
    // Kitchen
    { item: "20A GFCI Receptacle (kitchen)", quantity: "3 per unit", spec: "Eaton TWRGF20W - 20A 125V TR GFCI receptacle, kitchen countertop locations per NEC 210.52(B)", unitPrice: 28.34 },
    { item: "20A Receptacle (kitchen ded.)", quantity: "2 per unit", spec: "Eaton TR1877W-BOX - 20A 125V TR duplex receptacle, white, refrigerator + dishwasher dedicated circuits", unitPrice: 3.85 },
    // Bathroom
    { item: "20A GFCI Receptacle (bath)", quantity: "1 per unit", spec: "Eaton TWRGF20W - 20A 125V TR GFCI receptacle, bathroom vanity — GFCI required per NEC 210.8(A)(1)", unitPrice: 28.34 },
    { item: "Bath Exhaust Fan", quantity: "1 per unit", spec: "Broan-NuTone AE80BF - 80 CFM bath exhaust fan, ENERGY STAR, 4 in. duct, integral housing with junction box", unitPrice: 65.00 },
    // General receptacles
    { item: "15A TR Duplex Receptacle", quantity: "12 per unit", spec: "Eaton TR1107W-BOX - 15A 125V TR duplex receptacle, white, general purpose — bedrooms, living, hallway", unitPrice: 1.85 },
    { item: "15A TR Receptacle (AFCI ckt)", quantity: "8 per unit", spec: "Eaton TR1107W-BOX - 15A 125V TR duplex receptacle, white, on AFCI-protected bedroom/living circuits", unitPrice: 1.85 },
    // Switches
    { item: "Single-Pole Switch", quantity: "6 per unit", spec: "Eaton 1301-7W-BOX - 15A single-pole toggle switch, white, general lighting control", unitPrice: 2.15 },
    { item: "3-Way Switch", quantity: "2 per unit", spec: "Eaton 1303-7W-BOX - 15A 3-way toggle switch, white, hallway and living room", unitPrice: 3.50 },
    { item: "Dimmer Switch", quantity: "1 per unit", spec: "Eaton DAL06P-C2-KB - decorator dimmer switch, 600W, single-pole/3-way, living room or dining", unitPrice: 18.50 },
    // Boxes
    { item: "4-Square Box Deep", quantity: "25 per unit", spec: "Crouse-Hinds TP403 - 4 in. square 2-1/8 in. deep steel outlet box, receptacle and switch locations", unitPrice: 4.44 },
    { item: "4-Square Box Ext. Deep", quantity: "8 per unit", spec: "Crouse-Hinds TP453 - 4 in. square 2-1/8 in. extra deep box, high-fill locations (kitchen, bath)", unitPrice: 5.20 },
    { item: "4-Square Raised Cover (duplex)", quantity: "20 per unit", spec: "Crouse-Hinds TP516 - 4 in. square raised cover for duplex receptacle", unitPrice: 3.68 },
    { item: "4-Square Raised Cover (switch)", quantity: "8 per unit", spec: "Crouse-Hinds TP514 - 4 in. square raised cover for toggle switch", unitPrice: 3.68 },
    { item: "4 in. Octagon Box (ceiling)", quantity: "6 per unit", spec: "Crouse-Hinds TP302 - 4 in. octagon box, 1-1/2 in. deep, ceiling light outlet locations", unitPrice: 3.25 },
    { item: "Fan-Rated Ceiling Box", quantity: "1 per unit", spec: "Eaton BH-712 - fan/fixture rated ceiling box, 70 lb max, living room ceiling fan prep", unitPrice: 8.50 },
    // Wiring
    { item: "12/2 MC Cable", quantity: "250 ft per unit", spec: "Southwire MC 12/2 - 12 AWG 2-conductor + ground MC cable, 250 ft coil, kitchen/laundry 20A circuits, sold per ft" },
    { item: "14/2 MC Cable", quantity: "500 ft per unit", spec: "Southwire MC 14/2 - 14 AWG 2-conductor + ground MC cable, 250 ft coil, 15A general circuits, sold per ft" },
    { item: "14/3 MC Cable", quantity: "50 ft per unit", spec: "Southwire MC 14/3 - 14 AWG 3-conductor + ground MC cable, 3-way switch circuits, sold per ft" },
    { item: "10/2 MC Cable", quantity: "30 ft per unit", spec: "Southwire MC 10/2 - 10 AWG 2-conductor + ground MC cable, dryer circuit, sold per ft" },
    { item: "10/3 MC Cable", quantity: "30 ft per unit", spec: "Southwire MC 10/3 - 10 AWG 3-conductor + ground MC cable, HVAC circuit (240V), sold per ft" },
    // Dedicated circuits
    { item: "HVAC Disconnect", quantity: "1 per unit", spec: "Eaton DPU222RP - 60A pullout disconnect, non-fused, NEMA 3R, within sight of HVAC unit per NEC 440.14", unitPrice: 32.00 },
    { item: "HVAC Whip (liquid-tight)", quantity: "1 per unit", spec: "Southwire 55189407 - 3/4 in. x 6 ft liquid-tight flexible metallic whip, pre-wired 10 AWG, disconnect to unit", unitPrice: 28.00 },
    // Fire safety
    { item: "Smoke/CO Detector Box", quantity: "3 per unit", spec: "Crouse-Hinds TP302 - 4 in. octagon box at smoke/CO detector locations — bedroom, hallway, each level", unitPrice: 3.25 },
    { item: "MC Cable Connectors", quantity: "50 per unit", spec: "Bridgeport 38ASP - 3/8 in. MC cable snap-in connector, box entries", unitPrice: 0.85 },
    // Supports
    { item: "MC Cable Staples", quantity: "100 per unit", spec: "Caddy MSM50 - MC/BX cable support staple, 1/2 in., nail-on per NEC support intervals", unitPrice: 0.35 },
  ],
  blueprintNotes: [
    "ALL QUANTITIES ARE PER UNIT — multiply by total unit count for building/project totals",
    "Typical 1BR unit: 10-12 circuits. 2BR: 14-16 circuits. 3BR: 16-20 circuits. Adjust accordingly",
    "MC cable required in most multifamily (Type IIIA/VA construction) — NM cable not permitted above 3 stories",
    "Kitchen: minimum 2 SABC (small appliance branch circuits) + dedicated dishwasher + dedicated refrigerator",
    "AFCI protection: all bedrooms, living room, hallway, closets — use AFCI breakers in unit panel (Phase 5)",
    "GFCI protection: all bathrooms, kitchen (within 6 ft of sink), laundry — receptacle or breaker type",
    "HVAC: verify unit nameplate for circuit sizing — typical split system: 30-40A, 240V dedicated",
    "Smoke/CO: interconnected within unit per NFPA 72 — hardwired with battery backup, locations per fire code",
    "Rough-in inspection before drywall — all boxes, wiring paths, supports, and fire blocking visible",
    "Coordinate with plumbing/HVAC for chase and ceiling space — avoid conflicts before drywall",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
