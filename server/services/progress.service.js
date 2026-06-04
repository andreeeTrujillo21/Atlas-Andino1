import { query, queryOne } from "../db/pool.js";

export async function getUserProgress(userId) {
  return query(
    `SELECT sp.*, s.slug AS species_slug, s.name AS species_name,
            al.slug AS layer_slug, al.name AS layer_name
     FROM student_progress sp
     JOIN species s ON s.id = sp.species_id
     LEFT JOIN anatomical_layers al ON al.id = sp.layer_id
     WHERE sp.user_id = $1
     ORDER BY sp.last_studied_at DESC`,
    [userId]
  );
}

export async function upsertProgress(userId, speciesId, layerId, completionPct) {
  return queryOne(
    `INSERT INTO student_progress (user_id, species_id, layer_id, completion_pct, last_studied_at)
     VALUES ($1, $2, $3, $4, now())
     ON CONFLICT (user_id, species_id, layer_id)
     DO UPDATE SET completion_pct = GREATEST(student_progress.completion_pct, $4),
                   last_studied_at = now()
     RETURNING *`,
    [userId, speciesId, layerId, completionPct]
  );
}
