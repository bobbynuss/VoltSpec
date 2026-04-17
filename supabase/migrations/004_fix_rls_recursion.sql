-- FIX: Infinite recursion between projects ↔ project_collaborators RLS policies
-- Uses SECURITY DEFINER functions to break the circular dependency.

CREATE OR REPLACE FUNCTION public.is_project_owner(p_project_id UUID, p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM projects WHERE id = p_project_id AND user_id = p_user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_project_collaborator(p_project_id UUID, p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM project_collaborators
    WHERE project_id = p_project_id
    AND user_id = p_user_id
    AND accepted_at IS NOT NULL
  );
$$;

DROP POLICY IF EXISTS "Owner or collaborator can view projects" ON projects;
DROP POLICY IF EXISTS "Owner or collaborator can update projects" ON projects;
DROP POLICY IF EXISTS "Owner can manage collaborators" ON project_collaborators;
DROP POLICY IF EXISTS "Users can view own collaborations" ON project_collaborators;
DROP POLICY IF EXISTS "Project participants can view activity" ON project_activity;
DROP POLICY IF EXISTS "Users can view collaborator profiles" ON user_profiles;

CREATE POLICY "Owner or collaborator can view projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id OR public.is_project_collaborator(id, auth.uid()));

CREATE POLICY "Owner or collaborator can update projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id OR public.is_project_collaborator(id, auth.uid()));

CREATE POLICY "Owner can manage collaborators"
  ON project_collaborators FOR ALL
  USING (public.is_project_owner(project_id, auth.uid()));

CREATE POLICY "Users can view own collaborations"
  ON project_collaborators FOR SELECT
  USING (
    user_id = auth.uid()
    OR invited_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    OR public.is_project_owner(project_id, auth.uid())
  );

CREATE POLICY "Project participants can view activity"
  ON project_activity FOR SELECT
  USING (
    public.is_project_owner(project_id, auth.uid())
    OR public.is_project_collaborator(project_id, auth.uid())
  );

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
