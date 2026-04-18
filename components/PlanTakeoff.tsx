"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload,
  FileImage,
  Loader2,
  Zap,
  ArrowRight,
  X,
  AlertTriangle,
  Plus,
  CheckCircle,
  Users,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { classifyTakeoffItems } from "@/lib/takeoff-classifier";
import type { ClassifiedItem } from "@/lib/takeoff-classifier";

interface TakeoffItem {
  item: string;
  spec: string;
  quantity: string;
}

interface PlanTakeoffProps {
  onAddToList: (items: TakeoffItem[]) => void;
  onSaveAndCollaborate?: (items: TakeoffItem[], file: File | null) => void;
  autoCollaborate?: boolean; // Auto-trigger Save & Collaborate when analysis completes
  onClose: () => void;
}

export function PlanTakeoff({ onAddToList, onSaveAndCollaborate, autoCollaborate, onClose }: PlanTakeoffProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TakeoffItem[] | null>(null);
  const [classified, setClassified] = useState<{ collaborate: ClassifiedItem[]; quicklist: ClassifiedItem[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoTriggered, setAutoTriggered] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const fileObjRef = useRef<File | null>(null);

  // Keep file ref in sync
  useEffect(() => { fileObjRef.current = file; }, [file]);

  // Auto-trigger Save & Collaborate when analysis completes (Upload & Collaborate flow)
  useEffect(() => {
    if (autoCollaborate && results && results.length > 0 && classified && onSaveAndCollaborate && !autoTriggered) {
      setAutoTriggered(true);
      // Small delay to let React settle, then call ONLY onSaveAndCollaborate
      // Do NOT call onAddToList here — it unmounts the component by switching modes
      // The parent will handle adding quicklist items to localStorage directly
      setTimeout(() => {
        onSaveAndCollaborate(results, fileObjRef.current);
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCollaborate, results, classified, autoTriggered]);

  const handleFile = useCallback((f: File) => {
    const isImage = f.type.startsWith("image/");
    const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isImage && !isPdf) {
      setError("Please upload an image (JPG, PNG, WebP) or a PDF file.");
      return;
    }
    if (f.size > 25 * 1024 * 1024) {
      setError(`File is ${(f.size / 1024 / 1024).toFixed(1)}MB — too large for AI analysis. Please upload just the electrical sheets (E-pages) from the permit set, not the full document.`);
      return;
    }
    setFile(f);
    setError(null);
    setResults(null);

    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      // PDF — show filename as preview instead of image
      setPreview("pdf");
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Convert file to base64 on the client
      const arrayBuffer = await file.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );

      // Split into chunks if needed — Vercel has 4.5MB body limit
      // For files under ~3MB raw (4MB base64), send directly
      // For larger files, send base64 in chunks via multiple requests
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4 * 60 * 1000);

      let res: Response;
      if (base64.length < 3.5 * 1024 * 1024) {
        // Small enough — send directly
        res = await fetch("/api/takeoff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: base64,
            fileName: file.name,
            fileType: file.type,
            notes: notes?.trim() || undefined,
          }),
          signal: controller.signal,
        });
      } else {
        // Too large for Vercel — upload base64 chunks and assemble server-side
        // Step 1: Upload to temporary endpoint
        const uploadRes = await fetch("/api/takeoff/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
            fileSize: base64.length,
            notes: notes?.trim() || undefined,
          }),
          signal: controller.signal,
        });
        const { uploadId } = await uploadRes.json();

        // Step 2: Send chunks
        const CHUNK_SIZE = 3 * 1024 * 1024; // 3MB chunks
        const totalChunks = Math.ceil(base64.length / CHUNK_SIZE);
        for (let i = 0; i < totalChunks; i++) {
          const chunk = base64.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
          await fetch("/api/takeoff/upload", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uploadId, chunkIndex: i, chunk }),
            signal: controller.signal,
          });
        }

        // Step 3: Process
        res = await fetch("/api/takeoff/upload", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uploadId, totalChunks }),
          signal: controller.signal,
        });
      }
      clearTimeout(timeout);

      let data;
      try {
        data = await res.json();
      } catch {
        setError("Server returned an invalid response. The plan may be too large — try uploading just the electrical sheets.");
        return;
      }

      if (!res.ok || data.error) {
        setError(data.error || "Analysis failed");
        return;
      }

      if (data.items && Array.isArray(data.items)) {
        setResults(data.items);
        // Auto-classify into collaborate vs quicklist
        const split = classifyTakeoffItems(data.items);
        setClassified(split);
      }
    } catch (err: any) {
      if (err?.name === "AbortError") {
        setError("Analysis timed out — this plan may be too large. Try uploading just the electrical sheets (not the full permit set).");
      } else {
        setError("Connection error. Check your network and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isUnreadable = results?.length === 1 && results[0].quantity === "0";

  return (
    <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(217,33%,18%)] bg-[hsl(222,47%,9%)]">
        <div className="flex items-center gap-2">
          <FileImage className="w-4 h-4 text-yellow-400" />
          <h3 className="text-sm font-semibold text-white">AI Plan Takeoff</h3>
          <span className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">Beta</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Upload Area */}
        {!results && (
          <>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className={`
                border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${file
                  ? "border-yellow-400/40 bg-yellow-400/5"
                  : "border-[hsl(217,33%,25%)] hover:border-yellow-400/30 hover:bg-white/[0.02]"
                }
              `}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.pdf,application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
                className="hidden"
              />
              {preview ? (
                <div className="space-y-3">
                  {preview === "pdf" ? (
                    <div className="flex items-center justify-center gap-3 py-4">
                      <svg className="w-10 h-10 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M10 13h4"/><path d="M10 17h4"/></svg>
                      <div className="text-left">
                        <p className="text-sm text-white font-medium">{file?.name}</p>
                        <p className="text-xs text-gray-500">{file ? `${(file.size / 1024 / 1024).toFixed(1)} MB — PDF` : "PDF"}</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={preview}
                      alt="Plan preview"
                      className="max-h-48 mx-auto rounded-lg border border-[hsl(217,33%,22%)]"
                    />
                  )}
                  <p className="text-xs text-gray-400">
                    <span className="text-white font-medium">{file?.name}</span> — click to change
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-gray-500 mx-auto" />
                  <p className="text-sm text-gray-400">
                    Drop an electrical plan here, or <span className="text-yellow-400">click to browse</span>
                  </p>
                  <p className="text-xs text-gray-600">
                    PDF, JPG, PNG, or WebP · Max 25MB · For large permit sets, upload just the E-sheets
                  </p>
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                Notes for AI <span className="text-gray-600 normal-case">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder='e.g. "Residential 2-story, 200A service, all LED lighting, ignore low-voltage"'
                rows={2}
                className="w-full mt-1 px-3 py-2 rounded-md text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors resize-none"
              />
            </div>

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-semibold transition-colors duration-150 h-11 disabled:opacity-40"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {file && file.size > 5 * 1024 * 1024 ? "Analyzing large plan — this may take 1-2 minutes…" : "Analyzing plan…"}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 fill-gray-900" />
                  Analyze Plan
                </span>
              )}
            </Button>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-900/20 border border-red-700/40 text-red-300 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Results — Split View */}
        {results && !isUnreadable && classified && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white font-semibold">
                Found {results.length} items
              </p>
              <button
                onClick={() => { setResults(null); setClassified(null); setFile(null); setPreview(null); }}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                New scan
              </button>
            </div>

            {/* Big Ticket → Vendor Coordination */}
            {classified.collaborate.length > 0 && (
              <div className="rounded-xl border border-purple-500/30 overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 bg-purple-500/10 border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-xs font-semibold text-purple-300">
                      Vendor Coordination ({classified.collaborate.length})
                    </span>
                  </div>
                  <span className="text-[10px] text-purple-400/60">Fixtures · Gear · Panels · Enclosures</span>
                </div>
                <div className="max-h-[180px] overflow-y-auto divide-y divide-[hsl(217,33%,14%)]">
                  {classified.collaborate.map((item, i) => (
                    <div key={`c-${i}`} className="flex items-center gap-3 px-3 py-2 bg-purple-500/[0.03]">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-medium truncate">{item.item}</div>
                        <div className="text-[10px] text-gray-500 truncate">{item.spec}</div>
                      </div>
                      <span className="text-xs text-purple-400 font-semibold shrink-0">{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Commodity → Elliott Stock */}
            {classified.quicklist.length > 0 && (
              <div className="rounded-xl border border-[hsl(217,33%,20%)] overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 bg-[hsl(217,33%,11%)] border-b border-[hsl(217,33%,18%)]">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-xs font-semibold text-gray-300">
                      Elliott Stock Items ({classified.quicklist.length})
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-600">Wire · Conduit · Fittings · Devices</span>
                </div>
                <div className="max-h-[180px] overflow-y-auto divide-y divide-[hsl(217,33%,14%)]">
                  {classified.quicklist.map((item, i) => (
                    <div key={`q-${i}`} className="flex items-center gap-3 px-3 py-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-medium truncate">{item.item}</div>
                        <div className="text-[10px] text-gray-500 truncate">{item.spec}</div>
                      </div>
                      <span className="text-xs text-yellow-400 font-semibold shrink-0">{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Single action button — does everything at once */}
            {onSaveAndCollaborate ? (
              <Button
                onClick={() => {
                  // Call ONLY onSaveAndCollaborate — it handles quicklist internally
                  // Do NOT call onAddToList here (it unmounts this component)
                  onSaveAndCollaborate(results, file);
                }}
                className="w-full bg-purple-500 hover:bg-purple-400 active:bg-purple-600 text-white font-semibold transition-colors duration-150 h-11"
              >
                <Zap className="w-4 h-4 mr-1.5 fill-white" />
                Save Project & Start Collaboration
              </Button>
            ) : (
              <Button
                onClick={() => onAddToList(results)}
                className="w-full bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-semibold transition-colors duration-150 h-11"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add all {results.length} items to Quick List
              </Button>
            )}

            {onSaveAndCollaborate && (
              <p className="text-[10px] text-gray-600 text-center leading-relaxed">
                {classified.collaborate.length > 0 && classified.quicklist.length > 0
                  ? `${classified.collaborate.length} vendor items → project for collaboration · ${classified.quicklist.length} stock items → Quick List · Elliott rep sees full BOM`
                  : classified.collaborate.length > 0
                    ? `All ${classified.collaborate.length} items saved to project for vendor collaboration`
                    : `All ${classified.quicklist.length} items added to Quick List — save & collaborate to coordinate with Elliott`
                }
              </p>
            )}
          </div>
        )}

        {/* Unreadable message */}
        {results && isUnreadable && (
          <div className="space-y-3">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-900/20 border border-amber-700/40 text-amber-300 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{results[0].spec}</span>
            </div>
            <button
              onClick={() => { setResults(null); setClassified(null); setFile(null); setPreview(null); }}
              className="text-xs text-gray-400 hover:text-yellow-400 transition-colors"
            >
              ← Try another image
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-[10px] text-gray-600 leading-relaxed">
          ⚠️ AI takeoff is a rough estimate — always verify quantities against actual plans. Counts may miss items or
          double-count. Use as a starting point, not a final BOM.
        </p>
      </div>
    </div>
  );
}
