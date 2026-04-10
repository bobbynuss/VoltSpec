import type { Job } from "../types";
import { diagram } from "../diagrams/dc-generator-ups";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "dc-generator-ups",
  label: "Data Center Build-Out \u2013 Phase 4: Generator / UPS / Critical Power Systems",
  requirements: [
    "NEC 2026 Art. 700: Emergency systems \u2014 generator and ATS must restore power within 10 seconds of utility failure",
    "NEC 2026 Art. 700.12: Emergency power source must have adequate fuel supply for minimum 2 hours at full load (data centers typically 24\u201372 hours)",
    "NEC 2026 Art. 700.32: Selective coordination required for ALL emergency system overcurrent devices \u2014 from generator to final branch",
    "NEC 2026 Art. 445: Generator installations \u2014 nameplate rating, overcurrent protection, grounding, and disconnecting means per manufacturer specs",
    "NEC 2026 Art. 480: Battery installations \u2014 dedicated ventilated room, spill containment, overcurrent protection, and disconnect per battery manufacturer",
    "NEC 2026 Art. 706: Energy storage systems \u2014 Li-ion batteries require spacing per manufacturer, fire detection, and thermal runaway protection",
    "NEC 2026 Art. 250.36: Separately derived systems \u2014 UPS output requires dedicated grounding electrode conductor when configured as separately derived",
    "NFPA 110: Emergency and standby power systems \u2014 installation, testing, and maintenance requirements for generator and ATS",
    "NFPA 111: Stored electrical energy emergency systems (UPS/battery) \u2014 installation and testing requirements",
    "EPA / TCEQ: Diesel generator emissions \u2014 Tier 4 Final compliance required for new installations, fuel storage permits per local fire marshal",
    "Fire marshal coordination: fuel storage tanks require fire suppression, spill containment, and secondary containment per IFC Chapter 57",
    "Acoustic requirements: generator exhaust silencers \u2014 verify local noise ordinance dB limits at property line (typically 65\u201375 dBA)",
    "Commissioning required: full load bank test (4 hours minimum), transfer test (utility-to-generator-to-UPS), and battery discharge test before occupancy",
    "Permit required: electrical permit + mechanical permit (exhaust) + fire permit (fuel storage) + environmental permit (Tier 4 generator)",
  ],
  materials: [
    // \u2500\u2500 Generators \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "2000kW Diesel Generator",
      quantity: "3",
      spec: "GNR SDMD2250 - Generac 2250kW standby diesel generator, 480/277V 3-phase, 60Hz, EPA Tier 4 Final, weatherproof enclosure, sub-base fuel tank (1000 gal), digital paralleling controls \u2014 N+1 configuration (2 active + 1 redundant)",
    },
    {
      item: "Generator Concrete Pad",
      quantity: "3",
      spec: "Reinforced concrete pad, 12 ft \u00d7 25 ft \u00d7 12 in., with vibration isolators and fuel containment curb \u2014 structural engineer to specify",
    },
    {
      item: "Generator Output Cable (per set)",
      quantity: "3",
      spec: "Set of (4) 500 kcmil copper THHN per phase + (4) 3/0 ground, 480V 3-phase, gen output to paralleling switchgear \u2014 qty per generator, adjust length per layout",
    },
    // \u2500\u2500 Automatic Transfer / Paralleling Switchgear \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Paralleling Switchgear / ATS",
      quantity: "1",
      spec: "Eaton ATC-900 or Caterpillar ATC \u2014 4000A, 480/277V, 3-phase, 65kAIC, automatic paralleling switchgear with integrated ATS, load management, and utility/generator paralleling \u2014 engineered to order",
    },
    {
      item: "Generator Paralleling Breakers",
      quantity: "3",
      spec: "Eaton Magnum DS MDSC2004Y - 2000A, 635V, 65kAIC draw-out power circuit breaker, one per generator in paralleling switchgear",
    },
    {
      item: "Main ATS Breaker (Utility Side)",
      quantity: "1",
      spec: "Eaton Magnum DS MDSC4004Y - 4000A, 635V, 65kAIC draw-out breaker, utility source in ATS",
    },
    {
      item: "Main ATS Breaker (Generator Side)",
      quantity: "1",
      spec: "Eaton Magnum DS MDSC4004Y - 4000A, 635V, 65kAIC draw-out breaker, generator source in ATS",
    },
    // \u2500\u2500 UPS Systems \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "500kVA UPS Module",
      quantity: "4",
      spec: "Eaton 93PM or Vertiv Liebert EXL S1 \u2014 500kVA/500kW, 480V, modular double-conversion online UPS, hot-swappable power modules, N+1 configuration (3 active + 1 redundant) \u2014 15 min battery runtime at full load",
    },
    {
      item: "UPS Input/Output Cabinet",
      quantity: "4",
      spec: "UPS system input/output isolation cabinet with maintenance bypass, input breaker, output breaker, and manual bypass switch \u2014 matched to UPS manufacturer",
    },
    {
      item: "UPS Battery Cabinet (per UPS)",
      quantity: "4",
      spec: "Matched battery cabinet with VRLA batteries (or Li-ion modules), 15 min runtime at full load, integrated battery breaker and monitoring \u2014 per UPS manufacturer specs",
    },
    // \u2500\u2500 Power Distribution Units (PDUs) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "225kVA PDU (480\u2192208/120V)",
      quantity: "8",
      spec: "Eaton PDX or Vertiv Liebert \u2014 225kVA power distribution unit, 480V input, 208/120V output, K-13 rated transformer, 42-circuit RPP panelboard, network monitoring \u2014 feeds server rack rows",
    },
    {
      item: "Remote Power Panel (RPP)",
      quantity: "8",
      spec: "Eaton RPP-42 - 42-circuit remote power panel, 208/120V, 225A main lug, branch circuit monitoring, mounted at row-end in data hall \u2014 matched to PDU output",
      unitPrice: 2800.00,
    },
    // \u2500\u2500 Fuel System \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Main Fuel Storage Tank (10,000 gal)",
      quantity: "1",
      spec: "UL 142 double-wall above-ground diesel storage tank, 10,000 gallon, with leak detection, overfill protection, emergency vent, and spill containment \u2014 72-hour runtime at full generator load",
    },
    {
      item: "Day Tank (500 gal)",
      quantity: "3",
      spec: "UL 142 day tank, 500 gallon, with auto-fill pump from main tank, high/low level alarms, and return line \u2014 one per generator",
    },
    {
      item: "Fuel Transfer Pump System",
      quantity: "1",
      spec: "Duplex fuel transfer pump system with controls, strainer, check valves, and leak detection \u2014 main tank to day tanks, auto-fill with redundant pump",
    },
    {
      item: "Fuel Piping (2 in. Black Steel)",
      quantity: "200 ft",
      spec: "Schedule 40 black steel pipe, 2 in., fuel supply and return piping from main tank to generator day tanks \u2014 welded joints, slope to drain",
    },
    // \u2500\u2500 Generator Exhaust \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Critical Grade Exhaust Silencer",
      quantity: "3",
      spec: "Critical-grade (hospital/data center) exhaust silencer, 25\u201335 dB attenuation, sized for 2000kW generator \u2014 one per generator, verify noise ordinance at property line",
    },
    {
      item: "Exhaust Stack (12 in. SS)",
      quantity: "3",
      spec: "12 in. 304 stainless steel exhaust stack, insulated double-wall, with rain cap and flex connector to generator \u2014 route above roofline per local code",
    },
    // \u2500\u2500 Electrical Infrastructure \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "500 kcmil Cu THHN (Power)",
      quantity: "2000 ft",
      spec: "COP THHN500CU - 500 kcmil copper THHN, 600V, for paralleling switchgear to UPS and PDU feeder runs, sold per ft",
    },
    {
      item: "3/0 Cu THHN (Neutral/Ground)",
      quantity: "500 ft",
      spec: "COP THHN30CU - 3/0 copper THHN, 600V, neutral and equipment grounding conductors, sold per ft",
    },
    {
      item: "4/0 Bare Copper (Isolated Ground)",
      quantity: "200 ft",
      spec: "COP BARE40STR500 - 4/0 stranded bare copper, isolated ground bus system from UPS output to PDU/RPP ground bus, sold per ft",
    },
    {
      item: "24 in. Cable Tray (12 ft section)",
      quantity: "20",
      spec: "Cooper B-Line 24A12-12-144 - 24 in. aluminum ladder cable tray, generator room to paralleling switchgear to UPS room runs",
      unitPrice: 165.00,
    },
    {
      item: "Cable Tray Supports & Hardware",
      quantity: "30",
      spec: "Cooper B-Line B2073ZN - trapeze hanger kit, overhead cable tray support, every 8 ft",
      unitPrice: 28.00,
    },
    // \u2500\u2500 Battery Room Requirements \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Hydrogen Detection System",
      quantity: "1",
      spec: "MSA Ultima X5000 or equivalent \u2014 fixed hydrogen gas detection system with (4) sensors, controller, alarm relay, and battery room exhaust fan interlock \u2014 required for VRLA battery rooms per IFC 608",
      unitPrice: 3200.00,
    },
    {
      item: "Battery Room Exhaust Fan",
      quantity: "2",
      spec: "Explosion-proof exhaust fan, sized per IEEE 1635/ASHRAE 21 for hydrogen dilution ventilation \u2014 continuous operation, interlocked with H\u2082 detector",
      unitPrice: 1400.00,
    },
    {
      item: "Battery Spill Containment",
      quantity: "1",
      spec: "Acid-resistant spill containment system for battery room floor, 110% of largest battery string electrolyte volume \u2014 trays, curbing, and neutralization agent",
      unitPrice: 2200.00,
    },
    {
      item: "Emergency Eyewash Station",
      quantity: "1",
      spec: "Haws 7620 - pedestal-mounted emergency eyewash station, ANSI Z358.1 compliant, required within 10 seconds of battery room per OSHA",
      unitPrice: 650.00,
    },
    // \u2500\u2500 Testing & Commissioning Equipment \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Resistive Load Bank (rental)",
      quantity: "1",
      spec: "2000kW resistive load bank, 480V, trailer-mounted \u2014 for generator full-load commissioning test (4 hours), rental unit, coordinate with commissioning agent",
    },
    // \u2500\u2500 Miscellaneous \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Arc Flash Warning Labels",
      quantity: "1",
      spec: "Brady AF-KITDC - arc flash label kit per NFPA 70E, covers paralleling switchgear + UPS + PDU panels",
      unitPrice: 165.00,
    },
    {
      item: "DANGER HIGH VOLTAGE Signs",
      quantity: "12",
      spec: "Brady 22530 - DANGER HIGH VOLTAGE sign, 10x14 in., OSHA-compliant \u2014 generator enclosures, ATS, UPS room, battery room",
      unitPrice: 8.50,
    },
    {
      item: "Fire Extinguisher (CO2, 15 lb)",
      quantity: "4",
      spec: "Amerex 332 - 15 lb CO2 fire extinguisher, Class B:C, for generator room, UPS room, battery room, and PDU area",
      unitPrice: 280.00,
    },
  ],
  blueprintNotes: [
    "Generator sizing: N+1 redundancy \u2014 (2) 2MW active + (1) 2MW standby covers full facility critical load with one unit down for maintenance",
    "Paralleling switchgear: auto-start all generators on utility failure, parallel to bus, ATS transfers critical load within 10 seconds",
    "UPS configuration: N+1 modular \u2014 (3) 500kVA active + (1) 500kVA hot standby, 15 min battery runtime bridges generator start + stabilization",
    "Fuel: 10,000 gal main tank provides 72-hour runtime at full load \u2014 day tanks auto-fill, dual fuel transfer pumps for redundancy",
    "Exhaust: critical-grade silencers + roofline stacks \u2014 verify noise at property line meets local ordinance (typically 65\u201375 dBA)",
    "Battery room: dedicated space with H\u2082 detection, continuous ventilation, spill containment, eyewash, and fire suppression",
    "PDU placement: distribute across data hall to minimize branch circuit run length \u2014 A+B feeds to each rack row for 2N redundancy",
    "Isolated ground system: dedicated IG bus from UPS output through PDU to rack PDUs \u2014 prevents ground loops in sensitive IT equipment",
    "Cable routing: dedicated tray runs for generator feeders, UPS input/output, and PDU distribution \u2014 maintain NEC separation requirements",
    "Load bank test: 4-hour full-load test on each generator + integrated transfer test (utility\u2192gen\u2192UPS\u2192PDU) before certificate of occupancy",
    "Commissioning agent must verify: generator start/transfer timing, UPS bypass operation, battery discharge test, PDU output quality, and alarm annunciation",
    "Coordinate fuel delivery access \u2014 tanker truck route must reach main storage tank without obstructing emergency vehicle access",
    "All quantities are typical for a 3\u20134 MW data center \u2014 adjust based on actual design load, redundancy requirements, and site layout",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
