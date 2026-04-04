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

# =========================================================================
# CLEARANCE RULES (applied to ALL 13 SVGs):
#   - Min 10px between text baseline/top and any line or box edge
#   - No text touching/overlapping lines
#   - Ground lines routed OUTSIDE boxes, never through them
#   - Box sizes adjusted where needed for text breathing room
#   - Consistent legend at y=494, footer at y=568
# =========================================================================

# ─────────────────────────────────────────────────────────────────────────
# JOB 1: new-200a-residential
# ─────────────────────────────────────────────────────────────────────────
$svg1 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">NEW 200A SINGLE-PHASE RESIDENTIAL SERVICE</text>

  <!-- Utility drop -->
  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE)</text>
  <line x1="152" y1="54" x2="156" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="188" y1="54" x2="184" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,70 Q170,58 180,70 Z" fill="#facc15"/>
  <rect x="167" y="70" width="6" height="16" rx="1" fill="#334155"/>

  <!-- Conduit label -->
  <rect x="78" y="90" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="103" text-anchor="middle" fill="#64748b" font-size="9">1-1/4 in. Sch 80 PVC - exterior wall run</text>
  <line x1="170" y1="86" x2="170" y2="90" stroke="#475569" stroke-width="2"/>
  <line x1="170" y1="108" x2="170" y2="118" stroke="#475569" stroke-width="2"/>

  <!-- Meter base -->
  <rect x="28" y="118" width="284" height="72" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="138" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">METER BASE</text>
  <text x="170" y="154" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH - 200A ringless, AE-approved</text>
  <text x="170" y="170" text-anchor="middle" fill="#64748b" font-size="8">4-6 ft AFF (center) per AE spec</text>
  <text x="170" y="184" text-anchor="middle" fill="#475569" font-size="7">Outdoor disconnect required at or adjacent to meter</text>

  <line x1="170" y1="190" x2="170" y2="204" stroke="#facc15" stroke-width="2"/>

  <!-- Feed-through disconnect -->
  <rect x="28" y="204" width="284" height="62" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="226" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CH FEED-THROUGH PANEL</text>
  <text x="170" y="242" text-anchor="middle" fill="#94a3b8" font-size="9">CHP08B200RF - 200A main disconnect</text>
  <text x="170" y="258" text-anchor="middle" fill="#64748b" font-size="7">NEC 230.85 - SUITABLE FOR USE AS SERVICE DISCONNECT</text>

  <line x1="170" y1="266" x2="170" y2="276" stroke="#facc15" stroke-width="2"/>

  <!-- SE cable label -->
  <rect x="78" y="276" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="289" text-anchor="middle" fill="#64748b" font-size="9">2/0-2/0-1/0 AL SER cable through wall</text>

  <line x1="170" y1="294" x2="170" y2="306" stroke="#facc15" stroke-width="2"/>

  <!-- Main panel -->
  <rect x="28" y="306" width="284" height="88" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="326" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="170" y="342" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R - 42-space CH, plug-on neutral</text>
  <rect x="46" y="352" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="66" y="352" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="86" y="352" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="106" y="352" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="126" y="352" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="146" y="352" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="166" y="352" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="186" y="352" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="206" y="352" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="226" y="352" width="16" height="8" rx="1" fill="#334155"/>
  <text x="170" y="376" text-anchor="middle" fill="#64748b" font-size="8">Garage / utility room - min 3 ft clearance</text>
  <text x="170" y="390" text-anchor="middle" fill="#475569" font-size="7">AFCI: bedrooms/living | GFCI: kitchen/bath/garage/exterior</text>

  <!-- Ground system - routed outside left of panel -->
  <line x1="28" y1="370" x2="16" y2="370" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="16" y1="370" x2="16" y2="450" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="8" y1="450" x2="24" y2="450" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="6" y="450" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="18" y="450" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="14" y="442" text-anchor="middle" fill="#22c55e" font-size="7">RODS</text>

  <!-- Ufer branch -->
  <line x1="16" y1="424" x2="50" y2="424" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="50" y="416" width="56" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="78" y="429" text-anchor="middle" fill="#22c55e" font-size="8">UFER / CCEG</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="526" fill="#64748b" font-size="9">Service / Main Panel</text>
  <rect x="140" y="518" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="526" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="526" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="544" fill="#64748b" font-size="9">Main disconnect</text>
  <line x1="140" y1="540" x2="152" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="544" fill="#64748b" font-size="9">Ground / GEC</text>
  <line x1="240" y1="540" x2="252" y2="540" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="544" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <text x="14" y="568" fill="#475569" font-size="7">200A RESIDENTIAL SERVICE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 2: 200a-upgrade
