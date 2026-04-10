export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 820" font-family="Arial, sans-serif">
  <rect width="340" height="820" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">DATA CENTER — GENERATOR / UPS / CRITICAL POWER</text>

  <!-- Normal Power Feed (from Phase 3) -->
  <rect x="20" y="42" width="130" height="40" rx="4" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="85" y="58" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="bold">UTILITY FEED</text>
  <text x="85" y="72" text-anchor="middle" fill="#94a3b8" font-size="6">From Main Switchgear (Ph3)</text>

  <!-- Generator(s) -->
  <rect x="190" y="42" width="130" height="55" rx="4" fill="none" stroke="#ef4444" stroke-width="1.5"/>
  <text x="255" y="58" text-anchor="middle" fill="#ef4444" font-size="8" font-weight="bold">GENERATORS</text>
  <text x="255" y="72" text-anchor="middle" fill="#94a3b8" font-size="6.5">2MW diesel gensets (N+1)</text>
  <text x="255" y="84" text-anchor="middle" fill="#94a3b8" font-size="5.5">480/277V 3PH — outdoor encl.</text>

  <!-- Fuel System -->
  <rect x="260" y="105" width="60" height="30" rx="3" fill="none" stroke="#f97316" stroke-width="1"/>
  <text x="290" y="118" text-anchor="middle" fill="#f97316" font-size="6">FUEL</text>
  <text x="290" y="128" text-anchor="middle" fill="#94a3b8" font-size="5">Day tank + main</text>

  <!-- Lines to ATS/Paralleling -->
  <line x1="85" y1="82" x2="85" y2="145" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="255" y1="97" x2="255" y2="145" stroke="#ef4444" stroke-width="1.5"/>

  <!-- Paralleling Switchgear -->
  <rect x="30" y="145" width="280" height="55" rx="4" fill="#1e293b" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="170" y="165" text-anchor="middle" fill="#a78bfa" font-size="9" font-weight="bold">PARALLELING SWITCHGEAR</text>
  <text x="170" y="180" text-anchor="middle" fill="#94a3b8" font-size="7">ATS + gen paralleling + load management</text>
  <text x="170" y="192" text-anchor="middle" fill="#94a3b8" font-size="6">Eaton ATC-900 / Magnum — 4000A, 480V, 65kAIC</text>

  <text x="55" y="142" fill="#f59e0b" font-size="6">NORMAL</text>
  <text x="230" y="142" fill="#ef4444" font-size="6">EMERGENCY</text>

  <!-- Lines down to UPS -->
  <line x1="170" y1="200" x2="170" y2="230" stroke="#475569" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- UPS Systems -->
  <rect x="30" y="230" width="280" height="90" rx="4" fill="#1e293b" stroke="#4ade80" stroke-width="1.5"/>
  <text x="170" y="250" text-anchor="middle" fill="#4ade80" font-size="9" font-weight="bold">UPS SYSTEMS</text>
  <text x="170" y="265" text-anchor="middle" fill="#94a3b8" font-size="7">Modular UPS — 500kVA per module, N+1 redundancy</text>

  <!-- UPS modules -->
  <rect x="45" y="275" width="60" height="32" rx="2" fill="#0f172a" stroke="#4ade80" stroke-width="0.8"/>
  <text x="75" y="290" text-anchor="middle" fill="#4ade80" font-size="6">UPS-A</text>
  <text x="75" y="300" text-anchor="middle" fill="#94a3b8" font-size="5">500kVA</text>

  <rect x="115" y="275" width="60" height="32" rx="2" fill="#0f172a" stroke="#4ade80" stroke-width="0.8"/>
  <text x="145" y="290" text-anchor="middle" fill="#4ade80" font-size="6">UPS-B</text>
  <text x="145" y="300" text-anchor="middle" fill="#94a3b8" font-size="5">500kVA</text>

  <rect x="185" y="275" width="60" height="32" rx="2" fill="#0f172a" stroke="#4ade80" stroke-width="0.8"/>
  <text x="215" y="290" text-anchor="middle" fill="#4ade80" font-size="6">UPS-N</text>
  <text x="215" y="300" text-anchor="middle" fill="#94a3b8" font-size="5">500kVA</text>

  <rect x="255" y="275" width="45" height="32" rx="2" fill="#0f172a" stroke="#a78bfa" stroke-width="0.8"/>
  <text x="278" y="290" text-anchor="middle" fill="#a78bfa" font-size="6">+1</text>
  <text x="278" y="300" text-anchor="middle" fill="#94a3b8" font-size="5">Spare</text>

  <!-- Battery Section -->
  <rect x="30" y="335" width="280" height="55" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="170" y="353" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="bold">BATTERY STRINGS</text>
  <text x="170" y="368" text-anchor="middle" fill="#94a3b8" font-size="7">VRLA or Li-ion — 15 min runtime at full load per string</text>
  <text x="170" y="380" text-anchor="middle" fill="#94a3b8" font-size="6">Dedicated battery room with ventilation, H₂ detection, spill containment</text>

  <!-- Lines to PDUs -->
  <line x1="100" y1="390" x2="100" y2="420" stroke="#4ade80" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="240" y1="390" x2="240" y2="420" stroke="#4ade80" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- PDU Level -->
  <rect x="30" y="420" width="280" height="80" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="438" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="bold">POWER DISTRIBUTION UNITS (PDUs)</text>

  <rect x="42" y="448" width="80" height="38" rx="3" fill="#0f172a" stroke="#22d3ee" stroke-width="0.8"/>
  <text x="82" y="464" text-anchor="middle" fill="#22d3ee" font-size="7" font-weight="bold">PDU-A1</text>
  <text x="82" y="476" text-anchor="middle" fill="#94a3b8" font-size="5">225kVA, 480→208/120</text>
  <text x="82" y="484" text-anchor="middle" fill="#94a3b8" font-size="4.5">42-ckt RPP</text>

  <rect x="130" y="448" width="80" height="38" rx="3" fill="#0f172a" stroke="#22d3ee" stroke-width="0.8"/>
  <text x="170" y="464" text-anchor="middle" fill="#22d3ee" font-size="7" font-weight="bold">PDU-A2</text>
  <text x="170" y="476" text-anchor="middle" fill="#94a3b8" font-size="5">225kVA, 480→208/120</text>
  <text x="170" y="484" text-anchor="middle" fill="#94a3b8" font-size="4.5">42-ckt RPP</text>

  <rect x="218" y="448" width="80" height="38" rx="3" fill="#0f172a" stroke="#22d3ee" stroke-width="0.8"/>
  <text x="258" y="464" text-anchor="middle" fill="#22d3ee" font-size="7" font-weight="bold">PDU-B1</text>
  <text x="258" y="476" text-anchor="middle" fill="#94a3b8" font-size="5">225kVA, 480→208/120</text>
  <text x="258" y="484" text-anchor="middle" fill="#94a3b8" font-size="4.5">42-ckt RPP</text>

  <!-- Arrows to server rows -->
  <line x1="82" y1="500" x2="82" y2="530" stroke="#22d3ee" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="170" y1="500" x2="170" y2="530" stroke="#22d3ee" stroke-width="0.8" stroke-dasharray="3,2"/>
  <line x1="258" y1="500" x2="258" y2="530" stroke="#22d3ee" stroke-width="0.8" stroke-dasharray="3,2"/>

  <!-- Server Floor -->
  <rect x="30" y="530" width="280" height="40" rx="4" fill="none" stroke="#64748b" stroke-width="1"/>
  <text x="170" y="548" text-anchor="middle" fill="#64748b" font-size="8" font-weight="bold">DATA HALL — SERVER RACKS</text>
  <text x="170" y="562" text-anchor="middle" fill="#475569" font-size="6">A+B feed to each rack (2N redundancy)</text>

  <!-- Exhaust System (Generator) -->
  <rect x="30" y="590" width="280" height="55" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="608" text-anchor="middle" fill="#f97316" font-size="8" font-weight="bold">GENERATOR SUPPORT SYSTEMS</text>
  <text x="170" y="623" text-anchor="middle" fill="#94a3b8" font-size="6.5">Exhaust: critical-grade silencers + stack routing</text>
  <text x="170" y="635" text-anchor="middle" fill="#94a3b8" font-size="6.5">Fuel: main tank → day tank → auto-fill pump + leak detection</text>

  <!-- Legend -->
  <rect x="30" y="660" width="280" height="55" rx="4" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
  <text x="40" y="674" fill="#64748b" font-size="6" font-weight="bold">SINGLE LINE — NOT TO SCALE</text>
  <text x="40" y="686" fill="#f59e0b" font-size="6">■ Normal power</text>
  <text x="120" y="686" fill="#ef4444" font-size="6">■ Emergency/gen</text>
  <text x="220" y="686" fill="#4ade80" font-size="6">■ UPS-protected</text>
  <text x="40" y="698" fill="#22d3ee" font-size="6">■ Critical distribution</text>
  <text x="160" y="698" fill="#a78bfa" font-size="6">■ Redundancy</text>
  <text x="40" y="710" fill="#64748b" font-size="5.5">Generator/UPS sizing per project engineer. All ratings and redundancy levels are typical — verify with design docs.</text>
</svg>`;
