import type { Job } from "../types";
import { JOBS as AUSTIN_JOBS } from "../jobs";
import { GVEC_SUPPLIERS } from "./suppliers";
import { GVEC_OFFICIAL_DOCS } from "./official-docs";

/**
 * GVEC (Guadalupe Valley Electric Cooperative) jobs inherit Austin's
 * CH-series job definitions with GVEC-specific suppliers, official docs,
 * and utility references swapped in.
 *
 * Same Eaton CH series equipment and meter sockets as Austin for now.
 * Meter sockets and panel specs can be refined later with GVEC-specific quotes.
 */

/** Replace Austin Energy utility references with GVEC equivalents */
function patchText(text: string): string {
  return text
    .replace(/AE-approved for Central Texas/g, "GVEC-approved for South Central Texas")
    .replace(/AE-approved/g, "GVEC-approved")
    .replace(/AE approved/g, "GVEC approved")
    .replace(/Austin Energy approved/g, "GVEC approved")
    .replace(/Austin Energy standard/g, "GVEC standard")
    .replace(/Austin Energy amendment/g, "GVEC requirement")
    .replace(/Austin Energy/g, "GVEC")
    .replace(/AE Design Criteria/g, "GVEC service standards")
    .replace(/AE engineering/g, "GVEC engineering")
    .replace(/AE inspection/g, "GVEC inspection")
    .replace(/City of Austin electrical permit/g, "County electrical permit (GVEC territory)")
    .replace(/City of Austin/g, "Local AHJ")
    .replace(/Austin permit required/g, "Local permit required")
    .replace(/AE ESPA/g, "GVEC service application")
    .replace(/contact AE/g, "contact GVEC")
    .replace(/AE requires/g, "GVEC requires")
    .replace(/AE will/g, "GVEC will")
    .replace(/AE may/g, "GVEC may")
    .replace(/submit to AE/g, "submit to GVEC")
    .replace(/\(AE\)/g, "(GVEC)")
    .replace(/\(AE /g, "(GVEC ");
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
    suppliers: GVEC_SUPPLIERS,
    officialDocs: GVEC_OFFICIAL_DOCS,
  };
}

export const GVEC_JOBS: Job[] = AUSTIN_JOBS.map(patchJob);
