import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronRight, Info, Sparkles, FileText } from "lucide-react";
import { ViewerCanvas }  from "../components/viewer/ViewerCanvas.jsx";
import { LayerTabs }     from "../components/viewer/LayerTabs.jsx";
import { QuickFacts }    from "../components/species/QuickFacts.jsx";
import { StructureList } from "../components/species/StructureList.jsx";
import { QuizCard }      from "../components/quiz/QuizCard.jsx";
import { AuthGate }      from "../components/common/AuthGate.jsx";
import { useSpecies }    from "../hooks/useSpecies.js";
import { useStructures } from "../hooks/useStructures.js";
import { useAuth }       from "../context/AuthContext.jsx";
import { useProgress }   from "../hooks/useProgress.js";
import { SPECIES_LIST }  from "../data/species/index.js";

export function SpeciesPage() {
  const { slug, layer: layerParam } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { species, loading: speciesLoading } = useSpecies(slug);
  const [layerSlug, setLayerSlug] = useState(layerParam ?? "general");

  const { data: structureData, loading: structLoading } = useStructures(slug, layerSlug);
  const { recordVisit } = useProgress(user);

  useEffect(() => {
    if (species && layerSlug) recordVisit(species.slug, layerSlug);
  }, [species?.slug, layerSlug]);

  function changeLayer(next) {
    setLayerSlug(next);
    navigate(`/especie/${slug}/${next}`, { replace: true });
  }

  if (speciesLoading && !species) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "var(--muted)" }}>
        Cargando especie...
      </div>
    );
  }

  if (!species) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <p className="subtitle">Especie no encontrada.</p>
        <button className="primary-btn btn" style={{ marginTop: "1rem" }} onClick={() => navigate("/catalogo")}>
          Ver catálogo
        </button>
      </div>
    );
  }

  const hasDetailLayers = ["huesos", "organos", "craneo"].includes(layerSlug);
  const staticLayer = species.layers?.find(l => l.slug === layerSlug);

  const keyStructures = structureData?.keyStructures ?? staticLayer?.keyStructures ?? [];
  const systems       = structureData?.systems       ?? staticLayer?.systems       ?? [];
  const layerTitle    = staticLayer?.layerTitle ?? null;
  const layerIntro    = staticLayer?.layerIntro ?? null;
  const layerFact     = staticLayer?.layerFact  ?? null;

  const showDetailPanel = hasDetailLayers && !structLoading && keyStructures.length > 0;

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <nav className="breadcrumb">
        <Link to="/" style={{ color: "var(--olive-dark)", fontWeight: 700 }}>Inicio</Link>
        <ChevronRight size={14} />
        <Link to="/catalogo" style={{ color: "var(--olive-dark)", fontWeight: 700 }}>Especies</Link>
        <ChevronRight size={14} />
        <span>{species.name}</span>
      </nav>

      <div className="species-layout">
        <aside style={{ display: "grid", gap: "1rem" }}>
          <div className="panel intro-panel">
            <p className="eyebrow"><Sparkles size={16} /> Anatomía interactiva</p>
            <h1
              className="title"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              dangerouslySetInnerHTML={{ __html: species.title_html ?? species.titleHtml ?? species.name }}
            />
            <p style={{ color: "var(--muted)", fontStyle: "italic" }}>
              {species.scientific_name ?? species.scientific}
            </p>
            <p className="subtitle">{species.intro}</p>

            <span className={`uicn-badge ${(species.iucn_status ?? species.iucnStatus ?? "LC").toLowerCase()}`}>
              {species.iucn_status ?? species.iucnStatus ?? "LC"}
            </span>

            {(species.didYouKnow ?? species.did_you_know ?? [])[0] && (
              <div className="did-you-know">
                <Info size={18} />
                <p>{(species.didYouKnow ?? species.did_you_know)[0]}</p>
              </div>
            )}
          </div>

          <QuickFacts species={species} />
        </aside>

        <section className="viewer-card">
          <LayerTabs activeLayer={layerSlug} onChange={changeLayer} species={species} />
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
      </div>

      {showDetailPanel && (
        user ? (
          <div className="species-detail-grid">
            <StructureList
              layerSlug={layerSlug}
              layerTitle={layerTitle}
              layerIntro={layerIntro}
              layerFact={layerFact}
              keyStructures={keyStructures}
              systems={systems}
            />
            <QuizCard species={species} />
          </div>
        ) : (
          <AuthGate
            title="Detalles anatómicos"
            description="Inicia sesión para explorar estructuras clave, sistemas orgánicos y el quiz interactivo."
          >
            <div className="species-detail-grid">
              <StructureList
                layerSlug={layerSlug}
                layerTitle={layerTitle}
                layerIntro={layerIntro}
                layerFact={layerFact}
                keyStructures={keyStructures.slice(0, 2)}
                systems={systems.slice(0, 2)}
              />
              <QuizCard species={species} />
            </div>
          </AuthGate>
        )
      )}

      {species.breeds?.length > 0 && (
        <section className="panel" style={{ padding: "1.25rem", display: "grid", gap: "1rem" }}>
          <div className="section-title"><h2>Razas</h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))", gap: ".75rem" }}>
            {species.breeds.map(b => (
              <div key={b.name} className="breed-card">
                <strong>{b.name}</strong>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {species.infoImg && (
        <InfoFicha img={species.infoImg} name={species.name} />
      )}

      <nav style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        {SPECIES_LIST.filter(sp => sp.slug !== slug && sp.isFeatured).map(sp => (
          <button key={sp.slug} className="secondary-btn btn" onClick={() => navigate(`/especie/${sp.slug}`)}>
            {sp.name} <ChevronRight size={16} />
          </button>
        ))}
      </nav>
    </div>
  );
}

function InfoFicha({ img, name }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="panel info-ficha">
      <button className="info-ficha__toggle" onClick={() => setOpen(o => !o)}>
        <span className="eyebrow"><FileText size={16} /> Ficha informativa</span>
        <span style={{ color: "var(--muted)", fontSize: ".82rem" }}>
          {open ? "Ocultar" : "Ver infografía completa"}
        </span>
      </button>

      {open && (
        <div className="info-ficha__body">
          <img
            src={img}
            alt={`Ficha informativa de ${name}`}
            className="info-ficha__img"
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
}
