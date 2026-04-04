/**
 * NEC 2026 Article 220 — Standard Method Residential Load Calculation
 *
 * Reference: NFPA 70-2026, Article 220 Parts I-IV
 *
 * This implements the Standard Method (220.40–220.55) which most AHJs
 * in Texas accept for residential service sizing.
 */

export interface LoadCalcInputs {
  /** Heated square footage of dwelling */
  sqft: number;
  /** Number of small-appliance branch circuits (NEC 220.52(A): min 2) */
  smallApplianceCircuits: number;
  /** Number of laundry circuits (NEC 220.52(B): min 1) */
  laundryCircuits: number;

  // Fixed appliances (nameplate VA)
  /** Electric range/oven/cooktop — nameplate watts (0 if gas) */
  rangeWatts: number;
  /** Electric dryer — nameplate watts (min 5000 per NEC 220.54, 0 if gas) */
  dryerWatts: number;
  /** Electric water heater — nameplate watts (0 if gas/tankless gas) */
  waterHeaterWatts: number;
  /** Dishwasher — nameplate watts */
  dishwasherWatts: number;
  /** Garbage disposal — nameplate watts */
  disposalWatts: number;

  // HVAC — largest motor load
  /** A/C compressor — nameplate watts or running load amps × 240 */
  acWatts: number;
  /** Electric furnace / heat strip — nameplate watts (0 if gas heat) */
  heatWatts: number;

  // Additional loads
  /** EV charger — watts (e.g. 7680 for 32A/240V, 9600 for 40A) */
  evChargerWatts: number;
  /** Pool pump — watts */
  poolPumpWatts: number;
  /** Hot tub/spa — watts */
  hotTubWatts: number;
  /** Other fixed loads — watts (workshop equipment, sauna, etc.) */
  otherFixedWatts: number;
}

export interface LoadCalcResult {
  /** General lighting load (3 VA/sqft × sqft) */
  generalLighting: number;
  /** Small appliance circuits (1500 VA each) */
  smallApplianceLoad: number;
  /** Laundry circuit load (1500 VA each) */
  laundryLoad: number;
  /** Sum before demand factor */
  generalSubtotal: number;
  /** First 10,000 VA at 100% */
  generalFirst10k: number;
  /** Remainder at 40% */
  generalRemainder: number;
  /** Net general lighting + SA + laundry after demand */
  generalNet: number;

  /** Range demand (NEC 220.55 Table) */
  rangeDemand: number;
  /** Dryer demand (NEC 220.54 — 5000 VA min or nameplate) */
  dryerDemand: number;

  /** Fixed appliance total (water heater, dishwasher, disposal, other) */
  fixedApplianceTotal: number;
  /** Number of fixed appliances (if >=4, apply 75% demand) */
  fixedApplianceCount: number;
  /** Fixed appliance demand after 75% factor (if applicable) */
  fixedApplianceDemand: number;

  /** HVAC: larger of A/C or heat (NEC 220.60 — non-coincident) */
  hvacDemand: number;
  /** Which HVAC load was selected */
  hvacSelected: "ac" | "heat" | "none";

  /** EV charger (100% demand) */
  evDemand: number;
  /** Pool pump (100%) */
  poolDemand: number;
  /** Hot tub (100%) */
  hotTubDemand: number;

  /** Total calculated load in VA */
  totalVA: number;
  /** Total amps at 240V single phase */
  totalAmps: number;

  /** Recommended service size */
  recommendedService: 100 | 200 | 320 | 400;
  /** Recommended service description */
  recommendedServiceLabel: string;
}

