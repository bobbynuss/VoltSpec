/**
 * Shared Elliott Electric vendor code resolution.
 *
 * RULES (strict):
 *  - ALL copper wire/cable  → COP  (THHN, THWN, RX, Romex/NM-B, Bare Cu, TC, copper XHHW)
 *  - ALL aluminum wire/cable → ALU  (SER, SEU, URD, aluminum XHHW, USE-2 AL)
 *  - CH-series breakers      → CHD
 *  - BR-series breakers      → ETN
 *  - Pow-R-Line components   → CHS
 *
 * This module is the SINGLE SOURCE OF TRUTH.
 * ResultsPanel, generatePDF, QuoteRequestModal, and the API route all import from here.
 */

// ── Extract part number from spec string ────────────────────────────────────

export function extractPartNumber(spec: string): string | null {
  // Pattern 1: after a known vendor/brand prefix
  const vendorMatch = spec.match(
    /(?:Eaton|Carlon|Erico|Leviton|Southwire|Bridgeport|Burndy|Polaris|Taymac|Pentair|NSI|Generac|Kohler|SolarEdge|Enphase|ChargePoint|Midnite Solar|Allied|Regal|Thomas\s*&\s*Betts|Crouse-Hinds|Kichler|Brady|Gardner\s*Bender|PECO|ALU|COP|CON|BRI|CRS|TAM|GNR|AMF|ALF|PVC|PVF|PEC|M-W|MIB)\s+([A-Z0-9][A-Z0-9\-]{1,})/i
  );
  if (vendorMatch) return vendorMatch[1].replace(/-+$/, "");
  // Pattern 2: after " - " separator
  const dashMatch = spec.match(/\s-\s([A-Z0-9][A-Z0-9\-]{3,})\b/i);
  if (dashMatch) return dashMatch[1].replace(/-+$/, "");
  // Pattern 3: standalone alphanumeric part number
  const standaloneMatch = spec.match(
    /\b([A-Z]{1,6}[0-9]{2,}[A-Z0-9\-]*|[0-9]{1,3}[A-Z]{2,}[0-9A-Z\-]*|[0-9]{4,}[A-Z0-9]{2,})\b/
  );
  if (standaloneMatch) return standaloneMatch[1];
  return null;
}

// ── Determine Elliott vendor code ───────────────────────────────────────────

