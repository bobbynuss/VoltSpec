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
# TARGETED FIXES:
#   1. Ground rod labels offset RIGHT of green line, 10px clearance
#   2. Footer text spaced properly below legend box
#   3. Battery storage: Powerwall box repositioned to not overlap Critical Loads
#   4. Landscape: PATH/SPOT lines start BELOW boxes, not through them
# =========================================================================

# ─────────────────────────────────────────────────────────────────────────
# JOB 1: new-200a-residential
# Fix: RODS label to right of rods, footer spacing
# ─────────────────────────────────────────────────────────────────────────
$svg1 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
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
  <text x="170" y="289" text-anchor="middle" fill="#64748b" font-size="9">2/0-2/0-1/0 AL SER cable through wall</text>

  <line x1="170" y1="294" x2="170" y2="306" stroke="#facc15" stroke-width="2"/>

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

  <!-- Ground - outside left, labels offset RIGHT of line -->
  <line x1="28" y1="370" x2="16" y2="370" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="16" y1="370" x2="16" y2="456" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="8" y1="456" x2="24" y2="456" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="6" y="456" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="18" y="456" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="38" y="470" fill="#22c55e" font-size="7">GND RODS</text>

  <line x1="16" y1="430" x2="50" y2="430" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="50" y="422" width="56" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="78" y="435" text-anchor="middle" fill="#22c55e" font-size="8">UFER / CCEG</text>

  <!-- Legend -->
  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="524" fill="#64748b" font-size="9">Service / Main Panel</text>
  <rect x="140" y="516" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="524" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="240" y="516" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="524" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="22" y="534" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="542" fill="#64748b" font-size="9">Main disconnect</text>
  <line x1="140" y1="538" x2="152" y2="538" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="542" fill="#64748b" font-size="9">Ground / GEC</text>
  <line x1="240" y1="538" x2="252" y2="538" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="542" fill="#64748b" font-size="9">Ufer / CCEG</text>

  <text x="14" y="576" fill="#475569" font-size="7">200A RESIDENTIAL SERVICE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 2: 200a-upgrade  (same pattern: labels right of rods, footer spaced)
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

  <rect x="28" y="96" width="284" height="72" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="116" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">METER BASE</text>
  <text x="170" y="132" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH - replace only if upgrading</text>
  <text x="170" y="148" text-anchor="middle" fill="#64748b" font-size="8">AE ESPA required - coordinate meter pull</text>
  <text x="170" y="162" text-anchor="middle" fill="#475569" font-size="7">AE typically needs 4-hour notice for pull window</text>
  <line x1="170" y1="86" x2="170" y2="96" stroke="#facc15" stroke-width="2"/>
  <line x1="170" y1="168" x2="170" y2="182" stroke="#facc15" stroke-width="2"/>

  <rect x="28" y="182" width="284" height="62" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="204" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CH FEED-THROUGH PANEL</text>
  <text x="170" y="220" text-anchor="middle" fill="#94a3b8" font-size="9">CHP08B200RF - 200A outdoor disconnect</text>
  <text x="170" y="236" text-anchor="middle" fill="#64748b" font-size="7">Install if existing outdoor disconnect is absent</text>

  <line x1="170" y1="244" x2="170" y2="254" stroke="#facc15" stroke-width="2"/>
  <rect x="78" y="254" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="267" text-anchor="middle" fill="#64748b" font-size="9">2/0-2/0-1/0 AL SER cable to new panel</text>
  <line x1="170" y1="272" x2="170" y2="284" stroke="#facc15" stroke-width="2"/>

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

  <!-- Ground - labels RIGHT of rods -->
  <line x1="28" y1="344" x2="16" y2="344" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="16" y1="344" x2="16" y2="448" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="8" y1="448" x2="24" y2="448" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="6" y="448" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="18" y="448" width="10" height="22" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="38" y="462" fill="#22c55e" font-size="7">GND RODS</text>

  <line x1="16" y1="420" x2="50" y2="420" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="50" y="412" width="56" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="78" y="425" text-anchor="middle" fill="#22c55e" font-size="8">UFER / CCEG</text>

  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="524" fill="#64748b" font-size="9">Service / Main Panel</text>
  <rect x="140" y="516" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="524" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="240" y="516" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="524" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="22" y="534" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="542" fill="#64748b" font-size="9">Main disconnect</text>
  <line x1="140" y1="538" x2="152" y2="538" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="542" fill="#64748b" font-size="9">Ground / GEC</text>
  <line x1="240" y1="538" x2="252" y2="538" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="542" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <text x="14" y="576" fill="#475569" font-size="7">200A SERVICE UPGRADE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 3: new-400a-service (ROD labels right, footer)
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

  <rect x="14" y="196" width="140" height="76" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="84" y="216" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">PANEL A</text>
  <text x="84" y="232" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="26" y="242" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="44" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="62" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="80" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="98" y="242" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="116" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="84" y="266" text-anchor="middle" fill="#475569" font-size="8">Main house loads</text>

  <rect x="186" y="196" width="140" height="76" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="256" y="216" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">PANEL B</text>
  <text x="256" y="232" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="198" y="242" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="216" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="234" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="252" y="242" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="270" y="242" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="288" y="242" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="256" y="266" text-anchor="middle" fill="#475569" font-size="8">Garage / workshop</text>

  <!-- Ground below panels, rod labels RIGHT -->
  <line x1="84" y1="272" x2="84" y2="296" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="256" y1="272" x2="256" y2="296" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="84" y1="296" x2="256" y2="296" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="170" y1="296" x2="170" y2="322" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="152" y1="322" x2="188" y2="322" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="146" y="322" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="164" y="322" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="186" y="338" fill="#22c55e" font-size="7">GND RODS</text>
  <text x="170" y="362" text-anchor="middle" fill="#475569" font-size="8">5/8 x 8ft copper-bonded - 6ft apart minimum</text>

  <line x1="84" y1="296" x2="50" y2="296" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="14" y="288" width="46" height="18" rx="2" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="37" y="301" text-anchor="middle" fill="#22c55e" font-size="8">UFER</text>

  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="524" fill="#64748b" font-size="9">Service / Panel</text>
  <rect x="140" y="516" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="524" fill="#64748b" font-size="9">AFCI / Ground</text>
  <rect x="240" y="516" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="258" y="524" fill="#64748b" font-size="9">GFCI</text>
  <line x1="22" y1="538" x2="34" y2="538" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="542" fill="#64748b" font-size="9">Grounding system</text>
  <line x1="140" y1="538" x2="152" y2="538" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="158" y="542" fill="#64748b" font-size="9">Ufer / CCEG</text>
  <line x1="240" y1="538" x2="252" y2="538" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="258" y="542" fill="#64748b" font-size="9">Utility (AE)</text>
  <text x="14" y="576" fill="#475569" font-size="7">400A RESIDENTIAL SERVICE - NOT TO SCALE</text>
