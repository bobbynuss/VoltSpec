-- VoltSpec Multi-Party Vendor Collaboration
-- Adds vendor role, manufacturer assignments, file uploads, and vendor-filtered views.

-- ══════════════════════════════════════════════════════════════════
-- 1. USER PROFILES — Add vendor support
-- ══════════════════════════════════════════════════════════════════

-- company_name: for vendors, the manufacturer/vendor company name
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
COMMENT ON COLUMN user_profiles.company_name IS 'Company name for vendor users (e.g. Eaton, Lithonia, Southwire)';

-- ══════════════════════════════════════════════════════════════════
-- 2. PROJECT COLLABORATORS — Add vendor role + company tracking
-- ══════════════════════════════════════════════════════════════════

-- Expand role options: 'editor', 'viewer', 'vendor'
-- vendor = can only see assigned materials, can upload files & comment
COMMENT ON COLUMN project_collaborators.role IS 'Collaboration role: editor, viewer, vendor';

-- Who invited this collaborator (for vendor invites, must be sales_rep)
ALTER TABLE project_collaborators ADD COLUMN IF NOT EXISTS invited_by_role TEXT;
COMMENT ON COLUMN project_collaborators.invited_by_role IS 'Role of the inviter at time of invite (contractor, sales_rep, admin)';

-- For vendor collaborators: their company name (denormalized for display)
ALTER TABLE project_collaborators ADD COLUMN IF NOT EXISTS vendor_company TEXT;
COMMENT ON COLUMN project_collaborators.vendor_company IS 'Vendor company name (for vendor-role collaborators)';

-- ══════════════════════════════════════════════════════════════════
-- 3. VENDOR ASSIGNMENTS — Map manufacturers to vendor collaborators
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS vendor_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  collaborator_id UUID REFERENCES project_collaborators(id) ON DELETE CASCADE NOT NULL,
  -- manufacturer_key: normalized manufacturer identifier (e.g. 'eaton', 'southwire', 'lithonia')
  manufacturer_key TEXT NOT NULL,
  -- vendor_codes: array of Elliott vendor codes mapped to this manufacturer (e.g. ['ETN', 'CHD', 'CHS'])
  vendor_codes TEXT[] NOT NULL DEFAULT '{}',
  assigned_by UUID REFERENCES auth.users(id) NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(project_id, collaborator_id, manufacturer_key)
);

CREATE INDEX IF NOT EXISTS idx_vendor_assign_project ON vendor_assignments(project_id);
CREATE INDEX IF NOT EXISTS idx_vendor_assign_collab ON vendor_assignments(collaborator_id);

ALTER TABLE vendor_assignments ENABLE ROW LEVEL SECURITY;

-- Project owner & sales_rep collaborators can manage vendor assignments
CREATE POLICY "Owner can manage vendor assignments"
  ON vendor_assignments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects WHERE projects.id = vendor_assignments.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Sales rep collaborators can manage vendor assignments"
  ON vendor_assignments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM project_collaborators pc
      JOIN user_profiles up ON up.id = pc.user_id
      WHERE pc.project_id = vendor_assignments.project_id
      AND pc.user_id = auth.uid()
      AND pc.accepted_at IS NOT NULL
      AND up.role = 'sales_rep'
    )
  );

-- Vendors can read their own assignments
CREATE POLICY "Vendors can view own assignments"
  ON vendor_assignments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM project_collaborators pc
      WHERE pc.id = vendor_assignments.collaborator_id
      AND pc.user_id = auth.uid()
      AND pc.accepted_at IS NOT NULL
    )
  );

-- ══════════════════════════════════════════════════════════════════
-- 4. PROJECT FILES — Document uploads per project
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS project_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT, -- MIME type
  file_size INTEGER, -- bytes
  storage_path TEXT NOT NULL, -- Supabase storage path
  file_category TEXT DEFAULT 'general',
  -- 'cut_sheet', 'submittal', 'quote', 'alternate', 'drawing', 'general'
  description TEXT,
  -- vendor_company: if uploaded by a vendor, tag it with their company
  vendor_company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_project_files_project ON project_files(project_id);
CREATE INDEX IF NOT EXISTS idx_project_files_uploader ON project_files(uploaded_by);

ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;

