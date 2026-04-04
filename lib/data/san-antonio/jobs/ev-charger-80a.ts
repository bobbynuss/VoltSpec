import type { Job } from "../../types";
import { diagram } from "../diagrams/ev-charger-80a";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "ev-charger-80a",
  label: "80A / 100A Level 2 EV Charger (Hardwired)",
  requirements: [
    "NEC 2026 Art. 625: EV charging equipment must be listed and labeled",
    "80A continuous load requires 100A breaker (125% rule per NEC 625.41)",
    "Load calculation per NEC 220 required — verify 200A panel can support 80A continuous + existing loads",
    "May require service upgrade to 400A if panel capacity is insufficient",
    "GFCI protection required — built into EVSE or provided at breaker (NEC 625.54)",
    "Dedicated circuit — no other loads on this circuit",
    "Disconnect within sight of EVSE required per NEC 625.43",
    "Hardwired connection per manufacturer instructions — no receptacle",
    "City of San Antonio electrical permit required for new high-amperage branch circuit",
    "CPS Energy offers EV charging programs — check cpsenergy.com for current incentives",
  ],
  materials: [
    { item: "2-Pole 100A GFCI Breaker", quantity: "1", spec: "Eaton BRN2100GF - BR 2-pole 100A GFCI 120/240V 10kAIC, dedicated EV circuit per NEC 625.54, 125% sizing for 80A continuous", unitPrice: 244.49 },
    { item: "4 AWG THHN Black", quantity: "60 ft", spec: "COP THHN4STBK500 - 4 AWG THHN stranded black, hot conductor, sold per ft", unitPrice: 1.65 },
    { item: "4 AWG THHN Red", quantity: "60 ft", spec: "COP THHN4STRD500 - 4 AWG THHN stranded red, second hot conductor, sold per ft", unitPrice: 1.65 },
    { item: "8 AWG THHN Green", quantity: "60 ft", spec: "COP THHN8STGN500 - 8 AWG THHN stranded green, equipment grounding conductor, sold per ft", unitPrice: 0.65 },
    { item: "1 in. ENT Blue Flex", quantity: "1 coil (100 ft)", spec: "PVF ENT1B0X - 1 in. x 100 ft blue ENT coil, panel to garage EVSE location, sold as full 100 ft coil only — not cut to length", unitPrice: 130.43 },
    { item: "100A Non-Fusible Disconnect", quantity: "1", spec: "Eaton DPB222R - 100A 240V non-fusible disconnect, NEMA 3R, within sight of EVSE per NEC 625.43", unitPrice: 61.22 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, protect EV circuit", unitPrice: 136.51 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb", unitPrice: 8.55 },
  ],
  blueprintNotes: [
    "Load calculation required: 80A continuous = 100A breaker, verify panel has capacity",
    "If total connected load exceeds 200A panel rating, service upgrade to 400A may be required",
    "Route 4 AWG THHN in 1 in. ENT flex from main panel to garage wall-mount location",
    "Install 100A disconnect within sight of EVSE — lockable, outdoor rated",
    "EVSE mounts at 48 in. AFF on driver side of parking area",
    "Hardwired connection — EVSE pigtail connects directly in junction box, no receptacle",
    "Label breaker: 'EV CHARGER - GARAGE - 80A CONTINUOUS / 100A BREAKER'",
    "Use BR series BRN2100GF GFCI breaker — verify EVSE amperage with manufacturer",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: [...SA_OFFICIAL_DOCS, { title: "CPS Energy EV Charging Programs", url: "https://www.cpsenergy.com/en/about-us/programs-services/electric-vehicles.html", description: "CPS Energy electric vehicle programs and charging information for San Antonio customers" }],
};