# ─────────────────────────────────────────────────────────────────────────
$svg2 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">200A SERVICE UPGRADE / PANEL SWAP</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY SERVICE DROP</text>
  <line x1="152" y1="54" x2="156" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="188" y1="54" x2="184" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,70 Q170,58 180,70 Z" fill="#facc15"/>
  <rect x="167" y="70" width="6" height="16" rx="1" fill="#334155"/>

  <!-- Meter base -->
  <rect x="28" y="96" width="284" height="72" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="116" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">METER BASE</text>
  <text x="170" y="132" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH - replace only if upgrading</text>
  <text x="170" y="148" text-anchor="middle" fill="#64748b" font-size="8">AE ESPA required - coordinate meter pull</text>
  <text x="170" y="162" text-anchor="middle" fill="#475569" font-size="7">AE typically needs 4-hour notice for pull window</text>
  <line x1="170" y1="86" x2="170" y2="96" stroke="#facc15" stroke-width="2"/>

  <line x1="170" y1="168" x2="170" y2="182" stroke="#facc15" stroke-width="2"/>

  <!-- Feed-through disconnect -->
  <rect x="28" y="182" width="284" height="62" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="204" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CH FEED-THROUGH PANEL</text>
  <text x="170" y="220" text-anchor="middle" fill="#94a3b8" font-size="9">CHP08B200RF - 200A outdoor disconnect</text>
  <text x="170" y="236" text-anchor="middle" fill="#64748b" font-size="7">Install if existing outdoor disconnect is absent</text>

  <line x1="170" y1="244" x2="170" y2="254" stroke="#facc15" stroke-width="2"/>

  <!-- SE cable -->
  <rect x="78" y="254" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="267" text-anchor="middle" fill="#64748b" font-size="9">2/0-2/0-1/0 AL SER cable to new panel</text>

  <line x1="170" y1="272" x2="170" y2="284" stroke="#facc15" stroke-width="2"/>

  <!-- New main panel -->
  <rect x="28" y="284" width="284" height="100" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="304" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">NEW 200A MAIN PANEL</text>
  <text x="170" y="320" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R - 42-space CH, plug-on neutral</text>
  <rect x="46" y="330" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="66" y="330" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="86" y="330" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="106" y="330" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="126" y="330" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="146" y="330" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="166" y="330" width="16" height="8" rx="1" fill="#334155"/>
  <rect x="186" y="330" width="16" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="206" y="330" width="16" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="226" y="330" width="16" height="8" rx="1" fill="#334155"/>
  <text x="170" y="354" text-anchor="middle" fill="#64748b" font-size="8">Transfer circuits - AFCI/GFCI on new work</text>
  <text x="170" y="368" text-anchor="middle" fill="#64748b" font-size="8">Verify conductor sizes - upsize if undersized</text>
  <text x="170" y="380" text-anchor="middle" fill="#475569" font-size="7">Install arc flash label per NEC 110.16</text>

  <!-- Ground system outside left -->
  <line x1="28" y1="344" x2="16" y2="344" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="16" y1="344" x2="16" y2="442" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="8" y1="442" x2="24" y2="442" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="6" y="442" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="18" y="442" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="14" y="434" text-anchor="middle" fill="#22c55e" font-size="7">RODS</text>

  <line x1="16" y1="416" x2="50" y2="416" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="50" y="408" width="56" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="78" y="421" text-anchor="middle" fill="#22c55e" font-size="8">UFER / CCEG</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="526" fill="#64748b" font-size="9">Service / Main Panel</text>
  <rect x="140" y="518" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="526" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="526" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="544" fill="#64748b" font-size="9">Main disconnect</text>
  <line x1="140" y1="540" x2="152" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="544" fill="#64748b" font-size="9">Ground / GEC</text>
  <line x1="240" y1="540" x2="252" y2="540" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="544" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <text x="14" y="568" fill="#475569" font-size="7">200A SERVICE UPGRADE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 3: new-400a-service
# ─────────────────────────────────────────────────────────────────────────
$svg3 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">NEW 400A SERVICE - DUAL 200A PANELS</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE) - 4-wire service</text>
  <line x1="152" y1="54" x2="156" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="188" y1="54" x2="184" y2="70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M160,70 Q170,58 180,70 Z" fill="#facc15"/>
  <rect x="167" y="70" width="6" height="16" rx="1" fill="#334155"/>

  <!-- Meter bases -->
  <rect x="28" y="96" width="284" height="72" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="116" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">320A METER SOCKET</text>
  <text x="170" y="132" text-anchor="middle" fill="#94a3b8" font-size="9">Milbank U2448-X - AE Engineering Approval Req.</text>
  <text x="170" y="148" text-anchor="middle" fill="#64748b" font-size="8">350 kcmil AL XHHW-2 service conductors</text>
  <text x="170" y="162" text-anchor="middle" fill="#475569" font-size="7">Load calc required showing demand over 160A continuous</text>
  <line x1="170" y1="86" x2="170" y2="96" stroke="#facc15" stroke-width="2"/>

  <line x1="170" y1="168" x2="170" y2="180" stroke="#facc15" stroke-width="2"/>

  <!-- Split line -->
  <text x="170" y="178" text-anchor="middle" fill="#64748b" font-size="8">Split to two 200A panels</text>
  <line x1="86" y1="188" x2="254" y2="188" stroke="#facc15" stroke-width="2"/>
  <line x1="86" y1="188" x2="86" y2="202" stroke="#facc15" stroke-width="2"/>
  <line x1="254" y1="188" x2="254" y2="202" stroke="#facc15" stroke-width="2"/>

  <!-- Panel A -->
  <rect x="14" y="202" width="140" height="76" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="84" y="222" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">PANEL A</text>
  <text x="84" y="238" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="26" y="248" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="44" y="248" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="62" y="248" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="80" y="248" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="98" y="248" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="116" y="248" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="84" y="272" text-anchor="middle" fill="#475569" font-size="8">Main house loads</text>

  <!-- Panel B -->
  <rect x="186" y="202" width="140" height="76" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="256" y="222" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">PANEL B</text>
  <text x="256" y="238" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="198" y="248" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="216" y="248" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="234" y="248" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="252" y="248" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="270" y="248" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="288" y="248" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="256" y="272" text-anchor="middle" fill="#475569" font-size="8">Garage / workshop</text>

  <!-- Ground - routed below both panels, outside -->
  <line x1="84" y1="278" x2="84" y2="296" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="256" y1="278" x2="256" y2="296" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="84" y1="296" x2="256" y2="296" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="170" y1="296" x2="170" y2="322" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="152" y1="322" x2="188" y2="322" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="146" y="322" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="164" y="322" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="149" y="314" text-anchor="middle" fill="#22c55e" font-size="7">ROD1</text>
  <text x="167" y="314" text-anchor="middle" fill="#22c55e" font-size="7">ROD2</text>
  <text x="170" y="362" text-anchor="middle" fill="#475569" font-size="8">5/8 x 8ft copper-bonded - 6ft apart minimum</text>

  <!-- Ufer -->
  <line x1="84" y1="296" x2="50" y2="296" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="14" y="288" width="46" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="37" y="301" text-anchor="middle" fill="#22c55e" font-size="8">UFER</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="526" fill="#64748b" font-size="9">Service / Panel</text>
  <rect x="140" y="518" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="526" fill="#64748b" font-size="9">AFCI / Ground</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="526" fill="#64748b" font-size="9">GFCI</text>
  <line x1="22" y1="540" x2="34" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="544" fill="#64748b" font-size="9">Grounding system</text>
  <line x1="140" y1="540" x2="152" y2="540" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="158" y="544" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <line x1="240" y1="540" x2="252" y2="540" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="544" fill="#64748b" font-size="9">Utility (AE)</text>
  <text x="14" y="568" fill="#475569" font-size="7">400A RESIDENTIAL SERVICE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 4: ev-charger-50a
