import { query, queryOne } from "../db/pool.js";

const SUPERADMIN = "superadmin";

export async function getStats(req, res, next) {
  try {
    const [users, progress, attempts] = await Promise.all([
      queryOne("SELECT COUNT(*) AS total FROM users WHERE is_system = FALSE"),
      queryOne("SELECT COUNT(*) AS total FROM student_progress"),
      queryOne("SELECT COUNT(*) AS total FROM quiz_attempts"),
    ]);
    res.json({
      stats: {
        totalUsers:    Number(users?.total    ?? 0),
        totalProgress: Number(progress?.total ?? 0),
        totalAttempts: Number(attempts?.total ?? 0),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getUsers(req, res, next) {
  try {
    const isSuperadmin = req.user.role === SUPERADMIN;
    const rows = await query(
      `SELECT id, email, full_name, role, auth_provider, avatar_url, created_at
       FROM users
       WHERE is_system = FALSE
         AND ($1 OR role != 'superadmin')
       ORDER BY created_at DESC`,
      [isSuperadmin]
    );
    res.json({ users: rows, callerRole: req.user.role });
  } catch (err) {
    next(err);
  }
}

export async function updateRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const isSuperadmin = req.user.role === SUPERADMIN;

    const allowed = isSuperadmin
      ? ["student", "teacher", "admin", "superadmin"]
      : ["student", "teacher", "admin"];

    if (!allowed.includes(role)) {
      return res.status(400).json({ error: "Rol no válido" });
    }
    if (Number(id) === req.user.id) {
      return res.status(400).json({ error: "No puedes cambiar tu propio rol" });
    }

    const target = await queryOne("SELECT role, is_system FROM users WHERE id = $1", [id]);
    if (!target)          return res.status(404).json({ error: "Usuario no encontrado" });
    if (target.is_system) return res.status(403).json({ error: "Acceso denegado" });
    if (target.role === SUPERADMIN && !isSuperadmin) {
      return res.status(403).json({ error: "Solo un superadmin puede modificar a otro superadmin" });
    }

    const user = await queryOne(
      "UPDATE users SET role = $2 WHERE id = $1 RETURNING id, email, full_name, role",
      [id, role]
    );
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const isSuperadmin = req.user.role === SUPERADMIN;

    if (Number(id) === req.user.id) {
      return res.status(400).json({ error: "No puedes eliminar tu propia cuenta" });
    }

    const target = await queryOne("SELECT role, is_system FROM users WHERE id = $1", [id]);
    if (!target)          return res.status(404).json({ error: "Usuario no encontrado" });
    if (target.is_system) return res.status(403).json({ error: "Acceso denegado" });
    if (target.role === SUPERADMIN && !isSuperadmin) {
      return res.status(403).json({ error: "Solo un superadmin puede eliminar a otro superadmin" });
    }

    await queryOne("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
