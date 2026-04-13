import type { Job } from "../../types";
import { diagram } from "../diagrams/new-400a-service";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "new-400a-service",
  label: "New 400A Service",
  requirements: [
    "NEC 2026 Art. 230: 400A service uses a Class 320A meter socket per CPS Energy standards",
    "CPS Energy Customer Engineering approval required for 400A residential - call (210) 353-4050",
    "Two 200A outdoor disconnects or single 400A fusible disconnect required",
    "Parallel service conductors: two sets of 2-0 AL or single set 350 kcmil AL",
    "Load calculation (NEC 220) must be submitted with CPS Energy Load Sheet showing demand exceeds 200A",
    "Ground electrode system sized per NEC 250.66 for 400A service",
    "City of San Antonio electrical permit required + CPS Energy Residential Service Application with load calc",
  ],
  materials: [
    { item: "320A Ringless Meter Socket", quantity: "1", spec: "Milbank U2448-X - 320A ringless lever-bypass meter socket, OH/UG, 4-jaw, single-phase - CPS Energy approved for 400A residential", unitPrice: 612.55 },
    { item: "200A BR Main Breaker Panel", quantity: "2", spec: "Eaton BRP20B200R - BR PON loadcenter 200A main breaker 20 space NEMA 3R, one per 200A leg of tandem 400A service", unitPrice: 343.97 },
    { item: "40-Space MLO Panel", quantity: "2", spec: "Eaton BRP40L200G - BR PON loadcenter 200A MLO 40 space with ground bar, additional circuit capacity per leg", unitPrice: 235.17 },
    { item: "Surge Protective Device", quantity: "2", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, one per panel", unitPrice: 136.51 },
    { item: "350 kcmil AL XHHW-2", quantity: "30 ft", spec: "ALU XHHW3501000 - 350 kcmil AL XHHW-2 600V black, service entrance conductors 400A rated, sold per ft", unitPrice: 4.75 },
    { item: "3 in. Schedule 40 PVC Conduit", quantity: "10 ft", spec: "PVC PVC3 - Schedule 40 3 in. 10 ft PVC conduit, weatherhead to meter run", unitPrice: 2.44 },
    { item: "3 in. PVC Male Adapter", quantity: "2", spec: "PVF TA3 - 3 in. PVC male adapter", unitPrice: 4.51 },
    { item: "3 in. Steel Locknut", quantity: "2", spec: "Bridgeport 108S - 3 in. steel locknut", unitPrice: 5.38 },
    { item: "2 in. RMC Weatherhead", quantity: "1", spec: "Bridgeport 1256 - 2 in. service entrance weatherhead, 10 ft AFF min", unitPrice: 20.82 },
    { item: "3/0 AWG Bare Copper GEC", quantity: "20 ft", spec: "COP BARE3SOL500 - 3/0 AWG solid bare copper GEC, sold per ft, per NEC 250.66 for 400A service", unitPrice: 3.85 },
    { item: "5/8 x 8 ft Ground Rod", quantity: "2", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod, 6 ft spacing minimum", unitPrice: 29.81 },
    { item: "Ground Rod Clamp", quantity: "2", spec: "Thomas & Betts G5 - 1/2 in. x 5/8 in. ground rod clamp", unitPrice: 4.5 },
    { item: "Ufer Ground Clamp", quantity: "1", spec: "NSI GLC140DB - concrete encased electrode clamp, rebar tie-in per NEC 250.52", unitPrice: 31.9 },
    { item: "Dual Function Breaker 20A", quantity: "12", spec: "Eaton BRP120DF - BR dual function AF/GF 1-pole 20A plug-on neutral breaker", unitPrice: 75.6 },
    { item: "2-Pole 50A Breaker", quantity: "2", spec: "Eaton BR250 - Type BR breaker 50A/2-pole 120/240V 10K, EV charger and range circuits", unitPrice: 26.4 },
    { item: "2-Pole 60A Breaker", quantity: "2", spec: "Eaton BR260 - Type BR breaker 60A/2-pole 120/240V 10K, HVAC and subpanel feeders", unitPrice: 26.4 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit entries at building per NEC 230.8", unitPrice: 8.55 },
  ],
  blueprintNotes: [
    "CPS Energy requires Customer Engineering review for 400A residential - allow 2-3 weeks",
    "Load calculation must show >160A continuous demand to justify 400A - use CPS Load Sheet",
    "Both panels: Eaton BRP20B200R (BR series) - one per 200A leg, BRNSURGE10 in each",
    "Typically used for large homes with EV, pool, HVAC, and workshop",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: SA_OFFICIAL_DOCS,
};
