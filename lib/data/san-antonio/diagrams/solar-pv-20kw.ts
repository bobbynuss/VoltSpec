export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">SOLAR PV INTERCONNECT - UP TO 20kW</text>

  <!-- PV Array -->
  <rect x="18" y="38" width="304" height="52" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
  <text x="170" y="58" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">SOLAR PV ARRAY - ROOF MOUNT</text>
  <text x="170" y="74" text-anchor="middle" fill="#94a3b8" font-size="9">44 x 400W - 17.6kW STC - South/West preferred</text>
  <rect x="26" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="62" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="98" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="134" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="170" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="206" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="242" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="278" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>

  <line x1="170" y1="90" x2="170" y2="102" stroke="#fbbf24" stroke-width="2"/>

  <!-- DC wire label -->
  <rect x="78" y="102" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="115" text-anchor="middle" fill="#64748b" font-size="9">10 AWG USE-2 / PV wire - MC4 connectors</text>

  <line x1="170" y1="120" x2="170" y2="136" stroke="#fbbf24" stroke-width="2"/>

  <!-- Rapid shutdown -->
  <rect x="86" y="136" width="168" height="38" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
  <text x="170" y="156" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold">RAPID SHUTDOWN</text>
  <text x="170" y="170" text-anchor="middle" fill="#64748b" font-size="7">NEC 690.12 - required for all roof systems</text>

  <line x1="170" y1="174" x2="170" y2="190" stroke="#fbbf24" stroke-width="2"/>

  <!-- Inverter -->
  <rect x="46" y="190" width="248" height="58" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="212" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">STRING INVERTER</text>
  <text x="170" y="228" text-anchor="middle" fill="#94a3b8" font-size="9">SolarEdge SE17400H - 17.4kW - UL 1741</text>
  <text x="170" y="244" text-anchor="middle" fill="#64748b" font-size="7">DC to AC - WiFi monitoring - anti-islanding</text>

  <line x1="170" y1="248" x2="170" y2="264" stroke="#22c55e" stroke-width="2"/>

  <!-- AC disconnect -->
  <rect x="86" y="264" width="168" height="38" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="284" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">60A AC DISCONNECT</text>
  <text x="170" y="298" text-anchor="middle" fill="#64748b" font-size="7">Non-fusible NEMA 3R - within sight of inverter</text>

  <line x1="170" y1="302" x2="170" y2="316" stroke="#22c55e" stroke-width="2"/>

  <!-- AC conduit -->
  <rect x="78" y="316" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="329" text-anchor="middle" fill="#64748b" font-size="9">10 AWG THHN - 3/4 in. EMT conduit</text>

  <line x1="170" y1="334" x2="170" y2="350" stroke="#22c55e" stroke-width="2"/>

  <!-- Main panel -->
  <rect x="46" y="350" width="248" height="58" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="372" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="388" text-anchor="middle" fill="#94a3b8" font-size="9">20A backfed - 120% rule NEC 705.12</text>
  <text x="170" y="404" text-anchor="middle" fill="#64748b" font-size="7">Supply-side tap per CPS preference</text>

  <!-- Prod meter -->
  <rect x="300" y="358" width="34" height="26" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="317" y="372" text-anchor="middle" fill="#94a3b8" font-size="7">PROD</text>
  <text x="317" y="382" text-anchor="middle" fill="#64748b" font-size="7">METER</text>
  <line x1="294" y1="371" x2="300" y2="371" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <line x1="22" y1="522" x2="34" y2="522" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="40" y="526" fill="#64748b" font-size="9">DC PV circuit</text>
  <line x1="140" y1="522" x2="152" y2="522" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="526" fill="#64748b" font-size="9">AC inverter output</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#ef4444" opacity="0.9"/>
  <text x="258" y="526" fill="#64748b" font-size="9">Rapid shutdown</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="544" fill="#64748b" font-size="9">AC disconnect</text>
  <rect x="140" y="536" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="158" y="544" fill="#64748b" font-size="9">Main panel</text>
  <text x="14" y="576" fill="#475569" font-size="7">SOLAR PV INTERCONNECT - NOT TO SCALE</text>
</svg>`;
