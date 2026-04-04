"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Package,
  PenTool,
  Store,
  FileText,
  AlertTriangle,
  Phone,
  Globe,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  Star,
  ShoppingCart,
  Zap,
  ExternalLink,
  ClipboardCopy,
  ClipboardCheck,
} from "lucide-react";
import type { Job } from "@/lib/data";
import { JURISDICTIONS } from "@/lib/data";
import { POA_OPTIONS, DEFAULT_POA_ID, isMeterJob } from "@/lib/data/pointOfAttachment";
import type { POAOption } from "@/lib/data/pointOfAttachment";

interface GenerateResult {
  job: Job;
  jurisdiction: string;
  city?: string;
  generatedAt: string;
  disclaimer: string;
}

interface ResultsPanelProps {
  result: GenerateResult;
}

function ElliottLinks({
  item,
  spec,
  getUrls,
}: {
  item: string;
  spec: string;
  getUrls: (item: string, spec?: string) => { direct: string | null; search: string };
}) {
  const { direct, search } = getUrls(item, spec);
  return (
    <div className="inline-flex items-center gap-2">
      {direct && (
        <a
          href={direct}
          target="_blank"
          rel="noopener noreferrer"
          title="Direct product page on Elliott Electric Supply"
          className="inline-flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors duration-150 font-semibold"
        >
          <Zap className="w-3 h-3 fill-current" />
          <span className="hidden sm:inline">Product</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
      <a
        href={search}
        target="_blank"
        rel="noopener noreferrer"
        title="Search on Elliott Electric Supply"
        className={`inline-flex items-center gap-1 text-xs transition-colors duration-150 font-medium ${
          direct ? "text-gray-500 hover:text-gray-300" : "text-yellow-400/70 hover:text-yellow-400"
        }`}
      >
        <span className="hidden sm:inline">Search</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  const { job, jurisdiction, city, generatedAt, disclaimer } = result;
  const jurisdictionData = JURISDICTIONS.find((j) => j.id === city);
  const utilityName = jurisdictionData?.utility ?? "Austin Energy";
  const [showOtherSuppliers, setShowOtherSuppliers] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showPricing, setShowPricing] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("voltspec-show-pricing");
      return saved !== null ? saved === "true" : true;
    }
    return true;
  });
  useEffect(() => {
    localStorage.setItem("voltspec-show-pricing", String(showPricing));
  }, [showPricing]);
  const suppliers = job.suppliers ?? [];

  // --- Point of Attachment dropdown state ---
  const showPOA = isMeterJob(job.id);
  const [poaId, setPoaId] = useState(DEFAULT_POA_ID);
  const poaOption = POA_OPTIONS.find((o) => o.id === poaId) ?? POA_OPTIONS[0];

  // Build effective materials / blueprintNotes / svgDiagram with POA injected
  const effectiveMaterials = showPOA
    ? [...job.materials, ...poaOption.materials]
    : job.materials;

  const effectiveBlueprintNotes = showPOA && job.blueprintNotes
    ? [...job.blueprintNotes, poaOption.blueprintNote]
    : job.blueprintNotes;

  const effectiveSvgDiagram = showPOA && job.svgDiagram
    ? job.svgDiagram.replace(
        // Inject POA label just before the closing </svg> tag
        /<\/svg>\s*$/,
        `<text x="170" y="38" text-anchor="middle" fill="#a78bfa" font-size="8" font-style="italic">${poaOption.svgLabel}</text>\n</svg>`
      )
    : job.svgDiagram;

  // Extract part number from spec string
  const extractPartNumber = (spec: string): string | null => {
    // Pattern 1: after a known vendor/brand prefix
    const vendorMatch = spec.match(
      /(?:Eaton|Carlon|Erico|Leviton|Southwire|Bridgeport|Burndy|Polaris|Taymac|Pentair|NSI|Generac|Kohler|SolarEdge|Enphase|ChargePoint|Midnite Solar|Allied|Regal|Thomas\s*&\s*Betts|Crouse-Hinds|Kichler|Brady|Gardner\s*Bender|PECO|ALU|COP|CON|BRI|CRS|TAM|GNR|AMF|ALF|PVC|PVF|PEC|M-W|MIB)\s+([A-Z0-9][A-Z0-9\-]{1,})/i
    );
    if (vendorMatch) return vendorMatch[1].replace(/-+$/, "");
    // Pattern 2: after " - " separator
    const dashMatch = spec.match(/\s-\s([A-Z0-9][A-Z0-9\-]{3,})\b/i);
    if (dashMatch) return dashMatch[1].replace(/-+$/, "");
    // Pattern 3: standalone alphanumeric part number
    // Covers: PVC34, 34ELL90, TA34, CPL34, DS1, 1006352CCH, 615880, etc.
    const standaloneMatch = spec.match(/\b([A-Z]{1,6}[0-9]{2,}[A-Z0-9\-]*|[0-9]{1,3}[A-Z]{2,}[0-9A-Z\-]*|[0-9]{4,}[A-Z0-9]{2,})\b/);
    if (standaloneMatch) return standaloneMatch[1];
    return null;
  };

  // Determine Elliott vendor code from part number and spec context
  const elliottVendorCode = (part: string, spec: string): string | null => {
    const p = part.toUpperCase();
    const s = spec.toUpperCase();

    // ── Wire / Cable ──────────────────────────────────────────────────────────
    // THHN/THWN copper (THHN12STBK500, THHN6STBK500, etc.)
    if (/^(?:BARE|THHN|THWN|RX\d)/.test(p)) return "COP";
    if (/\bTHHN\b|\bTHWN\b/.test(s) && !/\bALUMINUM\b/.test(s)) return "COP";
    // AL XHHW, SER, SEU
    if (/^(?:XHHW|URD|SER\d|SEU\d)/.test(p)) return "ALU";
    // MC / Armor clad cable
    if (/^(?:MC|AC|BX|ACWU|MCAP)/.test(p) || /\bMC CABLE\b|\bARMOR.CLAD\b/.test(s)) return "ALF";

    // ── Liquidtight flex conduit & connectors ─────────────────────────────────
    // Liquidtight connectors (STR50, STR75, STR100, STR5090, etc.) → AMF
    if (/^STR\d/.test(p) || /\bLIQUIDTIGHT\b.*\b(CONNECTOR|FITTING|STRAIGHT|ANGLE|90)\b/.test(s)) return "AMF";
    // Liquidtight conduit sticks (LT12, LT34, LT1, LT112, LT2 etc.) → ALF
    if (/^LT(?:12|34|38|1\b|112|2\b|3\b)/.test(p)) return "ALF";
    if (/\bLIQUIDTIGHT\b/.test(s) && /\bCONDUIT\b|\bFLEX\b/.test(s) && !/\bCONNECTOR\b|\bFITTING\b/.test(s)) return "ALF";
    // Carflex / non-metallic liquidtight
    if (/carflex|carlon.*flex|ltfca/i.test(s)) return "SPX";
    // Generic metal flex (non-liquidtight FMC)
    if (/\bFLEX(IBLE)?\s+METAL\b|\bFMC\b/.test(s)) return "ALF";

    // ── EMT conduit & fittings ─────────────────────────────────────────────────
    // EMT conduit sticks (EMT12, EMT34, EMT1, EMT114, EMT112, EMT2) → CON
    if (/^EMT\d/.test(p) || (/\bEMT\b/.test(s) && /\bCONDUIT\b/.test(s) && !/\bFITTING\b|\bCONNECTOR\b|\bCOUPLING\b|\bSTRAP\b/.test(s))) return "CON";
    // RMC/IMC rigid conduit → CON
    if (/^GAL/.test(p) || (/\bRIGID\b|\bRMC\b|\bIMC\b/.test(s) && /\bCONDUIT\b/.test(s) && !/\bPVC\b/.test(s))) return "CON";
    // EMT connectors — Bridgeport numeric codes (230=1/2, 231=3/4, 232=1, 233=1-1/4, 234=1-1/2, 235=2)
    if (/^(?:230|231|232|233|234|235|290|291|292|293|294|295)$/.test(p)) return "BRI";
    // EMT couplings (240=1/2, 241=3/4, 242=1, 243=1-1/4, 244=1-1/2, 245=2)
    if (/^(?:240|241|242|243|244|245)$/.test(p)) return "BRI";
    // EMT one-hole straps (920S=1/2, 921S=3/4, 922S=1, 923S=1-1/4, 924S=1-1/2)
    if (/^(?:920S|921S|922S|923S|924S|930S|931S|932S|933S|934S)$/.test(p)) return "BRI";
    // Any other Bridgeport reference
    if (/^MWH\d/.test(p)) return "BRI";   // mast wire holders (BRI)
    if (/bridgeport/i.test(s) || /\bBRI\b/.test(s)) return "BRI";

    // ── M-W (porcelain brackets, bolts, square washers for service hardware) ──
    if (/^(?:MWK|MW\d|SW\d)/.test(p) || /\bM-W\b/.test(s)) return "M-W";
    // ── Milbank meter sockets → MIB ──────────────────────────────────────────
    if (/^U\d{3,4}/.test(p) || /\bmilbank\b/i.test(s)) return "MIB";

    // ── PVC conduit sticks ────────────────────────────────────────────────────
    // 10 ft: PVC12, PVC34, PVC1, PVC114, PVC112, PVC2 → PVC
    // 20 ft: PVC220, PVC320, PVC420 → PVC
    if (/^PVC\d/.test(p)) return "PVC";
    // Legacy Carlon/generic PVC conduit patterns
    if (/^(?:80PVC|40PVC|DB\d|EB\d)/.test(p) || (/\bPVC\b/.test(s) && /\bCONDUIT\b/.test(s) && !/\bELBOW\b|\bFITTING\b|\bCOUPLING\b|\bADAPTER\b/.test(s))) return "PVC";

    // ── PVC fittings (elbows, adapters, couplings) ────────────────────────────
    // PVC 90° elbows: 12ELL90, 34ELL90, 1ELL90, 114ELL90, 2ELL90
    if (/^\d{1,3}ELL9/.test(p)) return "PVF";
    // PVC 45° elbows: 12ELL45, 34ELL45, 1ELL45
    if (/^\d{1,3}ELL4/.test(p)) return "PVF";
    // PVC terminal/male adapters: TA12, TA34, TA1, TA114
    if (/^TA\d/.test(p)) return "PVF";
    // PVC female adapters: FA12, FA34, FA1
    if (/^FA\d/.test(p)) return "PVF";
    // PVC couplings: CPL12, CPL34, CPL1, CPL114
    if (/^CPL\d/.test(p)) return "PVF";
    // Legacy Carlon PVC fitting patterns and generic PVC fitting references
    if (/^(?:LB\d|LL\d|LR\d|E\d{3}|A\d{2,3}|CP\d|UA\d)/.test(p)) return "PVF";
    if (/\bPVC\b/.test(s) && /\b(FITTING|ELBOW|ELL|LB|LL|LR|COUPLING|ADAPTER|SWEEP)\b/.test(s)) return "PVF";

    // ── Condulet bodies, 4-square boxes (Crouse-Hinds / CRS) ─────────────────
    // Metal LB condulet bodies (LB15, LB25, LB35, LB50, LB75, LB100)
    if (/^LB\d{2,3}$/.test(p)) return "CRS";
    // 4-square boxes and covers: TP403, TP404, TP510, TP516, TP60 etc.
    if (/^TP\d/.test(p)) return "CRS";
    if (/crouse.hinds/i.test(s)) return "CRS";

    // ── In-use / weatherproof covers (Taymac) ────────────────────────────────
    if (/^(?:MM\d|MX\d|MID\d|MMKD|MM2)/.test(p) || /\btaymac\b/i.test(s)) return "TAM";

    // ── Duct seal (PECO) ──────────────────────────────────────────────────────
    if (/^DS\d/.test(p) || /\bpeco\b/i.test(s) || /\bduct\s+seal\b/i.test(s)) return "PEC";

    // ── GFCI & TR receptacles ─────────────────────────────────────────────────
    if (/^TWRGF/.test(p)) return "EWD";   // outdoor WR-GFCI
    if (/^TRGF/.test(p)) return "EWD";    // indoor TR-GFCI
    if (/^(?:TRBR|TR\d|GFTR|5262|5352|1257|CR|TRS|1450)/.test(p)) return "EWD";
    if (/leviton/i.test(s) && /^(?:TR|GFTR|279|260|261|5262)/.test(p)) return "LEV";
    if (/lutron/i.test(s)) return "LUT";

    // ── Eaton Pow-R-Line panels & components → CHS ────────────────────────────
    // Interiors: PRL1X, PRL2X (Pow-R-Xpress) and legacy PRL1A, PRL2A, PRL3A series
    if (/^PRL[123][AX]/.test(p)) return "CHS";
    // Lug kits: LUGKIT series
    if (/^LUGKIT/.test(p)) return "CHS";
    // PDG frame breakers (Pow-R-Line main breaker kits)
    if (/^PDG/.test(p)) return "CHS";
    // EZB enclosures, EZT trim/covers
    if (/^EZ[BT]\d/.test(p)) return "CHS";
    // Ground bars: 5158C series
    if (/^5158C/.test(p)) return "CHS";
    // Main breaker kits: BKD (240V), BKG (480V) series
    if (/^BK[DG]\d/.test(p)) return "CHS";
    // Ground bus kits: CUGROUND, ISOGROUND
    if (/^(?:CUGROUND|ISOGROUND)$/.test(p)) return "CHS";
    // NEMA 3R enclosures: GWPBQ series
    if (/^GWPBQ/.test(p)) return "CHS";
    // Sub-feed breaker covers: SFBCVR series
    if (/^SFBCVR/.test(p)) return "CHS";
    // 200% neutral kits: 2NK series
    if (/^[12]NK\d/.test(p)) return "CHS";
    // Any explicit "Pow-R-Line" or "Pow-R-Xpress" reference in spec
    if (/pow.r.(?:line|xpress)/i.test(s)) return "CHS";

    // ── Eaton BR-series loadcenters & breakers → ETN ────────────────────────
    // BR breakers (BR120, BR230, BR250, BR260, BR2100, etc.)
    // BRP plug-on-neutral loadcenters & breakers (BRP20B200R, BRP24L125G, BRP120DF, BRP115AF, etc.)
    // BRN GFCI breakers & surge (BRN230GF, BRN250GF, BRNSURGE10)
    // BRB, BRSPT surge arresters (BRSPT2ULTRA)
    if (/^BR/.test(p)) return "ETN";

    // ── Eaton CH-series panels, breakers, meter-mains → CHD ──────────────────
    // MLO indoor subpanels (CHP12L, CHP24L, CHP32L, CHP42L series)
    if (/^CHP\d{2}L/.test(p)) return "CHD";
    // Eaton numeric meter base part numbers (1006352CCH, 1006353CCH, etc.)
    if (/^1006\d{3}CCH$/.test(p)) return "CHD";
    // CH breakers, meter-mains, ATS, surge, interlock kits
    if (/^(?:CHP|CHB|CHF|CHFP|MBP|CHSPT|CHGEN|EHD|GHB|BAB|HQP|DH|DG|CH2|CHW)/.test(p)) return "CHD";
    if (/\beaten\b/i.test(s) && !/\b(CONDUIT|WIRE|CABLE|COPPER|ALUMINUM|POW.R.LINE)\b/.test(s)) return "CHD";

    // ── Grounding hardware ────────────────────────────────────────────────────
    if (/^615\d{3}/.test(p)) return "CDW";
    if (/^GRC/.test(p) || /^GLC/.test(p) || /^IPLD/.test(p) || /\bnsi\b/i.test(s)) return "NSI";
    if (/^ERITECH/.test(p) || /\berico\b/i.test(s)) return "ERI";

    // ── Burndy lugs ───────────────────────────────────────────────────────────
    if (/^YA/.test(p) || /\bburndy\b/i.test(s)) return "BUR";

    // ── Generac ───────────────────────────────────────────────────────────────
    if (/\bgenerac\b/i.test(s) || /^(?:7043|7042|6729|6730|10000)/.test(p)) return "GNR";

    // ── Solar / PV ────────────────────────────────────────────────────────────
    if (/solaredge/i.test(s)) return "SED";
    if (/enphase/i.test(s)) return "ENP";

    // ── Pentair pool equipment ────────────────────────────────────────────────
    if (/\bpentair\b/i.test(s)) return "PEN";

    return null; // fall back to search
  };

  const elliottUrls = (item: string, spec?: string): { direct: string | null; search: string } => {
    const part = spec ? extractPartNumber(spec) : null;
    const query = part ?? item;
    const search = `https://www.elliottelectric.com/Search?q=${encodeURIComponent(query)}`;
    if (!part) return { direct: null, search };
    const vendor = elliottVendorCode(part, spec ?? "");
    const direct = vendor
      ? `https://www.elliottelectric.com/P/Item/${vendor}/${encodeURIComponent(part)}/`
      : null;
    return { direct, search };
  };

  // Extract clean numeric quantity: "15 ft" → "15", "As needed" → "1"
  const extractQty = (qty: string): string => {
    const num = qty.match(/^[\d]+/);
    return num ? num[0] : "1";
  };

  // Parse quantity to number for pricing math
  const parseQtyNum = (qty: string): number => {
    const num = qty.match(/^[\d]+/);
    return num ? parseInt(num[0]) : 1;
  };

  // Format currency
  const fmtPrice = (n: number): string =>
    n >= 1 ? `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `$${n.toFixed(2)}`;

  // Detect wire/cable items — pricing excluded, show "Speak to sales"
  const isWireItem = (item: string, spec: string): boolean =>
    /\bTHHN\b|\bSER\b|\bXHHW\b|\bUSE-2\b|\bPV wire\b|\bNM-B\b|\bROMEX\b|\bMC cable\b/i.test(`${item} ${spec}`) ||
    /\bAWG\b.*\b(copper|aluminum|bare|GEC|black|red|white|green)\b/i.test(`${item} ${spec}`) ||
    /\bkcmil\b/i.test(`${item} ${spec}`) ||
    /\bAL SER\b|\bSE cable\b|\bconductor/i.test(`${item} ${spec}`) ||
    /\b(?:12|14|10|8|6|4|3|2)\/[234]\b.*(?:cable|wire|burial)/i.test(`${item} ${spec}`);

  // Compute materials subtotal — exclude wire items
  const materialsSubtotal = effectiveMaterials.reduce((sum, mat) => {
    if (mat.unitPrice == null || isWireItem(mat.item, mat.spec)) return sum;
    return sum + mat.unitPrice * parseQtyNum(mat.quantity);
  }, 0);

  const hasPricing = effectiveMaterials.some((m) => m.unitPrice != null);

  const handleCopyMaterials = () => {
    const rows = effectiveMaterials.map((m) => {
      const part = extractPartNumber(m.spec);
      const qty = extractQty(m.quantity);
      const identifier = part ?? m.item.replace(/[^A-Za-z0-9\-\/. ]/g, "").substring(0, 30).trim();
      return `${qty} ${identifier}`;
    });
    navigator.clipboard.writeText(rows.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      // Open Elliott Bulk Entry / Rapid Order in a new tab
      window.open("https://www.elliottelectric.com/P/Rapid", "_blank", "noopener,noreferrer");
      // Show toast
      setToast("List copied to clipboard and EES Bulk Entry opened in new tab. Paste into the Bulk Pad.");
      setTimeout(() => setToast(null), 5000);
    });
  };

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    // Dynamic import to avoid SSR issues with react-pdf
    const { generatePDF } = await import("@/lib/generatePDF");
    await generatePDF(result);
  };

  const handleDownloadJobSheet = async () => {
    const { generateJobSheet } = await import("@/lib/generatePDF");
    await generateJobSheet(result);
  };

  return (
    <div className="w-full space-y-4">
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl bg-gray-900 border border-yellow-400/50 text-sm text-white max-w-md w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-bottom-4 duration-300 no-print">
          <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
          <span className="flex-1 leading-snug">{toast}</span>
          <button onClick={() => setToast(null)} className="text-gray-500 hover:text-gray-300 transition-colors shrink-0 ml-1">✕</button>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{job.label}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <Badge className="bg-yellow-400/15 text-yellow-400 border-yellow-400/30 text-xs">
              {jurisdiction}
            </Badge>
            <Badge variant="outline" className="text-gray-400 border-gray-700 text-xs">
              NEC 2026
            </Badge>
            <span className="text-gray-600 text-xs">
              Generated {new Date(generatedAt).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:flex gap-2 no-print">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 active:bg-gray-700 transition-colors duration-150 h-11 sm:h-9 text-xs sm:text-sm"
          >
            <Printer className="w-4 h-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Print</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadJobSheet}
            className="border-yellow-400/40 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400 active:bg-yellow-400/10 transition-colors duration-150 font-semibold h-11 sm:h-9 text-xs sm:text-sm whitespace-nowrap"
          >
            <FileText className="w-4 h-4 sm:mr-1.5" />
            <span className="sm:hidden ml-1">Sheet</span>
            <span className="hidden sm:inline">Job Sheet</span>
          </Button>
          <Button
            size="sm"
            onClick={handleDownloadPDF}
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 active:bg-yellow-500 font-semibold transition-colors duration-150 h-11 sm:h-9 text-xs sm:text-sm whitespace-nowrap"
          >
            <Download className="w-4 h-4 sm:mr-1.5" />
            <span className="sm:hidden ml-1">PDF</span>
            <span className="hidden sm:inline">PDF Package</span>
          </Button>
        </div>
      </div>

      {/* Disclaimer Banner */}
      <div className="flex gap-2 p-3 rounded-lg bg-amber-900/20 border border-amber-700/40 text-amber-300 text-xs">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <span>{disclaimer}</span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="requirements" className="!flex-col space-y-4 [&_[data-slot=tabs-content]]:min-h-[400px]">
        <TabsList className="w-full bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] h-12 sm:h-10 gap-0.5 p-1 rounded-lg overflow-x-auto scrollbar-none scroll-touch">
          {[
            { value: "requirements", label: "Requirements", shortLabel: "Reqs", Icon: CheckCircle },
            { value: "materials", label: "Materials", shortLabel: "Parts", Icon: Package },
            { value: "blueprint", label: "Blueprint", shortLabel: "Print", Icon: PenTool },
            { value: "suppliers", label: "Suppliers", shortLabel: "Supply", Icon: Store },
            { value: "docs", label: "Official Docs", shortLabel: "Docs", Icon: FileText },
          ].map(({ value, label, shortLabel, Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex-1 h-full flex items-center justify-center gap-1 sm:gap-1.5 text-xs rounded-md text-gray-400 hover:text-gray-200 transition-colors duration-150 data-active:bg-yellow-400 data-active:text-gray-900 data-active:font-semibold data-active:shadow-none px-1.5 sm:px-3"
            >
              <Icon className="w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="hidden sm:inline truncate">{label}</span>
              <span className="sm:hidden text-[11px] leading-tight">{shortLabel}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Requirements Tab */}
        <TabsContent value="requirements">
          <Card className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400" />
                NEC 2026 + {utilityName} Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-yellow-400 font-bold shrink-0 w-5 mt-0.5">{i + 1}.</span>
                    <span className="text-gray-300 leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Materials Tab */}
        {/* Materials Tab */}
        <TabsContent value="materials">
          <Card className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Package className="w-4 h-4 text-yellow-400" />
                  Materials List
                </CardTitle>
                <Button size="sm" onClick={handleCopyMaterials} className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-semibold text-xs transition-colors duration-150 no-print">
                  {copied
                    ? <><ClipboardCheck className="w-3.5 h-3.5 mr-1.5" />Copied — paste into Bulk Pad!</>
                    : <><Zap className="w-3.5 h-3.5 mr-1.5 fill-gray-900" />Order on EES — Copy &amp; Open</>}
                </Button>
              </div>
              {hasPricing && (
                <div className="mt-2 flex items-center gap-2 no-print">
                  <button
                    onClick={() => setShowPricing(!showPricing)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${showPricing ? "bg-emerald-500" : "bg-gray-600"}`}
                    role="switch"
                    aria-checked={showPricing}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showPricing ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                  <span className="text-xs text-gray-400">{showPricing ? "Hide Pricing" : "Show Pricing"}</span>
                </div>
              )}
              <div className="mt-2 flex items-center gap-3 p-2.5 rounded-lg bg-yellow-400/8 border border-yellow-400/20">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
                <span className="text-xs text-gray-400 flex-1">Click <span className="text-yellow-400 font-semibold">Order on EES</span> to copy the list and open the Bulk Pad in one click. Each row also has direct Product and Search links.</span>
                <a href="https://www.elliottelectric.com/P/Rapid" target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-400 hover:text-yellow-300 font-semibold whitespace-nowrap flex items-center gap-1 transition-colors">Bulk Entry ↗<ExternalLink className="w-3 h-3" /></a>
              </div>
              {/* Point of Attachment dropdown for meter jobs */}
              {showPOA && (
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg bg-purple-500/8 border border-purple-500/25 no-print">
                  <div className="flex items-center gap-2 shrink-0">
                    <svg className="w-4 h-4 text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M7 12h10"/></svg>
                    <span className="text-xs text-purple-300 font-semibold whitespace-nowrap">Point of Attachment</span>
                  </div>
                  <select
                    value={poaId}
                    onChange={(e) => setPoaId(e.target.value)}
                    className="flex-1 text-xs bg-[hsl(222,47%,12%)] border border-purple-500/30 text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-400/50 cursor-pointer transition-colors hover:border-purple-400/50 appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a78bfa' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                  >
                    {POA_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {/* Mobile scroll hint */}
              <p className="sm:hidden text-xs text-gray-600 mb-2 flex items-center gap-1">
                <span>←</span> Swipe table to see all columns <span>→</span>
              </p>
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scroll-touch">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[hsl(217,33%,22%)] text-left">
                      <th className="pb-2 text-gray-500 font-medium text-xs uppercase tracking-wider pr-3 sm:pr-4">Item</th>
                      <th className="pb-2 text-gray-500 font-medium text-xs uppercase tracking-wider pr-3 sm:pr-4 whitespace-nowrap">Qty</th>
                      <th className="pb-2 text-gray-500 font-medium text-xs uppercase tracking-wider">Specification</th>
                      {hasPricing && showPricing && (
                        <th className="pb-2 text-gray-500 font-medium text-xs uppercase tracking-wider text-right pr-4 whitespace-nowrap">Est. Cost</th>
                      )}
                      <th className="pb-2 text-gray-500 font-medium text-xs uppercase tracking-wider text-right no-print">EES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[hsl(217,33%,16%)]">
                    {effectiveMaterials.map((mat, i) => (
                      <tr key={i} className="hover:bg-white/2 transition-colors">
                        <td className="py-3 sm:py-3 pr-3 sm:pr-4 font-medium text-white whitespace-nowrap text-xs sm:text-sm">{mat.item}</td>
                        <td className="py-3 sm:py-3 pr-3 sm:pr-4 text-yellow-400 font-semibold whitespace-nowrap text-xs sm:text-sm">{mat.quantity}</td>
                        <td className="py-3 sm:py-3 text-gray-400 leading-relaxed text-xs sm:text-sm">{mat.spec}</td>
                        {hasPricing && showPricing && (
                          <td className="py-3 pr-4 text-right whitespace-nowrap">
                            {isWireItem(mat.item, mat.spec) ? (
                              <span className="text-yellow-400/80 text-xs italic">Speak to sales</span>
                            ) : mat.unitPrice != null ? (
                              <div>
                                <span className="text-gray-500 text-xs">{fmtPrice(mat.unitPrice)} ea</span>
                                <div className="text-emerald-400 font-semibold text-sm">{fmtPrice(mat.unitPrice * parseQtyNum(mat.quantity))}</div>
                              </div>
                            ) : (
                              <span className="text-gray-600">—</span>
                            )}
                          </td>
                        )}
                        <td className="py-3 text-right no-print">
                          <ElliottLinks item={mat.item} spec={mat.spec} getUrls={elliottUrls} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {hasPricing && showPricing && (
                <div className="mt-4 pt-4 border-t border-[hsl(217,33%,18%)]">
                  <div className="flex justify-end items-baseline gap-4 mb-3">
                    <span className="text-gray-400 font-medium text-sm uppercase tracking-wider">Materials Subtotal</span>
                    <span className="text-emerald-400 font-bold text-xl">{fmtPrice(materialsSubtotal)}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                    <span className="text-yellow-400 font-semibold">⚠️ Rough estimate only.</span>{" "}
                    Rough cash-sale house-account pricing estimate only. Prices are approximate and will vary by location, timing, and your specific account discounts. Wire pricing excluded — speak to sales. Always verify current pricing with Elliott Electric Supply.
                  </p>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-[hsl(217,33%,18%)] flex flex-col sm:flex-row items-start sm:items-center gap-3 no-print">
                <p className="flex-1 text-xs text-gray-500">
                  <span className="text-yellow-400 font-semibold">One-click workflow:</span> Hit the button → list is on your clipboard → EES Bulk Pad opens → paste &amp; submit.
                </p>
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    onClick={handleCopyMaterials}
                    className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-semibold text-xs transition-colors duration-150"
                  >
                    {copied
                      ? <><ClipboardCheck className="w-3.5 h-3.5 mr-1.5" />Paste into Bulk Pad</>
                      : <><Zap className="w-3.5 h-3.5 mr-1.5 fill-gray-900" />Order on EES<ExternalLink className="w-3 h-3 ml-1.5" /></>}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blueprint Tab */}
        <TabsContent value="blueprint">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-yellow-400" />
                  Blueprint Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {effectiveBlueprintNotes?.map((note, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="text-yellow-400 font-bold shrink-0 mt-0.5">{">"}</span>
                      <span className="text-gray-300 leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {effectiveSvgDiagram && (
              <Card className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-base">Schematic Diagram</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="rounded-lg overflow-hidden border border-[hsl(217,33%,22%)]"
                    dangerouslySetInnerHTML={{ __html: effectiveSvgDiagram }}
                  />
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    Simplified schematic- not to scale
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers">
          <div className="space-y-4">
            {/* Elliott Electric Supply - featured */}
            {suppliers[0] && (
              <Card className="bg-[hsl(222,47%,10%)] border-yellow-400/40 ring-1 ring-yellow-400/20">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-white text-base font-bold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {suppliers[0].name}
                    </CardTitle>
                    <Badge className="bg-yellow-400/15 text-yellow-400 border-yellow-400/30 text-xs shrink-0">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400" />
                      Preferred Supplier
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-gray-400">{suppliers[0].address}</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${suppliers[0].phone}`}
                      className="flex items-center gap-1.5 text-yellow-400 hover:text-yellow-300 transition-colors py-1.5 sm:py-0"
                    >
                      <Phone className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                      {suppliers[0].phone}
                    </a>
                    {suppliers[0].website && (
                      <a
                        href={suppliers[0].website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        elliottelectric.com
                      </a>
                    )}
                  </div>
                  {suppliers[0].notes && (
                    <p className="text-gray-500 text-xs">{suppliers[0].notes}</p>
                  )}
                  <Button
                    size="sm"
                    onClick={handleCopyMaterials}
                    className="mt-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/20 active:bg-yellow-400/30 text-xs transition-colors duration-150"
                  >
                    {copied ? (
                      <><ClipboardCheck className="w-3.5 h-3.5 mr-1.5" />Paste into EES Bulk Pad</>
                    ) : (
                      <><Zap className="w-3.5 h-3.5 mr-1.5 fill-current" />Order on EES — Copy &amp; Open Bulk Pad</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Other suppliers toggle */}
            {suppliers.length > 1 && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOtherSuppliers(!showOtherSuppliers)}
                  className="text-gray-500 hover:text-gray-300 text-xs px-0 transition-colors"
                >
                  {showOtherSuppliers ? (
                    <ChevronUp className="w-3.5 h-3.5 mr-1.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 mr-1.5" />
                  )}
                  {showOtherSuppliers ? "Hide" : "Other Local Suppliers"} ({suppliers.length - 1})
                </Button>

                {showOtherSuppliers && (
                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    {suppliers.slice(1).map((supplier, i) => (
                      <Card key={i} className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-white text-sm font-semibold flex items-center gap-2">
                            <Store className="w-4 h-4 text-gray-500" />
                            {supplier.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <p className="text-gray-400">{supplier.address}</p>
                          <a
                            href={`tel:${supplier.phone}`}
                            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {supplier.phone}
                          </a>
                          {supplier.website && (
                            <a
                              href={supplier.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Globe className="w-3.5 h-3.5" />
                              Website
                            </a>
                          )}
                          {supplier.notes && (
                            <p className="text-gray-500 text-xs">{supplier.notes}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Official Docs Tab */}
        <TabsContent value="docs">
          <div className="space-y-3">
            {job.officialDocs.map((doc, i) => (
              <Card key={i} className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,20%)]">
                <CardContent className="pt-4 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex gap-3">
                      <FileText className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white text-sm">{doc.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:text-white hover:border-yellow-400 active:bg-gray-700 transition-colors duration-150 text-xs"
                      >
                        Open Doc ↗
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

