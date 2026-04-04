import type { Job } from "../../types";
import { diagram } from "../../diagrams/hot-tub-spa";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "hot-tub-spa",
  label: "Hot Tub/Spa Dedicated Circuit",
  requirements: [
    "NEC 2026 Art. 680 Part IV: Spas and hot tubs",
    "Dedicated 50A or 60A, 240V circuit required (check spa manufacturer specifications)",
    "GFCI protection required per NEC 680.44 - at breaker or dedicated GFCI disconnect",
    "Disconnect required within sight of spa and min 5 ft from spa edge per NEC 680.41",
    "Equipotential bonding required for all metal within 5 ft of spa per NEC 680.42",
    "Outdoor spa receptacle must be GFCI protected and min 6 ft from spa edge per NEC 680.43",
    "City of San Antonio electrical permit required",
    "Verify spa electrical requirements with manufacturer before installation",
  ],
  materials: [
    { item: "2-Pole 50A GFCI Breaker", quantity: "1", spec: "Eaton BRN250GF - BR 2-pole 50A GFCI 120/240V 10kAIC, dedicated spa circuit per NEC 680.44", unitPrice: 244.48 },
    { item: "6 AWG THHN Black", quantity: "50 ft", spec: "COP THHN6STBK500 - 6 AWG THHN stranded black, hot conductor, sold per ft", unitPrice: 0.85 },
    { item: "6 AWG THHN Red", quantity: "50 ft", spec: "COP THHN6STRD500 - 6 AWG THHN stranded red, second hot conductor, sold per ft", unitPrice: 0.85 },
    { item: "6 AWG THHN White", quantity: "50 ft", spec: "COP THHN6STWH500 - 6 AWG THHN stranded white, neutral, sold per ft", unitPrice: 0.85 },
    { item: "10 AWG THHN Green", quantity: "50 ft", spec: "COP THHN10STGN500 - 10 AWG THHN stranded green, equipment ground, sold per ft", unitPrice: 0.48 },
    { item: "1 in. Schedule 80 PVC Conduit", quantity: "30 ft", spec: "PVC PVC100 - 1 in. Schedule 80 gray PVC conduit, 10 ft sticks, underground run to spa", unitPrice: 6.25 },
    { item: "60A Spa Disconnect", quantity: "1", spec: "Eaton DPB222R - 60A/2P disconnect molded case switch, within sight of spa", unitPrice: 61.22 },
    { item: "8 AWG Bare Copper", quantity: "20 ft", spec: "COP BARE8SOL500 - 8 AWG solid bare copper, equipotential bonding per NEC 680.42", unitPrice: 0.95 },
    { item: "1/2 in. NM Liquid-Tight Connector", quantity: "4", spec: "Sperry/Halex 8403 - 1/2 in. non-metallic liquid-tight straight connector", unitPrice: 3.25 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb", unitPrice: 8.55 },
    { item: "PVC Conduit Cement", quantity: "1", spec: "PVC cement and primer kit, 4 oz each", unitPrice: 6.5 },
    { item: "Underground Warning Tape", quantity: "1", spec: "Brady UGT-E - underground warning tape, 200 ft roll", unitPrice: 6.5 },
  ],
  blueprintNotes: [
    "Spa disconnect: DPB222R mounted within sight of spa, min 5 ft from spa edge per NEC 680.41",
    "Underground conduit: min 18 in. burial depth for Sch 80 PVC per NEC Table 300.5",
    "Bonding: 8 AWG bare copper to all metal within 5 ft of spa per NEC 680.42",
    "Use BR series BRN250GF GFCI breaker - verify spa amperage with manufacturer",
    "GFCI protection at breaker provides primary protection per NEC 680.44",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: SA_OFFICIAL_DOCS,
};
