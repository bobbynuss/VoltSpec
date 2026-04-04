import type { Job } from "../../types";
import { diagram } from "../diagrams/solar-pv-20kw";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "solar-pv-20kw",
  label: "Solar PV Interconnect (up to 20kW)",
  requirements: [
    "NEC 2026 Art. 690: Solar photovoltaic systems - rapid shutdown required per NEC 690.12",
    "CPS Energy Solar Interconnect Application required before installation",
    "Inverter must be listed (UL 1741-SA) and approved by CPS Energy for grid-tie",
    "Dedicated solar breaker in main panel - 120% bus bar rule per NEC 705.12(B)(2)(3)",
    "Rapid shutdown system required per NEC 690.12 - module-level or array-level",
    "AC disconnect required within 10 ft of meter or at utility-accessible location per CPS Energy",
    "City of San Antonio electrical and building permits required",
    "CPS Energy net metering available under SolarHost or distributed generation tariff",
  ],
  materials: [
    { item: "Grid-Tie Inverter 7.6kW", quantity: "2", spec: "SolarEdge SE7600H-US - 7.6kW HD-Wave single-phase inverter, UL 1741-SA listed", unitPrice: 1850 },
    { item: "DC Power Optimizer", quantity: "40", spec: "SolarEdge P505 - 505W power optimizer, module-level MPPT and rapid shutdown compliant", unitPrice: 185 },
    { item: "Solar AC Disconnect", quantity: "1", spec: "Eaton DPB222R - 60A/2P disconnect molded case switch, outdoor rated, utility accessible", unitPrice: 61.22 },
    { item: "2-Pole 35A Solar Breaker", quantity: "2", spec: "Eaton BR235 - Type BR breaker 35A/2-pole 120/240V 10K, solar backfeed breaker in main panel", unitPrice: 18.5 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, protect panel from solar transients", unitPrice: 136.51 },
    { item: "10 AWG THHN Black", quantity: "100 ft", spec: "COP THHN10STBK500 - 10 AWG THHN stranded black, inverter AC output wiring, sold per ft", unitPrice: 0.48 },
    { item: "10 AWG THHN White", quantity: "100 ft", spec: "COP THHN10STWH500 - 10 AWG THHN stranded white, neutral, sold per ft", unitPrice: 0.48 },
    { item: "10 AWG THHN Green", quantity: "100 ft", spec: "COP THHN10STGN500 - 10 AWG THHN stranded green, equipment ground, sold per ft", unitPrice: 0.48 },
    { item: "1 in. ENT Blue Flex", quantity: "1 coil (100 ft)", spec: "PVF ENT1B0X - 1 in. ENT flex, inverter to panel AC run", unitPrice: 130.43 },
    { item: "3/4 in. NM Liquid-Tight Connector", quantity: "8", spec: "Sperry/Halex 8405 - 3/4 in. non-metallic liquid-tight straight connector", unitPrice: 3.25 },
    { item: "Solar Warning Labels Kit", quantity: "1", spec: "Brady LOTO-SLR - solar PV warning label kit, NEC 690.31/690.56 compliant", unitPrice: 15 },
    { item: "Rapid Shutdown Label", quantity: "1", spec: "Brady RSD-2026 - rapid shutdown system compliant label per NEC 690.12", unitPrice: 185 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal all conduit penetrations", unitPrice: 8.55 },
    { item: "6 AWG Bare Copper GEC", quantity: "10 ft", spec: "COP BARE6SOL500 - 6 AWG solid bare copper GEC, sold per ft, inverter grounding", unitPrice: 1.45 },
    { item: "PV System Monitoring Gateway", quantity: "1", spec: "SolarEdge SE-RGMTR-240V-A - revenue grade meter with CTs for production monitoring", unitPrice: 195 },
  ],
  blueprintNotes: [
    "Inverters: mount on garage wall or exterior wall near main panel for short AC run",
    "AC disconnect: DPB222R mounted within 10 ft of meter base, utility-accessible, clearly labeled",
    "Solar breakers: BR235 at bottom of panel, labeled 'SOLAR PV BACKFEED' per NEC 705",
    "120% rule: verify panel bus rating supports solar backfeed without exceeding 120%",
    "Submit CPS Energy Solar Interconnect Application before installation",
    "Rapid shutdown: SolarEdge optimizers provide compliant module-level shutdown",
  ],
  svgDiagram: diagram,
  suppliers: [...SA_SUPPLIERS, { name: "CED Greentech San Antonio", address: "6900 Alamo Downs Pkwy, San Antonio, TX 78238", phone: "(210) 201-0141", website: "https://www.cedgreentech.com", notes: "Solar panels, inverters, racking, BOS components" }],
  officialDocs: [...SA_OFFICIAL_DOCS, { title: "CPS Energy Solar Programs", url: "https://www.cpsenergy.com/en/about-us/programs-services/renewable-energy.html", description: "CPS Energy solar interconnect programs and distributed generation information for San Antonio" }],
};
