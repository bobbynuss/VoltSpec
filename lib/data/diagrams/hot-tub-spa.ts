export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">HOT TUB / SPA DEDICATED CIRCUIT</text>

  <!-- Main panel -->
  <rect x="60" y="40" width="220" height="52" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">200A service</text>
  <rect x="72" y="78" width="50" height="14" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="97" y="89" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">50A GFCI</text>
  <text x="132" y="89" fill="#64748b" font-size="7">CHFP250GF</text>

  <line x1="170" y1="96" x2="170" y2="110" stroke="#3b82f6" stroke-width="2"/>

  <!-- Underground conduit -->
  <rect x="68" y="110" width="204" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="123" text-anchor="middle" fill="#64748b" font-size="9">6 AWG THHN - 1 in. Sch 40 PVC underground</text>

  <!-- Grade line -->
  <line x1="16" y1="136" x2="324" y2="136" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="14" y="133" fill="#475569" font-size="7">grade</text>

  <line x1="170" y1="128" x2="170" y2="150" stroke="#3b82f6" stroke-width="2"/>
  <text x="184" y="146" fill="#64748b" font-size="7">12 in. burial - open ground</text>

  <!-- Disconnect -->
  <rect x="50" y="156" width="240" height="56" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="178" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">60A DISCONNECT</text>
  <text x="170" y="194" text-anchor="middle" fill="#94a3b8" font-size="9">DG222NGB - NEMA 3R - lockable</text>
  <text x="170" y="208" text-anchor="middle" fill="#64748b" font-size="7">5 to 50 ft from spa - NEC 680.12</text>

  <line x1="170" y1="212" x2="170" y2="228" stroke="#3b82f6" stroke-width="2"/>

  <!-- Hot tub -->
  <rect x="30" y="228" width="280" height="96" rx="8" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2.5"/>
  <text x="170" y="258" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="bold">HOT TUB / SPA</text>
  <text x="170" y="278" text-anchor="middle" fill="#0ea5e9" font-size="9">240V - 50A - 4-wire circuit</text>
  <text x="170" y="294" text-anchor="middle" fill="#64748b" font-size="8">Pump / Heater / Controls</text>
  <text x="170" y="310" text-anchor="middle" fill="#94a3b8" font-size="7">Verify amperage on nameplate</text>

  <!-- Bond grid - routed outside hot tub box -->
  <line x1="30" y1="270" x2="14" y2="270" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="310" y1="270" x2="326" y2="270" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="14" y1="270" x2="14" y2="356" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="326" y1="270" x2="326" y2="356" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="14" y1="356" x2="326" y2="356" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="374" text-anchor="middle" fill="#22c55e" font-size="9">8 AWG solid Cu bond grid - NEC 680.43</text>
  <text x="170" y="390" text-anchor="middle" fill="#475569" font-size="8">All metal parts within 5 ft of water</text>

  <!-- Overhead clearance -->
  <line x1="16" y1="412" x2="324" y2="412" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="170" y="428" text-anchor="middle" fill="#ef4444" font-size="9">No overhead wiring 22.5 ft - NEC 680.10</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="526" fill="#64748b" font-size="9">GFCI 50A dedicated circuit</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="526" fill="#64748b" font-size="9">Lockable disconnect</text>
  <line x1="22" y1="540" x2="34" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="544" fill="#64748b" font-size="9">Equipotential bond grid</text>
  <line x1="190" y1="540" x2="202" y2="540" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="208" y="544" fill="#64748b" font-size="9">22.5 ft overhead limit</text>
  <text x="14" y="576" fill="#475569" font-size="7">HOT TUB / SPA CIRCUIT - NOT TO SCALE</text>
</svg>`;
