"use client";

import { useState, useEffect } from "react";
import { X, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";
import { getProfile, updateProfile } from "@/lib/userProfile";
import { getDistributor } from "@/lib/registry";

const ELLIOTT_STORES = getDistributor().stores;

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { user } = useAuth();
  const [store, setStore] = useState("");
  const [repName, setRepName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && user) {
      setLoading(true);
      setSaved(false);
      getProfile()
        .then((p) => {
          if (p) {
            setStore(p.elliott_store ?? "");
            setRepName(p.elliott_rep_name ?? "");
            setCompany(p.company_name ?? "");
            setPhone(p.phone ?? "");
          }
        })
        .finally(() => setLoading(false));
    }
  }, [open, user]);

  if (!open) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({
        elliott_store: store || null,
        elliott_rep_name: repName || null,
        company_name: company || null,
        phone: phone || null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Profile save error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-xl w-full max-w-sm mx-4 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Profile & Sales Rep</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm py-8 text-center">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company name"
                className="w-full px-3 py-2.5 rounded-lg bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full px-3 py-2.5 rounded-lg bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
                Elliott Store
              </label>
              <select
                value={store}
                onChange={(e) => setStore(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 appearance-none"
              >
                <option value="">Select your store...</option>
                {ELLIOTT_STORES.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} — {s.city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
                Sales Rep Name
              </label>
              <input
                type="text"
                value={repName}
                onChange={(e) => setRepName(e.target.value)}
                placeholder="Your rep's name (optional)"
                className="w-full px-3 py-2.5 rounded-lg bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold h-11 gap-2 mt-2"
            >
              {saved ? (
                <><Check className="w-4 h-4" /> Saved!</>
              ) : saving ? (
                "Saving..."
              ) : (
                <><Save className="w-4 h-4" /> Save Profile</>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
