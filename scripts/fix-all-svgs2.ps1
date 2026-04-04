
$file = 'C:\Users\bobnu\projects\voltspec\lib\data.ts'
$c = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

function Set-SVG($content, $jobId, $newSVG) {
  $search = 'id: "' + $jobId + '"'
  $idIdx = $content.IndexOf($search)
  if ($idIdx -lt 0) { Write-Host "NOT FOUND: $jobId"; return $content }
  $svgIdx = $content.IndexOf('svgDiagram: `<svg', $idIdx)
  if ($svgIdx -lt 0) { Write-Host "NO SVG: $jobId"; return $content }
  $svgClose = $content.IndexOf('</svg>', $svgIdx)
  $backtick = $content.IndexOf('`', $svgClose)
  $newBlock = '`' + $newSVG.Trim() + '`'
  Write-Host "Replaced: $jobId"
  return $content.Substring(0, $svgIdx + 'svgDiagram: '.Length) + $newBlock + $content.Substring($backtick + 1)
}

$LG = @'
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
'@

# ─────────── 1: new-200a-residential ────────────────────────────────────────
$s1 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">NEW 200A SINGLE-PHASE RESIDENTIAL SERVICE</text>
  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE)</text>
  <line x1="152" y1="50" x2="156" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="50" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="188" y1="50" x2="184" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,68 Q170,56 180,68 Z" fill="#facc15"/>
  <rect x="167" y="68" width="6" height="22" rx="1" fill="#334155"/>
  <rect x="82" y="94" width="176" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="107" text-anchor="middle" fill="#64748b" font-size="9">1-1/4 in. Sch 80 PVC — exterior wall run</text>
  <line x1="170" y1="112" x2="170" y2="120" stroke="#475569" stroke-width="2"/>
  <rect x="28" y="120" width="284" height="86" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="142" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">METER BASE</text>
  <text x="170" y="158" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH — 200A ringless, AE-approved</text>
  <text x="170" y="174" text-anchor="middle" fill="#64748b" font-size="8">4 to 6 ft AFF (center of meter) per AE spec</text>
  <text x="170" y="188" text-anchor="middle" fill="#475569" font-size="7">Outdoor disconnect required at or adjacent to meter</text>
  <line x1="170" y1="206" x2="170" y2="218" stroke="#facc15" stroke-width="2"/>
  <rect x="28" y="218" width="284" height="70" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="240" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CH FEED-THROUGH PANEL</text>
  <text x="170" y="256" text-anchor="middle" fill="#94a3b8" font-size="9">CHP08B200RF — 200A main disconnect</text>
  <text x="170" y="271" text-anchor="middle" fill="#64748b" font-size="8">NEC 230.85 — Label: SUITABLE FOR USE AS SERVICE DISCONNECT</text>
  <line x1="170" y1="288" x2="170" y2="300" stroke="#facc15" stroke-width="2"/>
  <rect x="90" y="288" width="160" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="301" text-anchor="middle" fill="#64748b" font-size="9">2/0-2/0-1/0 AL SER cable through wall</text>
  <line x1="170" y1="306" x2="170" y2="316" stroke="#facc15" stroke-width="2"/>
  <rect x="28" y="316" width="284" height="90" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="338" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="170" y="354" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R — 42-space CH, plug-on neutral</text>
  <rect x="44" y="362" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="62" y="362" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="80" y="362" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="98" y="362" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="116" y="362" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="134" y="362" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="152" y="362" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="170" y="362" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="188" y="362" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="206" y="362" width="14" height="7" rx="1" fill="#334155"/>
  <text x="170" y="384" text-anchor="middle" fill="#64748b" font-size="8">Garage / utility room — min 3 ft clearance in front</text>
  <text x="170" y="398" text-anchor="middle" fill="#475569" font-size="7">AFCI: bedrooms/living  |  GFCI: kitchen/bath/garage/exterior</text>
  <line x1="28" y1="374" x2="12" y2="374" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="12" y1="374" x2="12" y2="452" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="4" y1="452" x2="20" y2="452" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="2" y="452" width="9" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="14" y="452" width="9" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="11" y="450" text-anchor="middle" fill="#22c55e" font-size="7">RODS</text>
  <line x1="12" y1="430" x2="46" y2="430" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="46" y="422" width="56" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="74" y="434" text-anchor="middle" fill="#22c55e" font-size="8">UFER / CCEG</text>
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

