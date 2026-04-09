/**
 * Lubbock jobs - generated from the templating system.
 * To modify: edit `lib/data/configs/lubbock.ts`
 */

import { buildJobs } from "../build-jobs";
import { LUBBOCK_CONFIG } from "../configs/lubbock";

export const LUBBOCK_JOBS = buildJobs(LUBBOCK_CONFIG);