export function elliottVendorCode(part: string, spec: string): string | null {
  const p = part.toUpperCase();
  const s = spec.toUpperCase();

  // ══════════════════════════════════════════════════════════════════════════
  // WIRE / CABLE — These rules are ABSOLUTE. No wire item should ever get
  // a vendor code other than COP (copper) or ALU (aluminum).
  // ══════════════════════════════════════════════════════════════════════════

  // ── Copper wire & cable → COP ───────────────────────────────────────────
  // THHN/THWN (always copper in our specs)
  if (/^(?:BARE|THHN|THWN|RX\d)/.test(p)) return "COP";
  if (/\bTHHN\b|\bTHWN\b/.test(s) && !/\bALUMINUM\b/.test(s)) return "COP";
  // Romex / NM-B
  if (/^NM/.test(p) || /\bROMEX\b|\bNM-B\b/.test(s)) return "COP";
  // TC (tray cable) copper
  if (/^TC\d/.test(p) || (/\bTRAY\s*CABLE\b/.test(s) && !/\bALUMINUM\b/.test(s))) return "COP";
  // Bare copper ground wire
  if (/\bBARE\s*COPPER\b|\bBARE\s*CU\b/.test(s)) return "COP";
  if (/\bGEC\b/.test(s) && /\bCOPPER\b/.test(s)) return "COP";
  // Copper XHHW (explicitly says copper)
  if (/\bXHHW\b/.test(s) && /\bCOPPER\b/.test(s)) return "COP";

  // ── Aluminum wire & cable → ALU ─────────────────────────────────────────
  if (/^(?:XHHW|URD|SER\d|SEU\d)/.test(p)) return "ALU";
  if (/\bAL\s+SER\b|\bAL\s+SEU\b|\bALUMINUM\b.*\b(?:SER|SEU|XHHW|URD|USE)\b/.test(s)) return "ALU";
  if (/\bSER\b.*\bALUMINUM\b|\bSEU\b.*\bALUMINUM\b/.test(s)) return "ALU";
  // Catch-all: any SER/SEU/URD mention in spec
  if (/\bSER\s+CABLE\b|\bSEU\s+CABLE\b|\bURD\b/.test(s)) return "ALU";
  // USE-2 aluminum
  if (/\bUSE-2\b/.test(s) && /\bAL\b|\bALUMINUM\b/.test(s)) return "ALU";

  // ── MC / Armor clad cable → ALF ────────────────────────────────────────
  if (/^(?:MC|AC|BX|ACWU|MCAP)/.test(p) || /\bMC CABLE\b|\bARMOR.CLAD\b/.test(s)) return "ALF";

  // ══════════════════════════════════════════════════════════════════════════
  // NON-WIRE ITEMS
  // ══════════════════════════════════════════════════════════════════════════

  // ── Liquidtight flex conduit & connectors ───────────────────────────────
  if (/^STR\d/.test(p) || /\bLIQUIDTIGHT\b.*\b(CONNECTOR|FITTING|STRAIGHT|ANGLE|90)\b/.test(s)) return "AMF";
  if (/^LT(?:12|34|38|1\b|112|2\b|3\b)/.test(p)) return "ALF";
  if (/\bLIQUIDTIGHT\b/.test(s) && /\bCONDUIT\b|\bFLEX\b/.test(s) && !/\bCONNECTOR\b|\bFITTING\b/.test(s)) return "ALF";
  if (/carflex|carlon.*flex|ltfca/i.test(s)) return "SPX";
  if (/\bFLEX(IBLE)?\s+METAL\b|\bFMC\b/.test(s)) return "ALF";

  // ── EMT conduit & fittings ──────────────────────────────────────────────
  if (/^EMT\d/.test(p) || (/\bEMT\b/.test(s) && /\bCONDUIT\b/.test(s) && !/\bFITTING\b|\bCONNECTOR\b|\bCOUPLING\b|\bSTRAP\b/.test(s))) return "CON";
  if (/^GAL/.test(p) || (/\bRIGID\b|\bRMC\b|\bIMC\b/.test(s) && /\bCONDUIT\b/.test(s) && !/\bPVC\b/.test(s))) return "CON";
  // EMT connectors — Bridgeport numeric codes
  if (/^(?:230|231|232|233|234|235|290|291|292|293|294|295)$/.test(p)) return "BRI";
  if (/^(?:240|241|242|243|244|245)$/.test(p)) return "BRI";
  if (/^(?:920S|921S|922S|923S|924S|930S|931S|932S|933S|934S)$/.test(p)) return "BRI";
  if (/^MWH\d/.test(p)) return "BRI";
  if (/bridgeport/i.test(s) || /\bBRI\b/.test(s)) return "BRI";

  // ── M-W (service hardware) ──────────────────────────────────────────────
  if (/^(?:MWK|MW\d|SW\d)/.test(p) || /\bM-W\b/.test(s)) return "M-W";

  // ── Milbank meter sockets → MIB ─────────────────────────────────────────
  if (/^U\d{3,4}/.test(p) || /\bmilbank\b/i.test(s)) return "MIB";

  // ── PVC conduit sticks → PVC ────────────────────────────────────────────
  if (/^PVC\d/.test(p)) return "PVC";
  if (/^(?:80PVC|40PVC|DB\d|EB\d)/.test(p) || (/\bPVC\b/.test(s) && /\bCONDUIT\b/.test(s) && !/\bELBOW\b|\bFITTING\b|\bCOUPLING\b|\bADAPTER\b/.test(s))) return "PVC";

  // ── PVC fittings → PVF ─────────────────────────────────────────────────
  if (/^\d{1,3}ELL9/.test(p)) return "PVF";
  if (/^\d{1,3}ELL4/.test(p)) return "PVF";
  if (/^TA\d/.test(p)) return "PVF";
  if (/^FA\d/.test(p)) return "PVF";
  if (/^CPL\d/.test(p)) return "PVF";
  if (/^(?:LB\d|LL\d|LR\d|E\d{3}|A\d{2,3}|CP\d|UA\d)/.test(p)) return "PVF";
  if (/\bPVC\b/.test(s) && /\b(FITTING|ELBOW|ELL|LB|LL|LR|COUPLING|ADAPTER|SWEEP)\b/.test(s)) return "PVF";

  // ── Condulet bodies, 4-square boxes (Crouse-Hinds / CRS) ───────────────
  if (/^LB\d{2,3}$/.test(p)) return "CRS";
  if (/^TP\d/.test(p)) return "CRS";
  if (/crouse.hinds/i.test(s)) return "CRS";

  // ── In-use / weatherproof covers (Taymac) ──────────────────────────────
  if (/^(?:MM\d|MX\d|MID\d|MMKD|MM2)/.test(p) || /\btaymac\b/i.test(s)) return "TAM";

  // ── Duct seal (PECO) ───────────────────────────────────────────────────
  if (/^DS\d/.test(p) || /\bpeco\b/i.test(s) || /\bduct\s+seal\b/i.test(s)) return "PEC";

  // ── Wiring devices (switches, receptacles, dimmers, wall plates, smoke/CO) → EWD ──
  // GFCI receptacles
  if (/^TWRGF/.test(p)) return "EWD";
  if (/^TRGF/.test(p)) return "EWD";
  // TR receptacles & general devices
  if (/^(?:TRBR|TR\d|GFTR|5262|5352|1257|CR|TRS|1450)/.test(p)) return "EWD";
  // Eaton Decora switches (7501W, 7503W, etc.)
  if (/^7[0-9]{3}/.test(p)) return "EWD";
  // Eaton dimmers (DAL, SGD, etc.)
  if (/^(?:DAL|SGD|DI\d|SAL)/.test(p)) return "EWD";
  // Eaton wall plates (PJ series)
  if (/^PJ\d/.test(p)) return "EWD";
  // Eaton NEMA receptacles (1450R, etc.) — non-TR flush/range/dryer
  if (/^1[24]50R/.test(p)) return "EWD";
  // Smoke & CO detectors (Eaton SMI/SMIC series)
  if (/^SMI/.test(p) || /\bsmoke\b.*\bdetector\b/i.test(s) || /\bsmoke\/CO\b/i.test(s)) return "EWD";
  // Leviton override
  if (/leviton/i.test(s) && /^(?:TR|GFTR|279|260|261|5262)/.test(p)) return "LEV";
  if (/^(?:DVCL|DVWCL|CTCL|MACL|MSCL|PD|RRD|STCL|MRF)/.test(p) || /lutron/i.test(s)) return "LUT";

  // ── Wire connectors (Ideal, Wago, Gardner Bender) → IDL ────────────────
  if (/^30-/.test(p) || /\bideal\b/i.test(s) || /\bwire\s*nut\b/i.test(s)) return "IDL";
  if (/^221-/.test(p) || /\bwago\b/i.test(s) || /\blever.nut\b/i.test(s)) return "WAG";

  // ── Eaton Pow-R-Line panels & components → CHS ─────────────────────────
  if (/^PRL[123][AX]/.test(p)) return "CHS";
  if (/^LUGKIT/.test(p)) return "CHS";
  if (/^PDG/.test(p)) return "CHS";
  if (/^EZ[BT]\d/.test(p)) return "CHS";
  if (/^5158C/.test(p)) return "CHS";
  if (/^BK[DG]\d/.test(p)) return "CHS";
  if (/^(?:CUGROUND|ISOGROUND)$/.test(p)) return "CHS";
  if (/^GWPBQ/.test(p)) return "CHS";
  if (/^SFBCVR/.test(p)) return "CHS";
  if (/^[12]NK\d/.test(p)) return "CHS";
  if (/pow.r.(?:line|xpress)/i.test(s)) return "CHS";

  // ── Eaton BR-series loadcenters & breakers → ETN ───────────────────────
  if (/^BR/.test(p)) return "ETN";

  // ── Eaton CH-series panels, breakers, meter-mains → CHD ────────────────
  if (/^CHP\d{2}L/.test(p)) return "CHD";
  if (/^1006\d{3}CCH$/.test(p)) return "CHD";
  if (/^(?:CHP|CHB|CHF|CHFP|MBP|CHSPT|CHGEN|EHD|GHB|BAB|HQP|DH|DG|CH2|CHW)/.test(p)) return "CHD";
  if (/\beaten\b/i.test(s) && !/\b(CONDUIT|WIRE|CABLE|COPPER|ALUMINUM|POW.R.LINE)\b/.test(s)) return "CHD";

  // ── Grounding hardware ─────────────────────────────────────────────────
  if (/^615\d{3}/.test(p)) return "CDW";
  if (/^GRC/.test(p) || /^GLC/.test(p) || /^IPLD/.test(p) || /\bnsi\b/i.test(s)) return "NSI";
  if (/^ERITECH/.test(p) || /\berico\b/i.test(s)) return "ERI";

  // ── Burndy lugs ────────────────────────────────────────────────────────
  if (/^YA/.test(p) || /\bburndy\b/i.test(s)) return "BUR";

  // ── Generac ────────────────────────────────────────────────────────────
  if (/\bgenerac\b/i.test(s) || /^(?:7043|7042|6729|6730|10000)/.test(p)) return "GNR";

  // ── Solar / PV ─────────────────────────────────────────────────────────
  if (/solaredge/i.test(s)) return "SED";
  if (/enphase/i.test(s)) return "ENP";

  // ── Pentair pool equipment ─────────────────────────────────────────────
  if (/\bpentair\b/i.test(s)) return "PEN";

  return null;
}

// ── Convenience: get vendor code + part from a spec string ──────────────────

export function resolveVendorAndPart(
  spec: string
): { part: string; vendor: string | null } | null {
  const part = extractPartNumber(spec);
  if (!part) return null;
  const vendor = elliottVendorCode(part, spec);
  return { part, vendor };
}

// ── Format a Bulk Entry line: "qty vendorCode partNumber" ───────────────────

export function formatBulkEntryLine(
  qty: string,
  spec: string,
  itemFallback: string
): string {
  const numQty = qty.match(/^[\d]+/)?.[0] ?? "1";
  const resolved = resolveVendorAndPart(spec);
  if (resolved) {
    const { part, vendor } = resolved;
    return vendor ? `${numQty} ${vendor} ${part}` : `${numQty} ${part}`;
  }
  // Fallback: clean item name
  const fallback = itemFallback
    .replace(/[^A-Za-z0-9\-\/. ]/g, "")
    .substring(0, 30)
    .trim();
  return `${numQty} ${fallback}`;
}
