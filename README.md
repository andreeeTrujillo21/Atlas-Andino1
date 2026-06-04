# Atlas Andino 3D

Aplicacion web educativa para explorar la fauna andina del sur del Peru en modelos 3D interactivos. Desarrollada para la Facultad de Medicina Veterinaria y Zootecnia de la Universidad Nacional del Altiplano de Puno (FINESI).

Incluye visor anatomico 3D con capas (general, partes, huesos, organos, craneo), quiz interactivo por especie, autenticacion con Google OAuth, sistema de progreso por estudiante, panel unificado por roles y ficha informativa por especie.

---

## Autor y contribuidor

**Richard Andre Vilca Solorzano**
andrevilcasolorzano@gmail.com
FINESI — Universidad Nacional del Altiplano, Puno, Peru

---

## Stack tecnico

| Capa | Tecnologia |
|---|---|
| Frontend | React 19, Vite 7, Three.js 0.182, react-router-dom 7 |
| Backend | Node.js 20, Express 4, PostgreSQL 15 |
| Autenticacion | JWT (cookie httpOnly) + Google OAuth 2.0 (Identity Services) |
| Notificaciones | SweetAlert2 |
| Iconos | Lucide React |
| Despliegue | PM2 + Apache 2 (VPS Debian 12, Elastika.pe) |

---

## Estructura del proyecto

```
Soft_Bio3D/
├── src/
│   ├── pages/           # Paginas principales de la app
│   ├── components/      # Componentes reutilizables
│   ├── context/         # AuthContext (estado global de sesion)
│   ├── api/             # Clientes HTTP hacia el backend
│   ├── data/            # Datos estaticos de especies y capas
│   ├── hooks/           # Hooks personalizados
│   ├── styles/          # CSS modular (tokens, layout, components, viewer, pages)
│   ├── utils/           # Utilidades (swal)
│   └── viewer/          # Logica Three.js (Viewer3D, modelLoader, platform)
├── server/
│   ├── controllers/     # Logica de negocio por recurso
│   ├── routes/          # Rutas Express
│   ├── services/        # Acceso a base de datos
│   ├── middleware/      # Autenticacion y roles
│   ├── db/              # Schema, seeds y migraciones PostgreSQL
│   └── config/          # Variables de entorno
├── public/
│   ├── models/          # Modelos GLB 3D por especie
│   └── info/            # Fichas informativas (PNG) por especie
└── deploy/              # Configuracion Apache, PM2 y scripts de despliegue
```

---

## Especies disponibles

| Especie | Slug | Modelos 3D |
|---|---|---|
| Alpaca andina | `alpaca` | general, partes, huesos, organos, craneo |
| Cuy andino | `cuy` | general, partes, huesos, organos |
| Vicuna | `vicuna` | general, partes, huesos, organos |
| Vaca andina | `vaca` | general, partes, huesos, organos |
| Llama | `llama` | general, partes, huesos, organos |
| Vizcacha andina | `vizcacha` | general, partes, huesos, organos |
| Zambullidor del Titicaca | `zambullidor` | general, partes, huesos, organos |

---

## Acceso y roles

| Rol | Acceso |
|---|---|
| Visitante | Visor 3D (capas general y partes), catalogo, fichas publicas |
| Estudiante (student) | Visor completo, capas internas, quizzes, progreso personal |
| Docente (teacher) | Todo lo anterior + gestion de modulos, sala en vivo, progreso de clase |
| Administrador (admin) | Todo lo anterior + panel de usuarios y cambio de roles |
| Superadmin | Acceso total incluyendo gestion de administradores |

---

## Instalacion y ejecucion local

### Requisitos

- Node.js 20 o superior
- PostgreSQL 15 corriendo localmente
- Base de datos `atlas_andino` creada

### Variables de entorno

**.env** (raiz):
```
VITE_API_URL=/api
VITE_GOOGLE_CLIENT_ID=tu_client_id.apps.googleusercontent.com
```

