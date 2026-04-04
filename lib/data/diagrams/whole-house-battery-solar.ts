export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">BATTERY STORAGE + SOLAR INTERCONNECT</text>

  <!-- Utility -->
  <text x="80" y="50" text-anchor="middle" fill="#64748b" font-size="9">UTILITY (AE)</text>
  <line x1="80" y1="56" x2="80" y2="80" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Solar array -->
  <rect x="200" y="38" width="120" height="36" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="260" y="56" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="bold">SOLAR PV ARRAY</text>
  <text x="260" y="68" text-anchor="middle" fill="#475569" font-size="7">Rooftop modules</text>

  <!-- Solar inverter -->
  <line x1="260" y1="74" x2="260" y2="100" stroke="#f59e0b" stroke-width="1.5"/>
  <rect x="210" y="100" width="100" height="44" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="260" y="118" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="bold">SOLAR INVERTER</text>
  <text x="260" y="132" text-anchor="middle" fill="#475569" font-size="7">Rapid shutdown req'd</text>

  <!-- Meter -->
  <rect x="30" y="80" width="100" height="50" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="80" y="100" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">METER</text>
  <text x="80" y="114" text-anchor="middle" fill="#475569" font-size="7">Bidirectional / net meter</text>

  <!-- Production meter -->
  <rect x="210" y="156" width="100" height="36" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="260" y="172" text-anchor="middle" fill="#f59e0b" font-size="8">PRODUCTION METER</text>
  <text x="260" y="184" text-anchor="middle" fill="#475569" font-size="7">(if req'd by utility)</text>
  <line x1="260" y1="144" x2="260" y2="156" stroke="#f59e0b" stroke-width="1.5"/>

  <!-- Gateway -->
  <line x1="80" y1="130" x2="80" y2="160" stroke="#facc15" stroke-width="2"/>
  <line x1="260" y1="192" x2="260" y2="210" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="260" y1="210" x2="170" y2="210" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="80" y1="210" x2="170" y2="210" stroke="#facc15" stroke-width="2"/>
  <line x1="80" y1="160" x2="80" y2="210" stroke="#facc15" stroke-width="2"/>

  <rect x="50" y="210" width="240" height="60" rx="4" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
  <text x="170" y="232" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold">TESLA GATEWAY 3</text>
  <text x="170" y="248" text-anchor="middle" fill="#94a3b8" font-size="8">Automatic transfer switch + system controller</text>
  <text x="170" y="262" text-anchor="middle" fill="#475569" font-size="7">Manages grid / battery / solar transitions</text>

  <!-- Split to main panel and battery -->
  <line x1="170" y1="270" x2="170" y2="290" stroke="#facc15" stroke-width="2"/>
  <line x1="86" y1="290" x2="254" y2="290" stroke="#facc15" stroke-width="2"/>
  <line x1="86" y1="290" x2="86" y2="310" stroke="#facc15" stroke-width="2"/>
  <line x1="254" y1="290" x2="254" y2="310" stroke="#22d3ee" stroke-width="2"/>

  <!-- Main Panel -->
  <rect x="16" y="310" width="140" height="110" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="86" y="330" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">MAIN PANEL</text>
  <text x="86" y="346" text-anchor="middle" fill="#94a3b8" font-size="8">200A CH series</text>
  <!-- Breaker slots -->
  <rect x="83.5" y="356" width="5" height="36" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="56" y="358" width="25" height="8" rx="1.5" fill="#334155"/>
  <rect x="91" y="358" width="25" height="8" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="56" y="370" width="25" height="8" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="91" y="370" width="25" height="8" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="56" y="382" width="25" height="8" rx="1.5" fill="#f59e0b" opacity="0.85"/>
  <rect x="91" y="382" width="25" height="8" rx="1.5" fill="#334155"/>
  <text x="86" y="408" text-anchor="middle" fill="#475569" font-size="7">Solar backfeed breaker</text>

  <!-- Battery -->
  <rect x="184" y="310" width="140" height="110" rx="3" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
  <text x="254" y="330" text-anchor="middle" fill="#22d3ee" font-size="10" font-weight="bold">POWERWALL 3</text>
  <text x="254" y="346" text-anchor="middle" fill="#94a3b8" font-size="8">13.5 kWh + inverter</text>
  <rect x="224" y="358" width="60" height="30" rx="4" fill="#22d3ee" opacity="0.15" stroke="#22d3ee" stroke-width="1"/>
  <text x="254" y="376" text-anchor="middle" fill="#22d3ee" font-size="9">⚡ BATTERY</text>
  <text x="254" y="408" text-anchor="middle" fill="#475569" font-size="7">UL 9540 listed</text>

  <!-- Critical loads subpanel -->
  <line x1="86" y1="420" x2="86" y2="450" stroke="#facc15" stroke-width="1.5"/>
  <rect x="26" y="450" width="120" height="56" rx="3" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
  <text x="86" y="470" text-anchor="middle" fill="#a855f7" font-size="9" font-weight="bold">CRITICAL LOADS</text>
  <text x="86" y="484" text-anchor="middle" fill="#94a3b8" font-size="8">Subpanel — backed up</text>
  <text x="86" y="496" text-anchor="middle" fill="#475569" font-size="7">Fridge, lights, network, security</text>

  <!-- Grounding -->
  <line x1="170" y1="420" x2="170" y2="444" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="170" y1="444" x2="254" y2="444" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="254" y1="420" x2="254" y2="444" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="170" y1="444" x2="170" y2="466" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="158" y="466" width="12" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="178" y="466" width="12" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="210" y="480" fill="#22c55e" font-size="7">GND RODS</text>

  <!-- Legend -->
  <rect x="10" y="504" width="320" height="80" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="520" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="528" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="536" fill="#64748b" font-size="9">Grid / Panel</text>
  <rect x="120" y="528" width="12" height="8" rx="1" fill="#22d3ee" opacity="0.85"/>
  <text x="138" y="536" fill="#64748b" font-size="9">Battery / Gateway</text>
  <rect x="240" y="528" width="12" height="8" rx="1" fill="#f59e0b" opacity="0.85"/>
  <text x="258" y="536" fill="#64748b" font-size="9">Solar PV</text>
  <rect x="22" y="546" width="12" height="8" rx="1" fill="#a855f7" opacity="0.85"/>
  <text x="40" y="554" fill="#64748b" font-size="9">Critical loads</text>
  <line x1="120" y1="550" x2="132" y2="550" stroke="#22c55e" stroke-width="1.5"/>
  <text x="138" y="554" fill="#64748b" font-size="9">Grounding</text>
  <line x1="240" y1="550" x2="252" y2="550" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="554" fill="#64748b" font-size="9">Utility</text>

  <text x="170" y="578" text-anchor="middle" fill="#475569" font-size="7">NEC 690.12 rapid shutdown + NEC 706 ESS requirements</text>
  <text x="14" y="676" fill="#475569" font-size="7">BATTERY + SOLAR INTERCONNECT - NOT TO SCALE</text>
</svg>`;
