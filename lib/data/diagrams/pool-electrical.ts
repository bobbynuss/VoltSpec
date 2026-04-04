export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 650" font-family="Arial, sans-serif">
  <rect width="340" height="650" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">SWIMMING POOL ELECTRICAL - NEC 680</text>

  <rect x="70" y="38" width="200" height="44" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="74" text-anchor="middle" fill="#64748b" font-size="8">200A service - inside house</text>
  <line x1="170" y1="82" x2="170" y2="96" stroke="#facc15" stroke-width="1.5"/>

  <rect x="40" y="96" width="260" height="142" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="170" y="116" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="bold">POOL / SPA PANEL</text>
  <text x="170" y="132" text-anchor="middle" fill="#94a3b8" font-size="9">CH60SPAST - 60A - NEC 680</text>
  <!-- Two-column breaker layout -->
  <rect x="78" y="148" width="5" height="28" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="44" y="150" width="30" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="87" y="150" width="30" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="44" y="160" width="30" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <text x="48" y="182" fill="#64748b" font-size="7">PUMP</text>
  <text x="90" y="182" fill="#64748b" font-size="7">LIGHT</text>
  <text x="48" y="195" fill="#64748b" font-size="7">RCPT</text>
  <line x1="170" y1="164" x2="170" y2="248" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="182" y="244" fill="#64748b" font-size="7">3/4 in. PVC underground</text>

  <!-- Equipment pad -->
  <rect x="24" y="256" width="110" height="68" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <text x="79" y="276" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">EQUIP PAD</text>
  <text x="79" y="292" text-anchor="middle" fill="#64748b" font-size="8">Pump / Filter / Heater</text>
  <text x="79" y="308" text-anchor="middle" fill="#475569" font-size="7">Bonded - NEC 680.26</text>
  <text x="79" y="320" text-anchor="middle" fill="#475569" font-size="7">8 AWG solid Cu bond</text>

  <!-- 12V transformer -->
  <rect x="218" y="256" width="116" height="52" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="276" y="276" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V TRANSFORMER</text>
  <text x="276" y="292" text-anchor="middle" fill="#94a3b8" font-size="8">Pentair 601100 300W</text>
  <text x="276" y="304" text-anchor="middle" fill="#475569" font-size="7">GFCI protected</text>

  <!-- Pool - centered at x=185 to give left margin for ground line -->
  <ellipse cx="185" cy="410" rx="110" ry="50" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
  <text x="185" y="406" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold">POOL</text>
  <text x="185" y="424" text-anchor="middle" fill="#0ea5e9" font-size="9">12V LED light - niche mount</text>

  <!-- 20ft GFCI zone -->
  <ellipse cx="185" cy="410" rx="138" ry="72" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="5,4"/>
  <text x="328" y="402" fill="#ef4444" font-size="7">20 ft</text>
  <text x="328" y="414" fill="#ef4444" font-size="7">GFCI</text>
  <text x="328" y="426" fill="#ef4444" font-size="7">zone</text>

  <!-- Ground - routes LEFT from equip pad, then down at x=10, outside all pool elements -->
  <line x1="24" y1="300" x2="10" y2="300" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="10" y1="300" x2="10" y2="502" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="4" y="502" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="24" y="518" fill="#22c55e" font-size="7">GND ROD</text>

  <rect x="10" y="562" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="578" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="586" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="594" fill="#64748b" font-size="9">GFCI protected circuit</text>
  <line x1="140" y1="590" x2="152" y2="590" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="594" fill="#64748b" font-size="9">Equipotential bond</text>
  <rect x="240" y="586" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="258" y="594" fill="#64748b" font-size="9">12V transformer</text>
  <line x1="22" y1="608" x2="34" y2="608" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="40" y="612" fill="#64748b" font-size="9">20 ft GFCI boundary</text>
  <rect x="140" y="604" width="12" height="8" rx="1" fill="#38bdf8" opacity="0.5"/>
  <text x="158" y="612" fill="#64748b" font-size="9">Pool / water</text>
  <text x="14" y="646" fill="#475569" font-size="7">SWIMMING POOL ELECTRICAL - NOT TO SCALE</text>
</svg>`;
