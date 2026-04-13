export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">HOTEL — PHASE 5: GUEST ROOM PANELS &amp; LOW-VOLTAGE</text>

  <!-- Floor panel -->
  <rect x="120" y="45" width="100" height="30" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="170" y="63" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="bold">FLOOR PANEL</text>

  <!-- Room circuits fan out -->
  <line x1="130" y1="75" x2="55" y2="120" stroke="#f59e0b" stroke-width="1"/>
  <line x1="155" y1="75" x2="120" y2="120" stroke="#f59e0b" stroke-width="1"/>
  <line x1="185" y1="75" x2="220" y2="120" stroke="#f59e0b" stroke-width="1"/>
  <line x1="210" y1="75" x2="285" y2="120" stroke="#f59e0b" stroke-width="1"/>

  <!-- Room groups -->
  <rect x="20" y="120" width="70" height="35" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="55" y="137" text-anchor="middle" fill="#94a3b8" font-size="6">ROOMS 501-504</text>
  <text x="55" y="148" text-anchor="middle" fill="#64748b" font-size="5">PTAC + Recep + Ltg</text>

  <rect x="95" y="120" width="70" height="35" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="130" y="137" text-anchor="middle" fill="#94a3b8" font-size="6">ROOMS 505-508</text>
  <text x="130" y="148" text-anchor="middle" fill="#64748b" font-size="5">PTAC + Recep + Ltg</text>

  <rect x="175" y="120" width="70" height="35" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="137" text-anchor="middle" fill="#94a3b8" font-size="6">ROOMS 509-512</text>
  <text x="210" y="148" text-anchor="middle" fill="#64748b" font-size="5">PTAC + Recep + Ltg</text>

  <rect x="250" y="120" width="70" height="35" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="137" text-anchor="middle" fill="#94a3b8" font-size="6">CORRIDOR</text>
  <text x="285" y="148" text-anchor="middle" fill="#64748b" font-size="5">Ltg + Emerg + FA</text>

  <!-- Panel schedule -->
  <text x="170" y="185" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">TYPICAL FLOOR PANEL SCHEDULE</text>
  <rect x="30" y="195" width="280" height="170" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>

  <text x="48" y="213" fill="#f59e0b" font-size="6" font-weight="bold">CKT</text>
  <text x="95" y="213" fill="#f59e0b" font-size="6" font-weight="bold">LOAD</text>
  <text x="240" y="213" fill="#f59e0b" font-size="6" font-weight="bold">BREAKER</text>

  <text x="48" y="228" fill="#94a3b8" font-size="6">1,3</text>
  <text x="95" y="228" fill="#94a3b8" font-size="6">PTAC Rm 501 (240V dedicated)</text>
  <text x="240" y="228" fill="#94a3b8" font-size="6">2P 30A</text>
  <text x="48" y="241" fill="#94a3b8" font-size="6">5,7</text>
  <text x="95" y="241" fill="#94a3b8" font-size="6">PTAC Rm 502 (240V dedicated)</text>
  <text x="240" y="241" fill="#94a3b8" font-size="6">2P 30A</text>
  <text x="48" y="254" fill="#94a3b8" font-size="6">9</text>
  <text x="95" y="254" fill="#94a3b8" font-size="6">Rm 501-502 receptacles</text>
  <text x="240" y="254" fill="#94a3b8" font-size="6">20A</text>
  <text x="48" y="267" fill="#94a3b8" font-size="6">11</text>
  <text x="95" y="267" fill="#94a3b8" font-size="6">Rm 501-502 lighting</text>
  <text x="240" y="267" fill="#94a3b8" font-size="6">15A</text>
  <text x="48" y="280" fill="#94a3b8" font-size="6">13</text>
  <text x="95" y="280" fill="#94a3b8" font-size="6">Rm 501-502 bath GFCI</text>
  <text x="240" y="280" fill="#94a3b8" font-size="6">20A GFCI</text>
  <text x="48" y="293" fill="#94a3b8" font-size="6">15</text>
  <text x="95" y="293" fill="#94a3b8" font-size="6">Rm 501-502 mini-fridge</text>
  <text x="240" y="293" fill="#94a3b8" font-size="6">20A</text>
  <text x="48" y="306" fill="#94a3b8" font-size="6">...</text>
  <text x="95" y="306" fill="#94a3b8" font-size="6">(repeat for each room pair)</text>
  <text x="48" y="325" fill="#ef4444" font-size="6">39</text>
  <text x="95" y="325" fill="#ef4444" font-size="6">Corridor egress lighting (emergency)</text>
  <text x="240" y="325" fill="#ef4444" font-size="6">15A</text>
  <text x="48" y="338" fill="#ef4444" font-size="6">41</text>
  <text x="95" y="338" fill="#ef4444" font-size="6">Fire alarm NAC devices</text>
  <text x="240" y="338" fill="#ef4444" font-size="6">20A</text>
  <text x="48" y="355" fill="#64748b" font-size="5">42-space panel: ~12 rooms per floor panel typical</text>

  <!-- Low-voltage -->
  <text x="170" y="395" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">LOW-VOLTAGE (PER ROOM)</text>
  <rect x="30" y="405" width="280" height="70" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="45" y="423" fill="#3b82f6" font-size="6">● Cat6A data drop — desk + TV wall (2 per room)</text>
  <text x="45" y="435" fill="#3b82f6" font-size="6">● RG6 coax — TV wall (1 per room)</text>
  <text x="45" y="447" fill="#3b82f6" font-size="6">● Card reader / door lock — 18/2 low-voltage to lock</text>
  <text x="45" y="459" fill="#3b82f6" font-size="6">● Thermostat wire — 18/8 to PTAC/fan coil thermostat</text>
  <text x="45" y="471" fill="#3b82f6" font-size="6">● All pulled through EMT stubs from Phase 4 rough-in</text>

  <text x="170" y="510" text-anchor="middle" fill="#475569" font-size="6">HOTEL BUILD-OUT — PHASE 5 OF 7</text>
</svg>`;
