export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 660" font-family="Arial, sans-serif">
  <rect width="340" height="660" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">200A 3-PHASE COMMERCIAL SERVICE</text>

  <text x="110" y="44" fill="#475569" font-size="8">A</text>
  <text x="130" y="44" fill="#475569" font-size="8">B</text>
  <text x="150" y="44" fill="#475569" font-size="8">C</text>
  <text x="170" y="44" fill="#475569" font-size="8">N</text>
  <text x="190" y="44" fill="#475569" font-size="8">G</text>
  <line x1="114" y1="48" x2="118" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="134" y1="48" x2="136" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="154" y1="48" x2="154" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="174" y1="48" x2="172" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="194" y1="48" x2="190" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M146,64 Q154,52 162,64 Z" fill="#facc15"/>
  <rect x="151" y="64" width="6" height="16" rx="1" fill="#334155"/>

  <rect x="28" y="88" width="284" height="60" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="108" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">CT METER CABINET</text>
  <text x="170" y="124" text-anchor="middle" fill="#94a3b8" font-size="9">CPS commercial CT metering - 200A class</text>
  <text x="170" y="140" text-anchor="middle" fill="#64748b" font-size="7">Meter &amp; metering equipment furnished by CPS Energy (no cost)</text>

  <line x1="170" y1="148" x2="170" y2="162" stroke="#facc15" stroke-width="2"/>
  <rect x="58" y="162" width="224" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="175" text-anchor="middle" fill="#64748b" font-size="9">350 kcmil AL XHHW-2 - 5 conductors (3P+N+G)</text>
  <line x1="170" y1="180" x2="170" y2="194" stroke="#facc15" stroke-width="2"/>

  <rect x="28" y="194" width="284" height="56" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="216" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">3-PHASE FUSIBLE DISCONNECT</text>
  <text x="170" y="232" text-anchor="middle" fill="#94a3b8" font-size="9">Eaton DH365FGK - 200A - 600V</text>
  <text x="170" y="246" text-anchor="middle" fill="#64748b" font-size="7">Service entrance main disconnect</text>

  <line x1="170" y1="250" x2="170" y2="264" stroke="#facc15" stroke-width="2"/>

  <rect x="28" y="264" width="284" height="182" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="286" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">POW-R-XPRESS MDP</text>
  <text x="170" y="302" text-anchor="middle" fill="#94a3b8" font-size="9">PRL1X3225X42C + EZB2060RBS + BKD2G225</text>
  <text x="170" y="318" text-anchor="middle" fill="#64748b" font-size="7">225A Cu bus - 42 ckt - 120/208V 3ph 4W - 65 kAIC</text>
  <!-- Two-column breaker layout -->
  <rect x="167.5" y="338" width="5" height="41" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="130.5" y="340" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="340" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="130.5" y="350" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="350" width="34" height="7" rx="1.5" fill="#f59e0b" opacity="0.85"/>
  <rect x="130.5" y="360" width="34" height="7" rx="1.5" fill="#f59e0b" opacity="0.85"/>
  <rect x="175.5" y="360" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="130.5" y="370" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="370" width="34" height="7" rx="1.5" fill="#f59e0b" opacity="0.85"/>  <text x="170" y="408" text-anchor="middle" fill="#475569" font-size="7">Arc Flash Label - NEC 110.16 - Engineer stamp req.</text>

  <!-- Ground - outside right, label LEFT of rods (away from edge) -->
  <line x1="312" y1="310" x2="326" y2="310" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="326" y1="310" x2="326" y2="500" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="314" y1="500" x2="336" y2="500" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="312" y="500" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="304" y="516" text-anchor="end" fill="#22c55e" font-size="7">GND RODS</text>
  <line x1="326" y1="476" x2="290" y2="476" stroke="#22c55e" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="282" y="474" text-anchor="end" fill="#22c55e" font-size="7">UFER</text>

  <rect x="10" y="572" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="588" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="596" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="604" fill="#64748b" font-size="9">3-phase fusible disconnect</text>
  <rect x="190" y="596" width="12" height="8" rx="1" fill="#334155" opacity="0.9"/>
  <text x="208" y="604" fill="#64748b" font-size="9">3-pole breaker (20/30A)</text>
  <rect x="22" y="614" width="12" height="8" rx="1" fill="#f59e0b" opacity="0.8"/>
  <text x="40" y="622" fill="#64748b" font-size="9">3-pole HVAC/equipment</text>
  <line x1="190" y1="618" x2="202" y2="618" stroke="#22c55e" stroke-width="1.5"/>
  <text x="208" y="622" fill="#64748b" font-size="9">Grounding system</text>
  <text x="14" y="656" fill="#475569" font-size="7">200A 3-PHASE COMMERCIAL - NOT TO SCALE</text>
</svg>`;
