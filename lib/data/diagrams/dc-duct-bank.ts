export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 780" font-family="Arial, sans-serif">
  <rect width="340" height="780" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">DATA CENTER — UNDERGROUND DUCT BANK / SITE UTILITIES</text>

  <!-- Utility POC -->
  <rect x="110" y="42" width="120" height="36" rx="4" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="170" y="57" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="bold">UTILITY POC</text>
  <text x="170" y="70" text-anchor="middle" fill="#94a3b8" font-size="7">Padmount Transformer Pad</text>

  <!-- Vertical connector -->
  <line x1="170" y1="78" x2="170" y2="100" stroke="#475569" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Main Duct Bank Run -->
  <rect x="30" y="100" width="280" height="160" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="118" text-anchor="middle" fill="#38bdf8" font-size="9" font-weight="bold">MAIN DUCT BANK — CONCRETE ENCASED</text>

  <!-- Cross-section detail -->
  <rect x="50" y="130" width="240" height="80" rx="3" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
  <text x="170" y="145" text-anchor="middle" fill="#94a3b8" font-size="7">CROSS SECTION (typical)</text>

  <!-- Duct bank cross section - 6 conduits in 2x3 grid -->
  <rect x="80" y="155" width="180" height="45" rx="2" fill="#374151" stroke="#6b7280" stroke-width="0.5"/>
  <text x="170" y="150" text-anchor="middle" fill="#64748b" font-size="6">Concrete Encasement (3500 PSI min)</text>

  <!-- Top row conduits -->
  <circle cx="115" cy="170" r="10" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="173" text-anchor="middle" fill="#f59e0b" font-size="5">4" PVC</text>
  <circle cx="170" cy="170" r="10" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="170" y="173" text-anchor="middle" fill="#f59e0b" font-size="5">4" PVC</text>
  <circle cx="225" cy="170" r="10" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="225" y="173" text-anchor="middle" fill="#f59e0b" font-size="5">4" PVC</text>

  <!-- Bottom row conduits -->
  <circle cx="115" cy="190" r="10" fill="none" stroke="#22d3ee" stroke-width="1.5"/>
  <text x="115" y="193" text-anchor="middle" fill="#22d3ee" font-size="5">4" PVC</text>
  <circle cx="170" cy="190" r="10" fill="none" stroke="#22d3ee" stroke-width="1.5"/>
  <text x="170" y="193" text-anchor="middle" fill="#22d3ee" font-size="5">SPARE</text>
  <circle cx="225" cy="190" r="10" fill="none" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="225" y="193" text-anchor="middle" fill="#a78bfa" font-size="5">FIBER</text>

  <!-- Spacer annotations -->
  <text x="60" y="183" text-anchor="middle" fill="#64748b" font-size="5">3" min</text>
  <text x="60" y="193" text-anchor="middle" fill="#64748b" font-size="5">spacing</text>

  <!-- Depth annotation -->
  <text x="280" y="168" text-anchor="start" fill="#64748b" font-size="6">↕ 24" min</text>
  <text x="280" y="178" text-anchor="start" fill="#64748b" font-size="6">cover</text>

  <!-- Warning tape -->
  <line x1="80" y1="212" x2="260" y2="212" stroke="#ef4444" stroke-width="1" stroke-dasharray="6,3"/>
  <text x="170" y="222" text-anchor="middle" fill="#ef4444" font-size="6">⚠ DETECTABLE WARNING TAPE — 12" ABOVE DUCT BANK</text>

  <!-- Legend for conduits -->
  <text x="50" y="250" fill="#f59e0b" font-size="6">● Power conduits (4" Sch 40 PVC)</text>
  <text x="50" y="258" fill="#22d3ee" font-size="6">● Spare / Future conduits</text>
  <text x="50" y="266" fill="#a78bfa" font-size="6">● Fiber optic innerduct</text>

  <!-- Arrow to Manhole 1 -->
  <line x1="170" y1="270" x2="170" y2="300" stroke="#475569" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Manhole 1 -->
  <rect x="70" y="300" width="200" height="60" rx="4" fill="none" stroke="#22d3ee" stroke-width="1.5"/>
  <text x="170" y="320" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="bold">MANHOLE MH-1</text>
  <text x="170" y="335" text-anchor="middle" fill="#94a3b8" font-size="7">Precast 6'×8'×7' w/ H-20 rated cover</text>
  <text x="170" y="348" text-anchor="middle" fill="#94a3b8" font-size="7">Pull point + splice location</text>

  <!-- Arrow to Handhole -->
  <line x1="170" y1="360" x2="170" y2="390" stroke="#475569" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Handhole / Pull Box -->
  <rect x="90" y="390" width="160" height="50" rx="4" fill="none" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="170" y="410" text-anchor="middle" fill="#a78bfa" font-size="9" font-weight="bold">HANDHOLE HH-1</text>
  <text x="170" y="425" text-anchor="middle" fill="#94a3b8" font-size="7">36"×36"×36" w/ cover — branch point</text>

  <!-- Branch lines -->
  <line x1="100" y1="440" x2="100" y2="475" stroke="#475569" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="240" y1="440" x2="240" y2="475" stroke="#475569" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Building A -->
  <rect x="40" y="475" width="120" height="50" rx="4" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="100" y="495" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="bold">BUILDING A</text>
  <text x="100" y="510" text-anchor="middle" fill="#94a3b8" font-size="6">Main Electrical Room</text>

  <!-- Building B -->
  <rect x="180" y="475" width="120" height="50" rx="4" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="240" y="495" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="bold">BUILDING B</text>
  <text x="240" y="510" text-anchor="middle" fill="#94a3b8" font-size="6">Generator Yard</text>

  <!-- Grounding Grid Section -->
  <rect x="30" y="545" width="280" height="120" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="563" text-anchor="middle" fill="#4ade80" font-size="9" font-weight="bold">GROUNDING GRID</text>

  <!-- Grid pattern -->
  <line x1="60" y1="580" x2="280" y2="580" stroke="#4ade80" stroke-width="0.8"/>
  <line x1="60" y1="600" x2="280" y2="600" stroke="#4ade80" stroke-width="0.8"/>
  <line x1="60" y1="620" x2="280" y2="620" stroke="#4ade80" stroke-width="0.8"/>
  <line x1="60" y1="640" x2="280" y2="640" stroke="#4ade80" stroke-width="0.8"/>
  <line x1="80" y1="575" x2="80" y2="645" stroke="#4ade80" stroke-width="0.8"/>
  <line x1="130" y1="575" x2="130" y2="645" stroke="#4ade80" stroke-width="0.8"/>
  <line x1="180" y1="575" x2="180" y2="645" stroke="#4ade80" stroke-width="0.8"/>
  <line x1="230" y1="575" x2="230" y2="645" stroke="#4ade80" stroke-width="0.8"/>
  <line x1="260" y1="575" x2="260" y2="645" stroke="#4ade80" stroke-width="0.8"/>

  <!-- Ground rods at intersections -->
  <circle cx="80" cy="580" r="3" fill="#4ade80"/>
  <circle cx="180" cy="580" r="3" fill="#4ade80"/>
  <circle cx="260" cy="580" r="3" fill="#4ade80"/>
  <circle cx="80" cy="620" r="3" fill="#4ade80"/>
  <circle cx="180" cy="620" r="3" fill="#4ade80"/>
  <circle cx="260" cy="620" r="3" fill="#4ade80"/>
  <circle cx="80" cy="640" r="3" fill="#4ade80"/>
  <circle cx="180" cy="640" r="3" fill="#4ade80"/>
  <circle cx="260" cy="640" r="3" fill="#4ade80"/>

  <text x="170" y="657" text-anchor="middle" fill="#94a3b8" font-size="6">2/0 Bare Cu grid — 20' spacing — ground rods at intersections</text>

  <!-- RMC Risers note -->
  <rect x="30" y="680" width="280" height="40" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="696" text-anchor="middle" fill="#f59e0b" font-size="8" font-weight="bold">RMC RISERS (at each building entry)</text>
  <text x="170" y="710" text-anchor="middle" fill="#94a3b8" font-size="6">4" Rigid Metal Conduit — PVC-to-RMC transition 5' below grade to 18" above slab</text>

  <!-- Legend -->
  <rect x="30" y="732" width="280" height="38" rx="4" fill="#0f172a" stroke="#334155" stroke-width="0.5"/>
  <text x="40" y="746" fill="#64748b" font-size="6" font-weight="bold">NOTES:</text>
  <text x="40" y="756" fill="#64748b" font-size="5.5">• Min 24" cover over duct bank • 3500 PSI concrete encasement • Spare conduits for future capacity</text>
  <text x="40" y="764" fill="#64748b" font-size="5.5">• Detectable warning tape 12" above • All dimensions typical — verify with site civil drawings</text>
</svg>`;
