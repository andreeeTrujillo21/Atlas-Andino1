import React from "react";
import { useNavigate } from "react-router-dom";
import { Mountain } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem", display: "grid", gap: "1.5rem", justifyItems: "center" }}>
      <Mountain size={64} style={{ color: "var(--olive-soft)" }} />
      <h1 className="title" style={{ fontSize: "3rem" }}>404</h1>
      <p className="subtitle">Esta página no existe en el atlas.</p>
      <button className="primary-btn btn" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
}
