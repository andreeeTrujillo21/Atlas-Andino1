import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Play, Mountain, Ruler, Scale, ArrowRight, Map, GraduationCap, BookOpen } from "lucide-react";
import { ViewerCanvas }  from "../components/viewer/ViewerCanvas.jsx";
import { LayerTabs }     from "../components/viewer/LayerTabs.jsx";
import { QuizCard }      from "../components/quiz/QuizCard.jsx";
import { SPECIES_LIST, getFeatured, getSpecies } from "../data/species/index.js";

const FEATURED = getFeatured();

export function HomePage() {
  const navigate = useNavigate();
  const [speciesSlug, setSpeciesSlug] = useState("alpaca");
  const [layerSlug,   setLayerSlug  ] = useState("general");

  const species = getSpecies(speciesSlug) ?? SPECIES_LIST[0];

  function switchSpecies(slug) {
    setSpeciesSlug(slug);
    setLayerSlug("general");
  }

  return (
    <div style={{ display: "grid", gap: "3rem" }}>
      <HeroSection
        species={species}
        layerSlug={layerSlug}
        setLayerSlug={setLayerSlug}
        onSwitchSpecies={switchSpecies}
        navigate={navigate}
      />
      <FeaturedSpeciesSection navigate={navigate} />
      <TerritoriesPreview navigate={navigate} />
      <CtaBanner navigate={navigate} />
    </div>
  );
}

function HeroSection({ species, layerSlug, setLayerSlug, onSwitchSpecies, navigate }) {
  return (
    <div className="atlas-grid">
      <aside className="panel intro-panel">
        <span className="eyebrow"><Sparkles size={17} /> Atlas 3D interactivo</span>

        <h1 className="title" dangerouslySetInnerHTML={{ __html: species.titleHtml ?? species.title_html ?? species.name }} />
        <p className="subtitle">{species.intro}</p>

        <div className="fact-strip">
          <div className="fact-pill"><Mountain size={24} /><span><small>Origen</small><strong>{species.origin}</strong></span></div>
          <div className="fact-pill"><Ruler    size={24} /><span><small>Tamano</small><strong>{species.size}</strong></span></div>
          <div className="fact-pill"><Scale    size={24} /><span><small>Peso</small><strong>{species.weight}</strong></span></div>
        </div>

        <article className="learning-card">
          <h3>{species.learningTitle}</h3>
          <p>{species.learning}</p>
          <ul className="focus-list">
            {species.focus.map(f => (
              <li key={f}><ArrowRight size={16} /><span>{f}</span></li>
            ))}
          </ul>
        </article>

        <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
          <button className="primary-btn btn" onClick={() => navigate("/panel")}>
            <Play size={18} /> Empezar ruta
          </button>
          <button className="secondary-btn btn" onClick={() => navigate(`/especie/${species.slug}`)}>
            <ArrowRight size={18} /> Ver ficha completa
          </button>
        </div>
      </aside>

      <section className="viewer-card">
        <LayerTabs activeLayer={layerSlug} onChange={setLayerSlug} species={species} />
        <ViewerCanvas species={species} layerSlug={layerSlug} />
        <div className="viewer-footer">
          {[
            { label: "Dieta",    value: species.diet     },
            { label: "Habitat",  value: species.habitat  },
            { label: "Social",   value: species.social   },
            { label: "Vida",     value: species.lifespan },
          ].map(({ label, value }) => (
            <div key={label} className="footer-stat">
              <span />
              <span><small>{label}</small><p>{value}</p></span>
            </div>
          ))}
        </div>
      </section>

      <aside className="right-panel">
        <section className="panel species-switcher">
          <div className="section-title">
            <h2>Especies</h2>
            <button className="ghost-btn btn" onClick={() => navigate("/catalogo")}>
              Ver todas
            </button>
          </div>
          <div className="species-list">
            {FEATURED.map(sp => (
              <button
                key={sp.slug}
                className={`species-button${sp.slug === species.slug ? " active" : ""}`}
                onClick={() => onSwitchSpecies(sp.slug)}
              >
                <span>
                  <strong>{sp.name}</strong>
                  <span>{sp.scientific ?? sp.scientific_name}</span>
                </span>
                <span className="round-icon"><ArrowRight size={18} /></span>
              </button>
            ))}
          </div>
        </section>

        <QuizCard species={species} />
      </aside>
    </div>
  );
}

