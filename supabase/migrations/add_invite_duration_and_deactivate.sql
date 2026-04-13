-- Add duration and deactivation support to invite codes
ALTER TABLE invite_codes ADD COLUMN IF NOT EXISTS pro_duration_days INTEGER; -- NULL = lifetime
ALTER TABLE invite_codes ADD COLUMN IF NOT EXISTS deactivated BOOLEAN DEFAULT FALSE;
