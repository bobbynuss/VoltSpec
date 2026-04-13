export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">MULTIFAMILY — PHASE 5: UNIT PANELS &amp; METERING</text>

  <!-- Floor panel at top -->
  <rect x="120" y="45" width="100" height="30" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="170" y="63" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="bold">FLOOR PANEL</text>

  <!-- Meter bank -->
  <line x1="170" y1="75" x2="170" y2="100" stroke="#f59e0b" stroke-width="2"/>
  <rect x="70" y="100" width="200" height="45" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="118" text-anchor="middle" fill="#facc15" font-size="8" font-weight="bold">METER BANK / CT CABINET</text>
  <text x="170" y="130" text-anchor="middle" fill="#94a3b8" font-size="6">Utility metering — one meter per unit</text>
  <text x="170" y="140" text-anchor="middle" fill="#64748b" font-size="6">Typically located in electrical closet or corridor</text>

  <!-- Unit feeds fan out -->
  <line x1="100" y1="145" x2="60" y2="185" stroke="#f59e0b" stroke-width="1"/>
  <line x1="150" y1="145" x2="130" y2="185" stroke="#f59e0b" stroke-width="1"/>
  <line x1="190" y1="145" x2="210" y2="185" stroke="#f59e0b" stroke-width="1"/>
  <line x1="240" y1="145" x2="280" y2="185" stroke="#f59e0b" stroke-width="1"/>

  <!-- Unit panels -->
  <rect x="30" y="185" width="60" height="40" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="60" y="203" text-anchor="middle" fill="#94a3b8" font-size="7" font-weight="bold">UNIT A</text>
  <text x="60" y="215" text-anchor="middle" fill="#64748b" font-size="5">100A · 20-sp</text>

  <rect x="100" y="185" width="60" height="40" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="130" y="203" text-anchor="middle" fill="#94a3b8" font-size="7" font-weight="bold">UNIT B</text>
  <text x="130" y="215" text-anchor="middle" fill="#64748b" font-size="5">100A · 20-sp</text>

  <rect x="180" y="185" width="60" height="40" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="203" text-anchor="middle" fill="#94a3b8" font-size="7" font-weight="bold">UNIT C</text>
  <text x="210" y="215" text-anchor="middle" fill="#64748b" font-size="5">125A · 24-sp</text>

  <rect x="250" y="185" width="60" height="40" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="280" y="203" text-anchor="middle" fill="#94a3b8" font-size="7" font-weight="bold">UNIT D</text>
  <text x="280" y="215" text-anchor="middle" fill="#64748b" font-size="5">125A · 24-sp</text>

  <!-- Typical panel schedule -->
  <text x="170" y="255" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">TYPICAL UNIT PANEL SCHEDULE</text>
  <rect x="30" y="265" width="280" height="230" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>

  <text x="50" y="283" fill="#f59e0b" font-size="6" font-weight="bold">CKT</text>
  <text x="100" y="283" fill="#f59e0b" font-size="6" font-weight="bold">DESCRIPTION</text>
  <text x="250" y="283" fill="#f59e0b" font-size="6" font-weight="bold">BREAKER</text>

  <text x="50" y="298" fill="#94a3b8" font-size="6">1</text>
  <text x="100" y="298" fill="#94a3b8" font-size="6">Kitchen SABC #1</text>
  <text x="250" y="298" fill="#94a3b8" font-size="6">20A AFCI</text>
  <text x="50" y="311" fill="#94a3b8" font-size="6">3</text>
  <text x="100" y="311" fill="#94a3b8" font-size="6">Kitchen SABC #2</text>
  <text x="250" y="311" fill="#94a3b8" font-size="6">20A AFCI</text>
  <text x="50" y="324" fill="#94a3b8" font-size="6">5</text>
  <text x="100" y="324" fill="#94a3b8" font-size="6">Dishwasher (dedicated)</text>
  <text x="250" y="324" fill="#94a3b8" font-size="6">20A GFCI</text>
  <text x="50" y="337" fill="#94a3b8" font-size="6">7</text>
  <text x="100" y="337" fill="#94a3b8" font-size="6">Refrigerator (dedicated)</text>
  <text x="250" y="337" fill="#94a3b8" font-size="6">20A</text>
  <text x="50" y="350" fill="#94a3b8" font-size="6">9</text>
  <text x="100" y="350" fill="#94a3b8" font-size="6">Bathroom GFCI + exhaust</text>
  <text x="250" y="350" fill="#94a3b8" font-size="6">20A GFCI</text>
  <text x="50" y="363" fill="#94a3b8" font-size="6">11</text>
  <text x="100" y="363" fill="#94a3b8" font-size="6">Laundry (washer)</text>
  <text x="250" y="363" fill="#94a3b8" font-size="6">20A</text>
  <text x="50" y="376" fill="#94a3b8" font-size="6">2,4</text>
  <text x="100" y="376" fill="#94a3b8" font-size="6">Dryer (240V)</text>
  <text x="250" y="376" fill="#94a3b8" font-size="6">2P 30A</text>
  <text x="50" y="389" fill="#94a3b8" font-size="6">6,8</text>
  <text x="100" y="389" fill="#94a3b8" font-size="6">HVAC (240V)</text>
  <text x="250" y="389" fill="#94a3b8" font-size="6">2P 40A</text>
  <text x="50" y="402" fill="#94a3b8" font-size="6">13,15</text>
  <text x="100" y="402" fill="#94a3b8" font-size="6">Bedroom receptacles</text>
  <text x="250" y="402" fill="#94a3b8" font-size="6">15A AFCI</text>
  <text x="50" y="415" fill="#94a3b8" font-size="6">17</text>
  <text x="100" y="415" fill="#94a3b8" font-size="6">Living room / hallway</text>
  <text x="250" y="415" fill="#94a3b8" font-size="6">15A AFCI</text>
  <text x="50" y="428" fill="#94a3b8" font-size="6">19</text>
  <text x="100" y="428" fill="#94a3b8" font-size="6">General lighting</text>
  <text x="250" y="428" fill="#94a3b8" font-size="6">15A AFCI</text>
  <text x="50" y="441" fill="#64748b" font-size="6">...</text>
  <text x="100" y="441" fill="#64748b" font-size="6">Spare spaces for future</text>
  <text x="250" y="441" fill="#64748b" font-size="6">—</text>

  <text x="50" y="470" fill="#64748b" font-size="5">Typical 1BR: 12-16 circuits (100A panel) · 2BR: 16-20 circuits (125A panel)</text>
  <text x="50" y="482" fill="#64748b" font-size="5">Load calc per NEC Art. 220 — general lighting + small appliance + dedicated loads</text>

  <text x="170" y="520" text-anchor="middle" fill="#475569" font-size="6">PER-UNIT PANELS × UNIT COUNT — METER BANK SIZED PER FLOOR</text>
  <text x="170" y="535" text-anchor="middle" fill="#475569" font-size="6">MULTIFAMILY BUILD-OUT — PHASE 5 OF 7</text>
</svg>`;
