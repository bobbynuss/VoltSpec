import type { Job } from "../../types";
import { diagram } from "../diagrams/100a-subpanel";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "100a-subpanel",
  label: "100A Subpanel Addition",
  requirements: [
    "NEC 2026 Art. 225/408: Subpanel feeder must be sized for calculated load, minimum 100A",
    "4-wire feeder required to subpanel (two hots, neutral, separate ground) per NEC 250.32",
    "Subpanel must have separate neutral and ground bus bars - no bonding at subpanel",
    "AFCI/GFCI protection required on applicable branch circuits from subpanel",
    "Feeder breaker in main panel must match subpanel amperage rating",
    "City of San Antonio electrical permit required for new subpanel installation",
    "Grounding electrode required at detached structure per NEC 250.32",
  ],
  materials: [
    { item: "125A BR MLO Subpanel", quantity: "1", spec: "Eaton BRP24L125G - BR PON loadcenter 125A MLO 24 space with ground bar, plug-on neutral", unitPrice: 109.79 },
    { item: "2-Pole 60A Feeder Breaker", quantity: "1", spec: "Eaton BR260 - Type BR breaker 60A/2-pole 120/240V 10K, feeder to subpanel in main panel", unitPrice: 26.4 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, subpanel protection", unitPrice: 136.51 },
    { item: "2 AWG AL SER Cable", quantity: "40 ft", spec: "ALU SER21000 - 2-2-2-4 AL SER 600V cable, 4-wire feeder to subpanel, sold per ft", unitPrice: 3.85 },
    { item: "2-1/2 in. PVC Male Adapter", quantity: "4", spec: "PVF TA212 - 2-1/2 in. PVC male adapter", unitPrice: 3.08 },
    { item: "2-1/2 in. Steel Locknut", quantity: "4", spec: "Bridgeport 107S - 2-1/2 in. steel locknut", unitPrice: 4.91 },
    { item: "1 in. ENT Blue Flex", quantity: "1 coil (100 ft)", spec: "PVF ENT1B0X - 1 in. x 100 ft blue ENT coil, flexible nonmetallic tubing for branch runs", unitPrice: 130.43 },
    { item: "6 AWG Bare Copper GEC", quantity: "20 ft", spec: "COP BARE6SOL500 - 6 AWG solid bare copper GEC, sold per ft, subpanel grounding per NEC 250", unitPrice: 1.45 },
    { item: "5/8 x 8 ft Ground Rod", quantity: "1", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod, required if subpanel at detached structure", unitPrice: 29.81 },
    { item: "Ground Rod Clamp", quantity: "1", spec: "Thomas & Betts G5 - 1/2 in. x 5/8 in. ground rod clamp", unitPrice: 4.5 },
    { item: "Dual Function Breaker 20A", quantity: "6", spec: "Eaton BRP120DF - BR dual function AF/GF 1-pole 20A plug-on neutral breaker", unitPrice: 75.6 },
    { item: "Dual Function Breaker 15A", quantity: "4", spec: "Eaton BRP115DF - BR dual function AF/GF 1-pole 15A plug-on neutral breaker", unitPrice: 75.6 },
    { item: "GFCI Breaker 30A 2-Pole", quantity: "1", spec: "Eaton BRN230GF - BR 2-pole 30A GFCI 120/240V 10kAIC", unitPrice: 244.49 },
    { item: "1-Pole 20A Breaker", quantity: "4", spec: "Eaton BR120 - Type BR breaker 20A/1-pole 120/240V 10K", unitPrice: 9.43 },
    { item: "2-Pole 30A Breaker", quantity: "1", spec: "Eaton BR230 - Type BR breaker 30A/2-pole 120/240V 10K, 240V circuit", unitPrice: 21.67 },
    { item: "15A TR Duplex Receptacle", quantity: "10", spec: "Eaton TR270W - receptacle TR duplex 15A 125V 2P3W white", unitPrice: 1.93 },
    { item: "20A TR Single Receptacle", quantity: "4", spec: "Eaton TR1877WBXSP - receptacle TR single 20A 125V 2P3W white, dedicated circuits", unitPrice: 8.38 },
    { item: "15A TR GFCI Receptacle", quantity: "2", spec: "Eaton TRGF15W - TR self-test GFCI 15A 125V white", unitPrice: 26.14 },
    { item: "In-Use Weatherproof Cover", quantity: "2", spec: "Taymac MM420C - 1G 2-3/4 in. extra-duty while-in-use cover, outdoor receptacles", unitPrice: 12.9 },
    { item: "Red Wire Connectors", quantity: "1 bag (500)", spec: "NSI WWCRB - red winged wire connector, 500/bag", unitPrice: 42 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit entries per NEC 230.8", unitPrice: 8.55 },
    { item: "Panel Directory Label Kit", quantity: "1", spec: "Brady 95543 - adhesive panel directory label kit, typed circuit labels", unitPrice: 12 },
  ],
  blueprintNotes: [
    "Feeder route: 2 AWG AL SER from main panel to subpanel location",
    "Subpanel: Eaton BRP24L125G (BR series 24-space MLO) in garage, workshop, or outbuilding",
    "Do NOT bond neutral to ground at subpanel - separate bus bars required per NEC 250.32",
    "Install BRNSURGE10 surge arrester in subpanel",
    "Label all circuits in both main panel and subpanel directories",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: SA_OFFICIAL_DOCS,
};
