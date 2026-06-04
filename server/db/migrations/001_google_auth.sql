-- Migración: soporte Google OAuth
-- Ejecutar: psql -U postgres -d atlas_andino -f migrations/001_google_auth.sql

ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_provider TEXT NOT NULL DEFAULT 'local';
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS users_google_id_idx
  ON users (google_id) WHERE google_id IS NOT NULL;