</svg>
'@

# Jobs 4 (EV) and 7 (Solar) have no ground rods - only need footer fix
# Jobs 5 (subpanel), 6 (generator), 8 (temp), 9 (pool), 10 (spa) need rod label + footer
# Job 11 (battery) needs Powerwall fix + rod label + footer
# Job 12 (commercial) needs rod label + footer
# Job 13 (landscape) needs PATH/SPOT fix + footer

# For brevity, I'll fix only the jobs with specific issues called out.
# Jobs 4,5,6,7,8,9,10,12 only need rod label RIGHT offset + footer spacing.
# I'll fix them all with targeted edits to data.ts directly.

# ─────────────────────────────────────────────────────────────────────────
# JOB 5: 100a-subpanel (rod label right)
# ─────────────────────────────────────────────────────────────────────────
$svg5 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">100A SUBPANEL ADDITION - 4-WIRE FEEDER</text>

  <rect x="60" y="40" width="220" height="82" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL - 200A</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="78" y="88" width="58" height="24" rx="2" fill="#f97316" opacity="0.9"/>
  <text x="107" y="100" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">CH2100</text>
  <text x="107" y="110" text-anchor="middle" fill="#fff" font-size="7">100A 2-pole</text>
  <text x="148" y="103" fill="#64748b" font-size="8">Feeder breaker</text>

  <line x1="170" y1="122" x2="170" y2="138" stroke="#f97316" stroke-width="2.5"/>
  <rect x="58" y="138" width="224" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="151" text-anchor="middle" fill="#64748b" font-size="9">3 AWG THHN - 1-1/4 in. EMT - 4-wire feeder</text>
  <line x1="170" y1="156" x2="170" y2="170" stroke="#f97316" stroke-width="2"/>

  <rect x="36" y="170" width="268" height="36" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="188" text-anchor="middle" fill="#f97316" font-size="9" font-weight="bold">ISOLATED NEUTRAL required - NEC 250.32</text>
  <text x="170" y="202" text-anchor="middle" fill="#64748b" font-size="7">L1 + L2 + Neutral + Ground - four separate conductors</text>

  <line x1="170" y1="206" x2="170" y2="220" stroke="#f97316" stroke-width="2"/>

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

  <!-- Ground rod - label RIGHT -->
  <line x1="40" y1="272" x2="24" y2="272" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="24" y1="272" x2="24" y2="368" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="18" y="368" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="384" fill="#22c55e" font-size="7">GND ROD</text>
  <text x="40" y="408" fill="#475569" font-size="7">If detached structure</text>
  <text x="40" y="420" fill="#475569" font-size="7">per NEC 250.32</text>

  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="524" fill="#64748b" font-size="9">100A feeder / subpanel</text>
  <rect x="190" y="516" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="208" y="524" fill="#64748b" font-size="9">AFCI breaker</text>
  <rect x="22" y="534" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="542" fill="#64748b" font-size="9">GFCI breaker</text>
  <rect x="190" y="534" width="12" height="8" rx="1" fill="#334155"/>
  <text x="208" y="542" fill="#64748b" font-size="9">Standard breaker</text>
  <text x="14" y="576" fill="#475569" font-size="7">100A SUBPANEL ADDITION - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 6: generator-ats (rod labels right)
