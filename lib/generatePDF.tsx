import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import type { Job } from "@/lib/data";
import { JURISDICTIONS } from "@/lib/data";
import { VOLTSPEC_LOGO_BASE64 } from "@/lib/logo-base64";
import { extractPartNumber as sharedExtractPartNumber } from "@/lib/vendor-codes";

// Rasterise an inline SVG string to a PNG data-URI via an off-screen canvas.
// @react-pdf/renderer <Image> doesn't reliably handle SVG data URIs, but PNG
// works perfectly. We render at 2x for crisp print output.
async function svgToPngDataUri(
  svgStr: string,
  width = 680,
  height = 1160,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas 2D context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to rasterise SVG diagram"));
    };
    img.src = url;
  });
}

// Strip non-latin/emoji characters that react-pdf can't render
function clean(str: string): string {
  return str
    .replace(/[\u2014\u2013]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u00B7\u2022\u25B8]/g, "-")
    .replace(/[^\x00-\x7F]/g, "");
}

// extractPartNumber imported from @/lib/vendor-codes
const extractPartNumber = sharedExtractPartNumber;

/* ── Design Tokens ──────────────────────────────────────────────────── */

const C = {
  yellow: "#F5A623",
  yellowLight: "#FEF3C7",
  yellowMid: "#FDE68A",
  yellowDark: "#92400E",
  navy: "#0F172A",
  navyMid: "#1E293B",
  slate: "#334155",
  gray: "#64748B",
  grayLight: "#F8FAFC",
  grayBorder: "#E2E8F0",
  grayBorderLight: "#F1F5F9",
  white: "#FFFFFF",
  text: "#1E293B",
  textLight: "#475569",
  red: "#B91C1C",
  redLight: "#FEF2F2",
  redBorder: "#FECACA",
  blue: "#1D4ED8",
};

const PX = 44; // consistent horizontal page padding

