export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 680" font-family="Arial, sans-serif">
  <rect width="340" height="680" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="11">HOTEL — PHASE 3: FLOOR DISTRIBUTION &amp; RISERS</text>

  <!-- Riser from basement -->
  <rect x="167" y="40" width="6" height="400" rx="1" fill="#f59e0b" opacity="0.3"/>
  <text x="160" y="240" text-anchor="end" fill="#f59e0b" font-size="7" transform="rotate(-90,160,240)">ELECTRICAL RISER — BUSWAY OR CONDUIT</text>

  <!-- Floor taps with electrical closets -->
  <line x1="173" y1="80" x2="260" y2="80" stroke="#f59e0b" stroke-width="1"/>
  <rect x="230" y="65" width="90" height="30" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="275" y="80" text-anchor="middle" fill="#94a3b8" font-size="6">FLOOR 5 CLOSET</text>
  <text x="275" y="89" text-anchor="middle" fill="#64748b" font-size="5">Panel + XFMR</text>

  <line x1="173" y1="160" x2="260" y2="160" stroke="#f59e0b" stroke-width="1"/>
  <rect x="230" y="145" width="90" height="30" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="275" y="160" text-anchor="middle" fill="#94a3b8" font-size="6">FLOOR 4 CLOSET</text>
  <text x="275" y="169" text-anchor="middle" fill="#64748b" font-size="5">Panel + XFMR</text>

  <line x1="173" y1="240" x2="260" y2="240" stroke="#f59e0b" stroke-width="1"/>
  <rect x="230" y="225" width="90" height="30" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="275" y="240" text-anchor="middle" fill="#94a3b8" font-size="6">FLOOR 3 CLOSET</text>
  <text x="275" y="249" text-anchor="middle" fill="#64748b" font-size="5">Panel + XFMR</text>

  <line x1="173" y1="320" x2="260" y2="320" stroke="#f59e0b" stroke-width="1"/>
  <rect x="230" y="305" width="90" height="30" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="275" y="320" text-anchor="middle" fill="#94a3b8" font-size="6">FLOOR 2 CLOSET</text>
  <text x="275" y="329" text-anchor="middle" fill="#64748b" font-size="5">Panel + XFMR</text>

  <line x1="173" y1="400" x2="260" y2="400" stroke="#f59e0b" stroke-width="1"/>
  <rect x="230" y="385" width="90" height="30" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="275" y="400" text-anchor="middle" fill="#94a3b8" font-size="6">FLOOR 1 CLOSET</text>
  <text x="275" y="409" text-anchor="middle" fill="#64748b" font-size="5">Panel + XFMR</text>

  <!-- Emergency riser (separate) -->
  <rect x="100" y="40" width="4" height="400" rx="1" fill="#ef4444" opacity="0.3"/>
  <text x="95" y="240" text-anchor="end" fill="#ef4444" font-size="6" transform="rotate(-90,95,240)">EMERGENCY RISER (SEPARATE)</text>

  <!-- Closet detail -->
  <text x="170" y="465" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">TYPICAL ELECTRICAL CLOSET</text>
  <rect x="30" y="475" width="280" height="90" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.5"/>
  <text x="45" y="493" fill="#f59e0b" font-size="6">● 75kVA step-down transformer (480V → 208/120V)</text>
  <text x="45" y="505" fill="#f59e0b" font-size="6">● Floor distribution panel (42-space, 225-400A)</text>
  <text x="45" y="517" fill="#ef4444" font-size="6">● Emergency panel (20-space, egress + fire alarm)</text>
  <text x="45" y="529" fill="#3b82f6" font-size="6">● Telecom/data rack or panel (coordinate w/ low-voltage)</text>
  <text x="45" y="541" fill="#64748b" font-size="6">● Fire-rated closet, 2-hour minimum, stacked vertically</text>
  <text x="45" y="553" fill="#64748b" font-size="6">● Minimum 3 ft working clearance per NEC 110.26</text>

  <text x="170" y="590" text-anchor="middle" fill="#475569" font-size="6">HOTEL BUILD-OUT — PHASE 3 OF 7</text>
</svg>`;
