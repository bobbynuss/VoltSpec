import type { Job } from "../types";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "commercial-led-retrofit",
  label: "Commercial Lighting Retrofit / LED Upgrade",
  requirements: [
    "NEC 2026 Art. 410: Luminaire installation and branch circuit requirements",
    "NEC 2026 Art. 220.12: Lighting load calculations for commercial occupancies",
    "Austin Energy: rebate programs may apply for qualifying LED retrofits — verify with AE commercial services",
    "Existing panel capacity must support new lighting load — perform load calc before starting",
    "Emergency and exit lighting must remain operational during retrofit (NEC 700/701)",
    "Verify existing circuit breaker ratings match new fixture loads — de-rate if paralleling drivers",
    "All retrofit kits must be UL listed (UL 1598C) for the existing fixture type",
    "0-10V dimming wiring required where new occupancy/daylight sensors are installed",
    "Permit: commercial electrical permit required for lighting modifications",
    "Label all new circuits at panel per NEC 408.4 — update panel schedule",
  ],
  materials: [
    { item: "4 ft LED Troffer Retrofit Kit (40W)", quantity: "40", spec: "Eaton ML4T4040R - Metalux 4 ft LED retrofit kit, 40W, 4000K, 4400 lumens, 0-10V dimmable, UL 1598C listed, replaces 2-lamp T8 fluorescent" },
    { item: "2x4 LED Flat Panel (40W)", quantity: "20", spec: "Eaton 24FP4040R - Metalux 2x4 LED flat panel, 40W, 4000K, 5000 lumens, 0-10V dimmable, drop ceiling grid mount" },
    { item: "LED High-Bay (150W)", quantity: "12", spec: "Eaton CPHBAL013MVOLTSW - Crouse-Hinds high-bay LED, 150W, multi-volt, switchable CCT/lumen, for warehouse/industrial open ceilings" },
    { item: "Occupancy/Vacancy Sensor (ceiling)", quantity: "15", spec: "Eaton OS310U-W - ceiling mount occupancy sensor, 360° coverage, passive infrared, 120/277V" },
    { item: "Daylight Harvesting Sensor", quantity: "4", spec: "Lithonia NCM series - nLight ceiling-mount daylight sensor, 0-10V dimming output, photocell-based daylight harvesting for energy code compliance" },
    { item: "0-10V Dimming Wire (18/2)", quantity: "500 ft", spec: "Lutron GRX-CBL-346S - 18/2 shielded plenum-rated 0-10V dimming cable, purple jacket, sold per ft" },
    { item: "Wire Nuts (tan, 22-8 AWG)", quantity: "1 bag (100)", spec: "Ideal 30-073 - Wing-Nut 452 tan wire connectors, 100/bag, for fixture whip connections" },
    { item: "MC Cable 12/2 (fixture whips)", quantity: "500 ft", spec: "AFC 1903B42-00 - 12/2 MC cable with ground, 250 ft coil × 2, for fixture branch circuit runs" },
    { item: "1/2 in. MC Snap-In Connectors", quantity: "80", spec: "Bridgeport 90DC - 1/2 in. die-cast MC cable snap-in connector, quick install" },
    { item: "20A 1-Pole Breaker (lighting circuits)", quantity: "6", spec: "Eaton CHF120 - CH 1-pole 20A 120V breaker, lighting branch circuits" },
    { item: "Circuit ID Labels", quantity: "1 pack", spec: "Brady BMP21 labels - circuit identification labels for updated panel schedule" },
    { item: "Wire Ties & Supports", quantity: "1 lot", spec: "Misc cable ties, J-hooks, beam clamps for plenum-rated cable support per NEC 300.11" },
  ],
  blueprintNotes: [
    "Survey existing fixtures and circuit mapping BEFORE ordering — count may vary by building",
    "Material quantities shown are for a typical 10,000 sq ft office/warehouse — adjust to actual",
    "Verify existing panel has capacity for new loads — LED typically reduces total draw 40-60%",
    "0-10V dimming wires run separately from power conductors — use shielded cable in plenum spaces",
    "All MC cable must be supported within 12 in. of box and every 6 ft per NEC 330.30",
    "Emergency circuit fixtures must have battery backup or be on emergency panel",
    "Recycle old fluorescent lamps per EPA regulations — do not trash",

  ],
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
