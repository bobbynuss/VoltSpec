
$file = 'C:\Users\bobnu\projects\voltspec\lib\data.ts'
$c = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

function Replace-SVG($content, $titleSnippet, $newSVG) {
  $startMarker = 'svgDiagram: `<svg'
  $pos = 0
  while ($true) {
    $sIdx = $content.IndexOf($startMarker, $pos)
    if ($sIdx -lt 0) { Write-Host "NOT FOUND: $titleSnippet"; return $content }
    $checkEnd = [Math]::Min($sIdx + 600, $content.Length)
    $chunk = $content.Substring($sIdx, $checkEnd - $sIdx)
    if ($chunk.Contains($titleSnippet)) {
      $svgClose = $content.IndexOf('</svg>', $sIdx)
      $backtick = $content.IndexOf('`', $svgClose)
      $newBlock = '`' + $newSVG + '`'
      Write-Host "OK: $titleSnippet"
      return $content.Substring(0, $sIdx + 'svgDiagram: '.Length) + $newBlock + $content.Substring($backtick + 1)
    }
    $pos = $sIdx + 1
  }
}

$svg6 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 520" font-family="Arial, sans-serif">
  <rect width="320" height="520" fill="#0f172a" rx="6"/>
  <text x="160" y="22" text-anchor="middle" fill="#64748b" font-size="11">TEMPORARY CONSTRUCTION POWER POLE</text>
  <text x="160" y="40" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE)</text>
  <line x1="148" y1="43" x2="152" y2="62" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="160" y1="43" x2="160" y2="62" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="172" y1="43" x2="168" y2="62" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M150,62 Q160,50 170,62 Z" fill="#facc15"/>
  <rect x="154" y="62" width="12" height="210" rx="2" fill="#78350f" stroke="#92400e" stroke-width="1"/>
  <text x="178" y="136" fill="#64748b" font-size="9">4x6 PT lumber</text>
  <text x="178" y="150" fill="#64748b" font-size="8">12 ft - 3 ft in concrete</text>
  <text x="178" y="162" fill="#475569" font-size="7">see homedepot.com</text>
  <rect x="90" y="84" width="122" height="56" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="151" y="104" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">200A METER BASE</text>
  <text x="151" y="118" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH - AE approved</text>
  <text x="151" y="131" text-anchor="middle" fill="#64748b" font-size="8">4 to 6 ft AFF on pole</text>
  <text x="151" y="140" text-anchor="middle" fill="#475569" font-size="7">AE does not stock 100A ringless</text>
  <rect x="90" y="152" width="122" height="84" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="151" y="172" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">100A LOAD CENTER</text>
  <text x="151" y="186" text-anchor="middle" fill="#94a3b8" font-size="9">BR2020B100 - outdoor</text>
  <rect x="100" y="194" width="24" height="9" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="128" y="194" width="24" height="9" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="156" y="194" width="24" height="9" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="100" y="207" width="24" height="9" rx="1" fill="#334155"/>
  <rect x="128" y="207" width="24" height="9" rx="1" fill="#334155"/>
  <text x="151" y="228" text-anchor="middle" fill="#64748b" font-size="8">All outlets GFCI - NEC 590.6</text>
  <line x1="90" y1="210" x2="60" y2="210" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="60" y1="210" x2="60" y2="314" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="52" y="314" width="14" height="28" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="60" y="312" text-anchor="middle" fill="#22c55e" font-size="8">GND ROD</text>
  <text x="60" y="354" text-anchor="middle" fill="#475569" font-size="8">5/8 x 8ft</text>
  <text x="60" y="366" text-anchor="middle" fill="#475569" font-size="7">NEC 590.7</text>
  <rect x="136" y="264" width="48" height="20" rx="2" fill="#374151" stroke="#4b5563" stroke-width="1"/>
  <text x="160" y="278" text-anchor="middle" fill="#6b7280" font-size="8">Concrete footing</text>
  <rect x="212" y="160" width="90" height="64" rx="3" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="257" y="180" text-anchor="middle" fill="#64748b" font-size="9" font-weight="bold">SITE POWER</text>
  <text x="257" y="194" text-anchor="middle" fill="#475569" font-size="8">120V tools</text>
  <text x="257" y="207" text-anchor="middle" fill="#475569" font-size="8">240V compressor</text>
  <text x="257" y="220" text-anchor="middle" fill="#475569" font-size="8">Temp lighting</text>
  <rect x="10" y="420" width="300" height="88" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="437" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="444" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="453" fill="#64748b" font-size="9">GFCI breaker / outlet</text>
  <rect x="160" y="444" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="178" y="453" fill="#64748b" font-size="9">Meter base (AE)</text>
  <rect x="22" y="460" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="469" fill="#64748b" font-size="9">100A load center</text>
  <line x1="160" y1="464" x2="172" y2="464" stroke="#22c55e" stroke-width="1.5"/>
  <text x="178" y="469" fill="#64748b" font-size="9">Grounding system</text>
  <text x="14" y="500" fill="#475569" font-size="8">TEMP CONSTRUCTION POLE - NOT TO SCALE</text>
