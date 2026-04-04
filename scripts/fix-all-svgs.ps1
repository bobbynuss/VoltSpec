
$file = 'C:\Users\bobnu\projects\voltspec\lib\data.ts'
$c = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

function Set-SVG($content, $jobId, $newSVG) {
  $search = 'id:"' + $jobId + '"'
  $idIdx = $content.IndexOf($search)
  if ($idIdx -lt 0) { Write-Host "NOT FOUND: $jobId"; return $content }
  $svgIdx = $content.IndexOf('svgDiagram:`<svg', $idIdx)
  if ($svgIdx -lt 0) { Write-Host "NO SVG: $jobId"; return $content }
  $svgClose = $content.IndexOf('</svg>', $svgIdx)
  $backtick = $content.IndexOf('`', $svgClose)
  $newBlock = '`' + $newSVG.Trim() + '`'
  Write-Host "Replaced: $jobId"
  return $content.Substring(0, $svgIdx + 'svgDiagram:'.Length) + $newBlock + $content.Substring($backtick + 1)
}

# ── SHARED LEGEND TEMPLATE (y=492..572) ──────────────────────────────────────
# Called by building legend inline in each SVG

# ─────────────────────────────────────────────────────────────────────────────
# JOB 1: new-200a-residential
# ─────────────────────────────────────────────────────────────────────────────
$svg1 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">NEW 200A SINGLE-PHASE RESIDENTIAL SERVICE</text>
  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE)</text>
  <line x1="152" y1="50" x2="156" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="50" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="188" y1="50" x2="184" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,68 Q170,56 180,68 Z" fill="#facc15"/>
  <rect x="167" y="68" width="6" height="22" rx="1" fill="#334155"/>
  <rect x="86" y="93" width="168" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="106" text-anchor="middle" fill="#64748b" font-size="9">1-1/4 in. Sch 80 PVC — exterior wall run</text>
  <line x1="170" y1="90" x2="170" y2="93" stroke="#475569" stroke-width="2"/>
  <line x1="170" y1="111" x2="170" y2="118" stroke="#475569" stroke-width="2"/>
  <rect x="28" y="118" width="284" height="82" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="140" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">METER BASE</text>
  <text x="170" y="156" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH — 200A ringless single-phase, AE-approved</text>
  <text x="170" y="171" text-anchor="middle" fill="#64748b" font-size="9">4 to 6 ft AFF (center of meter) per AE spec</text>
  <text x="170" y="186" text-anchor="middle" fill="#475569" font-size="8">Outdoor main disconnect required at or adjacent to meter</text>
  <line x1="170" y1="200" x2="170" y2="214" stroke="#facc15" stroke-width="2"/>
  <rect x="28" y="214" width="284" height="68" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="236" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CH FEED-THROUGH PANEL</text>
  <text x="170" y="252" text-anchor="middle" fill="#94a3b8" font-size="9">CHP08B200RF — 200A main disconnect at meter location</text>
  <text x="170" y="267" text-anchor="middle" fill="#64748b" font-size="8">NEC 230.85 — labeled: SUITABLE FOR USE AS SERVICE DISCONNECT</text>
  <line x1="170" y1="282" x2="170" y2="296" stroke="#facc15" stroke-width="2"/>
  <rect x="92" y="284" width="156" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="297" text-anchor="middle" fill="#64748b" font-size="9">2/0-2/0-1/0 AL SER cable through wall</text>
  <line x1="170" y1="302" x2="170" y2="310" stroke="#facc15" stroke-width="2"/>
  <rect x="28" y="310" width="284" height="88" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="332" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="170" y="348" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R — 42-space CH, plug-on neutral</text>
  <rect x="46" y="356" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="66" y="356" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="86" y="356" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="106" y="356" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="126" y="356" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="146" y="356" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="166" y="356" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="186" y="356" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="206" y="356" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="226" y="356" width="16" height="8" rx="1" fill="#334155"/>
  <text x="170" y="378" text-anchor="middle" fill="#64748b" font-size="8">Garage / utility room — min 3 ft clearance in front</text>
  <text x="170" y="392" text-anchor="middle" fill="#475569" font-size="7">AFCI: bedrooms/living  |  GFCI: kitchen/bath/garage/exterior</text>
  <line x1="28" y1="368" x2="12" y2="368" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="12" y1="368" x2="12" y2="458" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="4" y1="458" x2="20" y2="458" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="2" y="458" width="9" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="14" y="458" width="9" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="11" y="456" text-anchor="middle" fill="#22c55e" font-size="7">RODS</text>
  <line x1="12" y1="434" x2="48" y2="434" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="48" y="426" width="56" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="76" y="438" text-anchor="middle" fill="#22c55e" font-size="8">UFER / CCEG</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="527" fill="#64748b" font-size="9">Service / Main Panel</text>
  <rect x="140" y="518" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="527" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="527" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="545" fill="#64748b" font-size="9">Main disconnect</text>
  <line x1="140" y1="540" x2="152" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="545" fill="#64748b" font-size="9">Ground / GEC</text>
  <line x1="240" y1="540" x2="252" y2="540" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="545" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <text x="14" y="566" fill="#475569" font-size="7">200A RESIDENTIAL SERVICE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────────
