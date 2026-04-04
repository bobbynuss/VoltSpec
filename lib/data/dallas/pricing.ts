/**
 * DFW / Oncor pricing derived from Elliott Electric Ft. Worth cash-sale invoices.
 *
 * Source invoices (all from Elliott Ft. Worth, Branch 25):
 *   25-76368-01 (03/28/2026) — Fastrac Installation Svcs
 *   25-77345-01 (03/31/2026) — Straight Up Electrical
 *   25-77562-01 (04/01/2026) — HR Phoenix Electrical
 *   25-77654-01 (04/01/2026) — account sale
 *
 * Methodology:
 *   True Unit Cost = Extended Price ÷ Ship Quantity
 *   When a catalog number appears across multiple invoices, values are averaged.
 *   Final Est. Cost = averaged True Unit Cost × 1.15 (+15% markup).
 *
 * Wire / cable items (THHN, SER, XHHW, Romex, Bare Cu) are excluded —
 * those always display "Speak to sales" in VoltSpec.
 */

export const DFW_PRICES: Record<string, number> = {
  // ────────────────────────────────────────────
  // CH-Series Breakers
  // ────────────────────────────────────────────
  "CHF115":     8.33,   // 15A/1P  — avg $7.25 × 1.15  (inv 2,3,4)
  "CHF120":     8.33,   // 20A/1P  — avg $7.25 × 1.15  (inv 2,3,4)
  "CHF220":    19.69,   // 20A/2P  — avg $17.13 × 1.15  (inv 3,4)
  "CHF230":    19.71,   // 30A/2P  — avg $17.14 × 1.15  (inv 2,4)
  "CHF240":    19.49,   // 40A/2P  — avg $16.94 × 1.15  (inv 1,2,4)
  "CHF250":    19.89,   // 50A/2P  — avg $17.30 × 1.15  (inv 2,3,4)
  "CHF260":    18.20,   // 60A/2P  — avg $15.83 × 1.15  (inv 2,4)
  "CH270":     68.49,   // 70A/2P  — $59.56 × 1.15      (inv 1)
  "CHFP120DF": 89.29,   // Dual Function AF/GF 20A — $77.64 × 1.15 (inv 3)

  // ────────────────────────────────────────────
  // Loadcenters & Covers
  // ────────────────────────────────────────────
  "CHP42B200R":   381.09, // 200A MB 42sp N3R         — $331.38 × 1.15 (inv 1)
  "CHP42B200X7":  282.58, // 200A MB 42sp X7          — avg $245.73 × 1.15 (inv 3,4)
  "CHPX7BF":       47.33, // Flush cover X7 MB LC     — avg $41.16 × 1.15 (inv 3,4)
  "CHP42L225X6":  159.32, // 225A MLO 42sp X6         — $138.54 × 1.15 (inv 2)
  "CHPX6LF":       35.77, // Flush cover X6 MLO LC    — $31.10 × 1.15  (inv 2)

  // ────────────────────────────────────────────
  // Meter Sockets & Accessories
  // ────────────────────────────────────────────
  "UTRS213CE":    108.15, // 200A ringless OH/UG      — updated per Bob 04/03/2026
  "ARP00006CH2":   22.66, // 2″ hub closure plate     — avg $19.70 × 1.15 (inv 2,3)

  // ────────────────────────────────────────────
  // Enclosed Circuit Breakers / Safety Switches
  // ────────────────────────────────────────────
  "ECCVH200R":  211.43,  // 200A enclosed CB N3R      — avg $183.85 × 1.15 (inv 2,3,4)
  "DG223URB":   171.73,  // 100A NF safety switch N3R — $149.33 × 1.15 (inv 1)
  "DG222URB":   133.73,  // 60A NF safety switch N3R  — $116.29 × 1.15 (inv 1)

  // ────────────────────────────────────────────
  // Surge Protection
  // ────────────────────────────────────────────
  "CHSPT2ULTRA": 242.25, // Type 2 SPD               — $210.65 × 1.15 (inv 3)
  "CHSPFMKIT":    74.82, // SPD flush-mount kit       — $65.06 × 1.15  (inv 3)

  // ────────────────────────────────────────────
  // Grounding
  // ────────────────────────────────────────────
  "615880":    20.52,  // 5/8″×8′ CU ground rod     — avg $17.85 × 1.15 (inv 2,3)
  "615860":    19.86,  // 5/8″×6′ CU ground rod     — $17.27 × 1.15  (inv 4)
  "GRC3834":    3.47,  // 3/8″-3/4″ ground clamp    — avg $3.02 × 1.15 (inv 2,3,4)
  "G1S":        2.92,  // 1/2-1″ bronze ground clamp — avg $2.54 × 1.15 (inv 2,3,4)
  "GB5":       11.05,  // Ground bar                 — avg $9.61 × 1.15 (inv 2,3,4)
  "GBK14":     18.70,  // Ground bar kit 14-term     — $16.26 × 1.15  (inv 1)
  "GBK21":     32.97,  // Ground bar kit 21-term     — $28.67 × 1.15  (inv 2)

  // ────────────────────────────────────────────
  // Conduit, Weatherheads & Fittings
  // ────────────────────────────────────────────
  "GAL2":      10.56,  // 2″ rigid conduit (per 10′ stick) — avg $9.19 × 1.15 (inv 2,3)
  "1256":      13.54,  // 2″ weatherhead (BRI)       — avg $11.78 × 1.15 (inv 1,2,3,4)
  "386DC":     10.64,  // 2″ insulated grounding bushing — avg $9.25 × 1.15 (inv 2,3,4)
  "326":        0.59,  // 2″ plastic bushing          — avg $0.52 × 1.15 (inv 2,3,4)
  "106S":       1.13,  // 2″ steel locknut            — avg $0.98 × 1.15 (inv 2,4)
  "RF200":     14.13,  // 2″ roof flashing            — avg $12.29 × 1.15 (inv 2,3,4)
  "MWH1":      18.83,  // 1-1/4″–3″ wire holder      — avg $16.37 × 1.15 (inv 2,3,4)
  "TA2":        1.13,  // 2″ PVC male adapter         — avg $0.98 × 1.15 (inv 2,3)
  "1906":       0.80,  // 2″ two-hole rigid strap     — avg $0.70 × 1.15 (inv 2,4)
  "EMT1":       1.51,  // 1″ EMT (per 10′ stick)     — $1.31 × 1.15  (inv 1)
  "SL6":        8.44,  // 2″ sealing locknut          — $7.34 × 1.15  (inv 4)
  "2XC":        4.62,  // 2″ close rigid nipple       — avg $4.02 × 1.15 (inv 2,4)
  "2X3":        5.52,  // 2×3 rigid nipple            — $4.80 × 1.15  (inv 2)
  "2X4":        8.84,  // 2×4 rigid nipple            — $7.69 × 1.15  (inv 4)
  "2X6":       11.80,  // 2×6 rigid nipple            — $10.26 × 1.15 (inv 4)
  "1525DC":     9.43,  // 2″ offset nipple            — $8.20 × 1.15  (inv 4)
  "CHB6":      13.20,  // 2″ commercial hub           — $11.48 × 1.15 (inv 2)
  "DS200H1":   28.19,  // 2″ plate-type hub           — $24.51 × 1.15 (inv 2)
  "DS200H2":   25.79,  // 2″ plate-type hub thru 200A — $22.43 × 1.15 (inv 3)
  "UHS200":    21.19,  // 2″ oil-tight hole seal      — $18.43 × 1.15 (inv 1)

  // ────────────────────────────────────────────
  // Devices, Detectors & Misc
  // ────────────────────────────────────────────
  "1597TRWRW":  23.10,  // 15A TR WR GFCI             — $20.09 × 1.15 (inv 2)
  "SMI100AC":   13.67,  // Smoke detector 120V AC/DC   — $11.89 × 1.15 (inv 2)
  "SMIC0100AC": 53.38,  // Smoke/CO combo 120V         — $46.42 × 1.15 (inv 2)
  "BR220":      14.96,  // BR 20A/2P (if BR needed)    — $13.01 × 1.15 (inv 1)
  "W201":        9.75,  // Wedge clamp                 — $8.48 × 1.15  (inv 2)
  "B114RUPC":    1.53,  // 1G N MBlue workbox          — $1.33 × 1.15  (inv 2)
};
