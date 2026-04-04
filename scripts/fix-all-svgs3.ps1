
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

# ─────────────────────────────────────────────────────────────────────────────
# JOB 7: solar-pv-20kw
# ─────────────────────────────────────────────────────────────────────────────
$svg7 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">SOLAR PV INTERCONNECT - UP TO 20kW</text>
  <rect x="18" y="36" width="304" height="56" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
  <text x="170" y="58" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">SOLAR PV ARRAY - ROOF MOUNT</text>
  <text x="170" y="74" text-anchor="middle" fill="#94a3b8" font-size="9">44 x 400W modules - 17.6kW STC - South/West preferred</text>
  <rect x="26" y="78" width="32" height="10" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="62" y="78" width="32" height="10" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="98" y="78" width="32" height="10" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="134" y="78" width="32" height="10" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="170" y="78" width="32" height="10" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="206" y="78" width="32" height="10" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="242" y="78" width="32" height="10" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <rect x="278" y="78" width="32" height="10" rx="1" fill="#1e3a5f" stroke="#fbbf24" stroke-width="0.5"/>
  <line x1="170" y1="92" x2="170" y2="106" stroke="#fbbf24" stroke-width="2"/>
  <rect x="88" y="96" width="164" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="109" text-anchor="middle" fill="#64748b" font-size="9">10 AWG USE-2 / PV wire - MC4 connectors</text>
  <line x1="170" y1="114" x2="170" y2="130" stroke="#fbbf24" stroke-width="2"/>
  <rect x="96" y="130" width="148" height="40" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
  <text x="170" y="150" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold">RAPID SHUTDOWN</text>
  <text x="170" y="164" text-anchor="middle" fill="#64748b" font-size="8">NEC 690.12 - required for all roof systems</text>
  <line x1="170" y1="170" x2="170" y2="186" stroke="#fbbf24" stroke-width="2"/>
  <rect x="56" y="186" width="228" height="62" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="170" y="208" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">STRING INVERTER</text>
  <text x="170" y="224" text-anchor="middle" fill="#94a3b8" font-size="9">SolarEdge SE17400H - 17.4kW - UL 1741</text>
  <text x="170" y="240" text-anchor="middle" fill="#64748b" font-size="8">DC to AC - WiFi monitoring - anti-islanding</text>
  <line x1="170" y1="248" x2="170" y2="264" stroke="#22c55e" stroke-width="2"/>
  <rect x="96" y="264" width="148" height="40" rx="3" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
  <text x="170" y="284" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">60A AC DISCONNECT</text>
  <text x="170" y="298" text-anchor="middle" fill="#64748b" font-size="8">Non-fusible NEMA 3R - within sight of inverter</text>
  <line x1="170" y1="304" x2="170" y2="320" stroke="#22c55e" stroke-width="2"/>
  <rect x="88" y="310" width="164" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="323" text-anchor="middle" fill="#64748b" font-size="9">10 AWG THHN - 3/4 in. EMT conduit</text>
  <line x1="170" y1="328" x2="170" y2="344" stroke="#22c55e" stroke-width="2"/>
  <rect x="56" y="344" width="228" height="62" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="366" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="382" text-anchor="middle" fill="#94a3b8" font-size="9">20A backfed breaker - 120% rule NEC 705.12</text>
  <text x="170" y="398" text-anchor="middle" fill="#64748b" font-size="8">Supply-side tap per AE preference</text>
  <rect x="290" y="352" width="40" height="26" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
  <text x="310" y="366" text-anchor="middle" fill="#94a3b8" font-size="8">PROD</text>
  <text x="310" y="377" text-anchor="middle" fill="#64748b" font-size="7">METER</text>
  <line x1="284" y1="365" x2="290" y2="365" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2"/>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <line x1="22" y1="523" x2="34" y2="523" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="40" y="527" fill="#64748b" font-size="9">DC PV circuit</text>
  <line x1="140" y1="523" x2="152" y2="523" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="527" fill="#64748b" font-size="9">AC inverter output</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#ef4444" opacity="0.9"/>
  <text x="258" y="527" fill="#64748b" font-size="9">Rapid shutdown</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="545" fill="#64748b" font-size="9">AC disconnect</text>
  <rect x="140" y="536" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="158" y="545" fill="#64748b" font-size="9">Main panel</text>
  <rect x="240" y="536" width="12" height="8" rx="1" fill="#94a3b8" opacity="0.5"/>
  <text x="258" y="545" fill="#64748b" font-size="9">Production meter</text>
  <text x="14" y="566" fill="#475569" font-size="7">SOLAR PV INTERCONNECT - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────────