function FeaturedSpeciesSection({ navigate }) {
  return (
    <section style={{ display: "grid", gap: "1.5rem" }}>
      <div style={{ textAlign: "center" }}>
        <h2 className="title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          Especies del <span>sur del Peru</span>
        </h2>
        <p className="subtitle" style={{ marginTop: ".75rem" }}>
          Explora, compara y aprende la anatomia de la fauna andina.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(14rem, 100%), 1fr))",
        gap: "1.25rem",
      }}>
        {SPECIES_LIST.map(sp => (
          <article
            key={sp.slug}
            className="panel"
            style={{ padding: "1.25rem", display: "grid", gap: ".85rem", cursor: "pointer" }}
            onClick={() => navigate(`/especie/${sp.slug}`)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "1.2rem" }}>
                {sp.name}
              </h3>
              <span
                className={`uicn-badge ${(sp.iucnStatus ?? "LC").toLowerCase()}`}
                title="Estado UICN"
              >
                {sp.iucnStatus ?? "LC"}
              </span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: ".88rem", fontStyle: "italic" }}>
              {sp.scientific}
            </p>
            <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.5 }}>
              {sp.intro?.slice(0, 90)}...
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem", color: "var(--olive-dark)", fontSize: ".8rem", fontWeight: 800 }}>
              {sp.origin}
              <span style={{ color: "var(--olive-soft)" }}>·</span>
              <span style={{ fontWeight: 400, color: "var(--muted)" }}>{sp.diet}</span>
            </div>
            <button className="secondary-btn btn" style={{ justifyContent: "flex-start" }}>
              <ArrowRight size={16} /> Ver anatomia
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

const TERRITORIES_PREVIEW = [
  { name: "Puno",           desc: "Altiplano y Lago Titicaca" },
  { name: "Cusco",          desc: "Montanas y valles andinos" },
  { name: "Arequipa",       desc: "Zonas altoandinas y deserticas" },
  { name: "Moquegua y Tacna", desc: "Valles y lomas costeras" },
];

function TerritoriesPreview({ navigate }) {
  return (
    <section style={{ display: "grid", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p className="eyebrow"><Map size={17} /> Territorios</p>
          <h2 className="title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Explora por <span>territorio</span>
          </h2>
        </div>
        <button className="primary-btn btn" onClick={() => navigate("/territorio")}>
          <Map size={18} /> Ver mapa completo
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(13rem,100%), 1fr))", gap: "1rem" }}>
        {TERRITORIES_PREVIEW.map(t => (
          <article
            key={t.name}
            className="panel"
            style={{ padding: "1.1rem", display: "grid", gap: ".6rem", cursor: "pointer" }}
            onClick={() => navigate("/territorio")}
          >
            <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "var(--olive-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Mountain size={20} style={{ color: "var(--olive-dark)" }} />
            </div>
            <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 500 }}>{t.name}</h3>
            <p style={{ color: "var(--muted)", fontSize: ".88rem" }}>{t.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CtaBanner({ navigate }) {
  return (
    <section style={{
      padding: "3rem 2rem",
      borderRadius: "var(--radius-lg)",
      background: "linear-gradient(145deg, rgba(124,132,74,.88), rgba(193,195,150,.9))",
      color: "#fff",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: "1.5rem",
      alignItems: "center",
    }}>
      <div style={{ display: "grid", gap: ".75rem" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", margin: 0 }}>
          Listo para aprender como nunca antes?
        </h2>
        <p style={{ opacity: .9, lineHeight: 1.55, maxWidth: "48rem" }}>
          Explora la anatomia de las especies animales del sur del Peru con atlas 3D interactivos, accesibles y disenados para inspirar.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        <button
          className="btn"
          style={{ background: "#fff", color: "var(--olive-dark)", fontWeight: 900, gap: ".55rem", display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "2.75rem", padding: "0 1.5rem", borderRadius: "var(--radius)", whiteSpace: "nowrap" }}
          onClick={() => navigate("/catalogo")}
        >
          <Sparkles size={18} /> Explorar atlas
        </button>
        <button
          className="btn"
          style={{ background: "rgba(255,255,255,.2)", color: "#fff", fontWeight: 900, border: "1px solid rgba(255,255,255,.5)", gap: ".55rem", display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "2.75rem", padding: "0 1.5rem", borderRadius: "var(--radius)", whiteSpace: "nowrap" }}
          onClick={() => navigate("/login?modo=registro")}
        >
          <GraduationCap size={18} /> Crear cuenta
        </button>
      </div>
    </section>
  );
}
