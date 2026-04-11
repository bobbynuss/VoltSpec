/**
 * Registry — central lookup for TradeModule + DistributorAdapter.
 *
 * Currently hardcodes electrical + Elliott. As new trades and distributors
 * are added, this becomes the single place to register them.
 *
 * Future: user/project context determines which trade + distributor to load.
 * For now, all callers get electrical + Elliott by default.
 */

import type { TradeModule } from "./trades/types";
import type { DistributorAdapter } from "./distributors/types";
import { electricalModule } from "./trades/electrical";
import { elliottAdapter } from "./distributors/elliott";

// ── Registered modules ───────────────────────────────────────────

const TRADE_MODULES: Map<string, TradeModule> = new Map([
  ["electrical", electricalModule],
]);

const DISTRIBUTOR_ADAPTERS: Map<string, DistributorAdapter> = new Map([
  ["elliott", elliottAdapter],
]);

// ── Default context ──────────────────────────────────────────────

const DEFAULT_TRADE = "electrical";
const DEFAULT_DISTRIBUTOR = "elliott";

// ── Public API ───────────────────────────────────────────────────

/** Get a trade module by ID */
export function getTrade(id?: string): TradeModule {
  const key = id ?? DEFAULT_TRADE;
  const mod = TRADE_MODULES.get(key);
  if (!mod) throw new Error(`Unknown trade module: ${key}`);
  return mod;
}

/** Get a distributor adapter by ID */
export function getDistributor(id?: string): DistributorAdapter {
  const key = id ?? DEFAULT_DISTRIBUTOR;
  const adapter = DISTRIBUTOR_ADAPTERS.get(key);
  if (!adapter) throw new Error(`Unknown distributor adapter: ${key}`);
  return adapter;
}

/** List all registered trade IDs */
export function listTrades(): { id: string; name: string; icon: string }[] {
  return Array.from(TRADE_MODULES.values()).map((m) => ({
    id: m.id,
    name: m.name,
    icon: m.icon,
  }));
}

/** List all registered distributor IDs */
export function listDistributors(): { id: string; name: string }[] {
  return Array.from(DISTRIBUTOR_ADAPTERS.values()).map((a) => ({
    id: a.id,
    name: a.name,
  }));
}

/** Register a new trade module (for runtime plugin loading) */
export function registerTrade(mod: TradeModule): void {
  TRADE_MODULES.set(mod.id, mod);
}

/** Register a new distributor adapter (for runtime plugin loading) */
export function registerDistributor(adapter: DistributorAdapter): void {
  DISTRIBUTOR_ADAPTERS.set(adapter.id, adapter);
}

// ── Convenience: get both at once ────────────────────────────────

export interface AppContext {
  trade: TradeModule;
  distributor: DistributorAdapter;
}

/** Get the current trade + distributor context. Defaults to electrical + Elliott. */
export function getContext(tradeId?: string, distributorId?: string): AppContext {
  return {
    trade: getTrade(tradeId),
    distributor: getDistributor(distributorId),
  };
}
