export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">NEW HOME BUILD — PHASE 1: SERVICE ENTRANCE &amp; PANEL SET</text>

  <!-- Utility drop -->
  <text x="170" y="48" text-anchor="middle" fill="#64748b" font-size="9">UTILITY SERVICE DROP</text>
  <line x1="155" y1="56" x2="158" y2="74" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="56" x2="170" y2="74" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="185" y1="56" x2="182" y2="74" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,74 Q170,62 180,74 Z" fill="#facc15"/>

  <!-- Weatherhead -->
  <rect x="155" y="74" width="30" height="14" rx="2" fill="#475569" stroke="#64748b" stroke-width="1"/>
  <text x="170" y="84" text-anchor="middle" fill="#94a3b8" font-size="6">WHEAD</text>

  <!-- Mast -->
  <rect x="167" y="88" width="6" height="40" rx="1" fill="#64748b" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="184" y="108" fill="#64748b" font-size="7">2" RMC mast</text>

  <!-- Meter socket -->
  <rect x="145" y="128" width="50" height="28" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="143" text-anchor="middle" fill="#facc15" font-size="8" font-weight="bold">METER</text>
  <text x="170" y="152" text-anchor="middle" fill="#94a3b8" font-size="5">200A ringless</text>

  <!-- SE conductors -->
  <line x1="170" y1="156" x2="170" y2="180" stroke="#f59e0b" stroke-width="2"/>
  <text x="190" y="170" fill="#64748b" font-size="6">4/0 AL SER</text>

  <!-- Main panel -->
  <rect x="120" y="180" width="100" height="70" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="205" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">200A PANEL</text>
  <text x="170" y="218" text-anchor="middle" fill="#94a3b8" font-size="6">40-space CH/BR</text>
  <text x="170" y="230" text-anchor="middle" fill="#94a3b8" font-size="6">Main Breaker</text>
  <text x="170" y="242" text-anchor="middle" fill="#64748b" font-size="5">Garage or utility room</text>

  <!-- Grounding -->
  <line x1="170" y1="250" x2="170" y2="275" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="290" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">GROUNDING ELECTRODE SYSTEM</text>
  <rect x="40" y="298" width="260" height="80" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>

  <line x1="80" y1="330" x2="80" y2="365" stroke="#22c55e" stroke-width="2"/>
  <text x="80" y="325" text-anchor="middle" fill="#22c55e" font-size="7">GROUND</text>
  <text x="80" y="373" text-anchor="middle" fill="#64748b" font-size="5">Rod #1</text>

  <line x1="170" y1="330" x2="170" y2="365" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="325" text-anchor="middle" fill="#22c55e" font-size="7">GROUND</text>
  <text x="170" y="373" text-anchor="middle" fill="#64748b" font-size="5">Rod #2 (6' apart)</text>

  <line x1="260" y1="315" x2="260" y2="345" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="240" y="345" width="40" height="20" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="260" y="358" text-anchor="middle" fill="#22c55e" font-size="5">UFER</text>
  <text x="260" y="373" text-anchor="middle" fill="#64748b" font-size="5">Concrete encased</text>

  <line x1="80" y1="330" x2="260" y2="330" stroke="#22c55e" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="170" y="312" text-anchor="middle" fill="#64748b" font-size="6">4 AWG bare copper GEC — continuous</text>

  <!-- Subpanel option -->
  <text x="170" y="405" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">OPTIONAL: DETACHED GARAGE SUBPANEL</text>
  <rect x="40" y="415" width="260" height="50" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="55" y="433" fill="#64748b" font-size="6">● 100A subpanel if detached garage — separate feeder from main panel</text>
  <text x="55" y="445" fill="#64748b" font-size="6">● 4-wire feeder: 2 hots + neutral + separate ground per NEC 250.32</text>
  <text x="55" y="457" fill="#64748b" font-size="6">● Ground rod(s) at detached structure required</text>

  <!-- Notes -->
  <text x="170" y="490" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">PHASE 1 CHECKLIST</text>
  <rect x="30" y="500" width="280" height="100" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="45" y="518" fill="#22c55e" font-size="6">✓ Set meter socket and mast — coordinate with utility for service drop</text>
  <text x="45" y="530" fill="#22c55e" font-size="6">✓ Mount main panel — garage or utility room, 6'7" max to top breaker</text>
  <text x="45" y="542" fill="#22c55e" font-size="6">✓ Pull SE conductors — meter to panel, 4/0 AL SER typical</text>
  <text x="45" y="554" fill="#22c55e" font-size="6">✓ Install grounding electrode system — 2 rods + Ufer before slab pour</text>
  <text x="45" y="566" fill="#22c55e" font-size="6">✓ Bonding: water pipe, gas pipe, rebar (Ufer) per NEC 250</text>
  <text x="45" y="578" fill="#22c55e" font-size="6">✓ Coordinate: Ufer ground BEFORE concrete pour — cannot add after</text>
  <text x="45" y="590" fill="#22c55e" font-size="6">✓ Panel energization after rough-in inspection (Phase 3)</text>

  <text x="170" y="625" text-anchor="middle" fill="#475569" font-size="6">NEW HOME ELECTRICAL — PHASE 1 OF 5</text>
</svg>`;
