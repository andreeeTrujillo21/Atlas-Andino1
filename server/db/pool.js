/**
 * db/pool.js
 * Singleton de pg.Pool. Toda consulta SQL pasa por aquí.
 */
import pg from "pg";
import { env } from "../config/env.js";

const { Pool } = pg;

export const pool = new Pool({
  host:     env.pg.host,
  port:     env.pg.port,
  user:     env.pg.user,
  password: env.pg.password,
  database: env.pg.database,
  max:      10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (err) => {
  console.error("[pg] Error inesperado en cliente inactivo:", err.message);
});

/** Ejecuta una query parametrizada y devuelve las filas. */
export async function query(sql, params = []) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

/** Ejecuta una query y devuelve la primera fila (o null). */
export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] ?? null;
}
