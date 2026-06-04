import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap, BookOpen, ShieldCheck, ArrowRight, Eye, Brain,
  Activity, Trophy, BarChart2, Users, Waves, Copy, Play, Check,
  Loader, Trash2, ChevronDown, UserCog, BookMarked, Sparkles,
} from "lucide-react";
import { ViewerCanvas } from "../components/viewer/ViewerCanvas.jsx";
import { LayerTabs }    from "../components/viewer/LayerTabs.jsx";
import { QuizCard }     from "../components/quiz/QuizCard.jsx";
import { useAuth }      from "../context/AuthContext.jsx";
import { useProgress }  from "../hooks/useProgress.js";
import { SPECIES_LIST, getSpecies } from "../data/species/index.js";
import { api }          from "../api/client.js";
import { swal }         from "../utils/swal.js";

const ROLE_TABS = {
  student:    [{ key: "progreso", label: "Mi progreso",    icon: GraduationCap }],
  teacher:    [
    { key: "progreso", label: "Mi progreso",    icon: GraduationCap },
    { key: "gestion",  label: "Gestión",        icon: BookOpen      },
  ],
  admin:      [
    { key: "progreso", label: "Mi progreso",    icon: GraduationCap },
    { key: "gestion",  label: "Gestión",        icon: BookOpen      },
    { key: "admin",    label: "Administración", icon: ShieldCheck   },
  ],
  superadmin: [
    { key: "progreso", label: "Mi progreso",    icon: GraduationCap },
    { key: "gestion",  label: "Gestión",        icon: BookOpen      },
    { key: "admin",    label: "Administración", icon: ShieldCheck   },
  ],
};

