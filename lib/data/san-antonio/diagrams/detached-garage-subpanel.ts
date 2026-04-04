export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 700" font-family="Arial, sans-serif">
  <rect width="340" height="700" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">DETACHED GARAGE / CARPORT SUBPANEL</text>

  <!-- Main panel -->
  <rect x="60" y="40" width="220" height="82" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL - 200A</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">BRP20B200R</text>
  <rect x="78" y="88" width="58" height="24" rx="2" fill="#f97316" opacity="0.9"/>
  <text x="107" y="100" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">BR2100</text>
  <text x="107" y="110" text-anchor="middle" fill="#fff" font-size="7">100A 2-pole</text>
  <text x="148" y="103" fill="#64748b" font-size="8">Feeder breaker</text>

  <line x1="170" y1="122" x2="170" y2="138" stroke="#f97316" stroke-width="2.5"/>
  <rect x="58" y="138" width="224" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="151" text-anchor="middle" fill="#64748b" font-size="9">2 AWG AL SER - 4-wire feeder</text>
  <line x1="170" y1="156" x2="170" y2="168" stroke="#f97316" stroke-width="2"/>

  <!-- Underground run -->
  <line x1="16" y1="172" x2="324" y2="172" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="14" y="169" fill="#475569" font-size="7">grade</text>
  <line x1="170" y1="168" x2="170" y2="194" stroke="#f97316" stroke-width="2"/>
  <text x="184" y="188" fill="#64748b" font-size="7">24 in. burial - 1-1/4 in. PVC</text>
  <line x1="16" y1="198" x2="324" y2="198" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="14" y="195" fill="#475569" font-size="7">grade</text>

  <!-- Isolated neutral callout -->
  <rect x="36" y="210" width="268" height="30" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="226" text-anchor="middle" fill="#f97316" font-size="9" font-weight="bold">ISOLATED NEUTRAL required - NEC 250.32</text>
  <text x="170" y="236" text-anchor="middle" fill="#64748b" font-size="7">L1 + L2 + Neutral + Ground - four separate conductors</text>

  <line x1="170" y1="240" x2="170" y2="254" stroke="#f97316" stroke-width="2"/>

  <!-- Subpanel -->
  <rect x="28" y="254" width="284" height="180" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="276" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">DETACHED GARAGE SUBPANEL</text>
  <text x="170" y="292" text-anchor="middle" fill="#94a3b8" font-size="9">BRP24L125G - BR MLO - 24-space</text>

  <!-- Two-column breaker layout -->
  <rect x="167.5" y="308" width="5" height="61" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="130.5" y="310" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="175.5" y="310" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="130.5" y="320" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="175.5" y="320" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="130.5" y="330" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="330" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="130.5" y="340" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="175.5" y="340" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="130.5" y="350" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="175.5" y="350" width="34" height="7" rx="1.5" fill="#f59e0b" opacity="0.85"/>
  <rect x="130.5" y="360" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="360" width="34" height="7" rx="1.5" fill="#334155"/>

  <text x="170" y="390" text-anchor="middle" fill="#64748b" font-size="8">Garage / Workshop / Carport</text>
  <text x="170" y="404" text-anchor="middle" fill="#475569" font-size="7">AFCI / GFCI / 30A / 50A / 240V circuits</text>
  <text x="170" y="418" text-anchor="middle" fill="#475569" font-size="7">EV charger rough-in - 50A 240V dedicated</text>

  <!-- Ground system -->
  <line x1="28" y1="340" x2="14" y2="340" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="14" y1="340" x2="14" y2="480" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="6" y1="480" x2="22" y2="480" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="4" y="480" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="16" y="480" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="36" y="494" fill="#22c55e" font-size="7">GND RODS</text>
  <text x="36" y="510" fill="#475569" font-size="7">Detached structure</text>
  <text x="36" y="522" fill="#475569" font-size="7">per NEC 250.32</text>

  <!-- Legend -->
  <rect x="10" y="572" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="588" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="596" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="604" fill="#64748b" font-size="9">Feeder / subpanel</text>
  <rect x="190" y="596" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="208" y="604" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="22" y="614" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="622" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="190" y="614" width="12" height="8" rx="1" fill="#f59e0b" opacity="0.85"/>
  <text x="208" y="622" fill="#64748b" font-size="9">240V / 50A circuit</text>
  <text x="14" y="656" fill="#475569" font-size="7">DETACHED GARAGE SUBPANEL - NOT TO SCALE</text>
</svg>`;
