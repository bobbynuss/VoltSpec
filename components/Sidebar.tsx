"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Link from "next/link";
import { Zap, MapPin, Briefcase, Building2, Calculator, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_TYPES, JURISDICTIONS } from "@/lib/data";
import { ChatWidget } from "@/components/ChatWidget";

export interface SidebarHandle {
  getState: () => { city: string; zip: string; jobId: string };
  setState: (state: { city: string; zip: string; jobId: string }) => void;
}

interface SidebarProps {
  onGenerate: (jobId: string, zip: string, city: string) => void;
  onOpenProjects: () => void;
  loading: boolean;
  jobContext?: string;
}

export const Sidebar = forwardRef<SidebarHandle, SidebarProps>(function Sidebar(
  { onGenerate, onOpenProjects, loading, jobContext },
  ref,
) {
  const [city, setCity] = useState("austin");
  const [zip, setZip] = useState("78744");
  const [jobId, setJobId] = useState("");

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
          <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* City / Jurisdiction */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-yellow-400" />
            City / Jurisdiction
          </label>
          <Select onValueChange={handleCityChange} value={city}>
            <SelectTrigger className="bg-[hsl(217,33%,13%)] border-[hsl(217,33%,22%)] text-white focus:ring-yellow-400 !h-11 sm:!h-9">
              <SelectValue placeholder="Select city…" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(222,47%,10%)] border-[hsl(217,33%,22%)] text-white">
              {JURISDICTIONS.map((j) => (
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
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={zip}
            onChange={(e) => setZip(e.target.value.slice(0, 5))}
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
        <div className="flex flex-col gap-2">
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
      <div className="mt-auto text-xs text-gray-600 border-t border-[hsl(217,33%,18%)] pt-4 leading-relaxed">
        ⚠️ <strong className="text-gray-500">Reference only.</strong> Verify all requirements with
        your local AHJ. Not engineering advice.
      </div>
    </div>
  );
});
