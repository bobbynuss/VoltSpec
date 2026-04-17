"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";

interface Collaborator {
  id: string;
  project_id: string;
  user_id: string | null;
  invited_email: string | null;
  role: "editor" | "viewer";
  invited_by: string;
  invited_at: string;
  accepted_at: string | null;
}

interface ActivityEntry {
  id: string;
  project_id: string;
  user_id: string;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
}

interface CollaborateModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
}

export function CollaborateModal({
  open,
  onClose,
  projectId,
  projectName,
}: CollaborateModalProps) {
  const { session } = useAuth();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"editor" | "viewer">("editor");
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"collaborators" | "activity">(
    "collaborators"
  );
  const [loading, setLoading] = useState(true);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token}`,
  };

  // Load collaborators and activity
  useEffect(() => {
    if (open && projectId && session) {
      setLoading(true);
      setError(null);
      setSuccess(null);

      Promise.all([
        fetch(`/api/collaborate?projectId=${projectId}`, {
          headers: authHeaders,
        }).then((r) => r.json()),
        fetch(`/api/collaborate/activity?projectId=${projectId}`, {
          headers: authHeaders,
        }).then((r) => r.json()),
      ])
        .then(([collabData, actData]) => {
          setCollaborators(collabData.collaborators ?? []);
          setActivity(actData.activity ?? []);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, projectId, session?.access_token]);

  const handleInvite = async () => {
    if (!email.trim()) return;
    setInviting(true);
    setError(null);
    setSuccess(null);

    try {
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
        // Refresh collaborators
        const collabRes = await fetch(
          `/api/collaborate?projectId=${projectId}`,
          { headers: authHeaders }
        );
        const collabData = await collabRes.json();
        setCollaborators(collabData.collaborators ?? []);
      }
    } catch (err) {
      setError("Failed to send invite");
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
        setCollaborators((prev) =>
          prev.filter((c) => c.id !== collaboratorId)
        );
        setSuccess("Collaborator removed");
      }
    } catch {
      setError("Failed to remove collaborator");
    }
  };

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

  const formatAction = (entry: ActivityEntry) => {
    const d = entry.details;
    switch (entry.action) {
      case "material_updated":
        return `Updated ${d.field} on item #${(d.itemIndex as number) + 1}: "${d.oldValue}" → "${d.newValue}"`;
      case "collaborator_added":
        return `Invited ${d.email} as ${d.role}`;
      case "collaborator_removed":
        return `Removed a collaborator`;
      case "suggestion_submitted":
        return `Suggested update for "${d.itemName}": ${d.field} → "${d.newValue}"`;
      case "project_shared":
        return `Shared this project`;
      default:
        return entry.action.replace(/_/g, " ");
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[hsl(222,47%,8%)] border border-[hsl(217,33%,18%)] rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[hsl(217,33%,18%)]">
            <Users className="w-5 h-5 text-yellow-400" />
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-white">Collaborate</h2>
              <p className="text-xs text-gray-500 truncate">{projectName}</p>
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
          <div className="flex border-b border-[hsl(217,33%,18%)]">
            <button
              onClick={() => setActiveTab("collaborators")}
              className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "collaborators"
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 inline mr-1.5" />
              People ({collaborators.length})
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "activity"
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Activity className="w-3.5 h-3.5 inline mr-1.5" />
              Activity ({activity.length})
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : activeTab === "collaborators" ? (
              <div className="p-4 space-y-4">
                {/* Invite form */}
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
                  <p className="text-[10px] text-gray-600">
                    <Edit3 className="w-2.5 h-2.5 inline mr-0.5" /> Editor = can edit materials
                    &nbsp;·&nbsp;
                    <Eye className="w-2.5 h-2.5 inline mr-0.5" /> Viewer = read-only
                  </p>
                </div>

                {/* Status messages */}
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

                {/* Collaborator list */}
                {collaborators.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      No collaborators yet
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Invite an Elliott sales rep to review and edit materials
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-medium">
                      Shared with
                    </label>
                    {collaborators.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[hsl(217,33%,11%)] border border-[hsl(217,33%,16%)]"
                      >
                        <div className="w-8 h-8 rounded-full bg-[hsl(217,33%,18%)] flex items-center justify-center text-xs font-bold text-gray-400">
                          {(
                            c.invited_email?.[0] ??
                            "?"
                          ).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">
                            {c.invited_email ?? "Unknown"}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${
                                c.role === "editor"
                                  ? "bg-yellow-400/10 text-yellow-400"
                                  : "bg-blue-400/10 text-blue-400"
                              }`}
                            >
                              {c.role === "editor" ? (
                                <Edit3 className="w-2.5 h-2.5" />
                              ) : (
                                <Eye className="w-2.5 h-2.5" />
                              )}
                              {c.role}
                            </span>
                            {c.accepted_at ? (
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
                        <button
                          onClick={() => handleRemove(c.id)}
                          className="p-1.5 rounded-md text-gray-700 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
                          title="Remove collaborator"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Permissions info */}
                <div className="px-3 py-2.5 rounded-lg bg-[hsl(217,33%,10%)] border border-[hsl(217,33%,15%)]">
                  <div className="flex items-start gap-2">
                    <Shield className="w-3.5 h-3.5 text-gray-500 mt-0.5 shrink-0" />
                    <div className="text-[10px] text-gray-500 space-y-0.5">
                      <p>
                        <strong className="text-gray-400">You</strong> (owner)
                        can add/remove people and delete the project.
                      </p>
                      <p>
                        <strong className="text-gray-400">Editors</strong> can
                        change part numbers, quantities, and notes on materials.
                      </p>
                      <p>
                        <strong className="text-gray-400">Sales Reps</strong>{" "}
                        can also suggest corrections to improve master data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Activity tab */
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
