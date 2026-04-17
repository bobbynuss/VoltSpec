-- VoltSpec Collaboration System
-- Adds user roles, project sharing, material overrides, suggestions, and activity logging.
-- Run in Supabase SQL Editor.

-- ══════════════════════════════════════════════════════════════════
-- 1. USER ROLES
-- ══════════════════════════════════════════════════════════════════

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'contractor';
-- Valid roles: 'contractor' (default Pro user), 'sales_rep', 'homeowner', 'admin'
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS elliott_store_id TEXT;
-- For sales_rep: which Elliott store they're bound to
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS jurisdiction TEXT;
-- For sales_rep: their default jurisdiction (e.g. 'austin', 'san-antonio')

COMMENT ON COLUMN user_profiles.role IS 'User role: contractor, sales_rep, homeowner, admin';
COMMENT ON COLUMN user_profiles.elliott_store_id IS 'Elliott store ID for sales_rep users';
COMMENT ON COLUMN user_profiles.jurisdiction IS 'Default jurisdiction for sales_rep users';

-- ══════════════════════════════════════════════════════════════════
-- 2. MATERIAL OVERRIDES ON PROJECTS
-- ══════════════════════════════════════════════════════════════════

-- When a sales rep edits materials on a shared project, overrides are stored here.
-- Format: [{ index: number, field: 'spec'|'quantity'|'item', oldValue: string, newValue: string }]
ALTER TABLE projects ADD COLUMN IF NOT EXISTS material_overrides JSONB DEFAULT '[]'::jsonb;

-- ══════════════════════════════════════════════════════════════════
-- 3. PROJECT COLLABORATORS
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS project_collaborators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  -- user_id is NULL until the invite is accepted (email-based invite)
  invited_email TEXT,
  role TEXT NOT NULL DEFAULT 'editor',
  -- 'editor' = can edit materials; 'viewer' = read-only
  invited_by UUID REFERENCES auth.users(id) NOT NULL,
  invited_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  accepted_at TIMESTAMPTZ,
  UNIQUE(project_id, user_id),
  UNIQUE(project_id, invited_email)
);

CREATE INDEX IF NOT EXISTS idx_collab_project ON project_collaborators(project_id);
CREATE INDEX IF NOT EXISTS idx_collab_user ON project_collaborators(user_id);
CREATE INDEX IF NOT EXISTS idx_collab_email ON project_collaborators(invited_email);

ALTER TABLE project_collaborators ENABLE ROW LEVEL SECURITY;

-- Project owner can manage collaborators
CREATE POLICY "Owner can manage collaborators"
  ON project_collaborators FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects WHERE projects.id = project_collaborators.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Collaborators can view their own collaboration records
CREATE POLICY "Users can view own collaborations"
  ON project_collaborators FOR SELECT
  USING (user_id = auth.uid() OR invited_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- ══════════════════════════════════════════════════════════════════
-- 4. MASTER DATA SUGGESTIONS
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS master_data_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  suggested_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  store_id TEXT,
  jurisdiction TEXT,
  job_id TEXT NOT NULL,
  item_index INTEGER NOT NULL,
  item_name TEXT NOT NULL,
  field_changed TEXT NOT NULL,
  -- 'spec', 'quantity', 'item'
  old_value TEXT,
  new_value TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  -- 'pending', 'approved', 'rejected'
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_suggestions_status ON master_data_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_suggestions_job ON master_data_suggestions(job_id, jurisdiction);

ALTER TABLE master_data_suggestions ENABLE ROW LEVEL SECURITY;

-- Submitters can view their own suggestions
CREATE POLICY "Users can view own suggestions"
  ON master_data_suggestions FOR SELECT
  USING (suggested_by = auth.uid());

-- Sales reps can insert suggestions
CREATE POLICY "Users can insert suggestions"
  ON master_data_suggestions FOR INSERT
  WITH CHECK (auth.uid() = suggested_by);

-- Admins can view and update all suggestions
CREATE POLICY "Admins can manage all suggestions"
  ON master_data_suggestions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ══════════════════════════════════════════════════════════════════
-- 5. PROJECT ACTIVITY LOG
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS project_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  -- 'material_updated', 'collaborator_added', 'collaborator_removed',
  -- 'suggestion_submitted', 'project_shared', 'project_viewed'
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_project ON project_activity(project_id, created_at DESC);

ALTER TABLE project_activity ENABLE ROW LEVEL SECURITY;

-- Project owners and collaborators can view activity
CREATE POLICY "Project participants can view activity"
  ON project_activity FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects WHERE projects.id = project_activity.project_id
      AND projects.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM project_collaborators
      WHERE project_collaborators.project_id = project_activity.project_id
      AND project_collaborators.user_id = auth.uid()
      AND project_collaborators.accepted_at IS NOT NULL
    )
  );

-- Any authenticated user can insert activity (RLS checks happen at API level)
CREATE POLICY "Authenticated users can log activity"
  ON project_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ══════════════════════════════════════════════════════════════════
-- 6. UPDATE PROJECTS RLS — ALLOW COLLABORATOR ACCESS
-- ══════════════════════════════════════════════════════════════════

-- Drop existing restrictive policies and recreate with collaborator support
DROP POLICY IF EXISTS "Users can view own projects" ON projects;
DROP POLICY IF EXISTS "Users can update own projects" ON projects;

-- Owner OR accepted collaborator can view
CREATE POLICY "Owner or collaborator can view projects"
  ON projects FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM project_collaborators
      WHERE project_collaborators.project_id = projects.id
      AND project_collaborators.user_id = auth.uid()
      AND project_collaborators.accepted_at IS NOT NULL
    )
  );

-- Owner can update anything; collaborators can update material_overrides only
-- (enforced at API level — RLS allows the update, API validates fields)
CREATE POLICY "Owner or collaborator can update projects"
  ON projects FOR UPDATE
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM project_collaborators
      WHERE project_collaborators.project_id = projects.id
      AND project_collaborators.user_id = auth.uid()
      AND project_collaborators.accepted_at IS NOT NULL
    )
  );

-- ══════════════════════════════════════════════════════════════════
-- 7. USER_PROFILES RLS — ALLOW COLLABORATORS TO SEE EACH OTHER'S NAMES
-- ══════════════════════════════════════════════════════════════════

-- Allow reading basic profile info (name, role) for collaboration display
CREATE POLICY "Users can view collaborator profiles"
  ON user_profiles FOR SELECT
  USING (
    auth.uid() = id
    OR EXISTS (
      SELECT 1 FROM project_collaborators pc1
      JOIN project_collaborators pc2 ON pc1.project_id = pc2.project_id
      WHERE pc1.user_id = auth.uid() AND pc2.user_id = user_profiles.id
    )
  );
