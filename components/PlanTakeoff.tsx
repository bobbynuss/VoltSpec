"use client";

import { useState, useRef, useCallback } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TakeoffItem {
  item: string;
  spec: string;
  quantity: string;
}

interface PlanTakeoffProps {
  onAddToList: (items: TakeoffItem[]) => void;
  onClose: () => void;
}

export function PlanTakeoff({ onAddToList, onClose }: PlanTakeoffProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TakeoffItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, or WebP). For PDFs, take a screenshot of the electrical plan page first.");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setError("File too large. Max 20MB.");
      return;
    }
    setFile(f);
    setError(null);
    setResults(null);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
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
      const formData = new FormData();
      formData.append("file", file);
      if (notes.trim()) formData.append("notes", notes.trim());

      const res = await fetch("/api/takeoff", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Analysis failed");
        return;
      }

      if (data.items && Array.isArray(data.items)) {
        setResults(data.items);
        // Select all by default
        setSelected(new Set(data.items.map((_: TakeoffItem, i: number) => i)));
      }
    } catch {
      setError("Connection error. Check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleAll = () => {
    if (!results) return;
    if (selected.size === results.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(results.map((_, i) => i)));
    }
  };

  const handleAddSelected = () => {
    if (!results) return;
    const items = results.filter((_, i) => selected.has(i));
    if (items.length > 0) {
      onAddToList(items);
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
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
                className="hidden"
              />
              {preview ? (
                <div className="space-y-3">
                  <img
                    src={preview}
                    alt="Plan preview"
                    className="max-h-48 mx-auto rounded-lg border border-[hsl(217,33%,22%)]"
                  />
                  <p className="text-xs text-gray-400">
                    <span className="text-white font-medium">{file?.name}</span> — click to change
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-gray-500 mx-auto" />
                  <p className="text-sm text-gray-400">
                    Drop an electrical plan image here, or <span className="text-yellow-400">click to browse</span>
                  </p>
                  <p className="text-xs text-gray-600">
                    JPG, PNG, or WebP · Max 20MB · For PDFs, screenshot the electrical plan page
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
                  Analyzing plan…
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

        {/* Results */}
        {results && !isUnreadable && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white font-semibold">
                Found {results.length} items
              </p>
              <div className="flex items-center gap-3">
                <button onClick={toggleAll} className="text-xs text-gray-400 hover:text-yellow-400 transition-colors">
                  {selected.size === results.length ? "Deselect all" : "Select all"}
                </button>
                <button
                  onClick={() => { setResults(null); setFile(null); setPreview(null); }}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  New scan
                </button>
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto rounded-lg border border-[hsl(217,33%,18%)] divide-y divide-[hsl(217,33%,14%)]">
              {results.map((item, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${
                    selected.has(i) ? "bg-yellow-400/5" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected.has(i)}
                    onChange={() => toggleItem(i)}
                    className="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 bg-transparent"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">{item.item}</div>
                    <div className="text-[10px] text-gray-500 truncate">{item.spec}</div>
                  </div>
                  <span className="text-xs text-yellow-400 font-semibold shrink-0">{item.quantity}</span>
                </label>
              ))}
            </div>

            <Button
              onClick={handleAddSelected}
              disabled={selected.size === 0}
              className="w-full bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-semibold transition-colors duration-150 h-11 disabled:opacity-40"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add {selected.size} item{selected.size !== 1 ? "s" : ""} to Quick List
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
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
              onClick={() => { setResults(null); setFile(null); setPreview(null); }}
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
