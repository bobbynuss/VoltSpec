export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 755" font-family="Arial, sans-serif">
  <rect width="340" height="755" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">80A / 100A LEVEL 2 EV CHARGER - HARDWIRED</text>

  <!-- Main panel -->
  <rect x="60" y="40" width="220" height="66" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">200A Service - verify capacity</text>
  <rect x="78" y="86" width="58" height="16" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="107" y="98" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">100A GFCI</text>
  <text x="146" y="97" fill="#64748b" font-size="8">CHFP2100GF</text>

  <line x1="170" y1="106" x2="170" y2="122" stroke="#3b82f6" stroke-width="2.5"/>

  <!-- Load calculation callout (+20px height: 42→62) -->
  <rect x="28" y="122" width="284" height="62" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
  <text x="170" y="143" text-anchor="middle" fill="#ef4444" font-size="9" font-weight="bold">LOAD CALCULATION REQUIRED</text>
  <text x="170" y="158" text-anchor="middle" fill="#64748b" font-size="7">NEC 220 - verify 200A panel can support 80A continuous + existing loads</text>
  <text x="170" y="173" text-anchor="middle" fill="#475569" font-size="6">May require 400A service upgrade if loads exceed panel capacity</text>

  <line x1="170" y1="184" x2="170" y2="200" stroke="#3b82f6" stroke-width="2"/>

  <!-- Conduit run -->
  <rect x="68" y="200" width="204" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="213" text-anchor="middle" fill="#64748b" font-size="9">4 AWG THHN in 1-1/4 in. EMT conduit</text>

  <line x1="170" y1="218" x2="170" y2="238" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="184" y="232" fill="#64748b" font-size="8">~30-60 ft run to garage</text>

  <!-- Disconnect -->
  <rect x="60" y="242" width="220" height="52" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="264" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">100A DISCONNECT</text>
  <text x="170" y="280" text-anchor="middle" fill="#94a3b8" font-size="9">DPF222R - 100A non-fusible NEMA 3R</text>
  <text x="170" y="292" text-anchor="middle" fill="#64748b" font-size="7">Within sight of EVSE - NEC 625.43</text>

  <line x1="170" y1="294" x2="170" y2="314" stroke="#3b82f6" stroke-width="2"/>

  <!-- EVSE unit (+25px height: 100→125) -->
  <rect x="40" y="314" width="260" height="125" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2.5"/>
  <text x="170" y="340" text-anchor="middle" fill="#22c55e" font-size="13" font-weight="bold">HARDWIRED EVSE</text>
  <text x="170" y="360" text-anchor="middle" fill="#94a3b8" font-size="9">80A / 19.2kW - Level 2 - 240V</text>
  <text x="170" y="380" text-anchor="middle" fill="#64748b" font-size="8">Tesla Wall Connector / ChargePoint Home Flex</text>
  <text x="170" y="400" text-anchor="middle" fill="#475569" font-size="7">GFCI protection built into EVSE per NEC 625.54</text>
  <text x="170" y="418" text-anchor="middle" fill="#475569" font-size="7">48 in. AFF - driver side of parking area</text>

  <line x1="170" y1="439" x2="170" y2="458" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="474" text-anchor="middle" fill="#475569" font-size="9">EV charge cable to vehicle</text>
  <text x="170" y="492" text-anchor="middle" fill="#22c55e" font-size="8" font-weight="bold">~37-44 mi/hr charge rate</text>

  <!-- NEC notes (+25px gap, +20px height: 42→62) -->
  <rect x="28" y="533" width="284" height="62" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="170" y="554" text-anchor="middle" fill="#94a3b8" font-size="8" font-weight="bold">NEC 625 NOTES</text>
  <text x="170" y="570" text-anchor="middle" fill="#64748b" font-size="7">100A breaker required for 80A continuous load (125% rule)</text>
  <text x="170" y="584" text-anchor="middle" fill="#64748b" font-size="7">Hardwired connection - no receptacle - per manufacturer</text>

  <!-- Legend -->
  <rect x="10" y="667" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="683" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="691" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="699" fill="#64748b" font-size="9">100A GFCI dedicated circuit</text>
  <rect x="190" y="691" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="699" fill="#64748b" font-size="9">100A disconnect</text>
  <rect x="22" y="709" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="40" y="717" fill="#64748b" font-size="9">Hardwired EVSE unit</text>
  <rect x="190" y="709" width="12" height="8" rx="1" fill="#ef4444" opacity="0.7"/>
  <text x="208" y="717" fill="#64748b" font-size="9">Load calc required</text>
  <text x="14" y="751" fill="#475569" font-size="7">80A/100A EV CHARGER - NOT TO SCALE</text>
</svg>`;