# ─────────────────────────────────────────────────────────────────────────
$svg6 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">WHOLE-HOUSE GENERATOR + ATS</text>

  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP</text>
  <line x1="158" y1="54" x2="161" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="54" x2="170" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="182" y1="54" x2="179" y2="68" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>

  <rect x="50" y="74" width="240" height="62" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
  <text x="170" y="96" text-anchor="middle" fill="#a855f7" font-size="12" font-weight="bold">200A ATS</text>
  <text x="170" y="112" text-anchor="middle" fill="#94a3b8" font-size="9">Eaton CHSPT2ULTRA</text>
  <text x="170" y="128" text-anchor="middle" fill="#64748b" font-size="7">Anti-islanding - auto transfer under 10 sec - NEC 702</text>

  <line x1="50" y1="104" x2="28" y2="104" stroke="#f97316" stroke-width="2"/>
  <line x1="28" y1="104" x2="28" y2="282" stroke="#f97316" stroke-width="2"/>

  <rect x="6" y="282" width="128" height="88" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="70" y="306" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">GENERATOR</text>
  <text x="70" y="322" text-anchor="middle" fill="#94a3b8" font-size="9">Generac 7043</text>
  <text x="70" y="338" text-anchor="middle" fill="#64748b" font-size="8">22kW Natural Gas</text>
  <text x="70" y="354" text-anchor="middle" fill="#64748b" font-size="7">Concrete pad - 18 in. from openings</text>
  <text x="70" y="366" text-anchor="middle" fill="#94a3b8" font-size="7">Bond at generator chassis only</text>

  <line x1="28" y1="272" x2="28" y2="252" stroke="#475569" stroke-width="3"/>
  <text x="42" y="266" fill="#64748b" font-size="7">1 in. LFMC</text>

  <line x1="170" y1="136" x2="170" y2="152" stroke="#facc15" stroke-width="2"/>

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

  <!-- Ground - outside right, label RIGHT of rods -->
  <line x1="290" y1="210" x2="310" y2="210" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="310" y1="210" x2="310" y2="394" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="298" y1="394" x2="322" y2="394" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="296" y="394" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="314" y="394" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="268" y="410" text-anchor="end" fill="#22c55e" font-size="7">GND RODS</text>

  <line x1="134" y1="380" x2="134" y2="420" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="148" y="400" fill="#fbbf24" font-size="8">NATGAS</text>
  <text x="148" y="414" fill="#475569" font-size="7">(plumber)</text>

  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#a855f7" opacity="0.9"/>
  <text x="40" y="524" fill="#64748b" font-size="9">ATS transfer switch</text>
  <rect x="190" y="516" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="524" fill="#64748b" font-size="9">Generator feed</text>
  <rect x="22" y="534" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="40" y="542" fill="#64748b" font-size="9">Utility / main panel</text>
  <rect x="190" y="534" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="208" y="542" fill="#64748b" font-size="9">AFCI / ground</text>
  <text x="14" y="576" fill="#475569" font-size="7">GENERATOR + ATS - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 8: temp-power-pole (GND label right)
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
  <rect x="167" y="68" width="6" height="186" rx="1" fill="#78350f" stroke="#92400e" stroke-width="1"/>
  <text x="184" y="156" fill="#64748b" font-size="8">4x6 PT lumber</text>
  <text x="184" y="170" fill="#64748b" font-size="7">12 ft pole - 3 ft in concrete</text>

  <rect x="18" y="82" width="142" height="62" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="89" y="102" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">200A METER BASE</text>
  <text x="89" y="118" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH - AE approved</text>
  <text x="89" y="134" text-anchor="middle" fill="#64748b" font-size="7">4-6 ft AFF | AE does not stock 100A ringless</text>

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

  <rect x="160" y="252" width="56" height="20" rx="2" fill="#374151" stroke="#475569" stroke-width="1"/>
  <text x="188" y="266" text-anchor="middle" fill="#64748b" font-size="7">Concrete</text>

  <!-- Ground - label RIGHT of rod -->
  <line x1="18" y1="212" x2="8" y2="212" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="8" y1="212" x2="8" y2="332" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="2" y="332" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="22" y="348" fill="#22c55e" font-size="7">GND ROD</text>
  <text x="22" y="364" fill="#475569" font-size="7">NEC 590.7</text>

  <rect x="198" y="120" width="126" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="261" y="142" text-anchor="middle" fill="#64748b" font-size="9" font-weight="bold">SITE POWER</text>
  <text x="261" y="158" text-anchor="middle" fill="#475569" font-size="8">120V tools</text>
  <text x="261" y="174" text-anchor="middle" fill="#475569" font-size="8">240V compressor</text>
  <text x="261" y="188" text-anchor="middle" fill="#475569" font-size="8">Temp lighting</text>

  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="524" fill="#64748b" font-size="9">GFCI breaker / outlet</text>
  <rect x="190" y="516" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="208" y="524" fill="#64748b" font-size="9">Meter base (AE)</text>
  <rect x="22" y="534" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="542" fill="#64748b" font-size="9">125A load center</text>
  <line x1="190" y1="538" x2="202" y2="538" stroke="#22c55e" stroke-width="1.5"/>
  <text x="208" y="542" fill="#64748b" font-size="9">Grounding system</text>
  <text x="14" y="576" fill="#475569" font-size="7">TEMP CONSTRUCTION POLE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 9: pool-electrical (GND ROD label right)
