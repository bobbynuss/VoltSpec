import type { Job } from "../../types";
import { diagram } from "../../diagrams/ev-charger-50a";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "ev-charger-50a",
  label: "Level 2 EV Charger Installation (50A)",
  requirements: [
    "NEC 2026 Art. 625: EV charging equipment must be listed and labeled",
    "Dedicated 50A, 240V circuit (10 AWG minimum - use 6 AWG for future capacity)",
    "GFCI protection built into EVSE or provided at breaker (NEC 625.54)",
    "Disconnect within sight of EVSE if hardwired (NEC 625.43)",
    "CPS Energy offers EV charging programs - check cpsenergy.com for current incentives",
    "City of San Antonio electrical permit required for new branch circuit",
    "Outdoor EVSE must be NEMA 3R or 4 rated (weather resistant)",
  ],
  materials: [
    { item: "2-Pole 50A GFCI Breaker", quantity: "1", spec: "Eaton BRN250GF - BR 2-pole 50A GFCI 120/240V 10kAIC, dedicated EV circuit per NEC 625.54", unitPrice: 244.48 },
    { item: "6 AWG THHN Black", quantity: "50 ft", spec: "COP THHN6STBK500 - 6 AWG THHN stranded black, hot conductor, sold per ft", unitPrice: 0.85 },
    { item: "6 AWG THHN White", quantity: "50 ft", spec: "COP THHN6STWH500 - 6 AWG THHN stranded white, neutral conductor, sold per ft", unitPrice: 0.85 },
    { item: "10 AWG THHN Green", quantity: "50 ft", spec: "COP THHN10STGN500 - 10 AWG THHN stranded green, equipment grounding conductor, sold per ft", unitPrice: 0.48 },
    { item: "3/4 in. NM Liquid-Tight Connector", quantity: "6", spec: "Sperry/Halex 8405 - 3/4 in. non-metallic liquid-tight straight connector", unitPrice: 3.25 },
    { item: "1 in. ENT Blue Flex", quantity: "1 coil (100 ft)", spec: "PVF ENT1B0X - 1 in. x 100 ft blue ENT coil, flexible nonmetallic tubing", unitPrice: 130.43 },
    { item: "NEMA 14-50R Receptacle", quantity: "1", spec: "Eaton AH1258BKF - receptacle single flush 50A 125/250V 3P4W black, for plug-in EVSE", unitPrice: 10.4 },
    { item: "NEMA 6-30R Receptacle (alt)", quantity: "1", spec: "Eaton AH1257BKF - receptacle single flush 30A 125/250V 3P4W black, for smaller EVSE", unitPrice: 10.4 },
    { item: "In-Use Weatherproof Cover", quantity: "1", spec: "Taymac MM420C - 1G 2-3/4 in. extra-duty while-in-use cover, if EVSE outlet is outdoors", unitPrice: 12.9 },
    { item: "Weatherproof Box Cover", quantity: "1", spec: "Hubbell 51800 - 1G weatherproof duplex receptacle cover", unitPrice: 9.5 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, protect EV circuit", unitPrice: 136.51 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit wall penetrations", unitPrice: 8.55 },
  ],
  blueprintNotes: [
    "Route 6 AWG in 1 in. ENT flex or 3/4 in. EMT from panel to garage wall mount location",
    "Mount EVSE at 48\" AFF on garage wall near driver's side of parking space",
    "Label breaker: 'EV CHARGER - GARAGE' - use BR series BRN250GF GFCI breaker",
    "If adding solar later, EVSE should be on a smart/controllable circuit",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: [...SA_OFFICIAL_DOCS, { title: "CPS Energy EV Charging Programs", url: "https://www.cpsenergy.com/en/about-us/programs-services/electric-vehicles.html", description: "CPS Energy electric vehicle programs and charging information for San Antonio customers" }],
};
