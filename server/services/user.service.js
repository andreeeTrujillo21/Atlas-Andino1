import { query, queryOne } from "../db/pool.js";

export async function findByEmail(email) {
  return queryOne("SELECT * FROM users WHERE email = $1", [email]);
}

export async function findById(id) {
  return queryOne(
    `SELECT id, email, full_name, role, avatar_url, auth_provider, is_system, created_at
     FROM users WHERE id = $1`,
    [id]
  );
}

export async function findByGoogleId(googleId) {
  return queryOne("SELECT * FROM users WHERE google_id = $1", [googleId]);
}

export async function createUser({ email, passwordHash, fullName, role = "student" }) {
  return queryOne(
    `INSERT INTO users (email, password_hash, full_name, role, auth_provider)
     VALUES ($1, $2, $3, $4, 'local')
     RETURNING id, email, full_name, role, created_at`,
    [email, passwordHash, fullName, role]
  );
}

export async function createGoogleUser({ email, fullName, googleId, avatarUrl }) {
  return queryOne(
    `INSERT INTO users (email, full_name, google_id, avatar_url, auth_provider, role)
     VALUES ($1, $2, $3, $4, 'google', 'student')
     RETURNING id, email, full_name, role, avatar_url, google_id, auth_provider, is_system`,
    [email, fullName, googleId, avatarUrl ?? null]
  );
}

export async function syncGoogleProfile(userId, googleId, fullName, avatarUrl) {
  return queryOne(
    `UPDATE users
     SET google_id    = $2,
         full_name    = COALESCE(NULLIF($3, ''), full_name),
         avatar_url   = COALESCE($4, avatar_url),
         auth_provider = 'google'
     WHERE id = $1
     RETURNING id, email, full_name, role, avatar_url, auth_provider, is_system`,
    [userId, googleId, fullName ?? "", avatarUrl ?? null]
  );
}

export async function setPasswordHash(userId, passwordHash) {
  return queryOne(
    `UPDATE users SET password_hash = $2 WHERE id = $1
     RETURNING id, email, full_name, role, auth_provider, is_system`,
    [userId, passwordHash]
  );
}
