export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 660" font-family="Arial, sans-serif">
  <rect width="340" height="660" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">NEW 200A SINGLE-PHASE RESIDENTIAL SERVICE</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE)</text>
  <line x1="152" y1="54" x2="156" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="188" y1="54" x2="184" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,70 Q170,58 180,70 Z" fill="#facc15"/>
  <rect x="167" y="70" width="6" height="16" rx="1" fill="#334155"/>

  <rect x="78" y="90" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="103" text-anchor="middle" fill="#64748b" font-size="9">1-1/4 in. Sch 80 PVC - exterior wall run</text>
  <line x1="170" y1="86" x2="170" y2="90" stroke="#475569" stroke-width="2"/>
  <line x1="170" y1="108" x2="170" y2="118" stroke="#475569" stroke-width="2"/>

  <rect x="28" y="118" width="284" height="72" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="138" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">METER BASE</text>
  <text x="170" y="154" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH - 200A ringless, AE-approved</text>
  <text x="170" y="170" text-anchor="middle" fill="#64748b" font-size="8">4-6 ft AFF (center) per AE spec</text>
  <text x="170" y="184" text-anchor="middle" fill="#475569" font-size="7">Outdoor disconnect required at or adjacent to meter</text>

  <line x1="170" y1="190" x2="170" y2="204" stroke="#facc15" stroke-width="2"/>

  <rect x="28" y="204" width="284" height="62" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="226" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CH FEED-THROUGH PANEL</text>
  <text x="170" y="242" text-anchor="middle" fill="#94a3b8" font-size="9">CHP08B200RF - 200A main disconnect</text>
  <text x="170" y="258" text-anchor="middle" fill="#64748b" font-size="7">NEC 230.85 - SUITABLE FOR USE AS SERVICE DISCONNECT</text>

  <line x1="170" y1="266" x2="170" y2="276" stroke="#facc15" stroke-width="2"/>

  <rect x="78" y="276" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="289" text-anchor="middle" fill="#64748b" font-size="9">4/0-4/0-2/0 AL SER cable through wall</text>

  <line x1="170" y1="294" x2="170" y2="306" stroke="#facc15" stroke-width="2"/>

  <rect x="28" y="306" width="284" height="176" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="326" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="170" y="342" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R - 42-space CH, plug-on neutral</text>
  <!-- Two-column breaker layout -->
  <rect x="167.5" y="360" width="5" height="51" rx="1" fill="#475569" opacity="0.6"/>
  <rect x="130.5" y="362" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="175.5" y="362" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="130.5" y="372" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="175.5" y="372" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="130.5" y="382" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="175.5" y="382" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="130.5" y="392" width="34" height="7" rx="1.5" fill="#22c55e" opacity="0.85"/>
  <rect x="175.5" y="392" width="34" height="7" rx="1.5" fill="#334155"/>
  <rect x="130.5" y="402" width="34" height="7" rx="1.5" fill="#3b82f6" opacity="0.85"/>
  <rect x="175.5" y="402" width="34" height="7" rx="1.5" fill="#334155"/>  <text x="170" y="430" text-anchor="middle" fill="#64748b" font-size="8">Garage / utility room - min 3 ft clearance</text>
  <text x="170" y="446" text-anchor="middle" fill="#475569" font-size="7">AFCI: bedrooms/living | GFCI: kitchen/bath/garage/exterior</text>

  <!-- Ground - outside left, labels offset RIGHT of line -->
  <line x1="28" y1="370" x2="16" y2="370" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="16" y1="370" x2="16" y2="536" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="8" y1="536" x2="24" y2="536" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="6" y="536" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="18" y="536" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="38" y="550" fill="#22c55e" font-size="7">GND RODS</text>

  <line x1="16" y1="510" x2="50" y2="510" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="50" y="502" width="56" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="78" y="515" text-anchor="middle" fill="#22c55e" font-size="8">UFER / CCEG</text>

  <!-- Legend -->
  <rect x="10" y="572" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="588" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="596" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="604" fill="#64748b" font-size="9">Service / Main Panel</text>
  <rect x="140" y="596" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="604" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="240" y="596" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="604" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="22" y="614" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="622" fill="#64748b" font-size="9">Main disconnect</text>
  <line x1="140" y1="618" x2="152" y2="618" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="622" fill="#64748b" font-size="9">Ground / GEC</text>
  <line x1="240" y1="618" x2="252" y2="618" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="622" fill="#64748b" font-size="9">Ufer / CCEG</text>

  <text x="14" y="656" fill="#475569" font-size="7">200A RESIDENTIAL SERVICE - NOT TO SCALE</text>
</svg>`;
