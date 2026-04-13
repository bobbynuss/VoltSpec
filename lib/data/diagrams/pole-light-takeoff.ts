export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">POLE LIGHT TAKEOFF — PARKING LOT / SITE LIGHTING</text>

  <!-- Panel Source -->
  <rect x="140" y="40" width="60" height="30" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="8" font-weight="bold">LIGHTING</text>
  <text x="170" y="66" text-anchor="middle" fill="#facc15" font-size="6">PANEL</text>

  <!-- Photocell/Contactor -->
  <rect x="250" y="40" width="60" height="30" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="280" y="55" text-anchor="middle" fill="#94a3b8" font-size="7">PHOTOCELL</text>
  <text x="280" y="63" text-anchor="middle" fill="#94a3b8" font-size="7">CONTACTOR</text>
  <line x1="200" y1="55" x2="250" y2="55" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- Underground Feeder -->
  <line x1="170" y1="70" x2="170" y2="100" stroke="#f59e0b" stroke-width="2"/>
  <text x="190" y="88" fill="#64748b" font-size="7">Underground PVC</text>
  <text x="190" y="96" fill="#64748b" font-size="7">feeder to first pole</text>

  <!-- Underground run (horizontal) -->
  <rect x="40" y="100" width="260" height="6" rx="2" fill="#78350f" opacity="0.4"/>
  <text x="170" y="96" text-anchor="middle" fill="#a16207" font-size="6">── UNDERGROUND DUCT BANK ──</text>

  <!-- Pole 1: Single Head (15-20ft) -->
  <rect x="55" y="106" width="6" height="80" rx="1" fill="#64748b" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="58" y="200" text-anchor="middle" fill="#64748b" font-size="6">15-20'</text>
  <rect x="48" y="106" width="20" height="12" rx="2" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="58" y="114" text-anchor="middle" fill="#f59e0b" font-size="5">1-HEAD</text>
  <line x1="58" y1="186" x2="58" y2="210" stroke="#78350f" stroke-width="1.5"/>
  <rect x="43" y="210" width="30" height="10" rx="2" fill="#1e293b" stroke="#64748b" stroke-width="0.5"/>
  <text x="58" y="218" text-anchor="middle" fill="#64748b" font-size="5">BASE</text>

  <!-- Pole 2: Dual Head (20-25ft) -->
  <rect x="132" y="106" width="6" height="90" rx="1" fill="#64748b" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="135" y="210" text-anchor="middle" fill="#64748b" font-size="6">20-25'</text>
  <line x1="128" y1="110" x2="118" y2="106" stroke="#94a3b8" stroke-width="1"/>
  <rect x="105" y="100" width="16" height="8" rx="1" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <line x1="142" y1="110" x2="152" y2="106" stroke="#94a3b8" stroke-width="1"/>
  <rect x="149" y="100" width="16" height="8" rx="1" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="135" y="98" text-anchor="middle" fill="#f59e0b" font-size="5">2-HEAD</text>
  <line x1="135" y1="196" x2="135" y2="220" stroke="#78350f" stroke-width="1.5"/>
  <rect x="120" y="220" width="30" height="10" rx="2" fill="#1e293b" stroke="#64748b" stroke-width="0.5"/>
  <text x="135" y="228" text-anchor="middle" fill="#64748b" font-size="5">BASE</text>

  <!-- Pole 3: Quad Head (25-30ft) -->
  <rect x="222" y="106" width="6" height="100" rx="1" fill="#64748b" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="225" y="220" text-anchor="middle" fill="#64748b" font-size="6">25-30'</text>
  <line x1="218" y1="110" x2="208" y2="106" stroke="#94a3b8" stroke-width="1"/>
  <rect x="195" y="100" width="16" height="8" rx="1" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <line x1="232" y1="110" x2="242" y2="106" stroke="#94a3b8" stroke-width="1"/>
  <rect x="239" y="100" width="16" height="8" rx="1" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <line x1="222" y1="112" x2="212" y2="116" stroke="#94a3b8" stroke-width="1"/>
  <rect x="199" y="114" width="16" height="8" rx="1" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <line x1="228" y1="112" x2="238" y2="116" stroke="#94a3b8" stroke-width="1"/>
  <rect x="235" y="114" width="16" height="8" rx="1" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="225" y="96" text-anchor="middle" fill="#f59e0b" font-size="5">4-HEAD</text>
  <line x1="225" y1="206" x2="225" y2="230" stroke="#78350f" stroke-width="1.5"/>
  <rect x="210" y="230" width="30" height="10" rx="2" fill="#1e293b" stroke="#64748b" stroke-width="0.5"/>
  <text x="225" y="238" text-anchor="middle" fill="#64748b" font-size="5">BASE</text>

  <!-- Underground connections between poles -->
  <line x1="58" y1="220" x2="120" y2="225" stroke="#78350f" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="150" y1="225" x2="210" y2="235" stroke="#78350f" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Detail: Pole Base -->
  <text x="170" y="270" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">POLE BASE DETAIL</text>
  <rect x="110" y="280" width="120" height="110" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>

  <!-- Concrete base -->
  <rect x="135" y="360" width="70" height="24" rx="2" fill="#374151" stroke="#64748b" stroke-width="0.5"/>
  <text x="170" y="375" text-anchor="middle" fill="#94a3b8" font-size="6">CONCRETE BASE</text>
  <text x="170" y="382" text-anchor="middle" fill="#64748b" font-size="5">w/ anchor bolts</text>

  <!-- Pole shaft -->
  <rect x="160" y="290" width="20" height="70" rx="1" fill="#64748b" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="195" y="320" fill="#64748b" font-size="6">Steel or</text>
  <text x="195" y="328" fill="#64748b" font-size="6">Aluminum Pole</text>

  <!-- Hand hole -->
  <rect x="160" y="340" width="20" height="12" rx="1" fill="#475569" stroke="#f59e0b" stroke-width="0.5"/>
  <text x="140" y="349" text-anchor="end" fill="#f59e0b" font-size="5">HAND HOLE</text>

  <!-- Conduit entry -->
  <rect x="155" y="384" width="30" height="8" rx="1" fill="#78350f" opacity="0.6"/>
  <text x="170" y="400" text-anchor="middle" fill="#64748b" font-size="5">PVC conduit entry</text>

  <!-- Ground rod at base -->
  <line x1="210" y1="365" x2="220" y2="395" stroke="#22c55e" stroke-width="1.5"/>
  <text x="225" y="380" fill="#22c55e" font-size="5">GND ROD</text>

  <!-- Wiring Detail -->
  <text x="170" y="425" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">WIRING DETAIL (PER POLE)</text>
  <rect x="40" y="435" width="260" height="80" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>

  <text x="55" y="453" fill="#f59e0b" font-size="7">● #10 THHN Black (hot)</text>
  <text x="55" y="465" fill="#94a3b8" font-size="7">● #10 THHN White (neutral)</text>
  <text x="55" y="477" fill="#22c55e" font-size="7">● #10 THHN Green (ground)</text>
  <text x="55" y="493" fill="#64748b" font-size="6">Up pole in shaft → to fixture junction</text>
  <text x="55" y="505" fill="#64748b" font-size="6">Underground: 1" PVC Schedule 40 between poles</text>

  <!-- Fixture Options -->
  <text x="170" y="535" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">LED AREA LIGHT OPTIONS</text>
  <rect x="25" y="545" width="290" height="120" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>

  <text x="45" y="563" fill="#f59e0b" font-size="7" font-weight="bold">FIXTURE</text>
  <text x="155" y="563" fill="#f59e0b" font-size="7" font-weight="bold">WATTS</text>
  <text x="220" y="563" fill="#f59e0b" font-size="7" font-weight="bold">LUMENS</text>
  <text x="275" y="563" fill="#f59e0b" font-size="7" font-weight="bold">USE</text>

  <text x="45" y="578" fill="#94a3b8" font-size="6">LED Shoebox Small</text>
  <text x="155" y="578" fill="#94a3b8" font-size="6">100W</text>
  <text x="220" y="578" fill="#94a3b8" font-size="6">13,000</text>
  <text x="275" y="578" fill="#94a3b8" font-size="6">Walkway</text>

  <text x="45" y="593" fill="#94a3b8" font-size="6">LED Shoebox Medium</text>
  <text x="155" y="593" fill="#94a3b8" font-size="6">200W</text>
  <text x="220" y="593" fill="#94a3b8" font-size="6">26,000</text>
  <text x="275" y="593" fill="#94a3b8" font-size="6">Parking</text>

  <text x="45" y="608" fill="#94a3b8" font-size="6">LED Shoebox Large</text>
  <text x="155" y="608" fill="#94a3b8" font-size="6">300W</text>
  <text x="220" y="608" fill="#94a3b8" font-size="6">39,000</text>
  <text x="275" y="608" fill="#94a3b8" font-size="6">Large lot</text>

  <text x="45" y="623" fill="#94a3b8" font-size="6">LED Flood/Area</text>
  <text x="155" y="623" fill="#94a3b8" font-size="6">150W</text>
  <text x="220" y="623" fill="#94a3b8" font-size="6">20,000</text>
  <text x="275" y="623" fill="#94a3b8" font-size="6">Security</text>

  <text x="45" y="648" fill="#64748b" font-size="6">Arm configs: single tenon, 2-arm, 3-arm, 4-arm bullhorn</text>
  <text x="45" y="658" fill="#64748b" font-size="6">Pole heights: 15', 20', 25', 30' — adjust per photometric plan</text>

  <text x="170" y="676" text-anchor="middle" fill="#475569" font-size="6">SCALE QUANTITIES PER PROJECT — ADJUST POLES, HEADS, AND RUN LENGTHS</text>
</svg>`;
