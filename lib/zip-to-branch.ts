import { ELLIOTT_BRANCHES, type ElliottBranch } from "./elliott-branches";
import type { Supplier } from "./data/types";

/**
 * Texas 3-digit ZIP prefix → approximate lat/lng centroid.
 * Used for fast distance matching without a full ZIP database.
 */
const ZIP3_COORDS: Record<string, [number, number]> = {
  // Austin metro
  "786": [30.35, -97.75], "787": [30.27, -97.74], "788": [30.50, -97.80],
  // San Antonio
  "780": [29.55, -98.40], "781": [29.42, -98.49], "782": [29.46, -98.53],
  // Houston
  "770": [29.76, -95.37], "771": [29.85, -95.50], "772": [29.60, -95.30],
  "773": [29.95, -95.40], "774": [29.70, -95.60], "775": [29.30, -95.10],
  // DFW
  "750": [32.78, -96.80], "751": [32.85, -96.65], "752": [32.75, -97.33],
  "753": [33.00, -96.70], "754": [33.20, -96.63], "760": [32.73, -97.11],
  "761": [32.75, -97.33], "762": [32.36, -97.40],
  // West Texas
  "790": [35.20, -101.83], "791": [33.55, -101.85], "793": [31.95, -102.10],
  "794": [31.85, -102.35], "795": [32.45, -99.73], "796": [31.45, -100.44],
  // El Paso
  "798": [31.76, -106.44], "799": [31.80, -106.45],
  // South Texas / Valley
  "784": [25.90, -97.50], "785": [26.20, -98.23],
  "783": [27.80, -97.40],
  // Other
  "765": [31.55, -97.15], "766": [31.10, -97.73], "767": [31.07, -97.37],
  "768": [30.07, -97.00], "769": [29.70, -98.10],
  "763": [32.35, -95.30], "757": [32.45, -94.73],
  "776": [30.08, -94.10], "777": [30.12, -94.15],
  "778": [30.60, -96.31], "779": [28.80, -96.99],
};

function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 3959; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getZipCoords(zip: string): [number, number] | null {
  const prefix = zip.slice(0, 3);
  return ZIP3_COORDS[prefix] ?? null;
}

/**
 * Find the nearest Elliott branches to a given ZIP code.
 * Returns branches sorted by distance (closest first).
 */
export function findNearestBranches(
  zip: string,
  maxResults = 3
): { branch: ElliottBranch; distanceMiles: number }[] {
  const coords = getZipCoords(zip);
  if (!coords) return [];

  const [lat, lng] = coords;
  const withDist = ELLIOTT_BRANCHES.map((branch) => ({
    branch,
    distanceMiles: haversineDistance(lat, lng, branch.lat, branch.lng),
  }));

  withDist.sort((a, b) => a.distanceMiles - b.distanceMiles);
  return withDist.slice(0, maxResults);
}

/**
 * Convert an ElliottBranch to a Supplier object for display.
 */
export function branchToSupplier(
  branch: ElliottBranch,
  distanceMiles?: number
): Supplier {
  const distNote = distanceMiles != null && distanceMiles < 200
    ? ` (~${Math.round(distanceMiles)} mi)`
    : "";
  return {
    name: `Elliott Electric Supply - ${branch.name} (${branch.store})`,
    address: branch.address,
    phone: branch.phone,
    website: "https://www.elliottelectric.com",
    notes: `M-F 7:00am-5:30pm | Sat 8:00am-12:00pm${distNote}`,
  };
}

/**
 * Given a job's suppliers list and a ZIP code, return a new suppliers list
 * with the nearest Elliott branch promoted to position 0.
 * Non-Elliott suppliers are preserved in their original order after.
 */
export function reorderSuppliersForZip(
  suppliers: Supplier[],
  zip: string
): Supplier[] {
  if (!zip || zip.length < 3) return suppliers;

  const nearest = findNearestBranches(zip, 3);
  if (nearest.length === 0) return suppliers;

  // Build new list: nearest Elliott branches first, then non-Elliott suppliers
  const nonElliott = suppliers.filter(
    (s) => !s.name.toLowerCase().includes("elliott")
  );

  const elliottSuppliers = nearest.map(({ branch, distanceMiles }) =>
    branchToSupplier(branch, distanceMiles)
  );

  return [...elliottSuppliers, ...nonElliott];
}
