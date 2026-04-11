import { buildJobs } from "../build-jobs";
import { PHOENIX_CONFIG } from "../configs/phoenix";

export const PHOENIX_JOBS = buildJobs(PHOENIX_CONFIG);
