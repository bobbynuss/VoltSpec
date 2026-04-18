import { supabase } from "./supabase";

export type UserRole = "contractor" | "sales_rep" | "homeowner" | "admin" | "vendor";

export interface UserProfile {
  id: string;
  elliott_store: string | null;
  elliott_rep_name: string | null;
  company_name: string | null;
  phone: string | null;
  license_number: string | null;
  company_logo_url: string | null;
  role: UserRole;
  elliott_store_id: string | null;
  jurisdiction: string | null;
}

/** Get or create the current user's profile */
export async function getProfile(): Promise<UserProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error && error.code === "PGRST116") {
    // No profile yet — create one
    const { data: newProfile, error: insertErr } = await supabase
      .from("user_profiles")
      .insert({ id: user.id })
      .select()
      .single();
    if (insertErr) throw new Error(insertErr.message);
    return newProfile as UserProfile;
  }
  if (error) throw new Error(error.message);
  return data as UserProfile;
}

/** Update the user's profile */
export async function updateProfile(
  updates: Partial<Pick<UserProfile, "elliott_store" | "elliott_rep_name" | "company_name" | "phone" | "license_number" | "company_logo_url" | "role" | "elliott_store_id" | "jurisdiction">>
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { error } = await supabase
    .from("user_profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", user.id);
  if (error) throw new Error(error.message);
}