# JOB 8: temp-power-pole
# ─────────────────────────────────────────────────────────────────────────────
$svg8 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">TEMPORARY CONSTRUCTION POWER POLE</text>
  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY DROP (AE)</text>
  <line x1="158" y1="50" x2="161" y2="66" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="50" x2="170" y2="66" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="182" y1="50" x2="179" y2="66" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M162,66 Q170,56 178,66 Z" fill="#facc15"/>
  <rect x="167" y="66" width="6" height="200" rx="1" fill="#78350f" stroke="#92400e" stroke-width="1"/>
  <text x="182" y="160" fill="#64748b" font-size="8">4x6 PT lumber</text>
  <text x="182" y="172" fill="#64748b" font-size="7">12 ft pole - 3 ft in concrete</text>
  <rect x="18" y="80" width="142" height="68" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="89" y="100" text-anchor="middle" fill="#facc15" font-size="10" font-weight="bold">200A METER BASE</text>
  <text x="89" y="116" text-anchor="middle" fill="#94a3b8" font-size="9">1006352CCH - AE approved</text>
  <text x="89" y="131" text-anchor="middle" fill="#64748b" font-size="8">4 to 6 ft AFF on pole</text>
  <text x="89" y="143" text-anchor="middle" fill="#475569" font-size="7">AE does not stock 100A ringless</text>
  <rect x="18" y="152" width="142" height="80" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="89" y="172" text-anchor="middle" fill="#f97316" font-size="10" font-weight="bold">125A LOAD CENTER</text>
  <text x="89" y="188" text-anchor="middle" fill="#94a3b8" font-size="9">CHP22B125R - outdoor</text>
  <rect x="26" y="196" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="46" y="196" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="66" y="196" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="86" y="196" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="106" y="196" width="16" height="7" rx="1" fill="#334155"/>
  <rect x="126" y="196" width="16" height="7" rx="1" fill="#334155"/>
  <text x="89" y="220" text-anchor="middle" fill="#64748b" font-size="8">All outlets GFCI - NEC 590.6</text>
  <rect x="162" y="256" width="56" height="22" rx="2" fill="#374151" stroke="#475569" stroke-width="1"/>
  <text x="190" y="271" text-anchor="middle" fill="#64748b" font-size="8">Concrete</text>
  <line x1="18" y1="210" x2="10" y2="210" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="10" y1="210" x2="10" y2="330" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="4" y="330" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="10" y="328" text-anchor="middle" fill="#22c55e" font-size="7">GND</text>
  <text x="10" y="368" text-anchor="middle" fill="#475569" font-size="7">NEC 590.7</text>
  <rect x="200" y="120" width="120" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="260" y="142" text-anchor="middle" fill="#64748b" font-size="9" font-weight="bold">SITE POWER</text>
  <text x="260" y="158" text-anchor="middle" fill="#475569" font-size="8">120V tools</text>
  <text x="260" y="174" text-anchor="middle" fill="#475569" font-size="8">240V compressor</text>
  <text x="260" y="190" text-anchor="middle" fill="#475569" font-size="8">Temp lighting</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="527" fill="#64748b" font-size="9">GFCI breaker / outlet</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="208" y="527" fill="#64748b" font-size="9">Meter base (AE)</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="545" fill="#64748b" font-size="9">125A load center</text>
  <line x1="190" y1="540" x2="202" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="208" y="545" fill="#64748b" font-size="9">Grounding system</text>
  <text x="14" y="566" fill="#475569" font-size="7">TEMP CONSTRUCTION POLE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────────
