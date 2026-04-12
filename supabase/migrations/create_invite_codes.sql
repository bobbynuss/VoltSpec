-- Invite codes for free Pro access
CREATE TABLE IF NOT EXISTS invite_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMPTZ,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_invite_codes_code ON invite_codes(code);

ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;

-- Admin can see all codes, regular users can check codes exist
CREATE POLICY "Anyone can read invite codes"
  ON invite_codes FOR SELECT
  USING (true);

CREATE POLICY "Allow all inserts and updates"
  ON invite_codes FOR ALL
  USING (true)
  WITH CHECK (true);
