import type { Job } from "../../types";
import { diagram } from "../diagrams/detached-garage-subpanel";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "detached-garage-subpanel",
  label: "Detached Garage / Carport Subpanel Addition",
  requirements: [
    "NEC 2026 Art. 225/408: Subpanel feeder must be sized for calculated load, minimum 100A for garage/workshop",
    "4-wire feeder required to detached structure (two hots, neutral, separate ground) per NEC 250.32",
    "Subpanel must have separate neutral and ground bus bars — no N-G bonding at subpanel",
    "AFCI/GFCI protection required on applicable branch circuits from subpanel",
    "Feeder breaker in main panel must match subpanel amperage rating",
    "Grounding electrode required at detached structure per NEC 250.32",
    "Underground feeder conduit: min 24 in. burial for Sch 40 PVC, 18 in. for RMC per NEC 300.5",
    "City of San Antonio electrical permit required for new subpanel installation",
    "EV charger rough-in: 50A 240V dedicated circuit if EV charging anticipated",
  ],
  materials: [
    { item: "125A BR MLO Subpanel", quantity: "1", spec: "Eaton BRP24L125G - BR PON loadcenter 125A MLO 24 space with ground bar, plug-on neutral", unitPrice: 109.79 },
    { item: "2-Pole 100A Feeder Breaker", quantity: "1", spec: "Eaton BR2100 - Type BR breaker 100A/2-pole 120/240V 10K, feeder to subpanel in main panel", unitPrice: 26.40 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, subpanel protection", unitPrice: 136.51 },
    { item: "2 AWG AL SER Cable", quantity: "80 ft", spec: "ALU SER21000 - 2-2-2-4 AL SER 600V cable, 4-wire feeder to subpanel, sold per ft", unitPrice: 3.20 },
    { item: "1 in. ENT Blue Flex", quantity: "1 coil (100 ft)", spec: "PVF ENT1B0X - 1 in. x 100 ft blue ENT coil, flexible nonmetallic tubing for branch runs, sold as full 100 ft coil only — not cut to length", unitPrice: 130.43 },
    { item: "6 AWG Bare Copper GEC", quantity: "20 ft", spec: "COP BARE6SOL500 - 6 AWG solid bare copper GEC, sold per ft, subpanel grounding per NEC 250", unitPrice: 1.45 },
    { item: "5/8 x 8 ft Ground Rod", quantity: "2", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod, detached structure grounding", unitPrice: 29.81 },
    { item: "Ground Rod Clamp", quantity: "2", spec: "NSI GRC58 - 5/8 in. bronze ground rod clamp, UL listed", unitPrice: 4.75 },
    { item: "Dual Function Breaker 20A", quantity: "6", spec: "Eaton BRP120DF - BR dual function AF/GF 1-pole 20A plug-on neutral breaker", unitPrice: 75.60 },
    { item: "Dual Function Breaker 15A", quantity: "4", spec: "Eaton BRP115DF - BR dual function AF/GF 1-pole 15A plug-on neutral breaker", unitPrice: 75.60 },
    { item: "2-Pole 50A Breaker", quantity: "1", spec: "Eaton BR250 - Type BR breaker 50A/2-pole 120/240V 10K, EV charger rough-in", unitPrice: 26.40 },
    { item: "2-Pole 30A Breaker", quantity: "1", spec: "Eaton BR230 - Type BR breaker 30A/2-pole 120/240V 10K, air compressor or sub-feed", unitPrice: 21.67 },
    { item: "15A TR Duplex Receptacle", quantity: "10", spec: "Eaton TR270W - receptacle TR duplex 15A 125V 2P3W white", unitPrice: 1.93 },
    { item: "15A TR GFCI Receptacle", quantity: "4", spec: "Eaton TRGF15W - TR self-test GFCI 15A 125V white", unitPrice: 26.14 },
    { item: "15A TR WR Duplex Receptacle", quantity: "4", spec: "Eaton TWR270W - receptacle TR weather-resistant duplex 15A white, outdoor locations", unitPrice: 3.80 },
    { item: "In-Use Weatherproof Cover", quantity: "4", spec: "Taymac MM420C - extra-duty while-in-use weatherproof cover", unitPrice: 12.90 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb", unitPrice: 8.55 },
    { item: "Panel Directory Label Kit", quantity: "1", spec: "Brady 95543 - adhesive panel directory label kit", unitPrice: 12 },
    { item: "Red Wire Connectors", quantity: "1 bag (500)", spec: "NSI WWCRB - red winged wire connector, 500/bag", unitPrice: 42 },
  ],
  blueprintNotes: [
    "Feeder route: underground conduit or overhead, min 24 in. burial depth for PVC per NEC 300.5",
    "SER cable: 2-2-2-4 AL SER from main panel to subpanel (80 ft typical)",
    "Subpanel: BRP24L125G (BR 24-space MLO) in garage — do NOT bond neutral to ground",
    "Install BRNSURGE10 surge arrester in subpanel per NEC 242",
    "Two ground rods at detached structure, 6 ft apart minimum, per NEC 250.32",
    "Label all circuits in both main panel and subpanel directories",
    "If EV charger planned: install 50A 240V dedicated circuit with BR250 breaker",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: SA_OFFICIAL_DOCS,
};