# JOB 9: pool-electrical
# ─────────────────────────────────────────────────────────────────────────────
$svg9 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">SWIMMING POOL ELECTRICAL - NEC 680</text>
  <rect x="70" y="36" width="200" height="52" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="74" text-anchor="middle" fill="#64748b" font-size="8">200A service - inside house</text>
  <line x1="170" y1="88" x2="170" y2="104" stroke="#facc15" stroke-width="1.5"/>
  <rect x="50" y="104" width="240" height="72" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="170" y="126" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="bold">POOL / SPA PANEL</text>
  <text x="170" y="142" text-anchor="middle" fill="#94a3b8" font-size="9">CH60SPAST - 60A - NEC 680</text>
  <rect x="64" y="150" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="84" y="150" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="104" y="150" width="16" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="64" y="168" fill="#64748b" font-size="7">PUMP</text>
  <text x="86" y="168" fill="#64748b" font-size="7">LIGHT</text>
  <text x="106" y="168" fill="#64748b" font-size="7">RCPT</text>
  <text x="170" y="170" text-anchor="middle" fill="#475569" font-size="7">All circuits GFCI - NEC 680.22</text>
  <line x1="170" y1="176" x2="170" y2="192" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="180" y="186" fill="#64748b" font-size="7">3/4 in. Sch 40 PVC underground</text>
  <rect x="10" y="196" width="110" height="72" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <text x="65" y="218" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">EQUIP PAD</text>
  <text x="65" y="234" text-anchor="middle" fill="#64748b" font-size="8">Pump / Filter / Heater</text>
  <text x="65" y="250" text-anchor="middle" fill="#475569" font-size="7">Bonded - NEC 680.26</text>
  <text x="65" y="262" text-anchor="middle" fill="#475569" font-size="7">8 AWG solid Cu bond</text>
  <rect x="220" y="196" width="110" height="58" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="275" y="218" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V TRANSFORMER</text>
  <text x="275" y="234" text-anchor="middle" fill="#94a3b8" font-size="8">Pentair 601100 300W</text>
  <text x="275" y="250" text-anchor="middle" fill="#475569" font-size="7">GFCI protected</text>
  <ellipse cx="170" cy="316" rx="120" ry="56" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
  <text x="170" y="312" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold">POOL</text>
  <text x="170" y="328" text-anchor="middle" fill="#0ea5e9" font-size="9">12V LED light - niche mount</text>
  <ellipse cx="170" cy="316" rx="144" ry="76" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="5,4"/>
  <text x="318" y="308" fill="#ef4444" font-size="7">20 ft</text>
  <text x="318" y="318" fill="#ef4444" font-size="7">GFCI</text>
  <text x="318" y="328" fill="#ef4444" font-size="7">zone</text>
  <line x1="65" y1="268" x2="65" y2="420" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="58" y="420" width="14" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="65" y="418" text-anchor="middle" fill="#22c55e" font-size="7">GND ROD</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="527" fill="#64748b" font-size="9">GFCI protected circuit</text>
  <line x1="140" y1="523" x2="152" y2="523" stroke="#22c55e" stroke-width="1.5"/>
  <text x="158" y="527" fill="#64748b" font-size="9">Equipotential bond</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="258" y="527" fill="#64748b" font-size="9">12V transformer</text>
  <line x1="22" y1="541" x2="34" y2="541" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="40" y="545" fill="#64748b" font-size="9">20 ft GFCI boundary</text>
  <rect x="140" y="536" width="12" height="8" rx="1" fill="#38bdf8" opacity="0.5"/>
  <text x="158" y="545" fill="#64748b" font-size="9">Pool / water</text>
  <text x="14" y="566" fill="#475569" font-size="7">SWIMMING POOL ELECTRICAL - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────────
