-- ══════════════════════════════════════════════════════════════════
--  Atlas Andino 3D — Schema PostgreSQL
--  Base de datos: atlas_andino
--  Ejecutar: psql -U postgres -d atlas_andino -f schema.sql
-- ══════════════════════════════════════════════════════════════════

-- Extensión para UUIDs (opcional, usamos SERIAL por simplicidad)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────
-- 1. AUTENTICACIÓN Y USUARIOS
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'student'
                  CHECK (role IN ('student', 'teacher', 'admin', 'superadmin')),
  avatar_url    TEXT,
  google_id     TEXT,
  auth_provider TEXT NOT NULL DEFAULT 'local',
  is_system     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS users_google_id_idx ON users (google_id) WHERE google_id IS NOT NULL;

-- ────────────────────────────────────────
-- 2. CATÁLOGO DE ESPECIES
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id   SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS species (
  id              SERIAL PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  category_id     INT REFERENCES categories(id),
  iucn_status     TEXT NOT NULL DEFAULT 'LC',
  origin          TEXT,
  size            TEXT,
  weight          TEXT,
  diet            TEXT,
  habitat         TEXT,
  social          TEXT,
  lifespan        TEXT,
  accent          TEXT DEFAULT '#7c844a',
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  title_html      TEXT,
  intro           TEXT,
  learning_title  TEXT,
  learning        TEXT,
  model_scale     REAL NOT NULL DEFAULT 2.0,
  camera          JSONB NOT NULL DEFAULT '[0,1.35,5.2]',
  rotation_y      REAL NOT NULL DEFAULT 0,
  position        INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS species_focus (
  id         SERIAL PRIMARY KEY,
  species_id INT NOT NULL REFERENCES species(id) ON DELETE CASCADE,
  position   INT NOT NULL DEFAULT 0,
  text       TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS breeds (
  id          SERIAL PRIMARY KEY,
  species_id  INT NOT NULL REFERENCES species(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS did_you_know (
  id         SERIAL PRIMARY KEY,
  species_id INT NOT NULL REFERENCES species(id) ON DELETE CASCADE,
  position   INT NOT NULL DEFAULT 0,
  text       TEXT NOT NULL
);

-- ────────────────────────────────────────
-- 3. CAPAS ANATÓMICAS Y ESTRUCTURAS
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS anatomical_layers (
  id       SERIAL PRIMARY KEY,
  slug     TEXT UNIQUE NOT NULL,
  name     TEXT NOT NULL,
  icon     TEXT NOT NULL DEFAULT 'eye',
  position INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS species_layers (
  id          SERIAL PRIMARY KEY,
  species_id  INT NOT NULL REFERENCES species(id) ON DELETE CASCADE,
  layer_id    INT NOT NULL REFERENCES anatomical_layers(id),
  model_url   TEXT,               -- ruta al GLB de esta capa
  mesh_names  JSONB,              -- nombres de mallas para Opción B
  layer_title TEXT,
  layer_intro TEXT,
  layer_fact  TEXT,
  UNIQUE (species_id, layer_id)
);

-- Callouts / estructuras (tanto los 4 slots del visor como las estructuras clave)
CREATE TABLE IF NOT EXISTS structures (
  id          SERIAL PRIMARY KEY,
  species_id  INT NOT NULL REFERENCES species(id) ON DELETE CASCADE,
  layer_id    INT NOT NULL REFERENCES anatomical_layers(id),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  position    INT NOT NULL DEFAULT 0,
  slot        TEXT,               -- "one"|"two"|"three"|"four" para callouts visor
  is_key      BOOLEAN NOT NULL DEFAULT false,  -- TRUE = estructura clave del panel lateral
  hotspot     JSONB               -- {x,y,z} para puntos clicables (Fase 5)
);

-- Sistemas fisiológicos (Digestión, Respiración, etc.)
CREATE TABLE IF NOT EXISTS organ_systems (
  id          SERIAL PRIMARY KEY,
  species_id  INT NOT NULL REFERENCES species(id) ON DELETE CASCADE,
  layer_id    INT NOT NULL REFERENCES anatomical_layers(id),
  icon        TEXT NOT NULL,
  label       TEXT NOT NULL,
  text        TEXT NOT NULL,
  position    INT NOT NULL DEFAULT 0
);

-- ────────────────────────────────────────
-- 4. QUIZZES Y PREGUNTAS
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quizzes (
  id          SERIAL PRIMARY KEY,
  species_id  INT REFERENCES species(id),
  title       TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS questions (
  id          SERIAL PRIMARY KEY,
  quiz_id     INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  position    INT NOT NULL DEFAULT 0,
  text        TEXT NOT NULL,
  success_msg TEXT,
  fail_msg    TEXT,
  points      INT NOT NULL DEFAULT 20
);

CREATE TABLE IF NOT EXISTS question_options (
  id          SERIAL PRIMARY KEY,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  position    INT NOT NULL DEFAULT 0,
  text        TEXT NOT NULL,
  is_correct  BOOLEAN NOT NULL DEFAULT false
);

-- ────────────────────────────────────────
-- 5. PROGRESO Y INTENTOS
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id           SERIAL PRIMARY KEY,
  user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id      INT NOT NULL REFERENCES quizzes(id),
  score        INT NOT NULL DEFAULT 0,
  max_score    INT NOT NULL DEFAULT 0,
  started_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at  TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS attempt_answers (
  id            SERIAL PRIMARY KEY,
  attempt_id    INT NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id   INT NOT NULL REFERENCES questions(id),
  option_id     INT NOT NULL REFERENCES question_options(id),
  is_correct    BOOLEAN NOT NULL,
  points_earned INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS student_progress (
  id              SERIAL PRIMARY KEY,
  user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  species_id      INT NOT NULL REFERENCES species(id),
  layer_id        INT REFERENCES anatomical_layers(id),
  completion_pct  INT NOT NULL DEFAULT 0 CHECK (completion_pct BETWEEN 0 AND 100),
  last_studied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, species_id, layer_id)
);

-- ────────────────────────────────────────
-- 6. MÓDULOS DOCENTES Y ASIGNACIONES
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS modules (
  id          SERIAL PRIMARY KEY,
  teacher_id  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  level       TEXT NOT NULL DEFAULT 'medio' CHECK (level IN ('basico','medio','avanzado')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS module_species (
  module_id   INT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  species_id  INT NOT NULL REFERENCES species(id),
  position    INT NOT NULL DEFAULT 0,
  PRIMARY KEY (module_id, species_id)
);

CREATE TABLE IF NOT EXISTS assignments (
  id           SERIAL PRIMARY KEY,
  module_id    INT NOT NULL REFERENCES modules(id),
  student_id   INT NOT NULL REFERENCES users(id),
  status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','in_progress','done')),
  score        INT,
  assigned_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE (module_id, student_id)
);

-- ────────────────────────────────────────
-- 7. SALAS EN VIVO
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rooms (
  id          SERIAL PRIMARY KEY,
  teacher_id  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id     INT REFERENCES quizzes(id),
  code        TEXT UNIQUE NOT NULL,
  title       TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────
-- 8. ÍNDICES
-- ────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_species_slug          ON species(slug);
CREATE INDEX IF NOT EXISTS idx_species_category      ON species(category_id);
CREATE INDEX IF NOT EXISTS idx_structures_species    ON structures(species_id, layer_id);
CREATE INDEX IF NOT EXISTS idx_progress_user         ON student_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user         ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_assignments_student   ON assignments(student_id);
CREATE INDEX IF NOT EXISTS idx_question_options_q    ON question_options(question_id);
