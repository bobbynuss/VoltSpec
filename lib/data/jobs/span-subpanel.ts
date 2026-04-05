import type { Job } from "../types";
import { diagram } from "../diagrams/span-subpanel";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "span-subpanel",
  label: "SPAN Smart Subpanel",
  requirements: [
    "NEC 2026 Art. 225/240: Feeder must be sized for subpanel rating",
    "SPAN Panel requires dedicated 2.4 GHz Wi-Fi network within range of subpanel location",
    "SPAN installation must follow SPAN Installation Guide and UL 67 listing requirements",
    "CT sensor clamps required on feeder conductors for subpanel monitoring",
    "Separate neutral and ground buses in subpanel (NEC 250.32)",
    "4-wire feeder required: 2 hots, 1 neutral, 1 ground",
    "Feeder conductors: minimum 1 AWG aluminum or 3 AWG copper for 100A",
    "Disconnect at subpanel via main breaker in existing panel",
    "AFCI and GFCI requirements apply to all new circuits added",
    "SPAN panel is UL 67 listed - verify AHJ acceptance before ordering",
    "Permit required for feeder and subpanel installation",
    "SPAN app setup and circuit labeling required after installation",
  ],
  materials: [
    { item: "SPAN Smart Subpanel 100A", quantity: "1", spec: "SPAN PNL-100-32-MLO - 100A 32-space SPAN Smart Panel, MLO configuration for subpanel use, Wi-Fi enabled, per-circuit monitoring and control", unitPrice: 4200 },
    { item: "SPAN CT Sensor Kit", quantity: "1", spec: "SPAN CT-100-KIT - Split-core CT sensor clamps for 100A feeder, includes mounting hardware", unitPrice: 130 },
    { item: "100A 2-Pole Feeder Breaker", quantity: "1", spec: "Eaton CH2100 - CH 2-pole 100A breaker in main panel for feeder protection", unitPrice: 28 },
    { item: "1 AWG AL XHHW-2 Black", quantity: "60 ft", spec: "ALU XHHW1BK500 - 1 AWG AL XHHW-2 stranded black, 500 ft spool, feeder hot conductor, sold per ft - speak to sales" },
    { item: "1 AWG AL XHHW-2 Red", quantity: "60 ft", spec: "ALU XHHW1RD500 - 1 AWG AL XHHW-2 stranded red, feeder second hot, sold per ft - speak to sales" },
    { item: "1 AWG AL XHHW-2 White", quantity: "60 ft", spec: "ALU XHHW1WH500 - 1 AWG AL XHHW-2 stranded white, neutral conductor, sold per ft - speak to sales" },
    { item: "6 AWG THHN Green", quantity: "60 ft", spec: "COP THHN6STGN500 - 6 AWG THHN stranded green, equipment grounding conductor, sold per ft", unitPrice: 0.85 },
    { item: "1-1/4 in. EMT Conduit", quantity: "40 ft", spec: "CON EMT114 - 1-1/4 in. EMT 10 ft stick, feeder conduit run to subpanel location", unitPrice: 8.5 },
    { item: "1-1/4 in. EMT Set-Screw Connectors", quantity: "4", spec: "Bridgeport 233 - 1-1/4 in. EMT set-screw connector", unitPrice: 2.25 },
    { item: "1-1/4 in. EMT Set-Screw Couplings", quantity: "4", spec: "Bridgeport 243 - 1-1/4 in. EMT set-screw coupling", unitPrice: 1.85 },
    { item: "1-1/4 in. EMT One-Hole Straps", quantity: "8", spec: "Bridgeport 923S - 1-1/4 in. EMT one-hole strap, support every 10 ft and within 3 ft of boxes per NEC 358.30", unitPrice: 0.65 },
    { item: "SPAN 20A AFCI+GFCI Breaker", quantity: "4", spec: "SPAN BRK-120-DF - SPAN-compatible 1-pole 20A dual function AFCI+GFCI for subpanel branch circuits", unitPrice: 85 },
    { item: "SPAN 20A GFCI Breaker", quantity: "2", spec: "SPAN BRK-120-GF - SPAN-compatible 1-pole 20A GFCI breaker, garage receptacle circuits", unitPrice: 90 },
    { item: "SPAN 2-Pole 30A Breaker", quantity: "1", spec: "SPAN BRK-230 - SPAN-compatible 2-pole 30A for air compressor or welder circuit", unitPrice: 45 },
    { item: "SPAN 2-Pole 50A Breaker", quantity: "1", spec: "SPAN BRK-250 - SPAN-compatible 2-pole 50A for large equipment or EV rough-in", unitPrice: 55 },
    { item: "5/8 x 8 ft Ground Rod", quantity: "1", spec: "Erico 615880 - required if subpanel is in a detached structure per NEC 250.32", unitPrice: 26.43 },
    { item: "Ground Rod Clamp", quantity: "1", spec: "NSI GRC58 - 5/8 in. bronze ground rod clamp, UL listed", unitPrice: 4.21 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit wall penetrations per NEC 230.8", unitPrice: 6.36 },
  ],
  blueprintNotes: [
    "Neutral and ground buses MUST be separate in subpanel (isolated neutral)",
    "Verify 2.4 GHz Wi-Fi signal strength at subpanel location before installation",
    "Install CT sensor clamps on feeder conductors before closing panel",
    "Feeder runs shortest path - avoid long voltage drop runs (keep <3% drop)",
    "Label main panel breaker: 'SPAN SUBPANEL - [LOCATION]'",
    "Configure SPAN app and label all circuits after energization",
    "Install arc flash label on subpanel",
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