# JOB 10: hot-tub-spa
# ─────────────────────────────────────────────────────────────────────────────
$svg10 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">HOT TUB / SPA DEDICATED CIRCUIT</text>
  <rect x="70" y="40" width="200" height="52" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="62" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <text x="170" y="78" text-anchor="middle" fill="#94a3b8" font-size="9">200A service</text>
  <rect x="80" y="78" width="50" height="16" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="105" y="90" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">50A GFCI</text>
  <text x="140" y="89" fill="#64748b" font-size="8">CHFP250GF</text>
  <line x1="170" y1="96" x2="170" y2="112" stroke="#3b82f6" stroke-width="2"/>
  <rect x="78" y="102" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="115" text-anchor="middle" fill="#64748b" font-size="9">6 AWG THHN - 1 in. Sch 40 PVC underground</text>
  <line x1="16" y1="120" x2="324" y2="120" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="10" y="118" fill="#475569" font-size="7">grade</text>
  <line x1="170" y1="122" x2="170" y2="140" stroke="#3b82f6" stroke-width="2"/>
  <text x="182" y="134" fill="#64748b" font-size="7">12 in. burial - open ground</text>
  <rect x="60" y="142" width="220" height="62" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="164" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">60A DISCONNECT</text>
  <text x="170" y="180" text-anchor="middle" fill="#94a3b8" font-size="9">DG222NGB - NEMA 3R - lockable</text>
  <text x="170" y="196" text-anchor="middle" fill="#64748b" font-size="8">5 to 50 ft from spa - NEC 680.12</text>
  <line x1="170" y1="204" x2="170" y2="222" stroke="#3b82f6" stroke-width="2"/>
  <text x="182" y="214" fill="#64748b" font-size="7">Short conduit run to spa</text>
  <rect x="40" y="222" width="260" height="104" rx="8" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2.5"/>
  <text x="170" y="256" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="bold">HOT TUB / SPA</text>
  <text x="170" y="274" text-anchor="middle" fill="#0ea5e9" font-size="9">240V - 50A - 4-wire circuit</text>
  <text x="170" y="290" text-anchor="middle" fill="#64748b" font-size="8">Pump / Heater / Controls</text>
  <text x="170" y="306" text-anchor="middle" fill="#94a3b8" font-size="8">Verify amperage on nameplate</text>
  <line x1="40" y1="264" x2="18" y2="264" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="300" y1="264" x2="322" y2="264" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="18" y1="264" x2="18" y2="358" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="322" y1="264" x2="322" y2="358" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="18" y1="358" x2="322" y2="358" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="374" text-anchor="middle" fill="#22c55e" font-size="9">8 AWG solid Cu bond grid - NEC 680.43</text>
  <text x="170" y="388" text-anchor="middle" fill="#475569" font-size="8">All metal parts within 5 ft of water</text>
  <line x1="16" y1="410" x2="324" y2="410" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="170" y="424" text-anchor="middle" fill="#ef4444" font-size="9">No overhead wiring 22.5 ft - NEC 680.10</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="527" fill="#64748b" font-size="9">GFCI 50A dedicated circuit</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="208" y="527" fill="#64748b" font-size="9">Lockable disconnect</text>
  <line x1="22" y1="541" x2="34" y2="541" stroke="#22c55e" stroke-width="1.5"/>
  <text x="40" y="545" fill="#64748b" font-size="9">Equipotential bond grid</text>
  <line x1="190" y1="541" x2="202" y2="541" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="208" y="545" fill="#64748b" font-size="9">22.5 ft overhead clearance</text>
  <text x="14" y="566" fill="#475569" font-size="7">HOT TUB / SPA CIRCUIT - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────────
