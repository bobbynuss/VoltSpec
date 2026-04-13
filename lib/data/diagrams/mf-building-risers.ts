export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">MULTIFAMILY — PHASE 3: BUILDING RISERS &amp; HOUSE PANELS</text>

  <!-- Building MDP at bottom -->
  <rect x="130" y="580" width="80" height="35" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="598" text-anchor="middle" fill="#facc15" font-size="8" font-weight="bold">BUILDING MDP</text>
  <text x="170" y="608" text-anchor="middle" fill="#94a3b8" font-size="6">400A 120/208V 3Ø</text>

  <!-- Vertical riser -->
  <rect x="167" y="100" width="6" height="480" rx="1" fill="#f59e0b" opacity="0.3"/>
  <text x="155" y="340" text-anchor="end" fill="#f59e0b" font-size="7" transform="rotate(-90,155,340)">ELECTRICAL RISER — 4" EMT or BUSWAY</text>

  <!-- Floor taps -->
  <line x1="173" y1="140" x2="260" y2="140" stroke="#f59e0b" stroke-width="1"/>
  <rect x="260" y="130" width="55" height="20" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="287" y="143" text-anchor="middle" fill="#94a3b8" font-size="6">FLOOR 4</text>

  <line x1="173" y1="230" x2="260" y2="230" stroke="#f59e0b" stroke-width="1"/>
  <rect x="260" y="220" width="55" height="20" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="287" y="233" text-anchor="middle" fill="#94a3b8" font-size="6">FLOOR 3</text>

  <line x1="173" y1="320" x2="260" y2="320" stroke="#f59e0b" stroke-width="1"/>
  <rect x="260" y="310" width="55" height="20" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="287" y="323" text-anchor="middle" fill="#94a3b8" font-size="6">FLOOR 2</text>

  <line x1="173" y1="410" x2="260" y2="410" stroke="#f59e0b" stroke-width="1"/>
  <rect x="260" y="400" width="55" height="20" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="287" y="413" text-anchor="middle" fill="#94a3b8" font-size="6">FLOOR 1</text>

  <!-- House panels on left side -->
  <line x1="173" y1="140" x2="100" y2="140" stroke="#22c55e" stroke-width="1"/>
  <rect x="25" y="125" width="75" height="30" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="62" y="140" text-anchor="middle" fill="#22c55e" font-size="6">HOUSE PANEL</text>
  <text x="62" y="149" text-anchor="middle" fill="#64748b" font-size="5">Hallway · Elevator</text>

  <line x1="173" y1="320" x2="100" y2="320" stroke="#22c55e" stroke-width="1"/>
  <rect x="25" y="305" width="75" height="30" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="62" y="320" text-anchor="middle" fill="#22c55e" font-size="6">HOUSE PANEL</text>
  <text x="62" y="329" text-anchor="middle" fill="#64748b" font-size="5">Common · Laundry</text>

  <line x1="173" y1="500" x2="100" y2="500" stroke="#22c55e" stroke-width="1"/>
  <rect x="25" y="485" width="75" height="30" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="62" y="500" text-anchor="middle" fill="#22c55e" font-size="6">HOUSE PANEL</text>
  <text x="62" y="509" text-anchor="middle" fill="#64748b" font-size="5">Lobby · Mechanical</text>

  <!-- Floor detail -->
  <text x="170" y="50" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">PER-FLOOR ELECTRICAL CLOSET</text>
  <rect x="40" y="58" width="260" height="50" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="55" y="74" fill="#f59e0b" font-size="6">● Riser tap → floor panel (per floor)</text>
  <text x="55" y="86" fill="#22c55e" font-size="6">● House panel feeds: hallway lights, elevator, fire alarm</text>
  <text x="55" y="98" fill="#94a3b8" font-size="6">● Telecom/data riser stub-out (coordinate w/ low-voltage)</text>

  <text x="170" y="650" text-anchor="middle" fill="#475569" font-size="6">SCALE PER BUILDING — ADJUST FLOORS, RISER SIZE, HOUSE PANEL COUNT</text>
  <text x="170" y="665" text-anchor="middle" fill="#475569" font-size="6">MULTIFAMILY BUILD-OUT — PHASE 3 OF 7</text>
</svg>`;
