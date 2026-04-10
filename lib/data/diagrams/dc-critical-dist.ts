export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 780" font-family="Arial, sans-serif">
  <rect width="340" height="780" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">DATA CENTER — CRITICAL POWER DISTRIBUTION</text>

  <!-- UPS Output (from Phase 4) -->
  <rect x="90" y="42" width="160" height="40" rx="4" fill="none" stroke="#4ade80" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#4ade80" font-size="9" font-weight="bold">UPS OUTPUT</text>
  <text x="170" y="72" text-anchor="middle" fill="#94a3b8" font-size="6">From Phase 4 — 480/277V protected bus</text>

  <!-- A/B feeds split -->
  <line x1="130" y1="82" x2="90" y2="110" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="210" y1="82" x2="250" y2="110" stroke="#22d3ee" stroke-width="1.5"/>
  <text x="70" y="100" fill="#f59e0b" font-size="7" font-weight="bold">A FEED</text>
  <text x="252" y="100" fill="#22d3ee" font-size="7" font-weight="bold">B FEED</text>

  <!-- Overhead Busway Section -->
  <rect x="20" y="110" width="300" height="60" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="128" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="bold">OVERHEAD BUSWAY (A + B)</text>
  <text x="170" y="142" text-anchor="middle" fill="#94a3b8" font-size="7">Eaton Pow-R-Way III — 800A–1600A copper bus, 2N parallel runs</text>
  <text x="170" y="155" text-anchor="middle" fill="#94a3b8" font-size="6">Tap-off boxes every 10 ft — plug-in feeds to PDUs below</text>

  <!-- Busway visual -->
  <line x1="40" y1="163" x2="300" y2="163" stroke="#f59e0b" stroke-width="3"/>
  <line x1="40" y1="168" x2="300" y2="168" stroke="#22d3ee" stroke-width="3"/>
  <text x="310" y="164" fill="#f59e0b" font-size="5">A</text>
  <text x="310" y="170" fill="#22d3ee" font-size="5">B</text>

  <!-- Tap-off drops -->
  <line x1="80" y1="170" x2="80" y2="200" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="170" y1="170" x2="170" y2="200" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="260" y1="170" x2="260" y2="200" stroke="#22d3ee" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- PDU Row -->
  <rect x="20" y="200" width="300" height="75" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="218" text-anchor="middle" fill="#a78bfa" font-size="9" font-weight="bold">POWER DISTRIBUTION UNITS (PDUs)</text>

  <rect x="32" y="228" width="85" height="36" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
  <text x="75" y="243" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="bold">PDU-A1</text>
  <text x="75" y="255" text-anchor="middle" fill="#94a3b8" font-size="5">300kVA 480→208/120</text>

  <rect x="127" y="228" width="85" height="36" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
  <text x="170" y="243" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="bold">PDU-A2</text>
  <text x="170" y="255" text-anchor="middle" fill="#94a3b8" font-size="5">300kVA 480→208/120</text>

  <rect x="222" y="228" width="85" height="36" rx="3" fill="#0f172a" stroke="#22d3ee" stroke-width="0.8"/>
  <text x="265" y="243" text-anchor="middle" fill="#22d3ee" font-size="7" font-weight="bold">PDU-B1</text>
  <text x="265" y="255" text-anchor="middle" fill="#94a3b8" font-size="5">300kVA 480→208/120</text>

  <!-- RPP Row -->
  <line x1="75" y1="275" x2="75" y2="305" stroke="#f59e0b" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="170" y1="275" x2="170" y2="305" stroke="#f59e0b" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="265" y1="275" x2="265" y2="305" stroke="#22d3ee" stroke-width="0.8" stroke-dasharray="3,2"/>

  <rect x="20" y="305" width="300" height="80" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="323" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="bold">REMOTE POWER PANELS (RPPs)</text>
  <text x="170" y="337" text-anchor="middle" fill="#94a3b8" font-size="6">42–84 circuit panelboards — row-end mounted in data hall</text>

  <!-- RPP boxes -->
  <rect x="32" y="345" width="55" height="28" rx="2" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <text x="60" y="358" text-anchor="middle" fill="#f59e0b" font-size="6">RPP-A1</text>
  <text x="60" y="368" text-anchor="middle" fill="#94a3b8" font-size="4.5">84-ckt</text>

  <rect x="95" y="345" width="55" height="28" rx="2" fill="#0f172a" stroke="#f59e0b" stroke-width="0.6"/>
  <text x="123" y="358" text-anchor="middle" fill="#f59e0b" font-size="6">RPP-A2</text>
  <text x="123" y="368" text-anchor="middle" fill="#94a3b8" font-size="4.5">84-ckt</text>

  <rect x="190" y="345" width="55" height="28" rx="2" fill="#0f172a" stroke="#22d3ee" stroke-width="0.6"/>
  <text x="218" y="358" text-anchor="middle" fill="#22d3ee" font-size="6">RPP-B1</text>
  <text x="218" y="368" text-anchor="middle" fill="#94a3b8" font-size="4.5">84-ckt</text>

  <rect x="253" y="345" width="55" height="28" rx="2" fill="#0f172a" stroke="#22d3ee" stroke-width="0.6"/>
  <text x="281" y="358" text-anchor="middle" fill="#22d3ee" font-size="6">RPP-B2</text>
  <text x="281" y="368" text-anchor="middle" fill="#94a3b8" font-size="4.5">84-ckt</text>

  <!-- Raised Floor Whips -->
  <rect x="20" y="400" width="300" height="50" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="418" text-anchor="middle" fill="#f97316" font-size="8" font-weight="bold">RAISED-FLOOR POWER WHIPS</text>
  <text x="170" y="432" text-anchor="middle" fill="#94a3b8" font-size="6">Pre-terminated 208V 3PH whips — RPP to under-floor routing to rack PDUs</text>
  <text x="170" y="443" text-anchor="middle" fill="#94a3b8" font-size="5.5">Color-coded: ORANGE (A feed) / BLUE (B feed) — 6 ft, 10 ft, 15 ft lengths</text>

  <!-- Whip drops to racks -->
  <line x1="60" y1="450" x2="60" y2="490" stroke="#f97316" stroke-width="0.8" stroke-dasharray="2,2"/>
  <line x1="110" y1="450" x2="110" y2="490" stroke="#f97316" stroke-width="0.8" stroke-dasharray="2,2"/>
  <line x1="170" y1="450" x2="170" y2="490" stroke="#f97316" stroke-width="0.8" stroke-dasharray="2,2"/>
  <line x1="230" y1="450" x2="230" y2="490" stroke="#38bdf8" stroke-width="0.8" stroke-dasharray="2,2"/>
  <line x1="280" y1="450" x2="280" y2="490" stroke="#38bdf8" stroke-width="0.8" stroke-dasharray="2,2"/>

  <!-- Server Rack Row -->
  <rect x="20" y="490" width="300" height="80" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="508" text-anchor="middle" fill="#64748b" font-size="8" font-weight="bold">DATA HALL — SERVER RACK ROW</text>

  <!-- Individual racks -->
  <rect x="35" y="518" width="38" height="40" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="0.5"/>
  <text x="54" y="535" text-anchor="middle" fill="#64748b" font-size="6">RACK</text>
  <text x="54" y="545" text-anchor="middle" fill="#f59e0b" font-size="4.5">A PDU</text>
  <text x="54" y="553" text-anchor="middle" fill="#22d3ee" font-size="4.5">B PDU</text>

  <rect x="83" y="518" width="38" height="40" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="0.5"/>
  <text x="102" y="535" text-anchor="middle" fill="#64748b" font-size="6">RACK</text>
  <text x="102" y="545" text-anchor="middle" fill="#f59e0b" font-size="4.5">A PDU</text>
  <text x="102" y="553" text-anchor="middle" fill="#22d3ee" font-size="4.5">B PDU</text>

  <rect x="131" y="518" width="38" height="40" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="0.5"/>
  <text x="150" y="535" text-anchor="middle" fill="#64748b" font-size="6">RACK</text>
  <text x="150" y="545" text-anchor="middle" fill="#f59e0b" font-size="4.5">A PDU</text>
  <text x="150" y="553" text-anchor="middle" fill="#22d3ee" font-size="4.5">B PDU</text>

  <text x="185" y="542" text-anchor="middle" fill="#475569" font-size="12">···</text>

  <rect x="203" y="518" width="38" height="40" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="0.5"/>
  <text x="222" y="535" text-anchor="middle" fill="#64748b" font-size="6">RACK</text>
  <text x="222" y="545" text-anchor="middle" fill="#f59e0b" font-size="4.5">A PDU</text>
  <text x="222" y="553" text-anchor="middle" fill="#22d3ee" font-size="4.5">B PDU</text>

  <rect x="251" y="518" width="38" height="40" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="0.5"/>
  <text x="270" y="535" text-anchor="middle" fill="#64748b" font-size="6">RACK</text>
  <text x="270" y="545" text-anchor="middle" fill="#f59e0b" font-size="4.5">A PDU</text>
  <text x="270" y="553" text-anchor="middle" fill="#22d3ee" font-size="4.5">B PDU</text>

  <!-- Grounding Section -->
  <rect x="20" y="585" width="300" height="45" rx="4" fill="#1e293b" stroke="#4ade80" stroke-width="1"/>
  <text x="170" y="603" text-anchor="middle" fill="#4ade80" font-size="8" font-weight="bold">ISOLATED GROUND & BONDING</text>
  <text x="170" y="617" text-anchor="middle" fill="#94a3b8" font-size="6">IG bus (green/yellow) from UPS → PDU → RPP → rack ground bar — no parallel paths</text>
  <text x="170" y="627" text-anchor="middle" fill="#94a3b8" font-size="5.5">Rack bonding: #6 Cu from each rack to raised-floor ground grid + overhead bus</text>

  <!-- Legend -->
  <rect x="20" y="645" width="300" height="55" rx="4" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
  <text x="30" y="659" fill="#64748b" font-size="6" font-weight="bold">2N REDUNDANCY — SINGLE LINE</text>
  <text x="30" y="672" fill="#f59e0b" font-size="6">■ A Feed (orange whips)</text>
  <text x="150" y="672" fill="#22d3ee" font-size="6">■ B Feed (blue whips)</text>
  <text x="30" y="684" fill="#a78bfa" font-size="6">■ PDU distribution</text>
  <text x="150" y="684" fill="#4ade80" font-size="6">■ Isolated ground</text>
  <text x="30" y="696" fill="#64748b" font-size="5.5">Each rack receives A+B power via dual rack PDUs. Any single path failure = zero downtime.</text>
</svg>`;