# JOB 2: 200a-upgrade
# ─────────────────────────────────────────────────────────────────────────────
$svg2 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">200A SERVICE UPGRADE / PANEL SWAP</text>
  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY SERVICE DROP</text>
  <line x1="148" y1="50" x2="153" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="163" y1="50" x2="166" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="50" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="177" y1="50" x2="174" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="192" y1="50" x2="187" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,68 Q170,56 180,68 Z" fill="#facc15"/>
  <rect x="167" y="68" width="6" height="22" rx="1" fill="#334155"/>
  <rect x="28" y="96" width="284" height="82" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="118" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">METER BASE</text>
  <text x="170" y="134" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH — replace only if upgrading meter base</text>
  <text x="170" y="149" text-anchor="middle" fill="#64748b" font-size="9">AE ESPA required — coordinate meter pull with AE</text>
  <text x="170" y="164" text-anchor="middle" fill="#475569" font-size="8">AE typically needs 4-hour notice for meter pull window</text>
  <line x1="170" y1="178" x2="170" y2="192" stroke="#facc15" stroke-width="2"/>
  <rect x="28" y="192" width="284" height="68" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="214" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CH FEED-THROUGH PANEL</text>
  <text x="170" y="230" text-anchor="middle" fill="#94a3b8" font-size="9">CHP08B200RF — 200A outdoor disconnect at meter</text>
  <text x="170" y="245" text-anchor="middle" fill="#64748b" font-size="8">Install if existing outdoor disconnect is absent</text>
  <line x1="170" y1="260" x2="170" y2="274" stroke="#facc15" stroke-width="2"/>
  <rect x="92" y="262" width="156" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="275" text-anchor="middle" fill="#64748b" font-size="9">2/0-2/0-1/0 AL SER cable to new panel</text>
  <line x1="170" y1="280" x2="170" y2="288" stroke="#facc15" stroke-width="2"/>
  <rect x="28" y="288" width="284" height="100" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="310" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">NEW 200A MAIN PANEL</text>
  <text x="170" y="326" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R — 42-space CH, plug-on neutral</text>
  <rect x="46" y="334" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="66" y="334" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="86" y="334" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="106" y="334" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="126" y="334" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="146" y="334" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="166" y="334" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="186" y="334" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="206" y="334" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="226" y="334" width="16" height="8" rx="1" fill="#334155"/>
  <text x="170" y="356" text-anchor="middle" fill="#64748b" font-size="8">Transfer existing circuits — AFCI/GFCI on all new work</text>
  <text x="170" y="370" text-anchor="middle" fill="#64748b" font-size="8">Verify conductor sizes — upsize undersized runs</text>
  <text x="170" y="382" text-anchor="middle" fill="#475569" font-size="7">Install arc flash label per NEC 110.16</text>
  <line x1="28" y1="348" x2="12" y2="348" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="12" y1="348" x2="12" y2="448" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="4" y1="448" x2="20" y2="448" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="2" y="448" width="9" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="14" y="448" width="9" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="11" y="446" text-anchor="middle" fill="#22c55e" font-size="7">RODS</text>
  <line x1="12" y1="424" x2="48" y2="424" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="48" y="416" width="56" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="76" y="428" text-anchor="middle" fill="#22c55e" font-size="8">UFER / CCEG</text>
  <text x="170" y="460" text-anchor="middle" fill="#64748b" font-size="8">Verify/upgrade ground electrode system to NEC 250</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="527" fill="#64748b" font-size="9">Service / Main Panel</text>
  <rect x="140" y="518" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="527" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="527" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="545" fill="#64748b" font-size="9">Main disconnect</text>
  <line x1="140" y1="540" x2="152" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="545" fill="#64748b" font-size="9">Ground / GEC</text>
  <line x1="240" y1="540" x2="252" y2="540" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="545" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <text x="14" y="566" fill="#475569" font-size="7">200A SERVICE UPGRADE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────────
# JOBS 3-13: update viewBox 320x520 -> 340x580, shift content x+10, legend y+72
# We'll rewrite each one cleanly at the new dimensions
# ─────────────────────────────────────────────────────────────────────────────

