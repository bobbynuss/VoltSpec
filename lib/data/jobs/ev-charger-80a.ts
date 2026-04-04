import type { Job } from "../types";
import { diagram } from "../diagrams/ev-charger-80a";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

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
    "Austin permit required: City of Austin electrical permit for new high-amperage branch circuit",
    "Austin Energy may offer EV charging incentives — check austinenergy.com",
  ],
  materials: [
    { item: "2-Pole 100A GFCI Breaker", quantity: "1", spec: "Eaton CHFP2100GF - CH 2-pole 100A GFCI breaker, dedicated EV circuit per NEC 625.54, 125% sizing for 80A continuous", unitPrice: 185 },
    { item: "4 AWG THHN Black", quantity: "60 ft", spec: "COP THHN4STBK500 - 4 AWG THHN stranded black, hot conductor, sold per ft", unitPrice: 1.65 },
    { item: "4 AWG THHN Red", quantity: "60 ft", spec: "COP THHN4STRD500 - 4 AWG THHN stranded red, second hot conductor, sold per ft", unitPrice: 1.65 },
    { item: "8 AWG THHN Green", quantity: "60 ft", spec: "COP THHN8STGN500 - 8 AWG THHN stranded green, equipment grounding conductor, sold per ft", unitPrice: 0.65 },
    { item: "1-1/4 in. EMT Conduit", quantity: "60 ft", spec: "CON EMT114 - 1-1/4 in. EMT 10 ft stick, panel to garage EVSE location", unitPrice: 8.50 },
    { item: "1-1/4 in. EMT Set-Screw Connectors", quantity: "6", spec: "Bridgeport 233 - 1-1/4 in. EMT set-screw connector", unitPrice: 2.25 },
    { item: "1-1/4 in. EMT Set-Screw Couplings", quantity: "6", spec: "Bridgeport 243 - 1-1/4 in. EMT set-screw coupling", unitPrice: 1.85 },
    { item: "1-1/4 in. EMT One-Hole Straps", quantity: "12", spec: "Bridgeport 923S - 1-1/4 in. EMT one-hole strap, support every 10 ft", unitPrice: 0.65 },
    { item: "1-1/4 in. LB Condulet Body", quantity: "1", spec: "Crouse-Hinds LB45 - 1-1/4 in. LB condulet body with cover and gasket, exterior wall penetration", unitPrice: 18.50 },
    { item: "100A Non-Fusible Disconnect", quantity: "1", spec: "Eaton DPF222R - 100A 240V non-fusible disconnect, NEMA 3R, within sight of EVSE per NEC 625.43", unitPrice: 72 },
    { item: "4-Square Box Deep", quantity: "2", spec: "Crouse-Hinds TP403 - 4 in. square 2-1/8 in. deep steel outlet box", unitPrice: 4.44 },
    { item: "Outdoor In-Use Cover", quantity: "1", spec: "Taymac MM420C - extra-duty while-in-use weatherproof cover, if EVSE disconnect is outdoors", unitPrice: 11.47 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit wall penetrations", unitPrice: 6.36 },
  ],
  blueprintNotes: [
    "Load calculation required: 80A continuous = 100A breaker, verify panel has capacity",
    "If total connected load exceeds 200A panel rating, service upgrade to 400A may be required",
    "Route 4 AWG THHN in 1-1/4 in. EMT from main panel to garage wall-mount location",
    "Install 100A disconnect (DPF222R) within sight of EVSE — lockable, outdoor rated",
    "EVSE mounts at 48 in. AFF on driver side of parking area",
    "Hardwired connection — EVSE pigtail connects directly in junction box, no receptacle",
    "Label breaker: 'EV CHARGER - GARAGE - 80A CONTINUOUS / 100A BREAKER'",
    "GFCI protection integral to EVSE — verify UL listing includes GFCI per NEC 625.54",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: [...AUSTIN_OFFICIAL_DOCS, { title: "EV Charger Rebate Program – Austin Energy", url: "https://austinenergy.com/green-power/plug-in-austin/EVerything-Charging", description: "Austin Energy EV charger rebates and incentives — up to $1,200 back on Level 2 charger installations for residential customers" }],
};
