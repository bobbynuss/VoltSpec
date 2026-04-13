export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">MULTIFAMILY — PHASE 6: COMMON AREAS &amp; LIFE SAFETY</text>

  <!-- House Panel -->
  <rect x="120" y="45" width="100" height="30" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="63" text-anchor="middle" fill="#facc15" font-size="8" font-weight="bold">HOUSE PANEL</text>

  <!-- Branches fan out -->
  <line x1="120" y1="75" x2="55" y2="120" stroke="#f59e0b" stroke-width="1"/>
  <line x1="155" y1="75" x2="130" y2="120" stroke="#ef4444" stroke-width="1"/>
  <line x1="185" y1="75" x2="210" y2="120" stroke="#22c55e" stroke-width="1"/>
  <line x1="220" y1="75" x2="285" y2="120" stroke="#3b82f6" stroke-width="1"/>

  <!-- Emergency Lighting -->
  <rect x="20" y="120" width="70" height="45" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
  <text x="55" y="138" text-anchor="middle" fill="#ef4444" font-size="7" font-weight="bold">EMERGENCY</text>
  <text x="55" y="150" text-anchor="middle" fill="#ef4444" font-size="7" font-weight="bold">LIGHTING</text>
  <text x="55" y="160" text-anchor="middle" fill="#64748b" font-size="5">Stairs · Egress</text>

  <!-- Fire Alarm -->
  <rect x="95" y="120" width="70" height="45" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1"/>
  <text x="130" y="138" text-anchor="middle" fill="#ef4444" font-size="7" font-weight="bold">FIRE ALARM</text>
  <text x="130" y="150" text-anchor="middle" fill="#ef4444" font-size="7">FACP</text>
  <text x="130" y="160" text-anchor="middle" fill="#64748b" font-size="5">Dedicated ckt</text>

  <!-- Hallway/Lobby Lighting -->
  <rect x="175" y="120" width="70" height="45" rx="3" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="210" y="138" text-anchor="middle" fill="#22c55e" font-size="7" font-weight="bold">HALLWAY</text>
  <text x="210" y="150" text-anchor="middle" fill="#22c55e" font-size="7" font-weight="bold">LIGHTING</text>
  <text x="210" y="160" text-anchor="middle" fill="#64748b" font-size="5">LED · Occ sensors</text>

  <!-- Parking Garage -->
  <rect x="250" y="120" width="70" height="45" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
  <text x="285" y="138" text-anchor="middle" fill="#3b82f6" font-size="7" font-weight="bold">PARKING</text>
  <text x="285" y="150" text-anchor="middle" fill="#3b82f6" font-size="7" font-weight="bold">GARAGE</text>
  <text x="285" y="160" text-anchor="middle" fill="#64748b" font-size="5">Lights · Fans</text>

  <!-- Exit signs row -->
  <text x="170" y="195" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">LIFE SAFETY DEVICES</text>
  <rect x="30" y="205" width="280" height="70" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>

  <rect x="50" y="215" width="40" height="20" rx="2" fill="none" stroke="#ef4444" stroke-width="1"/>
  <text x="70" y="228" text-anchor="middle" fill="#ef4444" font-size="6">EXIT</text>
  <text x="70" y="245" text-anchor="middle" fill="#64748b" font-size="5">LED combo</text>

  <rect x="110" y="215" width="40" height="20" rx="2" fill="none" stroke="#ef4444" stroke-width="1"/>
  <text x="130" y="228" text-anchor="middle" fill="#ef4444" font-size="5">EMERG</text>
  <text x="130" y="245" text-anchor="middle" fill="#64748b" font-size="5">Bug-eye</text>

  <rect x="170" y="215" width="40" height="20" rx="2" fill="none" stroke="#f59e0b" stroke-width="1"/>
  <text x="190" y="228" text-anchor="middle" fill="#f59e0b" font-size="5">SMOKE</text>
  <text x="190" y="245" text-anchor="middle" fill="#64748b" font-size="5">Detector</text>

  <rect x="230" y="215" width="40" height="20" rx="2" fill="none" stroke="#f59e0b" stroke-width="1"/>
  <text x="250" y="228" text-anchor="middle" fill="#f59e0b" font-size="5">PULL</text>
  <text x="250" y="245" text-anchor="middle" fill="#64748b" font-size="5">Station</text>

  <text x="170" y="268" text-anchor="middle" fill="#64748b" font-size="5">All on dedicated emergency/fire alarm circuits · Battery backup where required</text>

  <!-- Parking Garage Detail -->
  <text x="170" y="300" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">PARKING GARAGE LIGHTING</text>
  <rect x="30" y="310" width="280" height="60" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="45" y="328" fill="#3b82f6" font-size="6">● LED strip/wrap fixtures — parking levels, drive aisles</text>
  <text x="45" y="340" fill="#3b82f6" font-size="6">● Occupancy sensors — reduce to 50% when unoccupied (energy code)</text>
  <text x="45" y="352" fill="#3b82f6" font-size="6">● CO sensors + exhaust fans — enclosed garage ventilation per IMC</text>
  <text x="45" y="364" fill="#3b82f6" font-size="6">● Emergency lighting on battery or generator circuit</text>

  <!-- Elevator + Mechanical -->
  <text x="170" y="400" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">ADDITIONAL COMMON AREA LOADS</text>
  <rect x="30" y="410" width="280" height="80" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="45" y="428" fill="#f59e0b" font-size="6">● Elevator cab lighting + emergency phone circuit</text>
  <text x="45" y="440" fill="#f59e0b" font-size="6">● Lobby / leasing office — lighting, receptacles, HVAC</text>
  <text x="45" y="452" fill="#f59e0b" font-size="6">● Pool equipment — GFCI, bonding per NEC 680</text>
  <text x="45" y="464" fill="#f59e0b" font-size="6">● Fitness center — 20A circuits, dedicated HVAC</text>
  <text x="45" y="476" fill="#f59e0b" font-size="6">● Common laundry — dryer circuits (30A ea), washer receptacles</text>
  <text x="45" y="488" fill="#f59e0b" font-size="6">● Trash compactor, irrigation controller, gate operator</text>

  <text x="170" y="520" text-anchor="middle" fill="#475569" font-size="6">SCALE PER BUILDING — ADJUST FIXTURE COUNT, EXIT SIGNS, PARKING LEVELS</text>
  <text x="170" y="535" text-anchor="middle" fill="#475569" font-size="6">MULTIFAMILY BUILD-OUT — PHASE 6 OF 7</text>
</svg>`;
