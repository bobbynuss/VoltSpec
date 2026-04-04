export const diagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 560" font-family="Arial, sans-serif">
  <rect width="340" height="560" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">METER BASE REPLACEMENT / UPGRADE</text>

  <!-- Utility drop -->
  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE) - overhead or underground</text>
  <line x1="152" y1="54" x2="156" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="188" y1="54" x2="184" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Weatherhead -->
  <path d="M160,70 Q170,58 180,70 Z" fill="#facc15"/>
  <rect x="167" y="70" width="6" height="16" rx="1" fill="#334155"/>
  <line x1="170" y1="86" x2="170" y2="100" stroke="#facc15" stroke-width="2"/>

  <!-- Mast / Riser -->
  <rect x="162" y="86" width="16" height="14" rx="1" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="200" y="96" fill="#475569" font-size="7">2 in. RMC mast</text>

  <!-- Meter Socket -->
  <rect x="50" y="100" width="240" height="90" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="122" text-anchor="middle" fill="#facc15" font-size="12" font-weight="bold">200A METER SOCKET</text>
  <text x="170" y="138" text-anchor="middle" fill="#94a3b8" font-size="9">Milbank U5135-XL-200 — ringless lever-bypass</text>
  <text x="170" y="154" text-anchor="middle" fill="#64748b" font-size="8">4-jaw, single-phase, OH/UG rated</text>
  <text x="170" y="168" text-anchor="middle" fill="#475569" font-size="7">Utility seals meter — contractor installs socket only</text>

  <!-- SE conductors -->
  <line x1="170" y1="190" x2="170" y2="216" stroke="#facc15" stroke-width="2"/>
  <text x="200" y="206" fill="#64748b" font-size="7">2/0 AL SER or XHHW-2</text>

  <!-- Main disconnect -->
  <rect x="90" y="216" width="160" height="56" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="236" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">MAIN DISCONNECT</text>
  <text x="170" y="250" text-anchor="middle" fill="#94a3b8" font-size="8">200A non-fusible, NEMA 3R</text>
  <text x="170" y="264" text-anchor="middle" fill="#475569" font-size="7">NEC 230.85 — emergency disconnect required</text>

  <!-- To existing panel -->
  <line x1="170" y1="272" x2="170" y2="310" stroke="#facc15" stroke-width="2"/>
  <text x="200" y="294" fill="#64748b" font-size="7">Existing SE conductors</text>

  <!-- Existing Panel -->
  <rect x="60" y="310" width="220" height="70" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="170" y="334" text-anchor="middle" fill="#475569" font-size="10" font-weight="bold">EXISTING PANEL</text>
  <text x="170" y="350" text-anchor="middle" fill="#475569" font-size="8">(not replaced — meter base job only)</text>
  <text x="170" y="366" text-anchor="middle" fill="#475569" font-size="7">Verify panel rated for new service amperage</text>

  <!-- Grounding -->
  <line x1="170" y1="380" x2="170" y2="408" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="140" y1="408" x2="200" y2="408" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="134" y="408" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="164" y="408" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="194" y="408" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="450" text-anchor="middle" fill="#22c55e" font-size="8">GROUND ELECTRODE SYSTEM</text>
  <text x="170" y="462" text-anchor="middle" fill="#475569" font-size="7">5/8 x 8 ft copper-bonded rods — 6 ft apart min</text>

  <!-- Legend -->
  <rect x="10" y="478" width="320" height="68" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="494" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="502" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="510" fill="#64748b" font-size="9">New meter base / disconnect</text>
  <rect x="180" y="502" width="12" height="8" rx="1" fill="#475569" opacity="0.6"/>
  <text x="198" y="510" fill="#64748b" font-size="9">Existing (unchanged)</text>
  <line x1="22" y1="526" x2="34" y2="526" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="530" fill="#64748b" font-size="9">Grounding system</text>
  <line x1="180" y1="526" x2="192" y2="526" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="198" y="530" fill="#64748b" font-size="9">Utility (AE)</text>
  <text x="14" y="556" fill="#475569" font-size="7">METER BASE REPLACEMENT - NOT TO SCALE</text>
</svg>`;
