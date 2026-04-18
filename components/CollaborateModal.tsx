"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  Users,
  Mail,
  UserPlus,
  Trash2,
  Clock,
  CheckCircle,
  Activity,
  Send,
  Shield,
  Eye,
  Edit3,
  Building2,
  Package,
  FileText,
  Upload,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Download,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";

// ── Types ──────────────────────────────────────────────────────────

interface Collaborator {
  id: string;
  project_id: string;
  user_id: string | null;
  invited_email: string | null;
  role: "editor" | "viewer" | "vendor";
  invited_by: string;
  invited_by_role?: string;
  invited_at: string;
  accepted_at: string | null;
  vendor_company?: string;
  assignments?: VendorAssignment[];
}

interface VendorAssignment {
  id: string;
  manufacturer_key: string;
  vendor_codes: string[];
}

interface ManufacturerGroup {
  key: string;
  name: string;
  vendorCodes: string[];
  itemCount: number;
}

interface ActivityEntry {
  id: string;
  project_id: string;
  user_id: string;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
}

interface ProjectFile {
  id: string;
  project_id: string;
  uploaded_by: string;
  file_name: string;
  file_type: string | null;
  file_size: number;
  file_category: string;
  description: string | null;
  vendor_company: string | null;
  created_at: string;
  downloadUrl: string | null;
}

type TabId = "collaborators" | "vendors" | "files" | "activity";

interface CollaborateModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  userRole?: string; // 'contractor', 'sales_rep', 'vendor', 'admin'
}

// ── Component ──────────────────────────────────────────────────────