const styles = StyleSheet.create({
  /* ── Base page ──────────────────────────────────────────────────── */
  page: {
    backgroundColor: C.white,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.text,
    lineHeight: 1.45,
  },
  pageStripe: {
    backgroundColor: C.navy,
    height: 5,
  },
  pageBody: {
    paddingHorizontal: PX,
    paddingTop: 22,
    paddingBottom: 54,
    flexGrow: 1,
  },

  /* ── COVER ──────────────────────────────────────────────────────── */
  coverPage: { backgroundColor: C.white },
  coverStripe: {
    backgroundColor: C.navy,
    paddingHorizontal: PX,
    paddingTop: 36,
    paddingBottom: 30,
  },
  coverBrand: {
    fontSize: 34,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    letterSpacing: 1.5,
  },
  coverBrandAccent: { color: C.yellow },
  coverTagline: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 5,
    letterSpacing: 0.6,
    lineHeight: 1.4,
  },
  coverYellowBar: { backgroundColor: C.yellow, height: 4 },

  coverBody: { paddingHorizontal: PX, paddingTop: 28 },
  coverSubtitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.gray,
    letterSpacing: 1.2,
    marginBottom: 5,
    textTransform: "uppercase",
  },
  coverJobTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    marginBottom: 10,
    lineHeight: 1.2,
  },
  coverMetaRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  coverBadge: {
    backgroundColor: C.yellowLight,
    borderWidth: 1,
    borderColor: C.yellowMid,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 8,
    color: C.yellowDark,
    fontFamily: "Helvetica-Bold",
  },
  coverBadgeGray: {
    backgroundColor: C.grayLight,
    borderWidth: 1,
    borderColor: C.grayBorder,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 8,
    color: C.gray,
    fontFamily: "Helvetica-Bold",
  },

  /* Contractor box */
  contractorBox: {
    borderWidth: 1,
    borderColor: C.grayBorder,
    borderRadius: 4,
    marginBottom: 20,
    overflow: "hidden",
  },
  contractorBoxHeader: {
    backgroundColor: C.grayLight,
    borderBottomWidth: 1,
    borderBottomColor: C.grayBorder,
    paddingHorizontal: 14,
    paddingVertical: 7,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.gray,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  contractorBoxBody: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 16,
  },
  contractorField: { flex: 1 },
  contractorLabel: {
    fontSize: 7,
    color: C.gray,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contractorLine: {
    borderBottomWidth: 1,
    borderBottomColor: C.grayBorder,
    height: 18,
  },

  /* TOC */
  tocTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    marginBottom: 8,
  },
  tocRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: C.grayBorderLight,
  },
  tocLabel: { fontSize: 9, color: C.text, lineHeight: 1.4 },
  tocPage: { fontSize: 9, color: C.gray },

  /* Cover disclaimer */
  coverDisclaimer: {
    backgroundColor: C.redLight,
    borderWidth: 1,
    borderColor: C.redBorder,
    borderRadius: 4,
    padding: 12,
    marginTop: 18,
  },
  coverDisclaimerTitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: C.red,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  coverDisclaimerText: {
    fontSize: 8,
    color: "#7F1D1D",
    lineHeight: 1.55,
  },

  /* ── SECTION PAGES ──────────────────────────────────────────────── */
  runningHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: C.grayBorder,
  },
  runningBrand: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    letterSpacing: 0.5,
  },
  runningAccent: { color: C.yellow },
  runningTitle: { fontSize: 8.5, color: C.gray, letterSpacing: 0.3 },

  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  sectionBar: {
    width: 4,
    height: 18,
    backgroundColor: C.yellow,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    letterSpacing: 0.3,
  },

  section: { marginBottom: 22 },

  /* Requirements */
  reqItem: {
    flexDirection: "row",
    marginBottom: 2,
    gap: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: C.grayBorderLight,
  },
  reqNum: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: C.yellow,
    width: 20,
    textAlign: "right",
  },
  reqText: { flex: 1, fontSize: 9, color: C.text, lineHeight: 1.55 },

  /* Materials table - rebalanced columns: wider spec */
  tableHeader: {
    flexDirection: "row",
    backgroundColor: C.navy,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginBottom: 1,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.grayBorder,
    minHeight: 22,
    alignItems: "center",
  },
  tableRowAlt: { backgroundColor: C.grayLight },
  thQty: { width: 32, fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.white },
  thItem: { width: 100, fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.white },
  thPart: { width: 68, fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.white },
  thSpec: { flex: 1, fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.white },
  colQty: { width: 32, fontSize: 8.5, color: C.yellow, fontFamily: "Helvetica-Bold" },
  colItem: { width: 100, fontSize: 8, fontFamily: "Helvetica-Bold", color: C.text, lineHeight: 1.35 },
  colPart: { width: 68, fontSize: 7.5, color: C.slate, fontFamily: "Helvetica-Bold" },
  colSpec: { flex: 1, fontSize: 7.5, color: C.gray, lineHeight: 1.45 },
  thCost: { width: 52, fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.white, textAlign: "right" as const },
  colCost: { width: 52, fontSize: 8, color: "#34d399", fontFamily: "Helvetica-Bold", textAlign: "right" as const },
  subtotalRow: {
    flexDirection: "row" as const,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopWidth: 2,
    borderTopColor: C.grayBorder,
    justifyContent: "flex-end" as const,
    alignItems: "center" as const,
    gap: 12,
  },
  subtotalLabel: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.gray },
  subtotalValue: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#34d399" },
  pricingDisclaimer: {
    marginTop: 6,
    padding: 6,
    backgroundColor: "#1e293b",
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: C.grayBorder,
  },
  pricingDisclaimerText: { fontSize: 6.5, color: C.gray, lineHeight: 1.5 },

  /* Copy list callout */
  copyListBox: {
    backgroundColor: C.yellowLight,
    borderWidth: 1,
    borderColor: C.yellowMid,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 6,
    marginBottom: 8,
  },
  copyListText: {
    fontSize: 9,
    color: C.yellowDark,
    fontFamily: "Helvetica-Bold",
  },
  copyListSub: {
    fontSize: 7.5,
    color: C.yellowDark,
    marginTop: 3,
    lineHeight: 1.45,
  },

  /* Blueprint notes */
  noteItem: {
    flexDirection: "row",
    marginBottom: 3,
    gap: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: C.grayBorderLight,
  },
  noteBullet: {
    width: 16,
    height: 16,
    backgroundColor: C.yellow,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
    lineHeight: 1,
    paddingTop: 3.5,
  },
  noteText: { flex: 1, fontSize: 9, color: C.text, lineHeight: 1.55 },

  /* Suppliers */
  featuredSupplier: {
    borderWidth: 1.5,
    borderColor: C.yellow,
    borderRadius: 5,
    marginBottom: 12,
    overflow: "hidden",
  },
  featuredSupplierHeader: {
    backgroundColor: C.navy,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredSupplierName: { fontSize: 11, fontFamily: "Helvetica-Bold", color: C.white },
  featuredSupplierBadge: {
    backgroundColor: C.yellow,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.navy,
  },
  featuredSupplierBody: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 24,
  },
  featuredDetail: { fontSize: 9, color: C.text, lineHeight: 1.6 },
  featuredNote: { fontSize: 8.5, color: C.gray, marginTop: 3, fontFamily: "Helvetica-Oblique" },
  featuredWebsite: { fontSize: 8.5, color: C.blue, marginTop: 3 },
  featuredCTA: {
    backgroundColor: C.yellowLight,
    borderTopWidth: 1,
    borderTopColor: C.yellowMid,
    paddingHorizontal: 14,
    paddingVertical: 7,
    fontSize: 8.5,
    color: C.yellowDark,
    fontFamily: "Helvetica-Bold",
  },

  otherSupplierCard: {
    borderWidth: 1,
    borderColor: C.grayBorder,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 6,
  },
  supplierName: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: C.text, marginBottom: 3 },
  supplierDetail: { fontSize: 8.5, color: C.gray, lineHeight: 1.5 },

  /* Docs */
  docItem: {
    borderLeftWidth: 3,
    borderLeftColor: C.yellow,
    paddingLeft: 12,
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.grayBorderLight,
  },
  docTitle: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: C.text },
  docDesc: { fontSize: 8.5, color: C.gray, marginTop: 3, lineHeight: 1.45 },
  docUrl: { fontSize: 7.5, color: C.blue, marginTop: 3 },

  /* Schematic diagram */
  diagramContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: C.grayBorder,
    borderRadius: 6,
    backgroundColor: C.grayLight,
  },
  diagramImage: {
    width: 360,
    height: 614, // 360 * (580/340) — preserves viewBox aspect ratio
    borderRadius: 4,
  },
  diagramCaption: {
    fontSize: 8,
    color: C.gray,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Helvetica-Oblique",
    letterSpacing: 0.3,
  },

  /* Footer disclaimer box */
  disclaimerBox: {
    backgroundColor: C.redLight,
    borderWidth: 1,
    borderColor: C.redBorder,
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 18,
  },
  disclaimerTitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: C.red,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  disclaimerText: {
    fontSize: 8,
    color: "#7F1D1D",
    lineHeight: 1.6,
  },

  /* Page footer */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerBar: { backgroundColor: C.navy, height: 3 },
  footerBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PX,
    paddingVertical: 8,
  },
  footerText: { fontSize: 7, color: C.gray },
  footerBold: { fontSize: 7, color: C.navy, fontFamily: "Helvetica-Bold" },
});