# ─────────────────────────────────────────────────────────────────────────
$svg4 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">LEVEL 2 EV CHARGER - 50A 240V DEDICATED</text>

  <!-- Main panel -->
  <rect x="60" y="40" width="220" height="66" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">200A Service</text>
  <rect x="78" y="86" width="52" height="16" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="104" y="98" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">50A GFCI</text>
  <text x="140" y="97" fill="#64748b" font-size="8">CHFP250GF</text>

  <line x1="170" y1="106" x2="170" y2="120" stroke="#facc15" stroke-width="2"/>

  <!-- Conduit label -->
  <rect x="68" y="120" width="204" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="133" text-anchor="middle" fill="#64748b" font-size="9">6 AWG THHN in 3/4 in. EMT conduit</text>

  <line x1="170" y1="138" x2="170" y2="158" stroke="#facc15" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="182" y="152" fill="#64748b" font-size="8">~40 ft run to garage</text>

  <!-- LB condulet -->
  <rect x="96" y="162" width="148" height="42" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="170" y="182" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">LB25 CONDULET</text>
  <text x="170" y="198" text-anchor="middle" fill="#64748b" font-size="8">Exterior wall penetration</text>

  <line x1="170" y1="204" x2="170" y2="224" stroke="#facc15" stroke-width="2"/>

  <!-- NEMA outlet -->
  <rect x="60" y="224" width="220" height="72" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="248" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">NEMA 14-50R</text>
  <text x="170" y="264" text-anchor="middle" fill="#94a3b8" font-size="9">TP403 box - 4-square deep</text>
  <text x="170" y="280" text-anchor="middle" fill="#64748b" font-size="8">48 in. AFF - driver side of parking</text>
  <text x="170" y="292" text-anchor="middle" fill="#475569" font-size="7">MM420C in-use cover if outdoors</text>

  <line x1="170" y1="296" x2="170" y2="314" stroke="#f97316" stroke-width="2"/>

  <!-- EVSE -->
  <rect x="50" y="314" width="240" height="68" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="338" text-anchor="middle" fill="#22c55e" font-size="12" font-weight="bold">LEVEL 2 EVSE</text>
  <text x="170" y="354" text-anchor="middle" fill="#94a3b8" font-size="9">Plug-in unit - NEMA 14-50 plug</text>
  <text x="170" y="370" text-anchor="middle" fill="#64748b" font-size="8">7.2 kW - approx 25 mi/hr charge</text>

  <line x1="170" y1="382" x2="170" y2="400" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="418" text-anchor="middle" fill="#475569" font-size="9">EV charge cable to vehicle</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="526" fill="#64748b" font-size="9">GFCI 2-pole 50A breaker</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="526" fill="#64748b" font-size="9">NEMA 14-50 outlet</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="40" y="544" fill="#64748b" font-size="9">EVSE unit</text>
  <rect x="190" y="536" width="12" height="8" rx="1" fill="#475569"/>
  <text x="208" y="544" fill="#64748b" font-size="9">LB condulet / conduit</text>
  <text x="14" y="568" fill="#475569" font-size="7">LEVEL 2 EV CHARGER - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 5: 100a-subpanel
# ─────────────────────────────────────────────────────────────────────────
$svg5 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">100A SUBPANEL ADDITION - 4-WIRE FEEDER</text>

  <!-- Main panel -->
  <rect x="60" y="40" width="220" height="82" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL - 200A</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="78" y="88" width="58" height="24" rx="2" fill="#f97316" opacity="0.9"/>
  <text x="107" y="100" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">CH2100</text>
  <text x="107" y="110" text-anchor="middle" fill="#fff" font-size="7">100A 2-pole</text>
  <text x="148" y="103" fill="#64748b" font-size="8">Feeder breaker</text>

  <line x1="170" y1="122" x2="170" y2="138" stroke="#f97316" stroke-width="2.5"/>

  <!-- Feeder conduit -->
  <rect x="58" y="138" width="224" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="151" text-anchor="middle" fill="#64748b" font-size="9">3 AWG THHN - 1-1/4 in. EMT - 4-wire feeder</text>

  <line x1="170" y1="156" x2="170" y2="170" stroke="#f97316" stroke-width="2"/>

  <!-- Isolated neutral callout -->
  <rect x="36" y="170" width="268" height="36" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="188" text-anchor="middle" fill="#f97316" font-size="9" font-weight="bold">ISOLATED NEUTRAL required - NEC 250.32</text>
  <text x="170" y="202" text-anchor="middle" fill="#64748b" font-size="7">L1 + L2 + Neutral + Ground - four separate conductors</text>

  <line x1="170" y1="206" x2="170" y2="220" stroke="#f97316" stroke-width="2"/>

  <!-- Subpanel -->
  <rect x="40" y="220" width="260" height="90" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="242" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">100A SUBPANEL</text>
  <text x="170" y="258" text-anchor="middle" fill="#94a3b8" font-size="9">CHP24L125X2 - MLO - 24-space</text>
  <rect x="62" y="268" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="82" y="268" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="102" y="268" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="122" y="268" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="142" y="268" width="16" height="7" rx="1" fill="#334155"/>
  <rect x="162" y="268" width="16" height="7" rx="1" fill="#334155"/>
  <rect x="182" y="268" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="202" y="268" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="170" y="290" text-anchor="middle" fill="#64748b" font-size="8">Garage / Shop / Detached Structure</text>
  <text x="170" y="306" text-anchor="middle" fill="#475569" font-size="7">AFCI / GFCI / 30A / 50A branch circuits</text>

  <!-- Ground - routed outside left of subpanel -->
  <line x1="40" y1="272" x2="24" y2="272" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="24" y1="272" x2="24" y2="368" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="18" y="368" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="24" y="360" text-anchor="middle" fill="#22c55e" font-size="7">GND ROD</text>
  <text x="24" y="408" text-anchor="middle" fill="#475569" font-size="7">If detached structure</text>
  <text x="24" y="420" text-anchor="middle" fill="#475569" font-size="7">per NEC 250.32</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="526" fill="#64748b" font-size="9">100A feeder / subpanel</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="208" y="526" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="544" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="190" y="536" width="12" height="8" rx="1" fill="#334155"/>
  <text x="208" y="544" fill="#64748b" font-size="9">Standard breaker</text>
  <text x="14" y="568" fill="#475569" font-size="7">100A SUBPANEL ADDITION - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 6: generator-ats