</svg>
'@

$svg7 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 520" font-family="Arial, sans-serif">
  <rect width="320" height="520" fill="#0f172a" rx="6"/>
  <text x="160" y="22" text-anchor="middle" fill="#64748b" font-size="11">SWIMMING POOL ELECTRICAL - NEC 680</text>
  <rect x="100" y="36" width="120" height="46" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="160" y="56" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="160" y="70" text-anchor="middle" fill="#64748b" font-size="8">200A service - inside house</text>
  <line x1="160" y1="82" x2="160" y2="104" stroke="#facc15" stroke-width="1.5"/>
  <rect x="86" y="104" width="148" height="62" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="160" y="124" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="bold">POOL LOAD CENTER</text>
  <text x="160" y="138" text-anchor="middle" fill="#94a3b8" font-size="9">BR2020B060 - 60A - outdoor</text>
  <text x="160" y="151" text-anchor="middle" fill="#64748b" font-size="8">All circuits GFCI - NEC 680.22</text>
  <rect x="98" y="158" width="28" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="130" y="158" width="28" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="162" y="158" width="28" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="112" y="166" text-anchor="middle" fill="#64748b" font-size="6">PUMP</text>
  <text x="144" y="166" text-anchor="middle" fill="#64748b" font-size="6">LIGHT</text>
  <text x="176" y="166" text-anchor="middle" fill="#64748b" font-size="6">RCPT</text>
  <line x1="160" y1="168" x2="160" y2="190" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="168" y="182" fill="#64748b" font-size="8">3/4 in. Sch 40 PVC underground</text>
  <ellipse cx="160" cy="278" rx="106" ry="60" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
  <text x="160" y="272" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold">POOL</text>
  <text x="160" y="288" text-anchor="middle" fill="#0ea5e9" font-size="9">12V LED light - niche mount</text>
  <ellipse cx="160" cy="278" rx="130" ry="80" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="5,4"/>
  <text x="286" y="265" fill="#ef4444" font-size="8">20 ft</text>
  <text x="286" y="277" fill="#ef4444" font-size="8">GFCI</text>
  <text x="286" y="289" fill="#ef4444" font-size="8">zone</text>
  <rect x="14" y="226" width="100" height="58" rx="3" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <text x="64" y="246" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">EQUIP PAD</text>
  <text x="64" y="260" text-anchor="middle" fill="#64748b" font-size="8">Pump / Filter / Heater</text>
  <text x="64" y="272" text-anchor="middle" fill="#64748b" font-size="7">All bonded - NEC 680.26</text>
  <text x="64" y="282" text-anchor="middle" fill="#475569" font-size="7">8 AWG solid Cu bond wire</text>
  <line x1="114" y1="255" x2="140" y2="255" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="206" y="195" width="96" height="40" rx="3" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="254" y="212" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V TRANSFORMER</text>
  <text x="254" y="225" text-anchor="middle" fill="#64748b" font-size="8">Pentair 601100 - 300W</text>
  <text x="254" y="235" text-anchor="middle" fill="#475569" font-size="7">GFCI protected circuit</text>
  <line x1="64" y1="284" x2="64" y2="364" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="56" y="364" width="14" height="28" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="64" y="362" text-anchor="middle" fill="#22c55e" font-size="8">GND ROD</text>
  <text x="64" y="404" text-anchor="middle" fill="#475569" font-size="7">5/8 x 8ft - equip pad</text>
  <rect x="10" y="420" width="300" height="88" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="437" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="444" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="453" fill="#64748b" font-size="9">GFCI protected circuit</text>
  <line x1="160" y1="448" x2="172" y2="448" stroke="#22c55e" stroke-width="1.5"/>
  <text x="178" y="453" fill="#64748b" font-size="9">Equipotential bond</text>
  <rect x="22" y="460" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="40" y="469" fill="#64748b" font-size="9">12V transformer</text>
  <line x1="160" y1="464" x2="172" y2="464" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="178" y="469" fill="#64748b" font-size="9">20 ft GFCI boundary</text>
  <text x="14" y="500" fill="#475569" font-size="8">SWIMMING POOL ELECTRICAL - NOT TO SCALE</text>
