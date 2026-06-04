#!/bin/bash
# Ejecutar en el servidor: bash /var/www/node-apps/altiplano3d/deploy/deploy.sh
set -e

APP=/var/www/node-apps/altiplano3d

echo "=== Instalando dependencias del servidor ==="
cd $APP/server && npm install --production

echo "=== Creando base de datos ==="
psql -U postgres -c "CREATE DATABASE atlas_andino;" 2>/dev/null || echo "BD ya existe, continuando..."
psql -U postgres -d atlas_andino -f $APP/server/db/schema.sql
psql -U postgres -d atlas_andino -f $APP/server/db/seed.sql
psql -U postgres -d atlas_andino -f $APP/server/db/migrations/001_google_auth.sql 2>/dev/null || true

echo "=== Registrando en PM2 ==="
pm2 start $APP/deploy/pm2.config.cjs || pm2 restart altiplano3d
pm2 save

echo "=== Configurando Apache ==="
cp $APP/deploy/apache.conf /etc/apache2/sites-available/altiplano3d.conf
a2ensite altiplano3d.conf
a2enmod proxy proxy_http headers ssl 2>/dev/null || true
apache2ctl configtest && systemctl reload apache2

echo "=== SSL certbot ==="
certbot --apache -d altiplano3d.andre.net.pe --non-interactive --agree-tos -m admin@andre.net.pe

echo "=== DONE ==="
curl -s https://altiplano3d.andre.net.pe/api/health
