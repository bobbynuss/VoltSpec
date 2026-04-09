/**
 * Dallas/DFW jobs — generated from the templating system.
 *
 * Inherits Austin (CH series) baseline with DFW-specific meter socket,
 * Oncor utility references, and Elliott Ft. Worth pricing overlay.
 *
 * To modify: edit `lib/data/configs/dallas.ts`
 */

import { buildJobs } from "../build-jobs";
import { DALLAS_CONFIG } from "../configs/dallas";

export const DALLAS_JOBS = buildJobs(DALLAS_CONFIG);
