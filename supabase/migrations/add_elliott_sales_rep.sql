-- Elliott Sales Rep distribution system
-- Master codes are reusable and grant sales rep status

-- invite_codes: track code type and reusability
ALTER TABLE invite_codes ADD COLUMN IF NOT EXISTS code_type TEXT DEFAULT 'standard';
ALTER TABLE invite_codes ADD COLUMN IF NOT EXISTS is_reusable BOOLEAN DEFAULT FALSE;
ALTER TABLE invite_codes ADD COLUMN IF NOT EXISTS redemption_count INTEGER DEFAULT 0;

-- subscriptions: track Elliott sales rep status
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS elliott_sales_rep BOOLEAN DEFAULT FALSE;