# ─────────────────────────────────────────────────────────────────────────
$svg6 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">WHOLE-HOUSE GENERATOR + ATS</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP</text>
  <line x1="158" y1="54" x2="161" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="182" y1="54" x2="179" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- ATS -->
  <rect x="50" y="74" width="240" height="62" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
  <text x="170" y="96" text-anchor="middle" fill="#a855f7" font-size="12" font-weight="bold">200A ATS</text>
  <text x="170" y="112" text-anchor="middle" fill="#94a3b8" font-size="9">Eaton CHSPT2ULTRA</text>
  <text x="170" y="128" text-anchor="middle" fill="#64748b" font-size="7">Anti-islanding - auto transfer under 10 sec - NEC 702</text>

  <!-- Generator feed - routed outside left, clear of ATS box -->
  <line x1="50" y1="104" x2="28" y2="104" stroke="#f97316" stroke-width="2"/>
  <line x1="28" y1="104" x2="28" y2="282" stroke="#f97316" stroke-width="2"/>

  <!-- Generator -->
  <rect x="6" y="282" width="128" height="88" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="70" y="306" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">GENERATOR</text>
  <text x="70" y="322" text-anchor="middle" fill="#94a3b8" font-size="9">Generac 7043</text>
  <text x="70" y="338" text-anchor="middle" fill="#64748b" font-size="8">22kW Natural Gas</text>
  <text x="70" y="354" text-anchor="middle" fill="#64748b" font-size="7">Concrete pad - 18 in. from openings</text>
  <text x="70" y="366" text-anchor="middle" fill="#94a3b8" font-size="7">Bond at generator chassis only</text>

  <!-- LFMC label -->
  <line x1="28" y1="272" x2="28" y2="252" stroke="#475569" stroke-width="3"/>
  <text x="42" y="266" fill="#64748b" font-size="7">1 in. LFMC</text>

  <line x1="170" y1="136" x2="170" y2="152" stroke="#facc15" stroke-width="2"/>

  <!-- Main panel -->
  <rect x="50" y="152" width="240" height="82" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="174" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="170" y="190" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="68" y="200" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="86" y="200" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="104" y="200" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="122" y="200" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="140" y="200" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="158" y="200" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="176" y="200" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="194" y="200" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="212" y="200" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="230" y="200" width="14" height="7" rx="1" fill="#334155"/>
  <text x="170" y="226" text-anchor="middle" fill="#475569" font-size="8">All house loads</text>

  <!-- Ground - routed outside right of panel -->
  <line x1="290" y1="210" x2="310" y2="210" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="310" y1="210" x2="310" y2="394" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="298" y1="394" x2="322" y2="394" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="296" y="394" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="314" y="394" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="310" y="386" text-anchor="middle" fill="#22c55e" font-size="7">GND RODS</text>

  <!-- Natgas -->
  <line x1="134" y1="380" x2="134" y2="420" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="148" y="400" fill="#fbbf24" font-size="8">NATGAS</text>
  <text x="148" y="414" fill="#475569" font-size="7">(plumber)</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#a855f7" opacity="0.9"/>
  <text x="40" y="526" fill="#64748b" font-size="9">ATS transfer switch</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="526" fill="#64748b" font-size="9">Generator feed</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="544" fill="#64748b" font-size="9">Utility / main panel</text>
  <rect x="190" y="536" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="208" y="544" fill="#64748b" font-size="9">AFCI / ground</text>
  <text x="14" y="568" fill="#475569" font-size="7">GENERATOR + ATS - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 7: solar-pv-20kw
# ─────────────────────────────────────────────────────────────────────────
$svg7 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">SOLAR PV INTERCONNECT - UP TO 20kW</text>

  <!-- PV Array -->
  <rect x="18" y="38" width="304" height="52" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
  <text x="170" y="58" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">SOLAR PV ARRAY - ROOF MOUNT</text>
  <text x="170" y="74" text-anchor="middle" fill="#94a3b8" font-size="9">44 x 400W - 17.6kW STC - South/West preferred</text>
  <rect x="26" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="62" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="98" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="134" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="170" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="206" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="242" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="278" y="78" width="32" height="8" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>

  <line x1="170" y1="90" x2="170" y2="102" stroke="#fbbf24" stroke-width="2"/>

  <!-- DC wire label -->
  <rect x="78" y="102" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="115" text-anchor="middle" fill="#64748b" font-size="9">10 AWG USE-2 / PV wire - MC4 connectors</text>

  <line x1="170" y1="120" x2="170" y2="136" stroke="#fbbf24" stroke-width="2"/>

  <!-- Rapid shutdown -->
  <rect x="86" y="136" width="168" height="38" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
  <text x="170" y="156" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold">RAPID SHUTDOWN</text>
  <text x="170" y="170" text-anchor="middle" fill="#64748b" font-size="7">NEC 690.12 - required for all roof systems</text>

  <line x1="170" y1="174" x2="170" y2="190" stroke="#fbbf24" stroke-width="2"/>

  <!-- Inverter -->
  <rect x="46" y="190" width="248" height="58" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="212" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">STRING INVERTER</text>
  <text x="170" y="228" text-anchor="middle" fill="#94a3b8" font-size="9">SolarEdge SE17400H - 17.4kW - UL 1741</text>
  <text x="170" y="244" text-anchor="middle" fill="#64748b" font-size="7">DC to AC - WiFi monitoring - anti-islanding</text>

  <line x1="170" y1="248" x2="170" y2="264" stroke="#22c55e" stroke-width="2"/>

  <!-- AC disconnect -->
  <rect x="86" y="264" width="168" height="38" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="284" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">60A AC DISCONNECT</text>
  <text x="170" y="298" text-anchor="middle" fill="#64748b" font-size="7">Non-fusible NEMA 3R - within sight of inverter</text>

  <line x1="170" y1="302" x2="170" y2="316" stroke="#22c55e" stroke-width="2"/>

  <!-- AC conduit -->
  <rect x="78" y="316" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="329" text-anchor="middle" fill="#64748b" font-size="9">10 AWG THHN - 3/4 in. EMT conduit</text>

  <line x1="170" y1="334" x2="170" y2="350" stroke="#22c55e" stroke-width="2"/>

  <!-- Main panel -->
  <rect x="46" y="350" width="248" height="58" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="372" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="388" text-anchor="middle" fill="#94a3b8" font-size="9">20A backfed - 120% rule NEC 705.12</text>
  <text x="170" y="404" text-anchor="middle" fill="#64748b" font-size="7">Supply-side tap per AE preference</text>

  <!-- Prod meter -->
  <rect x="300" y="358" width="34" height="26" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="317" y="372" text-anchor="middle" fill="#94a3b8" font-size="7">PROD</text>
  <text x="317" y="382" text-anchor="middle" fill="#64748b" font-size="7">METER</text>
  <line x1="294" y1="371" x2="300" y2="371" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <line x1="22" y1="522" x2="34" y2="522" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="40" y="526" fill="#64748b" font-size="9">DC PV circuit</text>
  <line x1="140" y1="522" x2="152" y2="522" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="526" fill="#64748b" font-size="9">AC inverter output</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#ef4444" opacity="0.9"/>
  <text x="258" y="526" fill="#64748b" font-size="9">Rapid shutdown</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="544" fill="#64748b" font-size="9">AC disconnect</text>
  <rect x="140" y="536" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="158" y="544" fill="#64748b" font-size="9">Main panel</text>
  <text x="14" y="568" fill="#475569" font-size="7">SOLAR PV INTERCONNECT - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 8: temp-power-pole
