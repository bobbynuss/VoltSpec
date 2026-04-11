/**
 * Quick List catalog — common parts organized by category,
 * plus starter templates for residential, commercial, and service calls.
 *
 * All part numbers and specs are real Elliott Electric Supply items.
 */

export interface CatalogItem {
  item: string;
  spec: string;
  defaultQty: string;
}

export interface CatalogCategory {
  id: string;
  label: string;
  icon: string;
  items: CatalogItem[];
}

export interface StarterTemplate {
  id: string;
  label: string;
  description: string;
  icon: string;
  items: { item: string; spec: string; quantity: string }[];
}

// ── Parts Catalog ────────────────────────────────────────────────

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: "panels-breakers",
    label: "Panels & Breakers",
    icon: "⚡",
    items: [
      // CH panels
      { item: "200A CH Main Breaker Panel", spec: "Eaton CHP42B200R - 42-space 200A CH plug-on neutral main breaker panel", defaultQty: "1" },
      { item: "100A CH MLO Subpanel", spec: "Eaton CHP24L125X2 - 100/125A 24-space CH MLO indoor subpanel, plug-on neutral", defaultQty: "1" },
      // BR panels
      { item: "200A BR Main Breaker Panel", spec: "Eaton BRP20B200R - BR PON loadcenter 200A main breaker 20 space NEMA 3R", defaultQty: "1" },
      { item: "125A BR MLO Subpanel", spec: "Eaton BRP24L125G - BR PON loadcenter 125A MLO 24 space with ground bar", defaultQty: "1" },
      // CH breakers
      { item: "1-Pole 20A CH Breaker", spec: "Eaton CHF120 - CH 1-pole 20A breaker", defaultQty: "1" },
      { item: "2-Pole 30A CH Breaker", spec: "Eaton CHF230 - CH 2-pole 30A breaker", defaultQty: "1" },
      { item: "2-Pole 50A CH Breaker", spec: "Eaton CHF250 - CH 2-pole 50A breaker", defaultQty: "1" },
      { item: "Dual Function 20A CH", spec: "Eaton CHFP120DF - 1-pole 20A CH plug-on dual function AFCI+GFCI breaker", defaultQty: "1" },
      { item: "GFCI Breaker 20A CH", spec: "Eaton CHFP120GF - 1-pole 20A CH plug-on GFCI breaker", defaultQty: "1" },
      // BR breakers
      { item: "1-Pole 20A BR Breaker", spec: "Eaton BR120 - Type BR breaker 20A/1-pole 120/240V 10K", defaultQty: "1" },
      { item: "2-Pole 30A BR Breaker", spec: "Eaton BR230 - Type BR breaker 30A/2-pole 120/240V 10K", defaultQty: "1" },
      { item: "2-Pole 50A BR Breaker", spec: "Eaton BR250 - Type BR breaker 50A/2-pole 120/240V 10K", defaultQty: "1" },
      { item: "Dual Function 20A BR", spec: "Eaton BRP120DF - BR dual function AF/GF 1-pole 20A plug-on neutral breaker", defaultQty: "1" },
      // Surge
      { item: "CH Surge Protector", spec: "Eaton CHSPT2ULTRA - CH Type 2 SPD whole-panel surge protector", defaultQty: "1" },
      { item: "BR Surge Protector", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, whole-panel SPD", defaultQty: "1" },
      // Meter bases
      { item: "200A Ringless Meter Base (CH)", spec: "Eaton 1006352CCH - 200A ringless single-phase meter base", defaultQty: "1" },
    ],
  },
  {
    id: "wire",
    label: "Wire & Cable",
    icon: "🔌",
    items: [
      { item: "12 AWG THHN Black", spec: "COP THHN12STBK500 - 12 AWG THHN solid black, 500 ft spool", defaultQty: "250 ft" },
      { item: "12 AWG THHN White", spec: "COP THHN12STWH500 - 12 AWG THHN solid white, 500 ft spool", defaultQty: "250 ft" },
      { item: "12 AWG THHN Green", spec: "COP THHN12STGN500 - 12 AWG THHN solid green, 500 ft spool", defaultQty: "250 ft" },
      { item: "14/2 NM-B Romex", spec: "COP NM142WG250 - 14/2 NM-B w/ground, 250 ft roll", defaultQty: "1" },
      { item: "12/2 NM-B Romex", spec: "COP NM122WG250 - 12/2 NM-B w/ground, 250 ft roll", defaultQty: "1" },
      { item: "10/3 NM-B Romex", spec: "COP NM103WG125 - 10/3 NM-B w/ground, 125 ft roll", defaultQty: "1" },
      { item: "4/0-4/0-2/0 AL SER", spec: "ALU SER401000 - 4/0-4/0-2/0 AL SER 600V service entrance cable, per ft", defaultQty: "15 ft" },
      { item: "4/0 AL XHHW-2", spec: "ALU XHHW401000 - 4/0 AWG AL XHHW-2 600V black, per ft", defaultQty: "30 ft" },
      { item: "4 AWG Bare Copper GEC", spec: "COP BARE4SOL500 - 4 AWG solid bare copper GEC, per ft", defaultQty: "20 ft" },
      { item: "6 AWG Bare Copper", spec: "COP BARE6SOL500 - 6 AWG solid bare copper, per ft", defaultQty: "10 ft" },
    ],
  },
  {
    id: "conduit",
    label: "Conduit & Raceway",
    icon: "🔧",
    items: [
      { item: "1/2 in. EMT Conduit 10ft", spec: "CON EMT12 - 1/2 in. EMT conduit, 10 ft stick", defaultQty: "10" },
      { item: "3/4 in. EMT Conduit 10ft", spec: "CON EMT34 - 3/4 in. EMT conduit, 10 ft stick", defaultQty: "10" },
      { item: "1 in. EMT Conduit 10ft", spec: "CON EMT1 - 1 in. EMT conduit, 10 ft stick", defaultQty: "5" },
      { item: "1/2 in. EMT Connector", spec: "Bridgeport 230 - 1/2 in. EMT set-screw connector", defaultQty: "25" },
      { item: "3/4 in. EMT Connector", spec: "Bridgeport 231 - 3/4 in. EMT set-screw connector", defaultQty: "25" },
      { item: "1/2 in. EMT Coupling", spec: "Bridgeport 240 - 1/2 in. EMT set-screw coupling", defaultQty: "10" },
      { item: "3/4 in. EMT Coupling", spec: "Bridgeport 241 - 3/4 in. EMT set-screw coupling", defaultQty: "10" },
      { item: "1/2 in. One-Hole Strap", spec: "Bridgeport 920S - 1/2 in. one-hole EMT strap", defaultQty: "50" },
      { item: "3/4 in. One-Hole Strap", spec: "Bridgeport 921S - 3/4 in. one-hole EMT strap", defaultQty: "50" },
      { item: "1-1/4 in. Sch 80 PVC 10ft", spec: "PVC PVC114 - 1-1/4 in. Schedule 80 gray PVC conduit, 10 ft stick", defaultQty: "3" },
      { item: "1-1/4 in. PVC 90° Elbow", spec: "PVF 114ELL90 - 1-1/4 in. Schedule 80 PVC 90-degree elbow", defaultQty: "2" },
      { item: "1/2 in. ENT Flex (100ft)", spec: "Carlon 12007-100 - 1/2 in. ENT smurf tube, 100 ft coil", defaultQty: "1" },
    ],
  },
  {
    id: "devices",
    label: "Devices & Lighting",
    icon: "💡",
    items: [
      { item: "15A TR Receptacle", spec: "Eaton TR1107W - Decora 15A 125V tamper-resistant duplex receptacle, white", defaultQty: "10" },
      { item: "20A TR Receptacle", spec: "Eaton TR1307W - Decora 20A 125V tamper-resistant duplex receptacle, white", defaultQty: "10" },
      { item: "20A GFCI Receptacle", spec: "Eaton TRGF20W - 20A 125V TR GFCI receptacle, indoor, white", defaultQty: "4" },
      { item: "20A WR GFCI Receptacle", spec: "Eaton TWRGF20W - 20A 125V TR GFCI receptacle, weather-resistant, outdoor", defaultQty: "4" },
      { item: "Single-Pole Switch 15A", spec: "Eaton 7501W - Decora 15A 120/277V single-pole rocker switch, white", defaultQty: "8" },
      { item: "3-Way Switch 15A", spec: "Eaton 7503W - Decora 15A 120/277V 3-way rocker switch, white", defaultQty: "4" },
      { item: "Dimmer (LED)", spec: "Lutron DVCL153PWH - Diva C-L dimmer, 150W LED / 600W inc., white", defaultQty: "2" },
      { item: "6\" LED Retrofit Trim", spec: "Eaton LT56079F51EWH - Halo LT 6 in. LED retrofit baffle trim, 5000K", defaultQty: "10" },
      { item: "Smoke/CO Detector", spec: "BRK SC9120B - 120V hardwired smoke and CO combo alarm with battery backup", defaultQty: "4" },
      { item: "1-Gang Decora Plate", spec: "Eaton PJ26W - 1-gang Decora mid-size wall plate, white", defaultQty: "12" },
      { item: "2-Gang Decora Plate", spec: "Eaton PJ262W - 2-gang Decora mid-size wall plate, white", defaultQty: "6" },
      { item: "50A Range Receptacle", spec: "Eaton 1258W - 50A 125/250V 3-pole 4-wire range receptacle, flush mount", defaultQty: "1" },
      { item: "30A Dryer Receptacle", spec: "Eaton 1263W - 30A 125/250V 3-pole 4-wire dryer receptacle, flush mount", defaultQty: "1" },
    ],
  },
  {
    id: "fittings",
    label: "Fittings & Boxes",
    icon: "🔩",
    items: [
      { item: "4-Square Box Deep", spec: "Crouse-Hinds TP403 - 4 in. square 2-1/8 in. deep steel outlet box", defaultQty: "10" },
      { item: "4-Square Raised Cover (Duplex)", spec: "Crouse-Hinds TP516 - 4 in. square raised cover for duplex receptacle", defaultQty: "10" },
      { item: "4-Square Raised Cover (Switch)", spec: "Crouse-Hinds TP512 - 4 in. square raised cover for toggle switch", defaultQty: "6" },
      { item: "In-Use WP Cover", spec: "Taymac MM420C - extra-duty while-in-use weatherproof cover, single-gang", defaultQty: "4" },
      { item: "NM Cable Connector", spec: "Arlington NM94 - 1-piece push-in cable connector for NM/Romex, 3/8 in.", defaultQty: "25" },
      { item: "Wire Nuts Assorted", spec: "Ideal 30-072 - Twist-on wire connectors, assorted colors", defaultQty: "100" },
      { item: "Wago 2-Port Lever Nut", spec: "Wago 221-412 - Lever-nut compact splicing connector, 2-port, 28-12 AWG", defaultQty: "50" },
      { item: "Wago 3-Port Lever Nut", spec: "Wago 221-413 - Lever-nut compact splicing connector, 3-port, 28-12 AWG", defaultQty: "50" },
      { item: "1-1/4 in. Grounding Bushing", spec: "Bridgeport 386DC - 1-1/4 in. insulated grounding bushing, AL/CU rated", defaultQty: "2" },
      { item: "1-1/4 in. PVC Male Adapter", spec: "PVF TA114 - 1-1/4 in. PVC terminal adapter (male)", defaultQty: "2" },
      { item: "Polaris Multi-Tap", spec: "NSI IPLD104 - Polaris insulated multi-tap connector, AL-CU rated", defaultQty: "4" },
    ],
  },
  {
    id: "grounding",
    label: "Grounding & Misc",
    icon: "📦",
    items: [
      { item: "5/8 x 8ft Ground Rod", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod", defaultQty: "2" },
      { item: "Ground Rod Clamp", spec: "NSI GRC58 - 5/8 in. ground rod bronze clamp, UL listed", defaultQty: "2" },
      { item: "Ufer Ground Clamp", spec: "NSI GLC140DB - concrete encased electrode clamp per NEC 250.52", defaultQty: "1" },
      { item: "Duct Seal 1 lb", spec: "PECO DS1 - duct seal compound, 1 lb", defaultQty: "1" },
      { item: "Anti-Oxidant 8 oz", spec: "Ideal Noalox 30-026 - anti-oxidant compound, 8 oz, for aluminum terminations", defaultQty: "1" },
      { item: "Panel Directory Label Kit", spec: "Brady 95543 - adhesive panel directory label kit", defaultQty: "1" },
      { item: "Arc Flash Label", spec: "Brady 66127 - arc flash hazard label per NEC 110.16", defaultQty: "1" },
      { item: "2 in. Weatherhead", spec: "Bridgeport 1256 - 2 in. service entrance weatherhead", defaultQty: "1" },
    ],
  },
];

