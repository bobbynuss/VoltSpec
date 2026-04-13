import type { Job, Supplier, OfficialDoc } from "../../core/types";

// ── Placeholder suppliers (will be replaced with Ferguson data) ──

const fergusonAustin: Supplier = {
  name: "Ferguson Plumbing Supply — Austin",
  address: "9715 Burnet Rd, Suite 100, Austin, TX 78758",
  phone: "(512) 835-6851",
  website: "https://www.ferguson.com",
  notes: "Contractor counter — bring your license for trade pricing",
};

const fergusonSanAntonio: Supplier = {
  name: "Ferguson Plumbing Supply — San Antonio",
  address: "222 Breesport St, San Antonio, TX 78216",
  phone: "(210) 340-6868",
  website: "https://www.ferguson.com",
  notes: "Contractor counter — bring your license for trade pricing",
};

const plumbingDocs: OfficialDoc[] = [
  {
    title: "International Plumbing Code (IPC) 2021",
    url: "https://codes.iccsafe.org/content/IPC2021P7",
    description: "Adopted plumbing code for Texas municipalities. Covers fixture units, pipe sizing, venting, and materials.",
  },
  {
    title: "City of Austin - Plumbing Permits",
    url: "https://www.austintexas.gov/department/plumbing",
    description: "Permit requirements, inspection scheduling, and licensed plumber requirements for Austin.",
  },
  {
    title: "Texas State Board of Plumbing Examiners",
    url: "https://www.tsbpe.texas.gov/",
    description: "Licensing requirements and verification for Texas plumbers.",
  },
];

const saDocs: OfficialDoc[] = [
  {
    title: "International Plumbing Code (IPC) 2021",
    url: "https://codes.iccsafe.org/content/IPC2021P7",
    description: "Adopted plumbing code for Texas municipalities.",
  },
  {
    title: "San Antonio - Development Services",
    url: "https://www.sanantonio.gov/DSD",
    description: "Plumbing permit applications, fees, and inspection scheduling.",
  },
  {
    title: "Texas State Board of Plumbing Examiners",
    url: "https://www.tsbpe.texas.gov/",
    description: "Licensing requirements and verification for Texas plumbers.",
  },
];

// ── Water Heater Diagram ─────────────────────────────────────────

const waterHeaterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 580" fill="none">
  <rect width="340" height="580" rx="8" fill="#0f172a"/>
  <text x="170" y="30" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="monospace">WATER HEATER REPLACEMENT</text>
  
  <!-- Cold water supply -->
  <line x1="80" y1="80" x2="80" y2="200" stroke="#3b82f6" stroke-width="3"/>
  <text x="60" y="75" fill="#3b82f6" font-size="10" font-family="monospace">COLD</text>
  <rect x="72" y="120" width="16" height="12" rx="2" fill="#1e40af" stroke="#3b82f6" stroke-width="1"/>
  <text x="80" y="150" text-anchor="middle" fill="#60a5fa" font-size="8" font-family="monospace">SHUTOFF</text>
  
  <!-- Hot water out -->
  <line x1="260" y1="80" x2="260" y2="200" stroke="#ef4444" stroke-width="3"/>
  <text x="240" y="75" fill="#ef4444" font-size="10" font-family="monospace">HOT</text>
  
  <!-- Water heater tank -->
  <rect x="100" y="200" width="140" height="220" rx="12" fill="#1e293b" stroke="#475569" stroke-width="2"/>
  <text x="170" y="300" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="bold" font-family="monospace">50 GAL</text>
  <text x="170" y="320" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">GAS WATER HTR</text>
  
  <!-- T&P valve -->
  <line x1="240" y1="260" x2="280" y2="260" stroke="#f59e0b" stroke-width="2"/>
  <line x1="280" y1="260" x2="280" y2="440" stroke="#f59e0b" stroke-width="2"/>
  <text x="290" y="350" fill="#f59e0b" font-size="8" font-family="monospace" transform="rotate(90,290,350)">T&amp;P DISCHARGE</text>
  
  <!-- Gas line -->
  <line x1="40" y1="380" x2="100" y2="380" stroke="#eab308" stroke-width="3" stroke-dasharray="8,4"/>
  <text x="40" y="370" fill="#eab308" font-size="10" font-family="monospace">GAS</text>
  <rect x="70" y="374" width="16" height="12" rx="2" fill="#854d0e" stroke="#eab308" stroke-width="1"/>
  <text x="50" y="400" fill="#fbbf24" font-size="7" font-family="monospace">SHUTOFF</text>
  
  <!-- Drip leg -->
  <line x1="85" y1="386" x2="85" y2="430" stroke="#eab308" stroke-width="2" stroke-dasharray="6,3"/>
  <rect x="78" y="430" width="14" height="20" rx="2" fill="#854d0e" stroke="#eab308" stroke-width="1"/>
  <text x="85" y="465" text-anchor="middle" fill="#fbbf24" font-size="7" font-family="monospace">DRIP LEG</text>
  
  <!-- Expansion tank -->
  <ellipse cx="60" y="200" rx="20" ry="30" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="60" y="205" text-anchor="middle" fill="#60a5fa" font-size="7" font-family="monospace">EXP</text>
  <text x="60" y="215" text-anchor="middle" fill="#60a5fa" font-size="7" font-family="monospace">TANK</text>
  <line x1="60" y1="170" x2="60" y2="180" stroke="#3b82f6" stroke-width="2"/>
  <line x1="60" y1="180" x2="80" y2="180" stroke="#3b82f6" stroke-width="2"/>
  
  <!-- Flue/vent -->
  <rect x="155" y="160" width="30" height="40" rx="2" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="170" y1="160" x2="170" y2="100" stroke="#94a3b8" stroke-width="2"/>
  <text x="170" y="95" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="monospace">FLUE</text>
  
  <!-- Pan -->
  <rect x="90" y="420" width="160" height="10" rx="3" fill="#334155" stroke="#475569" stroke-width="1"/>
  <text x="170" y="448" text-anchor="middle" fill="#64748b" font-size="8" font-family="monospace">DRAIN PAN</text>
  
  <!-- Connections -->
  <line x1="80" y1="200" x2="120" y2="200" stroke="#3b82f6" stroke-width="2"/>
  <line x1="220" y1="200" x2="260" y2="200" stroke="#ef4444" stroke-width="2"/>
  
  <!-- Labels -->
  <text x="170" y="500" text-anchor="middle" fill="#475569" font-size="9" font-family="monospace">IPC 2021 · RESIDENTIAL</text>
  <text x="170" y="520" text-anchor="middle" fill="#475569" font-size="9" font-family="monospace">NOT TO SCALE</text>
  
  <!-- Legend -->
  <line x1="40" y1="545" x2="60" y2="545" stroke="#3b82f6" stroke-width="2"/>
  <text x="65" y="548" fill="#64748b" font-size="8" font-family="monospace">COLD WATER</text>
  <line x1="150" y1="545" x2="170" y2="545" stroke="#ef4444" stroke-width="2"/>
  <text x="175" y="548" fill="#64748b" font-size="8" font-family="monospace">HOT WATER</text>
  <line x1="250" y1="545" x2="270" y2="545" stroke="#eab308" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="275" y="548" fill="#64748b" font-size="8" font-family="monospace">GAS</text>
