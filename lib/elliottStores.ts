/**
 * Re-export from distributors/elliott — store list now lives there.
 * This shim keeps existing "@/lib/elliottStores" imports working.
 */
export { ELLIOTT_STORES, type ElliottStore } from "./distributors/elliott/stores";
