"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import type { SidebarHandle } from "@/components/Sidebar";
import { ResultsPanel } from "@/components/ResultsPanel";
import { ProjectsPanel } from "@/components/ProjectsPanel";
import { QuickList } from "@/components/QuickList";
import { PlanTakeoff } from "@/components/PlanTakeoff";
import Image from "next/image";
import { Menu, X, Calculator, FolderOpen, HelpCircle, ShoppingCart, FileImage, Users } from "lucide-react";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { InstallPrompt } from "@/components/InstallPrompt";
import { TourOverlay } from "@/components/TourOverlay";
import type { TourStep } from "@/components/TourOverlay";
import { TOUR_STEPS } from "@/lib/tour-steps";
import { UserButton } from "@/components/UserButton";
import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/core/types";
import { saveProject } from "@/lib/projects";
import type { SavedProject } from "@/lib/projects";
import { JOB_TYPES } from "@/lib/data";
import { getTrade } from "@/lib/registry";
import { getNecYear } from "@/lib/data/jurisdiction-config";
import { useAuth } from "@/components/AuthProvider";
import { useSubscription } from "@/components/SubscriptionProvider";
import { Crown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getTradeBrand } from "@/lib/trade-branding";
import { saveCloudProject } from "@/lib/core/projects";
import { CollaborateModal } from "@/components/CollaborateModal";

