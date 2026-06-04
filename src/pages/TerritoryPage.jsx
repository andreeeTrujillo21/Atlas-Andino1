import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, Mountain, ArrowRight, Waves, Users } from "lucide-react";
import { getSpecies } from "../data/species/index.js";

const TERRITORIES = [
  {
    id: "puno",
    name: "Puno",
    cx: 310, cy: 205,
    description: "Altiplano y Lago Titicaca, hogar de especies unicas adaptadas al frio y los humedales.",
    ecosystems: ["Altiplano", "Lago Titicaca", "Humedales"],
    color: "#7c9bbf",
    species: ["vicuna", "vizcacha", "zambullidor"],
  },
  {
    id: "cusco",
    name: "Cusco",
    cx: 235, cy: 160,
    description: "Montanas y valles andinos con una gran diversidad de fauna y flora.",
    ecosystems: ["Andes", "Valles", "Bosque nublado"],
    color: "#7c844a",
    species: ["vicuna", "llama", "alpaca"],
  },
  {
    id: "arequipa",
    name: "Arequipa",
    cx: 225, cy: 255,
    description: "Regiones altoandinas y deserticas que albergan especies resistentes y comunidades resilientes.",
    ecosystems: ["Altiplano", "Desierto costero", "Valles"],
    color: "#c8a97a",
    species: ["vicuna", "vizcacha"],
  },
  {
    id: "moquegua",
    name: "Moquegua",
    cx: 225, cy: 310,
    description: "Valles frutales y lomas costeras con vida silvestre y comunidades ancestrales.",
    ecosystems: ["Valles costeros", "Lomas"],
    color: "#9c8866",
    species: ["cuy", "vicuna"],
  },
  {
    id: "tacna",
    name: "Tacna",
    cx: 235, cy: 365,
    description: "Zona fronteriza con ecosistemas deserticos y altoandinos de gran valor biologico.",
    ecosystems: ["Desierto", "Altiplano"],
    color: "#b7864c",
    species: ["vicuna"],
  },
];

const ECOSYSTEM_ICONS = {
  "Altiplano":        Mountain,
  "Lago Titicaca":    Waves,
  "Humedales":        Waves,
  "Andes":            Mountain,
  "Valles":           Mountain,
  "Comunidades rurales": Users,
  "Desierto":         Mountain,
  "Desierto costero": Mountain,
  "Bosque nublado":   Mountain,
  "Valles costeros":  Mountain,
  "Lomas":            Mountain,
};

export function TerritoryPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const current = active ? TERRITORIES.find(t => t.id === active) : null;

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      <div>
        <p className="eyebrow"><Map size={17} /> Territorios</p>
        <h1 className="title" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
          Explora por <span>territorio</span>
        </h1>
        <p className="subtitle" style={{ marginTop: ".75rem", maxWidth: "42rem" }}>
          Descubre las especies emblematicas del sur del Peru y su relacion con cada ecosistema y comunidad.
        </p>
      </div>

      <div className="territory-layout">
        <MapPanel territories={TERRITORIES} active={active} onSelect={setActive} />
        <DetailPanel territory={current} navigate={navigate} />
      </div>

      <TerritoryGrid territories={TERRITORIES} navigate={navigate} />
    </div>
  );
}

