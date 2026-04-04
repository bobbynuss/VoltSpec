import type { Job } from "../types";
import { JOBS as AUSTIN_JOBS } from "../jobs";
import { BEC_SUPPLIERS } from "./suppliers";
import { BEC_OFFICIAL_DOCS } from "./official-docs";

/**
 * BEC (Bandera Electric Cooperative) jobs inherit Austin's CH-series
 * job definitions with BEC-specific suppliers, official docs, and
 * utility references swapped in.
 *
 * Same Eaton CH series equipment and meter sockets as Austin for now.
 * Can be refined later with BEC-specific quotes.
 */

/** Replace Austin Energy utility references with BEC equivalents */
function patchText(text: string): string {
  return text
    .replace(/AE-approved for Central Texas/g, "BEC-approved for Bandera County area")
    .replace(/AE-approved/g, "BEC-approved")
    .replace(/AE approved/g, "BEC approved")
    .replace(/Austin Energy approved/g, "BEC approved")
    .replace(/Austin Energy standard/g, "BEC standard")
    .replace(/Austin Energy amendment/g, "BEC requirement")
    .replace(/Austin Energy/g, "BEC")
    .replace(/AE Design Criteria/g, "BEC service standards")
    .replace(/AE engineering/g, "BEC engineering")
    .replace(/AE inspection/g, "BEC inspection")
    .replace(/City of Austin electrical permit/g, "County electrical permit (BEC territory)")
    .replace(/City of Austin/g, "Local AHJ")
    .replace(/Austin permit required/g, "Local permit required")
    .replace(/AE ESPA/g, "BEC service application")
    .replace(/contact AE/g, "contact BEC")
    .replace(/AE requires/g, "BEC requires")
    .replace(/AE will/g, "BEC will")
    .replace(/AE may/g, "BEC may")
    .replace(/submit to AE/g, "submit to BEC")
    .replace(/\(AE\)/g, "(BEC)")
    .replace(/\(AE /g, "(BEC ");
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
    suppliers: BEC_SUPPLIERS,
    officialDocs: BEC_OFFICIAL_DOCS,
  };
}

export const BEC_JOBS: Job[] = AUSTIN_JOBS.map(patchJob);