const JURISDICTIONS = getTrade().jurisdictions;

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
  const { user, session } = useAuth();
  const { tier } = useSubscription();
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [tourStartStep, setTourStartStep] = useState(0);
  const [currentZip, setCurrentZip] = useState("78744");
  const [quickListMode, setQuickListMode] = useState(false);
  const [takeoffMode, setTakeoffMode] = useState(false);
  const [collaborateAfterTakeoff, setCollaborateAfterTakeoff] = useState(false);
  const [takeoffCollaborateOpen, setTakeoffCollaborateOpen] = useState(false);
  const [takeoffProjectId, setTakeoffProjectId] = useState<string | null>(null);
  const [takeoffProjectName, setTakeoffProjectName] = useState("");
  const [activeTrade, setActiveTrade] = useState("electrical");
  const brand = getTradeBrand(activeTrade);
  const [showUpgradeToast, setShowUpgradeToast] = useState(false);
  const sidebarRef = useRef<SidebarHandle>(null);

  // Derive NEC year from current result's jurisdiction state
  const headerNecYear = (() => {
    const cityId = (result as Record<string, unknown> | null)?.city as string | undefined;
    const j = cityId ? JURISDICTIONS.find((j) => j.id === cityId) : undefined;
    return j?.state ? getNecYear(j.state) : 2026;
  })();

  // Register service worker for PWA
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  // Show celebratory toast when redirected after upgrade
  useEffect(() => {
    if (searchParams.get("upgraded") === "true") {
      setShowUpgradeToast(true);
      // Clean URL without reload
      window.history.replaceState({}, "", "/app");
      const timer = setTimeout(() => setShowUpgradeToast(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleGenerate = async (jobId: string, zip: string, city?: string, tradeId?: string) => {
    setLoading(true);
    if (zip) setCurrentZip(zip);
    if (tradeId) setActiveTrade(tradeId);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, zip, city, trade: tradeId }),
      });
      const data = await res.json();
      setResult(data);
      trackEvent("generate", {
        userId: user?.id,
        city: city ?? "austin",
        jobId,
        jobLabel: data?.job?.label,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSidebarOpen(false);
    }
  };

  const handleSaveJob = async (name: string): Promise<string | undefined> => {
    const state = sidebarRef.current?.getState();
    if (!state?.jobId) return undefined;
    const jobLabel = JOB_TYPES.find((j) => j.id === state.jobId)?.label ?? state.jobId;
    const cityLabel = JURISDICTIONS.find((j) => j.id === state.city)?.shortLabel ?? state.city;

    // Save to cloud if logged in, otherwise localStorage
    if (user) {
      try {
        const saved = await saveCloudProject({
          name,
          job_id: state.jobId,
          city: state.city,
          zip: state.zip,
          job_data: {
            jobLabel,
            cityLabel,
            result: result ?? undefined,
          } as Record<string, unknown>,
        });
        setActiveProjectId(saved.id);
        return saved.id;
      } catch (err) {
        console.error("Cloud save failed, falling back to local:", err);
        saveProject({ name, city: state.city, zip: state.zip, jobId: state.jobId, jobLabel, cityLabel });
      }
    } else {
      saveProject({ name, city: state.city, zip: state.zip, jobId: state.jobId, jobLabel, cityLabel });
    }
  };

  const handleLoadProject = (project: SavedProject) => {
    // Track the project ID for collaboration
    setActiveProjectId(project.id);

    // For plan-takeoff projects (or empty city/jobId), load job_data via API
    if (
      (project.jobId === "plan-takeoff" || !project.city || !project.jobId) &&
      user &&
      session?.access_token
    ) {
      setLoading(true);
      fetch(`/api/projects?id=${project.id}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error || !data.project) {
            console.error("Failed to load project:", data.error);
            setLoading(false);
            return;
          }
          const jobData = data.project.job_data as Record<string, unknown>;
          // Try nested result first
          const savedResult = jobData?.result as GenerateResult | undefined;
          if (savedResult && savedResult.job) {
            setResult(savedResult);
            setSidebarOpen(false);
            setLoading(false);
            return;
          }
          // Fall back to building from materials
          const materials = (jobData?.materials ?? []) as Array<{item: string; quantity: string; spec: string}>;
          if (materials.length > 0) {
            setResult({
              job: {
                id: project.jobId || "plan-takeoff",
                label: project.name || data.project.name,
                requirements: [],
                materials,
                suppliers: [],
                officialDocs: [],
              },
              jurisdiction: project.city || "",
              generatedAt: data.project.updated_at || new Date().toISOString(),
              disclaimer: "AI-generated takeoff — verify all quantities against actual plans.",
            });
            setSidebarOpen(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load project:", err);
          setLoading(false);
        });
      return;
    }

    // Standard job — set sidebar state and re-generate
    sidebarRef.current?.setState({
      city: project.city,
      zip: project.zip,
      jobId: project.jobId,
    });
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

  // Build tour steps with beforeShow callbacks for sidebar/tab switching
  const tourSteps: TourStep[] = TOUR_STEPS.map((s) => ({
    ...s,
    beforeShow:
      s.id === "search" || s.id === "city" || s.id === "job-type" || s.id === "generate"
        ? () => setSidebarOpen(true)
        : s.id === "materials"
          ? () => {
              setSidebarOpen(false);
              // Switch to materials tab if possible
              const matTab = document.querySelector('[data-value="materials"]') as HTMLElement;
              matTab?.click();
            }
          : () => setSidebarOpen(false),
  }));

  const startTour = (stepIndex = 0) => {
    setTourStartStep(stepIndex);
    setTourActive(true);
  };

  // Listen for tour start from help page via URL param
  useEffect(() => {
    const tourParam = searchParams.get("tour");
    if (tourParam !== null) {
      const idx = parseInt(tourParam, 10);
      startTour(isNaN(idx) ? 0 : idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(222,47%,7%)]">
      {/* Top nav */}
      <header className="no-print sticky top-0 z-40 border-b border-[hsl(217,33%,20%)] bg-[hsl(222,47%,8%)] px-2 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-yellow-400"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <Image src={brand.logo} alt={brand.name} width={24} height={24} className="w-6 h-6" />
        <h1 className="text-xl font-bold text-white tracking-tight">
          {brand.prefix}<span className={brand.accentColor}>{brand.suffix}</span>
        </h1>
        <span className="hidden sm:inline text-xs text-gray-500 ml-1 mt-0.5">
          {activeTrade === "plumbing" ? "IPC 2021" : `NEC ${headerNecYear}`} · {result?.jurisdiction ?? "Texas"}
        </span>
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => { setQuickListMode(!quickListMode); setTakeoffMode(false); }}
            className={`flex items-center gap-1.5 text-xs font-medium min-h-[44px] px-2 cursor-pointer transition-colors ${
              quickListMode ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
            }`}
            title="Quick List — custom materials list"
          >
            <ShoppingCart className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Quick List</span>
          </button>
          <button
            onClick={() => { setTakeoffMode(!takeoffMode); setCollaborateAfterTakeoff(false); setQuickListMode(false); }}
            className={`flex items-center gap-1.5 text-xs font-medium min-h-[44px] px-2 cursor-pointer transition-colors ${
              takeoffMode ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
            }`}
            title="AI Plan Takeoff — upload plans, get a BOM"
          >
            <FileImage className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">AI Takeoff</span>
          </button>
          {user && (
            <button
              onClick={() => { setTakeoffMode(true); setCollaborateAfterTakeoff(true); setQuickListMode(false); }}
              className="flex items-center gap-1.5 text-xs font-semibold min-h-[44px] px-2.5 cursor-pointer transition-colors text-purple-400 hover:text-purple-300"
              title="Upload plans and start a multi-party collaboration project"
            >
              <Users className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Upload & Collaborate</span>
            </button>
          )}
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
          <Link
            href="/help"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-yellow-400 transition-colors font-medium min-h-[44px] px-2"
          >
            <HelpCircle className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Help</span>
          </Link>
          {tier === "free" && (
            <Link
              href="/pricing"
              className="flex items-center gap-1 text-xs font-semibold text-gray-900 bg-yellow-400 hover:bg-yellow-300 px-3 py-1.5 rounded-md transition-colors"
            >
              <Crown className="w-3 h-3" />
              <span className="hidden sm:inline">Upgrade</span>
            </Link>
          )}
          <UserButton />
        </div>
      </header>

      <DisclaimerBanner className="no-print" />

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
            fixed lg:static inset-y-0 left-0 z-40 w-[min(22rem,85vw)]
            transform transition-transform duration-200 ease-in-out
            lg:transform-none lg:w-[22rem]
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            bg-[hsl(222,47%,8%)] border-r border-[hsl(217,33%,18%)]
            overflow-y-auto pt-14 lg:pt-0
          `}
        >
          <Sidebar
            ref={sidebarRef}
            onGenerate={handleGenerate}
            onOpenProjects={() => setProjectsOpen(true)}
            onZipChange={setCurrentZip}
            onTradeChange={setActiveTrade}
            loading={loading}
            jobContext={result?.job?.label}
          />
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6">
          {takeoffMode ? (
            <div className="max-w-2xl mx-auto">
              <PlanTakeoff
                autoCollaborate={collaborateAfterTakeoff}
                onAddToList={(items) => {
                  // Switch to Quick List with the takeoff results
                  setTakeoffMode(false);
                  setQuickListMode(true);
                  // Store items in sessionStorage so QuickList can pick them up
                  const existing = JSON.parse(localStorage.getItem("voltspec-quicklist") ?? "[]");
                  const newItems = items.map((t) => ({
                    id: crypto.randomUUID(),
                    item: t.item,
                    spec: t.spec,
                    quantity: t.quantity,
                  }));
                  localStorage.setItem("voltspec-quicklist", JSON.stringify([...existing, ...newItems]));
                }}
                onSaveAndCollaborate={user ? async (items, planFile) => {
                  try {
                    // Always add commodity items to Quick List silently
                    const { classifyTakeoffItems } = await import("@/lib/takeoff-classifier");
                    const split = classifyTakeoffItems(items);
                    if (split.quicklist.length > 0) {
                      const existing = JSON.parse(localStorage.getItem("voltspec-quicklist") ?? "[]");
                      const newItems = split.quicklist.map((t) => ({
                        id: crypto.randomUUID(),
                        item: t.item,
                        spec: t.spec,
                        quantity: t.quantity,
                      }));
                      localStorage.setItem("voltspec-quicklist", JSON.stringify([...existing, ...newItems]));
                    }

                    const projectName = `Plan Takeoff — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
                    const materials = items.map((t) => ({
                      item: t.item,
                      spec: t.spec,
                      quantity: t.quantity,
                    }));
                    const saved = await saveCloudProject({
                      name: projectName,
                      job_id: "plan-takeoff",
                      city: "",
                      zip: currentZip,
                      job_data: {
                        jobLabel: "AI Plan Takeoff",
                        cityLabel: "",
                        result: {
                          job: {
                            id: "plan-takeoff",
                            label: projectName,
                            requirements: [],
                            materials,
                            suppliers: [],
                            officialDocs: [],
                          },
                        },
                        materials,
                      } as Record<string, unknown>,
                    });

                    // Auto-upload the original plan file to project files (client-side direct to storage)
                    if (planFile && session?.access_token) {
                      try {
                        const { createClient } = await import("@supabase/supabase-js");
                        const sb = createClient(
                          process.env.NEXT_PUBLIC_SUPABASE_URL!,
                          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                          { global: { headers: { Authorization: `Bearer ${session.access_token}` } } }
                        );
                        const storagePath = `${saved.id}/${Date.now()}_${planFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

                        const { error: storageErr } = await sb.storage
                          .from("project-files")
                          .upload(storagePath, planFile, {
                            contentType: planFile.type || "application/octet-stream",
                            upsert: false,
                          });

                        if (storageErr) {
                          console.error("Plan file storage upload failed:", storageErr.message);
                        } else {
                          // Record in DB
                          await fetch("/api/collaborate/files/record", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${session.access_token}`,
                            },
                            body: JSON.stringify({
                              projectId: saved.id,
                              fileName: planFile.name,
                              fileType: planFile.type || null,
                              fileSize: planFile.size,
                              storagePath,
                              category: "drawing",
                              description: "Original electrical plan (uploaded via AI Takeoff)",
                            }),
                          });
                        }
                      } catch (err) {
                        console.error("Auto-upload plan file error:", err);
                      }
                    }

                    setTakeoffProjectId(saved.id);
                    setTakeoffProjectName(projectName);
                    setTakeoffCollaborateOpen(true);
                    setTakeoffMode(false);
                    setCollaborateAfterTakeoff(false);
                  } catch (err) {
                    console.error("Save & collaborate failed:", err);
                  }
                } : undefined}
                onClose={() => { setTakeoffMode(false); setCollaborateAfterTakeoff(false); }}
              />
            </div>
          ) : quickListMode ? (
            <QuickList onBack={() => setQuickListMode(false)} zip={currentZip} />
          ) : result ? (
            <ResultsPanel result={result} onSave={handleSaveJob} zip={currentZip} projectId={activeProjectId} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
              <Image src={brand.logo} alt={brand.name} width={64} height={64} className="w-16 h-16 mb-4 opacity-20" />
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

      {/* Upgrade celebration toast */}
      {showUpgradeToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-3 bg-[hsl(222,47%,10%)] border border-yellow-400/40 rounded-xl px-6 py-4 shadow-2xl shadow-yellow-400/10">
            <span className="text-3xl">⚡</span>
            <div>
              <p className="text-white font-bold text-base">Welcome to {brand.name} Pro!</p>
              <p className="text-gray-400 text-sm">All 74 jurisdictions and 29 job types unlocked.</p>
            </div>
            <button
              onClick={() => setShowUpgradeToast(false)}
              className="text-gray-500 hover:text-gray-300 ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Interactive tour overlay */}
      {tourActive && (
        <TourOverlay
          steps={tourSteps}
          startAt={tourStartStep}
          onEnd={() => setTourActive(false)}
        />
      )}

      {/* PWA install prompt */}
      <InstallPrompt />

      {/* Takeoff → Collaborate Modal */}
      {takeoffProjectId && (
        <CollaborateModal
          open={takeoffCollaborateOpen}
          onClose={() => setTakeoffCollaborateOpen(false)}
          projectId={takeoffProjectId}
          projectName={takeoffProjectName}
        />
      )}

      {/* Legal Disclaimers */}
      <LegalDisclaimer className="mt-auto" />
    </div>
  );
}
