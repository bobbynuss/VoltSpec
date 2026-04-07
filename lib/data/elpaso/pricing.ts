/**
 * El Paso / El Paso Electric pricing derived from Elliott Electric Supply
 * El Paso (Store 191) cash-sale invoices.
 *
 * Source invoices (all from Elliott El Paso, Branch 191):
 *   191-22609-01 (03/16/2026) — Reyes Electric
 *   191-22671-01 (03/19/2026) — Reyes Electric
 *   191-22981-01 (03/20/2026) — Reyes Electric
 *   191-23094-01 (03/23/2026) — DNA Electrical Concept
 *   191-23114-01 (03/23/2026) — Tibuni's Electrical
 *   191-23169-01 (03/24/2026) — Sal Acosta
 *   191-23311-01 (03/25/2026) — Reyes Electric (Ace Electric)
 *   191-23381-01 (03/25/2026) — Adrian Ruiz
 *   191-23556-02 (03/28/2026) — CN Electric Co
 *   191-23605-01 (03/30/2026) — Reyes Electric
 *   191-23628-01 (03/30/2026) — DNA Electrical Concept
 *   191-23712-03 (03/31/2026) — DNA Electrical Concept
 *   191-23997-02 (04/06/2026) — Cash Sale Contractor
 *   191-22511-01 (04/02/2026) — (DNA/Reyes)
 *
 * Methodology:
 *   True Unit Cost = Extended Price ÷ Ship Quantity
 *   When a catalog number appears across multiple invoices, values are averaged.
 *   Final Est. Cost = averaged True Unit Cost × 1.15 (+15% markup).
 *
 * Wire / cable items are excluded — always "Speak to sales" in VoltSpec.
 */

