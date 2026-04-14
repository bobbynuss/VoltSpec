import type { Job } from "../types";
import { AUSTIN_SUPPLIERS } from "../suppliers";
import { AUSTIN_OFFICIAL_DOCS } from "../official-docs";

export const job: Job = {
  id: "commercial-sign-lighting",
  label: "Sign / Monument Lighting Circuit",
  requirements: [
    "NEC 2026 Art. 600: Electric signs and outline lighting",
    "NEC 2026 Art. 600.5: Branch circuit required — minimum 20A dedicated circuit for each sign",
    "NEC 2026 Art. 600.6: Disconnect required within sight of sign or lockable",
    "Austin Energy: sign circuits typically served from existing commercial panel — verify capacity",
    "Photocell or astronomical timer required for dusk-to-dawn operation",
    "Sign disconnect must be accessible and within sight — exterior rated (NEMA 3R)",
    "Underground conduit to monument sign: minimum 18 in. burial depth for RMC, 24 in. for PVC",
    "GFCI protection required for sign circuits per NEC 600.10(C)(1)",
    "Permit: sign electrical permit (may be separate from building electrical permit)",
  ],
  materials: [
    { item: "20A 1-Pole GFCI Breaker", quantity: "1", spec: "Eaton CHFGF120 - CH 1-pole 20A GFCI breaker, sign dedicated circuit, arc fault not required for sign circuit" },
    { item: "12/2 UF-B Cable (underground)", quantity: "100 ft", spec: "Southwire 13056755 - 12/2 UF-B with ground, direct burial rated, sign feeder underground run" },
    { item: "3/4 in. Schedule 40 PVC Conduit", quantity: "20 ft", spec: "CON PVC34SCH40 - 3/4 in. PVC conduit, above-grade transition at sign base and panel" },
    { item: "PVC Fittings (3/4 in.)", quantity: "1 lot", spec: "LBs, couplings, adapters for 3/4 in. PVC — typical 10-piece lot" },
    { item: "30A Non-Fused Disconnect (NEMA 3R)", quantity: "1", spec: "Eaton DPU222RGF20ST - 30A 240V non-fusible disconnect, NEMA 3R, sign disconnect within sight" },
    { item: "Photocell (twist-lock, 120V)", quantity: "1", spec: "Intermatic K4521C - 120V thermal-type photocell, twist-lock mount, dusk-to-dawn sign control" },
    { item: "Weatherproof In-Use Cover (1-gang)", quantity: "1", spec: "TayMac MM410C - 1-gang vertical in-use cover, clear, for exterior GFCI/photocell junction" },
    { item: "NEMA 3R Junction Box (sign base)", quantity: "1", spec: "Eaton TP604 - 6×6×4 NEMA 3R junction box, sign base wiring compartment" },
    { item: "Ground Rod (5/8 × 8 ft)", quantity: "1", spec: "Erico 615880 - 5/8 in. × 8 ft copper-bonded ground rod at sign location per NEC 250.52" },
    { item: "Ground Rod Clamp", quantity: "1", spec: "NSI GRC58 - 5/8 in. bronze ground rod clamp" },
    { item: "12 AWG THHN (conduit sections)", quantity: "50 ft", spec: "COP THHN12STR500 - 12 AWG stranded THHN, above-grade conduit sections" },
    { item: "Red Tape (circuit ID)", quantity: "1 roll", spec: "3M 35-RED - red vinyl electrical tape for sign circuit phase identification" },
  ],
  blueprintNotes: [
    "Sign unit NOT included — sign company typically furnishes and installs sign",
    "Electrician provides power to sign junction box — sign company makes final connections",
    "Verify sign load (LED signs are typically 2-5A; older neon may draw more)",
    "Monument sign: run UF-B direct burial or PVC conduit from panel to sign base",
    "Disconnect must be within sight of sign AND accessible — mount on sign base or adjacent post",
    "Coordinate with sign company on voltage requirements — most modern signs are 120V",
    "Some jurisdictions require separate sign permit — check with AHJ",
    "Photocell wiring: line to photocell, switched leg to sign, neutral through — simple 3-wire",
  ],
  suppliers: AUSTIN_SUPPLIERS,
  officialDocs: AUSTIN_OFFICIAL_DOCS,
};