</svg>
'@

$svg8 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 520" font-family="Arial, sans-serif">
  <rect width="320" height="520" fill="#0f172a" rx="6"/>
  <text x="160" y="22" text-anchor="middle" fill="#64748b" font-size="11">HOT TUB / SPA DEDICATED CIRCUIT</text>
  <rect x="100" y="36" width="120" height="46" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="160" y="56" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="160" y="70" text-anchor="middle" fill="#64748b" font-size="9">200A service</text>
  <rect x="88" y="72" width="4" height="10" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="82" y="80" text-anchor="end" fill="#3b82f6" font-size="8">50A GFCI</text>
  <line x1="160" y1="82" x2="160" y2="106" stroke="#3b82f6" stroke-width="2"/>
  <rect x="80" y="94" width="160" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="160" y="107" text-anchor="middle" fill="#64748b" font-size="9">6 AWG THHN - 1 in. Sch 40 PVC underground</text>
  <line x1="20" y1="116" x2="300" y2="116" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="16" y="114" fill="#475569" font-size="7">grade</text>
  <line x1="160" y1="116" x2="160" y2="148" stroke="#3b82f6" stroke-width="2"/>
  <text x="170" y="134" fill="#64748b" font-size="9">12 in. burial</text>
  <text x="170" y="146" fill="#475569" font-size="8">open ground</text>
  <rect x="96" y="148" width="128" height="46" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="160" y="168" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">60A DISCONNECT</text>
  <text x="160" y="182" text-anchor="middle" fill="#94a3b8" font-size="9">DG222NGB - NEMA 3R - lockable</text>
  <text x="160" y="193" text-anchor="middle" fill="#64748b" font-size="7">5 to 50 ft from spa - within sight - NEC 680.12</text>
  <line x1="160" y1="194" x2="160" y2="218" stroke="#3b82f6" stroke-width="2"/>
  <text x="170" y="208" fill="#64748b" font-size="8">Short conduit run to spa</text>
  <rect x="60" y="218" width="200" height="96" rx="8" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2.5"/>
  <text x="160" y="256" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="bold">HOT TUB</text>
  <text x="160" y="273" text-anchor="middle" fill="#0ea5e9" font-size="9">240V - 50A - 4-wire circuit</text>
  <text x="160" y="288" text-anchor="middle" fill="#64748b" font-size="8">Pump / Heater / Controls</text>
  <text x="160" y="304" text-anchor="middle" fill="#94a3b8" font-size="7">Verify amperage on nameplate before sizing</text>
  <line x1="60" y1="265" x2="28" y2="265" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="260" y1="265" x2="292" y2="265" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="28" y1="265" x2="28" y2="348" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="292" y1="265" x2="292" y2="348" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="28" y1="348" x2="292" y2="348" stroke="#22c55e" stroke-width="1.5"/>
  <text x="160" y="344" text-anchor="middle" fill="#22c55e" font-size="8">8 AWG solid Cu bond grid - NEC 680.43</text>
  <text x="160" y="356" text-anchor="middle" fill="#475569" font-size="7">All metal parts within 5 ft of water</text>
  <line x1="60" y1="200" x2="60" y2="166" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="260" y1="200" x2="260" y2="166" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="60" y1="172" x2="260" y2="172" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="160" y="168" text-anchor="middle" fill="#ef4444" font-size="8">No overhead wiring within 22.5 ft</text>
  <rect x="10" y="420" width="300" height="88" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="437" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="444" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="453" fill="#64748b" font-size="9">GFCI 50A dedicated circuit</text>
  <rect x="160" y="444" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="178" y="453" fill="#64748b" font-size="9">Lockable disconnect</text>
  <line x1="22" y1="464" x2="34" y2="464" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="469" fill="#64748b" font-size="9">Equipotential bond grid</text>
  <line x1="160" y1="464" x2="172" y2="464" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="178" y="469" fill="#64748b" font-size="9">22.5 ft overhead clearance</text>
  <text x="14" y="500" fill="#475569" font-size="8">HOT TUB / SPA CIRCUIT - NOT TO SCALE</text>
