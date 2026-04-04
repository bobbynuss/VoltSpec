/**
 * Amarillo / Xcel Energy (SPS) pricing derived from Elliott Electric Amarillo
 * cash-sale invoices.
 *
 * Source invoices (all from Elliott Amarillo, Branch 81):
 *   81-05926-01 (03/31/2026)
 *   81-05958-01 (03/31/2026) — Barraza Electric
 *   81-06064-01 (03/31/2026) — 1-800-Plumber / Shreiner Home Comfort
 *   81-06279-01 (04/01/2026) — Liberty Electric Canyon
 *   81-06447-01 (04/02/2026)
 *   81-06638-01 (04/03/2026) — M & C Electric
 *
 * Methodology:
 *   True Unit Cost = Extended Price ÷ Ship Quantity
 *   When a catalog number appears across multiple invoices, values are averaged.
 *   Final Est. Cost = averaged True Unit Cost × 1.15 (+15% markup).
 *
 * Wire / cable items are excluded — always "Speak to sales" in VoltSpec.
 */

export const AMARILLO_PRICES: Record<string, number> = {
  // ────────────────────────────────────────────
  // Meter Sockets & Accessories
  // ────────────────────────────────────────────
  "U4801XL5T9":    217.73, // 200A 1PH OH/UG 5T lever bypass — avg $189.33 × 1.15 (inv 1,2,3,6)
  "A7517":          17.71, // 2″ unit hub (Milbank)           — avg $15.40 × 1.15 (inv 1,2,3,4,5,6)
  "U6281XL2005T9": 522.85, // Meter-main 200A WCB HD          — avg $454.65 × 1.15 (inv 4,5)

  // ────────────────────────────────────────────
  // BR-Series Breakers
  // ────────────────────────────────────────────
  "BR220":    20.46,  // 20A/2P  — $17.79 × 1.15  (inv 3)
  "BR225":    22.28,  // 25A/2P  — $19.37 × 1.15  (inv 1)
  "BR230":    20.83,  // 30A/2P  — avg $18.11 × 1.15 (inv 1,5)
  "BR240":    22.28,  // 40A/2P  — $19.37 × 1.15  (inv 1)
  "BR250":    20.34,  // 50A/2P  — $17.69 × 1.15  (inv 3)

  // ────────────────────────────────────────────
  // Loadcenters
  // ────────────────────────────────────────────
  "BRP20B125R":  220.36, // BR 125A MB 20sp N3R    — $191.62 × 1.15 (inv 1)
  "BRP12B100R":  104.48, // BR 100A MB 12sp N3R    — $90.85 × 1.15  (inv 3)
  "BRP40L200G":  184.67, // BR 200A MLO 40sp w/GND — $160.58 × 1.15 (inv 6)

  // ────────────────────────────────────────────
  // Surge Protection
  // ────────────────────────────────────────────
  "BRPSURGE10":  115.20, // BR 2-pole PON surge arrester — avg $100.18 × 1.15 (inv 1,4)

  // ────────────────────────────────────────────
  // Grounding
  // ────────────────────────────────────────────
  "615880":     24.73,  // 5/8″×8′ CU ground rod       — avg $21.51 × 1.15 (inv 1,2,4,5)
  "GRC3834":     4.44,  // 3/8″-3/4″ ground clamp      — avg $3.86 × 1.15  (inv 1,2,4,5)
  "GBK5":       12.65,  // Ground bar kit 5-term        — $11.00 × 1.15  (inv 1)
  "GBIAL1264414WC": 25.81, // Intersystem bonding term  — avg $22.44 × 1.15 (inv 3,4)

  // ────────────────────────────────────────────
  // Conduit, Weatherheads & Fittings
  // ────────────────────────────────────────────
  "GAL2":      12.01,  // 2″ rigid conduit (per 10′)    — $10.44 × 1.15 (inv 1,3,5,6)
  "EMT2":       4.22,  // 2″ EMT conduit (per 10′)      — avg $3.67 × 1.15 (inv 2,4)
  "1256":       18.93,  // 2″ weatherhead                — avg $16.46 × 1.15 (inv 1,2,3,4,5,6)
  "RF200":      15.57,  // 2″ roof flashing              — $13.54 × 1.15 (inv 1,6)
  "386DC":      12.43,  // 2″ insulated grounding bushing — $10.81 × 1.15 (inv 2,6)
  "326":         0.70,  // 2″ plastic bushing             — avg $0.61 × 1.15 (inv 2,4,6)
  "106S":        1.60,  // 2″ steel locknut               — avg $1.39 × 1.15 (inv 2,4,5,6)
  "TA2":         1.31,  // 2″ PVC male adapter            — avg $1.14 × 1.15 (inv 2,4,5)
  "1906":        1.28,  // 2″ two-hole rigid strap        — $1.11 × 1.15 (inv 3)
  "2XC":         4.85,  // 2″ close rigid nipple          — $4.22 × 1.15 (inv 3)
  "2X6":        10.05,  // 2×6 rigid nipple               — $8.74 × 1.15 (inv 6)
  "1525DC":     17.64,  // 2″ offset nipple               — $15.34 × 1.15 (inv 6)
  "1524DC":     13.02,  // 1-1/2″ offset nipple           — $11.32 × 1.15 (inv 1)
  "2150":        2.31,  // 2″ EMT/rigid conduit hanger    — avg $2.01 × 1.15 (inv 2,4,5)
  "DS200H1":    34.86,  // 2″ plate-type hub              — avg $30.32 × 1.15 (inv 2,3)
  "C2060169":   19.72,  // 2″ galvanized mast clamp       — $17.15 × 1.15 (inv 1,3)
  "PVC280":      2.16,  // 2″ Sch80 PVC (per ft)          — $1.88 × 1.15 (inv 4)
  "PVC2":        1.33,  // 2″ Sch40 PVC (per ft)          — $1.16 × 1.15 (inv 5)

  // ────────────────────────────────────────────
  // Small Fittings
  // ────────────────────────────────────────────
  "105S":        0.91,  // 1-1/2″ steel locknut           — $0.79 × 1.15 (inv 1)
  "325":         0.46,  // 1-1/2″ plastic bushing          — $0.40 × 1.15 (inv 1)
  "GLL5":       10.12,  // 1-1/2″ mall insulated gnd bush — $8.80 × 1.15 (inv 1)
  "251RT2":      2.20,  // 3/4″ raintight EMT conn        — $1.91 × 1.15 (inv 1)
  "255RT2":     14.32,  // 2″ raintight EMT conn          — $12.45 × 1.15 (inv 2)
  "655RT":      16.51,  // 2″ EMT comp conn raintight     — $14.36 × 1.15 (inv 4)

  // ────────────────────────────────────────────
  // Boxes & Covers
  // ────────────────────────────────────────────
  "WPB33":       4.46,  // WP box 1G 3-hole 3/4           — $3.88 × 1.15 (inv 1)
  "WPB1":        3.42,  // WP cover 1G blank               — $2.97 × 1.15 (inv 1)
};
