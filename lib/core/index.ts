/**
 * Core module — trade-agnostic engine components.
 *
 * Re-exports all shared types, utilities, and services that are
 * independent of any specific trade or distributor.
 */

// Types
export type { Supplier, OfficialDoc, MaterialItem, Job } from "./types";

// Supabase client
export { supabase } from "./supabase";

// Cloud project storage
export type { CloudProject } from "./projects";
export {
  listCloudProjects,
  saveCloudProject,
  deleteCloudProject,
  renameCloudProject,
} from "./projects";
