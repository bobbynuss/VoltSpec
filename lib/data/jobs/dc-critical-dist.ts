import type { Job } from "../types";
import { diagram } from "../diagrams/dc-critical-dist";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "dc-critical-dist",
  label: "Data Center Build-Out \u2013 Phase 5: Critical Power Distribution",
  requirements: [
    "NEC 2026 Art. 645: Information technology equipment rooms \u2014 dedicated HVAC, listed IT equipment, disconnecting means, and under-floor wiring requirements",
    "NEC 2026 Art. 645.5: Branch circuits supplying IT equipment must have disconnect means that de-energizes all power to the room \u2014 EPO (Emergency Power Off) required",
    "NEC 2026 Art. 645.10: Under-raised-floor wiring \u2014 power cables must be listed for use under raised floors (plenum-rated if air handling), secured every 4.5 ft",
    "NEC 2026 Art. 210.4: Multi-wire branch circuits supplying IT equipment must have simultaneous disconnect \u2014 common-trip or handle-tied breakers",
    "NEC 2026 Art. 408.36: Panelboard (RPP) short-circuit rating must equal or exceed available fault current at that point",
    "NEC 2026 Art. 368: Busway installations in data hall \u2014 supported every 5 ft, tap-off boxes listed for the busway system",
    "NEC 2026 Art. 250.96(B): Isolated ground (IG) system \u2014 insulated equipment grounding conductor from each rack PDU to source panel IG bus, no parallel ground paths",
    "NEC 2026 Art. 250.146(D): Isolated ground receptacles must be identified with orange triangle or IG marking",
    "2N redundancy: every rack must receive independent A and B power feeds from separate PDUs/RPPs \u2014 any single path failure results in zero downtime",
    "Color coding: A-feed circuits = orange; B-feed circuits = blue \u2014 maintained from RPP through whips to rack PDUs for visual identification",
    "Seismic bracing: all overhead busway, cable tray, and PDU equipment must be seismically braced per IBC and local code \u2014 verify seismic zone with structural engineer",
    "Branch circuit monitoring: intelligent rack PDUs with per-outlet monitoring and network connectivity required for capacity management",
    "Raised-floor whips must be pre-terminated, factory-tested, and labeled with source panel/circuit ID at both ends",
    "Commissioning: verify A/B independence \u2014 drop each feed individually and confirm zero server downtime before go-live",
    "Permit required: electrical permit for data hall branch circuiting + fire alarm permit for EPO system modifications",
  ],
  materials: [
    // \u2500\u2500 PDUs (Floor-Mount) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "300kVA Floor-Mount PDU",
      quantity: "6",
      spec: "EAT PDX300 - Eaton 300kVA power distribution unit, 480V input, 208/120V output, K-13 rated dry-type transformer, integrated output panelboard, network monitoring card, floor-mount \u2014 3 per feed (A1/A2/A3 + B1/B2/B3) for 2N",
    },
    {
      item: "PDU Input Breaker (800A 3P)",
      quantity: "6",
      spec: "EAT FDB3800 - 800A, 600V, 3-pole molded case circuit breaker, PDU input disconnect, one per PDU",
      unitPrice: 920.00,
    },
    {
      item: "PDU Output Subfeed Breaker (225A 3P)",
      quantity: "12",
      spec: "EAT FDB3225 - 225A, 600V, 3-pole MCCB, PDU output subfeeds to RPPs, 2 per PDU",
      unitPrice: 320.00,
    },
    // \u2500\u2500 Remote Power Panels (RPPs) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "84-Circuit RPP (208/120V)",
      quantity: "8",
      spec: "EAT RPP-84 - Eaton 84-circuit remote power panel, 208Y/120V, 225A main lug, branch circuit monitoring with network card, row-end mounted \u2014 4x A-feed + 4x B-feed for 2N",
      unitPrice: 4200.00,
    },
    {
      item: "RPP Branch Breaker 20A 1P",
      quantity: "400",
      spec: "EAT BRP120 - BR 1-pole 20A plug-on neutral breaker, standard server rack circuits \u2014 ~50 breakers per RPP",
      unitPrice: 9.43,
    },
    {
      item: "RPP Branch Breaker 30A 2P",
      quantity: "80",
      spec: "EAT BR230 - BR 2-pole 30A breaker, high-density rack circuits and 208V single-phase loads \u2014 ~10 per RPP",
      unitPrice: 21.67,
    },
    {
      item: "RPP Branch Breaker 20A 3P",
      quantity: "48",
      spec: "EAT BR320 - BR 3-pole 20A breaker, 208V 3-phase rack PDU circuits \u2014 ~6 per RPP",
      unitPrice: 32.50,
    },
    // \u2500\u2500 Overhead Busway (Data Hall) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "800A Busway (10 ft section)",
      quantity: "24",
      spec: "CHS PRWIII800 - Eaton Pow-R-Way III, 800A, 208Y/120V, 4-wire + ground, copper bus, 10 ft straight section \u2014 2 parallel runs (A + B) across data hall",
    },
    {
      item: "800A Busway Tap-Off Box",
      quantity: "12",
      spec: "CHS PRWTO800 - Eaton Pow-R-Way III plug-in tap-off box, 800A bus rated, 100A fusible tap, one every 10 ft for PDU drop feeds",
    },
    {
      item: "800A Busway Elbow",
      quantity: "8",
      spec: "CHS PRWEL800 - Eaton Pow-R-Way III, 800A 90\u00b0 elbow section, horizontal and vertical direction changes",
    },
    {
      item: "800A Busway End Closure",
      quantity: "4",
      spec: "CHS PRWEC800 - Eaton Pow-R-Way III, 800A end closure, terminate unused bus ends",
      unitPrice: 65.00,
    },
    {
      item: "Busway Hanger / Trapeze",
      quantity: "30",
      spec: "CHS B2073ZN - trapeze-style busway hanger, zinc plated, overhead support every 5 ft per NEC 368.30",
      unitPrice: 42.00,
    },
    {
      item: "Seismic Busway Brace Kit",
      quantity: "12",
      spec: "CHS SBBK - seismic brace kit for overhead busway, lateral and longitudinal restraint per IBC requirements \u2014 every 40 ft + at direction changes",
      unitPrice: 185.00,
    },
    // \u2500\u2500 Raised-Floor Power Whips \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Power Whip 6 ft (208V 3PH 30A)",
      quantity: "50",
      spec: "CDW PW630OR - pre-terminated 6 ft power whip, 208V 3-phase 30A, 10 AWG SO cord, L21-30 plug, orange jacket (A-feed) \u2014 RPP to under-floor to rack",
      unitPrice: 65.00,
    },
    {
      item: "Power Whip 10 ft (208V 3PH 30A)",
      quantity: "80",
      spec: "CDW PW1030OR - pre-terminated 10 ft power whip, 208V 3-phase 30A, 10 AWG SO cord, L21-30 plug, orange jacket (A-feed) \u2014 most common length",
      unitPrice: 82.00,
    },
    {
      item: "Power Whip 15 ft (208V 3PH 30A)",
      quantity: "30",
      spec: "CDW PW1530OR - pre-terminated 15 ft power whip, 208V 3-phase 30A, 10 AWG SO cord, L21-30 plug, orange jacket (A-feed) \u2014 long runs",
      unitPrice: 98.00,
    },
    {
      item: "Power Whip 6 ft (208V 3PH 30A) B-Feed",
      quantity: "50",
      spec: "CDW PW630BL - pre-terminated 6 ft power whip, 208V 3-phase 30A, 10 AWG SO cord, L21-30 plug, blue jacket (B-feed)",
      unitPrice: 65.00,
    },
    {
      item: "Power Whip 10 ft (208V 3PH 30A) B-Feed",
      quantity: "80",
      spec: "CDW PW1030BL - pre-terminated 10 ft power whip, 208V 3-phase 30A, 10 AWG SO cord, L21-30 plug, blue jacket (B-feed)",
      unitPrice: 82.00,
    },
    {
      item: "Power Whip 15 ft (208V 3PH 30A) B-Feed",
      quantity: "30",
      spec: "CDW PW1530BL - pre-terminated 15 ft power whip, 208V 3-phase 30A, 10 AWG SO cord, L21-30 plug, blue jacket (B-feed)",
      unitPrice: 98.00,
    },
    // \u2500\u2500 Rack PDUs (In-Rack) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Intelligent Rack PDU (A-Feed)",
      quantity: "160",
      spec: "EAT EMAB08 - Eaton ePDU G3 managed, 208V 3-phase 30A input (L21-30P), 24-outlet C13 + 6-outlet C19, per-outlet metering + switching, network monitored, 0U vertical mount \u2014 1 per rack A-side",
      unitPrice: 1250.00,
    },
    {
      item: "Intelligent Rack PDU (B-Feed)",
      quantity: "160",
      spec: "EAT EMAB08 - Eaton ePDU G3 managed, 208V 3-phase 30A input (L21-30P), 24-outlet C13 + 6-outlet C19, per-outlet metering + switching, network monitored, 0U vertical mount \u2014 1 per rack B-side",
      unitPrice: 1250.00,
    },
    // \u2500\u2500 Feeder Cable (PDU to RPP) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "4/0 Cu THHN (PDU Feeders)",
      quantity: "1500 ft",
      spec: "COP THHN40CU - 4/0 copper THHN, 600V, PDU output to RPP feeder runs \u2014 3 conductors + ground per circuit, sold per ft",
    },
    {
      item: "1/0 Cu THHN (RPP Feeders)",
      quantity: "800 ft",
      spec: "COP THHN10CU - 1/0 copper THHN, 600V, secondary feeder runs and smaller PDU-to-RPP circuits, sold per ft",
    },
    {
      item: "6 AWG Cu THHN (IG Ground)",
      quantity: "2000 ft",
      spec: "COP THHN6GN - 6 AWG copper THHN, green (isolated ground), dedicated IG conductor from RPP to each rack ground bar, sold per ft",
    },
    // \u2500\u2500 Cable Tray (Data Hall) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "12 in. Cable Tray (12 ft section)",
      quantity: "40",
      spec: "CHS 12A09-12-144 - 12 in. aluminum ladder cable tray, 12 ft sections, overhead power distribution runs in data hall",
      unitPrice: 95.00,
    },
    {
      item: "Cable Tray Trapeze Support",
      quantity: "50",
      spec: "CHS B2073ZN - trapeze hanger kit, 3/8 in. threaded rod, overhead support every 8 ft",
      unitPrice: 28.00,
    },
    {
      item: "Seismic Cable Tray Brace",
      quantity: "20",
      spec: "CHS SCTB12 - seismic brace for 12 in. cable tray, lateral restraint per IBC \u2014 every 40 ft and at direction changes",
      unitPrice: 95.00,
    },
    // \u2500\u2500 Grounding & Bonding (Data Hall) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Raised-Floor Ground Grid (2 AWG)",
      quantity: "500 ft",
      spec: "COP BARE2STR500 - 2 AWG stranded bare copper, under raised-floor ground grid, bonded to building ground and rack rows, sold per ft",
    },
    {
      item: "Rack Ground Bar Kit",
      quantity: "160",
      spec: "NSI RGK6 - 6-terminal rack ground bar kit, copper, mounted at bottom of each server rack, bonds rack frame + equipment ground + IG",
      unitPrice: 18.00,
    },
    {
      item: "Rack Bonding Jumper (#6 Cu)",
      quantity: "160",
      spec: "NSI GBC6 - #6 AWG copper bonding jumper, 24 in., rack frame to raised-floor ground grid, one per rack",
      unitPrice: 8.50,
    },
    {
      item: "Overhead Ground Bus (Data Hall)",
      quantity: "2",
      spec: "NSI MGB24 - 24-terminal main ground bus bar, 1/4 in. \u00d7 4 in. copper, mounted above cable tray \u2014 bonds overhead tray system to building ground",
      unitPrice: 185.00,
    },
    // \u2500\u2500 Under-Floor Supports & Routing \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Under-Floor Cable Tray (12 in.)",
      quantity: "30",
      spec: "CHS 12W12-12-144 - 12 in. wire mesh cable tray, 12 ft sections, under raised floor for power whip routing \u2014 maintains separation and airflow",
      unitPrice: 72.00,
    },
    {
      item: "Under-Floor Tray Support",
      quantity: "40",
      spec: "CHS UFTS12 - under-floor cable tray support bracket, pedestal mount, supports tray between raised-floor pedestals",
      unitPrice: 15.00,
    },
    // \u2500\u2500 Labeling & Safety \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Circuit ID Labels (Self-Laminating)",
      quantity: "10",
      spec: "Brady WML-511-502 - self-laminating wire marker labels, 500 per roll \u2014 label both ends of every whip with panel/circuit ID",
      unitPrice: 42.00,
    },
    {
      item: "Arc Flash Labels (RPP/PDU)",
      quantity: "1",
      spec: "Brady AF-KITDC - data center arc flash label kit, covers all PDUs + RPPs per NFPA 70E",
      unitPrice: 165.00,
    },
    {
      item: "A/B Feed Identification Tags",
      quantity: "4",
      spec: "Brady 87629 - A-FEED / B-FEED identification tags, self-adhesive, orange and blue, 100 per pack \u2014 tag every whip, receptacle, and rack PDU",
      unitPrice: 35.00,
    },
    {
      item: "EPO Button Label / Sign",
      quantity: "4",
      spec: "Brady 22525 - EMERGENCY POWER OFF sign, 10x14 in., self-adhesive, red with white text \u2014 posted at each data hall exit per NEC 645.5",
      unitPrice: 12.00,
    },
  ],
  blueprintNotes: [
    "2N redundancy: every rack receives independent A-feed and B-feed from separate PDU/RPP paths \u2014 any single component failure = zero downtime",
    "Color coding is mandatory: orange = A-feed, blue = B-feed \u2014 maintained from RPP panel schedule through whips to rack PDU labeling",
    "Overhead busway: dual parallel runs (A + B) across data hall \u2014 tap-off boxes every 10 ft, seismically braced every 40 ft",
    "PDU placement: floor-mount near row ends, close to RPPs to minimize feeder length \u2014 3 per feed for N+1 within each feed path",
    "RPP sizing: 84-circuit for high-density \u2014 allows 20A single-pole for standard racks and 30A/20A 3-pole for high-density racks",
    "Raised-floor whips: pre-terminated factory assemblies only \u2014 no field-terminated whips under raised floor (reliability + inspection requirement)",
    "Under-floor routing: whips in wire mesh tray to maintain separation from data cables and preserve cooling airflow under floor tiles",
    "Rack PDUs: intelligent/managed with per-outlet metering and network monitoring \u2014 required for capacity planning and remote power cycling",
    "Each rack: (1) A-feed rack PDU + (1) B-feed rack PDU \u2014 dual-corded servers connect to both; single-corded devices use A-feed only",
    "Isolated ground system: dedicated green/yellow IG conductor from RPP IG bus to each rack ground bar \u2014 no bonding to building ground en route",
    "Raised-floor ground grid: 2 AWG bare copper under floor, bonded to rack rows at every other rack \u2014 supplements overhead ground bus",
    "Seismic bracing on ALL overhead systems: busway, cable tray, PDUs, lighting \u2014 structural engineer specifies based on site seismic zone",
    "Commissioning: drop A-feed \u2192 verify all racks stay online on B-feed. Then restore A, drop B \u2192 verify again. Document results.",
    "Label everything: both ends of every whip, every breaker in every RPP, every rack PDU outlet \u2014 the data center lives or dies by labeling",
    "Adjust quantities based on actual rack count, density per row, and cooling architecture (hot/cold aisle may affect whip routing)",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
