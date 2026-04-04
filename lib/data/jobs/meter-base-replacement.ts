import type { Job } from "../types";
import { diagram } from "../diagrams/meter-base-replacement";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "meter-base-replacement",
  label: "Meter Base Only Replacement / Upgrade",
  requirements: [
    "NEC 2026 Art. 230: Service entrance equipment requirements",
    "Austin Energy meter release required before any work — contact AE to schedule disconnect/reconnect",
    "Replacement meter socket must be Austin Energy approved (ringless lever-bypass, 200A class)",
    "Emergency disconnect required per NEC 230.85 — if not present, must be added during replacement",
    "Service entrance conductors: verify condition and re-use if rated for service, otherwise replace",
    "Ground electrode system must be inspected and brought to NEC 250.50 compliance",
    "Weatherhead and mast: replace if corroded, damaged, or non-compliant with AE Design Criteria",
    "Permit: City of Austin electrical permit required — AE inspection before re-energization",
    "Coordinate with AE for meter pull and re-set — allow 2-5 business days for scheduling",
  ],
  materials: [
    { item: "200A Ringless Meter Socket", quantity: "1", spec: "Milbank U5135-XL-200 - 200A ringless lever-bypass meter socket, 4-jaw, single-phase, OH/UG rated, AE approved", unitPrice: 142 },
    { item: "200A Non-Fusible Disconnect", quantity: "1", spec: "Eaton DPF222R - 200A 240V non-fusible safety disconnect, NEMA 3R outdoor, emergency disconnect per NEC 230.85", unitPrice: 125 },
    { item: "2 in. Rigid Metal Conduit", quantity: "10 ft", spec: "CON GAL2 - 2 in. galvanized rigid metal conduit 10 ft stick, mast and weatherhead riser", unitPrice: 10.44 },
    { item: "2 in. RMC Weatherhead", quantity: "1", spec: "Bridgeport 1256 - 2 in. service entrance weatherhead, 10 ft AFF minimum", unitPrice: 18.46 },
    { item: "2 in. RMC Hub", quantity: "2", spec: "Bridgeport 310 - 2 in. rigid conduit hub, meter socket and disconnect entries", unitPrice: 6.75 },
    { item: "4/0 AWG AL SER Cable", quantity: "15 ft", spec: "ALU SER40200 - 4/0-4/0-2/0 AL SER cable 3-conductor + bare neutral, 200A service entrance rated, sold per ft" },
    { item: "4 AWG Bare Copper GEC", quantity: "15 ft", spec: "COP BARE4SOL500 - 4 AWG solid bare copper ground electrode conductor, sold per ft, per NEC 250.66 for 200A service" },
    { item: "5/8 x 8 ft Ground Rod", quantity: "2", spec: "Erico 615880 - 5/8 in. x 8 ft copper-bonded ground rod, 6 ft spacing minimum per NEC 250.53", unitPrice: 26.43 },
    { item: "Ground Rod Clamp", quantity: "2", spec: "NSI GRC58 - 5/8 in. ground rod bronze clamp, UL listed", unitPrice: 4.21 },
    { item: "Meter Socket Seal Kit", quantity: "1", spec: "Milbank K4978 - meter socket weatherproof seal kit, includes hub inserts and cover gasket", unitPrice: 12.50 },
    { item: "Anti-Oxidant Compound", quantity: "1", spec: "Ideal NOALOX 30-026 - anti-oxidant joint compound, 8 oz, for all aluminum terminations", unitPrice: 8.75 },
    { item: "Duct Seal", quantity: "1", spec: "PECO DS1 - duct seal compound, 1 lb, seal conduit entries per NEC 230.8", unitPrice: 6.36 },
  ],
  blueprintNotes: [
    "Coordinate AE meter release FIRST — no work until meter is pulled by utility",
    "Inspect existing SE conductors: if 4/0 AL or larger and undamaged, re-use; otherwise replace",
    "If no emergency disconnect exists, install DPF222R between meter and panel per NEC 230.85",
    "Weatherhead height: 10 ft AFF minimum, 12 ft preferred for AE clearance",
    "Apply NOALOX to all aluminum terminations — required by AE Design Criteria",
    "Ground electrode: two rods 6 ft apart, supplemented by water pipe bond if metallic water service present",
    "AE will inspect meter base and re-set meter — schedule before permit final inspection",
  ],
  svgDiagram: diagram,
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
