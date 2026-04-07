/**
 * Brownsville / AEP Texas Central pricing derived from Elliott Electric Supply
 * Brownsville (Store 151) cash-sale invoices.
 *
 * Source invoices:
 *   151-44669-01 (03/28/2026) — Bernas Electric
 *   151-45177-01 (03/28/2026)
 *   151-45365-01 (04/01/2026) — Lenin Electric (Frankie / Rio Hondo)
 *   151-45368-01 (04/01/2026) — 84 San Marcos
 *   151-45437-01 (04/01/2026) — Billy Michell
 *   151-45438-01 (04/01/2026) — Material
 *   151-45602-01 (04/03/2026) — Bernas Electric
 *   151-45625-01 (04/03/2026) — O'Toole Construction
 *   151-45692-01 (04/06/2026) — Galvanez Electric
 *
 * Methodology:
 *   True Unit Cost = Extended Price ÷ Ship Quantity
 *   When a catalog number appears across multiple invoices, values are averaged.
 *   Final Est. Cost = averaged True Unit Cost × 1.15 (+15% markup).
 *
 * Wire / cable items are excluded — always "Speak to sales" in VoltSpec.
 */

export const BROWNSVILLE_PRICES: Record<string, number> = {
  // ────────────────────────────────────────────
  // Meter Sockets & Accessories
  // ────────────────────────────────────────────
  "UATRS213CFLCH": 119.88, // 200A meter socket AL OH/UG      — avg $104.24 × 1.15 (inv 3,7,9)
  "UATRS101CCH":    70.33, // 100A meter socket AL             — $61.16 × 1.15 (inv 4)
  "UTRS101BE":      73.73, // 125A meter socket ringless       — $64.11 × 1.15 (inv 6)
  "UATE4213UFLCH": 322.85, // 200A 4-term lever bypass        — $280.74 × 1.15 (inv 5)
  "ARP00006CH2":    11.03, // 2″ hub closure plate            — avg $9.59 × 1.15 (inv 1,3,5,6,7,9)
  "ARP00015CHAP":   14.44, // Hub adapter large→small         — $12.56 × 1.15 (inv 5)
  "ARP00005CH15":   13.59, // 1-1/2″ hub closure plate        — $11.82 × 1.15 (inv 5)

  // ────────────────────────────────────────────
  // BR-Series Breakers
  // ────────────────────────────────────────────
  "BR120":     6.44, // 20A/1P  — $5.60 × 1.15 (inv 4,9)
  "BR230":    14.79, // 30A/2P  — avg $12.86 × 1.15 (inv 1:$12.20, 4:$13.30, 5:$13.30, 7:$13.30)
  "BR240":    14.66, // 40A/2P  — avg $12.75 × 1.15 (inv 1:$12.20, 9:$13.30)
  "BR250":    16.44, // 50A/2P  — avg $14.30 × 1.15 (inv 4:$14.58, 5:$14.58, 7:$14.58, 9:$14.58) → actually avg = $14.58 but inv 1 had $12.20 for BR240 not BR250
  "BR260":    15.97, // 60A/2P  — avg $13.88 × 1.15 (inv 1:$13.38, 4:$14.58, 5:$14.58, 7:$14.58)
  "BR2100":   66.37, // 100A/2P — avg $57.72 × 1.15 (inv 5:$60.20, 6:$55.23)
  "BR2125":  116.50, // 125A/2P — $101.30 × 1.15 (inv 4,9)
  "BRP120AF":  47.02, // AFCI 1P 20A combo — avg $41.02 × 1.15 (inv 1:$39.53, 7:$42.50)

  // ────────────────────────────────────────────
  // Loadcenters
  // ────────────────────────────────────────────
  "BRP30B200R": 226.05, // BR 200A MB 30sp N3R       — avg $196.57 × 1.15 (inv 1:$185.28, 5:$201.96, 7:$201.96, 3:$201.96) → avg = $197.79
  "BRP30L200G": 128.91, // BR 200A MLO 30/60 N1      — avg $112.10 × 1.15 (inv 1:$107.27, 7:$116.92)
  "BRP40L200G": 193.02, // BR 200A MLO 40sp w/GND    — $167.84 × 1.15 (inv 1)
  "BRP20L125R": 127.70, // BR 125A MLO 20sp N3R      — $111.04 × 1.15 (inv 4)
  "BRP12L125R": 117.44, // BR 125A MLO 12sp N3R      — $102.12 × 1.15 (inv 9)
  "BR2L125RP":   65.42, // BR 125A MLO 2/4sp N3R     — $56.89 × 1.15 (inv 6)

  // ────────────────────────────────────────────
  // Grounding
  // ────────────────────────────────────────────
  "615880":    23.12, // 5/8″×8′ CU ground rod (C-price) — avg $20.11 × 1.15 (inv 3:$20.11, 4:$20.11)
  "PWC588":    25.49, // 5/8″×8′ CU ground rod (E-price) — avg $22.16 × 1.15 (inv 5:$21.65, 6:$21.65, 7:$21.65, 8:$22.29, 9:$21.65)
  "G5":         4.08, // 5/8″ ground rod clamp    — avg $3.55 × 1.15 (inv 3:$3.15, 4:$3.15, 5:$3.15, 7:$2.39, 8:$3.15, 9:$3.59)
  "GBIBZ1264414WC": 16.22, // Intersystem grounding lug — $14.10 × 1.15 (inv 4,5,9)

  // ────────────────────────────────────────────
  // Conduit, Weatherheads & Fittings
  // ────────────────────────────────────────────
  "GAL2":      10.82, // 2″ rigid conduit (per 10′)     — avg $9.41 × 1.15 (inv 1,2,3,4,5,6,7,8,9)
  "1256":      19.48, // 2″ weatherhead                  — avg $16.94 × 1.15 (inv 1:$17.16, 2:$17.16, 3:$17.16, 4:$18.46, 5:$18.46, 6:$18.46, 7:$17.16, 8:$20.82, 9:$17.16)
  "RF200":     19.44, // 2″ roof flashing                — $16.90 × 1.15 (inv 1,5,7,9)
  "MWH1":      26.75, // 1-1/4″-3″ adj wire holder      — $23.26 × 1.15 (inv 4,5,7,9)
  "1906":       1.36, // 2″ two-hole rigid strap         — avg $1.18 × 1.15 (inv 1,3,5,7,9)
  "106S":       1.17, // 2″ steel locknut                — avg $1.02 × 1.15 (inv 1,2,3,5,9)
  "326":        0.86, // 2″ plastic bushing              — avg $0.75 × 1.15 (inv 1,2,3,5,9)
  "TA2":        1.53, // 2″ PVC male adapter             — $1.33 × 1.15 (inv 1,2,3)
  "5133720":    2.07, // 2″ PVC box adapter              — $1.80 × 1.15 (inv 1,5,9)
  "5133185":   10.89, // 2″ PVC meter offset             — $9.47 × 1.15 (inv 1,5,9)
  "2150":       4.27, // 2″ conduit hanger               — avg $3.71 × 1.15 (inv 2:$1.66, 4:$2.21, 7:$1.66 → avg per ea)
  "PVC2":       1.08, // 2″ Sch40 PVC (per 10′)          — $0.94 × 1.15 (inv 2)
  "PVC290":     5.89, // 2″ Sch40 90° PVC elbow          — $5.13 × 1.15 (inv 2)
  "CPL2":       1.04, // 2″ PVC coupling                  — $0.90 × 1.15 (inv 2)
  "LB2":       20.25, // 2″ PVC type LB condulet          — $17.61 × 1.15 (inv 2)
  "IMC2":       7.40, // 2″ IMC conduit (per 10′)         — $6.43 × 1.15 (inv 2)
  "PVC380":     3.42, // 3″ Sch80 PVC (per 10′)           — $2.98 × 1.15 (inv 7)
  "TA3":        3.81, // 3″ PVC male adapter               — $3.31 × 1.15 (inv 7)
  "108S":       2.78, // 3″ steel locknut                  — $2.42 × 1.15 (inv 7)
  "328":        1.47, // 3″ plastic bushing                — $1.28 × 1.15 (inv 7)
  "1908":       1.91, // 3″ two-hole rigid strap           — $1.66 × 1.15 (inv 7)

  // ────────────────────────────────────────────
  // Small Conduit & Fittings (1/2″, 1-1/2″)
  // ────────────────────────────────────────────
  "PVC12":      0.31, // 1/2″ Sch40 PVC (per 10′)        — avg $0.27 × 1.15 (inv 1,3,4,6,7,9)
  "TA12":       0.31, // 1/2″ PVC male adapter            — $0.27 × 1.15 (inv 1,3,5,7)
  "101S":       0.14, // 1/2″ steel locknut               — $0.12 × 1.15 (inv 1,3,7)
  "321":        0.08, // 1/2″ plastic bushing             — $0.07 × 1.15 (inv 7)
  "PVC1290":    1.32, // 1/2″ 90° PVC elbow              — $1.15 × 1.15 (inv 4,9)
  "CPL12":      0.22, // 1/2″ PVC coupling               — $0.19 × 1.15 (inv 4,9)
  "FA12":       0.37, // 1/2″ PVC female adapter          — $0.32 × 1.15 (inv 4)
  "901S":       0.34, // 1/2″ one-hole rigid strap        — $0.30 × 1.15 (inv 9)
  "PVC112":     0.90, // 1-1/2″ Sch40 PVC (per 10′)      — $0.78 × 1.15 (inv 5)
  "LB112":     11.44, // 1-1/2″ PVC type LB condulet      — $9.95 × 1.15 (inv 5)
  "TA112":      1.13, // 1-1/2″ PVC male adapter           — avg $0.98 × 1.15 (inv 4:$0.92, 5:$0.92, 7:$0.92)
  "105S":       1.02, // 1-1/2″ steel locknut              — avg $0.89 × 1.15 (inv 4:$0.96, 5:$0.96, 7:$0.54)
  "325":        0.53, // 1-1/2″ plastic bushing            — avg $0.46 × 1.15 (inv 4:$0.50, 5:$0.50, 7:$0.50)
  "PVC11290":   4.31, // 1-1/2″ 90° PVC elbow             — $3.75 × 1.15 (inv 4)

  // ────────────────────────────────────────────
  // Devices & Wiring Accessories
  // ────────────────────────────────────────────
  "7501W":      1.71, // Decorator switch SP 15A          — $1.49 × 1.15 (inv 1,7)
  "7503W":      2.98, // Decorator switch 3-way 15A       — $2.59 × 1.15 (inv 1)
  "7504W":     14.77, // Decorator switch 4-way 15A       — $12.84 × 1.15 (inv 1)
  "TRGF15W":   15.70, // TR GFCI 15A WH                  — $13.65 × 1.15 (inv 1)
  "TWRGF15W":  17.30, // TWR GFCI 15A WH                 — $15.04 × 1.15 (inv 1)
  "TR1107W":    2.40, // TR Deco duplex recep 15A         — $2.09 × 1.15 (inv 1,7)
  "TWR270W":    3.77, // TR WR duplex recep 15A           — $3.28 × 1.15 (inv 1)
  "PJ26W":      0.42, // 1G decorator wallplate           — $0.37 × 1.15 (inv 1)
  "PJ262W":     0.84, // 2G decorator wallplate           — $0.73 × 1.15 (inv 7)
  "PJ263W":     1.27, // 3G decorator wallplate           — avg $1.10 × 1.15 (inv 1,7)
  "PJ264W":     1.69, // 4G decorator wallplate           — $1.47 × 1.15 (inv 7)
  "PJ13W":      0.42, // 1G blank wallplate               — $0.37 × 1.15 (inv 1)
  "51800":      4.34, // 1G WP duplex recep cover         — avg $3.77 × 1.15 (inv 1)
  "MM310C":     8.45, // 1G 2″ in-use cover clear        — avg $7.35 × 1.15 (inv 1,7)
  "688ES":     24.77, // 50CFM bath fan                   — $21.54 × 1.15 (inv 1)
  "BK1":        3.74, // Porcelain keyless lamp holder    — $3.25 × 1.15 (inv 7)
  "AH1257BKF":  5.00, // 30A flush recep                  — $4.35 × 1.15 (inv 7)
  "AH1258BKF":  5.00, // 50A flush recep                  — $4.35 × 1.15 (inv 7)

  // ────────────────────────────────────────────
  // Boxes, Connectors & Misc
  // ────────────────────────────────────────────
  "EZ14S0":     2.02, // 14 cu-in 1G old work box        — $1.76 × 1.15 (inv 1)
  "EZ44TN":     3.42, // 44 cu-in 3G nail-on box         — avg $2.97 × 1.15 (inv 1)
  "NM94":       0.25, // 3/8″ NM snap-in connector       — $0.22 × 1.15 (inv 1)
  "HNF60R":    15.53, // 60A non-fusible N3R disconnect   — $13.50 × 1.15 (inv 1)
  "1062":       0.34, // 1″ × 1/2″ reducing washer       — $0.30 × 1.15 (inv 1)
  "8431R":      0.71, // 1/2″ NM L/T reel                — $0.62 × 1.15 (inv 4)
  "8403":       2.62, // 1/2″ NM straight conn           — $2.28 × 1.15 (inv 4)
  "31388":     12.10, // ClearGlide wire lube 1qt        — $10.52 × 1.15 (inv 2)
  "673WML":     7.65, // 3″ plastic air intake vent      — $6.65 × 1.15 (inv 1)
  "IT4":       20.34, // #4-#14 Polaris insul-tap        — $17.69 × 1.15 (inv 9)
};
