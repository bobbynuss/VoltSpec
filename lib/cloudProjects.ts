/**
 * Re-export from core — cloud projects now live in lib/core/projects.ts.
 * This shim keeps existing "@/lib/cloudProjects" imports working.
 */
export type { CloudProject } from "./core/projects";
export {
  listCloudProjects,
  saveCloudProject,
  deleteCloudProject,
  renameCloudProject,
} from "./core/projects";
