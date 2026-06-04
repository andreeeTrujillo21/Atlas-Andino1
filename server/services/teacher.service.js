import { query, queryOne } from "../db/pool.js";

export async function getDashboard(teacherId) {
  const modules = await query(
    `SELECT m.id, m.title, m.level,
            COUNT(a.student_id) AS assigned,
            ROUND(AVG(a.score)) AS avg_score
     FROM modules m
     LEFT JOIN assignments a ON a.module_id = m.id
     WHERE m.teacher_id = $1
     GROUP BY m.id ORDER BY m.created_at DESC`,
    [teacherId]
  );

  const topSpecies = await query(
    `SELECT s.name, s.slug, COUNT(sp.user_id) AS study_count
     FROM student_progress sp
     JOIN species s ON s.id = sp.species_id
     GROUP BY s.id ORDER BY study_count DESC LIMIT 4`
  );

  return { modules, topSpecies };
}

export async function getStudentProgress(teacherId) {
  return query(
    `SELECT u.id, u.full_name, u.avatar_url,
            ROUND(AVG(sp.completion_pct)) AS avg_pct
     FROM users u
     JOIN assignments a ON a.student_id = u.id
     JOIN modules m ON m.id = a.module_id
     LEFT JOIN student_progress sp ON sp.user_id = u.id
     WHERE m.teacher_id = $1
     GROUP BY u.id ORDER BY avg_pct DESC`,
    [teacherId]
  );
}

export async function createModule(teacherId, { title, description, level, speciesSlugs }) {
  const mod = await queryOne(
    `INSERT INTO modules (teacher_id, title, description, level)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [teacherId, title, description, level]
  );

  for (const [i, slug] of speciesSlugs.entries()) {
    const sp = await queryOne("SELECT id FROM species WHERE slug=$1", [slug]);
    if (sp) {
      await query(
        "INSERT INTO module_species (module_id, species_id, position) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING",
        [mod.id, sp.id, i]
      );
    }
  }
  return mod;
}

export async function createRoom(teacherId, quizId, title) {
  const code = Math.random().toString(36).slice(2, 7).toUpperCase();
  return queryOne(
    `INSERT INTO rooms (teacher_id, quiz_id, code, title, is_active)
     VALUES ($1, $2, $3, $4, true) RETURNING *`,
    [teacherId, quizId, code, title]
  );
}

export async function getModules(teacherId) {
  return query(
    `SELECT m.*, COUNT(a.id) AS assignments_count
     FROM modules m
     LEFT JOIN assignments a ON a.module_id = m.id
     WHERE m.teacher_id = $1
     GROUP BY m.id ORDER BY m.created_at DESC`,
    [teacherId]
  );
}