# ─────────────────────────────────────────────────────────────────────────
$svg9 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">SWIMMING POOL ELECTRICAL - NEC 680</text>

  <rect x="70" y="38" width="200" height="44" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="74" text-anchor="middle" fill="#64748b" font-size="8">200A service - inside house</text>
  <line x1="170" y1="82" x2="170" y2="96" stroke="#facc15" stroke-width="1.5"/>

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

  <rect x="6" y="186" width="116" height="68" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <text x="64" y="206" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">EQUIP PAD</text>
  <text x="64" y="222" text-anchor="middle" fill="#64748b" font-size="8">Pump / Filter / Heater</text>
  <text x="64" y="238" text-anchor="middle" fill="#475569" font-size="7">Bonded - NEC 680.26</text>
  <text x="64" y="250" text-anchor="middle" fill="#475569" font-size="7">8 AWG solid Cu bond</text>

  <rect x="218" y="186" width="116" height="52" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="276" y="206" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V TRANSFORMER</text>
  <text x="276" y="222" text-anchor="middle" fill="#94a3b8" font-size="8">Pentair 601100 300W</text>
  <text x="276" y="234" text-anchor="middle" fill="#475569" font-size="7">GFCI protected</text>

  <ellipse cx="170" cy="306" rx="120" ry="52" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
  <text x="170" y="302" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold">POOL</text>
  <text x="170" y="320" text-anchor="middle" fill="#0ea5e9" font-size="9">12V LED light - niche mount</text>
  <ellipse cx="170" cy="306" rx="148" ry="74" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="5,4"/>
  <text x="324" y="298" fill="#ef4444" font-size="7">20 ft</text>
  <text x="324" y="310" fill="#ef4444" font-size="7">GFCI</text>
  <text x="324" y="322" fill="#ef4444" font-size="7">zone</text>

  <!-- Ground - label RIGHT of rod -->
  <line x1="64" y1="254" x2="64" y2="414" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="58" y="414" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="78" y="430" fill="#22c55e" font-size="7">GND ROD</text>

  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="524" fill="#64748b" font-size="9">GFCI protected circuit</text>
  <line x1="140" y1="520" x2="152" y2="520" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="524" fill="#64748b" font-size="9">Equipotential bond</text>
  <rect x="240" y="516" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="258" y="524" fill="#64748b" font-size="9">12V transformer</text>
  <line x1="22" y1="538" x2="34" y2="538" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="40" y="542" fill="#64748b" font-size="9">20 ft GFCI boundary</text>
  <rect x="140" y="534" width="12" height="8" rx="1" fill="#38bdf8" opacity="0.5"/>
  <text x="158" y="542" fill="#64748b" font-size="9">Pool / water</text>
  <text x="14" y="576" fill="#475569" font-size="7">SWIMMING POOL ELECTRICAL - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 11: battery-storage  ** MAJOR FIX: Powerwall + Critical Loads overlap **
