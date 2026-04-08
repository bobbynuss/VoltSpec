import { supabase } from "./supabase";

export interface CloudProject {
  id: string;
  name: string;
  job_id: string;
  city: string;
  zip: string;
  job_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/** List all projects for the current user */
export async function listCloudProjects(): Promise<CloudProject[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as CloudProject[];
}

/** Save a new project */
export async function saveCloudProject(project: {
  name: string;
  job_id: string;
  city: string;
  zip: string;
  job_data: Record<string, unknown>;
}): Promise<CloudProject> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      ...project,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as CloudProject;
}

/** Delete a project */
export async function deleteCloudProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/** Update a project name */
export async function renameCloudProject(
  id: string,
  name: string
): Promise<void> {
  const { error } = await supabase
    .from("projects")
    .update({ name, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
