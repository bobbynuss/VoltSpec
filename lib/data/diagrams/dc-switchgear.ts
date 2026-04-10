export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 780" font-family="Arial, sans-serif">
  <rect width="340" height="780" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">DATA CENTER — MAIN SERVICE ENTRANCE / SWITCHGEAR</text>

  <!-- Utility Transformer -->
  <rect x="100" y="42" width="140" height="44" rx="4" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="bold">UTILITY TRANSFORMER</text>
  <text x="170" y="72" text-anchor="middle" fill="#94a3b8" font-size="7">12.47kV → 480/277V 3-Phase</text>
  <text x="170" y="80" text-anchor="middle" fill="#94a3b8" font-size="6">Padmount or unit substation</text>

  <line x1="170" y1="86" x2="170" y2="108" stroke="#475569" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="200" y="100" fill="#64748b" font-size="6">4" RMC risers from duct bank</text>

  <!-- CT Cabinet / Metering -->
  <rect x="80" y="108" width="180" height="50" rx="4" fill="none" stroke="#22d3ee" stroke-width="1.5"/>
  <text x="170" y="126" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="bold">CT CABINET / METERING</text>
  <text x="170" y="140" text-anchor="middle" fill="#94a3b8" font-size="7">Revenue metering CTs + utility meter</text>
  <text x="170" y="150" text-anchor="middle" fill="#94a3b8" font-size="6">3000:5 or 4000:5 CT ratio — verify with utility</text>

  <line x1="170" y1="158" x2="170" y2="178" stroke="#475569" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Main Surge Protection -->
  <rect x="240" y="162" width="80" height="28" rx="3" fill="none" stroke="#a78bfa" stroke-width="1"/>
  <text x="280" y="178" text-anchor="middle" fill="#a78bfa" font-size="7">SPD Type 1</text>
  <text x="280" y="186" text-anchor="middle" fill="#94a3b8" font-size="5.5">Service entrance</text>
  <line x1="240" y1="178" x2="220" y2="190" stroke="#a78bfa" stroke-width="0.8" stroke-dasharray="3,2"/>

  <!-- Main Switchgear -->
  <rect x="30" y="178" width="210" height="90" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
  <text x="135" y="198" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="bold">MAIN SWITCHGEAR</text>
  <text x="135" y="212" text-anchor="middle" fill="#94a3b8" font-size="7">Eaton Pow-R-Line C / Magnum DS</text>
  <text x="135" y="224" text-anchor="middle" fill="#94a3b8" font-size="7">4000A, 480/277V, 3PH, 65kAIC</text>

  <!-- Switchgear sections -->
  <rect x="42" y="232" width="55" height="28" rx="2" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
  <text x="70" y="245" text-anchor="middle" fill="#f59e0b" font-size="6">MAIN BKR</text>
  <text x="70" y="254" text-anchor="middle" fill="#94a3b8" font-size="5">4000A</text>

  <rect x="102" y="232" width="55" height="28" rx="2" fill="#0f172a" stroke="#22d3ee" stroke-width="0.8"/>
  <text x="130" y="245" text-anchor="middle" fill="#22d3ee" font-size="6">DIST 1</text>
  <text x="130" y="254" text-anchor="middle" fill="#94a3b8" font-size="5">1600A</text>

  <rect x="162" y="232" width="55" height="28" rx="2" fill="#0f172a" stroke="#22d3ee" stroke-width="0.8"/>
  <text x="190" y="245" text-anchor="middle" fill="#22d3ee" font-size="6">DIST 2</text>
  <text x="190" y="254" text-anchor="middle" fill="#94a3b8" font-size="5">1600A</text>

  <!-- Bus Duct runs -->
  <line x1="70" y1="268" x2="70" y2="310" stroke="#f59e0b" stroke-width="3"/>
  <line x1="130" y1="268" x2="130" y2="310" stroke="#22d3ee" stroke-width="3"/>
  <line x1="190" y1="268" x2="190" y2="310" stroke="#22d3ee" stroke-width="3"/>
  <text x="250" y="295" fill="#64748b" font-size="6">← Bus duct (busway)</text>
  <text x="250" y="305" fill="#64748b" font-size="6">   1600A–4000A rated</text>

  <!-- Distribution Level -->
  <rect x="30" y="310" width="280" height="120" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="330" text-anchor="middle" fill="#38bdf8" font-size="9" font-weight="bold">DISTRIBUTION LEVEL</text>

  <!-- Distribution panels -->
  <rect x="42" y="340" width="80" height="40" rx="3" fill="#0f172a" stroke="#22d3ee" stroke-width="1"/>
  <text x="82" y="355" text-anchor="middle" fill="#22d3ee" font-size="7" font-weight="bold">MDP-A</text>
  <text x="82" y="367" text-anchor="middle" fill="#94a3b8" font-size="5.5">1600A MLO</text>
  <text x="82" y="375" text-anchor="middle" fill="#94a3b8" font-size="5">Mech/HVAC loads</text>

  <rect x="130" y="340" width="80" height="40" rx="3" fill="#0f172a" stroke="#4ade80" stroke-width="1"/>
  <text x="170" y="355" text-anchor="middle" fill="#4ade80" font-size="7" font-weight="bold">MDP-C</text>
  <text x="170" y="367" text-anchor="middle" fill="#94a3b8" font-size="5.5">1600A MLO</text>
  <text x="170" y="375" text-anchor="middle" fill="#94a3b8" font-size="5">Critical / UPS feed</text>

  <rect x="218" y="340" width="80" height="40" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
  <text x="258" y="355" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="bold">MDP-B</text>
  <text x="258" y="367" text-anchor="middle" fill="#94a3b8" font-size="5.5">1600A MLO</text>
  <text x="258" y="375" text-anchor="middle" fill="#94a3b8" font-size="5">Lighting / gen loads</text>

  <!-- Downstream arrows -->
  <text x="82" y="400" text-anchor="middle" fill="#64748b" font-size="6">↓ to panels</text>
  <text x="170" y="400" text-anchor="middle" fill="#64748b" font-size="6">↓ to UPS/ATS</text>
  <text x="258" y="400" text-anchor="middle" fill="#64748b" font-size="6">↓ to panels</text>

  <!-- Cable Tray Section -->
  <rect x="30" y="418" width="280" height="50" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="436" text-anchor="middle" fill="#94a3b8" font-size="8" font-weight="bold">CABLE TRAY SYSTEM</text>
  <text x="170" y="450" text-anchor="middle" fill="#94a3b8" font-size="6.5">24" ladder tray — overhead runs from switchgear to distribution panels</text>
  <text x="170" y="460" text-anchor="middle" fill="#94a3b8" font-size="6">Supports every 8', splice plates, barrier strips for power/control separation</text>

  <!-- Grounding Section -->
  <rect x="30" y="480" width="280" height="65" rx="4" fill="#1e293b" stroke="#4ade80" stroke-width="1"/>
  <text x="170" y="498" text-anchor="middle" fill="#4ade80" font-size="9" font-weight="bold">GROUNDING & BONDING</text>
  <text x="170" y="514" text-anchor="middle" fill="#94a3b8" font-size="7">Main ground bus: 4/0 bare Cu → building steel + ground grid + Ufer</text>
  <text x="170" y="526" text-anchor="middle" fill="#94a3b8" font-size="7">Equipment ground bus in switchgear + each MDP</text>
  <text x="170" y="538" text-anchor="middle" fill="#94a3b8" font-size="6">Isolated ground system for sensitive IT loads (Phase 4)</text>

  <!-- Legend -->
  <rect x="30" y="558" width="280" height="50" rx="4" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
  <text x="40" y="572" fill="#64748b" font-size="6" font-weight="bold">SINGLE LINE — NOT TO SCALE</text>
  <text x="40" y="584" fill="#f59e0b" font-size="6">■ Main / utility side</text>
  <text x="140" y="584" fill="#22d3ee" font-size="6">■ Distribution</text>
  <text x="230" y="584" fill="#4ade80" font-size="6">■ Critical path</text>
  <text x="40" y="596" fill="#64748b" font-size="5.5">Verify all ratings, AIC, and coordination with project engineer. Switchgear is engineered-to-order.</text>
  <text x="40" y="604" fill="#64748b" font-size="5.5">Phase 4 (Generator/UPS) feeds MDP-C critical bus through ATS.</text>
</svg>`;
