export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 640" font-family="Arial, sans-serif">
  <rect width="340" height="640" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">TEMPORARY CONSTRUCTION POWER POLE</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (CPS)</text>
  <line x1="158" y1="54" x2="161" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="182" y1="54" x2="179" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M162,68 Q170,56 178,68 Z" fill="#facc15"/>

  <!-- Pole -->
  <rect x="167" y="68" width="6" height="186" rx="1" fill="#78350f" stroke="#92400e" stroke-width="1"/>

  <!-- Pole text - positioned between pole and right side, ABOVE Site Power box -->
  <text x="184" y="104" fill="#64748b" font-size="8">4x6 PT lumber</text>
  <text x="184" y="116" fill="#64748b" font-size="7">12 ft - 3 ft in concrete</text>

  <!-- Meter base -->
  <rect x="18" y="82" width="142" height="62" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="89" y="102" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">200A METER BASE</text>
  <text x="89" y="118" text-anchor="middle" fill="#94a3b8" font-size="9">1009874ACH - CPS approved</text>
  <text x="89" y="134" text-anchor="middle" fill="#64748b" font-size="7">5 ft AFF | CPS does not stock 100A ringless</text>

  <!-- Load center -->
  <rect x="18" y="154" width="142" height="138" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="89" y="174" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">125A LOAD CENTER</text>
  <text x="89" y="190" text-anchor="middle" fill="#94a3b8" font-size="9">BRP24L125G - BR outdoor</text>
  <!-- Two-column breaker layout -->
  <rect x="86.5" y="204" width="5" height="31" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="59.5" y="206" width="24" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="94.5" y="206" width="24" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="59.5" y="216" width="24" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="94.5" y="216" width="24" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="59.5" y="226" width="24" height="7" rx="1.5" fill="#334155"/>
  <rect x="94.5" y="226" width="24" height="7" rx="1.5" fill="#334155"/>  <text x="89" y="264" text-anchor="middle" fill="#64748b" font-size="7">All outlets GFCI - NEC 590.6</text>

  <!-- Site Power box - moved down to y=136 with 10px+ gap from pole text -->
  <rect x="198" y="136" width="126" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="261" y="158" text-anchor="middle" fill="#64748b" font-size="9" font-weight="bold">SITE POWER</text>
  <text x="261" y="174" text-anchor="middle" fill="#475569" font-size="8">120V tools</text>
  <text x="261" y="190" text-anchor="middle" fill="#475569" font-size="8">240V compressor</text>
  <text x="261" y="204" text-anchor="middle" fill="#475569" font-size="8">Temp lighting</text>

  <!-- Concrete -->
  <rect x="160" y="312" width="56" height="20" rx="2" fill="#374151" stroke="#475569" stroke-width="1"/>
  <text x="188" y="326" text-anchor="middle" fill="#64748b" font-size="7">Concrete</text>

  <!-- Ground - label RIGHT of rod -->
  <line x1="18" y1="212" x2="8" y2="212" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="8" y1="212" x2="8" y2="392" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="2" y="392" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="22" y="408" fill="#22c55e" font-size="7">GND ROD</text>
  <text x="22" y="424" fill="#475569" font-size="7">NEC 590.7</text>

  <rect x="10" y="552" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="568" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="576" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="584" fill="#64748b" font-size="9">GFCI breaker / outlet</text>
  <rect x="190" y="576" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="208" y="584" fill="#64748b" font-size="9">Meter base (CPS)</text>
  <rect x="22" y="594" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="602" fill="#64748b" font-size="9">125A load center</text>
  <line x1="190" y1="598" x2="202" y2="598" stroke="#22c55e" stroke-width="1.5"/>
  <text x="208" y="602" fill="#64748b" font-size="9">Grounding system</text>
  <text x="14" y="636" fill="#475569" font-size="7">TEMP CONSTRUCTION POLE - NOT TO SCALE</text>
</svg>`;
