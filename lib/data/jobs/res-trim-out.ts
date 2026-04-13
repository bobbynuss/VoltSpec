import type { Job } from "../types";
import { diagram } from "../diagrams/res-trim-out";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "res-trim-out",
  label: "New Home Build – Phase 4: Trim-Out (Devices, Fixtures, Fans)",
  requirements: [
    "NEC 2026 Art. 406.12: Tamper-resistant receptacles required in ALL dwelling unit locations — no exceptions",
    "NEC 2026 Art. 210.12: AFCI breakers required — bedrooms, living, dining, hallways, closets, dens",
    "NEC 2026 Art. 210.8: GFCI protection — bathrooms, kitchen countertop, garage, outdoor, laundry, basement",
    "NEC 2026 Art. 406.6: Receptacle faceplates — breakage-free, properly fitted",
    "NEC 2026 Art. 404.9(B): Switch faceplates — grounding-type if metal",
    "NEC 2026 Art. 314.25: All outlet boxes must have cover plates — no exposed/open boxes",
    "NEC 2026 Art. 410.16: Recessed fixtures — IC-rated required in insulated ceilings",
    "NEC 2026 Art. 422.16: Appliance connections — dishwasher, disposal, range hood per manufacturer",
    "Smoke/CO: interconnected per unit — hardwired with battery backup, every bedroom + hallway + each level",
    "Ceiling fans: fan-rated box verified, proper support, no wobble at all speeds",
  ],
  materials: [
    // ── AFCI Breakers ───────────────────────────────────────────
    { item: "1-Pole 15A AFCI Breaker", quantity: "8", spec: "Eaton CHFP115AF - CH combination AFCI, 15A — bedrooms, living, dining, hallway, closets", unitPrice: 45.00 },
    { item: "1-Pole 20A AFCI Breaker", quantity: "4", spec: "Eaton CHFP120AF - CH combination AFCI, 20A — kitchen SABC, dining outlets", unitPrice: 45.00 },
    // ── GFCI Breakers ───────────────────────────────────────────
    { item: "1-Pole 20A GFCI Breaker", quantity: "4", spec: "Eaton CHFP120GF - CH GFCI, 20A — bathrooms, dishwasher, outdoor, garage", unitPrice: 85.19 },
    // ── Standard Breakers ───────────────────────────────────────
    { item: "1-Pole 15A Breaker", quantity: "4", spec: "Eaton CHF115 - CH 1-pole 15A — garage lights, exterior, spares", unitPrice: 8.50 },
    { item: "1-Pole 20A Breaker", quantity: "4", spec: "Eaton CHF120 - CH 1-pole 20A — refrigerator, disposal, microwave, washer", unitPrice: 8.50 },
    { item: "2-Pole 30A Breaker", quantity: "2", spec: "Eaton CHF230 - CH 2-pole 30A — dryer + water heater", unitPrice: 18.50 },
    { item: "2-Pole 40A Breaker", quantity: "1", spec: "Eaton CHF240 - CH 2-pole 40A — A/C condenser", unitPrice: 21.00 },
    { item: "2-Pole 50A Breaker", quantity: "2", spec: "Eaton CHF250 - CH 2-pole 50A — range + EV charger", unitPrice: 23.73 },
    // ── Receptacles ─────────────────────────────────────────────
    { item: "15A TR Duplex Receptacle", quantity: "40", spec: "Eaton TR1107W-BOX - 15A TR duplex, white — bedrooms, living, hallway, closets", unitPrice: 1.85 },
    { item: "20A TR Duplex Receptacle", quantity: "12", spec: "Eaton TR1877W-BOX - 20A TR duplex, white — kitchen, laundry, garage", unitPrice: 3.85 },
    { item: "20A TR GFCI Receptacle", quantity: "4", spec: "Eaton TWRGF20W - 20A TR GFCI, white — bath vanity, kitchen near sink (if not using GFCI breaker)", unitPrice: 28.34 },
    { item: "USB Duplex Receptacle", quantity: "4", spec: "Eaton TR7756W-BOX - 20A TR duplex with USB-A+C — kitchen counter, nightstands, office", unitPrice: 28.00 },
    // ── Switches ────────────────────────────────────────────────
    { item: "Single-Pole Switch", quantity: "15", spec: "Eaton 1301-7W-BOX - 15A single-pole toggle — general lighting control", unitPrice: 2.15 },
    { item: "3-Way Switch", quantity: "6", spec: "Eaton 1303-7W-BOX - 15A 3-way toggle — hallway, stairs, living/entry", unitPrice: 3.50 },
    { item: "Dimmer Switch", quantity: "4", spec: "Eaton DAL06P-C2-KB - decorator dimmer, 600W — dining, master, living, entry", unitPrice: 18.50 },
    { item: "Fan/Light Switch", quantity: "4", spec: "Eaton TR274W - double switch, fan + light control — ceiling fan locations", unitPrice: 8.50 },
    // ── Wall Plates ─────────────────────────────────────────────
    { item: "Decorator 1-Gang Plate", quantity: "50", spec: "Eaton PJS26W-10-L - screwless decorator plate, 1-gang, white", unitPrice: 1.25 },
    { item: "Decorator 2-Gang Plate", quantity: "10", spec: "Eaton PJS262W - screwless decorator plate, 2-gang, white", unitPrice: 2.50 },
    { item: "Blank Plate", quantity: "4", spec: "Eaton PJ13W-10-L - blank plate, 1-gang, white", unitPrice: 0.85 },
    // ── Light Fixtures ──────────────────────────────────────────
    { item: "LED Recessed 6 in.", quantity: "20", spec: "Lithonia WF6-LED-30K-MW-M6 - 6 in. LED wafer, 3000K, IC-rated — kitchen, bath, hallway", unitPrice: 24.00 },
    { item: "LED Recessed 4 in.", quantity: "8", spec: "Lithonia WF4-LED-30K-MW-M6 - 4 in. LED wafer, 3000K — closets, pantry", unitPrice: 18.00 },
    { item: "LED Flush Mount", quantity: "4", spec: "Lithonia FMML-13-840-M4 - 13 in. LED flush mount — bedrooms, utility room", unitPrice: 28.00 },
    { item: "Ceiling Fan 52 in.", quantity: "3", spec: "Hunter 53237 - 52 in. ceiling fan with light kit — living, master, covered patio", unitPrice: 125.00 },
    { item: "Exterior Porch Light", quantity: "2", spec: "Kichler 49924BKT - outdoor wall lantern, dark sky compliant — front + rear entry", unitPrice: 55.00 },
    { item: "LED Flood Light", quantity: "2", spec: "RAB FFLED18 - 18W LED flood, 5000K, dusk-to-dawn photocell — garage/driveway security", unitPrice: 65.00 },
    { item: "Bath Vanity Light", quantity: "2", spec: "Sea Gull 4428803-962 - 3-light bath vanity, brushed nickel — master + guest bath", unitPrice: 55.00 },
    { item: "Under-Cabinet LED", quantity: "2", spec: "GE 38846 - 24 in. LED under-cabinet, 3000K, hardwired — kitchen counter task lighting", unitPrice: 32.00 },
    // ── Bath Fans ───────────────────────────────────────────────
    { item: "Bath Exhaust Fan", quantity: "2", spec: "Broan-NuTone AE80BF - 80 CFM, ENERGY STAR — master + guest bath", unitPrice: 65.00 },
    // ── Smoke/CO ────────────────────────────────────────────────
    { item: "Smoke/CO Combo Detector", quantity: "5", spec: "Kidde i12010SCO - hardwired combo, 120V + battery backup, interconnectable — 3 bedrooms + hallway + living", unitPrice: 38.00 },
    // ── Appliance Connections ────────────────────────────────────
    { item: "Dishwasher Power Cord", quantity: "1", spec: "Eastman 61313 - dishwasher cord, 6 ft, 3-prong", unitPrice: 12.00 },
    { item: "Disposal Power Cord", quantity: "1", spec: "Eastman 61315 - disposal cord, 3 ft, 3-prong", unitPrice: 10.00 },
    { item: "Range Hood", quantity: "1", spec: "Broan-NuTone 413004 - 30 in. under-cabinet range hood, white, 120V", unitPrice: 65.00 },
    // ── Testing ─────────────────────────────────────────────────
    { item: "Receptacle Tester", quantity: "1", spec: "Klein RT210 - GFCI tester with LCD — test every outlet", unitPrice: 28.00 },
    // ── Misc ────────────────────────────────────────────────────
    { item: "Panel Directory Label Kit", quantity: "1", spec: "Brady 95543 - panel directory label kit", unitPrice: 12.00 },
    { item: "Wire Nuts (assorted)", quantity: "1 box", spec: "Ideal 30-074 - Twister assortment, 100-count", unitPrice: 18.00 },
    { item: "Electrical Tape", quantity: "6", spec: "3M 1700 - Temflex vinyl, 3/4 in. x 60 ft", unitPrice: 2.50 },
  ],
  blueprintNotes: [
    "Install ALL devices before calling for final inspection — no open boxes",
    "Tamper-resistant (TR) receptacles required everywhere in dwelling unit — NEC 406.12",
    "AFCI breakers: install in panel for all 120V bedroom/living/hallway/closet circuits",
    "GFCI: use breaker or device type — choose one method per circuit, don't double-protect",
    "Ceiling fans: verify fan-rated box, use proper hanging hardware, test all speeds",
    "Smoke/CO: test interconnection — activate one, all must alarm throughout house",
    "Fixture and device counts are for typical 3BR/2BA 2,000 sq ft — adjust per actual plan",
    "Builder may specify different fixture styles — adjust lighting selections per spec sheet",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
