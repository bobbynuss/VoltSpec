import type { Job } from "../types";
import { diagram } from "../diagrams/res-rough-in";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "res-rough-in",
  label: "New Home Build – Phase 2: Rough-In Wiring (General Circuits)",
  requirements: [
    "NEC 2026 Art. 210.52: Receptacle outlet spacing — 6 ft rule in habitable rooms, 12 ft max between outlets along wall",
    "NEC 2026 Art. 210.52(B): Kitchen countertop — GFCI receptacle within 24 in. of each countertop space, 20A circuits",
    "NEC 2026 Art. 210.52(C): Countertop spacing — no point along wall more than 24 in. from a receptacle",
    "NEC 2026 Art. 210.11(C)(1): Minimum two 20A small-appliance branch circuits (SABC) in kitchen/dining",
    "NEC 2026 Art. 210.11(C)(3): One 20A dedicated laundry circuit required",
    "NEC 2026 Art. 210.12: AFCI protection required on all 120V 15/20A circuits in dwelling units — bedrooms, living, hallway, closets",
    "NEC 2026 Art. 210.8(A): GFCI required — bathrooms, kitchen (within 6 ft of sink), garage, outdoor, laundry, basement",
    "NEC 2026 Art. 210.70: Lighting outlets — switched lighting in every habitable room, hallway, stairway, bathroom, garage",
    "NEC 2026 Art. 314.16: Box fill — proper box sizing for conductor count",
    "NEC 2026 Art. 334: NM-B (Romex) — installation requirements, support intervals, protection through framing",
    "NEC 2026 Art. 314.27(C): Fan-rated boxes required at all ceiling fan locations — even if installing light initially",
    "Smoke/CO detectors: hardwired + battery backup, interconnected — per NFPA 72 in every bedroom, hallway, and each level",
    "Rough-in inspection required before drywall — ALL boxes, wiring, and supports must be visible",
  ],
  materials: [
    // ── Wire ────────────────────────────────────────────────────
    { item: "14/2 NM-B (White)", quantity: "1000 ft", spec: "Southwire 14/2 NM-B - 14 AWG 2-conductor + ground, 15A general lighting circuits, sold per ft" },
    { item: "12/2 NM-B (Yellow)", quantity: "750 ft", spec: "Southwire 12/2 NM-B - 12 AWG 2-conductor + ground, 20A kitchen SABC, bath, laundry, garage circuits, sold per ft" },
    { item: "14/3 NM-B", quantity: "100 ft", spec: "Southwire 14/3 NM-B - 14 AWG 3-conductor + ground, 3-way switch circuits, sold per ft" },
    { item: "12/3 NM-B", quantity: "50 ft", spec: "Southwire 12/3 NM-B - 12 AWG 3-conductor + ground, split-circuit or 3-way on 20A circuits, sold per ft" },
    // ── Boxes ───────────────────────────────────────────────────
    { item: "1-Gang Old Work Box", quantity: "60", spec: "Carlon B114RB - 1-gang 14 cu in. PVC old work box — receptacle and switch locations", unitPrice: 1.25 },
    { item: "2-Gang Old Work Box", quantity: "10", spec: "Carlon B232RB - 2-gang PVC old work box — double switch locations", unitPrice: 2.50 },
    { item: "4 in. Octagon Box", quantity: "15", spec: "Crouse-Hinds TP302 - 4 in. octagon ceiling box — light fixture locations", unitPrice: 3.25 },
    { item: "Fan-Rated Ceiling Box", quantity: "4", spec: "Eaton BH-712 - fan/fixture rated ceiling box, 70 lb max — living, master, bedrooms 2-3", unitPrice: 8.50 },
    { item: "4-Square Box Deep", quantity: "8", spec: "Crouse-Hinds TP403 - 4 in. square 2-1/8 in. deep box — junction and high-fill locations", unitPrice: 4.44 },
    // ── Connectors & Support ────────────────────────────────────
    { item: "NM Cable Connector", quantity: "100", spec: "Bridgeport 630-NM - 1/2 in. NM cable connector, snap-in, box entries", unitPrice: 0.45 },
    { item: "NM Cable Staples", quantity: "200", spec: "Gardner Bender PS-150B - 1/2 in. NM cable staples, within 12 in. of box + every 4.5 ft", unitPrice: 0.10 },
    { item: "Nail Plates", quantity: "30", spec: "Simpson Strong-Tie PNAP - 1.5 x 2.5 in. nail plates, protect NM where less than 1-1/4 in. from stud face", unitPrice: 0.35 },
    // ── Smoke/CO ────────────────────────────────────────────────
    { item: "Smoke/CO Detector Box", quantity: "6", spec: "Crouse-Hinds TP302 - 4 in. octagon box at detector locations — bedrooms, hallway, each level", unitPrice: 3.25 },
    { item: "14/3 NM-B (interconnect)", quantity: "80 ft", spec: "Southwire 14/3 NM-B — interconnect wire for smoke/CO detectors, 3rd conductor for alarm signal, sold per ft" },
    // ── Low-Voltage Prep ────────────────────────────────────────
    { item: "Low-Voltage Bracket", quantity: "8", spec: "Arlington LV1 - 1-gang low-voltage mounting bracket — TV, data, phone, doorbell camera locations", unitPrice: 1.25 },
    { item: "ENT Flexible Conduit 3/4\"", quantity: "50 ft", spec: "Carlon 12007-100 - 3/4 in. ENT flex conduit, low-voltage pathway stubs, sold per ft", unitPrice: 0.65 },
  ],
  blueprintNotes: [
    "Typical 3BR/2BA 2,000 sq ft home: 28-35 circuits — use 40-space panel for future capacity",
    "All bedrooms, living, dining, hallway, closets: AFCI-protected circuits (breakers in Phase 4)",
    "All bathrooms, kitchen countertop, garage, outdoor, laundry: GFCI-protected",
    "Kitchen: minimum 2 dedicated 20A SABC + dedicated DW + dedicated REF + dedicated disposal",
    "Fan-rated boxes at ALL ceiling fan locations — even if only hanging a light now",
    "NM cable support: within 12 in. of every box, then every 4.5 ft (NEC 334.30)",
    "Nail plates: required where wire is less than 1-1/4 in. from face of framing (NEC 334.17)",
    "Low-voltage: stub ENT to TV wall, home office, security camera, and doorbell locations",
    "ROUGH-IN INSPECTION before drywall — every box, every wire must be visible and accessible",
    "Adjust wire quantities for actual home size and circuit count per plan",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