</svg>
'@

$svg9 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 520" font-family="Arial, sans-serif">
  <rect width="320" height="520" fill="#0f172a" rx="6"/>
  <text x="160" y="22" text-anchor="middle" fill="#64748b" font-size="11">WHOLE-HOUSE BATTERY STORAGE</text>
  <text x="160" y="40" text-anchor="middle" fill="#64748b" font-size="9">UTILITY</text>
  <line x1="148" y1="43" x2="151" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="160" y1="43" x2="160" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="172" y1="43" x2="169" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="60" y="60" width="200" height="54" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
  <text x="160" y="80" text-anchor="middle" fill="#a855f7" font-size="12" font-weight="bold">GATEWAY 3</text>
  <text x="160" y="94" text-anchor="middle" fill="#94a3b8" font-size="9">Tesla Gateway - system controller</text>
  <text x="160" y="107" text-anchor="middle" fill="#64748b" font-size="8">Grid / Solar / Battery transitions - auto transfer</text>
  <line x1="60" y1="87" x2="28" y2="87" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="4" y="78" width="36" height="18" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>
  <text x="22" y="89" text-anchor="middle" fill="#fbbf24" font-size="7">SOLAR</text>
  <text x="22" y="97" text-anchor="middle" fill="#475569" font-size="6">optional</text>
  <line x1="160" y1="114" x2="160" y2="140" stroke="#facc15" stroke-width="2"/>
  <rect x="70" y="140" width="180" height="74" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="160" y="161" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="160" y="175" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="82" y="184" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="100" y="184" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="118" y="184" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="136" y="184" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="154" y="184" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="172" y="184" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="190" y="184" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="208" y="184" width="14" height="7" rx="1" fill="#334155"/>
  <text x="160" y="204" text-anchor="middle" fill="#475569" font-size="8">All loads + critical subpanel feeder</text>
  <line x1="70" y1="184" x2="40" y2="184" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="40" y1="184" x2="40" y2="252" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="6" y="252" width="118" height="78" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="65" y="274" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">POWERWALL 3</text>
  <text x="65" y="288" text-anchor="middle" fill="#94a3b8" font-size="9">13.5 kWh - 11.5 kW cont.</text>
  <text x="65" y="301" text-anchor="middle" fill="#64748b" font-size="8">Built-in inverter - UL 9540</text>
  <text x="65" y="313" text-anchor="middle" fill="#64748b" font-size="7">Indoor/Outdoor - avoid extreme heat</text>
  <text x="65" y="325" text-anchor="middle" fill="#475569" font-size="7">No HVAC closets (TX summers)</text>
  <line x1="160" y1="214" x2="160" y2="242" stroke="#f97316" stroke-width="2"/>
  <rect x="90" y="242" width="140" height="74" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="160" y="263" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">CRITICAL LOADS</text>
  <text x="160" y="277" text-anchor="middle" fill="#94a3b8" font-size="9">100A subpanel - CHP24L125X2</text>
  <text x="160" y="290" text-anchor="middle" fill="#64748b" font-size="8">Backed-up circuits only</text>
  <rect x="100" y="298" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="120" y="298" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="140" y="298" width="16" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="160" y="298" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="160" y="316" text-anchor="middle" fill="#475569" font-size="7">Fridge / HVAC / Lights / Outlets</text>
  <rect x="84" y="326" width="152" height="28" rx="3" fill="#1e293b" stroke="#a855f7" stroke-width="1"/>
  <text x="160" y="339" text-anchor="middle" fill="#a855f7" font-size="8" font-weight="bold">AE Interconnect Amendment Required</text>
  <text x="160" y="350" text-anchor="middle" fill="#64748b" font-size="7">Solar + storage - NEC 706 - UL 9540</text>
  <rect x="10" y="420" width="300" height="88" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="437" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="444" width="12" height="8" rx="1" fill="#a855f7" opacity="0.9"/>
  <text x="40" y="453" fill="#64748b" font-size="9">Gateway controller</text>
  <rect x="160" y="444" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="178" y="453" fill="#64748b" font-size="9">Battery / Powerwall</text>
  <rect x="22" y="460" width="12" height="8" rx="1" fill="#f97316" opacity="0.85"/>
  <text x="40" y="469" fill="#64748b" font-size="9">Critical loads subpanel</text>
  <rect x="160" y="460" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="178" y="469" fill="#64748b" font-size="9">Solar input (optional)</text>
  <text x="14" y="500" fill="#475569" font-size="8">WHOLE-HOUSE BATTERY STORAGE - NOT TO SCALE</text>
