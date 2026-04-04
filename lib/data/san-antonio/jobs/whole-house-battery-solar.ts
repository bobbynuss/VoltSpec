import type { Job } from "../../types";
import { diagram } from "../diagrams/whole-house-battery-solar";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "whole-house-battery-solar",
  label: "Whole-House Battery Storage with Solar Interconnect",
  requirements: [
    "NEC 2026 Art. 706: Energy storage systems — UL 9540 listed equipment required",
    "NEC 2026 Art. 690: Solar photovoltaic systems — rapid shutdown per NEC 690.12",
    "CPS Energy interconnect application required for solar PV + battery storage systems",
    "ESS and solar inverter must be on CPS Energy approved equipment list",
    "Battery system must include automatic transfer switch for backup operation",
    "Critical loads subpanel required — separate backed-up circuits from non-backed-up",
    "Solar backfeed breaker sizing per NEC 705.12 — 120% bus rating rule applies",
    "Production meter may be required by CPS Energy for solar generation monitoring",
    "City of San Antonio electrical permit required + CPS solar/storage interconnect application",
    "Fire marshal notification required for battery systems >20 kWh in enclosed spaces",
  ],
  materials: [
    { item: "Battery Energy Storage System", quantity: "1", spec: "Tesla Powerwall 3 - 13.5kWh usable, 11.5kW continuous output, integrated inverter, UL 9540 listed, indoor/outdoor rated", unitPrice: 9800 },
    { item: "Tesla Gateway 3", quantity: "1", spec: "Tesla Gateway 3 - system controller and automatic transfer relay, manages grid/battery/solar transitions, whole-home backup capable", unitPrice: 1950 },
    { item: "Solar PV Inverter", quantity: "1", spec: "Enphase IQ8A-72-M-US - microinverter, 366W rated, UL 1741 SA listed with rapid shutdown compliance — qty varies by array size, priced per unit", unitPrice: 185 },
    { item: "Critical Loads Subpanel", quantity: "1", spec: "Eaton BR2024L125RP - 100/125A 24-space BR MLO indoor subpanel, for backed-up critical load circuits", unitPrice: 32 },
    { item: "2-Pole 60A Battery Breaker", quantity: "1", spec: "Eaton BR260 - Type BR 2-pole 60A breaker in main panel, Powerwall AC connection circuit", unitPrice: 26.40 },
    { item: "2-Pole 40A Solar Backfeed Breaker", quantity: "1", spec: "Eaton BR240 - Type BR 2-pole 40A breaker in main panel, solar PV backfeed circuit — verify 120% bus rule", unitPrice: 18.50 },
    { item: "100A 2-Pole Feeder Breaker", quantity: "1", spec: "Eaton BR2100 - Type BR 2-pole 100A feeder breaker in main panel feeding critical loads subpanel", unitPrice: 38 },
    { item: "6 AWG THHN Black", quantity: "60 ft", spec: "COP THHN6STBK500 - 6 AWG THHN stranded black, battery/gateway/solar wiring runs, sold per ft" },
    { item: "6 AWG THHN Red", quantity: "60 ft", spec: "COP THHN6STRD500 - 6 AWG THHN stranded red, second hot conductor, sold per ft" },
    { item: "6 AWG THHN White", quantity: "60 ft", spec: "COP THHN6STWH500 - 6 AWG THHN stranded white, neutral conductor, sold per ft" },
    { item: "10 AWG THHN Green", quantity: "60 ft", spec: "COP THHN10STGN500 - 10 AWG THHN stranded green, equipment grounding conductor, sold per ft" },
    { item: "1 in. ENT Blue Flex", quantity: "1 coil (100 ft)", spec: "PVF ENT1B0X - 1 in. x 100 ft blue ENT coil, battery to gateway and panel conduit runs", unitPrice: 130.43 },
    { item: "Rapid Shutdown Initiator", quantity: "1", spec: "Tigo TS4-R-S - rapid shutdown transmitter, roof-mount, NEC 690.12 compliant, pairs with module-level electronics", unitPrice: 65 },
    { item: "DC Disconnect (Solar)", quantity: "1", spec: "Eaton DPB222R - 60A 600VDC non-fusible disconnect, NEMA 3R, solar array DC disconnect at inverter", unitPrice: 61.22 },
    { item: "Production Meter Socket", quantity: "1", spec: "Milbank U4497-XL - 200A meter socket for production metering, if required by CPS for solar generation monitoring", unitPrice: 95 },
    { item: "Surge Protective Device", quantity: "1", spec: "Eaton BRNSURGE10 - Type BR 2-pole surge arrester, protect solar/battery electronics", unitPrice: 136.51 },
    { item: "ESS / Solar Warning Labels Kit", quantity: "1", spec: "Brady ESS-NEC2026 - energy storage system + solar PV warning label kit per NEC 690 and NEC 706", unitPrice: 22 },
    { item: "Duct Seal", quantity: "2", spec: "PECO DS1 - duct seal compound, 1 lb each, seal all conduit penetrations", unitPrice: 8.55 },
  ],
  blueprintNotes: [
    "Battery: mount on garage wall or exterior — follow Tesla clearance specs (no closets with HVAC)",
    "Gateway: install between meter and main panel for whole-home backup capability",
    "Critical loads subpanel: move essential circuits (fridge, lights, network, security) to BR2024L125RP",
    "Solar backfeed breaker: size per NEC 705.12 — 120% bus rule (200A bus × 1.2 = 240A max)",
    "Rapid shutdown: Tigo TS4-R-S at array, initiator at main disconnect — NEC 690.12 compliant",
    "Submit CPS Energy solar/storage interconnect application before beginning installation",
    "Production meter: CPS may require separate meter for solar generation — confirm before ordering",
    "Use BR series breakers only — BR260, BR240, BR2100 in main panel",
  ],
  svgDiagram: diagram,
  suppliers: [...SA_SUPPLIERS, { name: "CED Greentech San Antonio", address: "6900 Alamo Downs Pkwy, San Antonio, TX 78238", phone: "(210) 201-0141", website: "https://www.cedgreentech.com", notes: "Tesla Powerwall, Enphase, solar BOS components" }],
  officialDocs: SA_OFFICIAL_DOCS,
};
