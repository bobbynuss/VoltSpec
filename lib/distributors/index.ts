/**
 * Distributors module — adapter registry.
 *
 * Each distributor implements DistributorAdapter and provides
 * vendor codes, branch lookup, bulk entry, and product URLs.
 */

export type {
  DistributorAdapter,
  DistributorBranch,
  DistributorStore,
  VendorCodeResult,
  ProductUrls,
} from "./types";

// ── Available Adapters ───────────────────────────────────────────

export { elliottAdapter } from "./elliott";