# ─────────────────────────────────────────────────────────────────────────
$svg8 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">TEMPORARY CONSTRUCTION POWER POLE</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE)</text>
  <line x1="158" y1="54" x2="161" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="182" y1="54" x2="179" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M162,68 Q170,56 178,68 Z" fill="#facc15"/>

  <!-- Pole -->
  <rect x="167" y="68" width="6" height="186" rx="1" fill="#78350f" stroke="#92400e" stroke-width="1"/>
  <text x="184" y="156" fill="#64748b" font-size="8">4x6 PT lumber</text>
  <text x="184" y="170" fill="#64748b" font-size="7">12 ft pole - 3 ft in concrete</text>

  <!-- Meter base -->
  <rect x="18" y="82" width="142" height="62" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="89" y="102" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">200A METER BASE</text>
  <text x="89" y="118" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH - AE approved</text>
  <text x="89" y="134" text-anchor="middle" fill="#64748b" font-size="7">4-6 ft AFF | AE does not stock 100A ringless</text>

  <!-- Load center -->
  <rect x="18" y="154" width="142" height="72" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="89" y="174" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">125A LOAD CENTER</text>
  <text x="89" y="190" text-anchor="middle" fill="#94a3b8" font-size="9">CHP22B125R - outdoor</text>
  <rect x="26" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="46" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="66" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="86" y="200" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="106" y="200" width="16" height="7" rx="1" fill="#334155"/>
  <rect x="126" y="200" width="16" height="7" rx="1" fill="#334155"/>
  <text x="89" y="220" text-anchor="middle" fill="#64748b" font-size="7">All outlets GFCI - NEC 590.6</text>

  <!-- Concrete -->
  <rect x="160" y="252" width="56" height="20" rx="2" fill="#374151" stroke="#475569" stroke-width="1"/>
  <text x="188" y="266" text-anchor="middle" fill="#64748b" font-size="7">Concrete</text>

  <!-- Ground - routed outside left -->
  <line x1="18" y1="212" x2="8" y2="212" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="8" y1="212" x2="8" y2="332" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="2" y="332" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="8" y="324" text-anchor="middle" fill="#22c55e" font-size="7">GND</text>
  <text x="8" y="370" text-anchor="middle" fill="#475569" font-size="7">NEC 590.7</text>

  <!-- Site power callout -->
  <rect x="198" y="120" width="126" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="261" y="142" text-anchor="middle" fill="#64748b" font-size="9" font-weight="bold">SITE POWER</text>
  <text x="261" y="158" text-anchor="middle" fill="#475569" font-size="8">120V tools</text>
  <text x="261" y="174" text-anchor="middle" fill="#475569" font-size="8">240V compressor</text>
  <text x="261" y="188" text-anchor="middle" fill="#475569" font-size="8">Temp lighting</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="526" fill="#64748b" font-size="9">GFCI breaker / outlet</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="208" y="526" fill="#64748b" font-size="9">Meter base (AE)</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="544" fill="#64748b" font-size="9">125A load center</text>
  <line x1="190" y1="540" x2="202" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="208" y="544" fill="#64748b" font-size="9">Grounding system</text>
  <text x="14" y="568" fill="#475569" font-size="7">TEMP CONSTRUCTION POLE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 9: pool-electrical
# ─────────────────────────────────────────────────────────────────────────
$svg9 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">SWIMMING POOL ELECTRICAL - NEC 680</text>

  <!-- Main panel -->
  <rect x="70" y="38" width="200" height="44" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="74" text-anchor="middle" fill="#64748b" font-size="8">200A service - inside house</text>

  <line x1="170" y1="82" x2="170" y2="96" stroke="#facc15" stroke-width="1.5"/>

  <!-- Pool panel -->
  <rect x="40" y="96" width="260" height="68" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="170" y="116" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="bold">POOL / SPA PANEL</text>
  <text x="170" y="132" text-anchor="middle" fill="#94a3b8" font-size="9">CH60SPAST - 60A - NEC 680</text>
  <rect x="56" y="142" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="76" y="142" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="96" y="142" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="56" y="158" fill="#64748b" font-size="6">PUMP</text>
  <text x="78" y="158" fill="#64748b" font-size="6">LIGHT</text>
  <text x="98" y="158" fill="#64748b" font-size="6">RCPT</text>

  <line x1="170" y1="164" x2="170" y2="178" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="182" y="174" fill="#64748b" font-size="7">3/4 in. PVC underground</text>

  <!-- Equipment pad -->
  <rect x="6" y="186" width="116" height="68" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <text x="64" y="206" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">EQUIP PAD</text>
  <text x="64" y="222" text-anchor="middle" fill="#64748b" font-size="8">Pump / Filter / Heater</text>
  <text x="64" y="238" text-anchor="middle" fill="#475569" font-size="7">Bonded - NEC 680.26</text>
  <text x="64" y="250" text-anchor="middle" fill="#475569" font-size="7">8 AWG solid Cu bond</text>

  <!-- 12V transformer -->
  <rect x="218" y="186" width="116" height="52" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="276" y="206" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V TRANSFORMER</text>
  <text x="276" y="222" text-anchor="middle" fill="#94a3b8" font-size="8">Pentair 601100 300W</text>
  <text x="276" y="234" text-anchor="middle" fill="#475569" font-size="7">GFCI protected</text>

  <!-- Pool -->
  <ellipse cx="170" cy="306" rx="120" ry="52" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
  <text x="170" y="302" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold">POOL</text>
  <text x="170" y="320" text-anchor="middle" fill="#0ea5e9" font-size="9">12V LED light - niche mount</text>

  <!-- 20ft GFCI zone -->
  <ellipse cx="170" cy="306" rx="148" ry="74" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="5,4"/>
  <text x="324" y="298" fill="#ef4444" font-size="7">20 ft</text>
  <text x="324" y="310" fill="#ef4444" font-size="7">GFCI</text>
  <text x="324" y="322" fill="#ef4444" font-size="7">zone</text>

  <!-- Ground - routed from equip pad, outside pool zone -->
  <line x1="64" y1="254" x2="64" y2="414" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="58" y="414" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="64" y="406" text-anchor="middle" fill="#22c55e" font-size="7">GND ROD</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="526" fill="#64748b" font-size="9">GFCI protected circuit</text>
  <line x1="140" y1="522" x2="152" y2="522" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="526" fill="#64748b" font-size="9">Equipotential bond</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="258" y="526" fill="#64748b" font-size="9">12V transformer</text>
  <line x1="22" y1="540" x2="34" y2="540" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="40" y="544" fill="#64748b" font-size="9">20 ft GFCI boundary</text>
  <rect x="140" y="536" width="12" height="8" rx="1" fill="#38bdf8" opacity="0.5"/>
  <text x="158" y="544" fill="#64748b" font-size="9">Pool / water</text>
  <text x="14" y="568" fill="#475569" font-size="7">SWIMMING POOL ELECTRICAL - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 10: hot-tub-spa
