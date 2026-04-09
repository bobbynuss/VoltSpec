"use client";

import { useState, useEffect, useRef } from "react";
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
  Save,
  Check,
  Mail,
  Send,
} from "lucide-react";
import type { Job } from "@/lib/data";
import { useAuth } from "./AuthProvider";
import { QuoteRequestModal } from "./QuoteRequestModal";
import { JURISDICTIONS } from "@/lib/data";
import { POA_OPTIONS, DEFAULT_POA_ID, isMeterJob } from "@/lib/data/pointOfAttachment";
import type { POAOption } from "@/lib/data/pointOfAttachment";
import {
  PANEL_TYPE_OPTIONS,
  PANEL_ELIGIBLE_JOBS,
  getDefaultPanelType,
  applyPanelOverride,
} from "@/lib/data/panel-overrides";
import type { PanelTypeId } from "@/lib/data/panel-overrides";
import { groupMaterials } from "@/lib/data/material-groups";
import {
  extractPartNumber,
  elliottVendorCode,
  formatBulkEntryLine,
} from "@/lib/vendor-codes";
import { reorderSuppliersForZip } from "@/lib/zip-to-branch";
import type { MaterialGroup } from "@/lib/data/material-groups";

interface GenerateResult {
  job: Job;
  jurisdiction: string;
  city?: string;
  generatedAt: string;
  disclaimer: string;
}