// ── Starter Templates ────────────────────────────────────────────

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: "residential-service",
    label: "Residential Service",
    description: "200A panel swap / service upgrade — panels, breakers, wire, grounding",
    icon: "🏠",
    items: [
      { item: "200A CH Main Breaker Panel", spec: "Eaton CHP42B200R - 42-space 200A CH plug-on neutral main breaker panel", quantity: "1" },
      { item: "200A Ringless Meter Base", spec: "Eaton 1006352CCH - 200A ringless single-phase meter base", quantity: "1" },
      { item: "CH Surge Protector", spec: "Eaton CHSPT2ULTRA - CH Type 2 SPD whole-panel surge protector", quantity: "1" },
      { item: "Dual Function 20A CH", spec: "Eaton CHFP120DF - 1-pole 20A CH plug-on dual function AFCI+GFCI breaker", quantity: "8" },
      { item: "GFCI Breaker 20A CH", spec: "Eaton CHFP120GF - 1-pole 20A CH plug-on GFCI breaker", quantity: "4" },
      { item: "2-Pole 30A CH Breaker", spec: "Eaton CHF230 - CH 2-pole 30A breaker", quantity: "2" },
      { item: "2-Pole 50A CH Breaker", spec: "Eaton CHF250 - CH 2-pole 50A breaker", quantity: "1" },
      { item: "4/0-4/0-2/0 AL SER", spec: "ALU SER401000 - 4/0-4/0-2/0 AL SER 600V service entrance cable, per ft", quantity: "15 ft" },
      { item: "4 AWG Bare Copper GEC", spec: "COP BARE4SOL500 - 4 AWG solid bare copper GEC, per ft", quantity: "20 ft" },
      { item: "5/8 x 8ft Ground Rod", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod", quantity: "2" },
      { item: "Ground Rod Clamp", spec: "NSI GRC58 - 5/8 in. ground rod bronze clamp", quantity: "2" },
      { item: "Duct Seal 1 lb", spec: "PECO DS1 - duct seal compound, 1 lb", quantity: "1" },
      { item: "Panel Directory Label Kit", spec: "Brady 95543 - adhesive panel directory label kit", quantity: "1" },
    ],
  },
  {
    id: "residential-trim",
    label: "Residential Trim-Out",
    description: "Devices, switches, receptacles, lighting, plates, connectors",
    icon: "🔧",
    items: [
      { item: "15A TR Receptacle", spec: "Eaton TR1107W - Decora 15A 125V tamper-resistant duplex receptacle, white", quantity: "20" },
      { item: "20A TR Receptacle", spec: "Eaton TR1307W - Decora 20A 125V tamper-resistant duplex receptacle, white", quantity: "6" },
      { item: "20A GFCI Receptacle", spec: "Eaton TRGF20W - 20A 125V TR GFCI receptacle, indoor, white", quantity: "4" },
      { item: "20A WR GFCI Receptacle", spec: "Eaton TWRGF20W - 20A 125V TR GFCI receptacle, weather-resistant, outdoor", quantity: "4" },
      { item: "Single-Pole Switch 15A", spec: "Eaton 7501W - Decora 15A 120/277V single-pole rocker switch, white", quantity: "10" },
      { item: "3-Way Switch 15A", spec: "Eaton 7503W - Decora 15A 120/277V 3-way rocker switch, white", quantity: "4" },
      { item: "Dimmer (LED)", spec: "Lutron DVCL153PWH - Diva C-L dimmer, 150W LED / 600W inc., white", quantity: "2" },
      { item: "6\" LED Retrofit Trim", spec: "Eaton LT56079F51EWH - Halo LT 6 in. LED retrofit baffle trim, 5000K", quantity: "12" },
      { item: "Smoke/CO Detector", spec: "BRK SC9120B - 120V hardwired smoke and CO combo alarm with battery backup", quantity: "4" },
      { item: "1-Gang Decora Plate", spec: "Eaton PJ26W - 1-gang Decora mid-size wall plate, white", quantity: "20" },
      { item: "2-Gang Decora Plate", spec: "Eaton PJ262W - 2-gang Decora mid-size wall plate, white", quantity: "8" },
      { item: "Wire Nuts Assorted", spec: "Ideal 30-072 - Twist-on wire connectors, assorted colors", quantity: "100" },
      { item: "NM Cable Connector", spec: "Arlington NM94 - push-in cable connector for NM/Romex, 3/8 in.", quantity: "30" },
    ],
  },
  {
    id: "commercial-3phase",
    label: "Commercial 3-Phase",
    description: "Pow-R-Line panelboard, QBH breakers, 3-phase gear, commercial fittings",
    icon: "🏢",
    items: [
      { item: "PRL1X Interior (225A Cu, 42-ckt)", spec: "Eaton PRL1X3225X42C - Pow-R-Xpress interior, 208Y/120V 3P 4W, 225A copper bus, 42 circuit", quantity: "1" },
      { item: "EZB Enclosure (20×60)", spec: "Eaton EZB2060RBS - EZ Box stocking enclosure, 20×60 in., NEMA 1 indoor", quantity: "1" },
      { item: "EZT Surface Trim (20×60)", spec: "Eaton EZT2060S - EZ Trim surface mount, for 20×60 box", quantity: "1" },
      { item: "225A Main Breaker Kit", spec: "Eaton BKD2G225 - Pow-R-Xpress MCB kit, 225A 240V 65 kAIC, 3-pole", quantity: "1" },
      { item: "Copper Ground Bus", spec: "Eaton CUGROUND - PRL1A/2A 42-48 circuit copper ground bus assembly", quantity: "1" },
      { item: "3-Pole 20A QBH Breaker", spec: "Eaton QBH320 - QBH 3-pole 20A 240V 22 kAIC bolt-on breaker", quantity: "8" },
      { item: "3-Pole 30A QBH Breaker", spec: "Eaton QBH330 - QBH 3-pole 30A 240V 22 kAIC bolt-on breaker", quantity: "4" },
      { item: "350 kcmil AL XHHW-2", spec: "ALU XHHW3501000 - 350 kcmil AL XHHW-2 600V black, per ft", quantity: "150 ft" },
      { item: "2 in. Rigid Metal Conduit", spec: "CON GAL2 - 2 in. galvanized rigid metal conduit 10 ft stick", quantity: "5" },
      { item: "2 in. EMT Connector", spec: "Bridgeport 235 - 2 in. EMT set-screw connector", quantity: "8" },
      { item: "Arc Flash Label", spec: "Brady 66127 - arc flash hazard label per NEC 110.16", quantity: "2" },
      { item: "Polaris Multi-Tap", spec: "NSI IPLD104 - Polaris insulated multi-tap connector, AL-CU rated", quantity: "6" },
      { item: "Duct Seal 1 lb", spec: "PECO DS1 - duct seal compound, 1 lb", quantity: "1" },
    ],
  },
  {
    id: "service-truck",
    label: "Service Truck Stock",
    description: "Common restock items — connectors, devices, wire nuts, boxes, straps",
    icon: "🚐",
    items: [
      { item: "Wire Nuts Assorted", spec: "Ideal 30-072 - Twist-on wire connectors, assorted colors", quantity: "200" },
      { item: "Wago 2-Port Lever Nut", spec: "Wago 221-412 - Lever-nut compact splicing connector, 2-port", quantity: "50" },
      { item: "Wago 3-Port Lever Nut", spec: "Wago 221-413 - Lever-nut compact splicing connector, 3-port", quantity: "50" },
      { item: "15A TR Receptacle", spec: "Eaton TR1107W - Decora 15A 125V tamper-resistant duplex receptacle, white", quantity: "10" },
      { item: "20A GFCI Receptacle", spec: "Eaton TRGF20W - 20A 125V TR GFCI receptacle, indoor, white", quantity: "5" },
      { item: "Single-Pole Switch 15A", spec: "Eaton 7501W - Decora 15A 120/277V single-pole rocker switch, white", quantity: "10" },
      { item: "1-Gang Decora Plate", spec: "Eaton PJ26W - 1-gang Decora mid-size wall plate, white", quantity: "10" },
      { item: "4-Square Box Deep", spec: "Crouse-Hinds TP403 - 4 in. square 2-1/8 in. deep steel outlet box", quantity: "10" },
      { item: "4-Square Raised Cover (Duplex)", spec: "Crouse-Hinds TP516 - 4 in. square raised cover for duplex receptacle", quantity: "10" },
      { item: "1/2 in. EMT Connector", spec: "Bridgeport 230 - 1/2 in. EMT set-screw connector", quantity: "25" },
      { item: "3/4 in. EMT Connector", spec: "Bridgeport 231 - 3/4 in. EMT set-screw connector", quantity: "25" },
      { item: "1/2 in. One-Hole Strap", spec: "Bridgeport 920S - 1/2 in. one-hole EMT strap", quantity: "50" },
      { item: "NM Cable Connector", spec: "Arlington NM94 - push-in cable connector for NM/Romex, 3/8 in.", quantity: "25" },
      { item: "Duct Seal 1 lb", spec: "PECO DS1 - duct seal compound, 1 lb", quantity: "2" },
      { item: "Anti-Oxidant 8 oz", spec: "Ideal Noalox 30-026 - anti-oxidant compound, 8 oz", quantity: "1" },
    ],
  },
];