$svg3 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">NEW 400A SERVICE - DUAL 200A PANELS</text>
  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE) - 4-wire service</text>
  <line x1="140" y1="50" x2="145" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="160" y1="50" x2="162" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="50" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="180" y1="50" x2="178" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="200" y1="50" x2="195" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,68 Q170,56 180,68 Z" fill="#facc15"/>
  <rect x="167" y="68" width="6" height="20" rx="1" fill="#334155"/>
  <rect x="28" y="92" width="284" height="78" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="114" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">DUAL 200A METER BASES</text>
  <text x="170" y="130" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH x2 - AE Engineering Approval Required</text>
  <text x="170" y="145" text-anchor="middle" fill="#64748b" font-size="9">350 kcmil AL XHHW-2 service conductors</text>
  <text x="170" y="159" text-anchor="middle" fill="#475569" font-size="8">Load calc required showing demand over 160A continuous</text>
  <line x1="170" y1="170" x2="170" y2="184" stroke="#facc15" stroke-width="2"/>
  <line x1="90" y1="184" x2="250" y2="184" stroke="#facc15" stroke-width="2"/>
  <line x1="90" y1="184" x2="90" y2="198" stroke="#facc15" stroke-width="2"/>
  <line x1="250" y1="184" x2="250" y2="198" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="181" text-anchor="middle" fill="#64748b" font-size="8">Split to two 200A panels</text>
  <rect x="18" y="198" width="136" height="78" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="86" y="220" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">PANEL A</text>
  <text x="86" y="236" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="30" y="244" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="48" y="244" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="66" y="244" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="84" y="244" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="102" y="244" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="120" y="244" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="86" y="268" text-anchor="middle" fill="#475569" font-size="8">42-space CH</text>
  <rect x="186" y="198" width="136" height="78" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="254" y="220" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">PANEL B</text>
  <text x="254" y="236" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="198" y="244" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="216" y="244" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="234" y="244" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="252" y="244" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="270" y="244" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="288" y="244" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="254" y="268" text-anchor="middle" fill="#475569" font-size="8">42-space CH</text>
  <line x1="86" y1="276" x2="86" y2="308" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="254" y1="276" x2="254" y2="308" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="86" y1="308" x2="254" y2="308" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="170" y1="308" x2="170" y2="336" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="150" y1="336" x2="190" y2="336" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="136" y="336" width="14" height="28" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="154" y="336" width="14" height="28" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="143" y="334" text-anchor="middle" fill="#22c55e" font-size="8">ROD1</text>
  <text x="161" y="334" text-anchor="middle" fill="#22c55e" font-size="8">ROD2</text>
  <text x="170" y="376" text-anchor="middle" fill="#475569" font-size="8">5/8 x 8ft copper-bonded - 6ft apart minimum</text>
  <line x1="86" y1="308" x2="46" y2="308" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="14" y="300" width="46" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="37" y="312" text-anchor="middle" fill="#22c55e" font-size="8">UFER</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="527" fill="#64748b" font-size="9">Service / Panel</text>
  <rect x="140" y="518" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="527" fill="#64748b" font-size="9">AFCI / Ground</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="527" fill="#64748b" font-size="9">GFCI</text>
  <line x1="22" y1="540" x2="34" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="545" fill="#64748b" font-size="9">Grounding system</text>
  <line x1="140" y1="540" x2="152" y2="540" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="158" y="545" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <line x1="240" y1="540" x2="252" y2="540" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="545" fill="#64748b" font-size="9">Utility (AE)</text>
  <text x="14" y="566" fill="#475569" font-size="7">400A RESIDENTIAL SERVICE - NOT TO SCALE</text>
</svg>
'@

