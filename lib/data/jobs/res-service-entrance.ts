import type { Job } from "../types";
import { diagram } from "../diagrams/res-service-entrance";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "res-service-entrance",
  label: "New Home Build – Phase 1: Service Entrance & Panel Set",
  requirements: [
    "NEC 2026 Art. 230: Services — meter socket, service entrance conductors, and main disconnect",
    "NEC 2026 Art. 230.79: Minimum service size for single-family dwelling — 100A, 200A standard for new construction",
    "NEC 2026 Art. 230.54: Overhead service entrance — weatherhead, drip loops, point of attachment per utility standards",
    "NEC 2026 Art. 230.70: Service disconnect location — readily accessible, nearest point of entrance",
    "NEC 2026 Art. 250.50: Grounding electrode system — all available electrodes must be bonded together",
    "NEC 2026 Art. 250.52(A)(3): Concrete-encased electrode (Ufer) — 20 ft of #4 copper or rebar in footer, MUST be installed before concrete pour",
    "NEC 2026 Art. 250.53: Supplemental ground rods — 2 rods minimum, 6 ft apart, if single rod > 25 ohms",
    "NEC 2026 Art. 250.104: Bonding of piping systems — water pipe, gas pipe bonded to grounding electrode system",
    "NEC 2026 Art. 408.36: Panel directory — complete typed schedule required at final inspection",
    "Utility coordination: service application, meter socket model approval, point of attachment requirements",
    "Permit: new residential electrical service permit — first inspection typically at panel set / grounding",
  ],
  materials: [
    // ── Meter & Service Entrance ────────────────────────────────
    { item: "200A Meter Socket", quantity: "1", spec: "Eaton 1006352CCH - 200A ringless single-phase meter socket, OH/UG, AE-approved", unitPrice: 612.55 },
    { item: "200A Main Breaker Panel", quantity: "1", spec: "Eaton CHP40B200R - 40-space 200A CH plug-on neutral main breaker panel, surface mount", unitPrice: 351.80 },
    { item: "4/0 AL SER Cable", quantity: "25 ft", spec: "ALU SER40 - 4/0-4/0-2/0-4 aluminum SER cable, service entrance, meter to panel, sold per ft" },
    // ── Mast & Conduit ──────────────────────────────────────────
    { item: "2 in. Rigid Metal Conduit", quantity: "15 ft", spec: "CON GAL2 - 2 in. galvanized RMC 10 ft sticks, weatherhead to meter, sold per ft", unitPrice: 10.44 },
    { item: "2 in. RMC Weatherhead", quantity: "1", spec: "Bridgeport 1256 - 2 in. service entrance weatherhead", unitPrice: 18.46 },
    { item: "2 in. Rigid 90° Elbow", quantity: "1", spec: "CON 2ELL90RIG - 2 in. rigid 90° elbow, meter riser", unitPrice: 22.00 },
    { item: "2 in. Rigid Coupling", quantity: "2", spec: "CON 2CPL - 2 in. rigid coupling", unitPrice: 5.50 },
    { item: "2 in. Insulating Bushing", quantity: "2", spec: "Bridgeport 366 - 2 in. insulating bushing", unitPrice: 3.75 },
    { item: "2 in. One-Hole Straps", quantity: "4", spec: "Bridgeport 932S - 2 in. rigid one-hole strap", unitPrice: 2.85 },
    { item: "Mast Wire Holder", quantity: "1", spec: "Bridgeport 2042 - service mast wire holder, holds triplex at point of attachment", unitPrice: 4.50 },
    // ── Grounding ───────────────────────────────────────────────
    { item: "5/8 x 8 ft Ground Rod", quantity: "2", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod — 2 required, 6 ft apart", unitPrice: 26.43 },
    { item: "Ground Rod Clamp", quantity: "2", spec: "NSI GRC58 - 5/8 in. ground rod bronze clamp, UL listed", unitPrice: 4.21 },
    { item: "Ufer Ground Clamp", quantity: "1", spec: "NSI GLC140DB - concrete-encased electrode clamp, rebar tie-in per NEC 250.52(A)(3)", unitPrice: 28.28 },
    { item: "4 AWG Bare Copper GEC", quantity: "30 ft", spec: "COP BARE4SOL500 - 4 AWG solid bare copper ground electrode conductor, sold per ft" },
    { item: "Water Pipe Bond Clamp", quantity: "1", spec: "NSI GPC1000 - water pipe ground clamp, brass, fits 1/2-1 in. pipe", unitPrice: 6.50 },
    { item: "Gas Pipe Bond Clamp", quantity: "1", spec: "NSI GPC1000 - gas pipe ground clamp, brass, bonding per NEC 250.104", unitPrice: 6.50 },
    // ── Misc ────────────────────────────────────────────────────
    { item: "Anti-Oxidant Compound", quantity: "1", spec: "Ideal 30-030 - Noalox anti-oxidant compound, 8 oz, for AL SE cable terminations", unitPrice: 12.75 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit entries", unitPrice: 6.36 },
    { item: "Panel Directory Label Kit", quantity: "1", spec: "Brady 95543 - adhesive panel directory label kit", unitPrice: 12.00 },
  ],
  blueprintNotes: [
    "CRITICAL: Ufer ground (concrete-encased electrode) MUST be installed before foundation pour — cannot be added later",
    "Coordinate with utility 4-6 weeks before service is needed — submit service application early",
    "Panel location: garage wall or utility room — max 6'7\" to top breaker handle per NEC 240.24(A)",
    "Meter socket model: verify with utility — some utilities only approve specific models",
    "SE cable: 4/0 AL SER is standard for 200A residential — route through conduit where exposed",
    "Ground rod placement: 6 ft apart minimum, along foundation near panel location",
    "Bond water pipe within 5 ft of entry, bond gas pipe per NEC 250.104",
    "Phase 1 is typically inspected before Phase 2 rough-in begins",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
