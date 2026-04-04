/**
 * El Paso / El Paso Electric pricing — PLACEHOLDER
 *
 * No Elliott invoices available yet for El Paso.
 * Uses San Antonio pricing as baseline until El Paso-specific quotes arrive.
 * When invoices are uploaded, apply the same methodology:
 *   True Unit Cost = Extended Price ÷ Ship Quantity
 *   Final Est. Cost = averaged True Unit Cost × 1.15 (+15% markup)
 */

export const ELPASO_PRICES: Record<string, number> = {
  // Placeholder — empty until El Paso invoices are processed.
  // San Antonio prices are inherited as-is via SA_JOBS.
};
