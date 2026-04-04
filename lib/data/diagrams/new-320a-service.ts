export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 650" font-family="Arial, sans-serif">
  <rect width="340" height="650" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">NEW 320A CLASS SERVICE - SINGLE PHASE</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE) - 3-wire 120/240V service</text>
  <line x1="152" y1="54" x2="156" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="188" y1="54" x2="184" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,70 Q170,58 180,70 Z" fill="#facc15"/>
  <rect x="167" y="70" width="6" height="16" rx="1" fill="#334155"/>
  <line x1="170" y1="86" x2="170" y2="96" stroke="#facc15" stroke-width="2"/>

  <!-- 2 in. RMC conduit run -->
  <rect x="78" y="96" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="109" text-anchor="middle" fill="#64748b" font-size="9">2 in. RMC - exterior wall run to meter</text>
  <line x1="170" y1="114" x2="170" y2="124" stroke="#facc15" stroke-width="2"/>

  <!-- 320A Meter Socket -->
  <rect x="28" y="124" width="284" height="72" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="144" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">320A CLASS METER SOCKET</text>
  <text x="170" y="160" text-anchor="middle" fill="#94a3b8" font-size="9">Milbank U2448-X - 320A ringless lever-bypass</text>
  <text x="170" y="176" text-anchor="middle" fill="#64748b" font-size="8">4/0 AL XHHW-2 service entrance conductors (320A rated)</text>
  <text x="170" y="190" text-anchor="middle" fill="#475569" font-size="7">AE/utility approval may be required - load calc submitted with permit</text>

  <!-- SE conductors to panel -->
  <line x1="170" y1="196" x2="170" y2="212" stroke="#facc15" stroke-width="2"/>
  <rect x="78" y="212" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="225" text-anchor="middle" fill="#64748b" font-size="9">4/0-4/0-2/0 AL SER - meter to panel</text>
  <line x1="170" y1="230" x2="170" y2="244" stroke="#facc15" stroke-width="2"/>

  <!-- Main panel -->
  <rect x="42" y="244" width="256" height="180" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="266" text-anchor="middle" fill="#facc15" font-size="12" font-weight="bold">200A MAIN BREAKER PANEL</text>
  <text x="170" y="282" text-anchor="middle" fill="#94a3b8" font-size="9">Eaton CHP42B200R - 42-space CH PON</text>
  <text x="170" y="296" text-anchor="middle" fill="#475569" font-size="8">200A main breaker - 320A service, 200A panel rating</text>

  <!-- Two-column breaker layout -->
  <rect x="167.5" y="310" width="5" height="62" rx="1" fill="#475569" opacity="0.6"/>

  <!-- Left column breakers -->
  <rect x="108" y="312" width="56" height="9" rx="2" fill="#334155"/>
  <text x="136" y="319" text-anchor="middle" fill="#94a3b8" font-size="6">200A MAIN</text>
  <rect x="108" y="324" width="56" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <text x="136" y="330" text-anchor="middle" fill="#0f172a" font-size="5">DF 20A</text>
  <rect x="108" y="334" width="56" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="108" y="344" width="56" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <text x="136" y="350" text-anchor="middle" fill="white" font-size="5">GFCI 20A</text>
  <rect x="108" y="354" width="56" height="7" rx="1.5" fill="#ef4444" opacity="0.85"/>
  <text x="136" y="360" text-anchor="middle" fill="white" font-size="5">2P 50A RANGE</text>
  <rect x="108" y="364" width="56" height="7" rx="1.5" fill="#334155"/>

  <!-- Right column breakers -->
  <rect x="176" y="312" width="56" height="9" rx="2" fill="#334155"/>
  <rect x="176" y="324" width="56" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="176" y="334" width="56" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="176" y="344" width="56" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="176" y="354" width="56" height="7" rx="1.5" fill="#ef4444" opacity="0.85"/>
  <text x="204" y="360" text-anchor="middle" fill="white" font-size="5">2P 50A EV</text>
  <rect x="176" y="364" width="56" height="7" rx="1.5" fill="#334155"/>

  <text x="170" y="398" text-anchor="middle" fill="#475569" font-size="8">42 spaces - room for EV, future loads</text>
  <text x="170" y="414" text-anchor="middle" fill="#475569" font-size="7">AFCI+GFCI dual function on all bedroom/living circuits</text>

  <!-- Ground electrode system -->
  <line x1="170" y1="424" x2="170" y2="450" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="462" text-anchor="middle" fill="#22c55e" font-size="9" font-weight="bold">GROUND ELECTRODE SYSTEM</text>
  <text x="170" y="474" text-anchor="middle" fill="#64748b" font-size="8">2 AWG bare copper GEC per NEC 250.66 Table</text>

  <line x1="170" y1="480" x2="170" y2="496" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="120" y1="496" x2="220" y2="496" stroke="#22c55e" stroke-width="1.5"/>

  <!-- Ground rods -->
  <rect x="114" y="496" width="12" height="30" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="214" y="496" width="12" height="30" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="542" text-anchor="middle" fill="#475569" font-size="8">5/8 x 8ft copper-bonded - 6ft apart minimum</text>

  <!-- Ufer -->
  <line x1="120" y1="496" x2="60" y2="496" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="14" y="488" width="52" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="40" y="501" text-anchor="middle" fill="#22c55e" font-size="8">UFER</text>

  <!-- Legend -->
  <rect x="10" y="562" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="578" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="586" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="594" fill="#64748b" font-size="9">Service / Panel</text>
  <rect x="140" y="586" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="594" fill="#64748b" font-size="9">AFCI+GFCI / Ground</text>
  <rect x="240" y="586" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="594" fill="#64748b" font-size="9">GFCI</text>
  <rect x="22" y="602" width="12" height="8" rx="1" fill="#ef4444" opacity="0.85"/>
  <text x="40" y="610" fill="#64748b" font-size="9">240V 2-pole</text>
  <line x1="140" y1="606" x2="152" y2="606" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="158" y="610" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <line x1="240" y1="606" x2="252" y2="606" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="610" fill="#64748b" font-size="9">Utility (AE)</text>
  <text x="14" y="646" fill="#475569" font-size="7">320A CLASS RESIDENTIAL SERVICE - NOT TO SCALE</text>
</svg>`;
