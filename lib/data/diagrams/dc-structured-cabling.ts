export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 780" font-family="Arial, sans-serif">
  <rect width="340" height="780" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">DATA CENTER — STRUCTURED CABLING &amp; FIBER</text>

  <!-- MDA / Main Distribution Area -->
  <rect x="30" y="42" width="280" height="70" rx="4" fill="#1e293b" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="170" y="60" text-anchor="middle" fill="#a78bfa" font-size="9" font-weight="bold">MAIN DISTRIBUTION AREA (MDA)</text>
  <text x="170" y="75" text-anchor="middle" fill="#94a3b8" font-size="6.5">Core routers + switches + fiber patch panels (576-port)</text>
  <text x="170" y="88" text-anchor="middle" fill="#94a3b8" font-size="6">OS2 single-mode trunks to IDA + meet-me room</text>

  <!-- Entrance Room -->
  <rect x="240" y="120" width="80" height="35" rx="3" fill="none" stroke="#f97316" stroke-width="1"/>
  <text x="280" y="135" text-anchor="middle" fill="#f97316" font-size="6" font-weight="bold">ENTRANCE</text>
  <text x="280" y="147" text-anchor="middle" fill="#94a3b8" font-size="5">Carrier demarcation</text>
  <line x1="240" y1="137" x2="210" y2="105" stroke="#f97316" stroke-width="0.8" stroke-dasharray="3,2"/>

  <!-- Fiber backbone arrows to HDAs -->
  <line x1="100" y1="112" x2="100" y2="165" stroke="#a78bfa" stroke-width="1.5"/>
  <line x1="240" y1="112" x2="240" y2="165" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="60" y="142" fill="#a78bfa" font-size="5.5">OM4 MPO/MTP</text>
  <text x="60" y="150" fill="#a78bfa" font-size="5.5">fiber trunk</text>
  <text x="200" y="142" fill="#a78bfa" font-size="5.5">OM4 MPO/MTP</text>
  <text x="200" y="150" fill="#a78bfa" font-size="5.5">fiber trunk</text>

  <!-- HDA-A -->
  <rect x="30" y="165" width="120" height="55" rx="4" fill="none" stroke="#22d3ee" stroke-width="1.5"/>
  <text x="90" y="183" text-anchor="middle" fill="#22d3ee" font-size="8" font-weight="bold">HDA-A</text>
  <text x="90" y="196" text-anchor="middle" fill="#94a3b8" font-size="6">Leaf switches</text>
  <text x="90" y="208" text-anchor="middle" fill="#94a3b8" font-size="5.5">96-port fiber + 48-port Cu panels</text>

  <!-- HDA-B -->
  <rect x="190" y="165" width="120" height="55" rx="4" fill="none" stroke="#22d3ee" stroke-width="1.5"/>
  <text x="250" y="183" text-anchor="middle" fill="#22d3ee" font-size="8" font-weight="bold">HDA-B</text>
  <text x="250" y="196" text-anchor="middle" fill="#94a3b8" font-size="6">Leaf switches</text>
  <text x="250" y="208" text-anchor="middle" fill="#94a3b8" font-size="5.5">96-port fiber + 48-port Cu panels</text>

  <!-- Horizontal cabling drops -->
  <line x1="50" y1="220" x2="50" y2="270" stroke="#4ade80" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="90" y1="220" x2="90" y2="270" stroke="#4ade80" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="130" y1="220" x2="130" y2="270" stroke="#4ade80" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="210" y1="220" x2="210" y2="270" stroke="#4ade80" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="250" y1="220" x2="250" y2="270" stroke="#4ade80" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="290" y1="220" x2="290" y2="270" stroke="#4ade80" stroke-width="0.8" stroke-dasharray="3,2"/>

  <text x="170" y="248" text-anchor="middle" fill="#4ade80" font-size="6">Cat6A horizontal runs to racks</text>

  <!-- Cable Pathway Section -->
  <rect x="30" y="270" width="280" height="50" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="288" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="bold">CABLE PATHWAY</text>
  <text x="170" y="302" text-anchor="middle" fill="#94a3b8" font-size="6">Overhead: 18" fiber tray + 24" copper tray (separated)</text>
  <text x="170" y="313" text-anchor="middle" fill="#94a3b8" font-size="5.5">Under-floor: wire mesh tray for horizontal copper runs to racks</text>

  <!-- Rack Row Detail -->
  <rect x="30" y="335" width="280" height="140" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="353" text-anchor="middle" fill="#64748b" font-size="8" font-weight="bold">DATA HALL — RACK ROW DETAIL</text>

  <!-- Top-of-Rack switches -->
  <rect x="42" y="362" width="256" height="28" rx="3" fill="#0f172a" stroke="#22d3ee" stroke-width="0.8"/>
  <text x="170" y="377" text-anchor="middle" fill="#22d3ee" font-size="7" font-weight="bold">TOP-OF-RACK SWITCHES (ToR)</text>
  <text x="170" y="386" text-anchor="middle" fill="#94a3b8" font-size="5">OM4 uplinks to HDA + Cat6A downlinks to servers</text>

  <!-- Patch panels in rack -->
  <rect x="42" y="395" width="256" height="22" rx="2" fill="#0f172a" stroke="#a78bfa" stroke-width="0.6"/>
  <text x="170" y="409" text-anchor="middle" fill="#a78bfa" font-size="6">FIBER PATCH PANEL (LC duplex) + COPPER PATCH PANEL (RJ45)</text>

  <!-- Servers -->
  <rect x="42" y="422" width="50" height="38" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="0.5"/>
  <text x="67" y="438" text-anchor="middle" fill="#64748b" font-size="5.5">SERVER</text>
  <text x="67" y="448" text-anchor="middle" fill="#4ade80" font-size="4.5">Cat6A</text>
  <text x="67" y="455" text-anchor="middle" fill="#a78bfa" font-size="4.5">LC fiber</text>

  <rect x="100" y="422" width="50" height="38" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="0.5"/>
  <text x="125" y="438" text-anchor="middle" fill="#64748b" font-size="5.5">SERVER</text>
  <text x="125" y="448" text-anchor="middle" fill="#4ade80" font-size="4.5">Cat6A</text>
  <text x="125" y="455" text-anchor="middle" fill="#a78bfa" font-size="4.5">LC fiber</text>

  <text x="170" y="444" text-anchor="middle" fill="#475569" font-size="10">···</text>

  <rect x="192" y="422" width="50" height="38" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="0.5"/>
  <text x="217" y="438" text-anchor="middle" fill="#64748b" font-size="5.5">SERVER</text>
  <text x="217" y="448" text-anchor="middle" fill="#4ade80" font-size="4.5">Cat6A</text>
  <text x="217" y="455" text-anchor="middle" fill="#a78bfa" font-size="4.5">LC fiber</text>

  <rect x="250" y="422" width="50" height="38" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="0.5"/>
  <text x="275" y="438" text-anchor="middle" fill="#64748b" font-size="5.5">STORAGE</text>
  <text x="275" y="448" text-anchor="middle" fill="#4ade80" font-size="4.5">Cat6A</text>
  <text x="275" y="455" text-anchor="middle" fill="#a78bfa" font-size="4.5">LC fiber</text>

  <!-- Cable Management -->
  <rect x="30" y="490" width="280" height="45" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="508" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="bold">CABLE MANAGEMENT</text>
  <text x="170" y="522" text-anchor="middle" fill="#94a3b8" font-size="6">Vertical managers (every rack) + horizontal managers (every 1U) + velcro ties</text>
  <text x="170" y="530" text-anchor="middle" fill="#94a3b8" font-size="5.5">Bend radius compliance: fiber ≥ 10x OD, Cat6A ≥ 4x OD</text>

  <!-- Testing Section -->
  <rect x="30" y="550" width="280" height="45" rx="4" fill="#1e293b" stroke="#4ade80" stroke-width="1"/>
  <text x="170" y="568" text-anchor="middle" fill="#4ade80" font-size="8" font-weight="bold">TESTING &amp; CERTIFICATION</text>
  <text x="170" y="582" text-anchor="middle" fill="#94a3b8" font-size="6">Fiber: OTDR + insertion loss per TIA-568. Copper: Fluke DSX per channel limits.</text>
  <text x="170" y="590" text-anchor="middle" fill="#94a3b8" font-size="5.5">100% of links tested and certified — results delivered in electronic database</text>

  <!-- Grounding -->
  <rect x="30" y="610" width="280" height="35" rx="4" fill="#1e293b" stroke="#4ade80" stroke-width="0.8"/>
  <text x="170" y="627" text-anchor="middle" fill="#4ade80" font-size="7" font-weight="bold">TELECOM BONDING &amp; GROUNDING (TBB)</text>
  <text x="170" y="639" text-anchor="middle" fill="#94a3b8" font-size="5.5">TBB from TMGB to each rack row TGB — #6 Cu insulated green per TIA-607-C</text>

  <!-- Legend -->
  <rect x="30" y="660" width="280" height="50" rx="4" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
  <text x="40" y="674" fill="#64748b" font-size="6" font-weight="bold">STRUCTURED CABLING TOPOLOGY — TIA-942</text>
  <text x="40" y="686" fill="#a78bfa" font-size="6">■ Fiber (OM4/OS2)</text>
  <text x="150" y="686" fill="#4ade80" font-size="6">■ Cat6A copper</text>
  <text x="250" y="686" fill="#f59e0b" font-size="6">■ Pathways</text>
  <text x="40" y="698" fill="#64748b" font-size="5.5">MDA = Main Distribution Area, HDA = Horizontal Distribution Area, ToR = Top of Rack</text>
  <text x="40" y="706" fill="#64748b" font-size="5.5">Redundant paths: dual fiber trunks MDA→HDA, dual uplinks per ToR switch</text>
</svg>`;
