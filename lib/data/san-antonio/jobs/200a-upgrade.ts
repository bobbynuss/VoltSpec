import type { Job } from "../../types";
import { diagram } from "../diagrams/200a-upgrade";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "200a-upgrade",
  label: "200A Service Upgrade/Panel Swap",
  requirements: [
    "NEC 2026 Art. 230: Existing service must be upgraded to current code at time of permit",
    "CPS Energy Residential Service Application required - CPS must coordinate meter pull and reconnect",
    "Outdoor disconnect required if not already present per NEC 230.85",
    "All new work must meet NEC 2026 - existing wiring grandfathered unless altered",
    "AFCI required on all bedroom/living circuits if panel is replaced",
    "GFCI required on all wet location circuits",
    "Ground electrode system must be verified/upgraded to NEC 250",
    "City of San Antonio electrical permit required + CPS Energy service application",
    "CPS Energy inspection required before reconnection - call (210) 353-4050",
  ],
  materials: [
    { item: "200A BR Main Breaker Panel", quantity: "1", spec: "Eaton BRP20B200R - BR PON loadcenter 200A main breaker 20 space NEMA 3R, plug-on neutral", unitPrice: 343.97 },
    { item: "200A Ringless Meter Socket", quantity: "1", spec: "Eaton 1009874ACH - 200A single-phase ringless meter socket, CPS Energy approved - replace only if upgrading meter base", unitPrice: 206.32 },
    { item: "40-Space MLO Panel (optional)", quantity: "1", spec: "Eaton BRP40L200G - BR PON loadcenter 200A MLO 40 space with ground bar, for additional circuits", unitPrice: 235.17 },
    { item: "4/0-4/0-2/0 AL SER Cable", quantity: "10 ft", spec: "ALU SER401000 - 4/0-4/0-2/0 AL SER 600V service entrance cable, sold per ft", unitPrice: 5.85 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, whole-panel SPD per NEC 242", unitPrice: 136.51 },
    { item: "Dual Function AFCI+GFCI Breaker 20A", quantity: "8", spec: "Eaton BRP120DF - BR dual function AF/GF 1-pole 20A plug-on neutral breaker, bedroom/living circuits", unitPrice: 75.6 },
    { item: "Dual Function AFCI+GFCI Breaker 15A", quantity: "4", spec: "Eaton BRP115DF - BR dual function AF/GF 1-pole 15A plug-on neutral breaker", unitPrice: 75.6 },
    { item: "GFCI Breaker 30A 2-Pole", quantity: "1", spec: "Eaton BRN230GF - BR 2-pole 30A GFCI 120/240V 10kAIC, water heater circuit", unitPrice: 244.49 },
    { item: "2-Pole 30A Breaker", quantity: "2", spec: "Eaton BR230 - Type BR breaker 30A/2-pole 120/240V 10K, dryer and HVAC circuits", unitPrice: 21.67 },
    { item: "2-Pole 50A Breaker", quantity: "1", spec: "Eaton BR250 - Type BR breaker 50A/2-pole 120/240V 10K, range or EV charger circuit", unitPrice: 26.4 },
    { item: "1-Pole 20A Breaker", quantity: "4", spec: "Eaton BR120 - Type BR breaker 20A/1-pole 120/240V 10K", unitPrice: 9.43 },
    { item: "60A AC Disconnect", quantity: "1", spec: "Eaton DPB222R - 60A/2P air conditioning disconnect molded case switch", unitPrice: 61.22 },
    { item: "4 AWG Bare Copper GEC", quantity: "10 ft", spec: "COP BARE4SOL500 - 4 AWG solid bare copper GEC, sold per ft", unitPrice: 2.1 },
    { item: "5/8 x 8 ft Ground Rod", quantity: "2", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod", unitPrice: 29.81 },
    { item: "Ground Rod Clamp", quantity: "2", spec: "Thomas & Betts G5 - 1/2 in. x 5/8 in. ground rod clamp", unitPrice: 4.5 },
    { item: "15A TR GFCI Receptacle", quantity: "4", spec: "Eaton TRGF15W - TR self-test GFCI 15A 125V white, indoor wet locations", unitPrice: 26.14 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit entries per NEC 230.8", unitPrice: 8.55 },
    { item: "Panel Directory Label Kit", quantity: "1", spec: "Brady 95543 - adhesive panel directory label kit, typed circuit labels required by AHJ at inspection", unitPrice: 12 },
  ],
  blueprintNotes: [
    "Document existing panel directory before removal",
    "Photo all existing wiring connections before transfer",
    "New panel: Eaton BRP20B200R (BR series plug-on neutral) - verify bus compatibility",
    "Install BRNSURGE10 surge arrester in new panel per NEC 242",
    "Coordinate with CPS Energy for meter pull window - submit service application first",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: SA_OFFICIAL_DOCS,
};
