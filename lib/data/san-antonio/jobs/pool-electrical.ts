import type { Job } from "../../types";
import { diagram } from "../../diagrams/pool-electrical";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "pool-electrical",
  label: "Swimming Pool Electrical",
  requirements: [
    "NEC 2026 Art. 680: Swimming pools, fountains, and similar installations",
    "All pool pump motors must be on GFCI-protected circuits per NEC 680.22(B)",
    "Equipotential bonding grid required around pool per NEC 680.26",
    "Minimum conductor burial depths per NEC 680.10 for underground wiring to pool equipment",
    "Pool light must be listed for wet location and GFCI protected per NEC 680.23",
    "Receptacles within 20 ft of pool edge must be GFCI protected per NEC 680.22(A)",
    "City of San Antonio electrical permit required",
    "Pool barrier/fence inspection may also be required per local building code",
  ],
  materials: [
    { item: "2-Pole 30A GFCI Breaker", quantity: "1", spec: "Eaton BRN230GF - BR 2-pole 30A GFCI 120/240V 10kAIC, pool pump circuit", unitPrice: 244.49 },
    { item: "Dual Function Breaker 20A", quantity: "1", spec: "Eaton BRP120DF - BR dual function AF/GF 1-pole 20A, pool light circuit", unitPrice: 75.6 },
    { item: "Dual Function Breaker 15A", quantity: "1", spec: "Eaton BRP115DF - BR dual function AF/GF 1-pole 15A, receptacle circuit near pool", unitPrice: 75.6 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, protect pool equipment", unitPrice: 136.51 },
    { item: "10 AWG THHN Black", quantity: "100 ft", spec: "COP THHN10STBK500 - 10 AWG THHN stranded black, pump motor circuit, sold per ft", unitPrice: 0.48 },
    { item: "10 AWG THHN White", quantity: "100 ft", spec: "COP THHN10STWH500 - 10 AWG THHN stranded white, neutral, sold per ft", unitPrice: 0.48 },
    { item: "10 AWG THHN Green", quantity: "100 ft", spec: "COP THHN10STGN500 - 10 AWG THHN stranded green, equipment ground, sold per ft", unitPrice: 0.48 },
    { item: "1 in. Schedule 80 PVC Conduit", quantity: "60 ft", spec: "PVC PVC100 - 1 in. Schedule 80 gray PVC conduit, 10 ft sticks, underground run to pool equipment", unitPrice: 6.25 },
    { item: "8 AWG Solid Bare Copper", quantity: "100 ft", spec: "COP BARE8SOL500 - 8 AWG solid bare copper, equipotential bonding grid per NEC 680.26", unitPrice: 0.95 },
    { item: "60A AC Disconnect", quantity: "1", spec: "Eaton DPB222R - 60A/2P disconnect molded case switch, within sight of pool pump per NEC 680.22", unitPrice: 61.22 },
    { item: "15A TR GFCI Receptacle", quantity: "2", spec: "Eaton TRGF15W - TR self-test GFCI 15A 125V white, pool area", unitPrice: 26.14 },
    { item: "15A TR WR Duplex Receptacle", quantity: "2", spec: "Eaton TWR270W - receptacle TR weather-resistant duplex 15A white, pool area", unitPrice: 3.8 },
    { item: "In-Use Weatherproof Cover", quantity: "2", spec: "Taymac MM420C - 1G 2-3/4 in. extra-duty while-in-use cover", unitPrice: 12.9 },
    { item: "Weatherproof Box Cover", quantity: "2", spec: "Hubbell 51800 - 1G weatherproof duplex receptacle cover", unitPrice: 9.5 },
    { item: "1/2 in. NM Liquid-Tight Connector", quantity: "6", spec: "Sperry/Halex 8403 - 1/2 in. non-metallic liquid-tight straight connector", unitPrice: 3.25 },
    { item: "PVC Conduit Cement", quantity: "1", spec: "PVC cement and primer kit, 4 oz each, for Schedule 80 PVC joints", unitPrice: 6.5 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb", unitPrice: 8.55 },
    { item: "Red Wire Connectors", quantity: "1 bag (500)", spec: "NSI WWCRB - red winged wire connector, 500/bag", unitPrice: 42 },
    { item: "Underground Warning Tape", quantity: "1", spec: "Brady UGT-E - underground warning tape, CAUTION BURIED ELECTRIC LINE, 200 ft roll", unitPrice: 6.5 },
  ],
  blueprintNotes: [
    "Pool pump disconnect: DPB222R mounted within sight of pump, min 5 ft from pool edge per NEC 680.22",
    "Bonding grid: 8 AWG bare copper, connect all metal within 5 ft of pool - rebar, coping, pump, ladder anchors",
    "Underground conduit: min 18 in. burial depth for Sch 80 PVC per NEC 680.10",
    "All receptacles within 20 ft of pool must be GFCI protected",
    "Use BR series breakers: BRN230GF for pump, BRP120DF for lights",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: SA_OFFICIAL_DOCS,
};
