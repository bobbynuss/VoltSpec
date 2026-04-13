import type { Job } from "../types";
import { diagram } from "../diagrams/mf-common-areas";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "mf-common-areas",
  label: "Multifamily Build-Out – Phase 6: Common Areas & Life Safety",
  requirements: [
    "NEC 2026 Art. 700: Emergency systems — separate wiring, transfer equipment, and power source for emergency loads",
    "NEC 2026 Art. 700.12: Emergency power source — battery, generator, or approved system, 10-second transfer for egress lighting",
    "NEC 2026 Art. 701: Legally required standby systems — elevator, fire pump, smoke control where required",
    "NEC 2026 Art. 760: Fire alarm systems — dedicated circuit, identified at panel, non-switchable, with lock-on device",
    "NEC 2026 Art. 210.70: Lighting outlets — required at stairs, hallways, entrances, and egress paths",
    "NEC 2026 Art. 680: Swimming pools, spas — GFCI, bonding, clearances, equipment ratings per article",
    "NEC 2026 Art. 410.16: Luminaire clearances — recessed fixtures in insulated spaces require IC-rated housings",
    "IBC Ch. 10: Means of egress lighting — minimum 1 fc at floor level, emergency lighting for 90 minutes minimum",
    "NFPA 72: Fire alarm system — addressable or conventional per AHJ, pull stations, smoke detectors, horn/strobes",
    "NFPA 110: Generator systems — if emergency generator serves life safety loads",
    "Local energy code: parking garage lighting controls — occupancy sensors, daylight harvesting where applicable",
    "Permit: fire alarm permit (separate), electrical permit for common area circuits, fire marshal final inspection",
  ],
  materials: [
    // ── Emergency/Exit Lighting ─────────────────────────────────
    { item: "LED Exit/Emergency Combo", quantity: "per plan", spec: "Lithonia LHQM-LED-R-M6 — LED exit sign with dual-head emergency lights, red letters, 90-min battery, universal mount — stairs and egress paths", unitPrice: 65.00 },
    { item: "LED Emergency Bug-Eye", quantity: "per plan", spec: "Lithonia ELM2-LED-M12 — LED dual-head emergency light, 90-min battery backup, white housing — corridors and common areas", unitPrice: 42.00 },
    { item: "Exit Sign (edge-lit)", quantity: "per plan", spec: "Lithonia EDGR-1-R-EL-M4 — LED edge-lit exit sign, red letters, recessed or surface mount, battery backup", unitPrice: 85.00 },
    // ── Hallway/Corridor Lighting ───────────────────────────────
    { item: "4 ft LED Strip/Wrap Fixture", quantity: "per plan", spec: "Lithonia FMLWL-48-840 — 4 ft LED wrap fixture, 4000K, 4000 lumens, surface mount — hallway and corridor lighting", unitPrice: 38.00 },
    { item: "LED Recessed Downlight 6 in.", quantity: "per plan", spec: "Lithonia WF6-LED-30K-MW-M6 — 6 in. LED recessed downlight, 3000K, IC-rated, wet location — lobby and common areas", unitPrice: 24.00 },
    { item: "Occupancy/Vacancy Sensor", quantity: "per plan", spec: "Eaton OS306U-W-K — occupancy sensor, wall-mount, 180° coverage, auto-on/auto-off — hallways, laundry, storage", unitPrice: 28.00 },
    // ── Parking Garage ──────────────────────────────────────────
    { item: "LED Vapor-Tight Fixture", quantity: "per plan", spec: "Lithonia GEMINI-LED-40K-80CRI — 4 ft LED vapor-tight fixture, 4000K, wet location, garage and covered parking", unitPrice: 52.00 },
    { item: "Parking Garage Occ Sensor", quantity: "per plan", spec: "Leviton?"/* placeholder: use Eaton or Leviton */ + "OSC20-M0W — ceiling mount occupancy sensor, high-bay rated, parking garage energy code compliance", unitPrice: 45.00 },
    { item: "CO Sensor", quantity: "per plan", spec: "Macurco CM-6 — carbon monoxide detector/transmitter, enclosed parking garage ventilation interlock per IMC", unitPrice: 165.00 },
    { item: "Garage Exhaust Fan", quantity: "per plan", spec: "Cook 135ACE — inline centrifugal exhaust fan, 1/3 HP, 115V, CO-sensor interlock, enclosed garage ventilation", unitPrice: 385.00 },
    // ── Fire Alarm (rough materials) ────────────────────────────
    { item: "Fire Alarm Control Panel (FACP)", quantity: "1 per bldg", spec: "Notifier NFS2-3030 — addressable fire alarm control panel, expandable, NFPA 72 compliant — coordinate with fire alarm contractor", unitPrice: 2800.00 },
    { item: "Smoke Detector (addressable)", quantity: "per plan", spec: "Notifier FSP-851 — intelligent photoelectric smoke detector, addressable, common area and hallway locations", unitPrice: 42.00 },
    { item: "Pull Station", quantity: "per plan", spec: "Notifier NBG-12LX — addressable manual pull station, red, single-action, at each exit and stairway", unitPrice: 55.00 },
    { item: "Horn/Strobe", quantity: "per plan", spec: "Notifier P2R-SP — wall-mount horn/strobe, 2-wire, red, 15/75 cd selectable, hallways and common areas per NFPA 72 spacing", unitPrice: 68.00 },
    { item: "Fire Alarm Circuit (dedicated)", quantity: "1 per bldg", spec: "Eaton CHFP120 + lock-on — CH 1-pole 20A breaker with handle lock-on device, dedicated FACP circuit per NEC 760", unitPrice: 14.50 },
    // ── Pool/Amenity (if applicable) ────────────────────────────
    { item: "Pool Sub-Panel 100A", quantity: "per plan", spec: "Eaton CHP20L100R — 20-space 100A CH outdoor panel, NEMA 3R, pool equipment panel", unitPrice: 285.00 },
    { item: "2-Pole 50A GFCI Breaker", quantity: "per plan", spec: "Eaton CHF250GF — CH 2-pole 50A GFCI breaker, pool pump motor per NEC 680.21(C)", unitPrice: 165.00 },
    // ── Wiring ──────────────────────────────────────────────────
    { item: "12/2 MC Cable", quantity: "per plan (ft)", spec: "Southwire MC 12/2 — 12 AWG 2-conductor + ground MC cable, common area lighting and receptacle circuits, sold per ft" },
    { item: "14/2 MC Cable", quantity: "per plan (ft)", spec: "Southwire MC 14/2 — 14 AWG 2-conductor + ground MC cable, 15A lighting circuits, sold per ft" },
    { item: "Fire Alarm Cable (16/2 FPLP)", quantity: "per plan (ft)", spec: "West Penn 60021B — 16/2 plenum-rated fire alarm cable, FPLP, shielded, red jacket — FACP to all devices, sold per ft" },
    // ── Boxes & Misc ────────────────────────────────────────────
    { item: "4-Square Box Deep", quantity: "per plan", spec: "Crouse-Hinds TP403 — 4 in. square 2-1/8 in. deep steel outlet box", unitPrice: 4.44 },
    { item: "4 in. Octagon Box", quantity: "per plan", spec: "Crouse-Hinds TP302 — 4 in. octagon ceiling box, light fixture locations", unitPrice: 3.25 },
    { item: "Fire Alarm Back Box", quantity: "per plan", spec: "Notifier BBS-2 — standard back box for horn/strobes, red, surface mount", unitPrice: 8.00 },
  ],
  blueprintNotes: [
    "Emergency lighting: 90-min battery backup minimum, 1 fc at floor level per IBC — test monthly, log results",
    "Exit signs: every floor at stairways, corridor direction changes, and at all exit discharges",
    "Fire alarm: coordinate with fire alarm contractor — FACP location, device layout, riser diagram per NFPA 72",
    "FACP circuit: dedicated, non-switchable, labeled, with lock-on device per NEC 760",
    "Parking garage: occupancy-controlled lighting per energy code, CO sensors per IMC in enclosed garages",
    "Pool: GFCI on all 120V within 20 ft, bonding grid per NEC 680, equipment clearances — coordinate with pool contractor",
    "Hallway lighting: consider occupancy sensors for energy code — auto-on in stairs, vacancy (manual-on) in storage",
    "Common laundry: 30A dryer circuits (one per dryer), 20A washer receptacles, adequate 20A general receptacle circuits",
    "Fire alarm cable: use FPLP (plenum) or FPLR (riser) rated per installation location — NEC 760",
    "Adjust all 'per plan' quantities to actual building floor plan, unit count, and amenity package",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