-- Project owner can do everything with files
CREATE POLICY "Owner can manage project files"
  ON project_files FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects WHERE projects.id = project_files.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- All accepted collaborators can view files
CREATE POLICY "Collaborators can view project files"
  ON project_files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM project_collaborators pc
      WHERE pc.project_id = project_files.project_id
      AND pc.user_id = auth.uid()
      AND pc.accepted_at IS NOT NULL
    )
  );

-- All accepted collaborators can upload files
CREATE POLICY "Collaborators can upload files"
  ON project_files FOR INSERT
  WITH CHECK (
    auth.uid() = uploaded_by
    AND EXISTS (
      SELECT 1 FROM project_collaborators pc
      WHERE pc.project_id = project_files.project_id
      AND pc.user_id = auth.uid()
      AND pc.accepted_at IS NOT NULL
    )
  );

-- Users can delete their own uploaded files
CREATE POLICY "Users can delete own files"
  ON project_files FOR DELETE
  USING (uploaded_by = auth.uid());

-- ══════════════════════════════════════════════════════════════════
-- 5. VENDOR COMMENTS — Per-material-item comments from vendors
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS vendor_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_index INTEGER NOT NULL, -- index in the materials array
  comment TEXT NOT NULL,
  -- comment_type: 'note', 'alternate', 'question', 'availability'
  comment_type TEXT DEFAULT 'note',
  vendor_company TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_vendor_comments_project ON vendor_comments(project_id);
CREATE INDEX IF NOT EXISTS idx_vendor_comments_item ON vendor_comments(project_id, item_index);

ALTER TABLE vendor_comments ENABLE ROW LEVEL SECURITY;

-- Owner can see/manage all comments
CREATE POLICY "Owner can manage vendor comments"
  ON vendor_comments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects WHERE projects.id = vendor_comments.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Sales rep collaborators can see/manage all comments
CREATE POLICY "Sales rep can manage vendor comments"
  ON vendor_comments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM project_collaborators pc
      JOIN user_profiles up ON up.id = pc.user_id
      WHERE pc.project_id = vendor_comments.project_id
      AND pc.user_id = auth.uid()
      AND pc.accepted_at IS NOT NULL
      AND up.role = 'sales_rep'
    )
  );

-- Vendors can view comments on their assigned items and insert their own
CREATE POLICY "Vendors can view comments on assigned items"
  ON vendor_comments FOR SELECT
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM project_collaborators pc
      WHERE pc.project_id = vendor_comments.project_id
      AND pc.user_id = auth.uid()
      AND pc.accepted_at IS NOT NULL
    )
  );

CREATE POLICY "Vendors can insert comments"
  ON vendor_comments FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM project_collaborators pc
      WHERE pc.project_id = vendor_comments.project_id
      AND pc.user_id = auth.uid()
      AND pc.accepted_at IS NOT NULL
    )
  );

-- ══════════════════════════════════════════════════════════════════
-- 6. UPDATE COLLABORATOR POLICIES — Sales reps can invite vendors
-- ══════════════════════════════════════════════════════════════════

-- Allow sales_rep collaborators to insert new vendor collaborators
CREATE POLICY "Sales rep can invite vendors"
  ON project_collaborators FOR INSERT
  WITH CHECK (
    -- Original: owner can invite
    EXISTS (
      SELECT 1 FROM projects WHERE projects.id = project_collaborators.project_id
      AND projects.user_id = auth.uid()
    )
    OR
    -- New: sales_rep collaborator can invite vendors
    (
      project_collaborators.role = 'vendor'
      AND EXISTS (
        SELECT 1 FROM project_collaborators existing_pc
        JOIN user_profiles up ON up.id = existing_pc.user_id
        WHERE existing_pc.project_id = project_collaborators.project_id
        AND existing_pc.user_id = auth.uid()
        AND existing_pc.accepted_at IS NOT NULL
        AND up.role = 'sales_rep'
      )
    )
  );

-- ══════════════════════════════════════════════════════════════════
-- 7. STORAGE BUCKET for project files
-- ══════════════════════════════════════════════════════════════════

-- Create storage bucket (run separately if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', false)
-- ON CONFLICT DO NOTHING;
