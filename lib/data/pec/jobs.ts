import type { Job } from "../types";
import { JOBS as AUSTIN_JOBS } from "../jobs";
import { PEC_SUPPLIERS } from "./suppliers";
import { PEC_OFFICIAL_DOCS } from "./official-docs";

/**
 * PEC (Hill Country) jobs inherit Austin's job definitions with
 * PEC-specific suppliers, official docs, and meter sockets swapped in.
 *
 * PEC uses the same Eaton CH series equipment as Austin Energy territory.
 * Meter sockets differ:
 *   200A single-phase → Milbank U4801XL5T9
 *   320A (Class 320)  → Milbank U2448X (no dash)
 */

/** Replace meter socket part numbers and utility references in a string */
function patchText(text: string): string {
  return text
    // 200A meter sockets — various Austin part numbers → PEC part number
    .replace(/Eaton 1006352CCH[^"']*/g, (m) =>
      m.replace("Eaton 1006352CCH", "Milbank U4801XL5T9")
       .replace(/AE-approved for Central Texas/g, "PEC-approved for Hill Country")
       .replace(/AE-approved/g, "PEC-approved")
       .replace(/AE approved/g, "PEC approved")
    )
    .replace(/1006352CCH/g, "U4801XL5T9")
    .replace(/Milbank U5135-XL-200/g, "Milbank U4801XL5T9")
    .replace(/U5135-XL-200/g, "U4801XL5T9")
    // 320A meter sockets — U2448-X (with dash) → U2448X (no dash)
    .replace(/Milbank U2448-X/g, "Milbank U2448X")
    .replace(/U2448-X/g, "U2448X")
    // Utility references
    .replace(/AE-approved/g, "PEC-approved")
    .replace(/AE approved/g, "PEC approved")
    .replace(/Austin Energy approved/g, "PEC approved")
    .replace(/Austin Energy standard/g, "PEC standard")
    .replace(/Austin Energy amendment/g, "PEC requirement")
    .replace(/Austin Energy/g, "PEC")
    .replace(/AE Design Criteria/g, "PEC service standards")
    .replace(/AE engineering/g, "PEC engineering")
    .replace(/AE inspection/g, "PEC inspection")
    .replace(/City of Austin electrical permit/g, "County electrical permit (PEC territory)")
    .replace(/City of Austin/g, "Local AHJ")
    .replace(/Austin permit required/g, "Local permit required")
    .replace(/AE ESPA/g, "PEC service application")
    .replace(/contact AE/g, "contact PEC")
    .replace(/AE requires/g, "PEC requires")
    .replace(/AE will/g, "PEC will")
    .replace(/AE may/g, "PEC may")
    .replace(/submit to AE/g, "submit to PEC")
    .replace(/\(AE\)/g, "(PEC)")
    .replace(/\(AE /g, "(PEC ");
}

function patchJob(job: Job): Job {
  return {
    ...job,
    requirements: job.requirements.map(patchText),
    materials: job.materials.map((mat) => ({
      ...mat,
      item: patchText(mat.item),
      spec: patchText(mat.spec),
    })),
    blueprintNotes: job.blueprintNotes?.map(patchText),
    svgDiagram: job.svgDiagram ? patchText(job.svgDiagram) : undefined,
    suppliers: PEC_SUPPLIERS,
    officialDocs: PEC_OFFICIAL_DOCS,
  };
}

export const PEC_JOBS: Job[] = AUSTIN_JOBS.map(patchJob);
