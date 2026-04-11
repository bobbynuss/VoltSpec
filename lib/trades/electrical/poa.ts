import type { MaterialItem } from "../../core/types";

export interface POAOption {
  id: string;
  label: string;
  shortLabel: string;
  materials: MaterialItem[];
  blueprintNote: string;
  /** SVG snippet inserted near weatherhead in schematic */
  svgLabel: string;
}

export const POA_OPTIONS: POAOption[] = [
  {
    id: "mast-wire-holder",
    label: "Adjustable Mast Wire Holder (MWH1)",
    shortLabel: "Mast Wire Holder",
    materials: [
      {
        item: "Adjustable Mast Wire Holder",
        quantity: "1",
        spec: "BRI MWH1 - adjustable mast wire holder for overhead service attachment, secures utility triplex to mast or conduit riser",
        unitPrice: 23.26,
      },
    ],
    blueprintNote:
      "Point of attachment: Adjustable mast wire holder (BRI MWH1) mounted at top of service mast/riser, utility triplex secured to holder",
    svgLabel: "POA: Mast Wire Holder (MWH1)",
  },
  {
    id: "porcelain-bracket-kit",
    label: "Porcelain Bracket & Bolt Kit with Square Washers",
    shortLabel: "Porcelain Bracket Kit",
    materials: [
      {
        item: "Porcelain Service Bracket",
        quantity: "1",
        spec: "M-W MWK4112 - porcelain service entrance bracket, mounts to exterior wall for overhead utility triplex attachment point",
        unitPrice: 29.15,
      },
      {
        item: "Bracket Bolt",
        quantity: "1",
        spec: "M-W MW5810 - bolt for porcelain service entrance bracket mounting",
        unitPrice: 6.95,
      },
      {
        item: "Square Washer",
        quantity: "2",
        spec: "M-W SW58 - square washer for porcelain bracket bolt, distributes load on siding/sheathing",
        unitPrice: 3.24,
      },
    ],
    blueprintNote:
      "Point of attachment: Porcelain bracket (M-W MWK4112) bolted to exterior wall with square washers, utility triplex secured to bracket",
    svgLabel: "POA: Porcelain Bracket (MWK4112)",
  },
];

export const DEFAULT_POA_ID = "mast-wire-holder";

/** Job IDs that should show the POA dropdown (all meter-socket jobs) */
export const METER_JOB_IDS = new Set([
  "new-200a-residential",
  "200a-upgrade",
  "new-320a-service",
  "meter-base-replacement",
  "new-400a-service",
  "commercial-400a-3phase",
  "temp-power-pole",
  "whole-house-battery-solar",
  "solar-pv-20kw",
]);

/** Check if a job should show the POA dropdown */
export function isMeterJob(jobId: string): boolean {
  if (METER_JOB_IDS.has(jobId)) return true;
  return false;
}
