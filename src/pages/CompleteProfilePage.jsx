import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export function CompleteProfilePage() {
  const navigate = useNavigate();
  const { googleComplete } = useAuth();

  const [pending,   setPending  ] = useState(null);
  const [password,  setPassword ] = useState("");
  const [confirm,   setConfirm  ] = useState("");
  const [showPass,  setShowPass ] = useState(false);
  const [error,     setError    ] = useState("");
  const [busy,      setBusy     ] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("google_pending");
    if (!raw) {
      navigate("/login");
      return;
    }
    try {
      setPending(JSON.parse(raw));
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setBusy(true);
    try {
      await googleComplete(pending.tempToken, password);
      sessionStorage.removeItem("google_pending");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!pending) return null;

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="complete-profile-header">
          <div className="complete-profile-avatar">
            {pending.user?.avatarUrl
              ? <img src={pending.user.avatarUrl} alt="Avatar" />
              : <span>{(pending.user?.fullName ?? "U")[0].toUpperCase()}</span>
            }
          </div>
          <div>
            <h1 className="login-title" style={{ fontSize: "1.65rem" }}>
              ¡Hola, <span>{pending.user?.fullName?.split(" ")[0]}!</span>
            </h1>
            <p className="login-subtitle" style={{ marginTop: ".25rem" }}>
              {pending.user?.email}
            </p>
          </div>
        </div>

        <div className="complete-profile-info">
          <ShieldCheck size={18} style={{ color: "var(--olive)" }} />
          <p>
            Crea una contraseña para acceder al atlas sin Google cuando quieras.
            Este paso es <strong>opcional</strong> — puedes hacerlo ahora o más tarde.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div className="form-group">
            <label htmlFor="password">Contraseña nueva</label>
            <div className="input-icon-wrap">
              <Lock size={17} className="input-icon" />
              <input
                id="password" name="password"
                type={showPass ? "text" : "password"}
                className="form-input form-input--icon form-input--icon-right"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-icon-btn"
                onClick={() => setShowPass(v => !v)}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm">Confirmar contraseña</label>
            <div className="input-icon-wrap">
              <Lock size={17} className="input-icon" />
              <input
                id="confirm" name="confirm"
                type={showPass ? "text" : "password"}
                className="form-input form-input--icon"
                placeholder="Repite la contraseña"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-btn btn" disabled={busy}>
            {busy ? "Guardando..." : "Guardar contraseña y continuar"}
          </button>

          <button
            type="button"
            className="ghost-btn btn"
            style={{ color: "var(--muted)" }}
            onClick={() => {
              sessionStorage.removeItem("google_pending");
              navigate("/");
            }}
          >
            Omitir por ahora
          </button>
        </form>
      </div>
    </div>
  );
}
