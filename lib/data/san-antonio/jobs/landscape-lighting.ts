import type { Job } from "../../types";
import { diagram } from "../../diagrams/landscape-lighting";
import { SA_SUPPLIERS } from "../suppliers";
import { SA_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "landscape-lighting",
  label: "Landscape/Outdoor Lighting Circuit",
  requirements: [
    "NEC 2026 Art. 411: Low-voltage lighting systems (Class 2) and Art. 210/225 for line-voltage outdoor circuits",
    "Low-voltage landscape lighting (12V/24V) transformer must be listed and outdoor rated",
    "Line-voltage outdoor circuits require GFCI protection per NEC 210.8(A)(3)",
    "Burial depth: 12 in. minimum for low-voltage, 18 in. for line-voltage per NEC Table 300.5",
    "Photocell or timer control recommended for energy efficiency",
    "City of San Antonio permit generally not required for low-voltage landscape lighting under 30V",
  ],
  materials: [
    { item: "Low-Voltage Transformer 600W", quantity: "1", spec: "Kichler 15PR600SS - 600W stainless steel landscape transformer, multi-tap (12V/13V/14V/15V), timer built-in", unitPrice: 425 },
    { item: "Dual Function Breaker 20A", quantity: "1", spec: "Eaton BRP120DF - BR dual function AF/GF 1-pole 20A, dedicated outdoor circuit for transformer", unitPrice: 75.6 },
    { item: "12 AWG THHN Black", quantity: "50 ft", spec: "COP THHN12STBK500 - 12 AWG THHN solid black, line-voltage from panel to transformer, sold per ft", unitPrice: 0.32 },
    { item: "12 AWG THHN White", quantity: "50 ft", spec: "COP THHN12STWH500 - 12 AWG THHN solid white, neutral, sold per ft", unitPrice: 0.32 },
    { item: "12 AWG THHN Green", quantity: "50 ft", spec: "COP THHN12STGN500 - 12 AWG THHN solid green, equipment ground, sold per ft", unitPrice: 0.32 },
    { item: "12/2 Low-Voltage Cable", quantity: "250 ft", spec: "Southwire 55213443 - 12/2 low-voltage landscape wire, 250 ft spool, direct burial rated", unitPrice: 0.55 },
    { item: "1 in. ENT Blue Flex", quantity: "1 coil (100 ft)", spec: "PVF ENT1B0X - 1 in. ENT flex, line-voltage run to transformer location", unitPrice: 130.43 },
    { item: "LED Path Light", quantity: "8", spec: "Kichler 15820AZT30 - LED path light, 3000K, bronze, 2.5W each", unitPrice: 48 },
    { item: "LED Spot Light", quantity: "4", spec: "Kichler 16224AZT30 - LED accent/spot light, 3000K, bronze, adjustable", unitPrice: 72 },
    { item: "Red Wire Connectors", quantity: "1 bag (500)", spec: "NSI WWCRB - red winged wire connector, 500/bag, for low-voltage splices", unitPrice: 42 },
    { item: "In-Use Weatherproof Cover", quantity: "1", spec: "Taymac MM420C - 1G 2-3/4 in. extra-duty while-in-use cover for outdoor GFCI receptacle", unitPrice: 12.9 },
    { item: "15A TR WR Duplex Receptacle", quantity: "1", spec: "Eaton TWR270W - receptacle TR weather-resistant duplex 15A white, transformer power source", unitPrice: 3.8 },
    { item: "Weatherproof Box Cover", quantity: "1", spec: "Hubbell 51800 - 1G weatherproof duplex receptacle cover", unitPrice: 9.5 },
    { item: "1/2 in. NM Liquid-Tight Connector", quantity: "4", spec: "Sperry/Halex 8403 - 1/2 in. non-metallic liquid-tight straight connector", unitPrice: 3.25 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb", unitPrice: 8.55 },
    { item: "Direct Burial Splice Kit", quantity: "1", spec: "3M DBR/Y-6 - direct burial splice kit, 6-pack, for underground connections", unitPrice: 8.5 },
    { item: "Underground Warning Tape", quantity: "1", spec: "Brady UGT-E - underground warning tape, 200 ft roll", unitPrice: 6.5 },
  ],
  blueprintNotes: [
    "Transformer: mount near exterior GFCI outlet, protected from sprinklers and flooding",
    "Low-voltage wire: use hub-and-spoke layout from transformer to minimize voltage drop",
    "Use 12/2 wire for runs over 50 ft, 10/2 for runs over 100 ft to maintain voltage",
    "Path lights: space 6-8 ft apart along walkways for even illumination",
    "Breaker: BRP120DF dual function in BR series panel for transformer circuit",
  ],
  svgDiagram: diagram,
  suppliers: SA_SUPPLIERS,
  officialDocs: SA_OFFICIAL_DOCS,
};
