export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 660" font-family="Arial, sans-serif">
  <rect width="340" height="660" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">WHOLE-HOUSE BATTERY STORAGE</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY</text>
  <line x1="158" y1="54" x2="161" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="182" y1="54" x2="179" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Gateway -->
  <rect x="40" y="74" width="260" height="58" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
  <text x="170" y="96" text-anchor="middle" fill="#a855f7" font-size="11" font-weight="bold">GATEWAY 3</text>
  <text x="170" y="112" text-anchor="middle" fill="#94a3b8" font-size="9">Tesla Gateway - system controller</text>
  <text x="170" y="126" text-anchor="middle" fill="#64748b" font-size="7">Grid / Solar / Battery - auto transfer</text>

  <!-- Solar callout -->
  <line x1="40" y1="100" x2="26" y2="100" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="2" y="92" width="24" height="18" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>
  <text x="14" y="104" text-anchor="middle" fill="#fbbf24" font-size="7" font-weight="bold">SOL</text>
  <text x="2" y="120" fill="#475569" font-size="6">Solar (opt)</text>

  <line x1="170" y1="132" x2="170" y2="148" stroke="#facc15" stroke-width="2"/>

  <!-- Main panel -->
  <rect x="40" y="148" width="260" height="166" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="170" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="170" y="186" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <!-- Two-column breaker layout -->
  <rect x="167.5" y="204" width="5" height="51" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="130.5" y="206" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="206" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="130.5" y="216" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="175.5" y="216" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="130.5" y="226" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="175.5" y="226" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="130.5" y="236" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="236" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="130.5" y="246" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="175.5" y="246" width="34" height="7" rx="1.5" fill="#334155"/>  <text x="170" y="284" text-anchor="middle" fill="#475569" font-size="7">All loads + critical subpanel feeder</text>

  <line x1="170" y1="226" x2="170" y2="324" stroke="#f97316" stroke-width="2"/>

  <!-- Critical loads subpanel -->
  <rect x="40" y="324" width="260" height="74" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="346" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CRITICAL LOADS</text>
  <text x="170" y="362" text-anchor="middle" fill="#94a3b8" font-size="9">100A subpanel - CHP24L125X2</text>
  <text x="170" y="378" text-anchor="middle" fill="#64748b" font-size="8">Backed-up circuits only</text>
  <text x="170" y="392" text-anchor="middle" fill="#475569" font-size="7">Fridge / HVAC / Lights / Outlets</text>

  <!-- Powerwall - below critical loads -->
  <line x1="40" y1="370" x2="24" y2="370" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="24" y1="370" x2="24" y2="418" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="24" y1="418" x2="40" y2="418" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="40" y="408" width="130" height="72" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="105" y="430" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">POWERWALL 3</text>
  <text x="105" y="446" text-anchor="middle" fill="#94a3b8" font-size="9">13.5 kWh / 11.5 kW</text>
  <text x="105" y="462" text-anchor="middle" fill="#64748b" font-size="7">Inverter built-in - UL 9540</text>
  <text x="105" y="474" text-anchor="middle" fill="#64748b" font-size="7">Indoor/Outdoor - no HVAC closets</text>

  <!-- AE notice - width=110, right edge at x=290, clear of green line at x=320 -->
  <rect x="180" y="414" width="110" height="36" rx="3" fill="#1e293b" stroke="#a855f7" stroke-width="1"/>
  <text x="235" y="432" text-anchor="middle" fill="#a855f7" font-size="8" font-weight="bold">AE Interconnect</text>
  <text x="235" y="446" text-anchor="middle" fill="#64748b" font-size="7">Solar+storage NEC 706</text>

  <!-- Ground - outside right at x=320, fully clear of AE box (ends x=290) -->
  <line x1="300" y1="200" x2="320" y2="200" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="320" y1="200" x2="320" y2="510" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="308" y1="510" x2="332" y2="510" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="306" y="510" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="322" y="510" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="290" y="526" text-anchor="end" fill="#22c55e" font-size="7">GND RODS</text>

  <rect x="10" y="572" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="588" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="596" width="12" height="8" rx="1" fill="#a855f7" opacity="0.9"/>
  <text x="40" y="604" fill="#64748b" font-size="9">Gateway controller</text>
  <rect x="140" y="596" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="604" fill="#64748b" font-size="9">Battery / Powerwall</text>
  <rect x="240" y="596" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="258" y="604" fill="#64748b" font-size="9">Main panel</text>
  <rect x="22" y="614" width="12" height="8" rx="1" fill="#f97316" opacity="0.85"/>
  <text x="40" y="622" fill="#64748b" font-size="9">Critical loads subpanel</text>
  <rect x="140" y="614" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="158" y="622" fill="#64748b" font-size="9">Solar input (optional)</text>
  <text x="14" y="656" fill="#475569" font-size="7">WHOLE-HOUSE BATTERY STORAGE - NOT TO SCALE</text>
</svg>`;