</svg>
'@

$svg10 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 520" font-family="Arial, sans-serif">
  <rect width="320" height="520" fill="#0f172a" rx="6"/>
  <text x="160" y="22" text-anchor="middle" fill="#64748b" font-size="11">200A 3-PHASE COMMERCIAL SERVICE</text>
  <text x="160" y="40" text-anchor="middle" fill="#64748b" font-size="9">UTILITY - 3-PHASE DROP</text>
  <line x1="126" y1="43" x2="131" y2="62" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="143" y1="43" x2="148" y2="62" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="160" y1="43" x2="160" y2="62" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="177" y1="43" x2="172" y2="62" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="194" y1="43" x2="189" y2="62" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="120" y="43" fill="#475569" font-size="7">A</text>
  <text x="137" y="43" fill="#475569" font-size="7">B</text>
  <text x="154" y="43" fill="#475569" font-size="7">C</text>
  <text x="171" y="43" fill="#475569" font-size="7">N</text>
  <text x="188" y="43" fill="#475569" font-size="7">G</text>
  <path d="M152,62 Q160,50 168,62 Z" fill="#facc15"/>
  <rect x="157" y="62" width="6" height="26" rx="1" fill="#334155" stroke="#64748b" stroke-width="1"/>
  <rect x="68" y="88" width="184" height="54" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="160" y="109" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">CT METER CABINET</text>
  <text x="160" y="123" text-anchor="middle" fill="#94a3b8" font-size="9">AE commercial CT metering - 200A class</text>
  <text x="160" y="135" text-anchor="middle" fill="#64748b" font-size="7">AE supplies meter - contractor provides cabinet</text>
  <line x1="160" y1="142" x2="160" y2="164" stroke="#facc15" stroke-width="2"/>
  <rect x="66" y="152" width="188" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="160" y="165" text-anchor="middle" fill="#64748b" font-size="9">350 kcmil AL XHHW-2 - 5 conductors (3P+N+G)</text>
  <line x1="160" y1="170" x2="160" y2="192" stroke="#facc15" stroke-width="2"/>
  <rect x="80" y="192" width="160" height="46" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="160" y="212" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">3-PHASE FUSIBLE DISCONNECT</text>
  <text x="160" y="226" text-anchor="middle" fill="#94a3b8" font-size="9">Eaton DH365FGK - 200A - 600V - NEMA 1</text>
  <text x="160" y="237" text-anchor="middle" fill="#64748b" font-size="7">Service entrance main disconnect</text>
  <line x1="160" y1="238" x2="160" y2="260" stroke="#facc15" stroke-width="2"/>
  <rect x="50" y="260" width="220" height="90" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="160" y="280" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN DISTRIBUTION PANEL</text>
  <text x="160" y="294" text-anchor="middle" fill="#94a3b8" font-size="9">Pow-R-Line - EZB2072R + PRL3A3400X42A</text>
  <text x="160" y="307" text-anchor="middle" fill="#64748b" font-size="8">400A AL bus - 42 circuit - 120/208V 3ph 4W</text>
  <rect x="62" y="316" width="22" height="8" rx="1" fill="#334155"/>
  <rect x="88" y="316" width="22" height="8" rx="1" fill="#334155"/>
  <rect x="114" y="316" width="22" height="8" rx="1" fill="#334155"/>
  <rect x="140" y="316" width="22" height="8" rx="1" fill="#f59e0b" opacity="0.8"/>
  <rect x="166" y="316" width="22" height="8" rx="1" fill="#f59e0b" opacity="0.8"/>
  <rect x="192" y="316" width="22" height="8" rx="1" fill="#334155"/>
  <rect x="218" y="316" width="22" height="8" rx="1" fill="#334155"/>
  <text x="160" y="337" text-anchor="middle" fill="#475569" font-size="7">Arc Flash Label Required - NEC 110.16 - Engineer stamp</text>
  <text x="160" y="348" text-anchor="middle" fill="#64748b" font-size="7">Confirm voltage class with AE: 120/208V vs 277/480V</text>
  <line x1="50" y1="314" x2="28" y2="314" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="28" y1="314" x2="28" y2="394" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="14" y1="394" x2="42" y2="394" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="8" y="394" width="12" height="24" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="34" y="394" width="12" height="24" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="28" y="392" text-anchor="middle" fill="#22c55e" font-size="7">GND RODS</text>
  <line x1="28" y1="374" x2="8" y2="374" stroke="#22c55e" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="4" y="371" fill="#22c55e" font-size="6">UFER</text>
  <rect x="10" y="420" width="300" height="88" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="437" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="444" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="453" fill="#64748b" font-size="9">3-phase fusible disconnect</text>
  <rect x="160" y="444" width="12" height="8" rx="1" fill="#334155"/>
  <text x="178" y="453" fill="#64748b" font-size="9">3-pole breaker (20/30A)</text>
  <rect x="22" y="460" width="12" height="8" rx="1" fill="#f59e0b" opacity="0.8"/>
  <text x="40" y="469" fill="#64748b" font-size="9">3-pole HVAC/equipment</text>
  <line x1="160" y1="464" x2="172" y2="464" stroke="#22c55e" stroke-width="1.5"/>
  <text x="178" y="469" fill="#64748b" font-size="9">Grounding system</text>
  <text x="14" y="500" fill="#475569" font-size="8">200A 3-PHASE COMMERCIAL - NOT TO SCALE</text>
