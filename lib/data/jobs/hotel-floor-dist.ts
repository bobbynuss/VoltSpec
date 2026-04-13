import type { Job } from "../types";
import { diagram } from "../diagrams/hotel-floor-dist";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "hotel-floor-dist",
  label: "Hotel Build-Out – Phase 3: Floor Distribution & Risers",
  requirements: [
    "NEC 2026 Art. 368: Busways — if using bus duct risers, tap rules, support, and rating requirements",
    "NEC 2026 Art. 408: Panelboards — floor distribution panels, bus rating, and overcurrent protection",
    "NEC 2026 Art. 450: Transformers — dry-type step-down, ventilation, overcurrent protection, and clearances",
    "NEC 2026 Art. 700.10: Emergency wiring — separate raceway, independent from normal power, fire-rated where required",
    "NEC 2026 Art. 110.26: Working space — 3 ft clearance in electrical closets, adequate lighting",
    "IBC: Fire-rated electrical closet per floor — 2-hour minimum, stacked vertically, firestopped at each penetration",
    "Coordinate with architect: closet size minimum 6x8 ft for hotel-class distribution (transformer + panels + telecom)",
    "Riser sizing: busway preferred for large hotels (400A+ per floor), conduit risers for smaller properties",
    "Emergency riser: physically separate from normal power riser per NEC 700.10",
    "Permit: building electrical permit, fire marshal approval for closet locations and firestopping",
  ],
  materials: [
    // ── Risers ──────────────────────────────────────────────────
    { item: "Busway 800A (riser)", quantity: "per plan (ft)", spec: "Eaton MEM-800-3P4W — 800A 3-phase 4-wire copper busway, plug-in style, vertical riser application — per floor height × floor count" },
    { item: "Busway Tap Box 225A", quantity: "per floor", spec: "Eaton MEMPB225 — 225A plug-in tap box for busway, per-floor distribution tap", unitPrice: 1250.00 },
    { item: "Busway Hanger/Support", quantity: "per plan", spec: "Eaton MEMHGR — busway vertical hanger, spring-loaded, per NEC 368.30 support requirements", unitPrice: 85.00 },
    // ── Floor Transformers ──────────────────────────────────────
    { item: "75kVA Step-Down Transformer", quantity: "per floor", spec: "Eaton V48M28T75EE — 75kVA dry-type transformer, 480V to 208Y/120V, NEMA 2, floor electrical closet — guest room 120V distribution", unitPrice: 3200.00 },
    // ── Floor Panels ────────────────────────────────────────────
    { item: "Floor Distribution Panel 225A", quantity: "per floor", spec: "Eaton PRL1A-225 — 225A 120/208V 3-phase panelboard, 42-space, main lug — guest room circuits, floor lighting", unitPrice: 1250.00 },
    { item: "Emergency Panel 100A", quantity: "per floor", spec: "Eaton PRL1A-100 — 100A 120/208V panelboard, 20-space, emergency loads — egress lighting, exit signs, fire alarm devices", unitPrice: 650.00 },
    // ── Riser Conductors (if conduit riser) ─────────────────────
    { item: "500 kcmil AL XHHW-2", quantity: "per plan (ft)", spec: "ALU XHHW500AL — 500 kcmil aluminum XHHW-2 600V, conduit riser phase conductors (if not using busway), sold per ft" },
    { item: "3/0 AL XHHW-2 (Neutral)", quantity: "per plan (ft)", spec: "ALU XHHW30AL — 3/0 aluminum XHHW-2 600V, riser neutral, sold per ft" },
    { item: "4 in. EMT Conduit (riser)", quantity: "per plan (ft)", spec: "CON EMT4 — 4 in. EMT conduit, riser alternative to busway, sold per ft", unitPrice: 18.50 },
    // ── Emergency Riser ─────────────────────────────────────────
    { item: "2 in. EMT Conduit (emergency riser)", quantity: "per plan (ft)", spec: "CON EMT2 — 2 in. EMT conduit, emergency riser — SEPARATE from normal per NEC 700.10, sold per ft", unitPrice: 8.75 },
    { item: "#2 AL XHHW-2 (emergency feeder)", quantity: "per plan (ft)", spec: "ALU XHHW2AL — #2 aluminum XHHW-2 600V, emergency riser conductors, sold per ft" },
    // ── Firestopping ────────────────────────────────────────────
    { item: "Firestop Putty Pad", quantity: "per plan", spec: "STI SpecSeal SSP-100 — firestop putty pad, 7x7 in., for outlet boxes at fire-rated walls", unitPrice: 6.50 },
    { item: "Firestop Caulk", quantity: "per plan", spec: "3M CP-25WB+ — fire barrier caulk, 27 oz, for conduit/cable penetrations through fire-rated assemblies", unitPrice: 28.00 },
    { item: "Firestop Pillow (large penetrations)", quantity: "per plan", spec: "3M FB-249 — fire barrier pillow, 2x4x9 in., for large busway/conduit bank openings", unitPrice: 18.00 },
    // ── Wireway & Gutter ────────────────────────────────────────
    { item: "8x8 Wireway", quantity: "per plan (ft)", spec: "B-Line 8836HSNK — 8x8 in. NEMA 1 wireway, floor closet busway tap to panel distribution", unitPrice: 48.00 },
    // ── Misc ────────────────────────────────────────────────────
    { item: "Panel Directory Label Kit", quantity: "per panel", spec: "Brady 95543 — panel directory label kit", unitPrice: 12.00 },
    { item: "Anti-Oxidant Compound", quantity: "2", spec: "Ideal 30-030 — Noalox, 8 oz", unitPrice: 12.75 },
    { item: "Ground Bus Bar Kit", quantity: "per panel", spec: "Eaton GBKP1020 — ground bus kit, 10 terminals", unitPrice: 28.00 },
  ],
  blueprintNotes: [
    "Electrical closets: fire-rated, stacked vertically per floor — coordinate with architect early in design",
    "Busway vs. conduit riser: busway preferred for 5+ floors, simplifies floor taps and future modifications",
    "Emergency riser: physically separate raceway from normal power — NEC 700.10, no shared conduit or enclosure",
    "Step-down transformers: 75kVA typical per guest floor (20-30 rooms), adjust per actual load calc",
    "Firestop ALL penetrations through fire-rated floors and walls — UL listed systems only",
    "Floor panel sizing: count rooms per floor × 30-40A diversified per room + corridor/common loads",
    "Emergency panel per floor: egress lights, exit signs, fire alarm NAC devices — battery backup as secondary",
    "Telecom/data: separate rack or panel in same closet — maintain NEC separation from power",
    "Adjust floor count and equipment sizing to actual hotel design",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