# JOB 11: battery-storage
# ─────────────────────────────────────────────────────────────────────────────
$svg11 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">WHOLE-HOUSE BATTERY STORAGE</text>
  <text x="170" y="46" text-anchor="middle" fill="#64748b" font-size="9">UTILITY</text>
  <line x1="158" y1="50" x2="161" y2="66" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="170" y1="50" x2="170" y2="66" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="182" y1="50" x2="179" y2="66" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="50" y="70" width="240" height="66" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
  <text x="170" y="92" text-anchor="middle" fill="#a855f7" font-size="11" font-weight="bold">GATEWAY 3</text>
  <text x="170" y="108" text-anchor="middle" fill="#94a3b8" font-size="9">Tesla Gateway - system controller</text>
  <text x="170" y="124" text-anchor="middle" fill="#64748b" font-size="8">Grid / Solar / Battery - auto transfer</text>
  <line x1="50" y1="100" x2="30" y2="100" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="6" y="90" width="24" height="20" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>
  <text x="18" y="103" text-anchor="middle" fill="#fbbf24" font-size="7" font-weight="bold">SOL</text>
  <text x="6" y="118" fill="#475569" font-size="7">Solar (opt)</text>
  <line x1="170" y1="136" x2="170" y2="152" stroke="#facc15" stroke-width="2"/>
  <rect x="50" y="152" width="240" height="82" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="174" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">200A MAIN PANEL</text>
  <text x="170" y="190" text-anchor="middle" fill="#94a3b8" font-size="9">CHP42B200R</text>
  <rect x="66" y="198" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="84" y="198" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="102" y="198" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="120" y="198" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="138" y="198" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="156" y="198" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="174" y="198" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="192" y="198" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="210" y="198" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="228" y="198" width="14" height="7" rx="1" fill="#334155"/>
  <text x="170" y="222" text-anchor="middle" fill="#475569" font-size="8">All loads + critical subpanel feeder</text>
  <line x1="50" y1="196" x2="30" y2="196" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="30" y1="196" x2="30" y2="258" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="6" y="258" width="120" height="86" rx="4" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
  <text x="66" y="280" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">POWERWALL 3</text>
  <text x="66" y="296" text-anchor="middle" fill="#94a3b8" font-size="9">13.5 kWh / 11.5 kW</text>
  <text x="66" y="312" text-anchor="middle" fill="#64748b" font-size="8">Inverter built-in - UL 9540</text>
  <text x="66" y="328" text-anchor="middle" fill="#64748b" font-size="7">Indoor/Outdoor - no HVAC closets</text>
  <line x1="170" y1="234" x2="170" y2="250" stroke="#f97316" stroke-width="2"/>
  <rect x="50" y="250" width="240" height="82" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="272" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">CRITICAL LOADS</text>
  <text x="170" y="288" text-anchor="middle" fill="#94a3b8" font-size="9">100A subpanel - CHP24L125X2</text>
  <text x="170" y="304" text-anchor="middle" fill="#64748b" font-size="8">Backed-up circuits only</text>
  <rect x="68" y="308" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="86" y="308" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <rect x="104" y="308" width="14" height="7" rx="1" fill="#22c55e" opacity="0.85"/>
  <rect x="122" y="308" width="14" height="7" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="170" y="326" text-anchor="middle" fill="#475569" font-size="7">Fridge / HVAC / Lights / Outlets</text>
  <rect x="50" y="338" width="240" height="42" rx="3" fill="#1e293b" stroke="#a855f7" stroke-width="1"/>
  <text x="170" y="356" text-anchor="middle" fill="#a855f7" font-size="9" font-weight="bold">AE Interconnect Amendment Required</text>
  <text x="170" y="372" text-anchor="middle" fill="#64748b" font-size="8">Solar + storage - NEC 706 - UL 9540</text>
  <line x1="170" y1="380" x2="170" y2="436" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="156" y1="436" x2="184" y2="436" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="150" y="436" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="178" y="436" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="434" text-anchor="middle" fill="#22c55e" font-size="7">GND RODS</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#a855f7" opacity="0.9"/>
  <text x="40" y="527" fill="#64748b" font-size="9">Gateway controller</text>
  <rect x="140" y="518" width="12" height="8" rx="1" fill="#22c55e" opacity="0.85"/>
  <text x="158" y="527" fill="#64748b" font-size="9">Battery / Powerwall</text>
  <rect x="240" y="518" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="258" y="527" fill="#64748b" font-size="9">Main panel</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f97316" opacity="0.85"/>
  <text x="40" y="545" fill="#64748b" font-size="9">Critical loads subpanel</text>
  <rect x="140" y="536" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="158" y="545" fill="#64748b" font-size="9">Solar input (optional)</text>
  <text x="14" y="566" fill="#475569" font-size="7">WHOLE-HOUSE BATTERY STORAGE - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────────
