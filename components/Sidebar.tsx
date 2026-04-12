"use client";

import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, MapPin, Briefcase, Building2, Calculator, FolderOpen, Search, X } from "lucide-react";


import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_TYPES } from "@/lib/data";
import { getTrade } from "@/lib/registry";

// Pull jurisdictions and state options from the trade registry
const trade = getTrade();
const JURISDICTIONS = trade.jurisdictions;
const STATE_OPTIONS = trade.stateOptions;
import { ChatWidget } from "@/components/ChatWidget";

export interface SidebarHandle {
  getState: () => { city: string; zip: string; jobId: string };
  setState: (state: { city: string; zip: string; jobId: string }) => void;
}

interface SidebarProps {
  onGenerate: (jobId: string, zip: string, city: string) => void;
  onOpenProjects: () => void;
  onZipChange?: (zip: string) => void;
  loading: boolean;
  jobContext?: string;
}

export const Sidebar = forwardRef<SidebarHandle, SidebarProps>(function Sidebar(
  { onGenerate, onOpenProjects, onZipChange, loading, jobContext },
  ref,
) {
  const [stateFilter, setStateFilter] = useState("ALL");
  const [city, setCity] = useState("austin");
  const [zip, setZip] = useState("78744");
  const [jobId, setJobId] = useState("");
  const [search, setSearch] = useState("");

  // Filter jurisdictions by selected state, sorted alphabetically by shortLabel
  const filteredJurisdictions = (stateFilter === "ALL"
    ? [...JURISDICTIONS]
    : JURISDICTIONS.filter((j) => j.state === stateFilter)
  ).sort((a, b) => a.shortLabel.localeCompare(b.shortLabel));
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [zipUpdated, setZipUpdated] = useState(false);
  const zipUpdatedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flashZipUpdated = () => {
    if (zipUpdatedTimer.current) clearTimeout(zipUpdatedTimer.current);
    setZipUpdated(true);
    zipUpdatedTimer.current = setTimeout(() => setZipUpdated(false), 3000);
  };


  useImperativeHandle(ref, () => ({
    getState: () => ({ city, zip, jobId }),
    setState: ({ city: c, zip: z, jobId: j }) => {
      setCity(c);
      setZip(z);
      setJobId(j);
    },
  }));

  const selectedJurisdiction = JURISDICTIONS.find((j) => j.id === city);

  const handleCityChange = (newCity: string | null) => {
    if (!newCity) return;
    setCity(newCity);
    const jur = JURISDICTIONS.find((j) => j.id === newCity);
    if (jur) {
      setZip(jur.defaultZip);
      onZipChange?.(jur.defaultZip);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId) return;
    onGenerate(jobId, zip, city);
  };

  return (
    <div className="p-5 h-full flex flex-col gap-6">
      {/* Header */}
      <div className="hidden lg:flex items-center justify-between pb-2 border-b border-[hsl(217,33%,18%)]">
        <div className="flex items-center gap-2">
          <Image src="/logo-transparent.png" alt="VoltSpec" width={20} height={20} className="w-5 h-5" />
          <span className="text-sm font-semibold text-gray-300">Job Setup</span>
        </div>
        <button
          onClick={onOpenProjects}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-yellow-400 transition-colors cursor-pointer"
          title="Saved Projects"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Projects</span>
        </button>
      </div>

      {/* Unified Search */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            data-tour="search-bar"
            placeholder="Search jobs or cities…"
            className="
              w-full pl-9 pr-8 py-2.5 sm:py-2 rounded-lg text-sm
              bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)]
              text-white placeholder-gray-500
              focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400
              transition-colors h-11 sm:h-9
            "
          />
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(""); searchRef.current?.focus(); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {search.length >= 2 && searchFocused && (() => {
          const q = search.toLowerCase();
          const matchedCities = JURISDICTIONS.filter(
            (j) =>
              j.shortLabel.toLowerCase().includes(q) ||
              j.label.toLowerCase().includes(q) ||
              j.utility.toLowerCase().includes(q) ||
              j.county.toLowerCase().includes(q)
          ).slice(0, 5);
          const matchedJobs = JOB_TYPES.filter(
            (j) => j.label.toLowerCase().includes(q)
          ).slice(0, 8);
          if (matchedCities.length === 0 && matchedJobs.length === 0) return null;
          return (
            <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,22%)] rounded-lg shadow-xl overflow-hidden max-h-[320px] overflow-y-auto">
              {matchedCities.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-[hsl(217,33%,12%)]">
                    Cities / Jurisdictions
                  </div>
                  {matchedCities.map((j) => (
                    <button
                      key={j.id}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        handleCityChange(j.id);
                        setSearch("");
                        setSearchFocused(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-300 transition-colors flex items-center gap-2"
                    >
                      <Building2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                      <span className="flex-1 truncate">{j.shortLabel}</span>
                      <span className="text-[10px] text-gray-600 truncate">{j.utility}</span>
                    </button>
                  ))}
                </div>
              )}
              {matchedJobs.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-[hsl(217,33%,12%)]">
                    Job Types
                  </div>
                  {matchedJobs.map((j) => (
                    <button
                      key={j.id}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setJobId(j.id);
                        setSearch("");
                        setSearchFocused(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-300 transition-colors flex items-center gap-2"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                      <span className="flex-1 truncate">{j.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* State */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-yellow-400" />
            State
          </label>
          <Select
            onValueChange={(v) => {
              if (!v) return;
              setStateFilter(v);
              // If the current city isn't in the new filtered list, auto-select the first one
              if (v !== "ALL") {
                const filtered = JURISDICTIONS.filter((j) => j.state === v);
                if (!filtered.some((j) => j.id === city) && filtered.length > 0) {
                  handleCityChange(filtered[0].id);
                }
              }
            }}
            value={stateFilter}
          >
            <SelectTrigger className="bg-[hsl(217,33%,13%)] border-[hsl(217,33%,22%)] text-white focus:ring-yellow-400 !h-11 sm:!h-9">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,22%)] text-white">
              {STATE_OPTIONS.map((s) => (
                <SelectItem
                  key={s.value}
                  value={s.value}
                  className="focus:bg-yellow-400/10 focus:text-yellow-300 cursor-pointer"
                >
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City / Jurisdiction */}
        <div className="flex flex-col gap-2" data-tour="city-selector">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-yellow-400" />
            City / Jurisdiction
          </label>
          <Select onValueChange={handleCityChange} value={city}>
            <SelectTrigger className="bg-[hsl(217,33%,13%)] border-[hsl(217,33%,22%)] text-white focus:ring-yellow-400 !h-11 sm:!h-9">
              <SelectValue placeholder="Select city…" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,22%)] text-white">
              {filteredJurisdictions.map((j) => (
                <SelectItem
                  key={j.id}
                  value={j.id}
                  className="focus:bg-yellow-400/10 focus:text-yellow-300 cursor-pointer"
                >
                  {j.shortLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedJurisdiction && (
            <p className="text-xs text-gray-600">
              Utility: {selectedJurisdiction.utility} · {selectedJurisdiction.county}
            </p>
          )}
        </div>

        {/* ZIP Code */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-yellow-400" />
            ZIP Code
            {zipUpdated && (
              <span className="ml-auto text-emerald-400 font-bold tracking-normal normal-case" style={{ animation: "zipToastIn 0.2s ease-out" }}>
                ✅ ZIP UPDATED
              </span>
            )}
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={zip}
            onChange={(e) => {
              const v = e.target.value.slice(0, 5);
              setZip(v);
              onZipChange?.(v);
              if (v.length >= 3) flashZipUpdated();
            }}
            onBlur={() => {
              onZipChange?.(zip);
              if (zip.length >= 3) flashZipUpdated();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onZipChange?.(zip);
                if (zip.length >= 3) flashZipUpdated();
              }
            }}
            placeholder={selectedJurisdiction?.defaultZip ?? "78744"}
            maxLength={5}
            className="
              w-full px-3 py-2.5 sm:py-2 rounded-md text-sm
              bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)]
              text-white placeholder-gray-600
              focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400
              transition-colors h-11 sm:h-9
            "
          />

        </div>

        {/* Job Type */}
        <div className="flex flex-col gap-2" data-tour="job-type-selector">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-yellow-400" />
            Job Type
          </label>
          <Select onValueChange={(v) => setJobId(v ?? "")} value={jobId}>
            <SelectTrigger className="bg-[hsl(217,33%,13%)] border-[hsl(217,33%,22%)] text-white focus:ring-yellow-400 !h-11 sm:!h-9">
              <SelectValue placeholder="Select job type…" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,22%)] text-white max-h-[480px] min-w-[min(460px,90vw)] overflow-y-auto">
              {JOB_TYPES.map((job) => (
                <SelectItem
                  key={job.id}
                  value={job.id}
                  className="focus:bg-yellow-400/10 focus:text-yellow-300 cursor-pointer py-2"
                >
                  {job.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        <Button
          type="submit"
          size="lg"
          disabled={!jobId || loading}
          data-tour="generate-btn"
          className="
            w-full mt-2 h-12 sm:h-12 font-bold text-sm
            bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors duration-150
            shadow-lg shadow-yellow-400/20
            touch-manipulation
          "
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              Generating…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 fill-gray-900" />
              Generate Full Package
            </span>
          )}
        </Button>
      </form>

      {/* Saved Projects button (mobile-visible) */}
      <button
        onClick={onOpenProjects}
        className="lg:hidden flex items-center gap-2 px-3 py-3 rounded-lg border border-[hsl(217,33%,22%)] text-gray-400 hover:text-yellow-400 hover:border-yellow-400/40 transition-colors text-sm font-medium touch-manipulation"
      >
        <FolderOpen className="w-4 h-4 text-yellow-400" />
        Saved Projects
      </button>

      {/* Load Calculator link */}
      <Link
        href="/load-calc"
        className="flex items-center gap-2 px-3 py-3 rounded-lg border border-[hsl(217,33%,22%)] text-gray-400 hover:text-yellow-400 hover:border-yellow-400/40 transition-colors text-sm font-medium touch-manipulation"
      >
        <Calculator className="w-4 h-4 text-yellow-400" />
        Load Calculator
        <span className="text-xs text-gray-600 ml-auto">NEC 220</span>
      </Link>

      {/* AI Chat */}
      <div className="border-t border-[hsl(217,33%,18%)] pt-4">
        <ChatWidget variant="sidebar" jobContext={jobContext} />
      </div>

      {/* Disclaimer */}
      <div className="mt-auto flex items-start gap-2 bg-amber-950/25 border border-amber-800/25 rounded-lg px-3 py-2.5 text-amber-200/70 text-xs leading-relaxed">
        <span className="text-amber-400 shrink-0">⚠️</span>
        <span><strong className="text-amber-300/80">Reference only.</strong> Verify all requirements with your local AHJ. Not engineering advice.</span>
      </div>
    </div>
  );
});