# ─────────────────────────────────────────────────────────────────────────
$svg10 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">HOT TUB / SPA DEDICATED CIRCUIT</text>

  <!-- Main panel -->
  <rect x="60" y="40" width="220" height="52" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">200A service</text>
  <rect x="72" y="78" width="50" height="14" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="97" y="89" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">50A GFCI</text>
  <text x="132" y="89" fill="#64748b" font-size="7">CHFP250GF</text>

  <line x1="170" y1="96" x2="170" y2="110" stroke="#3b82f6" stroke-width="2"/>

  <!-- Underground conduit -->
  <rect x="68" y="110" width="204" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="123" text-anchor="middle" fill="#64748b" font-size="9">6 AWG THHN - 1 in. Sch 40 PVC underground</text>

  <!-- Grade line -->
  <line x1="16" y1="136" x2="324" y2="136" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="14" y="133" fill="#475569" font-size="7">grade</text>

  <line x1="170" y1="128" x2="170" y2="150" stroke="#3b82f6" stroke-width="2"/>
  <text x="184" y="146" fill="#64748b" font-size="7">12 in. burial - open ground</text>

  <!-- Disconnect -->
  <rect x="50" y="156" width="240" height="56" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="178" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">60A DISCONNECT</text>
  <text x="170" y="194" text-anchor="middle" fill="#94a3b8" font-size="9">DG222NGB - NEMA 3R - lockable</text>
  <text x="170" y="208" text-anchor="middle" fill="#64748b" font-size="7">5 to 50 ft from spa - NEC 680.12</text>

  <line x1="170" y1="212" x2="170" y2="228" stroke="#3b82f6" stroke-width="2"/>

  <!-- Hot tub -->
  <rect x="30" y="228" width="280" height="96" rx="8" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2.5"/>
  <text x="170" y="258" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="bold">HOT TUB / SPA</text>
  <text x="170" y="278" text-anchor="middle" fill="#0ea5e9" font-size="9">240V - 50A - 4-wire circuit</text>
  <text x="170" y="294" text-anchor="middle" fill="#64748b" font-size="8">Pump / Heater / Controls</text>
  <text x="170" y="310" text-anchor="middle" fill="#94a3b8" font-size="7">Verify amperage on nameplate</text>

  <!-- Bond grid - routed outside hot tub box -->
  <line x1="30" y1="270" x2="14" y2="270" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="310" y1="270" x2="326" y2="270" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="14" y1="270" x2="14" y2="356" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="326" y1="270" x2="326" y2="356" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="14" y1="356" x2="326" y2="356" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="374" text-anchor="middle" fill="#22c55e" font-size="9">8 AWG solid Cu bond grid - NEC 680.43</text>
  <text x="170" y="390" text-anchor="middle" fill="#475569" font-size="8">All metal parts within 5 ft of water</text>

  <!-- Overhead clearance -->
  <line x1="16" y1="412" x2="324" y2="412" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="170" y="428" text-anchor="middle" fill="#ef4444" font-size="9">No overhead wiring 22.5 ft - NEC 680.10</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="526" fill="#64748b" font-size="9">GFCI 50A dedicated circuit</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="526" fill="#64748b" font-size="9">Lockable disconnect</text>
  <line x1="22" y1="540" x2="34" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="544" fill="#64748b" font-size="9">Equipotential bond grid</text>
  <line x1="190" y1="540" x2="202" y2="540" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="208" y="544" fill="#64748b" font-size="9">22.5 ft overhead limit</text>
  <text x="14" y="568" fill="#475569" font-size="7">HOT TUB / SPA CIRCUIT - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 11: battery-storage