# JOB 12: commercial-3phase-200a
# ─────────────────────────────────────────────────────────────────────────────
$svg12 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">200A 3-PHASE COMMERCIAL SERVICE</text>
  <text x="112" y="42" fill="#475569" font-size="8">A</text>
  <text x="132" y="42" fill="#475569" font-size="8">B</text>
  <text x="152" y="42" fill="#475569" font-size="8">C</text>
  <text x="172" y="42" fill="#475569" font-size="8">N</text>
  <text x="192" y="42" fill="#475569" font-size="8">G</text>
  <line x1="116" y1="46" x2="120" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="136" y1="46" x2="138" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="156" y1="46" x2="156" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="176" y1="46" x2="174" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="196" y1="46" x2="192" y2="64" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M148,64 Q156,52 164,64 Z" fill="#facc15"/>
  <rect x="153" y="64" width="6" height="20" rx="1" fill="#334155"/>
  <rect x="28" y="88" width="284" height="66" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="110" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">CT METER CABINET</text>
  <text x="170" y="126" text-anchor="middle" fill="#94a3b8" font-size="9">AE commercial CT metering - 200A class</text>
  <text x="170" y="141" text-anchor="middle" fill="#64748b" font-size="8">AE supplies meter - contractor provides cabinet</text>
  <line x1="170" y1="154" x2="170" y2="170" stroke="#facc15" stroke-width="2"/>
  <rect x="78" y="158" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="171" text-anchor="middle" fill="#64748b" font-size="9">350 kcmil AL XHHW-2 - 5 conductors (3P+N+G)</text>
  <line x1="170" y1="176" x2="170" y2="192" stroke="#facc15" stroke-width="2"/>
  <rect x="28" y="192" width="284" height="62" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
  <text x="170" y="214" text-anchor="middle" fill="#f97316" font-size="11" font-weight="bold">3-PHASE FUSIBLE DISCONNECT</text>
  <text x="170" y="230" text-anchor="middle" fill="#94a3b8" font-size="9">Eaton DH365FGK - 200A - 600V</text>
  <text x="170" y="245" text-anchor="middle" fill="#64748b" font-size="8">Service entrance main disconnect</text>
  <line x1="170" y1="254" x2="170" y2="270" stroke="#facc15" stroke-width="2"/>
  <rect x="28" y="270" width="284" height="100" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
  <text x="170" y="292" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN DISTRIBUTION PANEL</text>
  <text x="170" y="308" text-anchor="middle" fill="#94a3b8" font-size="9">Pow-R-Line EZB2072R + PRL3A3400X42A</text>
  <text x="170" y="324" text-anchor="middle" fill="#64748b" font-size="8">400A AL bus - 42 ckt - 120/208V 3ph 4W</text>
  <rect x="50" y="330" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="68" y="330" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="86" y="330" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="104" y="330" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>
  <rect x="122" y="330" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>
  <rect x="140" y="330" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="158" y="330" width="14" height="7" rx="1" fill="#334155"/>
  <rect x="176" y="330" width="14" height="7" rx="1" fill="#f59e0b" opacity="0.85"/>
  <text x="170" y="348" text-anchor="middle" fill="#475569" font-size="7">Arc Flash Label - NEC 110.16 - Engineer stamp req.</text>
  <text x="170" y="362" text-anchor="middle" fill="#64748b" font-size="7">Voltage class: 120/208V or 277/480V - verify with AE</text>
  <line x1="170" y1="370" x2="170" y2="426" stroke="#22c55e" stroke-width="1.5"/>
  <line x1="156" y1="426" x2="184" y2="426" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="150" y="426" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="178" y="426" width="12" height="26" rx="2" fill="#78350f" stroke="#22c55e" stroke-width="1.5"/>
  <text x="170" y="424" text-anchor="middle" fill="#22c55e" font-size="7">GND RODS</text>
  <line x1="170" y1="410" x2="200" y2="410" stroke="#22c55e" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="204" y="408" fill="#22c55e" font-size="7">UFER</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#f97316" opacity="0.9"/>
  <text x="40" y="527" fill="#64748b" font-size="9">3-phase fusible disconnect</text>
  <rect x="190" y="518" width="12" height="8" rx="1" fill="#334155" opacity="0.9"/>
  <text x="208" y="527" fill="#64748b" font-size="9">3-pole breaker (20/30A)</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#f59e0b" opacity="0.8"/>
  <text x="40" y="545" fill="#64748b" font-size="9">3-pole HVAC/equipment</text>
  <line x1="190" y1="540" x2="202" y2="540" stroke="#22c55e" stroke-width="1.5"/>
  <text x="208" y="545" fill="#64748b" font-size="9">Grounding system</text>
  <text x="14" y="566" fill="#475569" font-size="7">200A 3-PHASE COMMERCIAL - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────────
