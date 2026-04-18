"use client";

import { useState, useEffect, useRef } from "react";
import {
  FolderOpen,
  Save,
  Trash2,
  X,
  MapPin,
  Briefcase,
  Clock,
  ChevronRight,
  Users,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getProjects,
  saveProject,
  deleteProject,
} from "@/lib/projects";
import type { SavedProject } from "@/lib/projects";
import { JOB_TYPES } from "@/lib/data";
import { getTrade } from "@/lib/registry";
import {
  listCloudProjects,
  saveCloudProject,
  deleteCloudProject,
} from "@/lib/core/projects";
import { useAuth } from "@/components/AuthProvider";

const JURISDICTIONS = getTrade().jurisdictions;

interface ProjectsPanelProps {
  open: boolean;
  onClose: () => void;
  onLoad: (project: SavedProject) => void;
  /** Current sidebar state for saving */
  currentCity: string;
  currentZip: string;
  currentJobId: string;
  userRole?: string;
}

export function ProjectsPanel({
  open,
  onClose,
  onLoad,
  currentCity,
  currentZip,
  currentJobId,
  userRole = "contractor",
}: ProjectsPanelProps) {
  const { user, session } = useAuth();
  const isVendor = userRole === "vendor";
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [sharedProjects, setSharedProjects] = useState<Array<{
    project: { id: string; name: string; job_id: string; city: string; zip: string; job_data: Record<string, unknown>; updated_at: string };
    collaboration: { id: string; role: string };
    owner_email: string;
  }>>([]);
  const [saving, setSaving] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"mine" | "shared">(isVendor ? "shared" : "mine");
  const nameRef = useRef<HTMLInputElement>(null);

  // Load projects — cloud if logged in, localStorage if guest
  const loadProjects = async () => {
    if (user) {
      try {
        const cloud = await listCloudProjects();
        setProjects(
          cloud.map((p) => ({
            id: p.id,
            name: p.name,
            city: p.city,
            zip: p.zip,
            jobId: p.job_id,
            jobLabel: (p.job_data as Record<string, string>)?.jobLabel ?? p.job_id,
            cityLabel: (p.job_data as Record<string, string>)?.cityLabel ?? p.city,
            savedAt: p.updated_at,
          }))
        );
      } catch (err) {
        console.error("Failed to load cloud projects:", err);
        setProjects(getProjects());
      }
      // Load shared projects via API
      if (session?.access_token) {
        try {
          const res = await fetch("/api/collaborate/shared", {
            headers: { Authorization: `Bearer ${session.access_token}` },
          });
          const data = await res.json();
          // Filter out orphaned shares (project was deleted but collab record survived)
          const valid = (data.shared ?? []).filter(
            (s: Record<string, unknown>) => s.project && (s.project as Record<string, unknown>).id
          );
          setSharedProjects(valid);
        } catch {
          setSharedProjects([]);
        }
      }
    } else {
      setProjects(getProjects());
      setSharedProjects([]);
    }
  };

  // Refresh list when panel opens
  useEffect(() => {
    if (open) {
      loadProjects();
      setSaving(false);
      setSaveName("");
      setDeleteConfirm(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user]);

  // Focus name field when save mode opens
  useEffect(() => {
    if (saving && nameRef.current) {
      nameRef.current.focus();
    }
  }, [saving]);

  const handleSave = async () => {
    if (!currentJobId) return;

    const jobLabel =
      JOB_TYPES.find((j) => j.id === currentJobId)?.label ?? currentJobId;
    const cityLabel =
      JURISDICTIONS.find((j) => j.id === currentCity)?.shortLabel ?? currentCity;

    const name =
      saveName.trim() ||
      `${jobLabel} — ${cityLabel} ${currentZip}`;

    if (user) {
      try {
        await saveCloudProject({
          name,
          job_id: currentJobId,
          city: currentCity,
          zip: currentZip,
          job_data: { jobLabel, cityLabel } as Record<string, unknown>,
        });
      } catch (err) {
        console.error("Cloud save failed:", err);
        saveProject({ name, city: currentCity, zip: currentZip, jobId: currentJobId, jobLabel, cityLabel });
      }
    } else {
      saveProject({ name, city: currentCity, zip: currentZip, jobId: currentJobId, jobLabel, cityLabel });
    }

    await loadProjects();
    setSaving(false);
    setSaveName("");
  };

  const handleDelete = async (id: string) => {
    // Optimistic UI — remove immediately
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);

    if (user && session?.access_token) {
      try {
        const res = await fetch("/api/projects", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ projectId: id }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error("Cloud delete failed:", data.error);
        }
      } catch (err) {
        console.error("Cloud delete error:", err);
      }
    } else {
      deleteProject(id);
    }
    // Refresh to sync with server
    await loadProjects();
  };

  const handleLoad = (project: SavedProject) => {
    onLoad(project);
    onClose();
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[hsl(222,47%,8%)] border-l border-[hsl(217,33%,18%)] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[hsl(217,33%,18%)]">
          <FolderOpen className="w-5 h-5 text-yellow-400" />
          <h2 className="text-base font-bold text-white flex-1">
            {isVendor ? "Shared Projects" : "Saved Projects"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white h-8 w-8"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Save current — hidden for vendors */}
        {!isVendor && <div className="px-5 py-3 border-b border-[hsl(217,33%,18%)] bg-[hsl(222,47%,9%)]">
          {saving ? (
            <div className="flex flex-col gap-2">
              <input
                ref={nameRef}
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder={
                  currentJobId
                    ? `${JOB_TYPES.find((j) => j.id === currentJobId)?.label ?? ""} — ${JURISDICTIONS.find((j) => j.id === currentCity)?.shortLabel ?? ""}`
                    : "Project name…"
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") setSaving(false);
                }}
                className="w-full px-3 py-2 rounded-md text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!currentJobId}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-xs h-9"
                >
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSaving(false)}
                  className="border-gray-700 text-gray-400 hover:text-white text-xs h-9"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => setSaving(true)}
              disabled={!currentJobId}
              className="w-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/20 font-semibold text-xs h-10 touch-manipulation"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Current Spec
            </Button>
          )}
          {!currentJobId && !saving && (
            <p className="text-[10px] text-gray-600 mt-1.5 text-center">
              Select a job type first to save
            </p>
          )}
        </div>}

        {/* Section tabs — hide for vendors (they only see shared) */}
        {!isVendor && user && sharedProjects.length > 0 && (
          <div className="flex border-b border-[hsl(217,33%,18%)]">
            <button
              onClick={() => setActiveSection("mine")}
              className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                activeSection === "mine"
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5 inline mr-1.5" />
              My Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveSection("shared")}
              className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                activeSection === "shared"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Users className="w-3.5 h-3.5 inline mr-1.5" />
              Shared with Me ({sharedProjects.length})
            </button>
          </div>
        )}

        {/* Projects list */}
        <div className="flex-1 overflow-y-auto">
          {activeSection === "shared" && sharedProjects.length > 0 ? (
            <div className="divide-y divide-[hsl(217,33%,14%)]">
              {sharedProjects.map((sp) => (
                <div key={sp.project.id} className="group relative">
                  {deleteConfirm === `shared-${sp.project.id}` ? (
                    <div className="px-5 py-3 bg-red-950/30 flex items-center gap-3">
                      <span className="text-xs text-red-300 flex-1">
                        Leave &ldquo;{sp.project.name}&rdquo;?
                      </span>
                      <Button
                        size="sm"
                        onClick={async () => {
                          if (session?.access_token) {
                            try {
                              await fetch("/api/collaborate", {
                                method: "DELETE",
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `Bearer ${session.access_token}`,
                                },
                                body: JSON.stringify({
                                  collaboratorId: sp.collaboration.id,
                                  projectId: sp.project.id,
                                }),
                              });
                            } catch {}
                          }
                          setSharedProjects((prev) => prev.filter((s) => s.project.id !== sp.project.id));
                          setDeleteConfirm(null);
                        }}
                        className="bg-red-600 hover:bg-red-500 text-white text-xs h-7 px-3"
                      >
                        Leave
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteConfirm(null)}
                        className="text-gray-400 text-xs h-7 px-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        onLoad({
                          id: sp.project.id,
                          name: sp.project.name,
                          city: sp.project.city,
                          zip: sp.project.zip,
                          jobId: sp.project.job_id,
                          jobLabel: (sp.project.job_data as Record<string, string>)?.jobLabel ?? sp.project.job_id,
                          cityLabel: (sp.project.job_data as Record<string, string>)?.cityLabel ?? sp.project.city,
                          savedAt: sp.project.updated_at,
                        });
                        onClose();
                      }}
                      className="w-full text-left px-5 py-3.5 hover:bg-white/3 transition-colors cursor-pointer touch-manipulation"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate pr-6">
                            {sp.project.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
                            <span className="flex items-center gap-1 text-[11px] text-gray-500">
                              <Briefcase className="w-3 h-3" />
                              {(sp.project.job_data as Record<string, string>)?.jobLabel ?? sp.project.job_id}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-gray-500">
                              <MapPin className="w-3 h-3" />
                              {(sp.project.job_data as Record<string, string>)?.cityLabel ?? sp.project.city}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-purple-400/10 text-purple-400">
                              <UserCheck className="w-2.5 h-2.5" />
                              {sp.collaboration.role}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 shrink-0 mt-1 transition-colors" />
                      </div>
                    </button>
                  )}
                  {deleteConfirm !== `shared-${sp.project.id}` && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(`shared-${sp.project.id}`);
                      }}
                      className="absolute top-3 right-10 p-1.5 rounded-md text-gray-700 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all"
                      title="Leave project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (isVendor || activeSection === "shared") && sharedProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
              <Users className="w-10 h-10 text-gray-700 mb-3" />
              <p className="text-gray-500 text-sm font-medium">
                No shared projects yet
              </p>
              <p className="text-gray-600 text-xs mt-1">
                {isVendor
                  ? "You'll see projects here when an Elliott sales rep invites you"
                  : "Projects shared with you will appear here"}
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
              <FolderOpen className="w-10 h-10 text-gray-700 mb-3" />
              <p className="text-gray-500 text-sm font-medium">
                No saved projects yet
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Generate a spec and save it for quick access later
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[hsl(217,33%,14%)]">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative"
                >
                  {deleteConfirm === project.id ? (
                    /* Delete confirmation */
                    <div className="px-5 py-3 bg-red-950/30 flex items-center gap-3">
                      <span className="text-xs text-red-300 flex-1">
                        Delete &ldquo;{project.name}&rdquo;?
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        className="bg-red-600 hover:bg-red-500 text-white text-xs h-7 px-3"
                      >
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteConfirm(null)}
                        className="text-gray-400 text-xs h-7 px-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    /* Project card */
                    <button
                      onClick={() => handleLoad(project)}
                      className="w-full text-left px-5 py-3.5 hover:bg-white/3 transition-colors cursor-pointer touch-manipulation"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate pr-6">
                            {project.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
                            <span className="flex items-center gap-1 text-[11px] text-gray-500">
                              <Briefcase className="w-3 h-3" />
                              {project.jobLabel}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-gray-500">
                              <MapPin className="w-3 h-3" />
                              {project.cityLabel} {project.zip}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-gray-600">
                              <Clock className="w-3 h-3" />
                              {formatDate(project.savedAt)}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-yellow-400 shrink-0 mt-1 transition-colors" />
                      </div>
                    </button>
                  )}

                  {/* Delete button — visible on hover / always on mobile */}
                  {deleteConfirm !== project.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(project.id);
                      }}
                      className="absolute top-3 right-10 p-1.5 rounded-md text-gray-700 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-all touch-manipulation"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isVendor && projects.length > 0 && (
          <div className="px-5 py-3 border-t border-[hsl(217,33%,18%)] bg-[hsl(222,47%,9%)]">
            <p className="text-[10px] text-gray-600 text-center">
              {projects.length} saved project{projects.length !== 1 ? "s" : ""} · Stored in your browser
            </p>
          </div>
        )}
      </div>
    </>
  );
}