$svg4 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">LEVEL 2 EV CHARGER - 50A 240V DEDICATED</text>
  <rect x="70" y="40" width="200" height="68" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">200A Service</text>
  <rect x="86" y="86" width="52" height="18" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="112" y="99" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">50A GFCI</text>
  <text x="148" y="97" fill="#64748b" font-size="8">CHFP250GF</text>
  <line x1="170" y1="108" x2="170" y2="124" stroke="#facc15" stroke-width="2"/>
  <rect x="78" y="112" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="125" text-anchor="middle" fill="#64748b" font-size="9">6 AWG THHN in 3/4 in. EMT conduit</text>
  <line x1="170" y1="130" x2="170" y2="158" stroke="#facc15" stroke-width="2"/>
  <rect x="106" y="158" width="128" height="48" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="170" y="178" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">LB25 CONDULET</text>
  <text x="170" y="196" text-anchor="middle" fill="#64748b" font-size="8">Exterior wall penetration - Crouse-Hinds CRS</text>
  <line x1="170" y1="206" x2="170" y2="238" stroke="#facc15" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="182" y="222" fill="#64748b" font-size="9">~40 ft run to garage</text>
  <text x="182" y="236" fill="#64748b" font-size="8">EMT on wall / ceiling</text>
  <rect x="78" y="242" width="184" height="76" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="264" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">NEMA 14-50R</text>
  <text x="170" y="280" text-anchor="middle" fill="#94a3b8" font-size="9">TP403 box - 4-square deep</text>
  <text x="170" y="296" text-anchor="middle" fill="#64748b" font-size="8">48 in. AFF - driver side of parking space</text>
  <text x="170" y="310" text-anchor="middle" fill="#475569" font-size="7">MM420C in-use cover if outlet is outdoors</text>
  <line x1="170" y1="318" x2="170" y2="340" stroke="#f97316" stroke-width="2"/>
  <rect x="60" y="340" width="220" height="74" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="364" text-anchor="middle" fill="#22c55e" font-size="12" font-weight="bold">LEVEL 2 EVSE</text>
  <text x="170" y="380" text-anchor="middle" fill="#94a3b8" font-size="9">Plug-in unit - NEMA 14-50 plug</text>
  <text x="170" y="396" text-anchor="middle" fill="#64748b" font-size="8">7.2 kW output - approx 25 miles per hour charge</text>
  <line x1="170" y1="414" x2="170" y2="432" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="448" text-anchor="middle" fill="#475569" font-size="9">EV charge cable to vehicle</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="527" fill="#64748b" font-size="9">GFCI 2-pole 50A breaker</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="527" fill="#64748b" font-size="9">NEMA 14-50 outlet</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="40" y="545" fill="#64748b" font-size="9">EVSE unit</text>
  <rect x="190" y="536" width="12" height="8" rx="1" fill="#475569"/>
  <text x="208" y="545" fill="#64748b" font-size="9">LB condulet / conduit run</text>
  <text x="14" y="566" fill="#475569" font-size="7">LEVEL 2 EV CHARGER - NOT TO SCALE</text>
</svg>
'@

$svg5 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">100A SUBPANEL ADDITION - 4-WIRE FEEDER</text>
  <rect x="70" y="40" width="200" height="88" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL - 200A</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="86" y="86" width="58" height="26" rx="2" fill="#f97316" opacity="0.9"/>
  <text x="115" y="99" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">CHF2100</text>
  <text x="115" y="111" text-anchor="middle" fill="#fff" font-size="8">100A 2-pole</text>
  <text x="154" y="101" fill="#64748b" font-size="8">Feeder breaker</text>
  <line x1="170" y1="128" x2="170" y2="148" stroke="#f97316" stroke-width="2.5"/>
  <rect x="68" y="136" width="204" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="149" text-anchor="middle" fill="#64748b" font-size="9">3 AWG THHN - 1-1/4 in. EMT - 4-wire feeder</text>
  <rect x="36" y="160" width="268" height="38" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="178" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">ISOLATED NEUTRAL required in subpanel - NEC 250.32</text>
  <text x="170" y="192" text-anchor="middle" fill="#64748b" font-size="8">L1 + L2 + Neutral + Ground - four separate conductors</text>
  <line x1="170" y1="198" x2="170" y2="214" stroke="#f97316" stroke-width="2.5"/>
  <rect x="50" y="214" width="240" height="92" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="237" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">100A SUBPANEL</text>
  <text x="170" y="253" text-anchor="middle" fill="#94a3b8" font-size="9">CHP24L125X2 - MLO - 24-space - indoor</text>
  <rect x="68" y="262" width="18" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="90" y="262" width="18" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="112" y="262" width="18" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="134" y="262" width="18" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="156" y="262" width="18" height="8" rx="1" fill="#334155"/>
  <rect x="178" y="262" width="18" height="8" rx="1" fill="#334155"/>
  <rect x="200" y="262" width="18" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="222" y="262" width="18" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="170" y="284" text-anchor="middle" fill="#64748b" font-size="8">Garage / Shop / Detached Structure</text>
  <text x="170" y="298" text-anchor="middle" fill="#475569" font-size="7">AFCI / GFCI / 30A / 50A branch circuits</text>
  <line x1="50" y1="268" x2="28" y2="268" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="28" y1="268" x2="28" y2="362" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="20" y="362" width="14" height="28" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="27" y="360" text-anchor="middle" fill="#22c55e" font-size="8">GND ROD</text>
  <text x="27" y="404" text-anchor="middle" fill="#475569" font-size="7">If detached structure</text>
  <text x="27" y="416" text-anchor="middle" fill="#475569" font-size="7">per NEC 250.32</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="527" fill="#64748b" font-size="9">100A feeder / subpanel</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="208" y="527" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="545" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="190" y="536" width="12" height="8" rx="1" fill="#334155"/>
  <text x="208" y="545" fill="#64748b" font-size="9">Standard breaker</text>
  <text x="14" y="566" fill="#475569" font-size="7">100A SUBPANEL ADDITION - NOT TO SCALE</text>