# ─────────── 2: 200a-upgrade ────────────────────────────────────────────────
$s2 = @'
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
  <rect x="28" y="96" width="284" height="86" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="118" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">METER BASE</text>
  <text x="170" y="134" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH — replace only if upgrading meter base</text>
  <text x="170" y="150" text-anchor="middle" fill="#64748b" font-size="8">AE ESPA required — coordinate meter pull with AE</text>
  <text x="170" y="165" text-anchor="middle" fill="#475569" font-size="7">AE typically needs 4-hour notice for meter pull window</text>
  <line x1="170" y1="182" x2="170" y2="196" stroke="#facc15" stroke-width="2"/>
  <rect x="28" y="196" width="284" height="70" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="218" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CH FEED-THROUGH PANEL</text>
  <text x="170" y="234" text-anchor="middle" fill="#94a3b8" font-size="9">CHP08B200RF — 200A outdoor disconnect at meter</text>
  <text x="170" y="249" text-anchor="middle" fill="#64748b" font-size="8">Install if existing outdoor disconnect is absent</text>
  <line x1="170" y1="266" x2="170" y2="278" stroke="#facc15" stroke-width="2"/>
  <rect x="90" y="266" width="160" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="279" text-anchor="middle" fill="#64748b" font-size="9">2/0-2/0-1/0 AL SER cable to new panel</text>
  <line x1="170" y1="284" x2="170" y2="294" stroke="#facc15" stroke-width="2"/>
  <rect x="28" y="294" width="284" height="102" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="316" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">NEW 200A MAIN PANEL</text>
  <text x="170" y="332" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R — 42-space CH, plug-on neutral</text>
  <rect x="44" y="340" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="62" y="340" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="80" y="340" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="98" y="340" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="116" y="340" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="134" y="340" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="152" y="340" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="170" y="340" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="188" y="340" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="206" y="340" width="14" height="7" rx="1" fill="#334155"/>
  <text x="170" y="362" text-anchor="middle" fill="#64748b" font-size="8">Transfer existing circuits — AFCI/GFCI on all new work</text>
  <text x="170" y="376" text-anchor="middle" fill="#64748b" font-size="8">Verify conductor sizes — upsize undersized runs</text>
  <text x="170" y="390" text-anchor="middle" fill="#475569" font-size="7">Install arc flash label per NEC 110.16</text>
  <line x1="28" y1="352" x2="12" y2="352" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="12" y1="352" x2="12" y2="452" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="4" y1="452" x2="20" y2="452" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="2" y="452" width="9" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="14" y="452" width="9" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="11" y="450" text-anchor="middle" fill="#22c55e" font-size="7">RODS</text>
  <line x1="12" y1="428" x2="46" y2="428" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="46" y="420" width="56" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="74" y="432" text-anchor="middle" fill="#22c55e" font-size="8">UFER / CCEG</text>
  <text x="170" y="464" text-anchor="middle" fill="#64748b" font-size="8">Verify/upgrade ground electrode system to NEC 250</text>
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

$c = Set-SVG $c "new-200a-residential" $s1
$c = Set-SVG $c "200a-upgrade" $s2

[System.IO.File]::WriteAllText($file, $c, [System.Text.Encoding]::UTF8)
Write-Host "Done. Verifying viewBoxes..."
$remaining = (Select-String -Path $file -Pattern 'viewBox="0 0 280').Count
$v340 = (Select-String -Path $file -Pattern 'viewBox="0 0 340 580"').Count
$v320 = (Select-String -Path $file -Pattern 'viewBox="0 0 320 520"').Count
Write-Host "340x580: $v340 | 320x520: $v320 | old 280-width: $remaining"
