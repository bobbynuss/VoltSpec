export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">LANDSCAPE / OUTDOOR LIGHTING CIRCUIT</text>

  <rect x="60" y="38" width="220" height="52" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <rect x="72" y="70" width="48" height="14" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="96" y="80" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">20A GFCI</text>
  <text x="130" y="80" fill="#64748b" font-size="7">CHFP120GF</text>

  <line x1="170" y1="94" x2="170" y2="108" stroke="#3b82f6" stroke-width="2"/>
  <rect x="68" y="108" width="204" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="121" text-anchor="middle" fill="#64748b" font-size="9">12 AWG THHN in 3/4 in. Sch 40 PVC</text>

  <line x1="16" y1="134" x2="324" y2="134" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="14" y="131" fill="#475569" font-size="7">grade</text>
  <line x1="170" y1="126" x2="170" y2="148" stroke="#3b82f6" stroke-width="2"/>
  <text x="184" y="144" fill="#64748b" font-size="7">6 in. burial min (in conduit)</text>

  <!-- Split to outlet and transformer -->
  <line x1="170" y1="152" x2="56" y2="152" stroke="#3b82f6" stroke-width="2"/>
  <line x1="170" y1="152" x2="276" y2="152" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5,3"/>

  <!-- GFCI receptacle -->
  <line x1="56" y1="152" x2="56" y2="168" stroke="#3b82f6" stroke-width="2"/>
  <rect x="6" y="168" width="100" height="52" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="56" y="190" text-anchor="middle" fill="#3b82f6" font-size="9" font-weight="bold">GFCI RCPT</text>
  <text x="56" y="206" text-anchor="middle" fill="#94a3b8" font-size="8">TWRGF20W</text>
  <text x="56" y="216" text-anchor="middle" fill="#64748b" font-size="7">WP cover MM420C</text>

  <!-- 12V transformer -->
  <line x1="276" y1="152" x2="276" y2="168" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="218" y="168" width="116" height="56" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="276" y="190" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V TRANSFORMER</text>
  <text x="276" y="206" text-anchor="middle" fill="#94a3b8" font-size="8">Kichler 15TP300BK</text>
  <text x="276" y="220" text-anchor="middle" fill="#64748b" font-size="7">300W photocell+timer</text>

  <!-- 12V wire label - between the two boxes, below their bottom edges -->
  <line x1="218" y1="240" x2="106" y2="240" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="162" y="254" text-anchor="middle" fill="#fbbf24" font-size="7">16/2 direct-burial 12V</text>

  <!-- Path lights - start BELOW both boxes (y=268) -->
  <line x1="114" y1="268" x2="114" y2="304" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="114" cy="312" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="114" y="332" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <line x1="148" y1="268" x2="148" y2="304" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="148" cy="312" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="148" y="332" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <line x1="182" y1="268" x2="182" y2="304" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="182" cy="312" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="182" y="332" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <line x1="216" y1="268" x2="216" y2="304" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="216" cy="312" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="216" y="332" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <!-- Spot light -->
  <line x1="250" y1="268" x2="250" y2="304" stroke="#fbbf24" stroke-width="1"/>
  <rect x="242" y="304" width="16" height="10" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="250" y="326" text-anchor="middle" fill="#64748b" font-size="7">SPOT</text>

  <!-- House -->
  <rect x="40" y="352" width="260" height="56" rx="3" fill="#1a2535" stroke="#334155" stroke-width="1"/>
  <text x="170" y="384" text-anchor="middle" fill="#334155" font-size="16" font-weight="bold">HOUSE</text>
  <text x="170" y="402" text-anchor="middle" fill="#334155" font-size="7">Panel inside - conduit enters here</text>

  <rect x="28" y="420" width="284" height="34" rx="4" fill="#1e293b" stroke="#1e293b" stroke-width="1"/>
  <text x="170" y="436" text-anchor="middle" fill="#64748b" font-size="8">Burial: 6 in. conduit / 12 in. open ground - NEC 300.5</text>
  <text x="170" y="450" text-anchor="middle" fill="#475569" font-size="7">All 120V outdoor receptacles GFCI - NEC 210.8</text>

  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="524" fill="#64748b" font-size="9">120V GFCI circuit</text>
  <line x1="140" y1="520" x2="152" y2="520" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="158" y="524" fill="#64748b" font-size="9">12V landscape wire</text>
  <circle cx="247" cy="520" r="5" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="258" y="524" fill="#64748b" font-size="9">Path / spot light</text>
  <rect x="22" y="534" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="40" y="542" fill="#64748b" font-size="9">12V transformer</text>
  <rect x="140" y="534" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="158" y="542" fill="#64748b" font-size="9">Main panel</text>
  <text x="14" y="576" fill="#475569" font-size="7">LANDSCAPE / OUTDOOR LIGHTING - NOT TO SCALE</text>
</svg>`;