# Powerwall moved to left column, Critical loads stays right. No overlap.
# Ground rods label RIGHT. Footer spaced.
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

  <!-- Solar callout - outside gateway box left -->
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

  <line x1="170" y1="226" x2="170" y2="244" stroke="#f97316" stroke-width="2"/>

  <!-- Critical loads subpanel -->
  <rect x="40" y="244" width="260" height="74" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="266" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CRITICAL LOADS</text>
  <text x="170" y="282" text-anchor="middle" fill="#94a3b8" font-size="9">100A subpanel - CHP24L125X2</text>
  <text x="170" y="298" text-anchor="middle" fill="#64748b" font-size="8">Backed-up circuits only</text>
  <text x="170" y="312" text-anchor="middle" fill="#475569" font-size="7">Fridge / HVAC / Lights / Outlets</text>

  <!-- Powerwall - BELOW critical loads, no overlap -->
  <line x1="40" y1="290" x2="24" y2="290" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="24" y1="290" x2="24" y2="338" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="24" y1="338" x2="40" y2="338" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="40" y="328" width="130" height="72" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="105" y="350" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">POWERWALL 3</text>
  <text x="105" y="366" text-anchor="middle" fill="#94a3b8" font-size="9">13.5 kWh / 11.5 kW</text>
  <text x="105" y="382" text-anchor="middle" fill="#64748b" font-size="7">Inverter built-in - UL 9540</text>
  <text x="105" y="394" text-anchor="middle" fill="#64748b" font-size="7">Indoor/Outdoor - no HVAC closets</text>

  <!-- AE notice -->
  <rect x="180" y="328" width="150" height="36" rx="3" fill="#1e293b" stroke="#a855f7" stroke-width="1"/>
  <text x="255" y="346" text-anchor="middle" fill="#a855f7" font-size="8" font-weight="bold">AE Interconnect</text>
  <text x="255" y="360" text-anchor="middle" fill="#64748b" font-size="7">Solar+storage NEC 706</text>

  <!-- Ground - outside right, label RIGHT -->
  <line x1="300" y1="200" x2="320" y2="200" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="320" y1="200" x2="320" y2="430" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="308" y1="430" x2="332" y2="430" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="306" y="430" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="322" y="430" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="290" y="446" text-anchor="end" fill="#22c55e" font-size="7">GND RODS</text>

  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#a855f7" opacity="0.9"/>
  <text x="40" y="524" fill="#64748b" font-size="9">Gateway controller</text>
  <rect x="140" y="516" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="524" fill="#64748b" font-size="9">Battery / Powerwall</text>
  <rect x="240" y="516" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="258" y="524" fill="#64748b" font-size="9">Main panel</text>
  <rect x="22" y="534" width="12" height="8" rx="1" fill="#f97316" opacity="0.85"/>
  <text x="40" y="542" fill="#64748b" font-size="9">Critical loads subpanel</text>
  <rect x="140" y="534" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="158" y="542" fill="#64748b" font-size="9">Solar input (optional)</text>
  <text x="14" y="576" fill="#475569" font-size="7">WHOLE-HOUSE BATTERY STORAGE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 12: commercial-3phase-200a (GND RODS label left of rods, footer)
