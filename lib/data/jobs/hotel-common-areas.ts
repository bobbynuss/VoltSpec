import type { Job } from "../types";
import { diagram } from "../diagrams/hotel-common-areas";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "hotel-common-areas",
  label: "Hotel Build-Out – Phase 6: Common Areas & Life Safety",
  requirements: [
    "NEC 2026 Art. 700: Emergency systems — separate wiring, ATS, 10-second transfer for egress and fire alarm",
    "NEC 2026 Art. 701: Legally required standby — elevators, smoke control, kitchen hoods, 60-second transfer",
    "NEC 2026 Art. 760: Fire alarm — dedicated circuit, non-switchable, lock-on device, FPLP/FPLR cable",
    "NEC 2026 Art. 695: Fire pumps — dedicated feeder, specific disconnect requirements (if applicable)",
    "NEC 2026 Art. 680: Pools, spas — GFCI, bonding, equipment clearances, rated enclosures",
    "NEC 2026 Art. 210.70: Lighting outlets at stairs, hallways, entrances, and egress paths",
    "NEC 2026 Art. 220: Commercial kitchen load calculations — specific demand factors per NEC Table 220.56",
    "NEC 2026 Art. 625: EV charging — dedicated circuits, GFCI on cord-and-plug connected EVSE",
    "NFPA 72: Fire alarm system — addressable preferred, full floor/room coverage",
    "IBC Ch. 10: Egress lighting minimum 1 fc, emergency duration 90 minutes minimum",
    "Commercial kitchen: coordinate with kitchen equipment vendor for exact electrical requirements per unit",
    "Permit: fire alarm permit (separate), commercial kitchen electrical, pool/spa electrical inspection",
  ],
  materials: [
    // ── Lobby / Front-of-House ──────────────────────────────────
    { item: "Lobby Lighting Panel 200A", quantity: "1", spec: "Eaton CHP30L200F — 30-space 200A CH main lug panel, lobby and front-of-house lighting/receptacle distribution", unitPrice: 385.00 },
    { item: "Dimming Panel (lobby)", quantity: "1", spec: "Lutron QSG-4P — 4-zone Grafik Eye dimming panel for lobby decorative lighting scenes", unitPrice: 1200.00 },
    { item: "1-Pole 20A Breaker", quantity: "12", spec: "Eaton CHF120 — CH 1-pole 20A, front desk POS, conference rooms, business center", unitPrice: 8.50 },
    { item: "1-Pole 15A Breaker", quantity: "8", spec: "Eaton CHF115 — CH 1-pole 15A, lobby lighting circuits", unitPrice: 8.50 },
    // ── Kitchen / BOH ───────────────────────────────────────────
    { item: "Kitchen Panel 400A", quantity: "1", spec: "Eaton PRL1A-400 — 400A 120/208V 3-phase panelboard, 42-space — commercial kitchen distribution", unitPrice: 2200.00 },
    { item: "Walk-In Cooler Disconnect", quantity: "1", spec: "Eaton DH362FRK — 60A 600V 3-pole fused safety switch, within sight of walk-in compressor", unitPrice: 185.00 },
    { item: "Walk-In Freezer Disconnect", quantity: "1", spec: "Eaton DH362FRK — 60A 600V 3-pole fused safety switch, within sight of freezer compressor", unitPrice: 185.00 },
    { item: "Commercial Dishwasher Circuit", quantity: "1", spec: "Eaton CHF260 — CH 2-pole 60A breaker, commercial dishwasher — verify nameplate", unitPrice: 35.00 },
    // ── Laundry ─────────────────────────────────────────────────
    { item: "Laundry Panel 200A", quantity: "1", spec: "Eaton CHP30B200F — 30-space 200A CH main breaker panel — commercial laundry room", unitPrice: 385.00 },
    { item: "2-Pole 50A Breaker (dryer)", quantity: "per plan", spec: "Eaton CHF250 — CH 2-pole 50A, commercial dryer circuits (1 per dryer)", unitPrice: 23.73 },
    { item: "1-Pole 20A Breaker (washer)", quantity: "per plan", spec: "Eaton CHF120 — CH 1-pole 20A, commercial washer circuits", unitPrice: 8.50 },
    // ── Life Safety ─────────────────────────────────────────────
    { item: "Fire Alarm Control Panel", quantity: "1", spec: "Notifier NFS2-3030 — addressable FACP, expandable, NFPA 72 — coordinate with fire alarm contractor", unitPrice: 2800.00 },
    { item: "Smoke Detector (addressable)", quantity: "per plan", spec: "Notifier FSP-851 — intelligent photoelectric smoke, common areas + corridors", unitPrice: 42.00 },
    { item: "Pull Station", quantity: "per plan", spec: "Notifier NBG-12LX — addressable manual pull station, at exits and stairways", unitPrice: 55.00 },
    { item: "Horn/Strobe", quantity: "per plan", spec: "Notifier P2R-SP — wall-mount horn/strobe, corridors and common areas per NFPA 72 spacing", unitPrice: 68.00 },
    { item: "LED Exit/Emergency Combo", quantity: "per plan", spec: "Lithonia LHQM-LED-R-M6 — exit sign with emergency lights, 90-min battery", unitPrice: 65.00 },
    { item: "LED Emergency Bug-Eye", quantity: "per plan", spec: "Lithonia ELM2-LED-M12 — dual-head emergency light, 90-min battery", unitPrice: 42.00 },
    // ── Pool / Amenity ──────────────────────────────────────────
    { item: "Pool Sub-Panel 100A", quantity: "1", spec: "Eaton CHP20L100R — 20-space 100A outdoor panel, NEMA 3R — pool/spa equipment", unitPrice: 285.00 },
    { item: "2-Pole 50A GFCI Breaker (pool pump)", quantity: "1", spec: "Eaton CHF250GF — CH 2-pole 50A GFCI, pool pump motor per NEC 680", unitPrice: 165.00 },
    { item: "2-Pole 50A Breaker (spa/hot tub)", quantity: "1", spec: "Eaton CHF250 — CH 2-pole 50A, spa/hot tub heater circuit with GFCI disconnect", unitPrice: 23.73 },
    // ── EV Charging ─────────────────────────────────────────────
    { item: "EV Charging Circuit Breaker 50A", quantity: "per plan", spec: "Eaton CHF250 — CH 2-pole 50A, Level 2 EV charging station circuit — one per EVSE", unitPrice: 23.73 },
    // ── Wiring ──────────────────────────────────────────────────
    { item: "12/2 MC Cable", quantity: "per plan (ft)", spec: "Southwire MC 12/2 — 12 AWG MC cable, common area circuits, sold per ft" },
    { item: "Fire Alarm Cable (16/2 FPLP)", quantity: "per plan (ft)", spec: "West Penn 60021B — 16/2 plenum fire alarm cable, FPLP, shielded, sold per ft" },
    // ── Misc ────────────────────────────────────────────────────
    { item: "4-Square Box Deep", quantity: "per plan", spec: "Crouse-Hinds TP403 — 4 in. square deep box", unitPrice: 4.44 },
    { item: "Panel Directory Label Kit", quantity: "per panel", spec: "Brady 95543 — panel directory label kit", unitPrice: 12.00 },
  ],
  blueprintNotes: [
    "Commercial kitchen: get equipment schedule from vendor — exact electrical per each piece of equipment",
    "Kitchen hood: on legally required standby circuit — if power fails during cooking, fire suppression still works",
    "Pool: full NEC 680 compliance — GFCI, bonding grid, equipment clearances, coordinate with pool contractor",
    "Laundry: industrial washers/dryers have higher loads than residential — verify nameplate amps",
    "Fire alarm: coordinate with fire alarm contractor early — device layout drives conduit/cable routing",
    "EV charging: future-proof with spare conduit/panel capacity — demand will increase",
    "Lobby lighting: dimming control for ambiance — coordinate scenes with interior designer",
    "Emergency vs. standby: understand which loads go on which system — NEC 700 vs 701 vs 702",
    "Elevator: verify feeder sizing with elevator contractor — traction vs. hydraulic have different loads",
    "Scale all quantities to actual hotel design — room count, amenity package, F&B scope",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
