import type { Job } from "../types";
import { diagram } from "../diagrams/dc-final-commissioning";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "dc-final-commissioning",
  label: "Data Center Build-Out \u2013 Phase 7: Final Fit-Out & Commissioning",
  requirements: [
    "ASHRAE 90.4: Energy Standard for Data Centers \u2014 verify power and cooling efficiency metrics meet design targets before handover",
    "TIA-942-B: Data center commissioning \u2014 all infrastructure systems must be tested individually and as an integrated system before occupancy",
    "NFPA 70E: Arc flash hazard analysis complete \u2014 labels on every panel, switchgear section, PDU, RPP, and disconnect with incident energy and PPE category",
    "NEC 2026 Art. 408.4: Panel directory required \u2014 legible, accurate circuit identification on every panelboard and RPP in the facility",
    "NEC 2026 Art. 110.16: Arc flash warning labels required on all equipment likely to require examination while energized",
    "NEC 2026 Art. 645.5: Emergency power off (EPO) system \u2014 functional test required, clearly labeled at all data hall exits",
    "NFPA 110 Chapter 7: Commissioning of emergency power systems \u2014 generator load bank test (4 hr full load + 2 hr overload) documented",
    "NFPA 111 Chapter 7: Commissioning of stored energy systems \u2014 UPS battery discharge test to verify design runtime under load",
    "IEEE 1584: Arc flash study \u2014 complete incident energy calculations for all equipment, labels applied before any equipment is energized under normal operations",
    "Integrated Systems Test (IST): simulated utility failure \u2014 verify automatic transfer from utility to generator to UPS to rack with zero downtime",
    "A/B redundancy verification: drop A-feed (verify B carries full load), restore A, drop B-feed (verify A carries full load) \u2014 zero server downtime in both scenarios",
    "Infrared thermographic scan: all electrical connections scanned under load \u2014 identify hot spots from loose terminations before handover",
    "Power quality analysis: measure voltage, current, harmonics, and power factor at switchgear, UPS output, and PDU output \u2014 verify within design tolerances",
    "Certificate of Occupancy: all inspections passed \u2014 electrical, fire, mechanical, structural \u2014 before owner takes possession",
    "Owner training: minimum 8-hour training session covering switchgear operation, generator start/stop, UPS bypass, EPO, and emergency procedures",
  ],
  materials: [
    // \u2500\u2500 Server Racks & Cabinets \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "42U Server Cabinet (seismic)",
      quantity: "160",
      spec: "EAT RSV4262B - Eaton 42U server rack, 600mm W \u00d7 1200mm D, seismic-rated, perforated front/rear doors, side panels, 2500 lb static load, adjustable rails \u2014 data hall server racks",
      unitPrice: 1850.00,
    },
    {
      item: "42U Network Cabinet",
      quantity: "16",
      spec: "EAT RSV4260B - Eaton 42U network rack, 600mm W \u00d7 1000mm D, seismic-rated, perforated doors, cable management \u2014 end-of-row network/leaf switch racks",
      unitPrice: 1650.00,
    },
    {
      item: "Rack Blanking Panels (1U, 10-pack)",
      quantity: "80",
      spec: "CDW BP1U10 - 1U snap-in blanking panel, 10-pack, black, maintain hot/cold aisle containment airflow separation",
      unitPrice: 22.00,
    },
    {
      item: "Rack Shelf (1U, adjustable)",
      quantity: "32",
      spec: "CDW RS1U - 1U adjustable rack shelf, 19 in., 150 lb capacity, for non-rack-mount equipment and patch panels",
      unitPrice: 45.00,
    },
    {
      item: "Seismic Rack Anchor Kit",
      quantity: "176",
      spec: "CDW SRAK42 - seismic floor anchor kit for 42U rack, 4-point anchoring with 1/2 in. concrete expansion bolts, one per rack",
      unitPrice: 65.00,
    },
    // \u2500\u2500 Hot/Cold Aisle Containment \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Hot Aisle Containment Door",
      quantity: "16",
      spec: "CDW HACD42 - hot aisle containment end-of-row door, 42U height, double-swing, self-closing, with magnetic latch \u2014 2 doors per hot aisle (8 aisles)",
      unitPrice: 850.00,
    },
    {
      item: "Hot Aisle Roof Panel (2 ft \u00d7 4 ft)",
      quantity: "80",
      spec: "CDW HARP24 - hot aisle containment roof panel, 2 ft \u00d7 4 ft, drop-in to rack row tops, clear polycarbonate for fire suppression compliance",
      unitPrice: 125.00,
    },
    // \u2500\u2500 Final Cable Tray & Drop-Outs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Cable Tray Drop-Out (12 in.)",
      quantity: "40",
      spec: "CHS 12DO - 12 in. cable tray drop-out, vertical transition from overhead tray to rack top \u2014 one per rack row (power + data)",
      unitPrice: 42.00,
    },
    {
      item: "Cable Tray Waterfall (end-of-row)",
      quantity: "16",
      spec: "CHS WF12 - 12 in. cable tray waterfall bracket, end-of-row vertical cable descent from overhead tray to network racks",
      unitPrice: 55.00,
    },
    // \u2500\u2500 Comprehensive Labeling \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Arc Flash Label Kit (facility-wide)",
      quantity: "2",
      spec: "Brady AF-KITDC - data center arc flash label kit, complete facility coverage \u2014 switchgear, MDPs, PDUs, RPPs, disconnects, all per IEEE 1584 study results",
      unitPrice: 165.00,
    },
    {
      item: "Panel Schedule Labels (printed)",
      quantity: "40",
      spec: "Brady PSL-42 - printed panel schedule directory labels, typed circuit identification, one per RPP and panelboard per NEC 408.4",
      unitPrice: 28.00,
    },
    {
      item: "Circuit ID Labels (self-laminating)",
      quantity: "15",
      spec: "Brady WML-511-502 - self-laminating wire marker labels, 500 per roll \u2014 final labeling pass on all power whips, feeders, and branch circuits",
      unitPrice: 42.00,
    },
    {
      item: "A/B Feed Color Tags (orange/blue)",
      quantity: "8",
      spec: "Brady 87629 - A-FEED / B-FEED identification tags, self-adhesive, orange and blue, 100 per pack \u2014 final verification of every whip, receptacle, and rack PDU",
      unitPrice: 35.00,
    },
    {
      item: "Rack Row ID Signs",
      quantity: "20",
      spec: "Brady RRS-DC - overhead row identification signs, 12 in. \u00d7 4 in., double-sided, suspended from cable tray \u2014 visible from aisle entrance",
      unitPrice: 18.00,
    },
    {
      item: "EPO Signs",
      quantity: "8",
      spec: "Brady 22525 - EMERGENCY POWER OFF sign, 10x14 in., self-adhesive, red/white \u2014 every data hall exit + main electrical room doors",
      unitPrice: 12.00,
    },
    {
      item: "DANGER HIGH VOLTAGE Signs",
      quantity: "16",
      spec: "Brady 22530 - DANGER HIGH VOLTAGE sign, 10x14 in., OSHA-compliant \u2014 final placement on all remaining equipment",
      unitPrice: 8.50,
    },
    // \u2500\u2500 Final Grounding & Bonding \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Rack Bonding Jumper (#6 Cu)",
      quantity: "176",
      spec: "NSI GBC6 - #6 AWG copper bonding jumper, 24 in., final bonding of every server and network rack to ground system",
      unitPrice: 8.50,
    },
    {
      item: "Raised-Floor Pedestal Bond",
      quantity: "200",
      spec: "NSI RFPB - raised-floor pedestal bonding clamp with #6 Cu jumper, bonds floor grid to ground system at pedestal base \u2014 one per 4 pedestals",
      unitPrice: 12.00,
    },
    {
      item: "Door Frame Bonding Jumper",
      quantity: "16",
      spec: "NSI DFBJ - door frame bonding jumper, #6 Cu, bonds containment doors to rack ground system",
      unitPrice: 14.00,
    },
    // \u2500\u2500 Final Firestopping \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Firestop Caulk (28 oz)",
      quantity: "20",
      spec: "3M CP-25WB+ - firestop caulk, 28 oz cartridge, intumescent \u2014 final sealing of all remaining penetrations after cable installation complete",
      unitPrice: 22.00,
    },
    {
      item: "Firestop Pillow (large)",
      quantity: "30",
      spec: "3M FS-195+ - firestop pillow, 2 in. \u00d7 4 in. \u00d7 9 in., for large conduit and cable tray penetrations through fire-rated assemblies",
      unitPrice: 18.00,
    },
    // \u2500\u2500 Commissioning Equipment (rental/consumable) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Resistive Load Bank (2MW, rental)",
      quantity: "1",
      spec: "2MW resistive load bank, 480V, trailer-mounted \u2014 generator full-load test (4 hr) + overload test (2 hr at 110%), rental coordination with commissioning agent",
    },
    {
      item: "Reactive Load Bank (rental)",
      quantity: "1",
      spec: "500kVAR reactive load bank, 480V \u2014 tests generator and UPS behavior under reactive/lagging power factor loads, rental",
    },
    {
      item: "Power Quality Analyzer (rental)",
      quantity: "1",
      spec: "Fluke 1760 or Dranetz HDPQ \u2014 3-phase power quality analyzer, monitors voltage, current, harmonics, power factor during commissioning, rental",
    },
    {
      item: "Insulation Resistance Tester (Megger)",
      quantity: "1",
      spec: "Megger MIT1025 - 10kV insulation resistance tester \u2014 megger all feeders and branch circuits before energization, owned or rental",
      unitPrice: 4200.00,
    },
    {
      item: "Infrared Camera (rental)",
      quantity: "1",
      spec: "FLIR T540 or equivalent \u2014 thermal imaging camera, 320\u00d7240 resolution, for thermographic scan of all connections under load",
    },
    {
      item: "Circuit Tracer / Identifier",
      quantity: "2",
      spec: "Ideal 61-534 SureTrace \u2014 circuit tracer/identifier, verify every circuit from breaker to outlet during final labeling pass",
      unitPrice: 285.00,
    },
    // \u2500\u2500 As-Built Documentation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Laminated As-Built Drawing Set",
      quantity: "3",
      spec: "Complete as-built drawing set, laminated 11\u00d717, for control room wall mounting \u2014 one-line diagrams, panel schedules, cable schedules, floor plans (print shop deliverable)",
    },
    {
      item: "As-Built Binder Set",
      quantity: "3",
      spec: "3 in. D-ring binder with tab dividers \u2014 hard-copy O&M manuals, equipment submittals, test reports, warranty info, 3 sets (owner + engineer + contractor)",
      unitPrice: 45.00,
    },
    {
      item: "Digital As-Built Package (USB)",
      quantity: "5",
      spec: "64GB USB drive with complete digital deliverables: as-built CAD/BIM, panel schedules, test certificates, commissioning reports, O&M manuals in PDF \u2014 5 copies",
      unitPrice: 15.00,
    },
    // \u2500\u2500 Punch List / Final Consumables \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    {
      item: "Cable Dress Kit (velcro + ties)",
      quantity: "10",
      spec: "CDW CDK10 - cable dressing kit: velcro rolls, hook-and-loop straps, cable combs, and trimming tools \u2014 final cable dressing and cleanup in all racks",
      unitPrice: 32.00,
    },
    {
      item: "Touch-Up Paint (equipment gray)",
      quantity: "6",
      spec: "Spray paint, ANSI 61 gray, for touch-up of scratched panels, switchgear, and cable tray during final walkthrough",
      unitPrice: 8.00,
    },
    {
      item: "Cleaning Supplies Kit",
      quantity: "2",
      spec: "Data center cleaning kit: anti-static wipes, HEPA vacuum, microfiber cloths, raised-floor tile lifter \u2014 final cleaning before owner walkthrough",
      unitPrice: 125.00,
    },
    {
      item: "Fire Extinguisher (CO2, 15 lb)",
      quantity: "6",
      spec: "Amerex 332 - 15 lb CO2 fire extinguisher, Class B:C \u2014 final placement: 2 per data hall + electrical rooms + generator room",
      unitPrice: 280.00,
    },
  ],
  blueprintNotes: [
    "Server racks: 42U, 600mm\u00d71200mm, seismic floor-anchored, perforated doors for airflow \u2014 hot/cold aisle containment with polycarbonate roof panels",
    "Final rack count: 160 server + 16 network = 176 total \u2014 adjust seismic anchor kits, bonding jumpers, and blanking panels accordingly",
    "Hot aisle containment: self-closing doors at row ends + roof panels spanning rack tops \u2014 clear polycarbonate required for fire suppression visibility",
    "Blanking panels in ALL empty rack U-spaces \u2014 prevents hot air recirculation and maintains cooling efficiency",
    "Arc flash labels: complete IEEE 1584 study results applied to every piece of equipment before normal operations begin",
    "Panel schedules: typed, accurate, legible circuit identification on every RPP, MDP, PDU, and panelboard per NEC 408.4 \u2014 inspector will verify",
    "A/B color coding verification: final walkthrough traces orange (A) and blue (B) from RPP through whip to rack PDU \u2014 no mismatches",
    "Commissioning sequence: megger test \u2192 switchgear functional \u2192 generator load bank (4hr + 2hr overload) \u2192 UPS battery discharge \u2192 IST \u2192 A/B redundancy",
    "Integrated Systems Test (IST): simulate utility failure \u2014 generator starts, ATS transfers, UPS maintains load, generators parallel \u2014 measure transfer time (<10 sec)",
    "Thermographic scan: IR camera survey of all terminations under load \u2014 any connection >20\u00b0F above ambient gets re-torqued and re-scanned",
    "Power quality: verify voltage regulation \u00b15%, THD <5% at UPS output, and power factor >0.95 at service entrance under load",
    "Raised-floor pedestal bonding: every 4th pedestal bonded to ground grid \u2014 prevents static discharge damage to IT equipment",
    "As-built documentation: 3 laminated wall sets + 3 binder sets + 5 USB digital packages \u2014 delivered at owner training session",
    "Owner training: 8-hour session covering normal operation, emergency procedures (EPO, generator manual start, UPS bypass), and maintenance schedules",
    "Certificate of Occupancy: all AHJ inspections (electrical, fire, mechanical, structural) must pass before owner takes possession",
    "Punch list: joint walkthrough with owner, engineer, and contractor \u2014 document, resolve, and re-inspect all items before final sign-off",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
