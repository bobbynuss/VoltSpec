export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">LEVEL 2 EV CHARGER - 50A 240V DEDICATED</text>

  <!-- Main panel -->
  <rect x="60" y="40" width="220" height="66" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">200A Service</text>
  <rect x="78" y="86" width="52" height="16" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="104" y="98" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">50A GFCI</text>
  <text x="140" y="97" fill="#64748b" font-size="8">CHFP250GF</text>

  <line x1="170" y1="106" x2="170" y2="120" stroke="#facc15" stroke-width="2"/>

  <!-- Conduit label -->
  <rect x="68" y="120" width="204" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="133" text-anchor="middle" fill="#64748b" font-size="9">6 AWG THHN in 3/4 in. EMT conduit</text>

  <line x1="170" y1="138" x2="170" y2="158" stroke="#facc15" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="182" y="152" fill="#64748b" font-size="8">~40 ft run to garage</text>

  <!-- LB condulet -->
  <rect x="96" y="162" width="148" height="42" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="170" y="182" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">LB25 CONDULET</text>
  <text x="170" y="198" text-anchor="middle" fill="#64748b" font-size="8">Exterior wall penetration</text>

  <line x1="170" y1="204" x2="170" y2="224" stroke="#facc15" stroke-width="2"/>

  <!-- NEMA outlet -->
  <rect x="60" y="224" width="220" height="72" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="248" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">NEMA 14-50R</text>
  <text x="170" y="264" text-anchor="middle" fill="#94a3b8" font-size="9">TP403 box - 4-square deep</text>
  <text x="170" y="280" text-anchor="middle" fill="#64748b" font-size="8">48 in. AFF - driver side of parking</text>
  <text x="170" y="292" text-anchor="middle" fill="#475569" font-size="7">MM420C in-use cover if outdoors</text>

  <line x1="170" y1="296" x2="170" y2="314" stroke="#f97316" stroke-width="2"/>

  <!-- EVSE -->
  <rect x="50" y="314" width="240" height="68" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="338" text-anchor="middle" fill="#22c55e" font-size="12" font-weight="bold">LEVEL 2 EVSE</text>
  <text x="170" y="354" text-anchor="middle" fill="#94a3b8" font-size="9">Plug-in unit - NEMA 14-50 plug</text>
  <text x="170" y="370" text-anchor="middle" fill="#64748b" font-size="8">7.2 kW - approx 25 mi/hr charge</text>

  <line x1="170" y1="382" x2="170" y2="400" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="418" text-anchor="middle" fill="#475569" font-size="9">EV charge cable to vehicle</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="526" fill="#64748b" font-size="9">GFCI 2-pole 50A breaker</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="526" fill="#64748b" font-size="9">NEMA 14-50 outlet</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="40" y="544" fill="#64748b" font-size="9">EVSE unit</text>
  <rect x="190" y="536" width="12" height="8" rx="1" fill="#475569"/>
  <text x="208" y="544" fill="#64748b" font-size="9">LB condulet / conduit</text>
  <text x="14" y="576" fill="#475569" font-size="7">LEVEL 2 EV CHARGER - NOT TO SCALE</text>
</svg>`;