</svg>`;

// ── Job Builders ─────────────────────────────────────────────────

function waterHeaterReplacement(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "water-heater-50gal-gas",
    label: "50-Gallon Gas Water Heater Replacement",
    requirements: [
      "Licensed plumber required for all water heater installations per Texas Administrative Code Title 22",
      "Permit required — contact local building department before work begins",
      "Gas water heater must be installed per IPC Chapter 5 and IFGC Chapter 6",
      "T&P relief valve required — discharge pipe must terminate within 6 inches of floor or to exterior drain",
      "Expansion tank required on closed-loop systems (check valve or PRV on main)",
      "Gas shutoff valve required within 6 feet of appliance — accessible without removing panels",
      "Drip leg (sediment trap) required on gas supply to water heater per IFGC 408.4",
      "Water heater must be strapped or secured in seismic zones (check local amendments)",
      "Drain pan required when installed in locations where leakage could cause damage",
      "Flue/vent must maintain proper clearance to combustibles per manufacturer specs",
      "Minimum 18-inch elevation for gas water heater in garage installations (FVIR compliant units exempt in some jurisdictions)",
      "Cold water shut-off valve required on supply to water heater",
      "Dielectric unions required at water heater connections to prevent galvanic corrosion",
    ],
    materials: [
      { item: "Gas Water Heater 50-gal", quantity: "1", spec: "50-gallon natural gas, 40,000 BTU, 0.62 UEF minimum, FVIR compliant" },
      { item: "T&P Relief Valve", quantity: "1", spec: '3/4" T&P valve, 150 PSI / 210°F rated, ASME/ANSI certified' },
      { item: "T&P Discharge Pipe", quantity: "1", spec: '3/4" CPVC or copper, to within 6" of floor/exterior' },
      { item: "Expansion Tank", quantity: "1", spec: "2-gallon thermal expansion tank, pre-charged to match system pressure" },
      { item: "Gas Flex Connector", quantity: "1", spec: '3/4" stainless steel gas flex connector, 24" length, CSA certified' },
      { item: "Gas Shutoff Valve", quantity: "1", spec: '3/4" brass ball valve, gas-rated, 1/4-turn' },
      { item: "Drip Leg Assembly", quantity: "1", spec: '3/4" x 3" black iron nipple + cap for sediment trap' },
      { item: "Cold Water Shutoff Valve", quantity: "1", spec: '3/4" brass ball valve, full port' },
      { item: "Dielectric Union", quantity: "2", spec: '3/4" FIP dielectric union, brass-to-copper isolation' },
      { item: "Water Supply Lines", quantity: "2", spec: '3/4" copper flex connectors, 18" braided stainless' },
      { item: "Drain Pan", quantity: "1", spec: '26" aluminum drain pan with 1" PVC drain fitting' },
      { item: "Vent Connector", quantity: "1", spec: '4" galvanized single-wall vent pipe, 2 elbows' },
      { item: "Pipe Thread Sealant", quantity: "1", spec: "Yellow gas-rated Teflon tape + pipe dope" },
      { item: "Copper Stub-outs", quantity: "2", spec: '3/4" Type M copper, 12" stub-out with SharkBite fittings' },
    ],
    blueprintNotes: [
      "Verify gas supply line size — 3/4\" minimum for 50-gallon unit at 40,000 BTU",
      "Check existing flue diameter — 4\" standard for 50-gal, must not reduce",
      "Measure drain pan clearance — 2\" minimum around tank perimeter",
      "Confirm expansion tank orientation — must be vertical, supported independently",
      "Test gas pressure — 7\" WC (water column) at appliance after installation",
      "Verify T&P discharge terminates properly — no traps, no reductions, gravity drain",
    ],
    svgDiagram: waterHeaterSvg,
    suppliers,
    officialDocs: docs,
  };
}

function wholeHouseRepipe(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "whole-house-repipe-pex",
    label: "Whole-House PEX Repipe (2,000 sq ft / 2-Bath)",
    requirements: [
      "Licensed plumber required — full repipe requires permit and inspections",
      "PEX tubing must comply with ASTM F876/F877 and be listed for potable water",
      "Manifold system recommended for PEX — home-run layout reduces fittings and allows individual shutoffs",
      "Support PEX per IPC Table 308.5 — 32\" horizontal, 10' vertical for 1/2\" and 3/4\"",
      "Protect PEX from UV exposure — no exterior runs without UV-rated sleeve",
      "PEX not permitted within 18\" of water heater connections — transition to copper or CPVC",
      "Minimum 3/4\" main supply, 1/2\" branch lines to individual fixtures",
      "Stub-outs must be properly secured with copper stub-out elbows or drop-ear elbows",
      "Pressure test required before closing walls — 40 PSI for 15 minutes minimum",
      "All penetrations through fire-rated assemblies must be fire-stopped per IPC 305.4",
    ],
    materials: [
      { item: 'PEX Tubing 3/4" Red', quantity: "200 ft", spec: '3/4" PEX-A tubing, red (hot), ASTM F876, Uponor or equivalent' },
      { item: 'PEX Tubing 3/4" Blue', quantity: "200 ft", spec: '3/4" PEX-A tubing, blue (cold), ASTM F876, Uponor or equivalent' },
      { item: 'PEX Tubing 1/2" Red', quantity: "300 ft", spec: '1/2" PEX-A tubing, red (hot), branch runs to fixtures' },
      { item: 'PEX Tubing 1/2" Blue', quantity: "300 ft", spec: '1/2" PEX-A tubing, blue (cold), branch runs to fixtures' },
      { item: "PEX Manifold", quantity: "2", spec: "8-port brass manifold with shutoff valves, 1 hot + 1 cold" },
      { item: "PEX Crimp Rings 1/2\"", quantity: "100", spec: '1/2" copper crimp rings' },
      { item: "PEX Crimp Rings 3/4\"", quantity: "50", spec: '3/4" copper crimp rings' },
      { item: "Drop-Ear Elbows 1/2\"", quantity: "16", spec: '1/2" PEX x 1/2" FIP brass drop-ear 90° elbow, for stub-outs' },
      { item: 'PEX 90° Elbow 3/4"', quantity: "20", spec: '3/4" PEX brass 90° elbow, crimp style' },
      { item: 'PEX Tee 3/4"', quantity: "10", spec: '3/4" PEX brass tee, crimp style' },
      { item: "PEX Transition Fitting", quantity: "4", spec: '3/4" PEX to 3/4" copper sweat adapter' },
      { item: "Pipe Straps", quantity: "100", spec: '1/2" and 3/4" plastic pipe straps with nails, for wood framing' },
      { item: "Nail Plates", quantity: "40", spec: "16-gauge steel nail plates for stud protection" },
      { item: "Copper Stub-outs", quantity: "16", spec: '1/2" x 8" copper stub-out with escutcheon' },
      { item: "Supply Stop Valves", quantity: "16", spec: '1/2" FIP x 3/8" compression angle stop, quarter-turn' },
    ],
    blueprintNotes: [
      "Locate manifold centrally — minimize long runs to distant fixtures",
      "Color-code all PEX — red for hot, blue for cold, no exceptions",
      "Maintain 6\" separation between hot and cold parallel runs",
      "Pressure test before drywall — document with photo + gauge reading",
      "Label each manifold port with fixture name",
      "Transition to copper within 18\" of water heater",
    ],
    suppliers,
    officialDocs: docs,
  };
}

function bathroomRoughIn(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "bathroom-rough-in",
    label: "New Bathroom Rough-In (Toilet, Vanity, Tub/Shower)",
    requirements: [
      "Permit required for new plumbing rough-in — schedule inspection before closing walls",
      "Toilet rough-in: 12\" from finished wall to center of closet flange (standard)",
      "Toilet drain: 3\" minimum PVC DWV, 4\" if also serving as building drain",
      "Lavatory drain: 1-1/2\" minimum PVC DWV",
      "Tub/shower drain: 2\" minimum PVC DWV with accessible P-trap",
      "All DWV must slope minimum 1/4\" per foot toward drain",
      "Vent required for each fixture — AAV (Air Admittance Valve) permitted per local amendments",
      "2\" vent through roof or AAV within 6 fixture-unit equivalents",
      "Anti-scald valve required on tub/shower — ASSE 1016 thermostatic or pressure-balance",
      "Waterproof shower pan liner required — test hold 2\" of water for 24 hours before tiling",
    ],
    materials: [
      { item: "Closet Flange", quantity: "1", spec: '4" x 3" PVC closet flange with stainless steel ring, for toilet' },
      { item: 'PVC DWV Pipe 3"', quantity: "20 ft", spec: '3" Schedule 40 PVC DWV pipe, for toilet drain' },
      { item: 'PVC DWV Pipe 2"', quantity: "15 ft", spec: '2" Schedule 40 PVC DWV pipe, for tub/shower drain' },
      { item: 'PVC DWV Pipe 1-1/2"', quantity: "10 ft", spec: '1-1/2" Schedule 40 PVC DWV pipe, for lavatory drain' },
      { item: 'PVC Vent Pipe 2"', quantity: "15 ft", spec: '2" Schedule 40 PVC, vent stack to roof or AAV' },
      { item: "PVC Sanitary Tee 3\"", quantity: "2", spec: '3" PVC DWV sanitary tee' },
      { item: "PVC Wye 3\"", quantity: "1", spec: '3" PVC DWV wye with 45° street elbow' },
      { item: 'PVC P-Trap 2"', quantity: "1", spec: '2" PVC tubular P-trap with union joint, for tub' },
      { item: 'PVC P-Trap 1-1/2"', quantity: "1", spec: '1-1/2" PVC tubular P-trap, for lavatory' },
      { item: "Air Admittance Valve", quantity: "2", spec: "Studor AAV, 1-1/2\" or 2\", ASSE 1051 listed" },
      { item: "Pressure-Balance Valve", quantity: "1", spec: "Moen or Delta pressure-balance shower valve, ASSE 1016" },
      { item: "Tub/Shower Drain", quantity: "1", spec: '2" brass tub drain with overflow, grid strainer' },
      { item: 'PEX Supply 1/2" Red', quantity: "30 ft", spec: '1/2" PEX-A red (hot) to shower valve + vanity' },
      { item: 'PEX Supply 1/2" Blue', quantity: "30 ft", spec: '1/2" PEX-A blue (cold) to toilet + shower + vanity' },
      { item: "Toilet Supply Stop", quantity: "1", spec: '1/2" FIP x 3/8" comp angle stop, 1/4-turn, chrome' },
      { item: "Lavatory Supply Stops", quantity: "2", spec: '1/2" FIP x 3/8" comp angle stop (H+C), chrome' },
      { item: "PVC Cement + Primer", quantity: "1", spec: "Purple primer + medium clear PVC cement, Oatey or equivalent" },
      { item: "DWV Hangers", quantity: "12", spec: "Galvanized pipe straps for 1-1/2\", 2\", and 3\" DWV" },
    ],
    blueprintNotes: [
      "Verify toilet rough-in dimension — 12\" is standard, measure from framing + drywall thickness",
      "Slope all horizontal DWV 1/4\" per foot minimum",
      "Shower valve height: 48\" AFF (above finished floor) typical",
      "Tub spout height: 4\" above tub rim",
      "AAVs must be accessible — install in wall cavity with access panel",
      "Pressure test supply lines before closing walls — 40 PSI / 15 min",
    ],
    suppliers,
    officialDocs: docs,
  };
}

function gasLineExtension(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "gas-line-extension",
    label: "Gas Line Extension (New Appliance, ~30 ft Run)",
    requirements: [
      "Licensed plumber with gas endorsement required per TSBPE",
      "Permit required for all gas piping work — no exceptions",
      "Gas piping must comply with IFGC (International Fuel Gas Code) Chapter 4",
      "Pressure test required: 3 PSI (60 PSI for some jurisdictions) for 10 minutes, no drop",
      "Use only approved materials: black iron, CSST (with bonding), or approved copper",
      "CSST must be bonded to grounding electrode system per IFGC 310.1.1",
      "Drip leg (sediment trap) required at each appliance connection",
      "Gas shutoff valve required at each appliance — within 6 feet, accessible",
      "Pipe sizing per IFGC Table 402.4 — based on BTU load and total pipe length",
      "All joints must be tested with leak detection solution after pressure test",
      "No gas pipe in concealed locations without proper protection (nail plates)",
    ],
    materials: [
      { item: "Black Iron Pipe 3/4\"", quantity: "30 ft", spec: '3/4" Schedule 40 black iron pipe, threaded both ends' },
      { item: 'Black Iron 90° Elbow 3/4"', quantity: "4", spec: '3/4" malleable iron 90° elbow, threaded' },
      { item: 'Black Iron Tee 3/4"', quantity: "2", spec: '3/4" malleable iron tee, threaded' },
      { item: "Gas Ball Valve 3/4\"", quantity: "1", spec: '3/4" brass ball valve, AGA certified, 1/4-turn, for appliance shutoff' },
      { item: "Gas Flex Connector", quantity: "1", spec: '3/4" stainless steel gas flex connector, 36" length, CSA certified' },
      { item: "Drip Leg Assembly", quantity: "1", spec: '3/4" x 4" black iron nipple + cap — sediment trap at appliance' },
      { item: "Pipe Thread Sealant", quantity: "1", spec: "Yellow gas-rated Teflon tape (high density) + Rector-Seal pipe dope" },
      { item: "Pipe Support Straps", quantity: "8", spec: '3/4" galvanized pipe straps, every 4 feet per code' },
      { item: "Nail Plates", quantity: "10", spec: "16-gauge steel nail plates where pipe passes through framing" },
      { item: 'Black Iron Nipple 3/4"', quantity: "6", spec: '3/4" x 6" black iron nipples, threaded' },
      { item: "Gas Pressure Gauge", quantity: "1", spec: "0-15 PSI test gauge with 1/4\" NPT, for pressure test documentation" },
    ],
    blueprintNotes: [
      "Size pipe for total BTU demand — 3/4\" good for up to 150,000 BTU at 30 ft (natural gas, 0.5 PSI drop)",
      "Confirm gas meter capacity supports additional appliance load",
      "CSST alternative: faster install but requires bonding to ground electrode",
      "All threaded joints: apply Teflon tape + pipe dope, wrench-tight",
      "Pressure test at 3 PSI for 10 minutes — document with photo of gauge",
      "Leak-test all joints with soap solution after pressure test passes",
    ],
    suppliers,
    officialDocs: docs,
  };
}

function sewerCleanoutInstall(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "sewer-cleanout-install",
    label: "Exterior Sewer Cleanout Installation",
    requirements: [
      "Licensed plumber required — sewer work requires permit and inspection",
      "Cleanout required within 5 feet of building per IPC 708.3.4",
      "Additional cleanouts required every 100 feet and at each change of direction >45°",
      "Cleanout must be same size as pipe being served (4\" minimum for building sewer)",
      "Cleanout must extend to finished grade or be accessible above grade with cover",
      "Call 811 before digging — locate all underground utilities (mandatory, free service)",
      "Maintain minimum 1/4\" per foot slope on sewer line toward main",
      "Backfill with approved material — no large rocks or debris against pipe",
      "PVC sewer pipe must be SDR 35 or Schedule 40 for underground burial",
      "Solvent weld all joints — primer + cement per manufacturer requirements",
    ],
    materials: [
      { item: 'PVC Sewer Pipe 4"', quantity: "10 ft", spec: '4" SDR 35 PVC sewer pipe, for underground lateral' },
      { item: "PVC Cleanout Body 4\"", quantity: "1", spec: '4" PVC DWV cleanout adapter with threaded plug' },
      { item: "PVC Cleanout Cover", quantity: "1", spec: '4" brass or plastic cleanout cover, flush-to-grade' },
      { item: "Cleanout Access Box", quantity: "1", spec: "6\" round valve box with green lid, set to grade" },
      { item: 'PVC Wye 4"', quantity: "1", spec: '4" PVC DWV wye, for cleanout tee connection' },
      { item: 'PVC 45° Elbow 4"', quantity: "1", spec: '4" PVC DWV 1/8 bend (45° elbow)' },
      { item: "Fernco Coupling 4\"", quantity: "2", spec: '4" flexible rubber coupling with stainless steel clamps, for tie-in' },
      { item: "PVC Cement + Primer", quantity: "1", spec: "Purple primer + heavy-duty PVC cement for sewer pipe, Oatey" },
      { item: "Gravel Bedding", quantity: "0.5 yd", spec: '3/4" clean gravel for pipe bedding, 4" below + 4" above pipe' },
      { item: "Caution Tape", quantity: "1 roll", spec: "Green 'SEWER' warning tape, installed 12\" above pipe" },
    ],
    blueprintNotes: [
      "Call 811 at least 48 hours before digging — utility locates are free and mandatory",
      "Trench width: pipe diameter + 12\" minimum for working room",
      "Bed pipe on 4\" of gravel — no rocks directly on pipe",
      "Maintain slope: 1/4\" per foot minimum, verify with level",
      "Cleanout top must be at or above finished grade — mark location permanently",
      "Take photos before backfill for inspection documentation",
    ],
    suppliers,
    officialDocs: docs,
  };
}

// ── Tankless Water Heater ─────────────────────────────────────────

function tanklessWaterHeater(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "tankless-water-heater",
    label: "Tankless Water Heater Installation (Outdoor, Gas)",
    requirements: [
      "Licensed plumber required for all water heater installations per Texas Administrative Code Title 22",
      "Permit required — contact local building department before work begins",
      "Gas line upgrade typically required — tankless units draw 150,000-199,000 BTU (verify gas meter capacity)",
      "Minimum 3/4\" gas supply to unit — may need 1\" depending on BTU and run length per IFGC Table 402.4",
      "Condensate drain required for condensing units — route to exterior drain or indirect waste",
      "Dedicated 120V outlet required within 3 ft of unit for electronic ignition",
      "Anti-scald mixing valve recommended at distribution point if unit set above 120°F",
      "Expansion tank still required on closed-loop systems even with tankless",
      "Recirculation pump recommended for long piping runs — reduces wait time at fixtures",
      "Outdoor units: follow manufacturer clearances to windows, doors, and property lines",
    ],
    materials: [
      { item: "Tankless Water Heater", quantity: "1", spec: "Rinnai RU199eN or Navien NPE-240A — outdoor natural gas, 199,000 BTU, 0.96 UEF, condensing" },
      { item: "Tankless Mounting Bracket", quantity: "1", spec: "Manufacturer wall-mount bracket kit, stainless steel, for exterior installation" },
      { item: "Gas Line 1\" Black Iron", quantity: "20 ft", spec: '1" Schedule 40 black iron pipe, upgrade from 3/4" to support 199K BTU demand' },
      { item: "Gas Ball Valve 1\"", quantity: "1", spec: '1" brass ball valve, gas-rated, 1/4-turn, at unit' },
      { item: "Gas Flex Connector 3/4\"", quantity: "1", spec: '3/4" stainless steel gas flex, 24", CSA certified — unit connection' },
      { item: "Drip Leg Assembly", quantity: "1", spec: '3/4" x 4" black iron nipple + cap, sediment trap' },
      { item: "Cold Water Isolation Valve", quantity: "1", spec: '3/4" brass ball valve, full port, cold inlet' },
      { item: "Hot Water Isolation Valve", quantity: "1", spec: '3/4" brass ball valve, full port, hot outlet' },
      { item: "Service Valves Kit", quantity: "1", spec: "Isolation valve kit with pressure relief and drain ports for flushing" },
      { item: "Condensate Neutralizer", quantity: "1", spec: "Condensate neutralizer kit with media, for condensing units — protects drains from acidic condensate" },
      { item: "Condensate Drain Line", quantity: "10 ft", spec: '1/2" PVC or CPVC condensate drain to exterior' },
      { item: "Expansion Tank", quantity: "1", spec: "2-gallon thermal expansion tank, pre-charged" },
      { item: "Recirculation Pump", quantity: "1", spec: "Grundfos UP15-10SU7P TLC — dedicated return line recirc pump with timer and aquastat" },
      { item: 'Copper Pipe 3/4"', quantity: "20 ft", spec: '3/4" Type M copper, transition from PEX to unit connections' },
      { item: "Dielectric Unions", quantity: "2", spec: '3/4" FIP dielectric union, at unit connections' },
      { item: "Pipe Thread Sealant", quantity: "1", spec: "Yellow gas-rated Teflon tape + pipe dope" },
    ],
    blueprintNotes: [
      "Verify gas meter capacity — tankless needs 199K BTU, most residential meters max 250K BTU total",
      "Size gas line per total run length: 1\" for up to 60 ft at 199K BTU, 1-1/4\" for longer runs",
      "Outdoor unit: minimum 12\" clearance from windows/doors, 36\" from forced air intake",
      "Plan condensate drain — condensing units produce acidic condensate, needs neutralizer or proper routing",
      "Recirc pump: install on hot return line, timer set for peak usage hours to save energy",
      "Flush kit: install service valves for annual vinegar flush — critical maintenance for longevity",
    ],
    svgDiagram: "",
    suppliers,
    officialDocs: docs,
  };
}

// ── Kitchen Sink / Disposal ──────────────────────────────────────

function kitchenPlumbing(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "kitchen-sink-disposal",
    label: "Kitchen Sink & Garbage Disposal Rough-In",
    requirements: [
      "Licensed plumber required for new rough-in — permit and inspection needed",
      "Kitchen sink drain: 1-1/2\" minimum PVC DWV per IPC Table 709.1",
      "Garbage disposal: dedicated 1-1/2\" drain connection, continuous waste to P-trap",
      "Dishwasher drain: connect to disposal or tailpiece with high loop per IPC 802.1.6",
      "Air gap or high loop required for dishwasher drain — check local amendments",
      "Vent required: 1-1/2\" minimum, within 5 ft of trap per IPC Table 906.1",
      "AAV (Air Admittance Valve) permitted in most jurisdictions — verify local code",
      "Hot and cold supply: 1/2\" minimum PEX or copper to sink location",
      "Supply stops required at sink — angle stops with 3/8\" compression for faucet supply",
    ],
    materials: [
      { item: "Kitchen P-Trap 1-1/2\"", quantity: "1", spec: '1-1/2" PVC tubular P-trap with union, slip joint' },
      { item: "Continuous Waste Tee", quantity: "1", spec: '1-1/2" PVC continuous waste kit for double-bowl sink with disposal' },
      { item: 'PVC DWV Pipe 1-1/2"', quantity: "10 ft", spec: '1-1/2" Schedule 40 PVC DWV, drain to main stack' },
      { item: 'PVC Vent Pipe 1-1/2"', quantity: "8 ft", spec: '1-1/2" Schedule 40 PVC, vent to main stack or AAV' },
      { item: "Air Admittance Valve", quantity: "1", spec: "Studor AAV, 1-1/2\", ASSE 1051 listed — for island or remote sink vent" },
      { item: "Dishwasher Drain Connector", quantity: "1", spec: '5/8" hose barb to disposal or tailpiece with high loop support' },
      { item: 'PEX Supply 1/2" Red', quantity: "15 ft", spec: '1/2" PEX-A red (hot), to kitchen sink' },
      { item: 'PEX Supply 1/2" Blue', quantity: "15 ft", spec: '1/2" PEX-A blue (cold), to kitchen sink' },
      { item: "Angle Stop Valves", quantity: "2", spec: '1/2" FIP x 3/8" compression angle stop, 1/4-turn, chrome (H+C)' },
      { item: "Faucet Supply Lines", quantity: "2", spec: '3/8" comp x 3/8" comp braided stainless steel, 20"' },
      { item: "Garbage Disposal", quantity: "1", spec: "InSinkErator Badger 5 — 1/2 HP continuous feed, or per owner selection" },
      { item: "Disposal Mounting Kit", quantity: "1", spec: "3-bolt mounting assembly with flange and snap ring (included with most disposals)" },
      { item: "PVC Cement + Primer", quantity: "1", spec: "Purple primer + medium clear PVC cement" },
      { item: "Pipe Straps", quantity: "6", spec: '1-1/2" plastic pipe straps for DWV support' },
    ],
    blueprintNotes: [
      "Drain rough-in: centerline 15-18\" from floor, 4\" from wall (verify sink specs)",
      "Supply stub-outs: hot on left, cold on right, 20-22\" AFF typical",
      "Dishwasher drain: high loop to underside of countertop before connecting to disposal or tailpiece",
      "Island sink: AAV required if no conventional vent path available",
      "Disposal: hardwired or cord-and-plug — verify local code requirement",
      "Slope all horizontal DWV 1/4\" per foot minimum",
    ],
    svgDiagram: "",
    suppliers,
    officialDocs: docs,
  };
}

// ── Water Softener ───────────────────────────────────────────────

function waterSoftener(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "water-softener-install",
    label: "Water Softener Installation",
    requirements: [
      "Licensed plumber recommended — check local requirements for water treatment equipment",
      "Install on main water supply AFTER meter and pressure regulator, BEFORE water heater",
      "Bypass valve required — allows water flow during maintenance or regeneration",
      "Drain connection required for regeneration backwash — indirect waste to floor drain or laundry standpipe",
      "Overflow drain recommended — route to same drain as regeneration",
      "120V GFCI-protected outlet required within 6 ft of unit — coordinate with electrician",
      "Hard water loop: some homes pre-plumbed with softener loop in garage — check before cutting pipe",
      "Outdoor installations must be freeze-protected — insulate or install in heated enclosure",
      "Verify water pressure: 20-125 PSI operating range typical, PRV may need adjustment",
    ],
    materials: [
      { item: "Water Softener", quantity: "1", spec: "48,000-grain capacity water softener with digital valve head, suitable for 1-4 bathroom homes — Fleck 5600SXT or equivalent" },
      { item: "Bypass Valve", quantity: "1", spec: "3/4\" or 1\" bypass valve kit, matches softener inlet/outlet" },
      { item: '3/4" PEX Tubing Blue', quantity: "10 ft", spec: '3/4" PEX-A blue, inlet supply from main' },
      { item: '3/4" PEX Tubing Red', quantity: "10 ft", spec: '3/4" PEX-A red, outlet to distribution' },
      { item: "SharkBite Fittings 3/4\"", quantity: "4", spec: '3/4" SharkBite push-to-connect couplings for cut-in to main line' },
      { item: "Drain Line 1/2\"", quantity: "20 ft", spec: '1/2" poly tubing for regeneration drain, route to floor drain or standpipe' },
      { item: "Drain Line Clamp", quantity: "1", spec: '1/2" drain line air gap fitting for indirect waste connection' },
      { item: "Overflow Fitting", quantity: "1", spec: '1" overflow drain fitting, connects to same drain as regeneration' },
      { item: 'Ball Valve 3/4"', quantity: "2", spec: '3/4" brass ball valve, full port, inlet and outlet isolation' },
      { item: "Water Hardness Test Kit", quantity: "1", spec: "Test strip kit for pre/post installation hardness verification" },
      { item: "Pipe Insulation", quantity: "10 ft", spec: '3/4" foam pipe insulation for supply lines in unconditioned spaces' },
      { item: "Softener Salt", quantity: "1 bag", spec: "40 lb bag solar salt or pellet salt for initial fill" },
    ],
    blueprintNotes: [
      "Install AFTER meter and PRV, BEFORE water heater and distribution",
      "Bypass valve: required for service — allows water flow during maintenance",
      "Drain: must be indirect waste (air gap) — cannot connect directly to sewer",
      "Level surface required — softener must be plumb for proper operation",
      "Leave 3 ft access clearance for salt loading and maintenance",
      "Program regeneration for 2 AM — low water usage period",
      "Test water hardness before and after installation — document for customer",
    ],
    svgDiagram: "",
    suppliers,
    officialDocs: docs,
  };
}

// ── Slab Leak Repair ─────────────────────────────────────────────

function slabLeakRepair(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "slab-leak-repair",
    label: "Slab Leak Repair – Reroute Through Attic (PEX)",
    requirements: [
      "Licensed plumber required — slab leak repair requires permit",
      "Leak detection and location must be performed before repair — electronic or infrared methods",
      "Reroute is preferred over spot repair in most cases — avoids future slab failures",
      "Abandon existing under-slab piping — cap both ends, fill with foam if accessible",
      "PEX reroute through attic must be insulated to prevent condensation and freezing",
      "All PEX in attic must be UV-protected — no exposure to sunlight through vents or skylights",
      "Support PEX per IPC Table 308.5 — 32\" horizontal for 1/2\" and 3/4\"",
      "Pressure test new lines: 40 PSI for 15 minutes before patching walls/ceilings",
      "Drywall repairs not included in plumbing scope — coordinate with general contractor",
      "Water damage assessment may require separate remediation contractor",
    ],
    materials: [
      { item: '3/4" PEX-A Red (Hot Reroute)', quantity: "150 ft", spec: '3/4" PEX-A tubing, red, main hot supply reroute through attic' },
      { item: '3/4" PEX-A Blue (Cold Reroute)', quantity: "150 ft", spec: '3/4" PEX-A tubing, blue, main cold supply reroute through attic' },
      { item: '1/2" PEX-A Red', quantity: "100 ft", spec: '1/2" PEX-A red, branch drops from attic to fixtures' },
      { item: '1/2" PEX-A Blue', quantity: "100 ft", spec: '1/2" PEX-A blue, branch drops from attic to fixtures' },
      { item: "PEX Manifold (Hot)", quantity: "1", spec: "6-port brass manifold with shutoff valves, hot distribution" },
      { item: "PEX Manifold (Cold)", quantity: "1", spec: "6-port brass manifold with shutoff valves, cold distribution" },
      { item: "Crimp Rings 1/2\"", quantity: "60", spec: '1/2" copper crimp rings' },
      { item: "Crimp Rings 3/4\"", quantity: "30", spec: '3/4" copper crimp rings' },
      { item: "Drop-Ear Elbows 1/2\"", quantity: "12", spec: '1/2" PEX x 1/2" FIP brass drop-ear 90° elbow for stub-outs' },
      { item: "PEX Transition Fittings", quantity: "4", spec: '3/4" PEX to copper sweat adapter, at water heater and main entry' },
      { item: "Pipe Insulation (attic)", quantity: "300 ft", spec: '3/4" and 1/2" foam pipe insulation, required for all attic PEX runs' },
      { item: "Pipe Straps", quantity: "80", spec: '1/2" and 3/4" plastic pipe straps, support per code intervals' },
      { item: "Nail Plates", quantity: "20", spec: "16-gauge steel nail plates for wall penetrations" },
      { item: "Copper Stub-outs", quantity: "12", spec: '1/2" x 8" copper stub-out with escutcheon at each fixture' },
      { item: "Cap Fittings", quantity: "4", spec: '3/4" and 1/2" PEX or copper caps, to abandon under-slab lines' },
    ],
    blueprintNotes: [
      "REROUTE PREFERRED — spot repair under slab has high failure rate",
      "Route through attic: manifold near water heater, branch drops to each fixture",
      "Insulate ALL attic PEX — condensation will damage ceiling, freezing will burst pipe",
      "Abandon under-slab lines: cap at both ends where accessible",
      "Coordinate with homeowner on drywall/ceiling patch — not included in plumbing scope",
      "Pressure test at 40 PSI / 15 min before ANY wall/ceiling patching",
      "Photo-document all work before insulation and drywall — for inspection and records",
      "Typical for 2-bath, 1,500-2,000 sq ft home — adjust quantities for larger homes",
    ],
    svgDiagram: "",
    suppliers,
    officialDocs: docs,
  };
}

// ── Full Home Build: Plumbing Phases ─────────────────────────────

function resPlumbingGroundwork(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "res-plumb-groundwork",
    label: "New Home Build – Phase 1: Underground & Slab Plumbing",
    requirements: [
      "Licensed plumber required — underground rough-in requires permit and inspection BEFORE concrete pour",
      "IPC Chapter 3: General regulations — all DWV pipe must be Schedule 40 PVC or approved equal",
      "IPC 708: Cleanout required within 5 ft of building on main drain, every 100 ft, and at direction changes >45°",
      "IPC 305.4: All penetrations through fire-rated assemblies and vapor barriers must be sealed",
      "Building sewer: 4\" minimum, slope 1/8\" per foot for 4\", 1/4\" per foot for 3\" and smaller",
      "Water supply stub-ups through slab: copper or approved PEX with protective sleeve",
      "Call 811 before digging — locate all existing utilities before trenching",
      "Pressure test ALL supply lines before concrete pour: 40 PSI for 15 minutes, no drop",
      "DWV test: water test or air test per inspector requirements — typically 5 PSI air for 15 min",
      "Photo-document all underground before pour — you cannot access it later",
      "CRITICAL: All underground plumbing COMPLETE and INSPECTED before slab pour",
    ],
    materials: [
      // ── DWV Underground ───────────────────────────────────────
      { item: "4\" PVC DWV Pipe", quantity: "60 ft", spec: "4\" Schedule 40 PVC DWV, building drain and main sewer to cleanout, sold per ft" },
      { item: "3\" PVC DWV Pipe", quantity: "40 ft", spec: "3\" Schedule 40 PVC DWV, toilet drains and main branches, sold per ft" },
      { item: "2\" PVC DWV Pipe", quantity: "30 ft", spec: "2\" Schedule 40 PVC DWV, tub/shower drains, sold per ft" },
      { item: "1-1/2\" PVC DWV Pipe", quantity: "20 ft", spec: "1-1/2\" Schedule 40 PVC DWV, lavatory and kitchen drains, sold per ft" },
      { item: "4\" PVC Wye", quantity: "3", spec: "4\" PVC DWV wye — branch connections at main drain" },
      { item: "4\" x 3\" PVC Reducer", quantity: "2", spec: "4\" x 3\" PVC reducer bushing — main to branch transitions" },
      { item: "3\" PVC Sanitary Tee", quantity: "4", spec: "3\" PVC DWV sanitary tee — toilet connections" },
      { item: "4\" PVC Closet Flange", quantity: "3", spec: "4\" x 3\" PVC closet flange with stainless steel ring — toilet locations (master, guest, half bath)" },
      { item: "2\" PVC P-Trap", quantity: "2", spec: "2\" PVC tubular P-trap — tub/shower locations" },
      { item: "1-1/2\" PVC P-Trap", quantity: "3", spec: "1-1/2\" PVC tubular P-trap — lavatory and kitchen locations" },
      { item: "4\" PVC Cleanout Body", quantity: "2", spec: "4\" PVC DWV cleanout with threaded plug — within 5 ft of building + at main" },
      { item: "PVC Cement + Primer", quantity: "2", spec: "Oatey purple primer + heavy PVC cement — all solvent-weld joints" },
      // ── Water Supply (under slab) ─────────────────────────────
      { item: "3/4\" PEX-A Blue (Cold Main)", quantity: "80 ft", spec: "3/4\" PEX-A tubing blue, main cold supply from meter/entry to distribution, sold per ft" },
      { item: "3/4\" PEX-A Red (Hot Main)", quantity: "60 ft", spec: "3/4\" PEX-A tubing red, hot supply from water heater to distribution, sold per ft" },
      { item: "1/2\" PEX-A Blue", quantity: "100 ft", spec: "1/2\" PEX-A blue, cold branch stubs to fixture locations through slab, sold per ft" },
      { item: "1/2\" PEX-A Red", quantity: "100 ft", spec: "1/2\" PEX-A red, hot branch stubs to fixture locations through slab, sold per ft" },
      { item: "PEX Crimp Rings 3/4\"", quantity: "20", spec: "3/4\" copper crimp rings" },
      { item: "PEX Crimp Rings 1/2\"", quantity: "40", spec: "1/2\" copper crimp rings" },
      { item: "Copper Stub-Outs 1/2\"", quantity: "12", spec: "1/2\" x 8\" copper stub-out with escutcheon — each fixture location through slab" },
      { item: "PEX Protective Sleeve", quantity: "20 ft", spec: "3/4\" and 1/2\" corrugated PEX sleeve — protect PEX where it passes through slab/concrete" },
      // ── Gravel & Misc ─────────────────────────────────────────
      { item: "Gravel Bedding", quantity: "1 yd", spec: "3/4\" clean gravel, pipe bedding — 4\" below + 4\" above DWV pipe" },
      { item: "Caution Tape (Sewer)", quantity: "1 roll", spec: "Green 'SEWER' warning tape — 12\" above all underground DWV" },
      { item: "Test Plugs/Caps", quantity: "6", spec: "3\" and 4\" PVC test caps — seal all open drains for pressure test" },
      { item: "Sand Fill", quantity: "as needed", spec: "Clean sand for backfill around PEX supply lines — no rocks against pipe" },
    ],
    blueprintNotes: [
      "CRITICAL: All underground plumbing must be COMPLETE and INSPECTED before concrete pour",
      "Toilet rough-in: 12\" from finished wall to center of closet flange (standard)",
      "Slope all DWV: 1/4\" per foot for 3\" and smaller, 1/8\" per foot for 4\"",
      "PEX stub-ups: protect with sleeve through slab, leave 12\" above finished floor",
      "Pressure test supply lines: 40 PSI for 15 min, NO drop — before pour",
      "DWV test: air test 5 PSI for 15 min, or water test — per inspector preference",
      "Photo everything before pour — plumber, GC, and inspector should all document",
      "Coordinate with electrician: Ufer ground also goes in before pour",
      "Typical 3BR/2BA — 3 toilets, 2 tubs/showers, 3 sinks, kitchen, laundry",
    ],
    svgDiagram: "",
    suppliers,
    officialDocs: docs,
  };
}

function resPlumbingTopout(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "res-plumb-topout",
    label: "New Home Build – Phase 2: Top-Out (Risers, Vents, Supply Lines)",
    requirements: [
      "IPC Chapter 9: Vent system — every fixture must be vented, within distance per IPC Table 906.1",
      "IPC 903.1: Vent termination — minimum 6\" above roof, 10 ft from any air intake",
      "IPC 906.1: Maximum developed length of individual vent — depends on pipe size and trap size",
      "AAV (Air Admittance Valve) permitted per local amendments — some jurisdictions restrict",
      "Support all piping per IPC Table 308.5 — horizontal and vertical intervals vary by size and material",
      "Fire-stop all penetrations through fire-rated walls and floors",
      "No PEX within 18\" of water heater connections — transition to copper",
      "Pressure test all supply lines: 40 PSI for 15 min before drywall",
      "DWV water test or air test required — inspect before drywall closure",
      "Top-out inspection BEFORE drywall — all piping, vents, supports visible",
    ],
    materials: [
      // ── DWV Risers & Branches ─────────────────────────────────
      { item: "3\" PVC DWV Pipe", quantity: "40 ft", spec: "3\" Schedule 40 PVC DWV, vent stacks and waste risers, sold per ft" },
      { item: "2\" PVC DWV Pipe", quantity: "30 ft", spec: "2\" Schedule 40 PVC DWV, branch drains and vent risers, sold per ft" },
      { item: "1-1/2\" PVC DWV Pipe", quantity: "20 ft", spec: "1-1/2\" Schedule 40 PVC DWV, lavatory drains and individual vents, sold per ft" },
      { item: "3\" PVC Vent Pipe", quantity: "20 ft", spec: "3\" Schedule 40 PVC, main vent stack through roof, sold per ft" },
      { item: "2\" PVC Vent Pipe", quantity: "30 ft", spec: "2\" Schedule 40 PVC, branch vents connecting to main stack, sold per ft" },
      { item: "3\" PVC Sanitary Tee", quantity: "3", spec: "3\" PVC DWV sanitary tee — waste/vent connections" },
      { item: "2\" PVC Sanitary Tee", quantity: "4", spec: "2\" PVC DWV sanitary tee — branch waste/vent" },
      { item: "3\" x 2\" PVC Reducing Tee", quantity: "2", spec: "3\" x 2\" PVC DWV reducing sanitary tee" },
      { item: "3\" PVC Roof Flashing", quantity: "1", spec: "3\" PVC roof flashing boot — main vent stack penetration" },
      { item: "2\" PVC Roof Flashing", quantity: "1", spec: "2\" PVC roof flashing boot — secondary vent penetration" },
      { item: "Air Admittance Valve", quantity: "2", spec: "Studor AAV 1-1/2\" or 2\", ASSE 1051 — for island sink and remote fixtures" },
      // ── Water Supply (above slab) ─────────────────────────────
      { item: "3/4\" PEX-A Blue", quantity: "60 ft", spec: "3/4\" PEX-A blue, cold supply branches through framing, sold per ft" },
      { item: "3/4\" PEX-A Red", quantity: "60 ft", spec: "3/4\" PEX-A red, hot supply branches through framing, sold per ft" },
      { item: "1/2\" PEX-A Blue", quantity: "120 ft", spec: "1/2\" PEX-A blue, cold drops to individual fixtures, sold per ft" },
      { item: "1/2\" PEX-A Red", quantity: "120 ft", spec: "1/2\" PEX-A red, hot drops to individual fixtures, sold per ft" },
      { item: "PEX Crimp Rings 1/2\"", quantity: "40", spec: "1/2\" copper crimp rings" },
      { item: "PEX Crimp Rings 3/4\"", quantity: "20", spec: "3/4\" copper crimp rings" },
      { item: "Drop-Ear Elbows 1/2\"", quantity: "12", spec: "1/2\" PEX x 1/2\" FIP brass drop-ear 90° elbow — fixture stub-outs" },
      { item: "PEX Tees 3/4\"", quantity: "6", spec: "3/4\" PEX brass tee, crimp style — branch distribution" },
      { item: "PEX 90° Elbow 3/4\"", quantity: "8", spec: "3/4\" PEX brass 90° elbow, crimp style" },
      // ── Supports & Misc ───────────────────────────────────────
      { item: "Pipe Straps (assorted)", quantity: "60", spec: "Plastic pipe straps — 1/2\", 3/4\", 1-1/2\", 2\", 3\" sizes for all pipe" },
      { item: "Nail Plates", quantity: "25", spec: "16-gauge steel nail plates — protect pipe through studs per IPC 305.6" },
      { item: "DWV Hangers", quantity: "12", spec: "Galvanized pipe hangers — 2\" and 3\" DWV support in framing" },
      { item: "PVC Cement + Primer", quantity: "1", spec: "Purple primer + heavy PVC cement" },
      { item: "Firestop Caulk", quantity: "2", spec: "3M CP-25WB+ fire barrier caulk — seal all pipe penetrations through fire-rated assemblies" },
      { item: "Test Plugs", quantity: "4", spec: "2\" and 3\" inflatable test balls — for DWV air/water test" },
    ],
    blueprintNotes: [
      "Vent stacks: extend through roof — minimum 6\" above, 10 ft from air intakes",
      "Support all pipe per IPC 308.5 — PEX: 32\" horizontal, copper: 6 ft, PVC DWV: 4 ft",
      "PEX: transition to copper within 18\" of water heater",
      "Nail plates: required wherever pipe is less than 1-1/2\" from stud face",
      "AAVs: install where conventional vent is impractical — accessible location required",
      "Pressure test before drywall — NO exceptions, document with photos",
      "Top-out inspection: inspector must see all piping before walls close",
      "Coordinate with electrician: both trades need rough-in inspection before drywall",
    ],
    svgDiagram: "",
    suppliers,
    officialDocs: docs,
  };
}

function resPlumbingFixtures(suppliers: Supplier[], docs: OfficialDoc[]): Job {
  return {
    id: "res-plumb-fixtures",
    label: "New Home Build – Phase 3: Water Heater, Fixtures & Trim",
    requirements: [
      "Licensed plumber required for water heater installation and gas connections",
      "Water heater: T&P relief valve required, discharge to within 6\" of floor or exterior",
      "Gas water heater: drip leg required, gas shutoff within 6 ft, proper flue/vent",
      "IPC 424.5: Anti-scald valve required on tub/shower — ASSE 1016 listed",
      "All fixture supply stops required — 1/4-turn angle stops, accessible",
      "Verify proper drainage: run water at each fixture, check for leaks at every joint",
      "Dishwasher: high loop or air gap on drain — check local code requirement",
      "Hose bibs: freeze-proof sillcock recommended in climate zones with freezing temps",
      "Gas pipe: pressure test 3 PSI for 10 min before connecting appliances",
    ],
    materials: [
      // ── Water Heater ──────────────────────────────────────────
      { item: "Gas Water Heater 50-gal", quantity: "1", spec: "50-gallon natural gas, 40,000 BTU, 0.62 UEF min, FVIR compliant" },
      { item: "T&P Relief Valve", quantity: "1", spec: "3/4\" T&P valve, 150 PSI / 210°F, ASME certified" },
      { item: "T&P Discharge Pipe", quantity: "1", spec: "3/4\" CPVC or copper, to within 6\" of floor" },
      { item: "Expansion Tank", quantity: "1", spec: "2-gallon thermal expansion tank, pre-charged" },
      { item: "Gas Flex Connector", quantity: "1", spec: "3/4\" stainless steel gas flex, 24\", CSA certified" },
      { item: "Gas Shutoff Valve", quantity: "1", spec: "3/4\" brass ball valve, gas-rated, 1/4-turn" },
      { item: "Drip Leg Assembly", quantity: "1", spec: "3/4\" x 3\" black iron nipple + cap" },
      { item: "Water Heater Pan", quantity: "1", spec: "26\" aluminum drain pan with 1\" PVC drain" },
      { item: "Vent Connector", quantity: "1", spec: "4\" galvanized single-wall vent pipe + elbows" },
      // ── Supply Stops & Connections ────────────────────────────
      { item: "Angle Stop Valve (1/2\" x 3/8\")", quantity: "10", spec: "1/2\" FIP x 3/8\" comp 1/4-turn angle stop — at each fixture (3 sinks + 3 toilets + washer H/C)" },
      { item: "Faucet Supply Lines", quantity: "6", spec: "3/8\" comp braided stainless supply lines, 20\" — lavatory faucets (H+C per sink)" },
      { item: "Toilet Supply Line", quantity: "3", spec: "3/8\" comp x 7/8\" ballcock braided stainless, 12\" — master, guest, half bath" },
      { item: "Washer Supply Box", quantity: "1", spec: "Oatey Quadtro - washing machine outlet box with valves and drain — laundry" },
      // ── Fixtures (installed by plumber) ────────────────────────
      { item: "Kitchen Faucet", quantity: "1", spec: "Moen or Delta pull-down kitchen faucet — per owner/builder selection" },
      { item: "Bathroom Faucet", quantity: "3", spec: "Moen or Delta centerset bath faucet, 4\" — master, guest, half bath" },
      { item: "Tub/Shower Valve + Trim", quantity: "2", spec: "Moen or Delta pressure-balance valve with trim kit, ASSE 1016 — master + guest" },
      { item: "Toilet", quantity: "3", spec: "1.28 GPF WaterSense toilet — master, guest, half bath — per builder selection" },
      { item: "Garbage Disposal", quantity: "1", spec: "InSinkErator Badger 5 — 1/2 HP continuous feed" },
      // ── Exterior ──────────────────────────────────────────────
      { item: "Freeze-Proof Hose Bib", quantity: "2", spec: "Woodford Model 17 — 10\" frost-proof sillcock, anti-siphon — front + rear" },
      // ── Misc ──────────────────────────────────────────────────
      { item: "Pipe Thread Sealant", quantity: "1", spec: "Yellow gas-rated Teflon tape + pipe dope — gas connections" },
      { item: "Plumber's Putty", quantity: "1", spec: "Oatey plumber's putty — sink drain and faucet base seals" },
      { item: "Silicone Caulk", quantity: "2", spec: "GE Supreme silicone — tub/shower surrounds, sink to countertop" },
      { item: "Dielectric Unions", quantity: "2", spec: "3/4\" FIP dielectric union — water heater copper-to-steel transition" },
    ],
    blueprintNotes: [
      "Water heater: install before fixture trim — tests gas and water supply systems",
      "Anti-scald valves: set to 120°F max at each tub/shower — test with thermometer",
      "Test every fixture: run hot and cold, check under every sink for leaks",
      "Toilets: verify closet flange is level and correct height — shim if needed before setting",
      "Dishwasher connection: plumber provides drain and hot water — DW installed by appliance crew",
      "Gas line test: 3 PSI for 10 min before connecting water heater",
      "Hose bibs: test for proper anti-siphon function and no leaks at sillcock body",
      "Final walk: run every fixture, flush every toilet, verify no leaks anywhere",
      "Coordinate with builder: fixtures selected per spec sheet — verify before ordering",
    ],
    svgDiagram: "",
    suppliers,
    officialDocs: docs,
  };
}

// ── Export: build jobs for a jurisdiction ─────────────────────────

export function buildAustinPlumbingJobs(): Job[] {
  const s = [fergusonAustin];
  return [
    waterHeaterReplacement(s, plumbingDocs),
    tanklessWaterHeater(s, plumbingDocs),
    wholeHouseRepipe(s, plumbingDocs),
    slabLeakRepair(s, plumbingDocs),
    bathroomRoughIn(s, plumbingDocs),
    kitchenPlumbing(s, plumbingDocs),
    gasLineExtension(s, plumbingDocs),
    waterSoftener(s, plumbingDocs),
    sewerCleanoutInstall(s, plumbingDocs),
    resPlumbingGroundwork(s, plumbingDocs),
    resPlumbingTopout(s, plumbingDocs),
    resPlumbingFixtures(s, plumbingDocs),
  ];
}

export function buildSanAntonioPlumbingJobs(): Job[] {
  const s = [fergusonSanAntonio];
  return [
    waterHeaterReplacement(s, saDocs),
    tanklessWaterHeater(s, saDocs),
    wholeHouseRepipe(s, saDocs),
    slabLeakRepair(s, saDocs),
    bathroomRoughIn(s, saDocs),
    kitchenPlumbing(s, saDocs),
    gasLineExtension(s, saDocs),
    waterSoftener(s, saDocs),
    sewerCleanoutInstall(s, saDocs),
    resPlumbingGroundwork(s, saDocs),
    resPlumbingTopout(s, saDocs),
    resPlumbingFixtures(s, saDocs),
  ];
}

export const PLUMBING_JOB_TYPES = [
  { id: "water-heater-50gal-gas", label: "50-Gallon Gas Water Heater Replacement" },
  { id: "tankless-water-heater", label: "Tankless Water Heater (Outdoor, Gas)" },
  { id: "whole-house-repipe-pex", label: "Whole-House PEX Repipe (2,000 sq ft)" },
  { id: "slab-leak-repair", label: "Slab Leak Repair – Attic Reroute (PEX)" },
  { id: "bathroom-rough-in", label: "New Bathroom Rough-In" },
  { id: "kitchen-sink-disposal", label: "Kitchen Sink & Garbage Disposal Rough-In" },
  { id: "gas-line-extension", label: "Gas Line Extension (~30 ft)" },
  { id: "water-softener-install", label: "Water Softener Installation" },
  { id: "sewer-cleanout-install", label: "Exterior Sewer Cleanout" },
  { id: "res-plumb-groundwork", label: "New Home Build – Phase 1: Underground & Slab" },
  { id: "res-plumb-topout", label: "New Home Build – Phase 2: Top-Out (Risers & Vents)" },
  { id: "res-plumb-fixtures", label: "New Home Build – Phase 3: Water Heater & Fixtures" },
];