export function DashboardPage() {
  const navigate = useNavigate();
  const { user }  = useAuth();
  const role      = user?.role ?? "student";
  const tabs      = ROLE_TABS[role] ?? ROLE_TABS.student;

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  useEffect(() => {
    if (!tabs.find(t => t.key === activeTab)) setActiveTab(tabs[0].key);
  }, [role]);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">
            <Sparkles size={16} /> Panel personal
          </span>
          <h1 className="title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", marginTop: ".25rem" }}>
            {role === "admin"   ? <><span>Administración</span> del atlas</> :
             role === "teacher" ? <>Guía, inspira <span>y evalúa</span>   </> :
                                  <>Aprende <span>explorando</span>        </>}
          </h1>
        </div>
        <button className="secondary-btn btn dashboard-atlas-btn" onClick={() => navigate("/")}>
          <ArrowRight size={17} /> Ir al atlas
        </button>
      </header>

      <nav className="dashboard-tabs">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`dashboard-tab${activeTab === key ? " active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            <Icon size={17} /> {label}
          </button>
        ))}
      </nav>

      <div className="dashboard-body">
        {activeTab === "progreso" && <TabProgreso user={user} navigate={navigate} />}
        {activeTab === "gestion"  && <TabGestion  navigate={navigate} />}
        {activeTab === "admin"    && <TabAdmin     currentUser={user} />}
      </div>
    </div>
  );
}

function TabProgreso({ user, navigate }) {
  const { getPct, recordVisit } = useProgress(user);
  const [activeSlug, setActiveSlug] = useState("cuy");
  const [layerSlug,  setLayerSlug ] = useState("general");
  const species = getSpecies(activeSlug) ?? SPECIES_LIST[0];

  function switchSpecies(slug) {
    setActiveSlug(slug);
    setLayerSlug("general");
  }

  function handleLayerChange(next) {
    setLayerSlug(next);
    recordVisit(activeSlug, next);
  }

  const featured = SPECIES_LIST.filter(s => s.isFeatured).slice(0, 3);

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div className="dashboard-species-strip">
        {featured.map((sp, i) => {
          const pct = user ? getPct(sp.slug) : [82, 64, 71][i];
          return (
            <article key={sp.slug} className="species-card panel">
              <div className="species-card__top">
                <h3>{sp.name}</h3>
                <span className="icon-badge">
                  {[<Eye size={18} key="e" />, <Brain size={18} key="b" />, <Activity size={18} key="a" />][i]}
                </span>
              </div>
              <p>{sp.focus[0]}</p>
              <div className="progress">
                <div className="progress__fill" style={{ width: `${pct}%` }} />
              </div>
              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                <button
                  className="secondary-btn btn"
                  style={{ flex: 1 }}
                  onClick={() => switchSpecies(sp.slug)}
                >
                  <Eye size={16} /> Explorar
                </button>
                <button
                  className="primary-btn btn"
                  style={{ flex: 1 }}
                  onClick={() => navigate(`/especie/${sp.slug}`)}
                >
                  <ArrowRight size={16} /> Ver ficha
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="dashboard-viewer-grid">
        <section className="viewer-card">
          <LayerTabs activeLayer={layerSlug} onChange={handleLayerChange} species={species} />
          <ViewerCanvas species={species} layerSlug={layerSlug} />
          <div className="viewer-footer">
            {[
              { label: "Dieta",   value: species.diet     },
              { label: "Hábitat", value: species.habitat  },
              { label: "Social",  value: species.social   },
              { label: "Vida",    value: species.lifespan },
            ].map(({ label, value }) => (
              <div key={label} className="footer-stat">
                <span /><span><small>{label}</small><p>{value}</p></span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: "grid", gap: "1rem", alignContent: "start" }}>
          <QuizCard species={species} />

          <section className="metric-card panel">
            <div className="section-title">
              <h2>Tu progreso</h2>
              <span className="icon-badge"><Trophy size={17} /></span>
            </div>
            {[
              { label: "Anatomía externa",    idx: 0 },
              { label: "Sistema óseo",        idx: 1 },
              { label: "Órganos principales", idx: 2 },
            ].map(({ label, idx }) => {
              const pct = user ? getPct(activeSlug) : [92, 74, 68][idx];
              return (
                <div key={label} className="student-row">
                  <span>
                    <strong>{label}</strong>
                    <div className="progress" style={{ marginTop: ".35rem" }}>
                      <div className="progress__fill" style={{ width: `${pct}%` }} />
                    </div>
                  </span>
                  <strong>{pct}%</strong>
                </div>
              );
            })}
            <button className="primary-btn btn" onClick={() => navigate(`/especie/${activeSlug}`)}>
              <ArrowRight size={17} /> Continuar con {species.name}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function TabGestion({ navigate }) {
  const [dashboard, setDashboard] = useState(null);
  const [students,  setStudents ] = useState([]);
  const [loading,   setLoading  ] = useState(true);
  const [copied,    setCopied   ] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get("/teacher/dashboard"),
      api.get("/teacher/students"),
    ])
      .then(([dash, stud]) => {
        setDashboard(dash);
        setStudents(stud.students ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function copyRoom() {
    await navigator.clipboard.writeText("AND-472");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    swal.toast("Código copiado al portapapeles");
  }

  const modules    = dashboard?.modules    ?? [];
  const topSpecies = dashboard?.topSpecies ?? [];

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div className="teacher-actions">
        {[
          { title: "Crear recorrido",   text: "Diseña rutas de aprendizaje personalizadas.", icon: BookMarked, action: () => navigate("/catalogo") },
          { title: "Asignar actividad", text: "Selecciona actividades para tus estudiantes.", icon: UserCog,    action: () => {}                   },
          { title: "Ver resultados",    text: "Consulta el progreso y logros de tu clase.",   icon: BarChart2,  action: () => {}                   },
        ].map(({ title, text, icon: Icon, action }) => (
          <article key={title} className="teacher-card panel" style={{ cursor: "pointer" }} onClick={action}>
            <span className="teacher-card__icon"><Icon size={25} /></span>
            <span><h3>{title}</h3><p>{text}</p></span>
            <span className="round-icon"><ArrowRight size={18} /></span>
          </article>
        ))}
      </div>

      <div className="teacher-dashboard">
        <section className="metric-card panel">
          <div className="section-title">
            <h2>Módulos asignados</h2>
            <button className="ghost-btn btn" onClick={() => {}}>Ver todos</button>
          </div>
          {loading ? (
            <Loader size={18} style={{ color: "var(--muted)", animation: "spin 1s linear infinite" }} />
          ) : modules.length ? (
            modules.map(m => (
              <div key={m.id} className="module-row">
                <span>
                  <strong>{m.title}</strong>
                  <span>{m.assignments_count ?? 0} / 21 estudiantes</span>
                  <div className="progress" style={{ marginTop: ".35rem" }}>
                    <div className="progress__fill" style={{ width: `${m.avg_score ?? 0}%` }} />
                  </div>
                </span>
                <strong>{m.avg_score ?? 0}%</strong>
              </div>
            ))
          ) : (
            <p style={{ color: "var(--muted)", fontSize: ".88rem" }}>Sin módulos asignados aún.</p>
          )}
        </section>

        <section className="metric-card panel">
          <div className="section-title">
            <h2>Sala en vivo</h2>
            <span className="icon-badge"><Users size={18} /></span>
          </div>
          <div className="room-box">
            <span className="eyebrow"><Waves size={17} /> Quiz anatómico</span>
            <p className="subtitle">Comparación entre sistemas digestivos de cuy y vaca.</p>
            <div className="room-code">
              <span><small>Código</small><strong>AND-472</strong></span>
              <button className="secondary-btn btn" onClick={copyRoom}>
                {copied ? <><Check size={16} /> Copiado</> : <><Copy size={16} /> Copiar</>}
              </button>
            </div>
            <button className="primary-btn btn" onClick={() => {}}>
              <Play size={18} /> Iniciar sala
            </button>
          </div>
          {students.length > 0 && (
            <>
              <div className="section-title" style={{ marginTop: ".5rem" }}>
                <h2>Progreso por estudiante</h2>
              </div>
              {students.map(s => (
                <div key={s.id} className="student-row">
                  <span>
                    <strong>{s.full_name}</strong>
                    <div className="progress" style={{ marginTop: ".35rem" }}>
                      <div className="progress__fill" style={{ width: `${s.avg_pct ?? 0}%` }} />
                    </div>
                  </span>
                  <strong>{s.avg_pct ?? 0}%</strong>
                </div>
              ))}
            </>
          )}
        </section>

        <section className="metric-card panel">
          <div className="section-title">
            <h2>Especies más estudiadas</h2>
            <button className="ghost-btn btn" onClick={() => {}}>Ver informe</button>
          </div>
          {loading ? null : topSpecies.length ? (
            topSpecies.map(sp => (
              <div key={sp.slug} className="module-row">
                <span><strong>{sp.name}</strong><span>{sp.study_count} sesiones</span></span>
              </div>
            ))
          ) : (
            <p style={{ color: "var(--muted)", fontSize: ".88rem" }}>Sin actividad registrada aún.</p>
          )}

          <div className="section-title" style={{ marginTop: ".5rem" }}>
            <h2>Actividades recomendadas</h2>
          </div>
          {[
            { title: "Adaptaciones en altura",  text: "Relaciona vicuña, clima y puna.",           level: "Medio"    },
            { title: "Rumiación y fibra",        text: "Compara digestión bovina con el cuy.",      level: "Medio"    },
            { title: "Bienestar animal",         text: "Evalúa manejo responsable en comunidad.",   level: "Avanzado" },
          ].map(({ title, text, level }) => (
            <article key={title} className="activity-card panel" style={{ cursor: "pointer" }}>
              <span className="activity-card__icon"><BookMarked size={22} /></span>
              <span><h3>{title}</h3><p>{text}</p></span>
              <span className="role-badge role-badge--olive">{level}</span>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

function TabAdmin({ currentUser }) {
  const [users,      setUsers     ] = useState([]);
  const [callerRole, setCallerRole] = useState("admin");
  const [stats,      setStats     ] = useState(null);
  const [loading,    setLoading   ] = useState(true);
  const [busy,       setBusy      ] = useState(null);

  const isSuperadmin = callerRole === "superadmin";

  useEffect(() => {
    Promise.all([
      api.get("/admin/users"),
      api.get("/admin/stats"),
    ])
      .then(([u, s]) => {
        setUsers(u.users ?? []);
        setCallerRole(u.callerRole ?? "admin");
        setStats(s.stats);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function changeRole(id, role, currentRole) {
    const target = users.find(u => u.id === id);
    const res = await swal.confirm({
      title: "Cambiar rol",
      text: `¿Cambiar a ${target?.full_name ?? "este usuario"} de "${currentRole}" a "${role}"?`,
      confirmText: "Confirmar cambio",
      icon: "warning",
    });
    if (!res.isConfirmed) return;
    setBusy(id);
    try {
      const { user: updated } = await api.patch(`/admin/users/${id}/role`, { role });
      setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, role: updated.role } : u));
      swal.toast("Rol actualizado");
    } catch (err) {
      swal.error("Error", err.message ?? "No se pudo cambiar el rol");
    } finally {
      setBusy(null);
    }
  }

  async function removeUser(id) {
    const target = users.find(u => u.id === id);
    const res = await swal.confirm({
      title: "Eliminar usuario",
      text: `¿Eliminar a ${target?.full_name ?? "este usuario"}? Esta acción no se puede deshacer.`,
      confirmText: "Eliminar",
      icon: "warning",
    });
    if (!res.isConfirmed) return;
    setBusy(id);
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      swal.toast("Usuario eliminado", "success");
    } catch (err) {
      swal.error("Error", err.message ?? "No se pudo eliminar el usuario");
    } finally {
      setBusy(null);
    }
  }

  const STAT_CARDS = [
    { label: "Usuarios registrados", value: stats?.totalUsers    ?? "—", icon: Users      },
    { label: "Sesiones de estudio",  value: stats?.totalProgress ?? "—", icon: BookOpen   },
    { label: "Quiz completados",     value: stats?.totalAttempts ?? "—", icon: BarChart2  },
  ];

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div className="admin-stats-strip">
        {STAT_CARDS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="admin-stat-card panel">
            <span className="admin-stat-icon"><Icon size={22} /></span>
            <div>
              <strong className="admin-stat-value">{loading ? "—" : value}</strong>
              <span className="admin-stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="panel" style={{ padding: "1.25rem", display: "grid", gap: "1rem" }}>
        <div className="section-title">
          <h2>Usuarios del sistema</h2>
          <span style={{ color: "var(--muted)", fontSize: ".85rem" }}>
            {users.length} registrados
          </span>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            <Loader size={22} style={{ color: "var(--muted)", animation: "spin 1s linear infinite" }} />
          </div>
        ) : (
          <div className="admin-users-table">
            <div className="admin-table-head">
              <span>Usuario</span>
              <span>Proveedor</span>
              <span>Rol</span>
              <span>Registrado</span>
              <span></span>
            </div>
            {users.map(u => (
              <div key={u.id} className={`admin-table-row${u.id === currentUser?.id ? " admin-table-row--self" : ""}`}>
                <span className="admin-user-info">
                  {u.avatar_url
                    ? <img src={u.avatar_url} alt="" className="user-avatar-sm" />
                    : <span className="admin-user-avatar-placeholder">{(u.full_name ?? "U")[0].toUpperCase()}</span>
                  }
                  <span>
                    <strong>{u.full_name}</strong>
                    <small>{u.email}</small>
                  </span>
                </span>
                <span>
                  <span className={`role-badge role-badge--${u.auth_provider === "google" ? "blue" : "sand"}`}>
                    {u.auth_provider ?? "local"}
                  </span>
                </span>
                <span>
                  {u.id === currentUser?.id ? (
                    <span className={`role-badge role-badge--${u.role === "superadmin" ? "purple" : "olive"}`}>{u.role}</span>
                  ) : (
                    <div className="admin-role-select-wrap">
                      <select
                        className="admin-role-select"
                        value={u.role}
                        disabled={busy === u.id || (u.role === "superadmin" && !isSuperadmin)}
                        onChange={e => changeRole(u.id, e.target.value, u.role)}
                      >
                        <option value="student">Estudiante</option>
                        <option value="teacher">Docente</option>
                        <option value="admin">Admin</option>
                        {isSuperadmin && <option value="superadmin">Superadmin</option>}
                      </select>
                      <ChevronDown size={14} className="admin-role-chevron" />
                    </div>
                  )}
                </span>
                <span style={{ color: "var(--muted)", fontSize: ".8rem" }}>
                  {new Date(u.created_at).toLocaleDateString("es-PE", { year: "numeric", month: "short", day: "numeric" })}
                </span>
                <span>
                  {u.id !== currentUser?.id && (
                    <button
                      className="admin-delete-btn"
                      title="Eliminar usuario"
                      disabled={busy === u.id}
                      onClick={() => removeUser(u.id)}
                    >
                      {busy === u.id
                        ? <Loader size={15} style={{ animation: "spin 1s linear infinite" }} />
                        : <Trash2 size={15} />
                      }
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
