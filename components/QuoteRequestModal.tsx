"use client";

import { useState, useEffect } from "react";
import { X, Send, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";
import { getProfile } from "@/lib/userProfile";
import { submitQuoteRequest, type BOMItem } from "@/lib/quoteRequest";
import type { Job } from "@/lib/data";

interface QuoteRequestModalProps {
  open: boolean;
  onClose: () => void;
  job: Job;
  city: string;
  jurisdiction: string;
}

/** Extract catalog number from a spec string */
function extractCatalog(spec: string): string {
  // Try to find a catalog number pattern: word after vendor code, before dash
  const m = spec.match(
    /\b((?:BRP|BR|CHP|CH|CHF|CHFP|SPAN|Eaton|Milbank|Bridgeport|Taymac|NSI|Thomas|Erico)\s+)?([A-Z0-9][A-Z0-9_-]{3,})/i
  );
  if (m) return m[2];
  // Fallback: first all-caps token
  const f = spec.match(/\b([A-Z][A-Z0-9]{2,}[A-Z0-9/-]*)\b/);
  return f?.[1] ?? "";
}

export function QuoteRequestModal({
  open,
  onClose,
  job,
  city,
  jurisdiction,
}: QuoteRequestModalProps) {
  const { user } = useAuth();
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [elliottStore, setElliottStore] = useState<string | null>(null);
  const [elliottRep, setElliottRep] = useState<string | null>(null);

  // Load profile on open
  useEffect(() => {
    if (open && user) {
      getProfile().then((p) => {
        if (p) {
          setElliottStore(p.elliott_store);
          setElliottRep(p.elliott_rep_name);
          setCompanyName(p.company_name ?? "");
          setPhone(p.phone ?? "");
        }
      });
    }
    if (open) {
      setSent(false);
      setError(null);
      setNotes("");
    }
  }, [open, user]);

  if (!open) return null;

  // Build BOM from job materials
  const bom: BOMItem[] = job.materials.map((mat) => ({
    catalog: extractCatalog(mat.spec),
    quantity: mat.quantity,
    description: `${mat.item} — ${mat.spec.split(" - ").slice(1).join(" - ").trim() || mat.spec}`,
    estCost: mat.unitPrice != null ? `$${mat.unitPrice.toFixed(2)}` : "Speak to sales",
  }));

  const handleSend = async () => {
    if (!user?.email) return;
    setSending(true);
    setError(null);

    try {
      await submitQuoteRequest({
        jobName: job.label,
        jobId: job.id,
        city,
        zip: "",
        elliottStore,
        elliottRep,
        bom,
        notes,
        userEmail: user.email,
        companyName: companyName || null,
        phone: phone || null,
      });
      setSent(true);
    } catch (err) {
      setError(String(err));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[hsl(217,33%,18%)]">
          <div>
            <h2 className="text-lg font-bold text-white">Send Quote Request to Elliott</h2>
            <p className="text-xs text-gray-500 mt-0.5">{job.label} — {jurisdiction}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-6">
            <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Quote Request Sent!</h3>
            <p className="text-gray-400 text-sm text-center max-w-sm">
              Your BOM has been saved and a copy sent to <strong className="text-white">{user?.email}</strong>.
              Forward it to your Elliott rep or bring it to the counter.
            </p>
            <Button onClick={onClose} className="mt-6 bg-yellow-400 text-gray-900 hover:bg-yellow-300">
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* BOM Table */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Contact info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your company"
                    className="w-full px-3 py-2 rounded-lg bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-2 rounded-lg bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400/50"
                  />
                </div>
              </div>

              <h3 className="text-sm font-semibold text-gray-300 mb-2">Bill of Materials ({bom.length} items)</h3>
              <div className="rounded-lg border border-[hsl(217,33%,18%)] overflow-hidden mb-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[hsl(217,33%,14%)] text-gray-400">
                      <th className="text-left px-3 py-2 font-medium">Qty</th>
                      <th className="text-left px-3 py-2 font-medium">Catalog #</th>
                      <th className="text-left px-3 py-2 font-medium">Description</th>
                      <th className="text-right px-3 py-2 font-medium">Est. Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bom.map((item, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-[hsl(217,33%,11%)]" : "bg-[hsl(217,33%,13%)]"}
                      >
                        <td className="px-3 py-1.5 text-gray-300">{item.quantity}</td>
                        <td className="px-3 py-1.5 text-cyan-400 font-mono">{item.catalog || "—"}</td>
                        <td className="px-3 py-1.5 text-gray-400 max-w-[200px] truncate">{item.description}</td>
                        <td className="px-3 py-1.5 text-gray-300 text-right">{item.estCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Notes for Elliott (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special requests, delivery preferences, account number..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400/50 resize-none"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2 mt-3">{error}</p>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[hsl(217,33%,18%)] flex items-center justify-between">
              <p className="text-xs text-gray-600">
                A copy will be sent to {user?.email}
              </p>
              <Button
                onClick={handleSend}
                disabled={sending}
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold gap-2"
              >
                {sending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Quote Request</>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
