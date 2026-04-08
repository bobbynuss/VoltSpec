import type { Job } from "../types";
import { diagram } from "../diagrams/residential-trim-out";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "residential-trim-out",
  label: "Residential Final Trim-Out",
  requirements: [
    "NEC 2026 Art. 406: All 15A/20A receptacles in dwelling units must be tamper-resistant (TR)",
    "NEC 2026 Art. 210.8: GFCI required in kitchens, bathrooms, garages, outdoors, laundry, basements, crawl spaces",
    "NEC 2026 Art. 210.12: AFCI required in all habitable rooms (bedrooms, living rooms, dining, hallways, closets)",
    "NEC 2026 Art. 314.16: Box fill calculations must be verified before installing devices",
    "NEC 2026 Art. 404.9(B): Switches must have a grounding means",
    "NEC 2026 Art. 760.41: Smoke/CO detectors must be interconnected and hardwired with battery backup",
    "NEC 2026 Art. 410.116: Recessed luminaires in insulated ceilings must be IC-rated",
    "All devices must be UL listed and match the circuit amperage rating",
    "Wall plates must be installed on all device boxes — no open boxes at final inspection",
    "Permit required: final inspection after all devices are installed and energized",
  ],
  materials: [
    // ── Lighting ──────────────────────────────────────────────────────────────
    {
      item: "6\" LED Retrofit Baffle Trim",
      quantity: "10",
      spec: "Eaton LT56079F51EWH - Halo LT 6 in. LED retrofit baffle trim, 5000K daylight, 90 CRI, IC/non-IC rated, white",
      unitPrice: 8.97,
    },
    // ── Switches ──────────────────────────────────────────────────────────────
    {
      item: "Decora Single-Pole Switch 15A",
      quantity: "8",
      spec: "Eaton 7501W - Decora 15A 120/277V single-pole rocker switch, white, grounding",
      unitPrice: 2.15,
    },
    {
      item: "Decora 3-Way Switch 15A",
      quantity: "4",
      spec: "Eaton 7503W - Decora 15A 120/277V 3-way rocker switch, white, grounding",
      unitPrice: 3.85,
    },
    {
      item: "Decora Dimmer Switch",
      quantity: "2",
      spec: "Lutron DVCL153PWH - Diva C-L dimmer, LED/CFL/incandescent, 150W LED / 600W inc., single-pole/3-way, white",
      unitPrice: 22.00,
    },
    // ── Receptacles ───────────────────────────────────────────────────────────
    {
      item: "Decora 15A TR Receptacle",
      quantity: "12",
      spec: "Eaton TR1107W - Decora 15A 125V tamper-resistant duplex receptacle, white, residential grade",
      unitPrice: 1.85,
    },
    {
      item: "Decora 20A TR Receptacle",
      quantity: "4",
      spec: "Eaton TR1307W - Decora 20A 125V tamper-resistant duplex receptacle, white, kitchen/laundry circuits",
      unitPrice: 2.50,
    },
    {
      item: "Decora GFCI Receptacle 15A",
      quantity: "3",
      spec: "Eaton TRGF15W - TR self-test GFCI 15A 125V white, kitchen/bath/garage/outdoor locations",
      unitPrice: 15.70,
    },
    // ── Wall Plates ───────────────────────────────────────────────────────────
    {
      item: "Single Decora Wall Plate",
      quantity: "12",
      spec: "Eaton PJ26W - 1-gang Decora/GFCI mid-size wall plate, white, polycarbonate",
      unitPrice: 0.65,
    },
    {
      item: "Double Decora Wall Plate",
      quantity: "6",
      spec: "Eaton PJ262W - 2-gang Decora mid-size wall plate, white, polycarbonate",
      unitPrice: 1.10,
    },
    {
      item: "Triple Decora Wall Plate",
      quantity: "2",
      spec: "Eaton PJ263W - 3-gang Decora mid-size wall plate, white, polycarbonate",
      unitPrice: 1.85,
    },
    // ── Safety Devices ────────────────────────────────────────────────────────
    {
      item: "Smoke/CO Combination Detector",
      quantity: "4",
      spec: "BRK SC9120B - 120V AC hardwired smoke and carbon monoxide combo alarm with battery backup, interconnectable",
      unitPrice: 36.11,
    },
    // ── Connectors & Splicing ─────────────────────────────────────────────────
    {
      item: "Wire Nuts Assorted",
      quantity: "50",
      spec: "Ideal 30-072 - Twist-on wire connectors, assorted (yellow/red/orange/tan), sold per piece from bulk",
      unitPrice: 0.08,
    },
    {
      item: "Push-In Connectors Assorted",
      quantity: "30",
      spec: "Wago 221-412 - Lever-nut compact splicing connector, 2-port, 28-12 AWG, sold per piece",
      unitPrice: 0.65,
    },
    {
      item: "NM Cable Connector",
      quantity: "20",
      spec: "Arlington NM94 - 1-piece non-metallic push-in cable connector for NM/Romex, 3/8 in. knockout",
      unitPrice: 0.55,
    },
  ],
  blueprintNotes: [
    "Verify all boxes are flush with finished drywall surface before installing devices",
    "Test all circuits for continuity and correct polarity before energizing",
    "Install 6\" LED retrofit trims (LT56079F51EWH) in all recessed can locations — verify IC rating if insulation contact",
    "Install tamper-resistant (TR) receptacles on ALL 15A/20A branch circuits — NEC 2026 requirement",
    "GFCI receptacles required within 6 ft of all sinks, in bathrooms, garage, outdoors, and laundry",
    "Smoke/CO detectors: install in every bedroom, outside each sleeping area, and on every level — all interconnected",
    "Use 20A-rated receptacles on 20A kitchen/laundry circuits (do not mix 15A devices on 20A dedicated circuits)",
    "Verify Lutron dimmers are rated for connected LED load — DVCL153P rated for 150W LED",
    "Label all circuits at the panel per NEC 408.4 — legible, accurate directory required at final inspection",
    "Wall plates on every device box — no open or missing plates at inspection",
    "Adjust quantities to match your actual rough-in device count — this is a starter template",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