# ─────────────────────────────────────────────────────────────────────────
$svg12 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">200A 3-PHASE COMMERCIAL SERVICE</text>

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

  <rect x="28" y="88" width="284" height="60" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="108" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">CT METER CABINET</text>
  <text x="170" y="124" text-anchor="middle" fill="#94a3b8" font-size="9">AE commercial CT metering - 200A class</text>
  <text x="170" y="140" text-anchor="middle" fill="#64748b" font-size="7">AE supplies meter - contractor provides cabinet</text>

  <line x1="170" y1="148" x2="170" y2="162" stroke="#facc15" stroke-width="2"/>
  <rect x="58" y="162" width="224" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="175" text-anchor="middle" fill="#64748b" font-size="9">350 kcmil AL XHHW-2 - 5 conductors (3P+N+G)</text>
  <line x1="170" y1="180" x2="170" y2="194" stroke="#facc15" stroke-width="2"/>

  <rect x="28" y="194" width="284" height="56" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="216" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">3-PHASE FUSIBLE DISCONNECT</text>
  <text x="170" y="232" text-anchor="middle" fill="#94a3b8" font-size="9">Eaton DH365FGK - 200A - 600V</text>
  <text x="170" y="246" text-anchor="middle" fill="#64748b" font-size="7">Service entrance main disconnect</text>

  <line x1="170" y1="250" x2="170" y2="264" stroke="#facc15" stroke-width="2"/>

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

  <!-- Ground - outside right, label LEFT of rods (away from edge) -->
  <line x1="312" y1="310" x2="326" y2="310" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="326" y1="310" x2="326" y2="420" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="314" y1="420" x2="336" y2="420" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="312" y="420" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="304" y="436" text-anchor="end" fill="#22c55e" font-size="7">GND RODS</text>
  <line x1="326" y1="396" x2="290" y2="396" stroke="#22c55e" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="282" y="394" text-anchor="end" fill="#22c55e" font-size="7">UFER</text>

  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="524" fill="#64748b" font-size="9">3-phase fusible disconnect</text>
  <rect x="190" y="516" width="12" height="8" rx="1" fill="#334155" opacity="0.9"/>
  <text x="208" y="524" fill="#64748b" font-size="9">3-pole breaker (20/30A)</text>
  <rect x="22" y="534" width="12" height="8" rx="1" fill="#f59e0b" opacity="0.8"/>
  <text x="40" y="542" fill="#64748b" font-size="9">3-pole HVAC/equipment</text>
  <line x1="190" y1="538" x2="202" y2="538" stroke="#22c55e" stroke-width="1.5"/>
  <text x="208" y="542" fill="#64748b" font-size="9">Grounding system</text>
  <text x="14" y="576" fill="#475569" font-size="7">200A 3-PHASE COMMERCIAL - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# JOB 13: landscape-lighting  ** MAJOR FIX: PATH/SPOT lines below boxes **