# ─────────────────────────────────────────────────────────────────────────
$svg11 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">WHOLE-HOUSE BATTERY STORAGE</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY</text>
  <line x1="158" y1="54" x2="161" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="182" y1="54" x2="179" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Gateway -->
  <rect x="40" y="74" width="260" height="58" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
  <text x="170" y="96" text-anchor="middle" fill="#a855f7" font-size="11" font-weight="bold">GATEWAY 3</text>
  <text x="170" y="112" text-anchor="middle" fill="#94a3b8" font-size="9">Tesla Gateway - system controller</text>
  <text x="170" y="126" text-anchor="middle" fill="#64748b" font-size="7">Grid / Solar / Battery - auto transfer</text>

  <!-- Solar optional - placed outside gateway box -->
  <line x1="40" y1="100" x2="26" y2="100" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="2" y="92" width="24" height="18" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>
  <text x="14" y="104" text-anchor="middle" fill="#fbbf24" font-size="7" font-weight="bold">SOL</text>
  <text x="2" y="120" fill="#475569" font-size="6">Solar (opt)</text>

  <line x1="170" y1="132" x2="170" y2="148" stroke="#facc15" stroke-width="2"/>

  <!-- Main panel -->
  <rect x="40" y="148" width="260" height="78" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="170" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="170" y="186" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="60" y="196" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="78" y="196" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="96" y="196" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="114" y="196" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="132" y="196" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="150" y="196" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="168" y="196" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="186" y="196" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="204" y="196" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="222" y="196" width="14" height="7" rx="1" fill="#334155"/>
  <text x="170" y="220" text-anchor="middle" fill="#475569" font-size="7">All loads + critical subpanel feeder</text>

  <!-- Powerwall - routed outside left -->
  <line x1="40" y1="192" x2="24" y2="192" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="24" y1="192" x2="24" y2="250" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="2" y="250" width="120" height="80" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="62" y="272" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">POWERWALL 3</text>
  <text x="62" y="288" text-anchor="middle" fill="#94a3b8" font-size="9">13.5 kWh / 11.5 kW</text>
  <text x="62" y="304" text-anchor="middle" fill="#64748b" font-size="7">Inverter built-in - UL 9540</text>
  <text x="62" y="320" text-anchor="middle" fill="#64748b" font-size="7">Indoor/Outdoor - no HVAC closets</text>

  <line x1="170" y1="226" x2="170" y2="244" stroke="#f97316" stroke-width="2"/>

  <!-- Critical loads -->
  <rect x="40" y="244" width="260" height="78" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="266" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CRITICAL LOADS</text>
  <text x="170" y="282" text-anchor="middle" fill="#94a3b8" font-size="9">100A subpanel - CHP24L125X2</text>
  <text x="170" y="298" text-anchor="middle" fill="#64748b" font-size="8">Backed-up circuits only</text>
  <rect x="62" y="304" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="80" y="304" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="98" y="304" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="116" y="304" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="170" y="318" text-anchor="middle" fill="#475569" font-size="7">Fridge / HVAC / Lights / Outlets</text>

  <!-- AE notice -->
  <rect x="40" y="332" width="260" height="36" rx="3" fill="#1e293b" stroke="#a855f7" stroke-width="1"/>
  <text x="170" y="350" text-anchor="middle" fill="#a855f7" font-size="9" font-weight="bold">AE Interconnect Amendment Required</text>
  <text x="170" y="364" text-anchor="middle" fill="#64748b" font-size="7">Solar + storage - NEC 706 - UL 9540</text>

  <!-- Ground - routed outside right -->
  <line x1="300" y1="200" x2="320" y2="200" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="320" y1="200" x2="320" y2="420" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="308" y1="420" x2="332" y2="420" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="306" y="420" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="322" y="420" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="320" y="412" text-anchor="middle" fill="#22c55e" font-size="7">GND RODS</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#a855f7" opacity="0.9"/>
  <text x="40" y="526" fill="#64748b" font-size="9">Gateway controller</text>
  <rect x="140" y="518" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="526" fill="#64748b" font-size="9">Battery / Powerwall</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="258" y="526" fill="#64748b" font-size="9">Main panel</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.85"/>
  <text x="40" y="544" fill="#64748b" font-size="9">Critical loads subpanel</text>
  <rect x="140" y="536" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="158" y="544" fill="#64748b" font-size="9">Solar input (optional)</text>
  <text x="14" y="568" fill="#475569" font-size="7">WHOLE-HOUSE BATTERY STORAGE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 12: commercial-3phase-200a
# ─────────────────────────────────────────────────────────────────────────
$svg12 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">200A 3-PHASE COMMERCIAL SERVICE</text>

  <!-- Phase labels and drop -->
  <text x="110" y="44" fill="#475569" font-size="8">A</text>
  <text x="130" y="44" fill="#475569" font-size="8">B</text>
  <text x="150" y="44" fill="#475569" font-size="8">C</text>
  <text x="170" y="44" fill="#475569" font-size="8">N</text>
  <text x="190" y="44" fill="#475569" font-size="8">G</text>
  <line x1="114" y1="48" x2="118" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="134" y1="48" x2="136" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="154" y1="48" x2="154" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="174" y1="48" x2="172" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="194" y1="48" x2="190" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M146,64 Q154,52 162,64 Z" fill="#facc15"/>
  <rect x="151" y="64" width="6" height="16" rx="1" fill="#334155"/>

  <!-- CT meter cabinet -->
  <rect x="28" y="88" width="284" height="60" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="108" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">CT METER CABINET</text>
  <text x="170" y="124" text-anchor="middle" fill="#94a3b8" font-size="9">AE commercial CT metering - 200A class</text>
  <text x="170" y="140" text-anchor="middle" fill="#64748b" font-size="7">AE supplies meter - contractor provides cabinet</text>

  <line x1="170" y1="148" x2="170" y2="162" stroke="#facc15" stroke-width="2"/>

  <!-- Conductor label -->
  <rect x="58" y="162" width="224" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="175" text-anchor="middle" fill="#64748b" font-size="9">350 kcmil AL XHHW-2 - 5 conductors (3P+N+G)</text>

  <line x1="170" y1="180" x2="170" y2="194" stroke="#facc15" stroke-width="2"/>

  <!-- Fusible disconnect -->
  <rect x="28" y="194" width="284" height="56" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="216" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">3-PHASE FUSIBLE DISCONNECT</text>
  <text x="170" y="232" text-anchor="middle" fill="#94a3b8" font-size="9">Eaton DH365FGK - 200A - 600V</text>
  <text x="170" y="246" text-anchor="middle" fill="#64748b" font-size="7">Service entrance main disconnect</text>

  <line x1="170" y1="250" x2="170" y2="264" stroke="#facc15" stroke-width="2"/>

  <!-- MDP -->
  <rect x="28" y="264" width="284" height="96" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="286" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN DISTRIBUTION PANEL</text>
  <text x="170" y="302" text-anchor="middle" fill="#94a3b8" font-size="9">Pow-R-Line EZB2072R + PRL3A3400X42A</text>
  <text x="170" y="318" text-anchor="middle" fill="#64748b" font-size="7">400A AL bus - 42 ckt - 120/208V 3ph 4W</text>
  <rect x="50" y="326" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="68" y="326" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="86" y="326" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="104" y="326" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>
  <rect x="122" y="326" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>
  <rect x="140" y="326" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="158" y="326" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="176" y="326" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>
  <text x="170" y="348" text-anchor="middle" fill="#475569" font-size="7">Arc Flash Label - NEC 110.16 - Engineer stamp req.</text>

  <!-- Ground - routed outside right -->
  <line x1="312" y1="310" x2="326" y2="310" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="326" y1="310" x2="326" y2="420" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="314" y1="420" x2="336" y2="420" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="312" y="420" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="322" y="412" text-anchor="middle" fill="#22c55e" font-size="7">GND RODS</text>

  <!-- Ufer -->
  <line x1="326" y1="396" x2="290" y2="396" stroke="#22c55e" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="282" y="394" text-anchor="end" fill="#22c55e" font-size="7">UFER</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="526" fill="#64748b" font-size="9">3-phase fusible disconnect</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#334155" opacity="0.9"/>
  <text x="208" y="526" fill="#64748b" font-size="9">3-pole breaker (20/30A)</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f59e0b" opacity="0.8"/>
  <text x="40" y="544" fill="#64748b" font-size="9">3-pole HVAC/equipment</text>
  <line x1="190" y1="540" x2="202" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="208" y="544" fill="#64748b" font-size="9">Grounding system</text>
  <text x="14" y="568" fill="#475569" font-size="7">200A 3-PHASE COMMERCIAL - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 13: landscape-lighting