</svg>
'@

$svg6 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">WHOLE-HOUSE GENERATOR + ATS</text>
  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP</text>
  <line x1="158" y1="50" x2="161" y2="66" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="50" x2="170" y2="66" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="182" y1="50" x2="179" y2="66" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="52" y="70" width="236" height="70" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
  <text x="170" y="93" text-anchor="middle" fill="#a855f7" font-size="12" font-weight="bold">200A ATS</text>
  <text x="170" y="109" text-anchor="middle" fill="#94a3b8" font-size="9">Eaton CHSPT2ULTRA</text>
  <text x="170" y="124" text-anchor="middle" fill="#64748b" font-size="8">Anti-islanding - auto transfer under 10 sec - NEC 702</text>
  <line x1="52" y1="105" x2="24" y2="105" stroke="#f97316" stroke-width="2"/>
  <line x1="24" y1="105" x2="24" y2="290" stroke="#f97316" stroke-width="2"/>
  <rect x="4" y="290" width="130" height="90" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="69" y="314" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">GENERATOR</text>
  <text x="69" y="330" text-anchor="middle" fill="#94a3b8" font-size="9">Generac 7043</text>
  <text x="69" y="346" text-anchor="middle" fill="#64748b" font-size="8">22kW Natural Gas</text>
  <text x="69" y="361" text-anchor="middle" fill="#64748b" font-size="7">Concrete pad - 18 in. from openings</text>
  <text x="69" y="374" text-anchor="middle" fill="#94a3b8" font-size="7">Bond at generator chassis only</text>
  <line x1="24" y1="278" x2="24" y2="258" stroke="#475569" stroke-width="3"/>
  <text x="36" y="270" fill="#64748b" font-size="7">1 in. LFMC</text>
  <line x1="170" y1="140" x2="170" y2="162" stroke="#facc15" stroke-width="2"/>
  <rect x="60" y="162" width="220" height="88" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="185" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="170" y="201" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="76" y="210" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="94" y="210" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="112" y="210" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="130" y="210" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="148" y="210" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="166" y="210" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="184" y="210" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="202" y="210" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="220" y="210" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="238" y="210" width="14" height="7" rx="1" fill="#334155"/>
  <text x="170" y="236" text-anchor="middle" fill="#475569" font-size="8">All house loads</text>
  <line x1="60" y1="220" x2="44" y2="220" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="44" y1="220" x2="44" y2="392" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="30" y1="392" x2="58" y2="392" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="24" y="392" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="50" y="392" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="44" y="390" text-anchor="middle" fill="#22c55e" font-size="8">GND RODS</text>
  <line x1="150" y1="380" x2="150" y2="426" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="162" y="402" fill="#fbbf24" font-size="8">NATGAS</text>
  <text x="162" y="415" fill="#475569" font-size="7">(plumber)</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#a855f7" opacity="0.9"/>
  <text x="40" y="527" fill="#64748b" font-size="9">ATS transfer switch</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="527" fill="#64748b" font-size="9">Generator feed</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="545" fill="#64748b" font-size="9">Utility / main panel</text>
  <rect x="190" y="536" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="208" y="545" fill="#64748b" font-size="9">AFCI / ground</text>
  <text x="14" y="566" fill="#475569" font-size="7">GENERATOR + ATS - NOT TO SCALE</text>
</svg>
'@

# SVGs 7-13 are in fix-all-svgs3.ps1

# ─────────────────────────────────────────────────────────────────────────────
# APPLY SVGs 1-6
# ─────────────────────────────────────────────────────────────────────────────
$c = Set-SVG $c "new-200a-residential" $svg1
$c = Set-SVG $c "200a-upgrade" $svg2
$c = Set-SVG $c "new-400a-service" $svg3
$c = Set-SVG $c "ev-charger-50a" $svg4
$c = Set-SVG $c "100a-subpanel" $svg5
$c = Set-SVG $c "generator-ats" $svg6

[System.IO.File]::WriteAllText($file, $c, (New-Object System.Text.UTF8Encoding $true))
Write-Host "Done - SVGs 1-6 replaced"