import type { Job } from "../../types";
import { diagram } from "../diagrams/generator-ats";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "generator-ats",
  label: "Whole-House Generator with ATS",
  requirements: [
    "NEC 2026 Art. 702: Legally required and optional standby systems",
    "Automatic Transfer Switch (ATS) required for whole-house generator backup",
    "Generator must be installed per manufacturer specs with proper clearances",
    "Natural gas or LP fuel supply must be sized for generator load - coordinate with plumber",
    "NEC 445.18: Generator disconnect required within sight of generator",
    "CPS Energy notification required - no backfeed protection concerns with properly installed ATS",
    "City of San Antonio electrical and mechanical permits required",
    "Generator pad or mounting base per local building code and manufacturer requirements",
  ],
  materials: [
    { item: "Whole-House Generator 22kW", quantity: "1", spec: "Generac 7043 - Guardian 22kW air-cooled standby generator with 200A SE-rated ATS, natural gas/LP", unitPrice: 8800 },
    { item: "200A Service Entrance ATS", quantity: "1", spec: "Generac RXSW200A3 - 200A SE-rated automatic transfer switch, included with 7043 or sold separately", unitPrice: 1213.73 },
    { item: "Generator Mounting Pad", quantity: "1", spec: "Generac 5602 - GenPad composite generator mounting pad, 18x36 in.", unitPrice: 185 },
    { item: "6 AWG THHN Black", quantity: "30 ft", spec: "COP THHN6STBK500 - 6 AWG THHN stranded black, generator to ATS wiring, sold per ft", unitPrice: 0.85 },
    { item: "1 in. ENT Blue Flex", quantity: "1 coil (100 ft)", spec: "PVF ENT1B0X - 1 in. ENT flex for generator whip connection", unitPrice: 130.43 },
    { item: "1/2 in. NM Liquid-Tight Connector", quantity: "4", spec: "Sperry/Halex 8403 - 1/2 in. non-metallic liquid-tight straight connector", unitPrice: 3.25 },
    { item: "60A AC Disconnect", quantity: "1", spec: "Eaton DPB222R - 60A/2P air conditioning disconnect molded case switch, generator disconnect", unitPrice: 61.22 },
    { item: "2-Pole 60A Breaker", quantity: "1", spec: "Eaton BR260 - Type BR breaker 60A/2-pole 120/240V 10K, if ATS feeds existing panel", unitPrice: 26.4 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, protect panel from generator transients", unitPrice: 136.51 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal all conduit penetrations", unitPrice: 8.55 },
    { item: "Ground Rod", quantity: "1", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod, generator grounding electrode", unitPrice: 29.81 },
    { item: "Ground Rod Clamp", quantity: "1", spec: "Thomas & Betts G5 - 1/2 in. x 5/8 in. ground rod clamp", unitPrice: 4.5 },
    { item: "6 AWG Bare Copper GEC", quantity: "10 ft", spec: "COP BARE6SOL500 - 6 AWG solid bare copper GEC, sold per ft, generator ground", unitPrice: 1.45 },
  ],
  blueprintNotes: [
    "Generator pad: min 5 ft from building openings, 18 in. from walls, per manufacturer clearances",
    "ATS: install between meter and main panel - CPS Energy meter stays energized",
    "Gas line: coordinate with licensed plumber for properly sized gas supply to generator",
    "Exercise schedule: set weekly 15-min exercise cycle, avoid peak demand hours",
    "Notify CPS Energy of generator installation for their records",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: SA_OFFICIAL_DOCS,
};
