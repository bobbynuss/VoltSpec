/**
 * Re-export from core — all types now live in lib/core/types.ts.
 * This shim keeps existing "../types" and "./types" imports working.
 */
export type { Supplier, OfficialDoc, MaterialItem, Job } from "../core/types";
