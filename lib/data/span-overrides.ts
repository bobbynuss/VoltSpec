/**
 * Re-export from trades/electrical — SPAN overrides now live there.
 * This shim keeps existing "@/lib/data/span-overrides" imports working.
 */
export { SPAN_ELIGIBLE_JOBS, applySpanOverride } from "../trades/electrical/span-overrides";
