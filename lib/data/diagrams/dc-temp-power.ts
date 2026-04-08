export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">DATA CENTER BUILD-OUT — TEMP CONSTRUCTION POWER</text>

  <!-- Utility Service -->
  <text x="170" y="48" text-anchor="middle" fill="#64748b" font-size="9">UTILITY SERVICE DROP / PEDESTAL</text>
  <line x1="155" y1="56" x2="158" y2="74" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="56" x2="170" y2="74" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="185" y1="56" x2="182" y2="74" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,74 Q170,62 180,74 Z" fill="#facc15"/>

  <!-- Weatherhead -->
  <rect x="155" y="74" width="30" height="14" rx="2" fill="#475569" stroke="#64748b" stroke-width="1"/>
  <text x="170" y="84" text-anchor="middle" fill="#94a3b8" font-size="6">WHEAD</text>

  <!-- 3" Rigid Mast -->
  <rect x="167" y="88" width="6" height="40" rx="1" fill="#64748b" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="184" y="108" fill="#64748b" font-size="7">3" RMC mast</text>

  <!-- Meter Socket -->
  <rect x="20" y="94" width="140" height="58" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="90" y="114" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">400A METER SOCKET</text>
  <text x="90" y="128" text-anchor="middle" fill="#94a3b8" font-size="8">CT-rated or self-contained</text>
  <text x="90" y="142" text-anchor="middle" fill="#64748b" font-size="7">Utility-approved — coordinate w/ AHJ</text>

  <!-- 3" Conduit Run -->
  <line x1="90" y1="152" x2="90" y2="170" stroke="#94a3b8" stroke-width="2"/>
  <text x="106" y="164" fill="#64748b" font-size="7">3" RMC</text>

  <!-- Main Disconnect -->
  <rect x="20" y="170" width="140" height="44" rx="4" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
  <text x="90" y="190" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold">400A DISCONNECT</text>
  <text x="90" y="204" text-anchor="middle" fill="#94a3b8" font-size="8">Fused safety switch — NEMA 3R</text>

  <!-- Feeder -->
  <line x1="90" y1="214" x2="90" y2="232" stroke="#f97316" stroke-width="2"/>
  <text x="106" y="226" fill="#64748b" font-size="7">500 kcmil AL XHHW</text>

  <!-- Main Panel -->
  <rect x="10" y="232" width="160" height="170" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="90" y="254" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">42-SPACE PANEL</text>
  <text x="90" y="268" text-anchor="middle" fill="#94a3b8" font-size="8">400A MLO — outdoor NEMA 3R</text>

  <!-- Breaker slots (left column) -->
  <rect x="87" y="278" width="5" height="80" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="36" y="282" width="48" height="9" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="60" y="289" text-anchor="middle" fill="#fff" font-size="5">20A GFCI</text>
  <rect x="36" y="294" width="48" height="9" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="60" y="301" text-anchor="middle" fill="#fff" font-size="5">20A GFCI</text>
  <rect x="36" y="306" width="48" height="9" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="60" y="313" text-anchor="middle" fill="#fff" font-size="5">20A GFCI</text>
  <rect x="36" y="318" width="48" height="9" rx="2" fill="#22c55e" opacity="0.85"/>
  <text x="60" y="325" text-anchor="middle" fill="#fff" font-size="5">30A 2P</text>
  <rect x="36" y="330" width="48" height="9" rx="2" fill="#a855f7" opacity="0.85"/>
  <text x="60" y="337" text-anchor="middle" fill="#fff" font-size="5">50A 2P</text>

  <!-- Right column -->
  <rect x="95" y="282" width="48" height="9" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="119" y="289" text-anchor="middle" fill="#fff" font-size="5">20A GFCI</text>
  <rect x="95" y="294" width="48" height="9" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="119" y="301" text-anchor="middle" fill="#fff" font-size="5">20A GFCI</text>
  <rect x="95" y="306" width="48" height="9" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="119" y="313" text-anchor="middle" fill="#fff" font-size="5">20A GFCI</text>
  <rect x="95" y="318" width="48" height="9" rx="2" fill="#22c55e" opacity="0.85"/>
  <text x="119" y="325" text-anchor="middle" fill="#fff" font-size="5">30A 2P</text>
  <rect x="95" y="330" width="48" height="9" rx="2" fill="#334155"/>
  <rect x="95" y="342" width="48" height="9" rx="2" fill="#334155"/>

  <text x="90" y="380" text-anchor="middle" fill="#64748b" font-size="7">ALL 120V outlets GFCI — NEC 590.6</text>
  <text x="90" y="392" text-anchor="middle" fill="#64748b" font-size="7">42 spaces for expansion</text>

  <!-- Site Distribution (right side) -->
  <rect x="190" y="170" width="140" height="100" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="260" y="190" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">SITE DISTRIBUTION</text>
  <text x="260" y="206" text-anchor="middle" fill="#475569" font-size="7">120V receptacles (tools)</text>
  <text x="260" y="218" text-anchor="middle" fill="#475569" font-size="7">240V welders / compressors</text>
  <text x="260" y="230" text-anchor="middle" fill="#475569" font-size="7">Crane disconnect feed</text>
  <text x="260" y="242" text-anchor="middle" fill="#475569" font-size="7">Temp lighting strings</text>
  <text x="260" y="254" text-anchor="middle" fill="#475569" font-size="7">Job trailers / security</text>

  <!-- Spider boxes note -->
  <rect x="190" y="284" width="140" height="44" rx="4" fill="#1e293b" stroke="#eab308" stroke-width="1"/>
  <text x="260" y="302" text-anchor="middle" fill="#eab308" font-size="8" font-weight="bold">SPIDER BOXES</text>
  <text x="260" y="316" text-anchor="middle" fill="#475569" font-size="7">Portable GFCI distribution</text>
  <text x="260" y="326" text-anchor="middle" fill="#475569" font-size="7">at work zones — NEC 590.6</text>

  <!-- Grounding System -->
  <line x1="10" y1="370" x2="10" y2="460" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="4" y="460" width="12" height="30" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="30" y="460" width="12" height="30" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="10" y1="475" x2="36" y2="475" stroke="#22c55e" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="52" y="472" fill="#22c55e" font-size="7">2x GROUND RODS</text>
  <text x="52" y="484" fill="#475569" font-size="7">6 ft apart min — NEC 250.53</text>
  <text x="52" y="496" fill="#475569" font-size="7">4 AWG bare Cu GEC</text>

  <!-- Legend -->
  <rect x="10" y="580" width="320" height="84" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="598" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="606" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="614" fill="#64748b" font-size="8">GFCI breaker (20A)</text>
  <rect x="190" y="606" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="208" y="614" fill="#64748b" font-size="8">240V 2-pole (30A)</text>
  <rect x="22" y="622" width="12" height="8" rx="1" fill="#a855f7" opacity="0.85"/>
  <text x="40" y="630" fill="#64748b" font-size="8">240V 2-pole (50A)</text>
  <rect x="190" y="622" width="12" height="8" rx="1" fill="#ef4444" opacity="0.9"/>
  <text x="208" y="630" fill="#64748b" font-size="8">400A main disconnect</text>
  <rect x="22" y="638" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="646" fill="#64748b" font-size="8">Meter socket (utility)</text>
  <line x1="190" y1="642" x2="202" y2="642" stroke="#22c55e" stroke-width="1.5"/>
  <text x="208" y="646" fill="#64748b" font-size="8">Grounding system</text>
  <text x="14" y="674" fill="#475569" font-size="7">DATA CENTER TEMP POWER — PHASE 1 — NOT TO SCALE</text>
</svg>`;