/* ── Interfaces ─────────────────────────────────────────────────────── */

interface GenerateResult {
  job: Job;
  jurisdiction: string;
  city?: string;
  generatedAt: string;
  disclaimer: string;
}

interface DocProps {
  result: GenerateResult;
  /** Pre-rasterised PNG data-URI for the SVG diagram (if any). */
  diagramPng?: string;
}

/* ── Reusable components ────────────────────────────────────────────── */

function PageFooter({ dateStr, label }: { dateStr: string; label: string }) {
  return (
    <View style={styles.footer} fixed>
      <View style={styles.footerBar} />
      <View style={styles.footerBody}>
        <Text style={styles.footerBold}>⚡ VoltSpec — voltspec.online</Text>
        <Text style={styles.footerText}>{clean(label)} | Reference Only — Not Engineering Advice</Text>
        <Text
          style={styles.footerText}
          render={({ pageNumber, totalPages }) =>
            `${dateStr}  |  Page ${pageNumber} of ${totalPages}`
          }
        />
      </View>
    </View>
  );
}

function RunningHeader({ jobLabel, cityLabel }: { jobLabel: string; cityLabel: string }) {
  return (
    <View style={styles.runningHeader}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Image src={VOLTSPEC_LOGO_BASE64} style={{ width: 16, height: 16 }} />
        <Text style={styles.runningBrand}>
          Volt<Text style={styles.runningAccent}>Spec</Text>
        </Text>
      </View>
      <Text style={styles.runningTitle}>{clean(jobLabel)} - {clean(cityLabel)}</Text>
    </View>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeading}>
      <View style={styles.sectionBar} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

/* ── Document ───────────────────────────────────────────────────────── */

function VoltSpecDocument({ result, diagramPng }: DocProps) {
  const { job, jurisdiction, generatedAt, disclaimer } = result;
  const dateStr = new Date(generatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = new Date(generatedAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const fullDate = `${dateStr} ${timeStr}`;

  const primarySupplier = job.suppliers[0];
  const otherSuppliers = job.suppliers.slice(1);
  const blueprintNotes = job.blueprintNotes ?? [];

  // Jurisdiction-aware labels
  const cityLabel = jurisdiction.replace(/\s*\(.*\)/, ""); // "Austin, TX" from "Austin, TX (Travis County)"
  const jurisdictionData = JURISDICTIONS.find((j) => j.id === result.city);
  const isAustin = !result.city || result.city === "austin";
  const isSanAntonio = result.city === "san-antonio";
  const utilityName = jurisdictionData?.utility ?? (isSanAntonio ? "CPS Energy" : "Austin Energy");
  const reqTitle = `NEC 2026 + ${utilityName} Requirements`;

  // Pricing helpers
  const parseQtyNum = (qty: string): number => {
    const m = qty.match(/^[\d]+/);
    return m ? parseInt(m[0]) : 1;
  };
  const fmtPrice = (n: number): string =>
    n >= 1 ? `$${n.toFixed(2)}` : `$${n.toFixed(2)}`;
  const isWireItem = (item: string, spec: string): boolean =>
    /\bTHHN\b|\bSER\b|\bXHHW\b|\bUSE-2\b|\bPV wire\b|\bNM-B\b|\bROMEX\b|\bMC cable\b/i.test(`${item} ${spec}`) ||
    /\bAWG\b.*\b(copper|aluminum|bare|GEC|black|red|white|green)\b/i.test(`${item} ${spec}`) ||
    /\bkcmil\b/i.test(`${item} ${spec}`) ||
    /\bAL SER\b|\bSE cable\b|\bconductor/i.test(`${item} ${spec}`) ||
    /\b(?:12|14|10|8|6|4|3|2)\/[234]\b.*(?:cable|wire|burial)/i.test(`${item} ${spec}`);
  const hasPricing = job.materials.some((m) => m.unitPrice != null);
  const materialsSubtotal = job.materials.reduce((sum, mat) => {
    if (mat.unitPrice == null || isWireItem(mat.item, mat.spec)) return sum;
    return sum + mat.unitPrice * parseQtyNum(mat.quantity);
  }, 0);

  return (
    <Document
      title={`VoltSpec - ${job.label}`}
      author="VoltSpec"
      subject="Electrical Job Package"
      keywords={`NEC 2026, electrical, contractor, ${clean(cityLabel)}`}
    >
      {/* ── COVER PAGE ─────────────────────────────────────────── */}
      <Page size="LETTER" style={styles.coverPage}>
        <View style={styles.coverStripe}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image src={VOLTSPEC_LOGO_BASE64} style={{ width: 28, height: 28 }} />
            <Text style={styles.coverBrand}>
              Volt<Text style={styles.coverBrandAccent}>Spec</Text>
            </Text>
          </View>
          <Text style={styles.coverTagline}>
            NEC 2026 Electrical Job Package Generator - {clean(cityLabel)}
          </Text>
        </View>
        <View style={styles.coverYellowBar} />

        <View style={styles.coverBody}>
          <Text style={styles.coverSubtitle}>ELECTRICAL JOB PACKAGE</Text>
          <Text style={styles.coverJobTitle}>{clean(job.label)}</Text>
          <View style={styles.coverMetaRow}>
            <Text style={styles.coverBadge}>{clean(jurisdiction)}</Text>
            <Text style={styles.coverBadgeGray}>NEC 2026</Text>
            <Text style={styles.coverBadgeGray}>{fullDate}</Text>
          </View>

          {/* Contractor fill-in */}
          <View style={styles.contractorBox}>
            <Text style={styles.contractorBoxHeader}>Contractor Information</Text>
            <View style={styles.contractorBoxBody}>
              {["Company Name", "License No.", "Project Address", "Permit No."].map(
                (lbl) => (
                  <View key={lbl} style={styles.contractorField}>
                    <Text style={styles.contractorLabel}>{lbl}</Text>
                    <View style={styles.contractorLine} />
                  </View>
                ),
              )}
            </View>
            <View style={[styles.contractorBoxBody, { paddingTop: 0 }]}>
              {["Estimator / Foreman", "Phone", "Date", "Job No."].map((lbl) => (
                <View key={lbl} style={styles.contractorField}>
                  <Text style={styles.contractorLabel}>{lbl}</Text>
                  <View style={styles.contractorLine} />
                </View>
              ))}
            </View>
          </View>

          {/* TOC */}
          <Text style={styles.tocTitle}>Package Contents</Text>
          {[
            reqTitle,
            "Materials List with Part Numbers",
            "Blueprint Notes",
            ...(job.svgDiagram ? ["Schematic Diagram"] : []),
            "Preferred Supplier - Elliott Electric Supply",
            "Official Reference Documents",
          ].map((label, i) => (
            <View key={label} style={styles.tocRow}>
              <Text style={styles.tocLabel}>{label}</Text>
              <Text style={styles.tocPage}>Page {i + 2}</Text>
            </View>
          ))}

          <View style={styles.coverDisclaimer}>
            <Text style={styles.coverDisclaimerTitle}>
              IMPORTANT DISCLAIMER - READ BEFORE USE
            </Text>
            <Text style={styles.coverDisclaimerText}>{clean(disclaimer)}</Text>
          </View>
        </View>

        <PageFooter dateStr={fullDate} label={job.label} />
      </Page>

      {/* ── REQUIREMENTS ───────────────────────────────────────── */}
      <Page size="LETTER" style={styles.page} wrap>
        <View style={styles.pageStripe} />
        <View style={styles.pageBody}>
          <RunningHeader jobLabel={job.label} cityLabel={cityLabel} />
          <View style={styles.section}>
            <SectionHeading title={reqTitle} />
            {job.requirements.map((req, i) => (
              <View key={i} style={styles.reqItem} wrap={false}>
                <Text style={styles.reqNum}>{i + 1}.</Text>
                <Text style={styles.reqText}>{clean(req)}</Text>
              </View>
            ))}
          </View>
        </View>
        <PageFooter dateStr={fullDate} label={job.label} />
      </Page>

      {/* ── MATERIALS ──────────────────────────────────────────── */}
      <Page size="LETTER" style={styles.page} wrap>
        <View style={styles.pageStripe} />
        <View style={styles.pageBody}>
          <RunningHeader jobLabel={job.label} cityLabel={cityLabel} />
          <View style={styles.section}>
            <SectionHeading title="Materials List" />

            {/* Copy list callout */}
            <View style={styles.copyListBox}>
              <Text style={styles.copyListText}>
                {primarySupplier ? `${clean(primarySupplier.name)} - Call ${primarySupplier.phone}` : "Supplier Copy List"}
              </Text>
              <Text style={styles.copyListSub}>
                Read the part numbers from this list to your counter rep for fast ordering.
              </Text>
            </View>

            {/* Table header */}
            <View style={styles.tableHeader}>
              <Text style={styles.thQty}>Qty</Text>
              <Text style={styles.thItem}>Item</Text>
              <Text style={styles.thPart}>Part No.</Text>
              <Text style={styles.thSpec}>Specification / Notes</Text>
              {hasPricing && <Text style={styles.thCost}>Est. Cost</Text>}
            </View>

            {/* Table rows */}
            {job.materials.map((mat, i) => {
              const partNo = extractPartNumber(mat.spec);
              return (
                <View
                  key={i}
                  style={[styles.tableRow, i % 2 !== 0 ? styles.tableRowAlt : {}]}
                  wrap={false}
                >
                  <Text style={styles.colQty}>{clean(mat.quantity)}</Text>
                  <Text style={styles.colItem}>{clean(mat.item)}</Text>
                  <Text style={styles.colPart}>{partNo ? clean(partNo) : "-"}</Text>
                  <Text style={styles.colSpec}>{clean(mat.spec)}</Text>
                  {hasPricing && (
                    <Text style={isWireItem(mat.item, mat.spec) ? { ...styles.colCost, color: C.gray, fontSize: 7, fontFamily: "Helvetica-Oblique" } : styles.colCost}>
                      {isWireItem(mat.item, mat.spec) ? "Call for price" : mat.unitPrice != null ? fmtPrice(mat.unitPrice * parseQtyNum(mat.quantity)) : "-"}
                    </Text>
                  )}
                </View>
              );
            })}

            {/* Subtotal + disclaimer */}
            {hasPricing && (
              <>
                <View style={styles.subtotalRow} wrap={false}>
                  <Text style={styles.subtotalLabel}>MATERIALS SUBTOTAL</Text>
                  <Text style={styles.subtotalValue}>{fmtPrice(materialsSubtotal)}</Text>
                </View>
                <View style={styles.pricingDisclaimer} wrap={false}>
                  <Text style={styles.pricingDisclaimerText}>
                    Rough cash-sale house-account pricing estimate only. Prices are approximate and will vary by location, timing, and your specific account discounts. Wire pricing excluded — speak to sales. Always verify current pricing with Elliott Electric Supply.
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
        <PageFooter dateStr={fullDate} label={job.label} />
      </Page>

      {/* ── BLUEPRINT NOTES ────────────────────────────────────── */}
      {blueprintNotes.length > 0 && (
        <Page size="LETTER" style={styles.page} wrap>
          <View style={styles.pageStripe} />
          <View style={styles.pageBody}>
            <RunningHeader jobLabel={job.label} cityLabel={cityLabel} />
            <View style={styles.section}>
              <SectionHeading title="Blueprint Notes" />
              {blueprintNotes.map((note, i) => (
                <View key={i} style={styles.noteItem} wrap={false}>
                  <Text style={styles.noteBullet}>{i + 1}</Text>
                  <Text style={styles.noteText}>{clean(note)}</Text>
                </View>
              ))}
            </View>
          </View>
          <PageFooter dateStr={fullDate} label={job.label} />
        </Page>
      )}

      {/* ── SCHEMATIC DIAGRAM ──────────────────────────────────── */}
      {job.svgDiagram && (
        <Page size="LETTER" style={styles.page}>
          <View style={styles.pageStripe} />
          <View style={styles.pageBody}>
            <RunningHeader jobLabel={job.label} cityLabel={cityLabel} />
            <SectionHeading title="Schematic Diagram" />
            <View style={styles.diagramContainer}>
              {diagramPng && (
                <Image style={styles.diagramImage} src={diagramPng} />
              )}
              <Text style={styles.diagramCaption}>
                {clean(job.label)} - NOT TO SCALE - Reference Only
              </Text>
            </View>
          </View>
          <PageFooter dateStr={fullDate} label={job.label} />
        </Page>
      )}

      {/* ── SUPPLIERS + DOCS ───────────────────────────────────── */}
      <Page size="LETTER" style={styles.page} wrap>
        <View style={styles.pageStripe} />
        <View style={styles.pageBody}>
          <RunningHeader jobLabel={job.label} cityLabel={cityLabel} />

          <View style={styles.section}>
            <SectionHeading title="Preferred Supplier" />

            {primarySupplier && (
              <View style={styles.featuredSupplier} wrap={false}>
                <View style={styles.featuredSupplierHeader}>
                  <Text style={styles.featuredSupplierName}>
                    {clean(primarySupplier.name)}
                  </Text>
                  <Text style={styles.featuredSupplierBadge}>PREFERRED SUPPLIER</Text>
                </View>
                <View style={styles.featuredSupplierBody}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.featuredDetail}>
                      {clean(primarySupplier.address)}
                    </Text>
                    <Text style={styles.featuredDetail}>{primarySupplier.phone}</Text>
                    {primarySupplier.notes && (
                      <Text style={styles.featuredNote}>
                        {clean(primarySupplier.notes)}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    {primarySupplier.website && (
                      <Text style={styles.featuredWebsite}>
                        {primarySupplier.website}
                      </Text>
                    )}
                  </View>
                </View>
                <Text style={styles.featuredCTA}>
                  Use the Part Numbers from the Materials List for fast counter ordering
                </Text>
              </View>
            )}

            {otherSuppliers.length > 0 && (
              <View>
                <Text
                  style={{
                    fontSize: 9.5,
                    color: C.gray,
                    marginBottom: 8,
                    marginTop: 6,
                    fontFamily: "Helvetica-Bold",
                  }}
                >
                  Other Local Suppliers
                </Text>
                {otherSuppliers.map((s, i) => (
                  <View key={i} style={styles.otherSupplierCard} wrap={false}>
                    <Text style={styles.supplierName}>{clean(s.name)}</Text>
                    <Text style={styles.supplierDetail}>{clean(s.address)}</Text>
                    <Text style={styles.supplierDetail}>{s.phone}</Text>
                    {s.website && (
                      <Text style={[styles.supplierDetail, { color: C.blue }]}>
                        {s.website}
                      </Text>
                    )}
                    {s.notes && (
                      <Text
                        style={[
                          styles.supplierDetail,
                          { fontFamily: "Helvetica-Oblique" },
                        ]}
                      >
                        {clean(s.notes)}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.section}>
            <SectionHeading title="Official Reference Documents" />
            {job.officialDocs.map((doc, i) => (
              <View key={i} style={styles.docItem} wrap={false}>
                <Text style={styles.docTitle}>{clean(doc.title)}</Text>
                <Text style={styles.docDesc}>{clean(doc.description)}</Text>
                <Text style={styles.docUrl}>{doc.url}</Text>
              </View>
            ))}
          </View>

          {/* Bottom disclaimer */}
          <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerTitle}>DISCLAIMER</Text>
            <Text style={styles.disclaimerText}>
              Reference only - Verify all requirements with local AHJ. Not engineering
              advice. All code requirements, material quantities, and specifications must be
              verified by a licensed electrical contractor or engineer familiar with local
              conditions. Always obtain required permits and inspections from the Authority
              Having Jurisdiction (AHJ) before proceeding with any electrical work.
            </Text>
          </View>
        </View>
        <PageFooter dateStr={fullDate} label={job.label} />
      </Page>
    </Document>
  );
}

/* ── One-Page Truck Sheet ────────────────────────────────────────────── */

const ts = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.text,
    lineHeight: 1.4,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 68,
  },
  /* Header band */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 2,
    borderBottomColor: C.navy,
    paddingBottom: 6,
    marginBottom: 10,
  },
  brand: { fontSize: 18, fontFamily: "Helvetica-Bold", color: C.navy },
  brandAccent: { color: C.yellow },
  headerRight: { textAlign: "right" },
  headerCity: { fontSize: 10, color: C.gray, fontFamily: "Helvetica-Bold" },
  headerDate: { fontSize: 8, color: C.gray, marginTop: 1 },

  /* Job title row */
  jobRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  jobTitle: { fontSize: 16, fontFamily: "Helvetica-Bold", color: C.navy },
  badge: {
    backgroundColor: C.yellowLight,
    borderWidth: 0.5,
    borderColor: C.yellowMid,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 8,
    color: C.yellowDark,
    fontFamily: "Helvetica-Bold",
  },

  /* Contractor quick-fill */
  contractorRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: C.grayBorder,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  contractorField: { flex: 1 },
  contractorLabel: {
    fontSize: 7.5,
    color: C.gray,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  contractorLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: C.grayBorder,
    height: 14,
  },

  /* Two-column layout */
  columns: { flexDirection: "row", gap: 14 },
  colLeft: { flex: 1 },
  colRight: { width: 240 },

  /* Section labels */
  sectionLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    backgroundColor: C.navy,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    marginBottom: 5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  /* Materials mini-table */
  matHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: C.navy,
    paddingBottom: 2,
    marginBottom: 1,
  },
  matHeaderText: { fontSize: 8, fontFamily: "Helvetica-Bold", color: C.gray, textTransform: "uppercase" },
  matRow: {
    flexDirection: "row",
    paddingVertical: 2.5,
    borderBottomWidth: 0.5,
    borderBottomColor: C.grayBorderLight,
    alignItems: "center",
  },
  matQty: { width: 32, fontSize: 9, color: C.yellow, fontFamily: "Helvetica-Bold" },
  matItem: { width: 130, fontSize: 8.5, fontFamily: "Helvetica-Bold", color: C.text, lineHeight: 1.35, marginRight: 10 },
  matPart: { flex: 1, fontSize: 8, color: C.slate, fontFamily: "Helvetica-Bold" },

  /* Requirements compact */
  reqItem: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: C.grayBorderLight,
  },
  reqBullet: { fontSize: 8.5, color: C.yellow, fontFamily: "Helvetica-Bold", width: 12 },
  reqText: { flex: 1, fontSize: 8, color: C.text, lineHeight: 1.45 },

  /* Supplier box */
  supplierBox: {
    borderWidth: 1,
    borderColor: C.yellow,
    borderRadius: 3,
    padding: 6,
    marginTop: 6,
  },
  supplierName: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.navy },
  supplierDetail: { fontSize: 8, color: C.gray, lineHeight: 1.5, marginTop: 2 },

  /* Footer */
  footer: {
    position: "absolute",
    bottom: 38,
    left: 28,
    right: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: C.grayBorder,
    paddingTop: 4,
  },
  footerText: { fontSize: 7, color: C.gray },
  footerBold: { fontSize: 7, color: C.red, fontFamily: "Helvetica-Bold" },

  /* Branding */
  branding: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  brandingText: {
    fontSize: 8,
    color: C.gray,
    letterSpacing: 0.3,
  },
  brandingLink: {
    fontFamily: "Helvetica-Bold",
    color: C.navy,
  },
});

function TruckSheetDocument({ result }: { result: GenerateResult }) {
  const { job, jurisdiction, generatedAt } = result;
  const jurisdictionData = JURISDICTIONS.find((j) => j.id === result.city);
  const utilityName = jurisdictionData?.utility ?? "Austin Energy";
  const cityLabel = jurisdiction.replace(/\s*\(.*\)/, "");
  const dateStr = new Date(generatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const primarySupplier = job.suppliers[0];

  return (
    <Document
      title={`VoltSpec Job Sheet - ${job.label}`}
      author="VoltSpec"
      subject="One-Page Job Sheet"
    >
      <Page size="LETTER" style={ts.page}>
        {/* Header */}
        <View style={ts.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Image src={VOLTSPEC_LOGO_BASE64} style={{ width: 20, height: 20 }} />
            <Text style={ts.brand}>
              Volt<Text style={ts.brandAccent}>Spec</Text>
              <Text style={{ fontSize: 8, color: C.gray }}> Job Sheet</Text>
            </Text>
          </View>
          <View style={ts.headerRight}>
            <Text style={ts.headerCity}>{clean(cityLabel)} - {clean(utilityName)}</Text>
            <Text style={ts.headerDate}>{dateStr}</Text>
          </View>
        </View>

        {/* Job title */}
        <View style={ts.jobRow}>
          <Text style={ts.jobTitle}>{clean(job.label)}</Text>
          <Text style={ts.badge}>NEC 2026</Text>
        </View>

        {/* Contractor quick-fill */}
        <View style={ts.contractorRow}>
          {["Job / Address", "Contractor", "Permit #"].map((lbl) => (
            <View key={lbl} style={ts.contractorField}>
              <Text style={ts.contractorLabel}>{lbl}</Text>
              <View style={ts.contractorLine} />
            </View>
          ))}
        </View>

        {/* Two-column body */}
        <View style={ts.columns}>
          {/* LEFT: Materials */}
          <View style={ts.colLeft}>
            <Text style={ts.sectionLabel}>Materials ({job.materials.length} items)</Text>
            <View style={ts.matHeader}>
              <Text style={[ts.matHeaderText, { width: 32 }]}>Qty</Text>
              <Text style={[ts.matHeaderText, { width: 130, marginRight: 10 }]}>Item</Text>
              <Text style={[ts.matHeaderText, { flex: 1 }]}>Part #</Text>
            </View>
            {job.materials.map((mat, i) => {
              const partNo = extractPartNumber(mat.spec);
              return (
                <View key={i} style={ts.matRow} wrap={false}>
                  <Text style={ts.matQty}>{clean(mat.quantity)}</Text>
                  <Text style={ts.matItem}>{clean(mat.item)}</Text>
                  <Text style={ts.matPart}>{partNo ? clean(partNo) : "-"}</Text>
                </View>
              );
            })}
          </View>

          {/* RIGHT: Requirements + Supplier */}
          <View style={ts.colRight}>
            <Text style={ts.sectionLabel}>Key Requirements</Text>
            {job.requirements.map((req, i) => (
              <View key={i} style={ts.reqItem} wrap={false}>
                <Text style={ts.reqBullet}>{i + 1}.</Text>
                <Text style={ts.reqText}>{clean(req)}</Text>
              </View>
            ))}

            {/* Supplier card */}
            {primarySupplier && (
              <View style={ts.supplierBox}>
                <Text style={ts.supplierName}>{clean(primarySupplier.name)}</Text>
                <Text style={ts.supplierDetail}>
                  {clean(primarySupplier.address)}
                  {"\n"}{primarySupplier.phone}
                  {primarySupplier.notes ? `\n${clean(primarySupplier.notes)}` : ""}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={ts.footer} fixed>
          <Text style={ts.footerBold}>REFERENCE ONLY - Not Engineering Advice - Verify with AHJ</Text>
          <Text style={ts.footerText}>⚡ VoltSpec — voltspec.online | {clean(job.label)} | {dateStr}</Text>
        </View>

        {/* Branding */}
        <View style={ts.branding} fixed>
          <Text style={ts.brandingText}>
            Generated by <Text style={ts.brandingLink}>VoltSpec — voltspec.online</Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
}

/* ── Exports ─────────────────────────────────────────────────────────── */

export async function generateJobSheet(result: GenerateResult): Promise<void> {
  const blob = await pdf(<TruckSheetDocument result={result} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `VoltSpec-JobSheet-${result.job.id}-${new Date().toISOString().slice(0, 10)}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function generatePDF(result: GenerateResult): Promise<void> {
  // Pre-rasterise SVG diagram to PNG so @react-pdf/renderer can embed it
  let diagramPng: string | undefined;
  if (result.job.svgDiagram) {
    try {
      diagramPng = await svgToPngDataUri(result.job.svgDiagram);
    } catch (err) {
      console.warn(
        "[VoltSpec] SVG diagram rasterisation failed, omitting from PDF:",
        err,
      );
    }
  }

  const blob = await pdf(
    <VoltSpecDocument result={result} diagramPng={diagramPng} />,
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `VoltSpec-${result.job.id}-${new Date().toISOString().slice(0, 10)}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
