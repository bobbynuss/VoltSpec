/**
 * Re-export from trades/electrical — POA now lives there.
 * This shim keeps existing "@/lib/data/pointOfAttachment" imports working.
 */
export type { POAOption } from "../trades/electrical/poa";
export { POA_OPTIONS, DEFAULT_POA_ID, isMeterJob } from "../trades/electrical/poa";
