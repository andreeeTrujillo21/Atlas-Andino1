/**
 * config/env.js
 * Carga y valida variables de entorno requeridas.
 */
import "dotenv/config";

const required = ["PGPASSWORD", "JWT_SECRET"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`[config] Variable de entorno requerida no encontrada: ${key}`);
    process.exit(1);
  }
}

export const env = {
  port:              Number(process.env.PORT)      || 3000,
  clientUrl:         process.env.CLIENT_URL        || "http://127.0.0.1:5173",
  frontendUrl:       process.env.FRONTEND_URL      || "http://127.0.0.1:5173",
  jwtSecret:         process.env.JWT_SECRET,
  jwtExpires:        process.env.JWT_EXPIRES_IN    || "7d",
  nodeEnv:           process.env.NODE_ENV          || "development",
  googleClientId:    process.env.GOOGLE_CLIENT_ID  || "",
  googleClientSecret:process.env.GOOGLE_CLIENT_SECRET || "",
  pg: {
    host:     process.env.PGHOST            || "localhost",
    port:     Number(process.env.PGPORT)    || 5432,
    user:     process.env.PGUSER            || "postgres",
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE        || "atlas_andino",
  },
};
