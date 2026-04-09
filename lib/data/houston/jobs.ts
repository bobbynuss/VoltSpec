/**
 * Houston jobs — generated from the templating system.
 *
 * Inherits San Antonio (BR series) baseline with CenterPoint meter socket,
 * utility references, and Elliott Houston-area pricing overlay.
 *
 * To modify: edit `lib/data/configs/houston.ts`
 */

import { buildJobs } from "../build-jobs";
import { HOUSTON_CONFIG } from "../configs/houston";

export const HOUSTON_JOBS = buildJobs(HOUSTON_CONFIG);
