/**
 * Collaboration system — project sharing, material overrides,
 * master data suggestions, and activity logging.
 */

import { supabase } from "./supabase";

// ── Types ──────────────────────────────────────────────────────────

export type UserRole = "contractor" | "sales_rep" | "homeowner" | "admin" | "vendor";

export interface Collaborator {
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
  // Joined fields
  user_name?: string;
  user_email?: string;
  user_role?: UserRole;
}

export interface MaterialOverride {
  index: number;
  field: "item" | "spec" | "quantity";
  oldValue: string;
  newValue: string;
  updatedBy: string;
  updatedAt: string;
}

export interface MasterDataSuggestion {
  id: string;
  suggested_by: string;
  project_id: string | null;
  store_id: string | null;
  jurisdiction: string | null;
  job_id: string;
  item_index: number;
  item_name: string;
  field_changed: string;
  old_value: string | null;
  new_value: string;
  status: "pending" | "approved" | "rejected";
  reviewed_by: string | null;
  reviewed_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface ActivityEntry {
  id: string;
  project_id: string;
  user_id: string;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
  // Joined
  user_email?: string;
  user_name?: string;
}

// ── Current User Role ──────────────────────────────────────────────

export async function getCurrentUserRole(): Promise<UserRole> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return "contractor";

  const { data } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return (data?.role as UserRole) ?? "contractor";
}

// ── Collaborator Management ────────────────────────────────────────

/** Invite a user to collaborate on a project */
export async function inviteCollaborator(
  projectId: string,
  email: string,
  role: "editor" | "viewer" = "editor"
): Promise<{ success: boolean; error?: string }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not logged in" };

  // Check if there's already a user with this email
  // We can't query auth.users directly, so we'll store the email
  // and resolve on acceptance
  const { error } = await supabase.from("project_collaborators").insert({
    project_id: projectId,
    invited_email: email.toLowerCase().trim(),
    role,
    invited_by: user.id,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "Already invited" };
    }
    return { success: false, error: error.message };
  }

  // Log activity
  await logActivity(projectId, "collaborator_added", {
    email: email.toLowerCase().trim(),
    role,
  });

  return { success: true };
}

/** Accept a collaboration invite (called when user views shared projects) */
export async function acceptInvite(
  collaboratorId: string
): Promise<{ success: boolean; error?: string }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not logged in" };

  const { error } = await supabase
    .from("project_collaborators")
    .update({
      user_id: user.id,
      accepted_at: new Date().toISOString(),
    })
    .eq("id", collaboratorId)
    .eq("invited_email", user.email);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/** List collaborators for a project */
export async function listCollaborators(
  projectId: string
): Promise<Collaborator[]> {
  const { data, error } = await supabase
    .from("project_collaborators")
    .select("*")
    .eq("project_id", projectId)
    .order("invited_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as Collaborator[];
}

/** Remove a collaborator from a project */
export async function removeCollaborator(
  collaboratorId: string,
  projectId: string
): Promise<void> {
  const { error } = await supabase
    .from("project_collaborators")
    .delete()
    .eq("id", collaboratorId);

  if (error) throw new Error(error.message);

  await logActivity(projectId, "collaborator_removed", {
    collaboratorId,
  });
}

/** List projects shared with the current user */
export async function listSharedProjects(): Promise<
  Array<{
    project: {
      id: string;
      name: string;
      job_id: string;
      city: string;
      zip: string;
      job_data: Record<string, unknown>;
      updated_at: string;
      material_overrides: MaterialOverride[];
    };
    collaboration: Collaborator;
    owner_email: string;
  }>
> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  // Find invites by email that haven't been accepted yet — auto-accept them
  const { data: pendingInvites } = await supabase
    .from("project_collaborators")
    .select("id")
    .eq("invited_email", user.email)
    .is("accepted_at", null);

  if (pendingInvites && pendingInvites.length > 0) {
    for (const invite of pendingInvites) {
      await acceptInvite(invite.id);
    }
  }

  // Now fetch all accepted collaborations
  const { data, error } = await supabase
    .from("project_collaborators")
    .select(
      `
      *,
      projects!inner (
        id, name, job_id, city, zip, job_data, updated_at, user_id, material_overrides
      )
    `
    )
    .eq("user_id", user.id)
    .not("accepted_at", "is", null);

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.map((d: Record<string, unknown>) => {
    const project = d.projects as Record<string, unknown>;
    return {
      project: {
        id: project.id as string,
        name: project.name as string,
        job_id: project.job_id as string,
        city: project.city as string,
        zip: project.zip as string,
        job_data: project.job_data as Record<string, unknown>,
        updated_at: project.updated_at as string,
        material_overrides: (project.material_overrides ?? []) as MaterialOverride[],
      },
      collaboration: {
        id: d.id as string,
        project_id: d.project_id as string,
        user_id: d.user_id as string,
        invited_email: d.invited_email as string | null,
        role: d.role as "editor" | "viewer",
        invited_by: d.invited_by as string,
        invited_at: d.invited_at as string,
        accepted_at: d.accepted_at as string | null,
      },
      owner_email: (project.user_id as string) ?? "",
    };
  });
}

