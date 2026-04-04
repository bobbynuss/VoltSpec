import type { Job } from "../../types";
import { diagram } from "../diagrams/battery-storage";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "battery-storage",
  label: "Whole-House Battery Storage",
  requirements: [
    "NEC 2026 Art. 706: Energy storage systems (ESS) - listed equipment required",
    "Battery system must be listed to UL 9540 and installed per manufacturer specs",
    "CPS Energy interconnect application required for grid-tied battery systems",
    "Dedicated breaker in main panel for battery system connection",
    "Rapid shutdown compliance if paired with solar PV per NEC 690.12",
    "City of San Antonio electrical permit required",
    "Battery clearances per manufacturer specs and NEC 706 - ventilation if required",
  ],
  materials: [
    { item: "Battery System 13.5kWh", quantity: "1", spec: "Tesla Powerwall 3 - 13.5kWh lithium-ion battery with integrated inverter, indoor/outdoor, UL 9540 listed", unitPrice: 9800 },
    { item: "Gateway / Transfer Switch", quantity: "1", spec: "Tesla Backup Gateway 2 - whole-home backup gateway with integrated transfer switch and CTs", unitPrice: 1950 },
    { item: "2-Pole 60A Breaker", quantity: "1", spec: "Eaton BR260 - Type BR breaker 60A/2-pole 120/240V 10K, battery system connection in main panel", unitPrice: 26.4 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester", unitPrice: 136.51 },
    { item: "6 AWG THHN Black", quantity: "30 ft", spec: "COP THHN6STBK500 - 6 AWG THHN stranded black, battery to gateway wiring, sold per ft", unitPrice: 0.85 },
    { item: "6 AWG THHN White", quantity: "30 ft", spec: "COP THHN6STWH500 - 6 AWG THHN stranded white, neutral, sold per ft", unitPrice: 0.85 },
    { item: "6 AWG THHN Green", quantity: "30 ft", spec: "COP THHN6STGN500 - 6 AWG THHN stranded green, equipment ground, sold per ft", unitPrice: 0.85 },
    { item: "1 in. ENT Blue Flex", quantity: "1 coil (100 ft)", spec: "PVF ENT1B0X - 1 in. ENT flex, battery to panel run", unitPrice: 130.43 },
    { item: "3/4 in. NM Liquid-Tight Connector", quantity: "6", spec: "Sperry/Halex 8405 - 3/4 in. non-metallic liquid-tight straight connector", unitPrice: 3.25 },
    { item: "ESS Warning Labels Kit", quantity: "1", spec: "Brady ESS-2026 - energy storage system warning label kit per NEC 706", unitPrice: 15 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb", unitPrice: 8.55 },
    { item: "6 AWG Bare Copper GEC", quantity: "10 ft", spec: "COP BARE6SOL500 - 6 AWG solid bare copper GEC, sold per ft, battery system grounding", unitPrice: 1.45 },
  ],
  blueprintNotes: [
    "Battery: mount on garage wall or exterior wall per manufacturer clearances",
    "Gateway: install between meter and main panel for whole-home backup",
    "Use BR260 breaker and BRNSURGE10 surge arrester in BR series panel",
    "Submit CPS Energy interconnect application if grid-tied",
    "If paired with solar: ensure rapid shutdown compliance per NEC 690.12",
  ],
  svgDiagram: diagram,
  suppliers: [...SA_SUPPLIERS, { name: "CED Greentech San Antonio", address: "6900 Alamo Downs Pkwy, San Antonio, TX 78238", phone: "(210) 201-0141", website: "https://www.cedgreentech.com", notes: "Battery storage, solar, inverters, BOS components" }],
  officialDocs: SA_OFFICIAL_DOCS,
};
