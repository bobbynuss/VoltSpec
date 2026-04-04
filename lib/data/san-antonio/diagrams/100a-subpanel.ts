export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 650" font-family="Arial, sans-serif">
  <rect width="340" height="650" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">100A SUBPANEL ADDITION - 4-WIRE FEEDER</text>

  <rect x="60" y="40" width="220" height="82" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL - 200A</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">BRP20B200R</text>
  <rect x="78" y="88" width="58" height="24" rx="2" fill="#f97316" opacity="0.9"/>
  <text x="107" y="100" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">BR2100</text>
  <text x="107" y="110" text-anchor="middle" fill="#fff" font-size="7">100A 2-pole</text>
  <text x="148" y="103" fill="#64748b" font-size="8">Feeder breaker</text>

  <line x1="170" y1="122" x2="170" y2="138" stroke="#f97316" stroke-width="2.5"/>
  <rect x="58" y="138" width="224" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="151" text-anchor="middle" fill="#64748b" font-size="9">3 AWG THHN - 1-1/4 in. EMT - 4-wire feeder</text>
  <line x1="170" y1="156" x2="170" y2="170" stroke="#f97316" stroke-width="2"/>

  <rect x="36" y="170" width="268" height="36" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="188" text-anchor="middle" fill="#f97316" font-size="9" font-weight="bold">ISOLATED NEUTRAL required - NEC 250.32</text>
  <text x="170" y="202" text-anchor="middle" fill="#64748b" font-size="7">L1 + L2 + Neutral + Ground - four separate conductors</text>

  <line x1="170" y1="206" x2="170" y2="220" stroke="#f97316" stroke-width="2"/>

  <rect x="40" y="220" width="260" height="166" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="242" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">100A SUBPANEL</text>
  <text x="170" y="258" text-anchor="middle" fill="#94a3b8" font-size="9">BRP24L125G - BR MLO - 24-space</text>
  <!-- Two-column breaker layout -->
  <rect x="167.5" y="278" width="5" height="41" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="130.5" y="280" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="175.5" y="280" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="130.5" y="290" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="175.5" y="290" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="130.5" y="300" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="300" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="130.5" y="310" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="175.5" y="310" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>  <text x="170" y="340" text-anchor="middle" fill="#64748b" font-size="8">Garage / Shop / Detached Structure</text>
  <text x="170" y="354" text-anchor="middle" fill="#475569" font-size="7">AFCI / GFCI / 30A / 50A branch circuits</text>

  <!-- Ground rod - label RIGHT -->
  <line x1="40" y1="272" x2="24" y2="272" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="24" y1="272" x2="24" y2="438" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="18" y="438" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="454" fill="#22c55e" font-size="7">GND ROD</text>
  <text x="40" y="478" fill="#475569" font-size="7">If detached structure</text>
  <text x="40" y="490" fill="#475569" font-size="7">per NEC 250.32</text>

  <rect x="10" y="562" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="578" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="586" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="594" fill="#64748b" font-size="9">100A feeder / subpanel</text>
  <rect x="190" y="586" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="208" y="594" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="22" y="604" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="612" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="190" y="604" width="12" height="8" rx="1" fill="#334155"/>
  <text x="208" y="612" fill="#64748b" font-size="9">Standard breaker</text>
  <text x="14" y="646" fill="#475569" font-size="7">100A SUBPANEL ADDITION - NOT TO SCALE</text>
</svg>`;
