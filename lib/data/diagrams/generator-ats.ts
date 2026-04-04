export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 660" font-family="Arial, sans-serif">
  <rect width="340" height="660" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">WHOLE-HOUSE GENERATOR + ATS</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP</text>
  <line x1="158" y1="54" x2="161" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="182" y1="54" x2="179" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <rect x="50" y="74" width="240" height="62" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
  <text x="170" y="96" text-anchor="middle" fill="#a855f7" font-size="12" font-weight="bold">200A ATS</text>
  <text x="170" y="112" text-anchor="middle" fill="#94a3b8" font-size="9">Eaton CHSPT2ULTRA</text>
  <text x="170" y="128" text-anchor="middle" fill="#64748b" font-size="7">Anti-islanding - auto transfer under 10 sec - NEC 702</text>

  <line x1="50" y1="104" x2="28" y2="104" stroke="#f97316" stroke-width="2"/>
  <line x1="28" y1="104" x2="28" y2="362" stroke="#f97316" stroke-width="2"/>

  <rect x="6" y="362" width="128" height="88" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="70" y="386" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">GENERATOR</text>
  <text x="70" y="402" text-anchor="middle" fill="#94a3b8" font-size="9">Generac 7043</text>
  <text x="70" y="418" text-anchor="middle" fill="#64748b" font-size="8">22kW Natural Gas</text>
  <text x="70" y="434" text-anchor="middle" fill="#64748b" font-size="7">Concrete pad - 18 in. from openings</text>
  <text x="70" y="446" text-anchor="middle" fill="#94a3b8" font-size="7">Bond at generator chassis only</text>

  <line x1="28" y1="352" x2="28" y2="332" stroke="#475569" stroke-width="3"/>
  <text x="42" y="346" fill="#64748b" font-size="7">1 in. LFMC</text>

  <line x1="170" y1="136" x2="170" y2="152" stroke="#facc15" stroke-width="2"/>

  <rect x="50" y="152" width="240" height="170" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="174" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="170" y="190" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <!-- Two-column breaker layout -->
  <rect x="167.5" y="208" width="5" height="51" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="130.5" y="210" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="210" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="130.5" y="220" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="175.5" y="220" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="130.5" y="230" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="230" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="130.5" y="240" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="240" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="130.5" y="250" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="175.5" y="250" width="34" height="7" rx="1.5" fill="#334155"/>  <text x="170" y="290" text-anchor="middle" fill="#475569" font-size="8">All house loads</text>

  <!-- Ground - outside right, label RIGHT of rods -->
  <line x1="290" y1="210" x2="310" y2="210" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="310" y1="210" x2="310" y2="474" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="298" y1="474" x2="322" y2="474" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="296" y="474" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="314" y="474" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="268" y="490" text-anchor="end" fill="#22c55e" font-size="7">GND RODS</text>

  <line x1="134" y1="460" x2="134" y2="500" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="148" y="480" fill="#fbbf24" font-size="8">NATGAS</text>
  <text x="148" y="494" fill="#475569" font-size="7">(plumber)</text>

  <rect x="10" y="572" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="588" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="596" width="12" height="8" rx="1" fill="#a855f7" opacity="0.9"/>
  <text x="40" y="604" fill="#64748b" font-size="9">ATS transfer switch</text>
  <rect x="190" y="596" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="604" fill="#64748b" font-size="9">Generator feed</text>
  <rect x="22" y="614" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="622" fill="#64748b" font-size="9">Utility / main panel</text>
  <rect x="190" y="614" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="208" y="622" fill="#64748b" font-size="9">AFCI / ground</text>
  <text x="14" y="656" fill="#475569" font-size="7">GENERATOR + ATS - NOT TO SCALE</text>
</svg>`;
