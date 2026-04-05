export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 720" font-family="Arial, sans-serif">
  <rect width="340" height="720" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">SPAN SMART PANEL UPGRADE</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY SERVICE DROP</text>
  <line x1="152" y1="54" x2="156" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="188" y1="54" x2="184" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,70 Q170,58 180,70 Z" fill="#facc15"/>
  <rect x="167" y="70" width="6" height="16" rx="1" fill="#334155"/>

  <!-- Meter Base -->
  <rect x="28" y="96" width="284" height="60" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="116" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">METER BASE</text>
  <text x="170" y="132" text-anchor="middle" fill="#94a3b8" font-size="9">200A ringless meter socket</text>
  <text x="170" y="148" text-anchor="middle" fill="#64748b" font-size="8">Utility coordination required for meter pull</text>
  <line x1="170" y1="86" x2="170" y2="96" stroke="#facc15" stroke-width="2"/>
  <line x1="170" y1="156" x2="170" y2="170" stroke="#facc15" stroke-width="2"/>

  <!-- CT Sensors -->
  <rect x="28" y="170" width="284" height="50" rx="4" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
  <text x="170" y="190" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold">CT SENSOR CLAMPS</text>
  <text x="170" y="208" text-anchor="middle" fill="#94a3b8" font-size="9">Split-core CTs on service entrance conductors</text>
  <line x1="170" y1="220" x2="170" y2="234" stroke="#facc15" stroke-width="2"/>

  <!-- SPAN Panel -->
  <rect x="28" y="234" width="284" height="280" rx="4" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
  <rect x="32" y="238" width="276" height="32" rx="2" fill="#164e63"/>
  <text x="170" y="258" text-anchor="middle" fill="#22d3ee" font-size="13" font-weight="bold">SPAN SMART PANEL</text>
  <text x="170" y="284" text-anchor="middle" fill="#94a3b8" font-size="9">200A 32-space, Wi-Fi enabled, per-circuit control</text>

  <!-- Breaker slots left column -->
  <text x="80" y="308" text-anchor="middle" fill="#475569" font-size="8">L1</text>
  <text x="260" y="308" text-anchor="middle" fill="#475569" font-size="8">L2</text>
  <g>
    <rect x="40" y="314" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="100" y="324" text-anchor="middle" fill="#94a3b8" font-size="7">20A AFCI+GFCI</text>
    <rect x="180" y="314" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="240" y="324" text-anchor="middle" fill="#94a3b8" font-size="7">20A AFCI+GFCI</text>
  </g>
  <g>
    <rect x="40" y="332" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="100" y="342" text-anchor="middle" fill="#94a3b8" font-size="7">20A GFCI</text>
    <rect x="180" y="332" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="240" y="342" text-anchor="middle" fill="#94a3b8" font-size="7">20A GFCI</text>
  </g>
  <g>
    <rect x="40" y="350" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="100" y="360" text-anchor="middle" fill="#94a3b8" font-size="7">30A 2P (Dryer)</text>
    <rect x="180" y="350" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="240" y="360" text-anchor="middle" fill="#94a3b8" font-size="7">30A 2P (HVAC)</text>
  </g>
  <g>
    <rect x="40" y="368" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="100" y="378" text-anchor="middle" fill="#94a3b8" font-size="7">50A 2P (Range)</text>
    <rect x="180" y="368" width="120" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="0.5"/>
    <text x="240" y="378" text-anchor="middle" fill="#94a3b8" font-size="7">50A 2P (EV)</text>
  </g>
  <text x="170" y="400" text-anchor="middle" fill="#475569" font-size="7">· · · additional spaces · · ·</text>

  <!-- Wi-Fi indicator -->
  <rect x="60" y="420" width="220" height="40" rx="4" fill="#0c4a6e" stroke="#22d3ee" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="170" y="436" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="bold">📶 Wi-Fi CONNECTIVITY</text>
  <text x="170" y="452" text-anchor="middle" fill="#94a3b8" font-size="8">2.4 GHz required · SPAN app control</text>

  <!-- Smart features callout -->
  <rect x="60" y="468" width="220" height="36" rx="4" fill="#1a2e05" stroke="#84cc16" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="170" y="484" text-anchor="middle" fill="#84cc16" font-size="9" font-weight="bold">⚡ PER-CIRCUIT MONITORING</text>
  <text x="170" y="498" text-anchor="middle" fill="#94a3b8" font-size="8">Real-time energy usage · Load management</text>

  <line x1="170" y1="514" x2="170" y2="530" stroke="#facc15" stroke-width="2"/>

  <!-- Ground Electrode System -->
  <rect x="28" y="530" width="284" height="60" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="550" text-anchor="middle" fill="#22c55e" font-size="10" font-weight="bold">GROUND ELECTRODE SYSTEM</text>
  <text x="170" y="566" text-anchor="middle" fill="#94a3b8" font-size="9">(2) 5/8 x 8 ft ground rods · 4 AWG bare Cu GEC</text>
  <text x="170" y="580" text-anchor="middle" fill="#64748b" font-size="7">NEC 250 · min 6 ft apart</text>

  <!-- Branch circuits -->
  <line x1="170" y1="590" x2="170" y2="606" stroke="#facc15" stroke-width="1.5"/>
  <rect x="28" y="606" width="284" height="48" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="624" text-anchor="middle" fill="#94a3b8" font-size="9">BRANCH CIRCUITS</text>
  <text x="170" y="640" text-anchor="middle" fill="#64748b" font-size="8">All existing circuits transferred to SPAN panel</text>
  <text x="170" y="650" text-anchor="middle" fill="#475569" font-size="7">Each circuit individually controllable via app</text>

  <!-- Legend -->
  <rect x="28" y="670" width="284" height="40" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1"/>
  <circle cx="46" cy="686" r="5" fill="#22d3ee"/>
  <text x="56" y="690" fill="#94a3b8" font-size="8">SPAN Smart</text>
  <circle cx="130" cy="686" r="5" fill="#facc15"/>
  <text x="140" y="690" fill="#94a3b8" font-size="8">Service</text>
  <circle cx="200" cy="686" r="5" fill="#22c55e"/>
  <text x="210" y="690" fill="#94a3b8" font-size="8">Grounding</text>
  <text x="170" y="704" text-anchor="middle" fill="#475569" font-size="7">NEC 2026 · SPAN Installation Guide</text>
</svg>`;
