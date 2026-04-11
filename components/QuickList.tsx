"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  ClipboardCopy,
  ClipboardCheck,
  Download,
  ShoppingCart,
  X,
  GripVertical,
  Zap,
  ExternalLink,
  ArrowLeft,
  Save,
  Check,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDistributor } from "@/lib/registry";
import { CATALOG_CATEGORIES, STARTER_TEMPLATES } from "@/lib/quicklist-catalog";
import type { CatalogItem, CatalogCategory, StarterTemplate } from "@/lib/quicklist-catalog";
import { PlanTakeoff } from "./PlanTakeoff";

const distributor = getDistributor();

export interface QuickListItem {
  id: string;
  item: string;
  spec: string;
  quantity: string;
  unitPrice?: number;
}

interface QuickListProps {
  onBack: () => void;
  zip?: string;
}

const STORAGE_KEY = "voltspec-quicklist";

function loadItems(): QuickListItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveItems(items: QuickListItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function QuickList({ onBack, zip }: QuickListProps) {
  const [items, setItems] = useState<QuickListItem[]>(() => loadItems());
  const [itemInput, setItemInput] = useState("");
  const [specInput, setSpecInput] = useState("");
  const [qtyInput, setQtyInput] = useState("1");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const itemRef = useRef<HTMLInputElement>(null);

  // Persist on change
  useEffect(() => {
    saveItems(items);
  }, [items]);

  const addItem = useCallback(() => {
    const name = itemInput.trim();
    if (!name) return;
    const newItem: QuickListItem = {
      id: crypto.randomUUID(),
      item: name,
      spec: specInput.trim(),
      quantity: qtyInput || "1",
    };
    setItems((prev) => [...prev, newItem]);
    setItemInput("");
    setSpecInput("");
    setQtyInput("1");
    itemRef.current?.focus();
  }, [itemInput, specInput, qtyInput]);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof QuickListItem, value: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const clearAll = () => {
    if (items.length === 0) return;
    setItems([]);
    setToast("List cleared");
    setTimeout(() => setToast(null), 2500);
  };

  const handleCopyBulk = () => {
    const lines = items.map((i) =>
      distributor.formatBulkEntryLine(i.quantity, i.spec || i.item, i.item)
    );
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      setToast("Bulk Entry list copied to clipboard");
      setTimeout(() => setToast(null), 3000);
    });
  };

  const getElliottUrl = (item: string, spec: string) => {
    const part = spec ? distributor.extractPartNumber(spec) : null;
    const query = part ?? item;
    return `https://www.elliottelectric.com/StaticPages/QuickFind.aspx?SearchString=${encodeURIComponent(query)}`;
  };

  const [showCatalog, setShowCatalog] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(() => items.length === 0);
  const [showTakeoff, setShowTakeoff] = useState(false);

  const loadTemplate = (template: StarterTemplate) => {
    const newItems: QuickListItem[] = template.items.map((t) => ({
      id: crypto.randomUUID(),
      item: t.item,
      spec: t.spec,
      quantity: t.quantity,
    }));
    setItems(newItems);
    setShowTemplates(false);
    setToast(`Loaded "${template.label}" template`);
    setTimeout(() => setToast(null), 3000);
  };

  const addCatalogItem = (catItem: CatalogItem) => {
    const newItem: QuickListItem = {
      id: crypto.randomUUID(),
      item: catItem.item,
      spec: catItem.spec,
      quantity: catItem.defaultQty,
    };
    setItems((prev) => [...prev, newItem]);
    setToast(`Added ${catItem.item}`);
    setTimeout(() => setToast(null), 2000);
  };

  const totalItems = items.reduce((sum, i) => {
    const n = parseInt(i.quantity) || 1;
    return sum + n;
  }, 0);

  const activeCatalogCategory = CATALOG_CATEGORIES.find((c) => c.id === catalogCategory);

  return (
    <div className="w-full space-y-4">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl bg-gray-900 border border-yellow-400/50 text-sm text-white max-w-md w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
          <span className="flex-1 leading-snug">{toast}</span>
          <button onClick={() => setToast(null)} className="text-gray-500 hover:text-gray-300 transition-colors shrink-0 ml-1">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-yellow-400 transition-colors p-1"
            title="Back to Job Specs"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              Quick List
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Build a custom materials list — truck stock, punch lists, service calls
            </p>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <Button
                size="sm"
                onClick={handleCopyBulk}
                className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-semibold text-xs transition-colors duration-150"
              >
                {copied
                  ? <><ClipboardCheck className="w-3.5 h-3.5 mr-1.5" />Copied!</>
                  : <><ClipboardCopy className="w-3.5 h-3.5 mr-1.5" />Copy Bulk Entry</>}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Starter Templates */}
      {showTemplates && (
        <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Start from a template</h3>
            <button
              onClick={() => setShowTemplates(false)}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Skip
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STARTER_TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => loadTemplate(t)}
                className="flex flex-col items-start gap-1.5 p-3 rounded-lg border border-[hsl(217,33%,22%)] hover:border-yellow-400/40 hover:bg-yellow-400/5 transition-colors text-left"
              >
                <span className="text-lg">{t.icon}</span>
                <span className="text-sm font-semibold text-white leading-tight">{t.label}</span>
                <span className="text-[10px] text-gray-500 leading-snug">{t.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Template + Catalog toggle buttons */}
      {!showTemplates && (
        <div className="flex gap-2">
          <button
            onClick={() => setShowTemplates(true)}
            className="text-xs text-gray-500 hover:text-yellow-400 transition-colors px-2 py-1 rounded border border-[hsl(217,33%,22%)] hover:border-yellow-400/30"
          >
            📋 Templates
          </button>
          <button
            onClick={() => { setShowCatalog(!showCatalog); setCatalogCategory(null); }}
            className={`text-xs transition-colors px-2 py-1 rounded border ${
              showCatalog
                ? "text-yellow-400 border-yellow-400/40 bg-yellow-400/5"
                : "text-gray-500 hover:text-yellow-400 border-[hsl(217,33%,22%)] hover:border-yellow-400/30"
            }`}
          >
            📦 Browse Parts
          </button>
          <button
            onClick={() => setShowTakeoff(!showTakeoff)}
            className={`text-xs transition-colors px-2 py-1 rounded border ${
              showTakeoff
                ? "text-yellow-400 border-yellow-400/40 bg-yellow-400/5"
                : "text-gray-500 hover:text-yellow-400 border-[hsl(217,33%,22%)] hover:border-yellow-400/30"
            }`}
          >
            📐 AI Takeoff
          </button>
        </div>
      )}

      {/* Parts Catalog Browser */}
      {showCatalog && !showTemplates && (
        <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl overflow-hidden">
          {/* Category tabs */}
          <div className="flex gap-0 overflow-x-auto scrollbar-none border-b border-[hsl(217,33%,18%)]">
            {CATALOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCatalogCategory(catalogCategory === cat.id ? null : cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
                  catalogCategory === cat.id
                    ? "text-yellow-400 border-yellow-400 bg-yellow-400/5"
                    : "text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/[0.02]"
                }`}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Category items */}
          {activeCatalogCategory && (
            <div className="max-h-[300px] overflow-y-auto">
              <div className="divide-y divide-[hsl(217,33%,14%)]">
                {activeCatalogCategory.items.map((catItem, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white font-medium truncate">{catItem.item}</div>
                      <div className="text-[10px] text-gray-500 truncate">{catItem.spec}</div>
                    </div>
                    <span className="text-xs text-gray-600 shrink-0">{catItem.defaultQty}</span>
                    <button
                      onClick={() => addCatalogItem(catItem)}
                      className="shrink-0 px-2.5 py-1 rounded text-xs font-semibold bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 transition-colors"
                    >
                      <Plus className="w-3 h-3 inline mr-0.5" />Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!activeCatalogCategory && (
            <div className="px-4 py-6 text-center text-xs text-gray-500">
              Pick a category above to browse parts
            </div>
          )}
        </div>
      )}

      {/* AI Plan Takeoff */}
      {showTakeoff && !showTemplates && (
        <PlanTakeoff
          onAddToList={(takeoffItems) => {
            const newItems: QuickListItem[] = takeoffItems.map((t) => ({
              id: crypto.randomUUID(),
              item: t.item,
              spec: t.spec,
              quantity: t.quantity,
            }));
            setItems((prev) => [...prev, ...newItems]);
            setShowTakeoff(false);
            setToast(`Added ${newItems.length} items from plan takeoff`);
            setTimeout(() => setToast(null), 3000);
          }}
          onClose={() => setShowTakeoff(false)}
        />
      )}

      {/* Add Item Form */}
      <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Item Name</label>
            <input
              ref={itemRef}
              type="text"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addItem(); }}
              placeholder='e.g. "200A BR Main Breaker Panel" or "1/2 EMT Connector"'
              className="w-full px-3 py-2.5 rounded-md text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors h-10"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Spec / Part Number <span className="text-gray-600 normal-case">(optional)</span></label>
            <input
              type="text"
              value={specInput}
              onChange={(e) => setSpecInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addItem(); }}
              placeholder='e.g. "Eaton BRP20B200R" or "BRI 230"'
              className="w-full px-3 py-2.5 rounded-md text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors h-10"
            />
          </div>
          <div className="w-20 flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Qty</label>
            <input
              type="text"
              inputMode="numeric"
              value={qtyInput}
              onChange={(e) => setQtyInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addItem(); }}
              className="w-full px-3 py-2.5 rounded-md text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors h-10 text-center"
            />
          </div>
          <div className="flex flex-col justify-end">
            <Button
              onClick={addItem}
              disabled={!itemInput.trim()}
              className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-semibold transition-colors duration-150 h-10 px-4"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Items List */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="w-12 h-12 text-gray-700 mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-1">No items yet</h3>
          <p className="text-sm text-gray-600 max-w-sm">
            Add items above to build your custom materials list. Use it for truck stock, punch lists, or any materials order.
          </p>
        </div>
      ) : (
        <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[hsl(217,33%,18%)] bg-[hsl(222,47%,9%)]">
            <span className="flex-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Item</span>
            <span className="w-48 text-[10px] font-bold text-gray-500 uppercase tracking-wider hidden sm:block">Spec / Part #</span>
            <span className="w-16 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Qty</span>
            <span className="w-20 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right hidden sm:block">EES</span>
            <span className="w-8" />
          </div>

          {/* Items */}
          <div className="divide-y divide-[hsl(217,33%,14%)]">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 px-4 py-3 hover:bg-white/[0.02] transition-colors group"
              >
                {/* Item name — editable */}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={item.item}
                    onChange={(e) => updateItem(item.id, "item", e.target.value)}
                    className="w-full bg-transparent text-sm text-white font-medium focus:outline-none focus:bg-[hsl(217,33%,15%)] rounded px-1.5 py-0.5 -mx-1.5 transition-colors"
                  />
                  {/* Spec on mobile — below item name */}
                  {item.spec && (
                    <div className="sm:hidden text-xs text-gray-500 mt-0.5 px-1.5">{item.spec}</div>
                  )}
                </div>

                {/* Spec — editable, desktop only */}
                <div className="w-48 hidden sm:block">
                  <input
                    type="text"
                    value={item.spec}
                    onChange={(e) => updateItem(item.id, "spec", e.target.value)}
                    placeholder="—"
                    className="w-full bg-transparent text-xs text-gray-400 focus:outline-none focus:bg-[hsl(217,33%,15%)] rounded px-1.5 py-0.5 -mx-1.5 transition-colors placeholder-gray-700"
                  />
                </div>

                {/* Qty — editable */}
                <div className="w-16">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                    className="w-full bg-transparent text-sm text-yellow-400 font-semibold text-center focus:outline-none focus:bg-[hsl(217,33%,15%)] rounded px-1 py-0.5 transition-colors"
                  />
                </div>

                {/* Elliott link */}
                <div className="w-20 text-right hidden sm:block">
                  <a
                    href={getElliottUrl(item.item, item.spec)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-yellow-400/70 hover:text-yellow-400 transition-colors"
                  >
                    Search <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-8 flex items-center justify-center text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove item"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[hsl(217,33%,18%)] bg-[hsl(222,47%,9%)]">
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">
                {items.length} item{items.length !== 1 ? "s" : ""} · {totalItems} total qty
              </span>
              <button
                onClick={clearAll}
                className="text-xs text-gray-600 hover:text-red-400 transition-colors"
              >
                Clear all
              </button>
            </div>
            <Button
              size="sm"
              onClick={handleCopyBulk}
              className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-semibold text-xs transition-colors duration-150"
            >
              {copied
                ? <><ClipboardCheck className="w-3.5 h-3.5 mr-1.5" />Copied!</>
                : <><ClipboardCopy className="w-3.5 h-3.5 mr-1.5" />Copy Bulk Entry</>}
            </Button>
          </div>
        </div>
      )}

      {/* Hint */}
      {items.length > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/15">
          <ClipboardCopy className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="text-xs text-gray-500">
            Click <span className="text-yellow-400 font-semibold">Copy Bulk Entry</span> then paste into{" "}
            <a
              href="https://www.elliottelectric.com/StaticPages/BulkEntry.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400/80 hover:text-yellow-400 underline underline-offset-2"
            >
              Elliott Bulk Entry
            </a>{" "}
            to add everything to your cart at once.
          </span>
        </div>
      )}
    </div>
  );
}
