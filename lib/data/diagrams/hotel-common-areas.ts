export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">HOTEL — PHASE 6: COMMON AREAS &amp; LIFE SAFETY</text>

  <!-- Main distribution -->
  <rect x="120" y="42" width="100" height="25" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="7" font-weight="bold">MAIN SWITCHGEAR</text>

  <!-- Area branches -->
  <line x1="130" y1="67" x2="55" y2="105" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="155" y1="67" x2="120" y2="105" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="185" y1="67" x2="220" y2="105" stroke="#ef4444" stroke-width="1.5"/>
  <line x1="210" y1="67" x2="285" y2="105" stroke="#3b82f6" stroke-width="1.5"/>

  <!-- Lobby -->
  <rect x="15" y="105" width="80" height="40" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="55" y="122" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="bold">LOBBY</text>
  <text x="55" y="134" text-anchor="middle" fill="#64748b" font-size="5">Front desk · Lighting</text>

  <!-- Kitchen / BOH -->
  <rect x="100" y="105" width="70" height="40" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="135" y="122" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="bold">KITCHEN</text>
  <text x="135" y="134" text-anchor="middle" fill="#64748b" font-size="5">BOH · Laundry</text>

  <!-- Life Safety -->
  <rect x="185" y="105" width="70" height="40" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1"/>
  <text x="220" y="122" text-anchor="middle" fill="#ef4444" font-size="7" font-weight="bold">LIFE SAFETY</text>
  <text x="220" y="134" text-anchor="middle" fill="#64748b" font-size="5">Fire alarm · Egress</text>

  <!-- Pool / Fitness -->
  <rect x="260" y="105" width="60" height="40" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
  <text x="290" y="122" text-anchor="middle" fill="#3b82f6" font-size="7" font-weight="bold">AMENITY</text>
  <text x="290" y="134" text-anchor="middle" fill="#64748b" font-size="5">Pool · Fitness</text>

  <!-- Lobby detail -->
  <text x="170" y="170" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">LOBBY &amp; FRONT-OF-HOUSE</text>
  <rect x="30" y="178" width="280" height="60" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="45" y="196" fill="#f59e0b" font-size="6">● Lobby decorative lighting — dimming, scenes, chandelier circuits</text>
  <text x="45" y="208" fill="#f59e0b" font-size="6">● Front desk — POS, computers, printer, 20A dedicated circuits</text>
  <text x="45" y="220" fill="#f59e0b" font-size="6">● Conference/meeting rooms — receptacles, AV power, lighting control</text>
  <text x="45" y="232" fill="#f59e0b" font-size="6">● Business center, vending, ice machines — 20A dedicated each</text>

  <!-- Kitchen detail -->
  <text x="170" y="260" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">KITCHEN / BACK-OF-HOUSE</text>
  <rect x="30" y="268" width="280" height="70" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="45" y="286" fill="#f59e0b" font-size="6">● Commercial kitchen — hood, walk-in cooler/freezer, ovens, dishwasher</text>
  <text x="45" y="298" fill="#f59e0b" font-size="6">● Laundry — commercial washers/dryers (30-50A per unit)</text>
  <text x="45" y="310" fill="#f59e0b" font-size="6">● Mechanical room — boilers, AHU, pumps per mechanical engineer</text>
  <text x="45" y="322" fill="#f59e0b" font-size="6">● Loading dock, maintenance, housekeeping — general power + lighting</text>
  <text x="45" y="334" fill="#f59e0b" font-size="6">● EV charging stations — Level 2, 40-80A per station, parking garage</text>

  <!-- Life Safety -->
  <text x="170" y="362" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">LIFE SAFETY SYSTEMS</text>
  <rect x="30" y="370" width="280" height="70" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="45" y="388" fill="#ef4444" font-size="6">● Fire alarm: FACP, pull stations, smoke detectors, horn/strobes (all floors)</text>
  <text x="45" y="400" fill="#ef4444" font-size="6">● Emergency lighting: exit signs, bug-eyes, egress path lighting</text>
  <text x="45" y="412" fill="#ef4444" font-size="6">● Fire pump (if required): dedicated feeder from ATS per NEC 695</text>
  <text x="45" y="424" fill="#ef4444" font-size="6">● Elevator emergency power: cab lighting, phone, car-top disconnect</text>
  <text x="45" y="436" fill="#ef4444" font-size="6">● Stairwell pressurization fans (high-rise): emergency circuit</text>

  <!-- Amenity -->
  <text x="170" y="462" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">AMENITY AREAS</text>
  <rect x="30" y="470" width="280" height="50" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="45" y="488" fill="#3b82f6" font-size="6">● Pool: GFCI all 120V within 20 ft, bonding per NEC 680, pump panel</text>
  <text x="45" y="500" fill="#3b82f6" font-size="6">● Fitness center: 20A circuits per treadmill row, TV/AV, HVAC dedicated</text>
  <text x="45" y="512" fill="#3b82f6" font-size="6">● Spa/hot tub: GFCI, dedicated 50A circuit, bonding per NEC 680</text>

  <text x="170" y="545" text-anchor="middle" fill="#475569" font-size="6">HOTEL BUILD-OUT — PHASE 6 OF 7</text>
</svg>`;
