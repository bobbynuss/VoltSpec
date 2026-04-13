export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">MULTIFAMILY — PHASE 2: UNDERGROUND SITE DISTRIBUTION</text>

  <!-- Utility Transformer -->
  <rect x="125" y="40" width="90" height="35" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="8" font-weight="bold">UTILITY XFMR</text>
  <text x="170" y="68" text-anchor="middle" fill="#94a3b8" font-size="6">Pad-mount or vault</text>

  <!-- CT Cabinet -->
  <line x1="170" y1="75" x2="170" y2="95" stroke="#f59e0b" stroke-width="2"/>
  <rect x="120" y="95" width="100" height="35" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="170" y="113" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="bold">MAIN SWITCHGEAR</text>
  <text x="170" y="123" text-anchor="middle" fill="#94a3b8" font-size="6">1200A / 2000A · 120/208V 3Ø</text>

  <!-- Underground duct bank -->
  <line x1="170" y1="130" x2="170" y2="155" stroke="#f59e0b" stroke-width="2"/>
  <rect x="40" y="155" width="260" height="12" rx="2" fill="#78350f" opacity="0.4"/>
  <text x="170" y="163" text-anchor="middle" fill="#a16207" font-size="6">── UNDERGROUND DUCT BANK — PVC SCHEDULE 40 ──</text>

  <!-- Building feeders fan out -->
  <line x1="80" y1="167" x2="80" y2="210" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="170" y1="167" x2="170" y2="210" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="260" y1="167" x2="260" y2="210" stroke="#f59e0b" stroke-width="1.5"/>

  <!-- Building A -->
  <rect x="45" y="210" width="70" height="50" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="80" y="230" text-anchor="middle" fill="#94a3b8" font-size="8" font-weight="bold">BLDG A</text>
  <text x="80" y="242" text-anchor="middle" fill="#64748b" font-size="6">MDP 400A</text>
  <text x="80" y="252" text-anchor="middle" fill="#64748b" font-size="6">CT Cabinet</text>

  <!-- Building B -->
  <rect x="135" y="210" width="70" height="50" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="170" y="230" text-anchor="middle" fill="#94a3b8" font-size="8" font-weight="bold">BLDG B</text>
  <text x="170" y="242" text-anchor="middle" fill="#64748b" font-size="6">MDP 400A</text>
  <text x="170" y="252" text-anchor="middle" fill="#64748b" font-size="6">CT Cabinet</text>

  <!-- Building C -->
  <rect x="225" y="210" width="70" height="50" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="260" y="230" text-anchor="middle" fill="#94a3b8" font-size="8" font-weight="bold">BLDG C</text>
  <text x="260" y="242" text-anchor="middle" fill="#64748b" font-size="6">MDP 400A</text>
  <text x="260" y="252" text-anchor="middle" fill="#64748b" font-size="6">CT Cabinet</text>

  <!-- Duct Bank Detail -->
  <text x="170" y="295" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">DUCT BANK CROSS-SECTION</text>
  <rect x="80" y="305" width="180" height="100" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <rect x="105" y="325" width="20" height="20" rx="10" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="338" text-anchor="middle" fill="#f59e0b" font-size="5">A</text>
  <rect x="140" y="325" width="20" height="20" rx="10" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="150" y="338" text-anchor="middle" fill="#f59e0b" font-size="5">B</text>
  <rect x="175" y="325" width="20" height="20" rx="10" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="185" y="338" text-anchor="middle" fill="#f59e0b" font-size="5">C</text>
  <rect x="210" y="325" width="20" height="20" rx="10" fill="none" stroke="#22c55e" stroke-width="1.5"/>
  <text x="220" y="338" text-anchor="middle" fill="#22c55e" font-size="5">G</text>
  <rect x="105" y="355" width="20" height="20" rx="10" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <text x="115" y="368" text-anchor="middle" fill="#94a3b8" font-size="5">N</text>
  <rect x="140" y="355" width="20" height="20" rx="10" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="150" y="368" text-anchor="middle" fill="#94a3b8" font-size="5">SP</text>
  <text x="170" y="395" text-anchor="middle" fill="#64748b" font-size="6">4" PVC conduits in concrete-encased bank</text>

  <!-- Site amenities -->
  <text x="170" y="430" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">SITE AMENITIES FEEDS</text>
  <rect x="30" y="440" width="280" height="70" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="80" y="460" text-anchor="middle" fill="#f59e0b" font-size="7">POOL/GYM</text>
  <text x="80" y="472" text-anchor="middle" fill="#64748b" font-size="6">100A feeder</text>
  <text x="170" y="460" text-anchor="middle" fill="#f59e0b" font-size="7">CLUBHOUSE</text>
  <text x="170" y="472" text-anchor="middle" fill="#64748b" font-size="6">200A feeder</text>
  <text x="260" y="460" text-anchor="middle" fill="#f59e0b" font-size="7">SITE LTNG</text>
  <text x="260" y="472" text-anchor="middle" fill="#64748b" font-size="6">100A feeder</text>
  <text x="170" y="500" text-anchor="middle" fill="#64748b" font-size="6">All underground PVC from main switchgear</text>

  <text x="170" y="540" text-anchor="middle" fill="#475569" font-size="6">SCALE PER PROJECT — ADJUST BUILDING COUNT, FEEDER SIZES, DUCT BANK ROUTING</text>
  <text x="170" y="555" text-anchor="middle" fill="#475569" font-size="6">MULTIFAMILY BUILD-OUT — PHASE 2 OF 7</text>
</svg>`;