export function calculateLoad(inputs: LoadCalcInputs): LoadCalcResult {
  // ── General Lighting (NEC 220.12: 3 VA/sqft) ──
  const generalLighting = inputs.sqft * 3;

  // ── Small Appliance (NEC 220.52(A): 1500 VA × circuits, min 2) ──
  const saCircuits = Math.max(inputs.smallApplianceCircuits, 2);
  const smallApplianceLoad = saCircuits * 1500;

  // ── Laundry (NEC 220.52(B): 1500 VA × circuits, min 1) ──
  const laundryCircuits = Math.max(inputs.laundryCircuits, 1);
  const laundryLoad = laundryCircuits * 1500;

  // ── General demand factor (NEC Table 220.42) ──
  const generalSubtotal = generalLighting + smallApplianceLoad + laundryLoad;
  const generalFirst10k = Math.min(generalSubtotal, 10000);
  const generalRemainder = Math.max(generalSubtotal - 10000, 0) * 0.4;
  const generalNet = generalFirst10k + generalRemainder;

  // ── Range (NEC 220.55 / Table 220.55) ──
  // Single household range ≤12 kW: demand = 8000 VA
  // Over 12 kW: 8000 + (nameplate - 12000) × 0.05 × 8000... simplified:
  // For single range: max(8000, nameplate × column C percentage)
  let rangeDemand = 0;
  if (inputs.rangeWatts > 0) {
    if (inputs.rangeWatts <= 12000) {
      rangeDemand = 8000;
    } else {
      // Column C: 8kW + 5% per kW over 12kW
      const overKw = Math.ceil((inputs.rangeWatts - 12000) / 1000);
      rangeDemand = 8000 + overKw * 400; // 5% of 8000 = 400 per kW over
    }
  }

  // ── Dryer (NEC 220.54: 5000 VA or nameplate, whichever is larger) ──
  let dryerDemand = 0;
  if (inputs.dryerWatts > 0) {
    dryerDemand = Math.max(inputs.dryerWatts, 5000);
  }

  // ── Fixed Appliances (NEC 220.53: if 4+, apply 75%) ──
  const fixedItems: number[] = [];
  if (inputs.waterHeaterWatts > 0) fixedItems.push(inputs.waterHeaterWatts);
  if (inputs.dishwasherWatts > 0) fixedItems.push(inputs.dishwasherWatts);
  if (inputs.disposalWatts > 0) fixedItems.push(inputs.disposalWatts);
  if (inputs.otherFixedWatts > 0) fixedItems.push(inputs.otherFixedWatts);

  const fixedApplianceTotal = fixedItems.reduce((s, v) => s + v, 0);
  const fixedApplianceCount = fixedItems.length;
  const fixedApplianceDemand =
    fixedApplianceCount >= 4
      ? Math.round(fixedApplianceTotal * 0.75)
      : fixedApplianceTotal;

  // ── HVAC — Non-coincident loads (NEC 220.60) ──
  // Use the larger of A/C or heat (they don't run simultaneously)
  let hvacDemand = 0;
  let hvacSelected: "ac" | "heat" | "none" = "none";
  if (inputs.acWatts > 0 || inputs.heatWatts > 0) {
    if (inputs.acWatts >= inputs.heatWatts) {
      hvacDemand = inputs.acWatts;
      hvacSelected = "ac";
    } else {
      hvacDemand = inputs.heatWatts;
      hvacSelected = "heat";
    }
  }

  // ── Additional loads at 100% ──
  const evDemand = inputs.evChargerWatts;
  const poolDemand = inputs.poolPumpWatts;
  const hotTubDemand = inputs.hotTubWatts;

  // ── Total ──
  const totalVA =
    generalNet +
    rangeDemand +
    dryerDemand +
    fixedApplianceDemand +
    hvacDemand +
    evDemand +
    poolDemand +
    hotTubDemand;

  const totalAmps = totalVA / 240;

  // ── Service sizing ──
  let recommendedService: 100 | 200 | 320 | 400;
  let recommendedServiceLabel: string;

  if (totalAmps <= 100) {
    recommendedService = 100;
    recommendedServiceLabel = "100A Single-Phase Service";
  } else if (totalAmps <= 200) {
    recommendedService = 200;
    recommendedServiceLabel = "200A Single-Phase Service";
  } else if (totalAmps <= 320) {
    recommendedService = 320;
    recommendedServiceLabel = "320A Single-Phase Service (Class 320 Meter)";
  } else {
    recommendedService = 400;
    recommendedServiceLabel = "400A Single-Phase Service (Dual 200A)";
  }

  return {
    generalLighting,
    smallApplianceLoad,
    laundryLoad,
    generalSubtotal,
    generalFirst10k,
    generalRemainder,
    generalNet,
    rangeDemand,
    dryerDemand,
    fixedApplianceTotal,
    fixedApplianceCount,
    fixedApplianceDemand,
    hvacDemand,
    hvacSelected,
    evDemand,
    poolDemand,
    hotTubDemand,
    totalVA,
    totalAmps,
    recommendedService,
    recommendedServiceLabel,
  };
}

/** Default inputs — typical 2000 sqft Texas home */
export const DEFAULT_INPUTS: LoadCalcInputs = {
  sqft: 2000,
  smallApplianceCircuits: 2,
  laundryCircuits: 1,
  rangeWatts: 12000,
  dryerWatts: 5000,
  waterHeaterWatts: 4500,
  dishwasherWatts: 1200,
  disposalWatts: 600,
  acWatts: 5000,
  heatWatts: 0,
  evChargerWatts: 0,
  poolPumpWatts: 0,
  hotTubWatts: 0,
  otherFixedWatts: 0,
};
