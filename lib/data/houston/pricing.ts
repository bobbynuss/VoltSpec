/**
 * Houston / CenterPoint pricing derived from Elliott Electric Houston-area
 * cash-sale invoices.
 *
 * Source invoices (Stafford Branch 65 / Deer Park Branch 130):
 *   65-61285-01 (03/24/2026) — C H E Electric (Stafford)
 *   65-61475-01 (03/24/2026) — Paez Electric (Stafford)
 *   65-62057-01 (03/25/2026) — Lopez Electric (Stafford)
 *   65-62443-01 (03/30/2026) — G E S Electric (Deer Park)
 *
 * Methodology:
 *   True Unit Cost = Extended Price ÷ Ship Quantity
 *   When a catalog number appears across multiple invoices, values are averaged.
 *   Final Est. Cost = averaged True Unit Cost × 1.15 (+15% markup).
 *
 * Wire / cable items (THHN, SER, XHHW, Romex, URD, Bare Cu) are excluded —
 * those always display "Speak to sales" in VoltSpec.
 */

export const HOUSTON_PRICES: Record<string, number> = {
  // ────────────────────────────────────────────
  // BR-Series Breakers
  // ────────────────────────────────────────────
  "BR115":      7.79,   // 15A/1P  — avg $6.78 × 1.15  (inv 2: $7.00, inv 4: $6.55)
  "BR120":      7.65,   // 20A/1P  — avg $6.65 × 1.15  (inv 2: $7.00×5=$35→$7ea, inv 4: $6.55×8=$52.40→$6.55ea)
  "BR230":     13.94,   // 30A/2P  — avg $12.12 × 1.15  (inv 2: $13.00, inv 3: $11.82, inv 4: $11.67)
  "BR240":     14.95,   // 40A/2P  — $13.00 × 1.15      (inv 2)
  "BR250":     13.87,   // 50A/2P  — avg $12.06 × 1.15  (inv 3: $12.13, inv 4: $11.99)
  "BR260":     14.19,   // 60A/2P  — $12.34 × 1.15      (inv 3)
  "BR2125":    80.04,   // 125A/2P — $69.60 × 1.15      (inv 4)

  // ────────────────────────────────────────────
  // Main Breaker Kits
  // ────────────────────────────────────────────
  "BW2150":   105.23,   // 150A/2P MB kit — avg $91.50 × 1.15 (inv 1: $88.00, inv 2: $95.00)
  "BW2200":   101.10,   // 200A/2P MB kit — $87.91 × 1.15    (inv 3)

  // ────────────────────────────────────────────
  // Loadcenters
  // ────────────────────────────────────────────
  "BRP30N200RG": 161.00, // 200A convertible 30sp N3R — $140.00 × 1.15 (inv 1)
  "BRP20N200RG": 149.50, // 200A convertible 20sp N3R — avg $130.00 × 1.15 (inv 2: $135.00, inv 3: $125.00)
  "BRP20N125R":  136.68, // 125A convertible 20sp N3R — $118.85 × 1.15 (inv 4)

  // ────────────────────────────────────────────
  // Surge Protection
  // ────────────────────────────────────────────
  "BRPSURGE10":  86.25,  // BR 2-pole PON surge arrester — $75.00 × 1.15 (inv 2)
  "BRNSURGE10":  82.43,  // BR 2-pole surge arrester    — $71.68 × 1.15 (inv 4)

  // ────────────────────────────────────────────
  // Meter Socket & Accessories
  // ────────────────────────────────────────────
  "UNRRS213CEUSE": 84.14, // 200A OH/UG ringless       — avg $73.13 × 1.15 (inv 1: $72.00, inv 2: $75.00, inv 3: $72.40)
  "ARP00006CH2":   12.70, // 2″ hub closure plate       — avg $11.03 × 1.15 (inv 1: $11.00, inv 2: $11.00, inv 3: $11.79, inv 4: $10.33)

  // ────────────────────────────────────────────
  // Grounding
  // ────────────────────────────────────────────
  "615880":     23.85,   // 5/8″×8′ CU ground rod      — avg $20.74 × 1.15 (inv 3: $18.39, inv 4: $18.78 per rod)
  "GRC3834":     4.22,   // 3/8″-3/4″ ground clamp     — avg $3.68 × 1.15 (inv 2: $3.50, inv 3: $3.85)
  "G1S":         3.22,   // 1/2-1″ bronze ground clamp  — $2.80 × 1.15 (inv 4)
  "GBK2120":    16.42,   // Ground bar kit 21-term +lug — $14.28 × 1.15 (inv 4)
  "GBIAL1264414WC": 18.08, // Intersystem bonding term  — avg $15.73 × 1.15 (inv 2: $15.00, inv 4: $16.45)

  // ────────────────────────────────────────────
  // SE Kits & Fittings
  // ────────────────────────────────────────────
  "MK10020":    62.53,   // 2″ 100A SE kit              — avg $54.38 × 1.15 (inv 2: $60.00, inv 3: $48.75)
  "BREQS125":    3.61,   // Hold-down screw for BR 125A — $3.14 × 1.15 (inv 4)

  // ────────────────────────────────────────────
  // Conduit, Weatherheads & Fittings
  // ────────────────────────────────────────────
  "GAL2":       10.58,   // 2″ rigid conduit (per 10′)  — avg $9.20 × 1.15 (inv 2: $9.50, inv 3: $8.90)
  "IMC2":        6.14,   // 2″ IMC conduit (per 10′)    — $5.34 × 1.15 (inv 4)
  "1256":       11.74,   // 2″ weatherhead (BRI)        — $10.21 × 1.15 (inv 4)
  "5133743":    23.00,   // 2″ weatherhead (PVF)        — $20.00 × 1.15 (inv 1)
  "386DC":      11.50,   // 2″ insulated grounding bushing — $10.00 × 1.15 (inv 2)
  "326":         1.09,   // 2″ plastic bushing           — avg $0.95 × 1.15 (inv 2: $0.86, inv 3: $0.84, inv 4: $0.48 ea → avg)
  "106S":        1.52,   // 2″ steel locknut             — avg $1.32 × 1.15 (inv 2: $1.86, inv 3: $0.91, inv 4: $0.52 ea → avg)
  "TA2":         2.26,   // 2″ PVC male adapter          — avg $1.97 × 1.15 (inv 1: $2.02, inv 2: $1.86, inv 3: not present)
  "1525DC":     15.93,   // 2″ offset nipple             — avg $13.85 × 1.15 (inv 2: $12.00, inv 3: $9.88, inv 4: $7.67 → avg ea)
  "1107DC":      8.20,   // 2″ chased nipple             — $7.14 × 1.15 (inv 4)
  "1925":        1.55,   // 2″ two-hole EMT strap        — $1.35 × 1.15 (inv 2)
  "2150":        1.28,   // 2″ EMT/rigid hanger          — $1.11 × 1.15 (inv 4)
  "80PVC2":      1.67,   // 2″ Sch80 PVC conduit (per ft)— $1.45 × 1.15 (inv 1: $29/20ft = $1.45/ft)
  "PVC290":      5.18,   // 2″ Sch40 90° PVC elbow      — $4.50 × 1.15 (inv 1)

  // ────────────────────────────────────────────
  // Boxes & Covers
  // ────────────────────────────────────────────
  "EZ44TNW":     2.30,   // EZ 44 cu-in 3G nail-on box  — $2.00 × 1.15 (inv 1)
  "53200":       4.67,   // HBL 1G WP box 3×1/2 hubs    — $4.06 × 1.15 (inv 2)
  "51730":       1.54,   // HBL 1G WP blank cover        — $1.34 × 1.15 (inv 2)
  "664RTSC":    27.60,   // 6×6×4 N3R enclosure          — $24.00 × 1.15 (inv 4)
  "9796":        1.09,   // 2″ KO insulating bushing     — $0.95 × 1.15 (inv 3)
  "9797":        1.73,   // 2-1/2″ KO insulating bushing — $1.50 × 1.15 (inv 1)

  // ────────────────────────────────────────────
  // Misc / Anchors
  // ────────────────────────────────────────────
  "8716E":      14.56,   // Yellow anchor kit             — avg $12.68 × 1.15 (inv 2: $12.00, inv 3: $13.35)
  "8405":        3.27,   // 3/4″ NM lt straight conn     — $2.84 × 1.15 (inv 3)
};