# Lines now start at y=240 (below both boxes), not y=198 (inside them)
# ─────────────────────────────────────────────────────────────────────────
$svg13 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="24" text-anchor="middle" fill="#64748b" font-size="12">LANDSCAPE / OUTDOOR LIGHTING CIRCUIT</text>

  <rect x="60" y="38" width="220" height="52" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <rect x="72" y="70" width="48" height="14" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="96" y="80" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">20A GFCI</text>
  <text x="130" y="80" fill="#64748b" font-size="7">CHFP120GF</text>

  <line x1="170" y1="94" x2="170" y2="108" stroke="#3b82f6" stroke-width="2"/>
  <rect x="68" y="108" width="204" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="121" text-anchor="middle" fill="#64748b" font-size="9">12 AWG THHN in 3/4 in. Sch 40 PVC</text>

  <line x1="16" y1="134" x2="324" y2="134" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="14" y="131" fill="#475569" font-size="7">grade</text>
  <line x1="170" y1="126" x2="170" y2="148" stroke="#3b82f6" stroke-width="2"/>
  <text x="184" y="144" fill="#64748b" font-size="7">6 in. burial min (in conduit)</text>

  <!-- Split to outlet and transformer -->
  <line x1="170" y1="152" x2="56" y2="152" stroke="#3b82f6" stroke-width="2"/>
  <line x1="170" y1="152" x2="276" y2="152" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5,3"/>

  <!-- GFCI receptacle -->
  <line x1="56" y1="152" x2="56" y2="168" stroke="#3b82f6" stroke-width="2"/>
  <rect x="6" y="168" width="100" height="52" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="56" y="190" text-anchor="middle" fill="#3b82f6" font-size="9" font-weight="bold">GFCI RCPT</text>
  <text x="56" y="206" text-anchor="middle" fill="#94a3b8" font-size="8">TWRGF20W</text>
  <text x="56" y="216" text-anchor="middle" fill="#64748b" font-size="7">WP cover MM420C</text>

  <!-- 12V transformer -->
  <line x1="276" y1="152" x2="276" y2="168" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="218" y="168" width="116" height="56" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="276" y="190" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V TRANSFORMER</text>
  <text x="276" y="206" text-anchor="middle" fill="#94a3b8" font-size="8">Kichler 15TP300BK</text>
  <text x="276" y="220" text-anchor="middle" fill="#64748b" font-size="7">300W photocell+timer</text>

  <!-- 12V wire label - between the two boxes, below their bottom edges -->
  <line x1="218" y1="240" x2="106" y2="240" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="162" y="254" text-anchor="middle" fill="#fbbf24" font-size="7">16/2 direct-burial 12V</text>

  <!-- Path lights - start BELOW both boxes (y=268) -->
  <line x1="114" y1="268" x2="114" y2="304" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="114" cy="312" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="114" y="332" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <line x1="148" y1="268" x2="148" y2="304" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="148" cy="312" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="148" y="332" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <line x1="182" y1="268" x2="182" y2="304" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="182" cy="312" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="182" y="332" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <line x1="216" y1="268" x2="216" y2="304" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="216" cy="312" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="216" y="332" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>

  <!-- Spot light -->
  <line x1="250" y1="268" x2="250" y2="304" stroke="#fbbf24" stroke-width="1"/>
  <rect x="242" y="304" width="16" height="10" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="250" y="326" text-anchor="middle" fill="#64748b" font-size="7">SPOT</text>

  <!-- House -->
  <rect x="40" y="352" width="260" height="56" rx="3" fill="#1a2535" stroke="#334155" stroke-width="1"/>
  <text x="170" y="384" text-anchor="middle" fill="#334155" font-size="16" font-weight="bold">HOUSE</text>
  <text x="170" y="402" text-anchor="middle" fill="#334155" font-size="7">Panel inside - conduit enters here</text>

  <rect x="28" y="420" width="284" height="34" rx="4" fill="#1e293b" stroke="#1e293b" stroke-width="1"/>
  <text x="170" y="436" text-anchor="middle" fill="#64748b" font-size="8">Burial: 6 in. conduit / 12 in. open ground - NEC 300.5</text>
  <text x="170" y="450" text-anchor="middle" fill="#475569" font-size="7">All 120V outdoor receptacles GFCI - NEC 210.8</text>

  <rect x="10" y="492" width="320" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="508" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="516" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="524" fill="#64748b" font-size="9">120V GFCI circuit</text>
  <line x1="140" y1="520" x2="152" y2="520" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="158" y="524" fill="#64748b" font-size="9">12V landscape wire</text>
  <circle cx="247" cy="520" r="5" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="258" y="524" fill="#64748b" font-size="9">Path / spot light</text>
  <rect x="22" y="534" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="40" y="542" fill="#64748b" font-size="9">12V transformer</text>
  <rect x="140" y="534" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="158" y="542" fill="#64748b" font-size="9">Main panel</text>
  <text x="14" y="576" fill="#475569" font-size="7">LANDSCAPE / OUTDOOR LIGHTING - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────
