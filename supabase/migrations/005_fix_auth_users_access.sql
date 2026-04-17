-- Fix: auth.users not accessible from anon role in RLS policies
-- Uses SECURITY DEFINER function to safely get current user's email

CREATE OR REPLACE FUNCTION public.get_user_email(p_user_id UUID)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email FROM auth.users WHERE id = p_user_id;
$$;

DROP POLICY IF EXISTS "Users can view own collaborations" ON project_collaborators;

CREATE POLICY "Users can view own collaborations"
  ON project_collaborators FOR SELECT
  USING (
    user_id = auth.uid()
    OR invited_email = public.get_user_email(auth.uid())
    OR public.is_project_owner(project_id, auth.uid())
  );
