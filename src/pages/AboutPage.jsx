import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mountain, BookOpen, Users } from "lucide-react";

export function AboutPage() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "grid", gap: "2rem", maxWidth: "62rem", margin: "0 auto" }}>
      <div style={{ textAlign: "center" }}>
        <p className="eyebrow"><Sparkles size={17} /> Nosotros</p>
        <h1 className="title" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", margin: "1rem 0" }}>
          Transformemos <span>tu aprendizaje</span>
        </h1>
        <p className="subtitle" style={{ maxWidth: "42rem", margin: "0 auto" }}>
          Atlas Andino es una plataforma educativa 3D diseñada para explorar la anatomía
          de las especies animales del sur del Perú. Nace en FINESI con el objetivo de
          acercar la biología andina a estudiantes y docentes a través de modelos interactivos.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))", gap: "1.25rem" }}>
        {[
          { icon: Mountain, title: "Sur del Perú",      text: "Puno, Cusco, Arequipa, Moquegua y Tacna — biodiversidad única en altiplano, andes y humedales." },
          { icon: BookOpen, title: "Atlas 3D",           text: "Modelos tridimensionales interactivos con capas anatómicas: exterior, partes, huesos y órganos." },
          { icon: Users,    title: "Para todos",         text: "Herramientas diferenciadas para estudiantes y docentes, con quiz, rutas de aprendizaje y métricas." },
        ].map(({ icon: Icon, title, text }) => (
          <article key={title} className="panel" style={{ padding: "1.5rem", display: "grid", gap: ".75rem" }}>
            <span className="icon-badge" style={{ width: "3rem", height: "3rem" }}><Icon size={22} /></span>
            <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "1.2rem" }}>{title}</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.55, fontSize: ".92rem" }}>{text}</p>
          </article>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "var(--muted)", marginBottom: "1.25rem", fontSize: ".9rem" }}>
          Fuentes: AIA · SERNANP · PROMPERÚ
        </p>
        <button className="primary-btn btn" onClick={() => navigate("/catalogo")}>
          <Sparkles size={18} /> Explorar el atlas
        </button>
      </div>
    </div>
  );
}
