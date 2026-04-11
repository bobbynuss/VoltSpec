/**
 * Re-export from distributors/elliott — vendor codes now live there.
 * This shim keeps existing "@/lib/vendor-codes" imports working.
 */
export {
  extractPartNumber,
  elliottVendorCode,
  resolveVendorAndPart,
  formatBulkEntryLine,
} from "./distributors/elliott/vendor-codes";