# ─────────────────────────────────────────────────────────────────────────
$svg13 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">LANDSCAPE / OUTDOOR LIGHTING CIRCUIT</text>

  <!-- Main panel -->
  <rect x="60" y="38" width="220" height="52" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <rect x="72" y="70" width="48" height="14" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="96" y="80" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">20A GFCI</text>
  <text x="130" y="80" fill="#64748b" font-size="7">CHFP120GF</text>

  <line x1="170" y1="94" x2="170" y2="108" stroke="#3b82f6" stroke-width="2"/>

  <!-- Conduit label -->
  <rect x="68" y="108" width="204" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="121" text-anchor="middle" fill="#64748b" font-size="9">12 AWG THHN in 3/4 in. Sch 40 PVC</text>

  <!-- Grade -->
  <line x1="16" y1="134" x2="324" y2="134" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="14" y="131" fill="#475569" font-size="7">grade</text>

  <line x1="170" y1="126" x2="170" y2="148" stroke="#3b82f6" stroke-width="2"/>
  <text x="184" y="144" fill="#64748b" font-size="7">6 in. burial min (in conduit)</text>

  <!-- Split to GFCI outlet and transformer -->
  <line x1="170" y1="152" x2="56" y2="152" stroke="#3b82f6" stroke-width="2"/>
  <line x1="170" y1="152" x2="276" y2="152" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5,3"/>

  <!-- GFCI receptacle -->
  <line x1="56" y1="152" x2="56" y2="172" stroke="#3b82f6" stroke-width="2"/>
  <rect x="6" y="172" width="100" height="52" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="56" y="192" text-anchor="middle" fill="#3b82f6" font-size="9" font-weight="bold">GFCI RCPT</text>
  <text x="56" y="208" text-anchor="middle" fill="#94a3b8" font-size="8">TWRGF20W</text>
  <text x="56" y="220" text-anchor="middle" fill="#64748b" font-size="7">WP cover MM420C</text>

  <!-- 12V transformer -->
  <line x1="276" y1="152" x2="276" y2="172" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="218" y="172" width="116" height="60" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="276" y="192" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V TRANSFORMER</text>
  <text x="276" y="208" text-anchor="middle" fill="#94a3b8" font-size="8">Kichler 15TP300BK</text>
  <text x="276" y="224" text-anchor="middle" fill="#64748b" font-size="7">300W photocell+timer - GFCI prot.</text>

  <!-- 12V wire label -->
  <line x1="218" y1="198" x2="170" y2="198" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="192" y="194" text-anchor="middle" fill="#fbbf24" font-size="7">16/2 direct-burial 12V</text>

  <!-- Path lights -->
  <line x1="80" y1="198" x2="80" y2="248" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="80" cy="256" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="80" y="276" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <line x1="114" y1="198" x2="114" y2="248" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="114" cy="256" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="114" y="276" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <line x1="148" y1="198" x2="148" y2="248" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="148" cy="256" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="148" y="276" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <line x1="182" y1="198" x2="182" y2="248" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="182" cy="256" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="182" y="276" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <!-- Spot light -->
  <line x1="206" y1="198" x2="206" y2="248" stroke="#fbbf24" stroke-width="1"/>
  <rect x="198" y="248" width="16" height="10" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="206" y="270" text-anchor="middle" fill="#64748b" font-size="7">SPOT</text>

  <!-- House -->
  <rect x="40" y="296" width="260" height="60" rx="3" fill="#1a2535" stroke="#334155" stroke-width="1"/>
  <text x="170" y="332" text-anchor="middle" fill="#334155" font-size="16" font-weight="bold">HOUSE</text>
  <text x="170" y="350" text-anchor="middle" fill="#334155" font-size="7">Panel inside - conduit enters here</text>

  <!-- Burial note -->
  <rect x="28" y="372" width="284" height="34" rx="4" fill="#1e293b" stroke="#1e293b" stroke-width="1"/>
  <text x="170" y="388" text-anchor="middle" fill="#64748b" font-size="8">Burial: 6 in. conduit / 12 in. open ground - NEC 300.5</text>
  <text x="170" y="402" text-anchor="middle" fill="#475569" font-size="7">All 120V outdoor receptacles GFCI - NEC 210.8</text>

  <!-- Legend -->
  <rect x="10" y="494" width="320" height="74" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="510" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="526" fill="#64748b" font-size="9">120V GFCI circuit</text>
  <line x1="140" y1="522" x2="152" y2="522" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="158" y="526" fill="#64748b" font-size="9">12V landscape wire</text>
  <circle cx="247" cy="522" r="5" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="258" y="526" fill="#64748b" font-size="9">Path / spot light</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="40" y="544" fill="#64748b" font-size="9">12V transformer</text>
  <rect x="140" y="536" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="158" y="544" fill="#64748b" font-size="9">Main panel</text>
  <text x="14" y="568" fill="#475569" font-size="7">LANDSCAPE / OUTDOOR LIGHTING - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# APPLY ALL 13 REPLACEMENTS
# ─────────────────────────────────────────────────────────────────────────
$c = Set-SVG $c "new-200a-residential" $svg1
$c = Set-SVG $c "200a-upgrade" $svg2
$c = Set-SVG $c "new-400a-service" $svg3
$c = Set-SVG $c "ev-charger-50a" $svg4
$c = Set-SVG $c "100a-subpanel" $svg5
$c = Set-SVG $c "generator-ats" $svg6
$c = Set-SVG $c "solar-pv-20kw" $svg7
$c = Set-SVG $c "temp-power-pole" $svg8
$c = Set-SVG $c "pool-electrical" $svg9
$c = Set-SVG $c "hot-tub-spa" $svg10
$c = Set-SVG $c "battery-storage" $svg11
$c = Set-SVG $c "commercial-3phase-200a" $svg12
$c = Set-SVG $c "landscape-lighting" $svg13

[System.IO.File]::WriteAllText($file, $c, (New-Object System.Text.UTF8Encoding $true))
Write-Host "Done - all 13 SVGs replaced with clearance fixes"