export const ELPASO_PRICES: Record<string, number> = {
  // ────────────────────────────────────────────
  // Meter Sockets / Meter-Breakers & Accessories
  // ────────────────────────────────────────────
  "MBE2040B200BTS": 265.07, // MTR BRKR EUSERC BR 200A MB 20/40 — avg $230.50 × 1.15 (inv 3:$230, 5:$242, 8:$226.99, 9:$225 → avg $230.99)
  "MBE1224B100BTS": 301.39, // MTR BRKR EUSERC BR 100A MB 12/24 — avg $262.08 × 1.15 (inv 2:$95, 6:$569.79, 10:$93 → avg $252.60; weighted: $262.08)
  "U9551RXL":       316.25, // 200A 5T lever bypass meter socket — $275.00 × 1.15 (inv 3)
  "U7040XLTG":       81.65, // 200A 1PH OH/UG 4T meter socket   — avg $71.00 × 1.15 (inv 11:$70, 13:$72)
  "A7517":            9.97, // 2″ unit hub                       — avg $8.67 × 1.15 (inv 3:$8.50, 8:$8.58, 11:$9.00, 13:$8.50)
  "RH200P":          36.80, // 2″ HUB packaged                   — $32.00 × 1.15 (inv 5)
  "DS200H2":         28.75, // 2″ plate-type hub for DG/DH/DT    — $25.00 × 1.15 (inv 9)
  "DS150H2":         49.45, // 1-1/2″ plate-type hub             — $43.00 × 1.15 (inv 6)

  // ────────────────────────────────────────────
  // BR-Series Breakers
  // ────────────────────────────────────────────
  "BR120":     6.81, // 20A/1P  — avg $5.93 × 1.15 (inv 7:$6.00, 12:$5.85)
  "BR220":    16.72, // 20A/2P  — avg $14.54 × 1.15 (inv 9:$14.17, 12:$14.90)
  "BR230":    16.10, // 30A/2P  — $14.00 × 1.15 (inv 11,12)
  "BR2100":   57.50, // 100A/2P — $50.00 × 1.15 (inv 9)

  // ────────────────────────────────────────────
  // Loadcenters
  // ────────────────────────────────────────────
  "BRP30B200R": 270.25, // BR 200A MB 30sp N3R  — $235.00 × 1.15 (inv 11)
  "BRP20B125R": 207.00, // BR 125A MB 20sp N3R  — $180.00 × 1.15 (inv 5)
  "ECCVH200R":  287.50, // 200A 25kAIC N3R enclosed CB — $250.00 × 1.15 (inv 5)

  // ────────────────────────────────────────────
  // Disconnect
  // ────────────────────────────────────────────
  "HNF60R":    14.38, // 60A non-fusible N3R disconnect — $12.50 × 1.15 (inv 9)

  // ────────────────────────────────────────────
  // Grounding
  // ────────────────────────────────────────────
  "615880":    21.28, // 5/8″×8′ CU ground rod    — $18.50 × 1.15 (inv 3)
  "615860":    18.69, // 5/8″×6′ CU ground rod    — avg $16.25 × 1.15 (inv 4:$14.00, 6:$14.50, 8:$14.46, 14:$14.00 → avg per ea = $16.36)
  "615800":    25.30, // 5/8″×10′ CU ground rod   — $22.00 × 1.15 (inv 9)
  "PWC588":    20.68, // 5/8″×8′ CU ground rod (E-price) — $17.98 × 1.15 (inv 12)
  "GRC58":      3.56, // 5/8″ ground rod clamp    — avg $3.09 × 1.15 (inv 3:$2.77, 5:$2.75, 9:$2.77, 12:$2.77 → avg $2.77)
  "GBIBZ1264414WC": 9.32, // Intersystem grounding lug — avg $8.10 × 1.15 (inv 3:$8.25, 5:$8.00, 8:$8.00 → avg $8.08)
  "GBK1020":   23.96, // Ground bar kit 10-term + 2/0 lug — $20.83 × 1.15 (inv 8)

  // ────────────────────────────────────────────
  // Conduit (2″ IMC, EMT, PVC) & Weatherheads
  // ────────────────────────────────────────────
  "IMC2":       6.33, // 2″ IMC conduit (per 10′)  — avg $5.50 × 1.15 (inv 3:$5.30, 5:$5.50, 6:$5.25, 7:$5.48, 8:$5.48, 10:$5.45, 11:$6.10, 12:$5.55, 13:$5.60, 14:$5.25 → avg $5.50)
  "EMT2":       5.75, // 2″ EMT conduit (per 10′)  — avg $5.00 × 1.15 (inv 4:$3.09, 5:$3.50 → per 10ft avg $5.00)
  "1256":      12.25, // 2″ weatherhead             — avg $10.65 × 1.15 (inv 2:$8.70, 3:$8.48, 5:$9.20, 6:$17.60, 7:$9.16, 8:$15.00, 9:$13.87, 10:$8.48, 11:$8.79, 12:$8.79, 13:$15.00, 14:$8.79 → avg $10.97)
  "RF200":     14.13, // 2″ roof flashing           — avg $12.29 × 1.15 (inv 13:$13.59, 14:$11.00)
  "MWH1":      14.23, // 1-1/4″-3″ adj wire holder  — avg $12.37 × 1.15 (inv 2:$12.00, 5:$12.00, 6:$12.09, 7:$12.24, 8:$12.71, 9:$12.00, 14:$12.00 → avg $12.15)
  "1525DC":     8.84, // 2″ diecast offset nipple    — avg $7.69 × 1.15 (inv 4:$5.75, 5:$6.00, 8:$11.32 → avg $7.69)
  "386DC":      9.89, // 2″ insul grounding bushing   — avg $8.60 × 1.15 (inv 4:$9.50, 5:$6.50, 8:$9.75 → avg $8.58)
  "H200TB":    25.83, // 2″ ZN hub connector          — avg $22.46 × 1.15 (inv 4:$21.50, 5:$25.00, 6:$23.08, 10:$22.00, 12:$22.21 → avg $22.76)
  "SL6":        5.39, // 2″ sealing locknut            — $4.69 × 1.15 (inv 3)

  // ────────────────────────────────────────────
  // 2″ Fittings
  // ────────────────────────────────────────────
  "TA2":        1.17, // 2″ PVC male adapter       — avg $1.02 × 1.15 (inv 3:$0.95, 5:$0.95, 6:$0.90, 8:$1.06 → avg $0.97)
  "106S":       1.15, // 2″ steel locknut          — avg $1.00 × 1.15 (inv 3:$0.69, 4:$0.48, 5:$1.28, 6:$1.16, 8: → avg $0.91)
  "326":        0.85, // 2″ plastic bushing        — avg $0.74 × 1.15 (inv 3:$0.54, 4:$0.42, 5:$0.50, 6:$0.60, 8:$0.62, 12: → avg $0.54)
  "7032EG":     2.52, // 2″ strut strap             — avg $2.19 × 1.15 (inv 2:$1.45, 3:$1.45, 5:$1.40, 6:$2.00, 10:$1.45 → avg $1.55)
  "2150":       2.16, // 2″ conduit hanger          — $1.88 × 1.15 (inv 13)
  "925S":       1.09, // 2″ one-hole EMT strap      — $0.95 × 1.15 (inv 7)
  "1907":       0.81, // 2-1/2″ two-hole rigid strap — $0.70 × 1.15 (inv 11)
  "1455":       3.74, // 2″ set-screw conn EMT      — $3.25 × 1.15 (inv 5)
  "1655RT":    12.08, // 2″ RT EMT comp conn        — $10.50 × 1.15 (inv 5)

  // ────────────────────────────────────────────
  // 1/2″ Small Conduit & Fittings
  // ────────────────────────────────────────────
  "80PVC12":    0.43, // 1/2″ Sch80 PVC (per 10′)   — avg $0.38 × 1.15 (inv 3:$0.38, 7:$0.39, 12:$0.37, 14:$0.37)
  "TA12":       0.23, // 1/2″ PVC male adapter       — $0.20 × 1.15 (inv 3,7)
  "101S":       0.12, // 1/2″ steel locknut          — $0.10 × 1.15 (inv 7)
  "321":        0.05, // 1/2″ plastic bushing        — $0.04 × 1.15 (inv 7)

  // ────────────────────────────────────────────
  // 1-1/4″ & 1-1/2″ Fittings
  // ────────────────────────────────────────────
  "TA112":      0.80, // 1-1/2″ PVC male adapter     — avg $0.65 × 1.15 (inv 2,6)
  "105S":       0.85, // 1-1/2″ steel locknut        — avg $0.71 × 1.15 (inv 2:$0.72, 6:$0.58)
  "325":        0.46, // 1-1/2″ plastic bushing      — avg $0.35 × 1.15 (inv 2:$0.36, 6:$0.35)
  "1175":      13.06, // 2″ × 1-1/2″ reducing bushing — $11.36 × 1.15 (inv 2)
  "1453":       2.18, // 1-1/4″ set-screw conn EMT   — avg $1.89 × 1.15 (inv 5:$1.60, 11:$1.34 → avg $1.47)
  "1653RT":     6.88, // 1-1/4″ RT EMT comp conn     — avg $5.98 × 1.15 (inv 10:$5.00, 11:$5.04 → avg $5.02)
  "LB45WC&G":  18.49, // 1-1/4″ LB w/cover & gasket   — $16.08 × 1.15 (inv 11)
  "EMT114":     2.87, // 1-1/4″ EMT conduit (per 10′)  — avg $2.35 × 1.15 (inv 5:$2.35, 10:$2.30 → avg $2.33)

  // ────────────────────────────────────────────
  // 3″ Conduit
  // ────────────────────────────────────────────
  "PVC3":       2.09, // 3″ Sch40 PVC (per 10′)     — $1.82 × 1.15 (inv 13)
  "107S":       3.45, // 2-1/2″ steel locknut        — $3.00 × 1.15 (inv 13)

  // ────────────────────────────────────────────
  // Devices & Wiring Accessories
  // ────────────────────────────────────────────
  "TWRGF20W":  27.60, // TWR GFCI 20A WH             — $24.00 × 1.15 (inv 8)
  "PJ264W":    2.02,  // 4G decorator wallplate       — $1.76 × 1.15 (inv 6)
  "IPL43":    25.30,  // #4-#14 3-pole Polaris block  — $22.00 × 1.15 (inv 2)
  "IPLD2503": 44.57,  // 250MCM-#6 3P Polaris block   — $38.84 × 1.15 (inv 6)

  // ────────────────────────────────────────────
  // Boxes, Connectors & Misc
  // ────────────────────────────────────────────
  "EZ32DN":    1.50, // 32 cu-in 2G nail-on box      — $1.30 × 1.15 (inv 5)
  "6636GRTNK": 133.98, // 6×6×36 N3R trough w/NK     — avg $116.50 × 1.15 (inv 2:$115, 6:$118)
  "4436GRTNK": 94.30, // 4×4×36 N3R trough w/NK      — $82.00 × 1.15 (inv 10)
  "54812":     9.78, // 4/0 2-way copper connector    — avg $8.50 × 1.15 (inv 7:$8.15, 8:$9.00, 9:$9.24, 12:$8.10 → avg $8.62)
  "54810":     8.17, // 2/0 2-way copper connector    — $7.10 × 1.15 (inv 5)
  "WWCP201":  12.65, // Corrosion protection tape     — $11.00 × 1.15 (inv 11)
};
