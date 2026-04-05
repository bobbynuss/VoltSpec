"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import type { SidebarHandle } from "@/components/Sidebar";
import { ResultsPanel } from "@/components/ResultsPanel";
import { ProjectsPanel } from "@/components/ProjectsPanel";
import { Zap, Menu, X, Calculator, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/data";
import type { SavedProject } from "@/lib/projects";

interface GenerateResult {
  job: Job;
  jurisdiction: string;
  generatedAt: string;
  disclaimer: string;
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const sidebarRef = useRef<SidebarHandle>(null);

  const handleGenerate = async (jobId: string, zip: string, city?: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, zip, city }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSidebarOpen(false);
    }
  };

  const handleLoadProject = (project: SavedProject) => {
    // Set sidebar state
    sidebarRef.current?.setState({
      city: project.city,
      zip: project.zip,
      jobId: project.jobId,
    });
    // Auto-generate
    handleGenerate(project.jobId, project.zip, project.city);
  };

  // Auto-generate when ?job= query param is present (e.g. from Load Calculator)
  useEffect(() => {
    const jobParam = searchParams.get("job");
    const cityParam = searchParams.get("city") ?? "austin";
    const zipParam = searchParams.get("zip") ?? "";
    if (jobParam && !result && !loading) {
      handleGenerate(jobParam, zipParam, cityParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Get current sidebar state for ProjectsPanel
  const sidebarState = sidebarRef.current?.getState() ?? {
    city: "austin",
    zip: "78744",
    jobId: "",
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(222,47%,7%)]">
      {/* Top nav */}
      <header className="no-print sticky top-0 z-40 border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-yellow-400"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        <h1 className="text-xl font-bold text-white tracking-tight">
          Volt<span className="text-yellow-400">Spec</span>
        </h1>
        <span className="hidden sm:inline text-xs text-gray-500 ml-1 mt-0.5">
          NEC 2026 · {result?.jurisdiction ?? "Texas"}
        </span>
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setProjectsOpen(true)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-yellow-400 transition-colors font-medium min-h-[44px] px-2 cursor-pointer"
            title="Saved Projects"
          >
            <FolderOpen className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Projects</span>
          </button>
          <Link
            href="/load-calc"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-yellow-400 transition-colors font-medium min-h-[44px] px-2"
          >
            <Calculator className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Load Calculator</span>
            <span className="sm:hidden">Calc</span>
          </Link>
          <span className="text-xs text-gray-600 hidden md:block">
            ⚠️ Reference only — verify with AHJ
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-72
            transform transition-transform duration-200 ease-in-out
            lg:transform-none
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            bg-[hsl(222,47%,8%)] border-r border-[hsl(217,33%,18%)]
            overflow-y-auto pt-16 lg:pt-0
          `}
        >
          <Sidebar
            ref={sidebarRef}
            onGenerate={handleGenerate}
            onOpenProjects={() => setProjectsOpen(true)}
            loading={loading}
            jobContext={result?.job?.label}
          />
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {result ? (
            <ResultsPanel result={result} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
              <Zap className="w-16 h-16 text-yellow-400 fill-yellow-400 mb-4 opacity-20" />
              <h2 className="text-2xl font-bold text-white mb-2">Ready to Generate</h2>
              <p className="text-gray-400 max-w-md">
                Select a job type and ZIP code in the sidebar, then click{" "}
                <span className="text-yellow-400 font-semibold">Generate Full Package</span> to get
                NEC requirements, materials list, supplier info, and official docs.
              </p>
              <p className="text-gray-600 text-xs mt-6 max-w-sm">
                ⚠️ VoltSpec is a reference tool only. Always verify requirements with your local
                Authority Having Jurisdiction (AHJ) before any installation.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Projects slide-out panel */}
      <ProjectsPanel
        open={projectsOpen}
        onClose={() => setProjectsOpen(false)}
        onLoad={handleLoadProject}
        currentCity={sidebarState.city}
        currentZip={sidebarState.zip}
        currentJobId={sidebarState.jobId}
      />
    </div>
  );
}