**server/.env**:
```
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=tu_password
PGDATABASE=atlas_andino

JWT_SECRET=cambia_esto_en_produccion
JWT_EXPIRES_IN=7d

PORT=3000
CLIENT_URL=http://127.0.0.1:5173
FRONTEND_URL=http://127.0.0.1:5173
NODE_ENV=development

GOOGLE_CLIENT_ID=tu_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_client_secret
```

### Base de datos

```bash
psql -U postgres -d atlas_andino -f server/db/schema.sql
psql -U postgres -d atlas_andino -f server/db/seed.sql
psql -U postgres -d atlas_andino -f server/db/seed_new_species.sql
psql -U postgres -d atlas_andino -f server/db/seed_breeds.sql
psql -U postgres -d atlas_andino -f server/db/seed_structures.sql
psql -U postgres -d atlas_andino -f server/db/migrations/001_google_auth.sql
```

### Iniciar

```bash
# Instalar dependencias
npm install
cd server && npm install && cd ..

# Frontend + Backend en paralelo
npm run dev:full

# O por separado
npm run dev              # Frontend en http://127.0.0.1:5173
cd server && node index.js  # Backend en http://127.0.0.1:3000
```

---

## API

| Metodo | Ruta | Auth | Descripcion |
|---|---|---|---|
| POST | `/api/auth/register` | — | Registro con email y contrasena |
| POST | `/api/auth/login` | — | Login con email y contrasena |
| POST | `/api/auth/logout` | — | Cerrar sesion |
| GET | `/api/auth/me` | JWT | Usuario autenticado |
| POST | `/api/auth/google` | — | Login o registro con Google |
| POST | `/api/auth/google/complete` | — | Establecer contrasena tras Google |
| GET | `/api/species` | — | Lista de especies |
| GET | `/api/species/:slug` | — | Detalle de especie |
| GET | `/api/quizzes/:slug` | — | Quiz de una especie |
| POST | `/api/quizzes/:id/attempts` | JWT | Enviar respuestas |
| GET | `/api/progress` | JWT | Progreso del usuario |
| POST | `/api/progress` | JWT | Registrar visita a capa |
| GET | `/api/teacher/dashboard` | teacher+ | Modulos y top especies |
| GET | `/api/teacher/students` | teacher+ | Progreso de estudiantes |
| GET | `/api/admin/stats` | admin+ | Estadisticas del sistema |
| GET | `/api/admin/users` | admin+ | Lista de usuarios |
| PATCH | `/api/admin/users/:id/role` | admin+ | Cambiar rol |
| DELETE | `/api/admin/users/:id` | admin+ | Eliminar usuario |

---

## Google OAuth

1. Crear proyecto en console.cloud.google.com
2. APIs y servicios > Credenciales > Crear ID de cliente OAuth 2.0 (Aplicacion web)
3. Origenes JavaScript autorizados:
   - `http://localhost:5173`
   - `http://127.0.0.1:5173`
   - `https://altiplano3d.andre.net.pe`
4. URIs de redireccionamiento autorizados: mismos que los origenes
5. Copiar Client ID y Client Secret a los archivos `.env`

---

## Build de produccion

```bash
npm run build
# Salida en dist/
```

---

## Despliegue (servidor altiplano3d.andre.net.pe)

**Servidor:** VPS Elastika.pe, Debian 12, IP 149.34.48.20

**Ruta en servidor:** `/var/www/node-apps/altiplano3d/`

**Puerto:** 3002 (Apache hace proxy)

```bash
# En el servidor tras subir los archivos por SFTP
cp deploy/env.production server/.env
bash deploy/deploy.sh
```

El script `deploy/deploy.sh` automatiza:
- `npm install --production` en `server/`
- Creacion de base de datos y ejecucion de seeds
- Registro en PM2 como proceso `altiplano3d`
- Configuracion del VirtualHost Apache
- Solicitud de certificado SSL con certbot

**URL produccion:** https://altiplano3d.andre.net.pe

---

## Licencia

MIT License. Ver archivo `LICENSE`.

Copyright (c) 2026 Richard Andre Vilca Solorzano
