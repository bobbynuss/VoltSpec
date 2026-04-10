export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 780" font-family="Arial, sans-serif">
  <rect width="340" height="780" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">DATA CENTER — FINAL FIT-OUT &amp; COMMISSIONING</text>

  <!-- Rack Layout Section -->
  <rect x="20" y="42" width="300" height="130" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="60" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="bold">DATA HALL — FINAL RACK LAYOUT</text>

  <!-- Row A -->
  <text x="30" y="78" fill="#94a3b8" font-size="6">ROW A</text>
  <rect x="55" y="70" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="80" y="70" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="105" y="70" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="130" y="70" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <text x="163" y="88" fill="#475569" font-size="8">···</text>
  <rect x="178" y="70" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="203" y="70" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="228" y="70" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="253" y="70" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="278" y="70" width="22" height="30" rx="1" fill="#22d3ee" stroke="#22d3ee" stroke-width="0.6" fill-opacity="0.15"/>
  <text x="289" y="88" text-anchor="middle" fill="#22d3ee" font-size="4.5">NET</text>

  <!-- Hot aisle -->
  <rect x="55" y="103" width="245" height="12" rx="1" fill="#ef4444" fill-opacity="0.08"/>
  <text x="170" y="112" text-anchor="middle" fill="#ef4444" font-size="5.5">HOT AISLE (containment)</text>

  <!-- Row B -->
  <text x="30" y="130" fill="#94a3b8" font-size="6">ROW B</text>
  <rect x="55" y="118" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="80" y="118" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="105" y="118" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="130" y="118" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <text x="163" y="136" fill="#475569" font-size="8">···</text>
  <rect x="178" y="118" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="203" y="118" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="228" y="118" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="253" y="118" width="22" height="30" rx="1" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <rect x="278" y="118" width="22" height="30" rx="1" fill="#22d3ee" stroke="#22d3ee" stroke-width="0.6" fill-opacity="0.15"/>
  <text x="289" y="136" text-anchor="middle" fill="#22d3ee" font-size="4.5">NET</text>

  <text x="170" y="162" text-anchor="middle" fill="#94a3b8" font-size="5.5">42U server racks + end-of-row network racks — seismic rated, hot/cold aisle containment</text>

  <!-- Labeling Section -->
  <rect x="20" y="180" width="300" height="80" rx="4" fill="#1e293b" stroke="#4ade80" stroke-width="1"/>
  <text x="170" y="198" text-anchor="middle" fill="#4ade80" font-size="9" font-weight="bold">LABELING &amp; IDENTIFICATION</text>

  <rect x="32" y="208" width="85" height="40" rx="2" fill="#0f172a" stroke="#4ade80" stroke-width="0.6"/>
  <text x="75" y="222" text-anchor="middle" fill="#4ade80" font-size="6" font-weight="bold">CIRCUIT ID</text>
  <text x="75" y="232" text-anchor="middle" fill="#94a3b8" font-size="5">Panel-circuit on</text>
  <text x="75" y="240" text-anchor="middle" fill="#94a3b8" font-size="5">every whip + cable</text>

  <rect x="127" y="208" width="85" height="40" rx="2" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <text x="170" y="222" text-anchor="middle" fill="#f59e0b" font-size="6" font-weight="bold">ARC FLASH</text>
  <text x="170" y="232" text-anchor="middle" fill="#94a3b8" font-size="5">NFPA 70E labels</text>
  <text x="170" y="240" text-anchor="middle" fill="#94a3b8" font-size="5">on every panel/PDU</text>

  <rect x="222" y="208" width="85" height="40" rx="2" fill="#0f172a" stroke="#a78bfa" stroke-width="0.6"/>
  <text x="265" y="222" text-anchor="middle" fill="#a78bfa" font-size="6" font-weight="bold">A/B COLOR</text>
  <text x="265" y="232" text-anchor="middle" fill="#94a3b8" font-size="5">Orange = A feed</text>
  <text x="265" y="240" text-anchor="middle" fill="#94a3b8" font-size="5">Blue = B feed</text>

  <!-- Commissioning Flow -->
  <rect x="20" y="275" width="300" height="195" rx="4" fill="#1e293b" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="170" y="293" text-anchor="middle" fill="#a78bfa" font-size="9" font-weight="bold">COMMISSIONING SEQUENCE</text>

  <!-- Step 1 -->
  <rect x="35" y="305" width="270" height="22" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
  <text x="45" y="319" fill="#f59e0b" font-size="7" font-weight="bold">1</text>
  <text x="60" y="319" fill="#94a3b8" font-size="6.5">Insulation resistance (megger) test — all feeders and branch circuits</text>

  <!-- Step 2 -->
  <rect x="35" y="332" width="270" height="22" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
  <text x="45" y="346" fill="#f59e0b" font-size="7" font-weight="bold">2</text>
  <text x="60" y="346" fill="#94a3b8" font-size="6.5">Switchgear + breaker functional test — open/close, trip, ZSI verify</text>

  <!-- Step 3 -->
  <rect x="35" y="359" width="270" height="22" rx="3" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
  <text x="45" y="373" fill="#ef4444" font-size="7" font-weight="bold">3</text>
  <text x="60" y="373" fill="#94a3b8" font-size="6.5">Generator load bank test — 4 hr full load, 2 hr 110% overload</text>

  <!-- Step 4 -->
  <rect x="35" y="386" width="270" height="22" rx="3" fill="#0f172a" stroke="#22d3ee" stroke-width="0.8"/>
  <text x="45" y="400" fill="#22d3ee" font-size="7" font-weight="bold">4</text>
  <text x="60" y="400" fill="#94a3b8" font-size="6.5">UPS + battery discharge test — verify runtime meets design spec</text>

  <!-- Step 5 -->
  <rect x="35" y="413" width="270" height="22" rx="3" fill="#0f172a" stroke="#4ade80" stroke-width="0.8"/>
  <text x="45" y="427" fill="#4ade80" font-size="7" font-weight="bold">5</text>
  <text x="60" y="427" fill="#94a3b8" font-size="6.5">Integrated systems test (IST) — simulated utility failure end-to-end</text>

  <!-- Step 6 -->
  <rect x="35" y="440" width="270" height="22" rx="3" fill="#0f172a" stroke="#a78bfa" stroke-width="0.8"/>
  <text x="45" y="454" fill="#a78bfa" font-size="7" font-weight="bold">6</text>
  <text x="60" y="454" fill="#94a3b8" font-size="6.5">A/B redundancy test — drop each feed, verify zero downtime</text>

  <!-- As-Built Section -->
  <rect x="20" y="485" width="300" height="55" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="503" text-anchor="middle" fill="#22d3ee" font-size="8" font-weight="bold">AS-BUILT DOCUMENTATION</text>
  <text x="170" y="518" text-anchor="middle" fill="#94a3b8" font-size="6">One-line diagrams, panel schedules, cable schedules, test results</text>
  <text x="170" y="530" text-anchor="middle" fill="#94a3b8" font-size="5.5">Delivered: laminated control room set + digital (PDF + BIM) + O&amp;M manuals</text>

  <!-- Punch List -->
  <rect x="20" y="555" width="300" height="40" rx="4" fill="#1e293b" stroke="#ef4444" stroke-width="1"/>
  <text x="170" y="573" text-anchor="middle" fill="#ef4444" font-size="8" font-weight="bold">PUNCH LIST &amp; FINAL WALKTHROUGH</text>
  <text x="170" y="587" text-anchor="middle" fill="#94a3b8" font-size="6">Owner + engineer + contractor joint inspection → punch items → sign-off → CO</text>

  <!-- Legend -->
  <rect x="20" y="610" width="300" height="50" rx="4" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
  <text x="30" y="624" fill="#64748b" font-size="6" font-weight="bold">COMMISSIONING FLOW — PHASES 1–7 COMPLETE</text>
  <text x="30" y="636" fill="#f59e0b" font-size="6">■ Electrical testing</text>
  <text x="140" y="636" fill="#ef4444" font-size="6">■ Generator/emergency</text>
  <text x="30" y="648" fill="#22d3ee" font-size="6">■ UPS/critical power</text>
  <text x="140" y="648" fill="#4ade80" font-size="6">■ Integrated systems</text>
  <text x="250" y="648" fill="#a78bfa" font-size="6">■ Redundancy</text>
  <text x="30" y="658" fill="#64748b" font-size="5">All 7 phases must pass commissioning before Certificate of Occupancy is issued.</text>
</svg>`;
