import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Filter } from "lucide-react";
import { useSpeciesList } from "../hooks/useSpeciesList.js";

const CATEGORIES = [
  { slug: "",           label: "Todas"           },
  { slug: "domestico",  label: "Domésticos"      },
  { slug: "silvestre",  label: "Fauna silvestre" },
  { slug: "produccion", label: "Producción"      },
  { slug: "acuatico",   label: "Acuáticos"       },
];

export function CatalogPage() {
  const navigate = useNavigate();
  const [cat, setCat] = useState("");
  const { species, loading } = useSpeciesList(cat || undefined);

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div style={{ textAlign: "center" }}>
        <p className="eyebrow"><Filter size={17} /> Catalogo</p>
        <h1 className="title" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: ".75rem" }}>
          Especies del <span>sur del Peru</span>
        </h1>
        <p className="subtitle">
          Explora la anatomia de la fauna andina a traves de modelos 3D interactivos.
        </p>
      </div>

      <div style={{ display: "flex", gap: ".65rem", flexWrap: "wrap", justifyContent: "center" }}>
        {CATEGORIES.map(c => (
          <button
            key={c.slug}
            className={cat === c.slug ? "primary-btn btn" : "secondary-btn btn"}
            onClick={() => setCat(c.slug)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "var(--muted)" }}>
          Cargando especies...
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(16rem,100%), 1fr))",
          gap: "1.25rem",
        }}>
          {species.map(sp => (
            <article key={sp.slug ?? sp.id} className="panel" style={{ padding: "1.25rem", display: "grid", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "1.35rem", marginBottom: ".2rem" }}>
                    {sp.name}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: ".85rem", fontStyle: "italic" }}>
                    {sp.scientific_name ?? sp.scientific}
                  </p>
                </div>
                <span
                  className={`uicn-badge ${(sp.iucn_status ?? sp.iucnStatus ?? "LC").toLowerCase()}`}
                  title="Estado de conservación UICN"
                >
                  {sp.iucn_status ?? sp.iucnStatus ?? "LC"}
                </span>
              </div>

              <p style={{ color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.5 }}>{sp.intro}</p>

              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: ".75rem", color: "var(--olive-dark)", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06rem" }}>
                  {sp.origin}
                </span>
                <span style={{ color: "var(--line)" }}>·</span>
                <span style={{ fontSize: ".75rem", color: "var(--muted)" }}>{sp.diet}</span>
              </div>

              <button className="primary-btn btn" onClick={() => navigate(`/especie/${sp.slug}`)}>
                <ArrowRight size={17} /> Ver anatomia
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
