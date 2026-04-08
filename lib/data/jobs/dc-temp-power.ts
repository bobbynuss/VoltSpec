import type { Job } from "../types";
import { diagram } from "../diagrams/dc-temp-power";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "dc-temp-power",
  label: "Data Center Build-Out \u2013 Phase 1: Temporary Construction Power",
  requirements: [
    "NEC 2026 Art. 590: All temporary electrical installations must comply with permanent wiring standards where applicable",
    "NEC 2026 Art. 590.4(D): Feeders shall originate in an approved distribution center and be protected by overcurrent devices",
    "NEC 2026 Art. 590.6(A): GFCI protection required on ALL 125V 15A/20A and 250V receptacle outlets on construction sites",
    "NEC 2026 Art. 590.4(J): Temporary wiring over 600V requires additional safeguards",
    "NEC 2026 Art. 250.53: Supplemental ground rods required \u2014 minimum 2 rods, 6 ft apart",
    "NEC 2026 Art. 230.82: Service disconnect must be suitable for use as service equipment and readily accessible",
    "OSHA 1926.405: Temporary wiring on construction sites \u2014 GFCI or assured equipment grounding conductor program required",
    "Utility coordination required: submit temporary service application with expected load, duration, and site plan",
    "400A service: verify utility transformer capacity at site \u2014 may require utility infrastructure upgrade",
    "All outdoor equipment must be NEMA 3R rated minimum \u2014 panel, disconnect, meter socket",
    "Permit required: temporary electrical service permit + construction site power plan",
    "Duration limit: typically 6\u201318 months \u2014 verify with AHJ and utility",
  ],
  materials: [
    // \u2500\u2500 Service Entrance \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "400A Meter Socket",
      quantity: "1",
      spec: "Eaton 1006353CCH - 320/400A CT-rated meter socket, single-phase, ringless, AE-approved for large temporary service \u2014 verify with utility",
      unitPrice: 680.00,
    },
    {
      item: "400A Fused Safety Switch",
      quantity: "1",
      spec: "Eaton DH364FRK - 200A 600V 3-pole heavy-duty fused safety switch NEMA 3R \u2014 use 2x for 400A split, or single 400A disconnect per utility requirements",
      unitPrice: 485.00,
    },
    {
      item: "42-Space 400A MLO Panel",
      quantity: "1",
      spec: "Eaton CHP42L400R - 42-space 400A CH main lug outdoor load center, NEMA 3R rainproof, temp construction distribution",
      unitPrice: 520.00,
    },
    // \u2500\u2500 Service Entrance Conductors \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "500 kcmil AL XHHW-2 (Phase A)",
      quantity: "30 ft",
      spec: "ALU XHHW500AL - 500 kcmil aluminum XHHW-2 600V, service entrance conductor, sold per ft",
      unitPrice: 4.25,
    },
    {
      item: "500 kcmil AL XHHW-2 (Phase B)",
      quantity: "30 ft",
      spec: "ALU XHHW500AL - 500 kcmil aluminum XHHW-2 600V, service entrance conductor, sold per ft",
      unitPrice: 4.25,
    },
    {
      item: "3/0 AL XHHW-2 (Neutral)",
      quantity: "30 ft",
      spec: "ALU XHHW30AL - 3/0 aluminum XHHW-2 600V, neutral conductor, sold per ft",
      unitPrice: 1.85,
    },
    {
      item: "4 AWG Bare Copper GEC",
      quantity: "25 ft",
      spec: "COP BARE4SOL500 - 4 AWG solid bare copper ground electrode conductor, sold per ft \u2014 meter to panel to ground rods",
      unitPrice: 2.10,
    },
    // \u2500\u2500 Conduit & Raceway \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "3 in. Rigid Metal Conduit",
      quantity: "30 ft",
      spec: "CON GAL3 - 3 in. galvanized RMC 10 ft sticks, meter to disconnect to panel, sold per ft",
      unitPrice: 14.50,
    },
    {
      item: "3 in. Rigid Weatherhead",
      quantity: "1",
      spec: "Bridgeport 1258 - 3 in. service entrance weatherhead, top of mast",
      unitPrice: 32.00,
    },
    {
      item: "3 in. Rigid 90\u00b0 Elbow",
      quantity: "2",
      spec: "CON 3ELL90RIG - 3 in. rigid 90\u00b0 elbow, meter riser and panel entry",
      unitPrice: 45.00,
    },
    {
      item: "3 in. Rigid Coupling",
      quantity: "4",
      spec: "CON 3CPL - 3 in. rigid coupling, galvanized",
      unitPrice: 8.50,
    },
    {
      item: "3 in. Insulating Bushing",
      quantity: "4",
      spec: "Bridgeport 368 - 3 in. insulating bushing, protect conductors at conduit terminations",
      unitPrice: 5.75,
    },
    {
      item: "3 in. One-Hole Straps",
      quantity: "8",
      spec: "Bridgeport 933S - 3 in. rigid one-hole strap, support per NEC 344.30",
      unitPrice: 3.85,
    },
    // \u2500\u2500 Breakers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "GFCI Breaker 20A",
      quantity: "6",
      spec: "Eaton CHFP120GF - CH 1-pole 20A GFCI breaker, all 120V temp outlet circuits per NEC 590.6(A)",
      unitPrice: 85.19,
    },
    {
      item: "2-Pole 30A Breaker",
      quantity: "4",
      spec: "Eaton CHF230 - CH 2-pole 30A breaker, 240V power tool / welder / compressor circuits",
      unitPrice: 18.50,
    },
    {
      item: "2-Pole 50A Breaker",
      quantity: "2",
      spec: "Eaton CHF250 - CH 2-pole 50A breaker, crane disconnect feed and heavy equipment",
      unitPrice: 23.73,
    },
    // \u2500\u2500 Devices & Receptacles \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "20A WR GFCI Receptacle",
      quantity: "6",
      spec: "Eaton TWRGF20W - 20A 125V TR weather-resistant GFCI receptacle, temp site outlet locations",
      unitPrice: 28.34,
    },
    {
      item: "30A 240V Receptacle",
      quantity: "4",
      spec: "Eaton 1230R - 30A 250V NEMA 6-30R flush mount receptacle, welder / compressor outlets",
      unitPrice: 12.50,
    },
    {
      item: "50A 250V Receptacle",
      quantity: "2",
      spec: "Eaton 1250R - 50A 250V NEMA 6-50R flush mount receptacle, crane / heavy equipment feed",
      unitPrice: 16.00,
    },
    {
      item: "Outdoor In-Use Cover",
      quantity: "12",
      spec: "Taymac MM420C - extra-duty while-in-use weatherproof cover, single-gang, all outdoor receptacles",
      unitPrice: 11.47,
    },
    {
      item: "4-Square Box Deep",
      quantity: "12",
      spec: "Crouse-Hinds TP403 - 4 in. square 2-1/8 in. deep steel outlet box",
      unitPrice: 4.44,
    },
    {
      item: "4-Square Cover Duplex Recep.",
      quantity: "6",
      spec: "Crouse-Hinds TP516 - 4 in. square raised cover for duplex receptacle",
      unitPrice: 3.68,
    },
    {
      item: "4-Square Cover 30/50A Recep.",
      quantity: "6",
      spec: "Crouse-Hinds TP510 - 4 in. square raised cover for single receptacle",
      unitPrice: 2.85,
    },
    // \u2500\u2500 Grounding \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "5/8 x 8 ft Ground Rod",
      quantity: "2",
      spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod \u2014 2 required, 6 ft apart per NEC 250.53",
      unitPrice: 26.43,
    },
    {
      item: "Ground Rod Clamp",
      quantity: "2",
      spec: "NSI GRC58 - 5/8 in. ground rod bronze clamp, UL listed",
      unitPrice: 4.21,
    },
    {
      item: "AL-CU Multi-Tap Connector",
      quantity: "4",
      spec: "NSI IPLD104 - Polaris insulated multi-tap connector, AL-CU rated for service entrance terminations",
      unitPrice: 30.06,
    },
    // \u2500\u2500 Miscellaneous \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Wire Pulling Lubricant",
      quantity: "1",
      spec: "Ideal 31-378 - Yellow 77 wire pulling lubricant, 1 gallon, for 500 kcmil pull through rigid conduit",
      unitPrice: 42.00,
    },
    {
      item: "Duct Seal",
      quantity: "2",
      spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit entries at meter and panel",
      unitPrice: 6.36,
    },
    {
      item: "Panel Directory Label Kit",
      quantity: "1",
      spec: "Brady 95543 - adhesive panel directory label kit, typed circuit labels required at inspection",
      unitPrice: 12.00,
    },
    {
      item: "Danger / High Voltage Signs",
      quantity: "4",
      spec: "Brady 22530 - DANGER HIGH VOLTAGE sign, 10x14 in., self-adhesive polyester, OSHA-compliant \u2014 post at meter, disconnect, and panel",
      unitPrice: 8.50,
    },
    {
      item: "Anti-Oxidant Compound",
      quantity: "1",
      spec: "Ideal 30-030 - Noalox anti-oxidant compound, 8 oz, for all aluminum conductor terminations",
      unitPrice: 12.75,
    },
    {
      item: "Electrical Tape",
      quantity: "6",
      spec: "3M 1700 - Temflex vinyl electrical tape, 3/4 in. x 60 ft, general purpose",
      unitPrice: 2.50,
    },
  ],
  blueprintNotes: [
    "Locate temp power within 100 ft of primary work area to minimize voltage drop on long cord runs",
    "GFCI protect EVERY 120V and 240V receptacle outlet \u2014 no exceptions on construction sites per NEC 590.6",
    "Submit temp service application to utility minimum 4\u20136 weeks before power is needed",
    "Verify utility transformer capacity: 400A single-phase requires adequate utility infrastructure at site",
    "Install 400A fused disconnect between meter and panel \u2014 readily accessible, labeled, lockable",
    "Use anti-oxidant (Noalox) on ALL aluminum conductor terminations \u2014 500 kcmil requires proper torque values",
    "Ground electrode system: 2 ground rods minimum, 6 ft apart, bonded with 4 AWG bare copper GEC",
    "All outdoor enclosures must be NEMA 3R rated \u2014 panel, disconnect, meter socket, receptacle covers",
    "Post DANGER HIGH VOLTAGE signs at meter socket, disconnect, and panel per OSHA 1926.405",
    "Spider boxes (portable GFCI distribution) at each active work zone for cord-connected tools",
    "Temporary wiring duration: coordinate with AHJ \u2014 data center build-outs may need 12\u201318 months",
    "Plan for future phases: conduit sizing allows re-pull for permanent service if utility approves",
    "Adjust quantities based on actual site layout, distance from utility, and number of work zones",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
