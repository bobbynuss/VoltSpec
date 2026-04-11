/**
 * Re-export from trades/electrical — load calc now lives there.
 * This shim keeps existing "@/lib/loadCalc" imports working.
 */
export type { LoadCalcInputs, LoadCalcResult } from "./trades/electrical/load-calc";
export { calculateLoad, DEFAULT_INPUTS } from "./trades/electrical/load-calc";