# JOB 13: landscape-lighting
# ─────────────────────────────────────────────────────────────────────────────
$svg13 = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" font-family="Arial, sans-serif">
  <rect width="340" height="580" fill="#0f172a" rx="6"/>
  <text x="170" y="26" text-anchor="middle" fill="#64748b" font-size="12">LANDSCAPE / OUTDOOR LIGHTING CIRCUIT</text>
  <rect x="70" y="36" width="200" height="52" rx="4" fill="#1e293b" stroke="#facc15" stroke-width="1.5"/>
  <text x="170" y="58" text-anchor="middle" fill="#facc15" font-size="11" font-weight="bold">MAIN PANEL</text>
  <rect x="80" y="72" width="48" height="16" rx="2" fill="#3b82f6" opacity="0.85"/>
  <text x="104" y="84" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">20A GFCI</text>
  <text x="136" y="83" fill="#64748b" font-size="8">CHFP120GF</text>
  <line x1="170" y1="90" x2="170" y2="106" stroke="#3b82f6" stroke-width="2"/>
  <rect x="78" y="96" width="184" height="18" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="170" y="109" text-anchor="middle" fill="#64748b" font-size="9">12 AWG THHN in 3/4 in. Sch 40 PVC</text>
  <line x1="16" y1="114" x2="324" y2="114" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="10" y="112" fill="#475569" font-size="7">grade</text>
  <line x1="170" y1="116" x2="170" y2="132" stroke="#3b82f6" stroke-width="2"/>
  <text x="182" y="126" fill="#64748b" font-size="7">6 in. burial min (in conduit)</text>
  <line x1="170" y1="134" x2="50" y2="134" stroke="#3b82f6" stroke-width="2"/>
  <line x1="170" y1="134" x2="280" y2="134" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5,3"/>
  <line x1="50" y1="134" x2="50" y2="170" stroke="#3b82f6" stroke-width="2"/>
  <rect x="10" y="170" width="100" height="56" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="60" y="192" text-anchor="middle" fill="#3b82f6" font-size="9" font-weight="bold">GFCI RCPT</text>
  <text x="60" y="208" text-anchor="middle" fill="#94a3b8" font-size="8">TWRGF20W</text>
  <text x="60" y="222" text-anchor="middle" fill="#64748b" font-size="7">WP cover MM420C</text>
  <line x1="280" y1="134" x2="280" y2="170" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="222" y="170" width="108" height="66" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="276" y="192" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">12V TRANSFORMER</text>
  <text x="276" y="208" text-anchor="middle" fill="#94a3b8" font-size="8">Kichler 15TP300BK</text>
  <text x="276" y="224" text-anchor="middle" fill="#64748b" font-size="8">300W photocell+timer</text>
  <text x="276" y="234" text-anchor="middle" fill="#475569" font-size="7">GFCI protected</text>
  <line x1="222" y1="200" x2="170" y2="200" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="194" y="196" text-anchor="middle" fill="#fbbf24" font-size="7">16/2 direct-burial 12V</text>
  <line x1="80" y1="200" x2="80" y2="240" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="80" cy="248" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="80" y="266" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>
  <line x1="114" y1="200" x2="114" y2="240" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="114" cy="248" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="114" y="266" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>
  <line x1="148" y1="200" x2="148" y2="240" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="148" cy="248" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="148" y="266" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>
  <line x1="182" y1="200" x2="182" y2="240" stroke="#fbbf24" stroke-width="1"/>
  <circle cx="182" cy="248" r="8" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="182" y="266" text-anchor="middle" fill="#64748b" font-size="7">PATH</text>
  <line x1="206" y1="200" x2="206" y2="240" stroke="#fbbf24" stroke-width="1"/>
  <rect x="198" y="240" width="16" height="10" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="206" y="262" text-anchor="middle" fill="#64748b" font-size="7">SPOT</text>
  <rect x="50" y="290" width="240" height="68" rx="3" fill="#1a2535" stroke="#334155" stroke-width="1"/>
  <text x="170" y="330" text-anchor="middle" fill="#334155" font-size="16" font-weight="bold">HOUSE</text>
  <text x="170" y="348" text-anchor="middle" fill="#334155" font-size="7">Panel inside - conduit enters here</text>
  <rect x="28" y="374" width="284" height="38" rx="4" fill="#1e293b" stroke="#1e293b" stroke-width="1"/>
  <text x="170" y="390" text-anchor="middle" fill="#64748b" font-size="8">Burial: 6 in. conduit / 12 in. open ground - NEC 300.5</text>
  <text x="170" y="404" text-anchor="middle" fill="#475569" font-size="8">All 120V outdoor receptacles GFCI - NEC 210.8</text>
  <rect x="10" y="494" width="320" height="78" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="22" y="511" fill="#94a3b8" font-size="10" font-weight="bold">LEGEND</text>
  <rect x="22" y="518" width="12" height="8" rx="1" fill="#3b82f6" opacity="0.85"/>
  <text x="40" y="527" fill="#64748b" font-size="9">120V GFCI circuit</text>
  <line x1="140" y1="523" x2="152" y2="523" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="158" y="527" fill="#64748b" font-size="9">12V landscape wire</text>
  <circle cx="247" cy="522" r="5" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="258" y="527" fill="#64748b" font-size="9">Path / spot light</text>
  <rect x="22" y="536" width="12" height="8" rx="1" fill="#fbbf24" opacity="0.85"/>
  <text x="40" y="545" fill="#64748b" font-size="9">12V transformer</text>
  <rect x="140" y="536" width="12" height="8" rx="1" fill="#facc15" opacity="0.9"/>
  <text x="158" y="545" fill="#64748b" font-size="9">Main panel</text>
  <text x="14" y="566" fill="#475569" font-size="7">LANDSCAPE / OUTDOOR LIGHTING - NOT TO SCALE</text>
</svg>
'@

# ─────────────────────────────────────────────────────────────────────────────
# APPLY ALL REPLACEMENTS
# ─────────────────────────────────────────────────────────────────────────────
$c = Set-SVG $c "solar-pv-20kw" $svg7
$c = Set-SVG $c "temp-power-pole" $svg8
$c = Set-SVG $c "pool-electrical" $svg9
$c = Set-SVG $c "hot-tub-spa" $svg10
$c = Set-SVG $c "battery-storage" $svg11
$c = Set-SVG $c "commercial-3phase-200a" $svg12
$c = Set-SVG $c "landscape-lighting" $svg13

[System.IO.File]::WriteAllText($file, $c, (New-Object System.Text.UTF8Encoding $true))
Write-Host "Done - SVGs 7-13 replaced"
