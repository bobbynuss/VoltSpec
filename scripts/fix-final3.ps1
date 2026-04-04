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

# ─────────────────────────────────────────────────────────────────────────
# FIX 1: battery-storage
# AE Interconnect box shrunk to width=110 (right edge x=290), well clear
# of green line at x=320. Also moved text anchor to match.
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

  <!-- Solar callout -->
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

  <!-- Powerwall - below critical loads -->
  <line x1="40" y1="290" x2="24" y2="290" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="24" y1="290" x2="24" y2="338" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="24" y1="338" x2="40" y2="338" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="40" y="328" width="130" height="72" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="105" y="350" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">POWERWALL 3</text>
  <text x="105" y="366" text-anchor="middle" fill="#94a3b8" font-size="9">13.5 kWh / 11.5 kW</text>
  <text x="105" y="382" text-anchor="middle" fill="#64748b" font-size="7">Inverter built-in - UL 9540</text>
  <text x="105" y="394" text-anchor="middle" fill="#64748b" font-size="7">Indoor/Outdoor - no HVAC closets</text>

  <!-- AE notice - width=110, right edge at x=290, clear of green line at x=320 -->
  <rect x="180" y="334" width="110" height="36" rx="3" fill="#1e293b" stroke="#a855f7" stroke-width="1"/>
  <text x="235" y="352" text-anchor="middle" fill="#a855f7" font-size="8" font-weight="bold">AE Interconnect</text>
  <text x="235" y="366" text-anchor="middle" fill="#64748b" font-size="7">Solar+storage NEC 706</text>

  <!-- Ground - outside right at x=320, fully clear of AE box (ends x=290) -->
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
# FIX 2: pool-electrical
# Ground line now routes LEFT from equip pad to x=10, then down outside
# the pool ellipse (pool left edge is x=50 at center, x=22 at widest GFCI zone).
# Line goes at x=10, completely clear. Rod at bottom-left.
# Pool ellipse slightly reduced to rx=110 to give more left margin.
# GFCI zone ellipse adjusted proportionally.
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

  <!-- Equipment pad -->
  <rect x="24" y="186" width="110" height="68" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <text x="79" y="206" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">EQUIP PAD</text>
  <text x="79" y="222" text-anchor="middle" fill="#64748b" font-size="8">Pump / Filter / Heater</text>
  <text x="79" y="238" text-anchor="middle" fill="#475569" font-size="7">Bonded - NEC 680.26</text>
  <text x="79" y="250" text-anchor="middle" fill="#475569" font-size="7">8 AWG solid Cu bond</text>

  <!-- 12V transformer -->
  <rect x="218" y="186" width="116" height="52" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="276" y="206" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V TRANSFORMER</text>
  <text x="276" y="222" text-anchor="middle" fill="#94a3b8" font-size="8">Pentair 601100 300W</text>
  <text x="276" y="234" text-anchor="middle" fill="#475569" font-size="7">GFCI protected</text>

  <!-- Pool - centered at x=185 to give left margin for ground line -->
  <ellipse cx="185" cy="310" rx="110" ry="50" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
  <text x="185" y="306" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold">POOL</text>
  <text x="185" y="324" text-anchor="middle" fill="#0ea5e9" font-size="9">12V LED light - niche mount</text>

  <!-- 20ft GFCI zone -->
  <ellipse cx="185" cy="310" rx="138" ry="72" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="5,4"/>
  <text x="328" y="302" fill="#ef4444" font-size="7">20 ft</text>
  <text x="328" y="314" fill="#ef4444" font-size="7">GFCI</text>
  <text x="328" y="326" fill="#ef4444" font-size="7">zone</text>

  <!-- Ground - routes LEFT from equip pad, then down at x=10, outside all pool elements -->
  <line x1="24" y1="230" x2="10" y2="230" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="10" y1="230" x2="10" y2="432" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="4" y="432" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="24" y="448" fill="#22c55e" font-size="7">GND ROD</text>

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
# FIX 3: temp-power-pole
# Pole text moved ABOVE the Site Power box (y=104, y=114) so it doesn't
# overlap. Site Power box moved down to y=140 to give clear separation.
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

  <!-- Pole text - positioned between pole and right side, ABOVE Site Power box -->
  <text x="184" y="104" fill="#64748b" font-size="8">4x6 PT lumber</text>
  <text x="184" y="116" fill="#64748b" font-size="7">12 ft - 3 ft in concrete</text>

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

  <!-- Site Power box - moved down to y=136 with 10px+ gap from pole text -->
  <rect x="198" y="136" width="126" height="72" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="261" y="158" text-anchor="middle" fill="#64748b" font-size="9" font-weight="bold">SITE POWER</text>
  <text x="261" y="174" text-anchor="middle" fill="#475569" font-size="8">120V tools</text>
  <text x="261" y="190" text-anchor="middle" fill="#475569" font-size="8">240V compressor</text>
  <text x="261" y="204" text-anchor="middle" fill="#475569" font-size="8">Temp lighting</text>

  <!-- Concrete -->
  <rect x="160" y="252" width="56" height="20" rx="2" fill="#374151" stroke="#475569" stroke-width="1"/>
  <text x="188" y="266" text-anchor="middle" fill="#64748b" font-size="7">Concrete</text>

  <!-- Ground - label RIGHT of rod -->
  <line x1="18" y1="212" x2="8" y2="212" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="8" y1="212" x2="8" y2="332" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="2" y="332" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="22" y="348" fill="#22c55e" font-size="7">GND ROD</text>
  <text x="22" y="364" fill="#475569" font-size="7">NEC 590.7</text>

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
# APPLY
# ─────────────────────────────────────────────────────────────────────────
$c = Set-SVG $c "battery-storage" $svg11
$c = Set-SVG $c "pool-electrical" $svg9
$c = Set-SVG $c "temp-power-pole" $svg8

[System.IO.File]::WriteAllText($file, $c, (New-Object System.Text.UTF8Encoding $true))
Write-Host "Done - 3 targeted fixes applied"
