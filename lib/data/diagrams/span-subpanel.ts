export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 700" font-family="Arial, sans-serif">
  <rect width="340" height="700" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">SPAN SMART SUBPANEL</text>

  <!-- Existing Main Panel -->
  <rect x="28" y="46" width="284" height="120" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="68" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">EXISTING MAIN PANEL</text>
  <text x="170" y="86" text-anchor="middle" fill="#94a3b8" font-size="9">200A service · existing breakers remain</text>

  <!-- Feeder breaker highlight -->
  <rect x="60" y="100" width="220" height="28" rx="3" fill="#334155" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="114" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">100A 2-POLE FEEDER BREAKER</text>
  <text x="170" y="126" text-anchor="middle" fill="#94a3b8" font-size="8">Dedicated feeder to SPAN subpanel</text>

  <rect x="60" y="136" width="220" height="20" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="150" text-anchor="middle" fill="#64748b" font-size="8">Remaining spaces for existing circuits</text>

  <!-- Feeder run -->
  <line x1="170" y1="166" x2="170" y2="186" stroke="#facc15" stroke-width="2"/>
  <rect x="58" y="186" width="224" height="30" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="200" text-anchor="middle" fill="#94a3b8" font-size="9">4-WIRE FEEDER: 1 AWG AL XHHW × 3 + 6 AWG Cu GND</text>
  <text x="170" y="212" text-anchor="middle" fill="#64748b" font-size="7">In 1-1/4 in. EMT conduit</text>
  <line x1="170" y1="216" x2="170" y2="236" stroke="#facc15" stroke-width="2"/>

  <!-- CT Sensors -->
  <rect x="28" y="236" width="284" height="44" rx="4" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
  <text x="170" y="256" text-anchor="middle" fill="#22d3ee" font-size="10" font-weight="bold">CT SENSOR CLAMPS</text>
  <text x="170" y="272" text-anchor="middle" fill="#94a3b8" font-size="8">Split-core CTs on feeder conductors at subpanel</text>
  <line x1="170" y1="280" x2="170" y2="296" stroke="#facc15" stroke-width="2"/>

  <!-- SPAN Subpanel -->
  <rect x="28" y="296" width="284" height="240" rx="4" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
  <rect x="32" y="300" width="276" height="30" rx="2" fill="#164e63"/>
  <text x="170" y="320" text-anchor="middle" fill="#22d3ee" font-size="13" font-weight="bold">SPAN SMART SUBPANEL</text>
  <text x="170" y="344" text-anchor="middle" fill="#94a3b8" font-size="9">100A 32-space MLO · Wi-Fi enabled · per-circuit control</text>

  <!-- Breaker slots -->
  <text x="80" y="366" text-anchor="middle" fill="#475569" font-size="8">L1</text>
  <text x="260" y="366" text-anchor="middle" fill="#475569" font-size="8">L2</text>
  <g>
    <rect x="40" y="372" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="100" y="382" text-anchor="middle" fill="#94a3b8" font-size="7">20A AFCI+GFCI</text>
    <rect x="180" y="372" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="240" y="382" text-anchor="middle" fill="#94a3b8" font-size="7">20A AFCI+GFCI</text>
  </g>
  <g>
    <rect x="40" y="390" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="100" y="400" text-anchor="middle" fill="#94a3b8" font-size="7">20A GFCI</text>
    <rect x="180" y="390" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="240" y="400" text-anchor="middle" fill="#94a3b8" font-size="7">20A GFCI</text>
  </g>
  <g>
    <rect x="40" y="408" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="100" y="418" text-anchor="middle" fill="#94a3b8" font-size="7">30A 2P</text>
    <rect x="180" y="408" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="240" y="418" text-anchor="middle" fill="#94a3b8" font-size="7">30A 2P</text>
  </g>
  <text x="170" y="444" text-anchor="middle" fill="#475569" font-size="7">· · · additional spaces · · ·</text>

  <!-- Wi-Fi indicator -->
  <rect x="60" y="460" width="220" height="36" rx="4" fill="#0c4a6e" stroke="#22d3ee" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="170" y="476" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="bold">📶 Wi-Fi CONNECTIVITY</text>
  <text x="170" y="490" text-anchor="middle" fill="#94a3b8" font-size="8">2.4 GHz required · SPAN app control</text>

  <!-- Neutral/ground separation note -->
  <rect x="60" y="502" width="220" height="28" rx="4" fill="#451a03" stroke="#f97316" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="170" y="514" text-anchor="middle" fill="#f97316" font-size="8" font-weight="bold">⚠ SEPARATE N+G BUSES (NEC 250.32)</text>
  <text x="170" y="524" text-anchor="middle" fill="#94a3b8" font-size="7">Isolated neutral bar required in subpanel</text>

  <line x1="170" y1="536" x2="170" y2="554" stroke="#facc15" stroke-width="2"/>

  <!-- Ground Electrode System -->
  <rect x="28" y="554" width="284" height="50" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="572" text-anchor="middle" fill="#22c55e" font-size="10" font-weight="bold">GROUND ELECTRODE SYSTEM</text>
  <text x="170" y="588" text-anchor="middle" fill="#94a3b8" font-size="9">5/8 x 8 ft ground rod + 6 AWG bare Cu GEC</text>
  <text x="170" y="600" text-anchor="middle" fill="#64748b" font-size="7">Required if subpanel is in detached structure (NEC 250.32)</text>

  <!-- Branch circuits -->
  <line x1="170" y1="604" x2="170" y2="618" stroke="#facc15" stroke-width="1.5"/>
  <rect x="28" y="618" width="284" height="36" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="636" text-anchor="middle" fill="#94a3b8" font-size="9">NEW BRANCH CIRCUITS</text>
  <text x="170" y="648" text-anchor="middle" fill="#64748b" font-size="8">Each circuit individually controllable via SPAN app</text>

  <!-- Legend -->
  <rect x="28" y="666" width="284" height="28" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1"/>
  <circle cx="56" cy="680" r="5" fill="#22d3ee"/>
  <text x="66" y="684" fill="#94a3b8" font-size="8">SPAN Smart</text>
  <circle cx="140" cy="680" r="5" fill="#facc15"/>
  <text x="150" y="684" fill="#94a3b8" font-size="8">Service</text>
  <circle cx="218" cy="680" r="5" fill="#22c55e"/>
  <text x="228" y="684" fill="#94a3b8" font-size="8">Grounding</text>
</svg>`;
