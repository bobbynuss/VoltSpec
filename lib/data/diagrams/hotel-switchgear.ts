export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">HOTEL — PHASE 2: MAIN SWITCHGEAR &amp; DISTRIBUTION</text>

  <!-- Utility -->
  <rect x="120" y="45" width="100" height="30" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="63" text-anchor="middle" fill="#facc15" font-size="8" font-weight="bold">UTILITY XFMR</text>

  <line x1="170" y1="75" x2="170" y2="95" stroke="#f59e0b" stroke-width="2"/>

  <!-- Main Switchgear -->
  <rect x="90" y="95" width="160" height="40" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="115" text-anchor="middle" fill="#facc15" font-size="9" font-weight="bold">MAIN SWITCHGEAR</text>
  <text x="170" y="128" text-anchor="middle" fill="#94a3b8" font-size="6">2000-3000A · 480/277V 3Ø or 120/208V 3Ø</text>

  <!-- ATS -->
  <line x1="170" y1="135" x2="170" y2="155" stroke="#f59e0b" stroke-width="2"/>
  <rect x="105" y="155" width="130" height="35" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
  <text x="170" y="172" text-anchor="middle" fill="#ef4444" font-size="8" font-weight="bold">ATS</text>
  <text x="170" y="183" text-anchor="middle" fill="#94a3b8" font-size="6">Automatic Transfer Switch</text>

  <!-- Generator -->
  <rect x="255" y="155" width="70" height="35" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1"/>
  <text x="290" y="172" text-anchor="middle" fill="#ef4444" font-size="7" font-weight="bold">GENERATOR</text>
  <text x="290" y="183" text-anchor="middle" fill="#64748b" font-size="5">Emergency/Standby</text>
  <line x1="255" y1="172" x2="235" y2="172" stroke="#ef4444" stroke-width="1.5"/>

  <!-- Distribution branches -->
  <line x1="120" y1="190" x2="60" y2="230" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="155" y1="190" x2="140" y2="230" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="185" y1="190" x2="210" y2="230" stroke="#ef4444" stroke-width="1.5"/>
  <line x1="220" y1="190" x2="280" y2="230" stroke="#ef4444" stroke-width="1.5"/>

  <!-- Normal distribution -->
  <rect x="20" y="230" width="80" height="35" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="60" y="248" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="bold">NORMAL</text>
  <text x="60" y="258" text-anchor="middle" fill="#64748b" font-size="5">Guest rooms · HVAC</text>

  <rect x="100" y="230" width="80" height="35" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="140" y="248" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="bold">MECHANICAL</text>
  <text x="140" y="258" text-anchor="middle" fill="#64748b" font-size="5">Chillers · Boilers</text>

  <!-- Emergency distribution -->
  <rect x="180" y="230" width="70" height="35" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1"/>
  <text x="215" y="248" text-anchor="middle" fill="#ef4444" font-size="7" font-weight="bold">EMERGENCY</text>
  <text x="215" y="258" text-anchor="middle" fill="#64748b" font-size="5">Egress · Fire alarm</text>

  <rect x="255" y="230" width="70" height="35" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1"/>
  <text x="290" y="248" text-anchor="middle" fill="#ef4444" font-size="7" font-weight="bold">STANDBY</text>
  <text x="290" y="258" text-anchor="middle" fill="#64748b" font-size="5">Elevator · Kitchen</text>

  <!-- Notes -->
  <text x="170" y="300" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">KEY LOADS</text>
  <rect x="30" y="310" width="280" height="130" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="45" y="328" fill="#f59e0b" font-size="6">NORMAL (utility only):</text>
  <text x="55" y="340" fill="#64748b" font-size="6">• Guest room floors · HVAC/chiller plant · Laundry · Kitchen cooking</text>
  <text x="45" y="358" fill="#ef4444" font-size="6">EMERGENCY (NEC 700 — 10 sec transfer):</text>
  <text x="55" y="370" fill="#64748b" font-size="6">• Egress lighting · Exit signs · Fire alarm · Fire pump</text>
  <text x="45" y="388" fill="#ef4444" font-size="6">LEGALLY REQUIRED STANDBY (NEC 701 — 60 sec):</text>
  <text x="55" y="400" fill="#64748b" font-size="6">• Elevators · Smoke control · Kitchen hoods · Sump pumps</text>
  <text x="45" y="418" fill="#94a3b8" font-size="6">OPTIONAL STANDBY (NEC 702):</text>
  <text x="55" y="430" fill="#64748b" font-size="6">• POS systems · Security · Select guest room circuits · Refrigeration</text>

  <text x="170" y="470" text-anchor="middle" fill="#475569" font-size="6">HOTEL BUILD-OUT — PHASE 2 OF 7</text>
</svg>`;
