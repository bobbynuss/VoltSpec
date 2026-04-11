/**
 * Trades module — trade registry.
 *
 * Each trade implements TradeModule and provides material classification,
 * jurisdictions, job types, and trade-specific calculations.
 */

export type {
  TradeModule,
  TradeJurisdiction,
  TradeJobType,
  MaterialGroup,
} from "./types";

// ── Available Trades ─────────────────────────────────────────────

export { electricalModule } from "./electrical";
