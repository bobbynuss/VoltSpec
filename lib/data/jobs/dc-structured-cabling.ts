import type { Job } from "../types";
import { diagram } from "../diagrams/dc-structured-cabling";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "dc-structured-cabling",
  label: "Data Center Build-Out \u2013 Phase 6: Structured Cabling & Fiber Infrastructure",
  requirements: [
    "TIA-942-B: Telecommunications Infrastructure Standard for Data Centers \u2014 governs cabling topology, pathway design, redundancy, and testing requirements",
    "TIA-568.3-D: Optical fiber cabling \u2014 maximum insertion loss budgets, bend radius, connector performance, and testing methods for OM4/OS2 fiber",
    "TIA-568.2-D: Balanced twisted-pair cabling \u2014 Cat6A channel performance, alien crosstalk, and testing limits for 10GBASE-T support",
    "TIA-607-C: Telecommunications bonding and grounding \u2014 TMGB, TGB, TBB, and bonding conductor requirements for data cabling infrastructure",
    "NEC 2026 Art. 770: Optical fiber cables \u2014 listing requirements, raceway fill, firewall penetrations, and innerduct for fiber pathways",
    "NEC 2026 Art. 800: Communications circuits \u2014 listing, grounding, separation from power, and pathway sharing requirements",
    "NEC 2026 Art. 300.11: Cabling support \u2014 communications cables cannot be supported by ceiling grid or power conduit; dedicated pathway required",
    "NEC 2026 Art. 800.133: Separation from power \u2014 maintain minimum separation between power and data cables per table values (or use barrier)",
    "Fiber bend radius: minimum 10\u00d7 cable OD for horizontal runs, 15\u00d7 for backbone trunks \u2014 violations cause insertion loss failures",
    "Cat6A bend radius: minimum 4\u00d7 cable OD (approximately 1 in. for Cat6A) \u2014 tighter bends degrade alien crosstalk performance",
    "100% testing and certification required: fiber OTDR + insertion loss, copper Fluke DSX channel certification \u2014 electronic results database",
    "Redundant pathways: dual fiber trunks between MDA and each HDA using diverse physical routes (no single point of failure)",
    "Labeling: TIA-606-C standard \u2014 every cable, patch panel port, rack, and pathway labeled with unique identifiers at both ends",
    "Plenum-rated cables required in raised-floor air plenums and above-ceiling return-air spaces per NEC 800.154",
    "Permit required: low-voltage permit (if required by local AHJ) + fire alarm permit for penetration sealing",
  ],
  materials: [
    // \u2500\u2500 Fiber Backbone (MDA to HDA) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "MPO/MTP Fiber Trunk (OM4, 24-fiber)",
      quantity: "16",
      spec: "COR MTPOM424 - Corning 24-fiber OM4 multimode MPO/MTP trunk cable, plenum-rated, 50 ft \u2014 backbone trunks MDA to HDA, dual diverse paths",
      unitPrice: 420.00,
    },
    {
      item: "MPO/MTP Fiber Trunk (OS2, 24-fiber)",
      quantity: "8",
      spec: "COR MTPOS224 - Corning 24-fiber OS2 single-mode MPO/MTP trunk cable, plenum-rated, 100 ft \u2014 long-haul backbone, MDA to entrance room + campus interconnects",
      unitPrice: 580.00,
    },
    {
      item: "OM4 LC Duplex Patch Cable (3 ft)",
      quantity: "200",
      spec: "COR OM4LC03 - Corning OM4 multimode LC duplex patch cable, 3 ft, plenum-rated, aqua jacket \u2014 switch to patch panel in-rack connections",
      unitPrice: 8.50,
    },
    {
      item: "OM4 LC Duplex Patch Cable (10 ft)",
      quantity: "100",
      spec: "COR OM4LC10 - Corning OM4 multimode LC duplex patch cable, 10 ft, plenum-rated, aqua jacket \u2014 cross-connects and longer patch runs",
      unitPrice: 12.00,
    },
    {
      item: "OS2 LC Duplex Patch Cable (3 ft)",
      quantity: "50",
      spec: "COR OS2LC03 - Corning OS2 single-mode LC duplex patch cable, 3 ft, plenum-rated, yellow jacket \u2014 long-haul and WDM connections",
      unitPrice: 9.50,
    },
    // \u2500\u2500 Fiber Patch Panels & Cassettes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "576-Port Fiber Enclosure (MDA)",
      quantity: "2",
      spec: "COR CCH-04U - Corning CCH 4U rack-mount fiber enclosure, accepts 24 cassettes, 576 LC ports max \u2014 main distribution fiber cross-connect",
      unitPrice: 850.00,
    },
    {
      item: "96-Port Fiber Enclosure (HDA)",
      quantity: "8",
      spec: "COR CCH-02U - Corning CCH 2U rack-mount fiber enclosure, accepts 8 cassettes, 96 LC ports \u2014 one per HDA rack",
      unitPrice: 380.00,
    },
    {
      item: "MPO-to-LC Cassette (OM4, 24-port)",
      quantity: "60",
      spec: "COR CCH-CS24OM4 - Corning 24-port OM4 MPO-to-LC duplex cassette, snap-in to CCH enclosure \u2014 fan-out MPO trunks to individual LC ports",
      unitPrice: 285.00,
    },
    {
      item: "MPO-to-LC Cassette (OS2, 24-port)",
      quantity: "16",
      spec: "COR CCH-CS24OS2 - Corning 24-port OS2 MPO-to-LC duplex cassette, snap-in to CCH enclosure \u2014 single-mode fan-out",
      unitPrice: 310.00,
    },
    // \u2500\u2500 Copper Horizontal Cabling \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Cat6A S/FTP Cable (1000 ft)",
      quantity: "80",
      spec: "BEL 10GXS - Belden 10GXS Cat6A S/FTP shielded cable, 23 AWG, plenum-rated (CMP), 1000 ft spool \u2014 horizontal runs HDA to rack, 10GBASE-T certified",
    },
    {
      item: "Cat6A Shielded RJ45 Plug",
      quantity: "500",
      spec: "BEL RVAMJKSME-S1 - Belden REVConnect Cat6A shielded RJ45 jack, tool-less termination, meets TIA-568.2-D channel limits",
      unitPrice: 12.50,
    },
    {
      item: "Cat6A Patch Cable (3 ft)",
      quantity: "500",
      spec: "BEL C6A03BL - Belden Cat6A shielded patch cable, 3 ft, blue, snagless boot, server to patch panel",
      unitPrice: 6.50,
    },
    {
      item: "Cat6A Patch Cable (7 ft)",
      quantity: "200",
      spec: "BEL C6A07BL - Belden Cat6A shielded patch cable, 7 ft, blue, snagless boot, longer patch runs",
      unitPrice: 9.00,
    },
    // \u2500\u2500 Copper Patch Panels \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "48-Port Cat6A Patch Panel",
      quantity: "20",
      spec: "BEL AX104564 - Belden KeyConnect 48-port Cat6A shielded patch panel, 2U, 19 in. rack mount, unloaded \u2014 accepts REVConnect jacks",
      unitPrice: 145.00,
    },
    {
      item: "24-Port Cat6A Patch Panel",
      quantity: "8",
      spec: "BEL AX103258 - Belden KeyConnect 24-port Cat6A shielded patch panel, 1U, 19 in. rack mount \u2014 smaller distribution and management racks",
      unitPrice: 85.00,
    },
    // \u2500\u2500 Cable Tray (Data Cabling) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "18 in. Fiber Tray (12 ft section)",
      quantity: "20",
      spec: "CHS 18A09-12-144 - 18 in. aluminum ladder cable tray, 12 ft sections, dedicated overhead fiber pathway \u2014 separated from power tray",
      unitPrice: 82.00,
    },
    {
      item: "24 in. Copper Data Tray (12 ft section)",
      quantity: "30",
      spec: "CHS 24W12-12-144 - 24 in. wire mesh cable tray, 12 ft sections, overhead copper data cable runs \u2014 maintains bend radius and airflow",
      unitPrice: 72.00,
    },
    {
      item: "Cable Tray Trapeze Support",
      quantity: "60",
      spec: "CHS B2073ZN - trapeze hanger kit with 3/8 in. threaded rod, overhead support every 8 ft for both fiber and copper trays",
      unitPrice: 28.00,
    },
    {
      item: "Under-Floor Wire Mesh Tray (12 in.)",
      quantity: "40",
      spec: "CHS 12W09-12-144 - 12 in. wire mesh cable tray, 12 ft sections, under raised floor for horizontal copper runs to rack rows",
      unitPrice: 58.00,
    },
    // \u2500\u2500 Cable Management (In-Rack) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Vertical Cable Manager (42U)",
      quantity: "40",
      spec: "CDW VCM42 - 42U vertical cable manager, 6 in. wide, dual-sided with finger guards, one per rack side \u2014 routes patch cables and fiber",
      unitPrice: 165.00,
    },
    {
      item: "Horizontal Cable Manager (1U)",
      quantity: "200",
      spec: "CDW HCM1U - 1U horizontal cable manager with brush strip, rack mount \u2014 between every 4th patch panel for cable routing",
      unitPrice: 22.00,
    },
    {
      item: "Cable Management Rings (D-ring)",
      quantity: "300",
      spec: "CDW DR2 - 2 in. D-ring cable management ring, bolt-on, for overhead and under-floor tray cable routing",
      unitPrice: 3.50,
    },
    {
      item: "Velcro Cable Ties (roll)",
      quantity: "20",
      spec: "CDW VCT75 - 3/4 in. hook-and-loop cable tie, 75 ft roll, for bundling data cables \u2014 no zip ties on data cables (prevents crushing)",
      unitPrice: 18.00,
    },
    // \u2500\u2500 Telecom Bonding & Grounding \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Telecom Main Ground Busbar (TMGB)",
      quantity: "1",
      spec: "NSI TMGB24 - telecom main ground busbar, 1/4 in. \u00d7 4 in. copper, 24 terminals, wall-mount in MDA \u2014 bonds to building ground electrode per TIA-607-C",
      unitPrice: 210.00,
    },
    {
      item: "Telecom Ground Busbar (TGB)",
      quantity: "8",
      spec: "NSI TGB12 - telecom ground busbar, 1/4 in. \u00d7 2 in. copper, 12 terminals, mounted in each HDA rack row \u2014 bonds rack row to TBB",
      unitPrice: 85.00,
    },
    {
      item: "Telecom Bonding Backbone (#6 Cu)",
      quantity: "500 ft",
      spec: "COP THHN6GN - #6 AWG copper THHN, green insulated, telecom bonding backbone (TBB) TMGB to each TGB, sold per ft",
    },
    {
      item: "Rack Ground Kit (#6 Cu jumper)",
      quantity: "160",
      spec: "NSI RGK6 - #6 AWG copper rack grounding kit with two-hole compression lug, bonds each rack frame to TGB row bus",
      unitPrice: 18.00,
    },
    // \u2500\u2500 Firestopping & Penetrations \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Firestop Putty Pad",
      quantity: "30",
      spec: "3M 303P - firestop putty pad, 7 in. \u00d7 7 in., for sealing cable penetrations through fire-rated walls and floors, UL listed",
      unitPrice: 8.50,
    },
    {
      item: "Firestop Caulk (28 oz)",
      quantity: "12",
      spec: "3M CP-25WB+ - firestop caulk, 28 oz cartridge, intumescent, for sealing conduit and cable tray penetrations",
      unitPrice: 22.00,
    },
    // \u2500\u2500 Labeling \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Cable Labels (Self-Laminating, 500/roll)",
      quantity: "20",
      spec: "Brady WML-511-502 - self-laminating cable labels, 500 per roll \u2014 label both ends of every horizontal run and patch cable per TIA-606-C",
      unitPrice: 42.00,
    },
    {
      item: "Patch Panel Port Labels",
      quantity: "10",
      spec: "Brady PTL-19-427 - port identification labels, 750 per roll, for patch panel and fiber enclosure port labeling",
      unitPrice: 35.00,
    },
    {
      item: "Rack ID Placards",
      quantity: "40",
      spec: "Brady RID-42 - rack identification placard, 2 in. \u00d7 6 in., self-adhesive, row/rack number for every cabinet per TIA-606-C",
      unitPrice: 6.00,
    },
    // \u2500\u2500 Testing & Certification \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Fiber OTDR Test (per link)",
      quantity: "1",
      spec: "Fiber OTDR testing and insertion loss certification, all OM4 and OS2 links per TIA-568 \u2014 performed by certified technician, results in electronic database (labor/rental, not material)",
    },
    {
      item: "Copper Certification Test (per link)",
      quantity: "1",
      spec: "Fluke DSX-8000 or equivalent Cat6A channel certification, all horizontal copper links per TIA-568.2-D \u2014 performed by certified technician, results in electronic database (labor/rental, not material)",
    },
  ],
  blueprintNotes: [
    "TIA-942-B topology: MDA (core switches + fiber cross-connect) \u2192 HDA (leaf switches + patch panels) \u2192 rack (ToR + servers)",
    "Redundant fiber backbone: dual MPO/MTP trunks from MDA to each HDA using physically diverse routes (separate trays / conduits)",
    "Fiber type: OM4 multimode for intra-building (<100m), OS2 single-mode for backbone, carrier interconnects, and future 400G readiness",
    "MPO/MTP-to-LC cassettes in Corning CCH enclosures: fan-out 24-fiber trunks to individual LC duplex ports at each end",
    "Cat6A S/FTP shielded horizontal cabling: supports 10GBASE-T at full 100m channel length with alien crosstalk margin",
    "Dedicated pathways: fiber tray (18 in.) ABOVE copper tray (24 in.) \u2014 never mix fiber and copper in same tray",
    "Under-floor routing for horizontal copper runs to racks \u2014 wire mesh tray maintains bend radius and allows airflow for cooling",
    "Cable management: velcro ties ONLY for data cables (no zip ties \u2014 they crush cables and degrade performance over time)",
    "Vertical cable managers on both sides of every rack \u2014 6 in. wide minimum for high-density patch environments",
    "Telecom grounding per TIA-607-C: TMGB in MDA bonded to building ground, TBB (#6 Cu green) to TGB at each rack row, rack ground kits to every cabinet",
    "100% testing: every fiber link gets OTDR + insertion loss, every copper link gets Fluke DSX channel certification \u2014 no exceptions",
    "Labeling per TIA-606-C: unique ID on every cable (both ends), every patch panel port, every rack, every pathway segment",
    "Firestop all penetrations through fire-rated walls and floors \u2014 inspector will check before ceiling/floor closure",
    "Plenum-rated cables (CMP) required in raised-floor plenums and above-ceiling return-air spaces per NEC 800.154",
    "Adjust quantities based on actual rack count, port density, and leaf-spine fabric design \u2014 typical assumes ~160 racks, 48 ports/rack average",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
