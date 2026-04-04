export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 700" font-family="Arial, sans-serif">
  <rect width="340" height="700" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">400A 3-PHASE COMMERCIAL SERVICE (POW-R-LINE)</text>

  <!-- Utility -->
  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY 3Ø 4-WIRE 120/208V WYE</text>
  <line x1="145" y1="54" x2="150" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="162" y1="54" x2="165" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="179" y1="54" x2="180" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="196" y1="54" x2="195" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- CT Cabinet -->
  <rect x="40" y="74" width="260" height="72" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="96" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">CT METERING CABINET</text>
  <text x="170" y="112" text-anchor="middle" fill="#94a3b8" font-size="9">400A class CT cabinet — utility approved</text>
  <text x="170" y="126" text-anchor="middle" fill="#64748b" font-size="8">750 kcmil AL XHHW-2 service conductors</text>
  <text x="170" y="140" text-anchor="middle" fill="#475569" font-size="7">Utility installs CTs and meter — contractor provides cabinet</text>

  <line x1="170" y1="146" x2="170" y2="166" stroke="#facc15" stroke-width="2"/>

  <!-- Main Disconnect -->
  <rect x="50" y="166" width="240" height="56" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="186" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">400A 3Ø FUSIBLE DISCONNECT</text>
  <text x="170" y="200" text-anchor="middle" fill="#94a3b8" font-size="8">Eaton DH365FGK — NEMA 1, 600V, 3-pole</text>
  <text x="170" y="214" text-anchor="middle" fill="#475569" font-size="7">Service entrance main disconnect — NEC 230.85</text>

  <line x1="170" y1="222" x2="170" y2="244" stroke="#facc15" stroke-width="2"/>
  <text x="200" y="236" fill="#64748b" font-size="7">3 in. RMC or EMT</text>

  <!-- Pow-R-Line Panelboard -->
  <rect x="20" y="244" width="300" height="200" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="266" text-anchor="middle" fill="#facc15" font-size="12" font-weight="bold">POW-R-XPRESS PRL1X</text>
  <text x="170" y="282" text-anchor="middle" fill="#94a3b8" font-size="9">PRL1X3422X42C — 422A Cu bus, 42-ckt, 208Y/120V</text>
  <text x="170" y="296" text-anchor="middle" fill="#64748b" font-size="8">400A main breaker: BKD2G400 (65 kAIC at 240V)</text>

  <!-- Main breaker -->
  <rect x="134" y="306" width="72" height="14" rx="2" fill="#ef4444" opacity="0.85"/>
  <text x="170" y="316" text-anchor="middle" fill="white" font-size="7" font-weight="bold">400A MAIN</text>

  <!-- Breaker columns -->
  <rect x="167.5" y="328" width="5" height="70" rx="1" fill="#475569" opacity="0.6"/>
  <!-- Left column -->
  <rect x="105" y="330" width="60" height="9" rx="1.5" fill="#334155"/>
  <rect x="105" y="342" width="60" height="9" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="105" y="354" width="60" height="9" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="105" y="366" width="60" height="9" rx="1.5" fill="#334155"/>
  <rect x="105" y="378" width="60" height="9" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="105" y="390" width="60" height="9" rx="1.5" fill="#334155"/>
  <!-- Right column -->
  <rect x="175" y="330" width="60" height="9" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="175" y="342" width="60" height="9" rx="1.5" fill="#334155"/>
  <rect x="175" y="354" width="60" height="9" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="175" y="366" width="60" height="9" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="175" y="378" width="60" height="9" rx="1.5" fill="#334155"/>
  <rect x="175" y="390" width="60" height="9" rx="1.5" fill="#3b82f6" opacity="0.85"/>

  <text x="78" y="364" fill="#475569" font-size="7" text-anchor="end">QBH bolt-on</text>
  <text x="262" y="364" fill="#475569" font-size="7">3-pole branch</text>

  <text x="170" y="420" text-anchor="middle" fill="#475569" font-size="8">EZB2072RBS enclosure + EZT2072S trim</text>
  <text x="170" y="434" text-anchor="middle" fill="#475569" font-size="7">CUGROUND copper ground bus assembly</text>

  <!-- Grounding -->
  <line x1="170" y1="444" x2="170" y2="478" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="130" y1="478" x2="210" y2="478" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="124" y="478" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="164" y="478" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="204" y="478" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="520" text-anchor="middle" fill="#22c55e" font-size="8">GROUND ELECTRODE SYSTEM</text>
  <text x="170" y="532" text-anchor="middle" fill="#475569" font-size="7">4/0 AWG bare Cu GEC — rods 6 ft apart min</text>

  <!-- Ufer -->
  <line x1="130" y1="478" x2="50" y2="478" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="14" y="470" width="46" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="37" y="483" text-anchor="middle" fill="#22c55e" font-size="8">UFER</text>

  <!-- Arc flash label -->
  <rect x="100" y="546" width="140" height="20" rx="2" fill="#ef4444" opacity="0.15" stroke="#ef4444" stroke-width="1"/>
  <text x="170" y="560" text-anchor="middle" fill="#ef4444" font-size="8" font-weight="bold">⚡ ARC FLASH LABEL REQ'D</text>

  <!-- Legend -->
  <rect x="10" y="580" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="596" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="604" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="612" fill="#64748b" font-size="9">Service / Panel</text>
  <rect x="140" y="604" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="612" fill="#64748b" font-size="9">20A lighting/recep</text>
  <rect x="240" y="604" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="612" fill="#64748b" font-size="9">30A HVAC/mech</text>
  <line x1="22" y1="630" x2="34" y2="630" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="634" fill="#64748b" font-size="9">Grounding system</text>
  <line x1="140" y1="630" x2="152" y2="630" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="158" y="634" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <line x1="240" y1="630" x2="252" y2="630" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="634" fill="#64748b" font-size="9">Utility 3Ø</text>
  <text x="14" y="696" fill="#475569" font-size="7">400A 3-PHASE COMMERCIAL SERVICE - NOT TO SCALE</text>
</svg>`;
