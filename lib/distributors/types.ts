/**
 * DistributorAdapter — the interface every distributor plugin implements.
 *
 * Each adapter provides the distributor-specific logic for:
 * - Vendor code resolution (part + spec → vendor code)
 * - Part number extraction from spec strings
 * - Branch/store lookup by ZIP
 * - Bulk entry formatting for quick-order systems
 * - Product URL generation (direct + search links)
 * - Sales rep email routing
 */

import type { Supplier } from "../core/types";

/** A physical distributor branch/store location */
export interface DistributorBranch {
  store: number;
  name: string;
  city: string;
  address: string;
  phone: string;
  zip: string;
  lat: number;
  lng: number;
}

/** A distributor store entry for user profile / rep selection */
export interface DistributorStore {
  id: string;
  name: string;
  city: string;
  phone: string;
}

/** Result of vendor code resolution */
export interface VendorCodeResult {
  part: string;
  vendor: string | null;
}

/** Product URL pair */
export interface ProductUrls {
  direct: string | null;
  search: string;
}

export interface DistributorAdapter {
  /** Unique identifier for this distributor */
  readonly id: string;

  /** Display name */
  readonly name: string;

  /** Website URL */
  readonly website: string;

  // ── Part Number & Vendor Code ──────────────────────────────────

  /** Extract a part number from a spec string */
  extractPartNumber(spec: string): string | null;

  /** Resolve vendor code for a given part + spec. Returns null if unknown. */
  resolveVendorCode(part: string, spec: string): string | null;

  /** Convenience: extract part + resolve vendor from a spec string */
  resolveVendorAndPart(spec: string): VendorCodeResult | null;

  // ── Bulk Entry / Quick Order ───────────────────────────────────

  /** Format a single line for the distributor's bulk entry system */
  formatBulkEntryLine(qty: string, spec: string, itemFallback: string): string;

  // ── Branch / Store Lookup ──────────────────────────────────────

  /** All branch locations */
  readonly branches: DistributorBranch[];

  /** Store list for profile / rep selection UI */
  readonly stores: DistributorStore[];

  /** Find nearest branches to a ZIP code, sorted by distance */
  findNearestBranches(zip: string, maxResults?: number): { branch: DistributorBranch; distanceMiles: number }[];

  /** Convert a branch to a Supplier object for display */
  branchToSupplier(branch: DistributorBranch, distanceMiles?: number): Supplier;

  /** Reorder a suppliers list with nearest branches first for a given ZIP */
  reorderSuppliersForZip(suppliers: Supplier[], zip: string): Supplier[];

  // ── Product URLs ───────────────────────────────────────────────

  /** Generate direct + search URLs for a given item and spec */
  getProductUrls(item: string, spec?: string): ProductUrls;

  // ── Sales Rep Email ────────────────────────────────────────────

  /** Generate sales rep email from rep name (e.g. "John Smith" → "johnsmith@elliott.com") */
  formatRepEmail(repName: string): string | null;
}