export function CollaborateModal({
  open,
  onClose,
  projectId,
  projectName,
  userRole: userRoleProp = "contractor",
}: CollaborateModalProps) {
  const { session, user } = useAuth();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [vendors, setVendors] = useState<Collaborator[]>([]);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [manufacturerGroups, setManufacturerGroups] = useState<ManufacturerGroup[]>([]);
  const [resolvedRole, setResolvedRole] = useState<string>(userRoleProp);

  // Fetch the user's actual role from their profile (don't rely solely on prop)
  useEffect(() => {
    if (!session?.access_token || !open) return;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) return;

    fetch(`${supabaseUrl}/rest/v1/user_profiles?select=role,company_name&id=eq.${user?.id}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        apikey: supabaseKey,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && data[0].role) {
          setResolvedRole(data[0].role);
        }
      })
      .catch(() => {});
  }, [session?.access_token, user?.id, open]);

  // Also update if prop changes
  useEffect(() => {
    if (userRoleProp !== "contractor") setResolvedRole(userRoleProp);
  }, [userRoleProp]);

  // Invite form
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"editor" | "viewer">("editor");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorCompany, setVendorCompany] = useState("");

  // State
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("collaborators");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(projectName);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token}`,
  };

  const isSalesRep = resolvedRole === "sales_rep" || resolvedRole === "admin";
  const isVendor = resolvedRole === "vendor";

  // Keep nameInput in sync if projectName prop changes
  useEffect(() => { setNameInput(projectName); }, [projectName]);

  const handleRename = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed || trimmed === projectName) {
      setEditingName(false);
      setNameInput(projectName);
      return;
    }
    try {
      const res = await fetch("/api/projects/rename", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ projectId, name: trimmed }),
      });
      if (res.ok) {
        setSuccess("Project renamed");
        setEditingName(false);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Rename failed");
      }
    } catch {
      setError("Rename failed");
    }
  };

  // ── Data Loading ─────────────────────────────────────────────────

  const loadData = useCallback(async () => {
    if (!projectId || !session?.access_token) return;
    setLoading(true);
    setError(null);

    try {
      const headers = { Authorization: `Bearer ${session.access_token}` };

      const [collabRes, vendorRes, actRes, filesRes, groupsRes] =
        await Promise.all([
          fetch(`/api/collaborate?projectId=${projectId}`, { headers }),
          fetch(`/api/collaborate/vendors?projectId=${projectId}`, { headers }),
          fetch(`/api/collaborate/activity?projectId=${projectId}`, { headers }),
          fetch(`/api/collaborate/files?projectId=${projectId}`, { headers }),
          fetch(`/api/collaborate/vendors/assignments?projectId=${projectId}`, {
            headers,
          }),
        ]);

      const [collabData, vendorData, actData, filesData, groupsData] =
        await Promise.all([
          collabRes.json(),
          vendorRes.json(),
          actRes.json(),
          filesRes.json(),
          groupsRes.json(),
        ]);

      // Separate vendors from regular collaborators
      const allCollabs = collabData.collaborators ?? [];
      setCollaborators(allCollabs.filter((c: Collaborator) => c.role !== "vendor"));
      setVendors(vendorData.vendors ?? []);
      setActivity(actData.activity ?? []);
      setFiles(filesData.files ?? []);
      setManufacturerGroups(groupsData.groups ?? []);
    } catch (err) {
      setError("Failed to load collaboration data");
    } finally {
      setLoading(false);
    }
  }, [projectId, session?.access_token]);

  useEffect(() => {
    if (open) loadData();
  }, [open, loadData]);

  // ── Actions ──────────────────────────────────────────────────────

  const handleInvite = async () => {
    if (!email.trim()) return;
    setInviting(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("[VoltSpec] handleInvite called — posting to /api/collaborate");
      const res = await fetch("/api/collaborate", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ projectId, email: email.trim(), role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to invite");
      } else {
        setSuccess(`Invited ${email.trim()} as ${role}`);
        setEmail("");
        loadData();
      }
    } catch {
      setError("Failed to send invite");
    } finally {
      setInviting(false);
    }
  };

  const handleVendorInvite = async () => {
    if (!vendorEmail.trim() || !vendorCompany.trim()) return;
    setInviting(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("[VoltSpec] handleVendorInvite called — posting to /api/collaborate/vendors");
      const res = await fetch("/api/collaborate/vendors", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          projectId,
          email: vendorEmail.trim(),
          vendorCompany: vendorCompany.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to invite vendor");
      } else {
        setSuccess(`Invited ${vendorEmail.trim()} (${vendorCompany.trim()}) as vendor`);
        setVendorEmail("");
        setVendorCompany("");
        loadData();
      }
    } catch {
      setError("Failed to invite vendor");
    } finally {
      setInviting(false);
    }
  };

  const handleRemove = async (collaboratorId: string) => {
    try {
      const res = await fetch("/api/collaborate", {
        method: "DELETE",
        headers: authHeaders,
        body: JSON.stringify({ collaboratorId, projectId }),
      });
      if (res.ok) {
        loadData();
        setSuccess("Removed");
      }
    } catch {
      setError("Failed to remove");
    }
  };

  const handleAssignManufacturer = async (
    collaboratorId: string,
    currentKeys: string[],
    mfrKey: string,
    add: boolean
  ) => {
    const newKeys = add
      ? [...currentKeys, mfrKey]
      : currentKeys.filter((k) => k !== mfrKey);

    try {
      const res = await fetch("/api/collaborate/vendors/assignments", {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify({
          projectId,
          collaboratorId,
          manufacturerKeys: newKeys,
        }),
      });
      if (res.ok) {
        setSuccess("Assignments updated");
        loadData();
      }
    } catch {
      setError("Failed to update assignments");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      // Upload directly to Supabase Storage from the client
      const { createClient } = await import("@supabase/supabase-js");
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      const sb = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: `Bearer ${session?.access_token}` } },
      });

      const storagePath = `${projectId}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

      // Step 1: Upload to storage
      const { error: storageErr } = await sb.storage
        .from("project-files")
        .upload(storagePath, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (storageErr) {
        setError(`Storage upload failed: ${storageErr.message}`);
        return;
      }

      // Step 2: Record in DB via API
      const res = await fetch("/api/collaborate/files/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          projectId,
          fileName: file.name,
          fileType: file.type || null,
          fileSize: file.size,
          storagePath,
          category: "general",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save file record");
      } else {
        setSuccess(`Uploaded ${file.name}`);
        loadData();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Upload error: ${msg}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const res = await fetch("/api/collaborate/files", {
        method: "DELETE",
        headers: authHeaders,
        body: JSON.stringify({ fileId, projectId }),
      });
      if (res.ok) {
        loadData();
        setSuccess("File deleted");
      }
    } catch {
      setError("Failed to delete file");
    }
  };

  // ── Helpers ──────────────────────────────────────────────────────

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatAction = (entry: ActivityEntry) => {
    const d = entry.details;
    switch (entry.action) {
      case "material_updated":
        return `Updated ${d.field} on item #${(d.itemIndex as number) + 1}: "${d.oldValue}" → "${d.newValue}"`;
      case "collaborator_added":
        return `Invited ${d.email} as ${d.role}`;
      case "collaborator_removed":
        return `Removed a collaborator`;
      case "vendor_invited":
        return `Invited ${d.email} (${d.vendorCompany}) as vendor`;
      case "vendor_assignments_updated":
        return `Updated vendor assignments: ${(d.manufacturerKeys as string[])?.join(", ")}`;
      case "file_uploaded":
        return `Uploaded ${d.fileName}${d.vendorCompany ? ` (${d.vendorCompany})` : ""}`;
      case "file_deleted":
        return `Deleted a file`;
      case "vendor_comment_added":
        return `Commented on item #${(d.itemIndex as number) + 1}${d.vendorCompany ? ` (${d.vendorCompany})` : ""}`;
      case "suggestion_submitted":
        return `Suggested update for "${d.itemName}": ${d.field} → "${d.newValue}"`;
      default:
        return entry.action.replace(/_/g, " ");
    }
  };

  const getFileIcon = (type: string | null) => {
    if (!type) return "📄";
    if (type.startsWith("image/")) return "🖼️";
    if (type.includes("pdf")) return "📕";
    if (type.includes("spreadsheet") || type.includes("excel")) return "📊";
    if (type.includes("word") || type.includes("document")) return "📝";
    return "📄";
  };

  if (!open) return null;

  // ── Determine available tabs based on role ───────────────────────

  const tabs: { id: TabId; label: string; icon: React.ReactNode; count?: number }[] = [
    {
      id: "collaborators",
      label: "People",
      icon: <UserPlus className="w-3.5 h-3.5 inline mr-1.5" />,
      count: collaborators.length,
    },
  ];

  // Vendors tab visible to owner, sales_rep, admin — not to vendors themselves
  if (!isVendor) {
    tabs.push({
      id: "vendors",
      label: "Vendors",
      icon: <Building2 className="w-3.5 h-3.5 inline mr-1.5" />,
      count: vendors.length,
    });
  }

  tabs.push(
    {
      id: "files",
      label: "Files",
      icon: <FileText className="w-3.5 h-3.5 inline mr-1.5" />,
      count: files.length,
    },
    {
      id: "activity",
      label: "Activity",
      icon: <Activity className="w-3.5 h-3.5 inline mr-1.5" />,
      count: activity.length,
    }
  );

  // ── Render ───────────────────────────────────────────────────────

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[hsl(222,47%,8%)] border border-[hsl(217,33%,18%)] rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[hsl(217,33%,18%)]">
            <Users className="w-5 h-5 text-yellow-400" />
            <div className="flex-1 min-w-0">
              {editingName ? (
                <input
                  ref={nameInputRef}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onBlur={handleRename}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRename();
                    if (e.key === "Escape") { setEditingName(false); setNameInput(projectName); }
                  }}
                  autoFocus
                  className="w-full text-base font-bold text-white bg-transparent border-b border-yellow-400 focus:outline-none px-0 py-0"
                />
              ) : (
                <button
                  onClick={() => {
                    if (isVendor) return; // Vendors can't rename
                    setEditingName(true);
                    setTimeout(() => nameInputRef.current?.select(), 50);
                  }}
                  className={`text-left w-full group ${isVendor ? "" : "cursor-pointer"}`}
                  title={isVendor ? undefined : "Click to rename project"}
                >
                  <h2 className="text-base font-bold text-white truncate group-hover:text-yellow-400 transition-colors">
                    {nameInput || projectName}
                  </h2>
                  {!isVendor && (
                    <p className="text-[10px] text-gray-600 mt-0.5">click to rename</p>
                  )}
                </button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white h-8 w-8"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[hsl(217,33%,18%)] overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="ml-1.5 text-[10px] opacity-70">
                    ({tab.count})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Status messages */}
          {(error || success) && (
            <div className="px-4 pt-3">
              {error && (
                <div className="px-3 py-2 rounded-md bg-red-950/40 border border-red-900/50 text-red-300 text-xs">
                  {error}
                </div>
              )}
              {success && (
                <div className="px-3 py-2 rounded-md bg-green-950/40 border border-green-900/50 text-green-300 text-xs">
                  {success}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : activeTab === "collaborators" ? (
              /* ═══ PEOPLE TAB ═══ */
              <div className="p-4 space-y-4">
                {/* Invite form — only owner can invite non-vendors */}
                {!isVendor && (
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">
                      Invite by email
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                          placeholder="rep@example.com"
                          className="w-full pl-9 pr-3 py-2 rounded-md text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                      <select
                        value={role}
                        onChange={(e) =>
                          setRole(e.target.value as "editor" | "viewer")
                        }
                        className="px-2 py-2 rounded-md text-xs bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-gray-300 cursor-pointer"
                      >
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      <Button
                        size="sm"
                        onClick={handleInvite}
                        disabled={!email.trim() || inviting}
                        className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-xs h-[38px] px-3"
                      >
                        {inviting ? (
                          <div className="w-3.5 h-3.5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Collaborator list */}
                {collaborators.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      No collaborators yet
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Invite an Elliott sales rep to coordinate vendors
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">
                      Team
                    </label>
                    {collaborators.map((c) => (
                      <CollaboratorRow
                        key={c.id}
                        collab={c}
                        onRemove={() => handleRemove(c.id)}
                        formatTime={formatTime}
                        canRemove={!isVendor}
                      />
                    ))}
                  </div>
                )}

                {/* Permissions info */}
                <div className="px-3 py-2.5 rounded-lg bg-[hsl(217,33%,10%)] border border-[hsl(217,33%,15%)]">
                  <div className="flex items-start gap-2">
                    <Shield className="w-3.5 h-3.5 text-gray-500 mt-0.5 shrink-0" />
                    <div className="text-[10px] text-gray-500 space-y-0.5">
                      <p>
                        <strong className="text-gray-400">Contractor</strong>{" "}
                        (owner) creates the project and invites the Elliott rep.
                      </p>
                      <p>
                        <strong className="text-gray-400">Sales Rep</strong>{" "}
                        coordinates the BOM, invites vendors, and assigns
                        product lines.
                      </p>
                      <p>
                        <strong className="text-gray-400">Vendors</strong> see
                        only their assigned materials. Pricing is hidden from
                        vendors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === "vendors" ? (
              /* ═══ VENDORS TAB ═══ */
              <div className="p-4 space-y-4">
                {/* Vendor invite — sales reps only */}
                {isSalesRep && (
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">
                      Invite a Vendor / Manufacturer Rep
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                        <input
                          type="email"
                          value={vendorEmail}
                          onChange={(e) => setVendorEmail(e.target.value)}
                          placeholder="vendor@eaton.com"
                          className="w-full pl-9 pr-3 py-2 rounded-md text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                        <input
                          type="text"
                          value={vendorCompany}
                          onChange={(e) => setVendorCompany(e.target.value)}
                          placeholder="Eaton"
                          className="w-32 pl-9 pr-3 py-2 rounded-md text-sm bg-[hsl(217,33%,13%)] border border-[hsl(217,33%,22%)] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                      <Button
                        size="sm"
                        onClick={handleVendorInvite}
                        disabled={
                          !vendorEmail.trim() ||
                          !vendorCompany.trim() ||
                          inviting
                        }
                        className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-xs h-[38px] px-3"
                      >
                        {inviting ? (
                          <div className="w-3.5 h-3.5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                    <p className="text-[10px] text-gray-600">
                      Vendors only see materials assigned to their company. Pricing is always hidden.
                    </p>
                  </div>
                )}

                {/* Vendor list with assignment management */}
                {vendors.length === 0 ? (
                  <div className="text-center py-8">
                    <Building2 className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No vendors yet</p>
                    <p className="text-gray-600 text-xs mt-1">
                      {isSalesRep
                        ? "Invite manufacturer reps to collaborate on specific product lines"
                        : "The Elliott sales rep will invite vendors as needed"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {vendors.map((v) => {
                      const assignedKeys =
                        v.assignments?.map((a) => a.manufacturer_key) ?? [];
                      const isExpanded = expandedVendor === v.id;

                      return (
                        <div
                          key={v.id}
                          className="rounded-lg bg-[hsl(217,33%,11%)] border border-[hsl(217,33%,16%)] overflow-hidden"
                        >
                          {/* Vendor header */}
                          <div className="flex items-center gap-3 px-3 py-2.5">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">
                              {(v.vendor_company?.[0] ?? "V").toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white truncate">
                                {v.vendor_company ?? "Vendor"}{" "}
                                <span className="text-gray-600 text-xs">
                                  — {v.invited_email}
                                </span>
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-purple-400/10 text-purple-400">
                                  <Package className="w-2.5 h-2.5" />
                                  vendor
                                </span>
                                {v.accepted_at ? (
                                  <span className="flex items-center gap-1 text-[10px] text-green-500">
                                    <CheckCircle className="w-2.5 h-2.5" />
                                    Active
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-[10px] text-gray-600">
                                    <Clock className="w-2.5 h-2.5" />
                                    Pending
                                  </span>
                                )}
                                <span className="text-[10px] text-gray-600">
                                  {assignedKeys.length} product line
                                  {assignedKeys.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {isSalesRep && (
                                <button
                                  onClick={() =>
                                    setExpandedVendor(
                                      isExpanded ? null : v.id
                                    )
                                  }
                                  className="p-1.5 rounded-md text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors cursor-pointer"
                                  title="Manage product line assignments"
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                              {!isVendor && (
                                <button
                                  onClick={() => handleRemove(v.id)}
                                  className="p-1.5 rounded-md text-gray-700 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
                                  title="Remove vendor"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Expanded: manufacturer assignment checkboxes */}
                          {isExpanded && isSalesRep && (
                            <div className="px-3 pb-3 pt-1 border-t border-[hsl(217,33%,16%)]">
                              <p className="text-[10px] text-gray-500 mb-2">
                                Assign product lines this vendor can see:
                              </p>
                              <div className="grid grid-cols-2 gap-1">
                                {manufacturerGroups
                                  .filter((g) => g.key !== "__unassigned__")
                                  .map((g) => {
                                    const isAssigned = assignedKeys.includes(
                                      g.key
                                    );
                                    return (
                                      <label
                                        key={g.key}
                                        className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs cursor-pointer transition-colors ${
                                          isAssigned
                                            ? "bg-yellow-400/10 text-yellow-300"
                                            : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
                                        }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isAssigned}
                                          onChange={(e) =>
                                            handleAssignManufacturer(
                                              v.id,
                                              assignedKeys,
                                              g.key,
                                              e.target.checked
                                            )
                                          }
                                          className="accent-yellow-400"
                                        />
                                        <span className="truncate">
                                          {g.name}
                                        </span>
                                        <span className="text-[10px] text-gray-600 ml-auto shrink-0">
                                          {g.itemCount}
                                        </span>
                                      </label>
                                    );
                                  })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* BOM manufacturer breakdown */}
                {manufacturerGroups.length > 0 && !isVendor && (
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">
                      BOM Manufacturer Breakdown
                    </label>
                    <div className="space-y-1">
                      {manufacturerGroups.map((g) => (
                        <div
                          key={g.key}
                          className="flex items-center justify-between px-3 py-1.5 rounded bg-[hsl(217,33%,10%)] text-xs"
                        >
                          <span className="text-gray-300">{g.name}</span>
                          <span className="text-gray-600">
                            {g.itemCount} item{g.itemCount !== 1 ? "s" : ""}
                            {g.vendorCodes.length > 0 && (
                              <span className="ml-1 text-[10px]">
                                ({g.vendorCodes.join(", ")})
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : activeTab === "files" ? (
              /* ═══ FILES TAB ═══ */
              <div className="p-4 space-y-4">
                {/* Upload button */}
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.csv,.txt"
                  />
                  <Button
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-xs"
                  >
                    {uploading ? (
                      <div className="w-3.5 h-3.5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-1.5" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 mr-1.5" />
                    )}
                    Upload File
                  </Button>
                  <p className="text-[10px] text-gray-600">
                    Cut sheets, submittals, quotes, alternates (max 25MB)
                  </p>
                </div>

                {/* File list */}
                {files.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No files yet</p>
                    <p className="text-gray-600 text-xs mt-1">
                      Upload cut sheets, submittals, or quotes
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {files.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[hsl(217,33%,11%)] border border-[hsl(217,33%,16%)]"
                      >
                        <span className="text-lg">
                          {getFileIcon(f.file_type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">
                            {f.file_name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-gray-600 mt-0.5">
                            <span>{formatBytes(f.file_size)}</span>
                            {f.vendor_company && (
                              <span className="text-purple-400">
                                {f.vendor_company}
                              </span>
                            )}
                            <span>{formatTime(f.created_at)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {f.downloadUrl && (
                            <a
                              href={f.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors"
                              title="Download"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => handleDeleteFile(f.id)}
                            className="p-1.5 rounded-md text-gray-700 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
                            title="Delete file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ═══ ACTIVITY TAB ═══ */
              <div className="p-4">
                {activity.length === 0 ? (
                  <div className="text-center py-8">
                    <Activity className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No activity yet</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {activity.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-start gap-3 px-3 py-2 rounded-md hover:bg-white/[0.02]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60 mt-2 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-300">
                            {formatAction(entry)}
                          </p>
                          <p className="text-[10px] text-gray-600 mt-0.5">
                            {formatTime(entry.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Sub-components ─────────────────────────────────────────────────

function CollaboratorRow({
  collab,
  onRemove,
  formatTime,
  canRemove,
}: {
  collab: Collaborator;
  onRemove: () => void;
  formatTime: (iso: string) => string;
  canRemove: boolean;
}) {
  const roleColors: Record<string, { bg: string; text: string }> = {
    editor: { bg: "bg-yellow-400/10", text: "text-yellow-400" },
    viewer: { bg: "bg-blue-400/10", text: "text-blue-400" },
    vendor: { bg: "bg-purple-400/10", text: "text-purple-400" },
  };

  const rc = roleColors[collab.role] ?? roleColors.viewer;

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[hsl(217,33%,11%)] border border-[hsl(217,33%,16%)]">
      <div className="w-8 h-8 rounded-full bg-[hsl(217,33%,18%)] flex items-center justify-center text-xs font-bold text-gray-400">
        {(collab.invited_email?.[0] ?? "?").toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">
          {collab.invited_email ?? "Unknown"}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${rc.bg} ${rc.text}`}
          >
            {collab.role === "editor" ? (
              <Edit3 className="w-2.5 h-2.5" />
            ) : collab.role === "vendor" ? (
              <Package className="w-2.5 h-2.5" />
            ) : (
              <Eye className="w-2.5 h-2.5" />
            )}
            {collab.role}
          </span>
          {collab.accepted_at ? (
            <span className="flex items-center gap-1 text-[10px] text-green-500">
              <CheckCircle className="w-2.5 h-2.5" />
              Active
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] text-gray-600">
              <Clock className="w-2.5 h-2.5" />
              Pending
            </span>
          )}
        </div>
      </div>
      {canRemove && (
        <button
          onClick={onRemove}
          className="p-1.5 rounded-md text-gray-700 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
          title="Remove"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
