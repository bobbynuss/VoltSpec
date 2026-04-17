-- Fix: allow invited users to accept their own invites
CREATE POLICY "Invited users can accept invites"
  ON project_collaborators FOR UPDATE
  USING (
    invited_email = public.get_user_email(auth.uid())
  )
  WITH CHECK (
    invited_email = public.get_user_email(auth.uid())
  );
