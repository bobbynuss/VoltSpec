import type { Job } from "../../types";
import { diagram } from "../diagrams/temp-power-pole";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "temp-power-pole",
  label: "Temporary Construction Power Pole",
  requirements: [
    "NEC 2026 Art. 590: Temporary wiring for construction - 90 day maximum unless renewed",
    "CPS Energy temporary meter loop must comply with CPS Service Standards - Temporary Service (Overhead)",
    "GFCI protection required on all 15A and 20A, 125V receptacles per NEC 590.6",
    "Temp pole must be rated for service voltage and properly guyed/braced",
    "CPS Energy Temporary Service Application required - apply via Construction & Renovation Portal",
    "City of San Antonio Temporary Meter Loop permit required",
    "Meter loop drawing must be approved by CPS Energy Customer Engineering",
  ],
  materials: [
    { item: "Temporary Power Pole", quantity: "1", spec: "4x4 or 4x6 treated lumber, 12-14 ft, rated for temp service mount", unitPrice: 85 },
    { item: "200A Ringless Meter Socket", quantity: "1", spec: "Eaton 1009874ACH - 200A single-phase ringless meter socket, CPS Energy approved", unitPrice: 206.32 },
    { item: "200A BR Main Breaker Panel", quantity: "1", spec: "Eaton BRP20B200R - BR PON loadcenter 200A main breaker 20 space NEMA 3R", unitPrice: 343.97 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester", unitPrice: 136.51 },
    { item: "3 in. Schedule 40 PVC Conduit", quantity: "8 ft", spec: "PVC PVC3 - Schedule 40 3 in. PVC conduit, meter to panel run on pole", unitPrice: 2.44 },
    { item: "3 in. PVC Male Adapter", quantity: "2", spec: "PVF TA3 - 3 in. PVC male adapter", unitPrice: 4.51 },
    { item: "2 in. RMC Weatherhead", quantity: "1", spec: "Bridgeport 1256 - 2 in. service entrance weatherhead", unitPrice: 20.82 },
    { item: "3/0 AWG AL XHHW-2", quantity: "20 ft", spec: "ALU XHHW3001000 - 3/0 AWG AL XHHW-2 600V, service entrance conductors", unitPrice: 2.85 },
    { item: "5/8 x 8 ft Ground Rod", quantity: "2", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod", unitPrice: 29.81 },
    { item: "Ground Rod Clamp", quantity: "2", spec: "Thomas & Betts G5 - 1/2 in. x 5/8 in. ground rod clamp", unitPrice: 4.5 },
    { item: "4 AWG Bare Copper GEC", quantity: "15 ft", spec: "COP BARE4SOL500 - 4 AWG solid bare copper GEC, sold per ft", unitPrice: 2.1 },
    { item: "15A TR GFCI Receptacle", quantity: "2", spec: "Eaton TRGF15W - TR self-test GFCI 15A 125V white, construction power", unitPrice: 26.14 },
    { item: "20A GFCI Dual Function", quantity: "2", spec: "Eaton GFD20W - GFCI dual function 20A slim, wet locations", unitPrice: 32.63 },
    { item: "In-Use Weatherproof Cover", quantity: "2", spec: "Taymac MM420C - 1G 2-3/4 in. extra-duty while-in-use cover", unitPrice: 12.9 },
    { item: "NEMA 6-50R Receptacle", quantity: "1", spec: "Eaton AH1258BKF - receptacle single flush 50A 125/250V 3P4W black, for welders/equipment", unitPrice: 10.4 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb", unitPrice: 8.55 },
    { item: "Guy Wire and Anchors", quantity: "1", spec: "Pole bracing kit - guy wire, turnbuckles, earth anchors as needed for pole stability", unitPrice: 45 },
  ],
  blueprintNotes: [
    "Temp pole: set 3-4 ft in ground, brace or guy if needed for stability",
    "Meter socket: 1009874ACH at 5 ft AFF (center) per CPS Energy standards",
    "Panel: BRP20B200R with BRNSURGE10 surge arrester",
    "All receptacles must have GFCI protection per NEC 590.6",
    "Submit meter loop drawing for CPS Energy Customer Engineering approval",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: SA_OFFICIAL_DOCS,
};
