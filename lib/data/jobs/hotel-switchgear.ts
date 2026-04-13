import type { Job } from "../types";
import { diagram } from "../diagrams/hotel-switchgear";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "hotel-switchgear",
  label: "Hotel Build-Out – Phase 2: Main Switchgear & Distribution",
  requirements: [
    "NEC 2026 Art. 230: Services — main service entrance, overcurrent protection, and accessibility",
    "NEC 2026 Art. 408: Switchboards and switchgear — installation, working space, and labeling",
    "NEC 2026 Art. 700: Emergency systems — separate wiring, ATS, 10-second transfer for egress/fire alarm",
    "NEC 2026 Art. 701: Legally required standby — elevators, smoke control, 60-second transfer maximum",
    "NEC 2026 Art. 702: Optional standby — hotel operations loads on generator as owner requires",
    "NEC 2026 Art. 445: Generators — installation, sizing, disconnect, and nameplate requirements",
    "NEC 2026 Art. 700.12: Emergency power source — generator must supply 100% emergency load for building occupancy duration",
    "NEC 2026 Art. 110.26: Working space — 3 ft clear in front of all equipment, adequate lighting",
    "NFPA 110: Emergency and standby power systems — generator room requirements, fuel storage, testing protocol",
    "Utility coordination: confirm service voltage (480/277V or 120/208V), transformer sizing, metering",
    "Fire marshal: review main electrical room, generator room, and ATS locations",
    "Permit: main service installation, generator installation, fire alarm system",
  ],
  materials: [
    // ── Main Switchgear ─────────────────────────────────────────
    { item: "Main Distribution Switchboard", quantity: "1", spec: "Eaton PRL4B — 2000A 480/277V 3-phase 4-wire main distribution switchboard with main breaker, metering section, and distribution section — size per hotel load calc" },
    { item: "ATS 800A (Emergency)", quantity: "1", spec: "Eaton ATC-800-4 — 800A automatic transfer switch, 480V 3-phase, open transition, for emergency/standby loads — 10-second transfer per NEC 700", unitPrice: 12500.00 },
    { item: "Emergency Generator 500kW", quantity: "1", spec: "Generac SD500 — 500kW diesel standby generator, 480/277V 3-phase, sound-attenuated enclosure, sub-base fuel tank — size per emergency + standby load calc" },
    { item: "Generator Remote Annunciator", quantity: "1", spec: "Generac 0H06640SRV — remote annunciator panel, wall-mount in front desk area, generator status monitoring", unitPrice: 485.00 },
    // ── Distribution Panels ─────────────────────────────────────
    { item: "Normal Distribution Panel 800A", quantity: "1", spec: "Eaton PRL1A-800 — 800A 480/277V 3-phase panelboard, 42-space, normal power distribution to guest floors and mechanical", unitPrice: 3800.00 },
    { item: "Emergency Distribution Panel 400A", quantity: "1", spec: "Eaton PRL1A-400 — 400A 480/277V 3-phase panelboard, 42-space, emergency loads — egress, fire alarm, fire pump", unitPrice: 2200.00 },
    { item: "Standby Distribution Panel 400A", quantity: "1", spec: "Eaton PRL1A-400 — 400A 480/277V 3-phase panelboard, 42-space, legally required standby — elevators, kitchen hoods, smoke control", unitPrice: 2200.00 },
    // ── Step-Down Transformers ───────────────────────────────────
    { item: "75kVA Transformer 480-208/120V", quantity: "per plan", spec: "Eaton V48M28T75EE — 75kVA dry-type transformer, 480V primary to 208Y/120V secondary, NEMA 2, floor-mounted — guest floor 120V distribution", unitPrice: 3200.00 },
    { item: "45kVA Transformer 480-208/120V", quantity: "per plan", spec: "Eaton V48M28T45EE — 45kVA dry-type transformer, 480V to 208Y/120V, NEMA 2 — lobby, back-of-house 120V loads", unitPrice: 2100.00 },
    // ── Feeders ─────────────────────────────────────────────────
    { item: "500 kcmil AL XHHW-2", quantity: "per plan (ft)", spec: "ALU XHHW500AL - 500 kcmil aluminum XHHW-2 600V, main distribution feeders, sold per ft" },
    { item: "4/0 AL XHHW-2", quantity: "per plan (ft)", spec: "ALU XHHW40AL - 4/0 aluminum XHHW-2 600V, sub-distribution feeders, sold per ft" },
    { item: "2 AWG Bare Copper GEC", quantity: "per plan (ft)", spec: "COP BARE2SOL500 - 2 AWG solid bare copper, equipment grounding, sold per ft" },
    // ── Conduit ─────────────────────────────────────────────────
    { item: "4 in. RMC Conduit", quantity: "per plan (ft)", spec: "CON GAL4 - 4 in. galvanized rigid metal conduit, main feeders, sold per ft", unitPrice: 22.00 },
    { item: "3 in. EMT Conduit", quantity: "per plan (ft)", spec: "CON EMT3 - 3 in. EMT conduit, distribution feeders, sold per ft", unitPrice: 12.50 },
    // ── Grounding ───────────────────────────────────────────────
    { item: "Ground Rod 5/8 x 10 ft", quantity: "4", spec: "Erico 618880 - 5/8 in. x 10 ft copper-bonded ground rod — main service and generator grounding", unitPrice: 32.00 },
    { item: "Exothermic Weld Kit", quantity: "1", spec: "Erico Cadweld PLUSCU200L - exothermic weld kit", unitPrice: 185.00 },
    // ── Misc ────────────────────────────────────────────────────
    { item: "Wire Pulling Lubricant", quantity: "3", spec: "Ideal 31-378 - Yellow 77, 1 gallon", unitPrice: 42.00 },
    { item: "Anti-Oxidant Compound", quantity: "3", spec: "Ideal 30-030 - Noalox, 8 oz", unitPrice: 12.75 },
  ],
  blueprintNotes: [
    "Main electrical room: coordinate with architect — minimum 10x20 ft for hotel-class switchgear, adequate ventilation",
    "Generator pad: outdoor concrete pad or indoor generator room — comply with NFPA 110 fuel storage and ventilation",
    "ATS: open or closed transition per utility requirements — 10-sec transfer for NEC 700, 60-sec for NEC 701",
    "480V vs 208V: large hotels typically 480/277V primary with step-down transformers per floor — reduces conductor sizes",
    "Emergency distribution: SEPARATE raceway from normal power per NEC 700.10 — no shared conduit",
    "Fire pump: if required, dedicated feeder direct from main switchgear or ATS per NEC 695",
    "Working space: NEC 110.26 — 3 ft front clearance, dedicated space above equipment to ceiling",
    "Coordinate with mechanical engineer for chiller, boiler, and AHU electrical loads",
    "Size generator per emergency + legally required standby + optional standby loads",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
