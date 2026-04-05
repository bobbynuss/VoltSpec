import type { Job } from "../types";
import { diagram } from "../diagrams/span-panel-upgrade";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "span-panel-upgrade",
  label: "SPAN Smart Panel Upgrade",
  requirements: [
    "NEC 2026 Art. 230: Service upgrade to current code at time of permit",
    "SPAN Panel requires dedicated 2.4 GHz Wi-Fi network within range of panel location",
    "SPAN installation must follow SPAN Installation Guide and UL 67 listing requirements",
    "CT sensor clamps required on service entrance conductors for whole-home monitoring",
    "Austin Energy ESPA required - AE must coordinate meter pull and reconnect",
    "Outdoor disconnect required if not already present (AE amendment)",
    "All new work must meet NEC 2026 - existing wiring grandfathered unless altered",
    "AFCI required on all bedroom/living circuits per NEC 210.12",
    "GFCI required on all wet location circuits per NEC 210.8",
    "Ground electrode system must be verified/upgraded to NEC 250",
    "SPAN panel is UL 67 listed - verify AHJ acceptance before ordering",
    "Permit required: electrical permit + AE service application",
    "Inspection required before AE reconnects service",
    "SPAN app setup and circuit labeling required after installation",
  ],
  materials: [
    { item: "SPAN Smart Panel 200A", quantity: "1", spec: "SPAN PNL-200-32 - 200A 32-space SPAN Smart Panel, Wi-Fi enabled, per-circuit monitoring and control, UL 67 listed", unitPrice: 4500 },
    { item: "SPAN CT Sensor Kit", quantity: "1", spec: "SPAN CT-200-KIT - Split-core CT sensor clamps for 200A service, includes mounting hardware", unitPrice: 150 },
    { item: "200A Ringless Meter Base", quantity: "1", spec: "Eaton 1006352CCH - 200A ringless single-phase meter base, AE-approved for Central Texas, replace only if upgrading meter base", unitPrice: 478.69 },
    { item: "4/0-4/0-2/0 AL SER Cable", quantity: "10 ft", spec: "ALU SER401000 - 4/0-4/0-2/0 AL SER 600V service entrance cable, sold per ft", unitPrice: 5.85 },
    { item: "SPAN 20A AFCI+GFCI Breaker", quantity: "8", spec: "SPAN BRK-120-DF - SPAN-compatible 1-pole 20A dual function AFCI+GFCI breaker, bedroom/living circuits", unitPrice: 85 },
    { item: "SPAN 20A GFCI Breaker", quantity: "4", spec: "SPAN BRK-120-GF - SPAN-compatible 1-pole 20A GFCI breaker, kitchen/bath/garage/exterior", unitPrice: 90 },
    { item: "SPAN 2-Pole 30A Breaker", quantity: "2", spec: "SPAN BRK-230 - SPAN-compatible 2-pole 30A breaker, dryer and water heater circuits", unitPrice: 45 },
    { item: "SPAN 2-Pole 50A Breaker", quantity: "1", spec: "SPAN BRK-250 - SPAN-compatible 2-pole 50A breaker, range or EV charger circuit", unitPrice: 55 },
    { item: "4 AWG Bare Copper GEC", quantity: "10 ft", spec: "COP BARE4SOL500 - 4 AWG solid bare copper GEC, 500 ft spool, sold per ft", unitPrice: 2.1 },
    { item: "5/8 x 8 ft Ground Rod", quantity: "2", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod", unitPrice: 26.43 },
    { item: "Ground Rod Clamp", quantity: "2", spec: "NSI GRC58 - 5/8 in. ground rod bronze clamp, UL listed", unitPrice: 4.21 },
    { item: "AL-CU Multi-Tap Connector", quantity: "4", spec: "NSI IPLD104 - Polaris insulated multi-tap connector, AL-CU rated for mixed wiring terminations", unitPrice: 30.06 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit entries per NEC 230.8", unitPrice: 6.36 },
    { item: "Panel Directory Label Kit", quantity: "1", spec: "Brady 95543 - adhesive panel directory label kit, typed circuit labels required by AHJ at inspection", unitPrice: 12 },
  ],
  blueprintNotes: [
    "Document existing panel directory before removal",
    "Photo all existing wiring connections before transfer",
    "Verify 2.4 GHz Wi-Fi signal strength at panel location before installation",
    "Install CT sensor clamps on service entrance conductors before closing panel",
    "Configure SPAN app and label all circuits after energization",
    "Install arc flash label on new panel per NEC 110.16",
    "Coordinate with AE for meter pull window - typically 4-hour notice",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: [
    ...AUSTIN_OFFICIAL_DOCS,
    {
      title: "SPAN Panel Installation Guide",
      url: "https://support.span.io/hc/en-us/categories/360002287393-Installation",
      description: "Official SPAN installation documentation, wiring diagrams, and commissioning procedures",
    },
    {
      title: "SPAN Panel Specifications",
      url: "https://www.span.io/panel",
      description: "SPAN Smart Panel product specifications, features, and compatibility information",
    },
  ],
};
