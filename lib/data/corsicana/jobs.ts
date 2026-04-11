import { buildJobs } from "../build-jobs";
import { CORSICANA_CONFIG } from "../configs/corsicana";

export const CORSICANA_JOBS = buildJobs(CORSICANA_CONFIG);
