import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn, UserPlus } from "lucide-react";

export function AuthGate({ title = "Contenido exclusivo", description, children }) {
  const navigate = useNavigate();

  return (
    <div className="auth-gate-wrapper">
      <div className="auth-gate-blur" aria-hidden="true">
        {children}
      </div>
      <div className="auth-gate-overlay">
        <div className="auth-gate-card">
          <div className="auth-gate-icon">
            <Lock size={28} />
          </div>
          <h3>{title}</h3>
          <p>{description ?? "Inicia sesión o regístrate para acceder a este contenido detallado."}</p>
          <div className="auth-gate-actions">
            <button
              className="primary-btn btn"
              onClick={() => navigate("/login")}
            >
              <LogIn size={17} /> Iniciar sesión
            </button>
            <button
              className="secondary-btn btn"
              onClick={() => navigate("/login?modo=registro")}
            >
              <UserPlus size={17} /> Registrarse gratis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