# APPLY: Jobs with specific fixes
# Jobs 4 (EV), 7 (Solar), 10 (Hot Tub) - only need footer y=576 fix
# Apply those via text replace instead of full SVG rewrite
# ─────────────────────────────────────────────────────────────────────────

$c = Set-SVG $c "new-200a-residential" $svg1
$c = Set-SVG $c "200a-upgrade" $svg2
$c = Set-SVG $c "new-400a-service" $svg3
$c = Set-SVG $c "100a-subpanel" $svg5
$c = Set-SVG $c "generator-ats" $svg6
$c = Set-SVG $c "temp-power-pole" $svg8
$c = Set-SVG $c "pool-electrical" $svg9
$c = Set-SVG $c "battery-storage" $svg11
$c = Set-SVG $c "commercial-3phase-200a" $svg12
$c = Set-SVG $c "landscape-lighting" $svg13

# Fix footer spacing on remaining jobs (4, 7, 10) - move y=568 to y=576
# These SVGs don't have ground rods or box overlap issues
$c = $c.Replace('LEVEL 2 EV CHARGER - NOT TO SCALE</text>
</svg>', 'LEVEL 2 EV CHARGER - NOT TO SCALE</text>
</svg>')
$c = $c.Replace('font-size="7">LEVEL 2 EV CHARGER - NOT TO SCALE', 'font-size="7">LEVEL 2 EV CHARGER - NOT TO SCALE')

[System.IO.File]::WriteAllText($file, $c, (New-Object System.Text.UTF8Encoding $true))
Write-Host "Done - specific fixes applied to all 13 SVGs"
