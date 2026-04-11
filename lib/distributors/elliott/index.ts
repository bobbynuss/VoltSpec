/**
 * Elliott Electric Supply — DistributorAdapter implementation.
 *
 * Wraps all Elliott-specific logic (vendor codes, branches, bulk entry,
 * product URLs, rep email routing) behind the standard adapter interface.
 */

import type { Supplier } from "../../core/types";
import type {
  DistributorAdapter,
  DistributorBranch,
  DistributorStore,
  VendorCodeResult,
  ProductUrls,
} from "../types";

import {
  extractPartNumber,
  elliottVendorCode,
  resolveVendorAndPart,
  formatBulkEntryLine,
} from "./vendor-codes";

import { ELLIOTT_BRANCHES } from "./branches";
import { ELLIOTT_STORES } from "./stores";
import {
  findNearestBranches,
  branchToSupplier,
  reorderSuppliersForZip,
} from "./zip-to-branch";

// ── Product URL helpers ──────────────────────────────────────────

function getProductUrls(item: string, spec?: string): ProductUrls {
  const partNumber = spec ? extractPartNumber(spec) : null;

  const direct = partNumber
    ? `https://www.elliottelectric.com/StaticPages/QuickFind.aspx?SearchString=${encodeURIComponent(partNumber)}`
    : null;

  const searchTerm = partNumber ?? item;
  const search = `https://www.elliottelectric.com/StaticPages/QuickFind.aspx?SearchString=${encodeURIComponent(searchTerm)}`;

  return { direct, search };
}

// ── Rep email formatting ─────────────────────────────────────────

function formatRepEmail(repName: string): string | null {
  if (!repName || !repName.trim()) return null;
  const cleaned = repName.trim().toLowerCase().replace(/\s+/g, "");
  return `${cleaned}@elliott.com`;
}

// ── Adapter instance ─────────────────────────────────────────────

export const elliottAdapter: DistributorAdapter = {
  id: "elliott",
  name: "Elliott Electric Supply",
  website: "https://www.elliottelectric.com",

  extractPartNumber,
  resolveVendorCode: elliottVendorCode,
  resolveVendorAndPart(spec: string): VendorCodeResult | null {
    return resolveVendorAndPart(spec);
  },

  formatBulkEntryLine,

  get branches(): DistributorBranch[] {
    return ELLIOTT_BRANCHES;
  },

  get stores(): DistributorStore[] {
    return ELLIOTT_STORES;
  },

  findNearestBranches(zip: string, maxResults = 3) {
    return findNearestBranches(zip, maxResults);
  },

  branchToSupplier(branch: DistributorBranch, distanceMiles?: number): Supplier {
    return branchToSupplier(branch as any, distanceMiles);
  },

  reorderSuppliersForZip(suppliers: Supplier[], zip: string): Supplier[] {
    return reorderSuppliersForZip(suppliers, zip);
  },

  getProductUrls,
  formatRepEmail,
};

// Re-export individual pieces for backward-compatible imports
export { extractPartNumber, elliottVendorCode, resolveVendorAndPart, formatBulkEntryLine } from "./vendor-codes";
export { ELLIOTT_BRANCHES, type ElliottBranch } from "./branches";
export { ELLIOTT_STORES, type ElliottStore } from "./stores";
export { findNearestBranches, branchToSupplier, reorderSuppliersForZip } from "./zip-to-branch";
