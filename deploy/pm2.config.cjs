module.exports = {
  apps: [
    {
      name:               "altiplano3d",
      script:             "index.js",
      cwd:                "/var/www/node-apps/altiplano3d/server",
      instances:          1,
      autorestart:        true,
      watch:              false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV:    "production",
        PORT:        3002,
        PGHOST:      "localhost",
        PGPORT:      5432,
        PGUSER:      "postgres",
        PGDATABASE:  "atlas_andino",
      },
    },
  ],
};
