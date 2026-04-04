export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 650" font-family="Arial, sans-serif">
  <rect width="340" height="650" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">NEW 400A SERVICE - DUAL 200A PANELS</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE) - 4-wire service</text>
  <line x1="152" y1="54" x2="156" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="188" y1="54" x2="184" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,70 Q170,58 180,70 Z" fill="#facc15"/>
  <rect x="167" y="70" width="6" height="16" rx="1" fill="#334155"/>
  <line x1="170" y1="86" x2="170" y2="96" stroke="#facc15" stroke-width="2"/>

  <rect x="28" y="96" width="284" height="72" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="116" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">320A METER SOCKET</text>
  <text x="170" y="132" text-anchor="middle" fill="#94a3b8" font-size="9">Milbank U2448-X - AE Engineering Approval Req.</text>
  <text x="170" y="148" text-anchor="middle" fill="#64748b" font-size="8">350 kcmil AL XHHW-2 service conductors</text>
  <text x="170" y="162" text-anchor="middle" fill="#475569" font-size="7">Load calc required showing demand over 160A continuous</text>

  <line x1="170" y1="168" x2="170" y2="182" stroke="#facc15" stroke-width="2"/>
  <line x1="86" y1="182" x2="254" y2="182" stroke="#facc15" stroke-width="2"/>
  <line x1="86" y1="182" x2="86" y2="196" stroke="#facc15" stroke-width="2"/>
  <line x1="254" y1="182" x2="254" y2="196" stroke="#facc15" stroke-width="2"/>

  <rect x="14" y="196" width="140" height="152" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="84" y="216" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">PANEL A</text>
  <text x="84" y="232" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <!-- Two-column breaker layout -->
  <rect x="81.5" y="248" width="5" height="31" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="54.5" y="250" width="24" height="7" rx="1.5" fill="#334155"/>
  <rect x="89.5" y="250" width="24" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="54.5" y="260" width="24" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="89.5" y="260" width="24" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="54.5" y="270" width="24" height="7" rx="1.5" fill="#334155"/>
  <rect x="89.5" y="270" width="24" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <text x="84" y="320" text-anchor="middle" fill="#475569" font-size="8">Main house loads</text>

  <rect x="186" y="196" width="140" height="152" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="256" y="216" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">PANEL B</text>
  <text x="256" y="232" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <!-- Two-column breaker layout -->
  <rect x="253.5" y="248" width="5" height="31" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="226.5" y="250" width="24" height="7" rx="1.5" fill="#334155"/>
  <rect x="261.5" y="250" width="24" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="226.5" y="260" width="24" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="261.5" y="260" width="24" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="226.5" y="270" width="24" height="7" rx="1.5" fill="#334155"/>
  <rect x="261.5" y="270" width="24" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <text x="256" y="320" text-anchor="middle" fill="#475569" font-size="8">Garage / workshop</text>

  <!-- Ground below panels, rod labels RIGHT -->
  <line x1="84" y1="272" x2="84" y2="366" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="256" y1="272" x2="256" y2="366" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="84" y1="366" x2="256" y2="366" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="170" y1="366" x2="170" y2="392" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="152" y1="392" x2="188" y2="392" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="146" y="392" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="164" y="392" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="186" y="408" fill="#22c55e" font-size="7">GND RODS</text>
  <text x="170" y="432" text-anchor="middle" fill="#475569" font-size="8">5/8 x 8ft copper-bonded - 6ft apart minimum</text>

  <line x1="84" y1="366" x2="50" y2="366" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="14" y="358" width="46" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="37" y="371" text-anchor="middle" fill="#22c55e" font-size="8">UFER</text>

  <rect x="10" y="562" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="578" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="586" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="594" fill="#64748b" font-size="9">Service / Panel</text>
  <rect x="140" y="586" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="594" fill="#64748b" font-size="9">AFCI / Ground</text>
  <rect x="240" y="586" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="594" fill="#64748b" font-size="9">GFCI</text>
  <line x1="22" y1="608" x2="34" y2="608" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="612" fill="#64748b" font-size="9">Grounding system</text>
  <line x1="140" y1="608" x2="152" y2="608" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="158" y="612" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <line x1="240" y1="608" x2="252" y2="608" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="612" fill="#64748b" font-size="9">Utility (AE)</text>
  <text x="14" y="646" fill="#475569" font-size="7">400A RESIDENTIAL SERVICE - NOT TO SCALE</text>
</svg>`;