interface ResultsPanelProps {
  result: GenerateResult;
  onSave?: (name: string) => void;
  zip?: string;
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

export function ResultsPanel({ result, onSave, zip }: ResultsPanelProps) {
  const { user } = useAuth();
  const { job, jurisdiction, city, generatedAt, disclaimer } = result;
  const jurisdictionData = JURISDICTIONS.find((j) => j.id === city);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
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
  const rawSuppliers = job.suppliers ?? [];
  const [suppliers, setSuppliers] = useState(() =>
    zip ? reorderSuppliersForZip(rawSuppliers, zip) : rawSuppliers
  );

  // Re-run zip-to-branch reordering whenever zip or job suppliers change
  useEffect(() => {
    const raw = job.suppliers ?? [];
    setSuppliers(zip ? reorderSuppliersForZip(raw, zip) : raw);
  }, [zip, job.suppliers]);

  // --- Point of Attachment dropdown state ---
  const showPOA = isMeterJob(job.id);
  const [poaId, setPoaId] = useState(DEFAULT_POA_ID);
  const poaOption = POA_OPTIONS.find((o) => o.id === poaId) ?? POA_OPTIONS[0];

  // --- Panel Type selector state ---
  const showPanelSelector = PANEL_ELIGIBLE_JOBS.has(job.id);
  const defaultPanelType = getDefaultPanelType(city ?? "austin");
  const [panelType, setPanelType] = useState<PanelTypeId>(defaultPanelType);

  // Reset panel type when city/job changes
  useEffect(() => {
    setPanelType(getDefaultPanelType(city ?? "austin"));
  }, [city, job.id]);

  // Apply panel override to get effective job
  const panelJob = showPanelSelector
    ? applyPanelOverride(job, panelType)
    : job;

  // Build effective materials / blueprintNotes / svgDiagram with POA injected
  const effectiveMaterials = showPOA
    ? [...panelJob.materials, ...poaOption.materials]
    : panelJob.materials;

  const effectiveBlueprintNotes = showPOA && panelJob.blueprintNotes
    ? [...panelJob.blueprintNotes, poaOption.blueprintNote]
    : panelJob.blueprintNotes;

  const effectiveSvgDiagram = showPOA && panelJob.svgDiagram
    ? (() => {
        const svg = panelJob.svgDiagram!;
        // Find the LEGEND box rect to position POA label just above it
        const legendBoxMatch = svg.match(/<rect[^>]*y="(\d+)"[^>]*width="3[012]\d"[^>]*height="[67]\d"/);
        const legendY = legendBoxMatch ? parseInt(legendBoxMatch[1]) : 572;
        const poaY = legendY - 6; // just above the legend box
        return svg.replace(
          /<\/svg>\s*$/,
          `<text x="170" y="${poaY}" text-anchor="middle" fill="#a78bfa" font-size="8" font-style="italic">${poaOption.svgLabel}</text>\n</svg>`
        );
      })()
    : panelJob.svgDiagram;

  // extractPartNumber imported from @/lib/vendor-codes

  // elliottVendorCode imported from @/lib/vendor-codes

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
    const rows = effectiveMaterials.map((m) =>
      formatBulkEntryLine(m.quantity, m.spec, m.item)
    );
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

  // ── Save project inline UI state ──────────────────────────────────
  const [saveMode, setSaveMode] = useState(false);
  const [saveNameInput, setSaveNameInput] = useState("");
  const [justSaved, setJustSaved] = useState(false);
  const saveInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (saveMode && saveInputRef.current) {
      saveInputRef.current.focus();
    }
  }, [saveMode]);

  const defaultSaveName = `${job.label} — ${jurisdiction.split("(")[0].trim()}`;

  const handleSaveClick = () => {
    if (saveMode) {
      // Commit save
      const name = saveNameInput.trim() || defaultSaveName;
      onSave?.(name);
      setSaveMode(false);
      setSaveNameInput("");
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    } else {
      setSaveMode(true);
      setSaveNameInput("");
    }
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

  const [emailing, setEmailing] = useState(false);
  const handleEmailPackage = async () => {
    setEmailing(true);
    try {
      const { generatePDF } = await import("@/lib/generatePDF");
      await generatePDF(result);
      const subject = encodeURIComponent(`VoltSpec Job Package – ${job.label} – ${jurisdiction.split("(")[0].trim()}`);
      const body = encodeURIComponent(
        `Hi,\n\nPlease find attached the VoltSpec job package for:\n\n` +
        `  Job: ${job.label}\n` +
        `  Jurisdiction: ${jurisdiction}\n` +
        `  Generated: ${new Date(generatedAt).toLocaleString()}\n\n` +
        `Please attach the PDF that was just downloaded to this email.\n\n` +
        `This package includes NEC 2026 requirements, materials list with Elliott Electric Supply pricing, and a schematic diagram.\n\n` +
        `— Generated by VoltSpec (https://voltspec.online)`
      );
      window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
    } finally {
      setEmailing(false);
    }
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
        <div className="flex flex-col gap-2 no-print">
          <div className="grid grid-cols-3 sm:flex gap-2">
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
              data-tour="jobsheet-btn"
              className="border-yellow-400/40 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400 active:bg-yellow-400/10 transition-colors duration-150 font-semibold h-11 sm:h-9 text-xs sm:text-sm whitespace-nowrap"
            >
              <FileText className="w-4 h-4 sm:mr-1.5" />
              <span className="sm:hidden ml-1">Sheet</span>
              <span className="hidden sm:inline">Job Sheet</span>
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadPDF}
              data-tour="pdf-btn"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 active:bg-yellow-500 font-semibold transition-colors duration-150 h-11 sm:h-9 text-xs sm:text-sm whitespace-nowrap"
            >
              <Download className="w-4 h-4 sm:mr-1.5" />
              <span className="sm:hidden ml-1">PDF</span>
              <span className="hidden sm:inline">PDF Package</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEmailPackage}
              disabled={emailing}
              className="border-orange-500/40 text-orange-400 hover:text-orange-300 hover:border-orange-400 active:bg-orange-400/10 transition-colors duration-150 h-11 sm:h-9 text-xs sm:text-sm whitespace-nowrap"
            >
              {emailing ? (
                <><span className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin sm:mr-1.5" /><span className="hidden sm:inline">Sending…</span></>
              ) : (
                <><Mail className="w-4 h-4 sm:mr-1.5" /><span className="hidden sm:inline">Email</span></>
              )}
            </Button>
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuoteModalOpen(true)}
                data-tour="quote-btn"
                className="border-emerald-500/40 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400 active:bg-emerald-400/10 transition-colors duration-150 h-11 sm:h-9 text-xs sm:text-sm whitespace-nowrap"
              >
                <Send className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Quote Request</span>
              </Button>
            )}
            {onSave && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveClick}
                data-tour="save-btn"
                className={`transition-colors duration-150 h-11 sm:h-9 text-xs sm:text-sm whitespace-nowrap ${
                  justSaved
                    ? "border-emerald-500/50 text-emerald-400 hover:text-emerald-300"
                    : saveMode
                      ? "border-yellow-400 text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20"
                      : "border-cyan-500/40 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400"
                }`}
              >
                {justSaved ? (
                  <><Check className="w-4 h-4 sm:mr-1.5" /><span className="hidden sm:inline">Saved!</span></>
                ) : saveMode ? (
                  <><Save className="w-4 h-4 sm:mr-1.5" /><span className="hidden sm:inline">Confirm</span></>
                ) : (
                  <><Save className="w-4 h-4 sm:mr-1.5" /><span className="hidden sm:inline">Save Job</span></>
                )}
              </Button>
            )}
          </div>
          {/* Inline save name input */}
          {saveMode && onSave && (
            <div className="flex gap-2 items-center animate-in fade-in slide-in-from-top-1 duration-150">
              <input
                ref={saveInputRef}
                type="text"
                value={saveNameInput}
                onChange={(e) => setSaveNameInput(e.target.value)}
                placeholder={defaultSaveName}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveClick();
                  if (e.key === "Escape") { setSaveMode(false); setSaveNameInput(""); }
                }}
                className="flex-1 px-3 py-1.5 rounded-md text-xs bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 h-8"
              />
              <button
                onClick={() => { setSaveMode(false); setSaveNameInput(""); }}
                className="text-xs text-gray-500 hover:text-gray-300 px-2 py-1"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer Banner */}
      <div className="flex gap-2 p-3 rounded-lg bg-amber-900/20 border border-amber-700/40 text-amber-300 text-xs">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <span>{disclaimer}</span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="requirements" className="!flex-col space-y-4 [&_[data-slot=tabs-content]]:min-h-[400px]">
        <TabsList className="w-full bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] h-12 sm:h-10 gap-0 sm:gap-0.5 p-0.5 sm:p-1 rounded-lg overflow-x-auto scrollbar-none scroll-touch flex-nowrap">
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
                {panelJob.requirements.map((req, i) => (
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
              <div className="mt-2 flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg bg-yellow-400/8 border border-yellow-400/20">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-400 flex-1 leading-snug">
                  <span className="hidden sm:inline">Click <span className="text-yellow-400 font-semibold">Order on EES</span> to copy the list and open the Bulk Pad in one click. Each row also has direct Product and Search links.</span>
                  <span className="sm:hidden"><span className="text-yellow-400 font-semibold">Order on EES</span> copies list &amp; opens Bulk Pad.</span>
                </span>
                <a href="https://www.elliottelectric.com/P/Rapid" target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-400 hover:text-yellow-300 font-semibold whitespace-nowrap flex items-center gap-1 transition-colors">Bulk Entry ↗<ExternalLink className="w-3 h-3" /></a>
              </div>
              {/* Panel Type selector — inside Materials tab for panel-eligible jobs */}
              {showPanelSelector && (
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg bg-cyan-500/8 border border-cyan-500/25 no-print">
                  <div className="flex items-center gap-2 shrink-0">
                    <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-xs text-cyan-300 font-semibold whitespace-nowrap">Panel Type</span>
                  </div>
                  <select
                    value={panelType}
                    onChange={(e) => setPanelType(e.target.value as PanelTypeId)}
                    className="flex-1 text-xs bg-[hsl(222,47%,12%)] border border-cyan-500/30 text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 cursor-pointer transition-colors hover:border-cyan-400/50 appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2322d3ee' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                  >
                    {PANEL_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}{opt.id === defaultPanelType ? " (recommended)" : ""}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-gray-500 sm:ml-1">
                    {PANEL_TYPE_OPTIONS.find((o) => o.id === panelType)?.description}
                  </span>
                </div>
              )}
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

              {/* Grouped materials rendering */}
              {groupMaterials(effectiveMaterials).map((group) => (
                <div key={group.id} className="mb-6 last:mb-0">
                  {/* Group header */}
                  <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[hsl(217,33%,22%)]" data-tour={`group-${group.id}`}>
                    <span className="text-sm">{group.icon}</span>
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">{group.label}</h4>
                    <span className="text-[10px] text-gray-600 ml-auto">{group.items.length} item{group.items.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scroll-touch">
                    <table className="w-full text-sm min-w-[520px]">
                      <thead>
                        <tr className="text-left">
                          <th className="pb-1.5 text-gray-600 font-medium text-[10px] uppercase tracking-wider pr-3 sm:pr-4">Item</th>
                          <th className="pb-1.5 text-gray-600 font-medium text-[10px] uppercase tracking-wider pr-3 sm:pr-4 whitespace-nowrap">Qty</th>
                          <th className="pb-1.5 text-gray-600 font-medium text-[10px] uppercase tracking-wider">Specification</th>
                          {hasPricing && showPricing && (
                            <th className="pb-1.5 text-gray-600 font-medium text-[10px] uppercase tracking-wider text-right pr-4 whitespace-nowrap">Est. Cost</th>
                          )}
                          <th className="pb-1.5 text-gray-600 font-medium text-[10px] uppercase tracking-wider text-right no-print">EES</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[hsl(217,33%,14%)]">
                        {group.items.map((mat, i) => (
                          <tr key={i} className="hover:bg-white/2 transition-colors">
                            <td className="py-2.5 sm:py-2.5 pr-3 sm:pr-4 font-medium text-white whitespace-nowrap text-xs sm:text-sm">{mat.item}</td>
                            <td className="py-2.5 sm:py-2.5 pr-3 sm:pr-4 text-yellow-400 font-semibold whitespace-nowrap text-xs sm:text-sm">{mat.quantity}</td>
                            <td className="py-2.5 sm:py-2.5 text-gray-400 leading-relaxed text-xs sm:text-sm">{mat.spec}</td>
                            {hasPricing && showPricing && (
                              <td className="py-2.5 pr-4 text-right whitespace-nowrap">
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
                            <td className="py-2.5 text-right no-print">
                              <ElliottLinks item={mat.item} spec={mat.spec} getUrls={elliottUrls} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
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
                <p className="flex-1 text-xs text-gray-500 leading-snug">
                  <span className="text-yellow-400 font-semibold">One-click:</span>
                  <span className="hidden sm:inline"> Hit the button → list is on your clipboard → EES Bulk Pad opens → paste &amp; submit.</span>
                  <span className="sm:hidden"> Copy → Bulk Pad opens → paste.</span>
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
            {panelJob.officialDocs.map((doc, i) => (
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

      {/* Quote Request Modal */}
      <QuoteRequestModal
        open={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        job={panelJob}
        city={city ?? ""}
        jurisdiction={jurisdiction}
      />
    </div>
  );
}