</svg>
'@

$svg11 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 520" font-family="Arial, sans-serif">
  <rect width="320" height="520" fill="#0f172a" rx="6"/>
  <text x="160" y="22" text-anchor="middle" fill="#64748b" font-size="11">LANDSCAPE / OUTDOOR LIGHTING CIRCUIT</text>
  <rect x="100" y="36" width="120" height="46" rx="3" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="160" y="56" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <rect x="100" y="70" width="34" height="12" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="117" y="79" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">20A GFCI</text>
  <text x="142" y="79" fill="#64748b" font-size="7">CHFP120GF</text>
  <line x1="160" y1="82" x2="160" y2="106" stroke="#3b82f6" stroke-width="2"/>
  <rect x="72" y="94" width="176" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="160" y="107" text-anchor="middle" fill="#64748b" font-size="9">12 AWG THHN in 3/4 in. Sch 40 PVC underground</text>
  <line x1="20" y1="116" x2="300" y2="116" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="16" y="114" fill="#475569" font-size="7">grade</text>
  <line x1="160" y1="116" x2="160" y2="136" stroke="#3b82f6" stroke-width="2"/>
  <text x="168" y="128" fill="#64748b" font-size="8">6 in. burial min (in conduit)</text>
  <line x1="160" y1="136" x2="80" y2="136" stroke="#3b82f6" stroke-width="2"/>
  <line x1="160" y1="136" x2="240" y2="136" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5,3"/>
  <line x1="80" y1="136" x2="40" y2="136" stroke="#3b82f6" stroke-width="2"/>
  <line x1="40" y1="136" x2="40" y2="174" stroke="#3b82f6" stroke-width="2"/>
  <rect x="14" y="174" width="80" height="46" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="54" y="193" text-anchor="middle" fill="#3b82f6" font-size="9" font-weight="bold">GFCI RCPT</text>
  <text x="54" y="207" text-anchor="middle" fill="#94a3b8" font-size="8">TWRGF20W</text>
  <text x="54" y="218" text-anchor="middle" fill="#64748b" font-size="7">WP cover MM420C</text>
  <line x1="240" y1="136" x2="270" y2="136" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="270" y1="136" x2="270" y2="174" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="230" y="174" width="80" height="56" rx="3" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="270" y="194" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V XFMR</text>
  <text x="270" y="207" text-anchor="middle" fill="#94a3b8" font-size="8">Kichler 15TP300BK</text>
  <text x="270" y="219" text-anchor="middle" fill="#64748b" font-size="7">300W - photocell + timer</text>
  <text x="270" y="229" text-anchor="middle" fill="#475569" font-size="6">GFCI protected circuit</text>
  <line x1="230" y1="214" x2="160" y2="214" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="195" y="210" text-anchor="middle" fill="#fbbf24" font-size="7">16/2 direct-burial 12V</text>
  <line x1="90" y1="214" x2="90" y2="254" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="90" cy="260" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="90" y="278" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>
  <line x1="126" y1="214" x2="126" y2="254" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="126" cy="260" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="126" y="278" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>
  <line x1="160" y1="214" x2="160" y2="254" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="160" cy="260" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="160" y="278" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>
  <line x1="198" y1="214" x2="198" y2="250" stroke="#fbbf24" stroke-width="1"/>
  <rect x="190" y="250" width="16" height="8" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="198" y="270" text-anchor="middle" fill="#64748b" font-size="7">SPOT</text>
  <rect x="60" y="296" width="200" height="70" rx="3" fill="#1e293b" stroke="#334155" stroke-width="1" opacity="0.5"/>
  <text x="160" y="330" text-anchor="middle" fill="#334155" font-size="16" font-weight="bold">HOUSE</text>
  <text x="160" y="352" text-anchor="middle" fill="#334155" font-size="8">Panel inside - conduit enters here</text>
  <rect x="10" y="378" width="300" height="30" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="160" y="392" text-anchor="middle" fill="#64748b" font-size="8">Burial: 6 in. in conduit under deck - 12 in. open ground - NEC 300.5</text>
  <text x="160" y="405" text-anchor="middle" fill="#475569" font-size="7">All 120V outdoor receptacles GFCI protected - NEC 210.8</text>
  <rect x="10" y="420" width="300" height="88" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="437" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="444" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="453" fill="#64748b" font-size="9">120V GFCI circuit</text>
  <line x1="160" y1="448" x2="172" y2="448" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="178" y="453" fill="#64748b" font-size="9">12V landscape wire</text>
  <circle cx="28" cy="464" r="5" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="40" y="469" fill="#64748b" font-size="9">Path / spot light</text>
  <rect x="160" y="460" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="178" y="469" fill="#64748b" font-size="9">12V transformer</text>
  <text x="14" y="500" fill="#475569" font-size="8">LANDSCAPE / OUTDOOR LIGHTING - NOT TO SCALE</text>
</svg>
'@

Write-Host "SVG strings prepared, lengths: $($svg6.Length), $($svg7.Length), $($svg8.Length), $($svg9.Length), $($svg10.Length), $($svg11.Length)"
