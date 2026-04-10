import type { Job } from "../types";
import { diagram } from "../diagrams/dc-switchgear";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "dc-switchgear",
  label: "Data Center Build-Out \u2013 Phase 3: Main Service Entrance / Switchgear",
  requirements: [
    "NEC 2026 Art. 230: Service entrance conductors and equipment rated for maximum available fault current at premises",
    "NEC 2026 Art. 408.36: Switchboards and switchgear must be marked with short-circuit current rating \u2014 65kAIC minimum typical for data center applications",
    "NEC 2026 Art. 240.87: Arc energy reduction required for breakers rated 1200A and above \u2014 zone-selective interlocking (ZSI) or maintenance mode recommended",
    "NEC 2026 Art. 110.26: Working clearances \u2014 minimum 4 ft front clearance for 480V equipment; 3.5 ft for 277V; verify with AHJ for higher fault levels",
    "NEC 2026 Art. 110.34: Dedicated electrical room required \u2014 minimum 6 ft headroom, fire-rated walls, HVAC for heat dissipation from switchgear and bus duct",
    "NEC 2026 Art. 408.18: Switchgear must have arc-flash labels per NFPA 70E / IEEE 1584 \u2014 incident energy calculation required before energization",
    "NEC 2026 Art. 250.24: Grounding electrode conductor from main switchgear to building grounding electrode system \u2014 size per Table 250.66",
    "NEC 2026 Art. 285: Type 1 surge protective device (SPD) required at service entrance \u2014 minimum 200kA per mode for data center applications",
    "NEC 2026 Art. 368: Busway (bus duct) installations \u2014 supported at intervals not exceeding 5 ft, fire-rated penetrations at wall/floor crossings",
    "Utility coordination: submit load letter, one-line diagram, and relay coordination study to utility \u2014 utility sets CT ratio and metering requirements",
    "Selective coordination study required per NEC 700.32 / 701.27 \u2014 all overcurrent devices must coordinate from service to final branch circuit",
    "Commissioning required: MEP commissioning agent must verify switchgear, breaker operation, relay settings, and emergency transfer sequence before occupancy",
    "Permit required: electrical permit + fire alarm permit (dedicated electrical room) + mechanical permit (switchgear room HVAC)",
  ],
  materials: [
    // \u2500\u2500 Main Switchgear \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "4000A Main Switchgear Lineup",
      quantity: "1",
      spec: "Eaton Pow-R-Line C switchgear, 4000A, 480/277V, 3-phase 4-wire, 65kAIC, NEMA 1 indoor, with main breaker section + (2) 1600A distribution sections + metering section \u2014 engineered to order, verify lead time 16\u201324 weeks",
    },
    {
      item: "4000A Main Circuit Breaker",
      quantity: "1",
      spec: "Eaton Magnum DS MDSC4004Y - 4000A, 635V, 65kAIC, digitrip RMS 510 with ZSI, draw-out power circuit breaker \u2014 installed in main switchgear",
    },
    {
      item: "1600A Distribution Breaker",
      quantity: "3",
      spec: "Eaton Magnum DS MDSC1604Y - 1600A, 635V, 65kAIC, digitrip RMS 510, draw-out power circuit breaker \u2014 feeds MDP-A, MDP-B, MDP-C",
    },
    {
      item: "800A Feeder Breaker",
      quantity: "4",
      spec: "Eaton RDC320T106W - Digitrip 520 series, 800A, 600V, 3-pole, 65kAIC, draw-out \u2014 spare/future feeder positions in switchgear",
    },
    // \u2500\u2500 CT Cabinet / Revenue Metering \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "CT Cabinet / Metering Section",
      quantity: "1",
      spec: "CT metering cabinet, NEMA 3R, with (3) 4000:5 revenue-grade CTs + utility meter socket \u2014 coordinate CT ratio and mounting with utility, verify approved meter form",
      unitPrice: 3800.00,
    },
    {
      item: "Revenue-Grade CT Set (4000:5)",
      quantity: "1",
      spec: "Set of (3) 4000:5 accuracy class 0.3 window-type current transformers, revenue metering grade \u2014 utility specifies manufacturer and ratio",
      unitPrice: 1200.00,
    },
    // \u2500\u2500 Busway (Bus Duct) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "1600A Busway (per 10 ft section)",
      quantity: "10",
      spec: "Eaton Pow-R-Way III, 1600A, 600V, 4-wire, copper bus, 10 ft straight section, NEMA 1 indoor \u2014 switchgear to MDP runs",
    },
    {
      item: "1600A Busway Elbow",
      quantity: "6",
      spec: "Eaton Pow-R-Way III, 1600A 90\u00b0 elbow section, horizontal or vertical direction change",
    },
    {
      item: "1600A Busway Tee",
      quantity: "2",
      spec: "Eaton Pow-R-Way III, 1600A tee section, branch distribution from main run",
    },
    {
      item: "1600A Busway End Closure",
      quantity: "2",
      spec: "Eaton Pow-R-Way III, 1600A end closure, terminate unused bus duct ends",
      unitPrice: 85.00,
    },
    {
      item: "Busway Hanger / Support",
      quantity: "20",
      spec: "Eaton B-Line B2073ZN - trapeze-style busway hanger, zinc plated, supports per NEC 368.30 every 5 ft maximum",
      unitPrice: 42.00,
    },
    // \u2500\u2500 Distribution Panels (MDP) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "1600A Main Distribution Panel",
      quantity: "3",
      spec: "Eaton Pow-R-Line PRL4 panelboard, 1600A MLO, 480/277V, 3-phase 4-wire, 42 spaces, 65kAIC \u2014 MDP-A (mech), MDP-B (lighting), MDP-C (critical)",
    },
    {
      item: "400A 3-Pole Breaker (MDP)",
      quantity: "6",
      spec: "Eaton HFD3400 - 400A, 600V, 3-pole, 65kAIC molded case circuit breaker, MDP feeder breakers",
      unitPrice: 680.00,
    },
    {
      item: "225A 3-Pole Breaker (MDP)",
      quantity: "12",
      spec: "Eaton FDB3225 - 225A, 600V, 3-pole, 65kAIC molded case circuit breaker, MDP branch feeder positions",
      unitPrice: 320.00,
    },
    {
      item: "100A 3-Pole Breaker (MDP)",
      quantity: "12",
      spec: "Eaton FDB3100 - 100A, 600V, 3-pole, 65kAIC molded case circuit breaker, MDP branch breakers",
      unitPrice: 195.00,
    },
    // \u2500\u2500 Surge Protection \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Type 1 SPD (Service Entrance)",
      quantity: "1",
      spec: "Eaton SPD200480Y3M - 200kA/mode Type 1 surge protective device, 480/277V WYE, 3-phase, NEMA 4X, installed at main switchgear service entrance",
      unitPrice: 4200.00,
    },
    {
      item: "Type 2 SPD (Distribution)",
      quantity: "3",
      spec: "Eaton SPD100480Y3K - 100kA/mode Type 2 surge protective device, 480/277V, one per MDP",
      unitPrice: 1800.00,
    },
    // \u2500\u2500 Cable Tray \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "24 in. Aluminum Ladder Tray (12 ft)",
      quantity: "30",
      spec: "Cooper B-Line 24A12-12-144 - 24 in. wide aluminum ladder cable tray, 12 ft sections, 6 in. rung spacing, switchgear room to MDP runs",
      unitPrice: 165.00,
    },
    {
      item: "Cable Tray 90\u00b0 Horizontal Bend",
      quantity: "8",
      spec: "Cooper B-Line 24A12-90HB - 24 in. aluminum ladder tray 90\u00b0 horizontal bend",
      unitPrice: 220.00,
    },
    {
      item: "Cable Tray Tee",
      quantity: "4",
      spec: "Cooper B-Line 24A12-HT - 24 in. aluminum ladder tray horizontal tee",
      unitPrice: 285.00,
    },
    {
      item: "Cable Tray Trapeze Support",
      quantity: "40",
      spec: "Cooper B-Line B2073ZN - trapeze hanger kit with 3/8 in. threaded rod, for overhead cable tray support every 8 ft",
      unitPrice: 28.00,
    },
    {
      item: "Cable Tray Splice Plate",
      quantity: "30",
      spec: "Cooper B-Line 9A-1006 - ladder tray splice plate with hardware, section-to-section connections",
      unitPrice: 12.00,
    },
    {
      item: "Cable Tray Barrier Strip",
      quantity: "30",
      spec: "Cooper B-Line TBS24 - 24 in. cable tray barrier strip, power/control/data separation per NEC 300.3",
      unitPrice: 18.00,
    },
    // \u2500\u2500 Grounding & Bonding \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "4/0 Bare Copper GEC",
      quantity: "100 ft",
      spec: "COP BARE40STR500 - 4/0 stranded bare copper, main grounding electrode conductor \u2014 switchgear to building ground grid, sold per ft",
    },
    {
      item: "Main Ground Bus",
      quantity: "1",
      spec: "NSI MGB24 - 24-terminal main ground bus bar, 1/4 in. x 4 in. copper, mounted in switchgear room \u2014 bonds switchgear, cable tray, building steel, ground grid",
      unitPrice: 185.00,
    },
    {
      item: "Equipment Ground Bus (MDP)",
      quantity: "3",
      spec: "NSI GBK21 - 21-terminal ground bar kit, one per MDP for branch circuit equipment grounding conductors",
      unitPrice: 32.97,
    },
    {
      item: "Bonding Jumper (Cable Tray)",
      quantity: "30",
      spec: "NSI GBC40 - 4/0 AWG bonding jumper, 18 in., bonding cable tray sections together and to ground bus per NEC 392.60",
      unitPrice: 22.00,
    },
    // \u2500\u2500 Fire Protection / Safety \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Arc Flash Warning Labels",
      quantity: "1",
      spec: "Brady AF-KITDC - data center arc flash label kit, pre-printed and custom labels per NFPA 70E / IEEE 1584, one kit covers switchgear + MDPs",
      unitPrice: 165.00,
    },
    {
      item: "DANGER HIGH VOLTAGE Signs",
      quantity: "8",
      spec: "Brady 22530 - DANGER HIGH VOLTAGE sign, 10x14 in., self-adhesive polyester, OSHA-compliant \u2014 switchgear room doors, panels, disconnects",
      unitPrice: 8.50,
    },
    {
      item: "Fire Extinguisher (CO2, 10 lb)",
      quantity: "2",
      spec: "Amerex 330 - 10 lb CO2 fire extinguisher, Class B:C, for electrical rooms \u2014 wall-mounted near switchgear and MDP rooms",
      unitPrice: 210.00,
    },
  ],
  blueprintNotes: [
    "Switchgear is engineered-to-order \u2014 16\u201324 week lead time typical \u2014 order early in Phase 2",
    "Verify available fault current with utility \u2014 switchgear and all downstream devices must be rated to interrupt",
    "Arc flash study (IEEE 1584) required before energization \u2014 labels on all equipment with incident energy and PPE category",
    "Selective coordination study per NEC 700.32 / 701.27 \u2014 breaker time-current curves must coordinate service to branch",
    "Zone-selective interlocking (ZSI) between main and distribution breakers \u2014 reduces arc flash energy and improves selectivity",
    "Bus duct routing: overhead preferred \u2014 fire-rated penetration assemblies required at all wall and floor crossings",
    "Bus duct supports every 5 ft maximum per NEC 368.30 \u2014 verify structural capacity for bus duct weight (copper bus is heavy)",
    "Dedicated electrical room: fire-rated walls, HVAC for heat dissipation, emergency lighting, smoke detection, clean agent suppression",
    "Cable tray: 24 in. minimum for 480V power runs \u2014 barrier strips required for power/control/data separation per NEC 300.3",
    "Revenue metering: utility specifies CT ratio, meter form, and mounting \u2014 coordinate early, CTs are long-lead items",
    "Main ground bus bonds: switchgear frame, cable tray system, building structural steel, water pipe, Ufer electrode, and external ground grid from Phase 2",
    "Install isolated ground system for sensitive IT loads \u2014 Phase 4 UPS output uses dedicated IG bus",
    "Infrared (IR) scan windows recommended on switchgear doors for live thermal monitoring without opening covers",
    "Adjust all quantities based on actual switchgear configuration, number of feeders, and building layout",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