function MapPanel({ territories, active, onSelect }) {
  return (
    <div className="panel" style={{ padding: "1.5rem", display: "grid", gap: "1rem" }}>
      <div className="section-title">
        <h2>Sur del Peru</h2>
        <span style={{ color: "var(--muted)", fontSize: ".85rem" }}>Selecciona una region</span>
      </div>

      <svg
        viewBox="0 0 500 500"
        style={{ width: "100%", maxWidth: "36rem", margin: "0 auto", display: "block" }}
        aria-label="Mapa del sur del Peru"
      >
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        <SouthPeruOutline />

        {territories.map(t => (
          <g key={t.id} onClick={() => onSelect(t.id === active ? null : t.id)} style={{ cursor: "pointer" }}>
            <circle
              cx={t.cx} cy={t.cy} r={active === t.id ? 28 : 22}
              fill={t.color}
              fillOpacity={active === t.id ? 0.9 : 0.65}
              stroke={active === t.id ? t.color : "rgba(255,255,255,.7)"}
              strokeWidth={active === t.id ? 3 : 1.5}
              filter="url(#shadow)"
              style={{ transition: "all 200ms ease" }}
            />
            <text
              x={t.cx} y={t.cy + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={active === t.id ? "11" : "9.5"}
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
              fill="#fff"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {t.name}
            </text>
          </g>
        ))}

        <text x="20" y="480" fontSize="10" fill="rgba(100,100,80,.6)" fontFamily="system-ui, sans-serif">
          Fuente: AIA · SERNANP · PROMPERU
        </text>
      </svg>

      <div style={{ display: "flex", gap: ".65rem", flexWrap: "wrap" }}>
        {territories.map(t => (
          <button
            key={t.id}
            className={`btn ${active === t.id ? "primary-btn" : "secondary-btn"}`}
            style={{ fontSize: ".78rem", minHeight: "2rem", padding: "0 .75rem" }}
            onClick={() => onSelect(t.id === active ? null : t.id)}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailPanel({ territory, navigate }) {
  if (!territory) {
    return (
      <div className="panel" style={{ padding: "1.5rem", display: "grid", gap: "1rem", alignContent: "start" }}>
        <div className="section-title">
          <h2>Selecciona una region</h2>
          <span className="icon-badge"><Map size={18} /></span>
        </div>
        <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
          Haz click en cualquier region del mapa o en los botones para explorar las especies que habitan ese territorio.
        </p>
        <div style={{ padding: "1.5rem", textAlign: "center", border: "2px dashed var(--line)", borderRadius: "var(--radius)", color: "var(--muted)" }}>
          <Mountain size={32} style={{ opacity: .4, margin: "0 auto .75rem" }} />
          <p style={{ fontSize: ".9rem" }}>Elige una region para ver sus especies</p>
        </div>
      </div>
    );
  }

  const speciesList = territory.species
    .map(slug => getSpecies(slug))
    .filter(Boolean);

  return (
    <div className="panel" style={{ padding: "1.5rem", display: "grid", gap: "1rem", alignContent: "start" }}>
      <div>
        <p className="eyebrow"><Mountain size={15} /> {territory.ecosystems[0]}</p>
        <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "1.8rem", margin: ".25rem 0" }}>
          {territory.name}
        </h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.55 }}>{territory.description}</p>
      </div>

      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        {territory.ecosystems.map(eco => {
          const Icon = ECOSYSTEM_ICONS[eco] ?? Mountain;
          return (
            <span key={eco} style={{
              display: "inline-flex", alignItems: "center", gap: ".35rem",
              padding: ".25rem .65rem", borderRadius: "99rem",
              background: "var(--olive-soft)", color: "var(--olive-dark)",
              fontSize: ".78rem", fontWeight: 800,
            }}>
              <Icon size={12} /> {eco}
            </span>
          );
        })}
      </div>

      <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1rem" }}>
        <p style={{ fontSize: ".82rem", fontWeight: 900, color: "var(--olive-dark)", textTransform: "uppercase", letterSpacing: ".08rem", marginBottom: ".75rem" }}>
          Especies emblematicas
        </p>
        <div style={{ display: "grid", gap: ".65rem" }}>
          {speciesList.map(sp => (
            <button
              key={sp.slug}
              className="species-button"
              onClick={() => navigate(`/especie/${sp.slug}`)}
            >
              <span>
                <strong>{sp.name}</strong>
                <span>{sp.scientific} · {sp.iucnStatus}</span>
              </span>
              <span className="round-icon"><ArrowRight size={18} /></span>
            </button>
          ))}
        </div>
      </div>

      <button className="primary-btn btn" onClick={() => navigate("/catalogo")}>
        <ArrowRight size={17} /> Ver catalogo completo
      </button>
    </div>
  );
}

function TerritoryGrid({ territories, navigate }) {
  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <div className="section-title">
        <h2>Todos los territorios</h2>
      </div>

      <div style={{ display: "grid", gap: "1rem" }}>
        {territories.map(t => {
          const speciesList = t.species.map(s => getSpecies(s)).filter(Boolean);
          return (
            <article key={t.id} className="panel" style={{
              padding: "1.25rem",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "1rem",
              alignItems: "center",
            }}>
              <div style={{
                width: "3.5rem", height: "3.5rem", borderRadius: "50%",
                background: t.color, display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Mountain size={20} style={{ color: "#fff" }} />
              </div>

              <div style={{ display: "grid", gap: ".5rem", minWidth: 0 }}>
                <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "1.15rem" }}>{t.name}</h3>
                <p style={{ color: "var(--muted)", fontSize: ".88rem" }}>{t.description}</p>
                <div style={{ display: "flex", gap: ".65rem", flexWrap: "wrap", marginTop: ".25rem" }}>
                  {speciesList.map(sp => (
                    <span key={sp.slug} style={{
                      fontSize: ".75rem", fontWeight: 700, color: "var(--ink)",
                      padding: ".15rem .5rem", border: "1px solid var(--line)",
                      borderRadius: "99rem", background: "rgba(255,255,255,.7)",
                    }}>
                      {sp.name}
                    </span>
                  ))}
                </div>
              </div>

              <button className="secondary-btn btn" onClick={() => navigate("/catalogo")} style={{ flexShrink: 0 }}>
                <ArrowRight size={16} /> Ver especies
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SouthPeruOutline() {
  return (
    <g opacity="0.18">
      <path
        d="M 180 60 L 280 55 L 320 80 L 340 120 L 360 150 L 370 195 L 355 240 L 345 290 L 340 340 L 320 390 L 290 420 L 250 430 L 210 415 L 185 370 L 170 320 L 160 260 L 155 210 L 160 165 L 165 120 Z"
        fill="var(--olive)"
        stroke="var(--olive-dark)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 155 210 L 120 220 L 100 240 L 110 280 L 130 290 L 160 260 Z"
        fill="var(--olive)"
        stroke="var(--olive-dark)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </g>
  );
}
