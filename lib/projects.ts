/**
 * VoltSpec saved projects — localStorage CRUD
 */

export interface SavedProject {
  id: string;
  name: string;
  city: string;
  zip: string;
  jobId: string;
  jobLabel: string;
  cityLabel: string;
  savedAt: string; // ISO timestamp
}

const STORAGE_KEY = "voltspec-projects";

function readAll(): SavedProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(projects: SavedProject[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProjects(): SavedProject[] {
  return readAll().sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
  );
}

export function saveProject(project: Omit<SavedProject, "id" | "savedAt">): SavedProject {
  const all = readAll();
  const newProject: SavedProject = {
    ...project,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  };
  all.push(newProject);
  writeAll(all);
  return newProject;
}

export function deleteProject(id: string): void {
  const all = readAll().filter((p) => p.id !== id);
  writeAll(all);
}

export function renameProject(id: string, name: string): void {
  const all = readAll();
  const project = all.find((p) => p.id === id);
  if (project) {
    project.name = name;
    writeAll(all);
  }
}
