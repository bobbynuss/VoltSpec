/**
 * Re-export from distributors/elliott — ZIP-to-branch now lives there.
 * This shim keeps existing "@/lib/zip-to-branch" imports working.
 */
export {
  findNearestBranches,
  branchToSupplier,
  reorderSuppliersForZip,
} from "./distributors/elliott/zip-to-branch";