// ── Material Overrides ─────────────────────────────────────────────

/** Update material overrides on a shared project */
export async function updateMaterialOverride(
  projectId: string,
  override: Omit<MaterialOverride, "updatedBy" | "updatedAt">
): Promise<{ success: boolean; error?: string }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not logged in" };

  // Get current overrides
  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("material_overrides")
    .eq("id", projectId)
    .single();

  if (fetchError) return { success: false, error: fetchError.message };

  const existing = (project?.material_overrides ?? []) as MaterialOverride[];

  // Replace or add override for this index+field combo
  const newOverride: MaterialOverride = {
    ...override,
    updatedBy: user.id,
    updatedAt: new Date().toISOString(),
  };

  const updated = existing.filter(
    (o) => !(o.index === override.index && o.field === override.field)
  );
  updated.push(newOverride);

  const { error } = await supabase
    .from("projects")
    .update({
      material_overrides: updated,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId);

  if (error) return { success: false, error: error.message };

  // Log activity
  await logActivity(projectId, "material_updated", {
    itemIndex: override.index,
    field: override.field,
    oldValue: override.oldValue,
    newValue: override.newValue,
  });

  return { success: true };
}

/** Get material overrides for a project */
export async function getMaterialOverrides(
  projectId: string
): Promise<MaterialOverride[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("material_overrides")
    .eq("id", projectId)
    .single();

  if (error) return [];
  return (data?.material_overrides ?? []) as MaterialOverride[];
}

// ── Master Data Suggestions ────────────────────────────────────────

/** Submit a suggestion to improve master data */
export async function submitSuggestion(suggestion: {
  projectId: string;
  storeId: string | null;
  jurisdiction: string | null;
  jobId: string;
  itemIndex: number;
  itemName: string;
  fieldChanged: string;
  oldValue: string | null;
  newValue: string;
  notes?: string;
}): Promise<{ success: boolean; error?: string }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not logged in" };

  const { error } = await supabase.from("master_data_suggestions").insert({
    suggested_by: user.id,
    project_id: suggestion.projectId,
    store_id: suggestion.storeId,
    jurisdiction: suggestion.jurisdiction,
    job_id: suggestion.jobId,
    item_index: suggestion.itemIndex,
    item_name: suggestion.itemName,
    field_changed: suggestion.fieldChanged,
    old_value: suggestion.oldValue,
    new_value: suggestion.newValue,
    notes: suggestion.notes,
  });

  if (error) return { success: false, error: error.message };

  await logActivity(suggestion.projectId, "suggestion_submitted", {
    itemIndex: suggestion.itemIndex,
    itemName: suggestion.itemName,
    field: suggestion.fieldChanged,
    newValue: suggestion.newValue,
  });

  return { success: true };
}

/** List pending suggestions (admin only) */
export async function listSuggestions(
  status: "pending" | "approved" | "rejected" = "pending"
): Promise<MasterDataSuggestion[]> {
  const { data, error } = await supabase
    .from("master_data_suggestions")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as MasterDataSuggestion[];
}

/** Review a suggestion (admin only) */
export async function reviewSuggestion(
  suggestionId: string,
  status: "approved" | "rejected"
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { error } = await supabase
    .from("master_data_suggestions")
    .update({
      status,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", suggestionId);

  if (error) throw new Error(error.message);
}

// ── Activity Log ───────────────────────────────────────────────────

/** Log an activity on a project */
export async function logActivity(
  projectId: string,
  action: string,
  details: Record<string, unknown> = {}
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("project_activity").insert({
    project_id: projectId,
    user_id: user.id,
    action,
    details,
  });
}

/** Get activity log for a project */
export async function getActivityLog(
  projectId: string,
  limit = 50
): Promise<ActivityEntry[]> {
  const { data, error } = await supabase
    .from("project_activity")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as ActivityEntry[];
}

// ── Helpers ────────────────────────────────────────────────────────

/** Check if current user can edit materials on a project */
export async function canEditProject(
  projectId: string
): Promise<{ canEdit: boolean; isOwner: boolean; role: string }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { canEdit: false, isOwner: false, role: "none" };

  // Check ownership
  const { data: project } = await supabase
    .from("projects")
    .select("user_id")
    .eq("id", projectId)
    .single();

  if (project?.user_id === user.id) {
    return { canEdit: true, isOwner: true, role: "owner" };
  }

  // Check collaboration
  const { data: collab } = await supabase
    .from("project_collaborators")
    .select("role, accepted_at")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .single();

  if (collab?.accepted_at && collab.role === "editor") {
    return { canEdit: true, isOwner: false, role: "editor" };
  }

  if (collab?.accepted_at && collab.role === "viewer") {
    return { canEdit: false, isOwner: false, role: "viewer" };
  }

  return { canEdit: false, isOwner: false, role: "none" };
}
