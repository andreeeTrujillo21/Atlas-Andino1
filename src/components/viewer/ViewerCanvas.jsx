import React, { useRef, useEffect, useState } from "react";
import { Viewer3D } from "../../viewer/Viewer3D.js";

/**
 * Componente React que monta el visor Three.js en un <canvas>.
 * Reutiliza la instancia Viewer3D mientras el componente permanezca montado.
 */
export function ViewerCanvas({ species, layerSlug }) {
  const canvasRef  = useRef(null);
  const viewerRef  = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState(false);

  // Crear el visor una vez al montar el canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const viewer = new Viewer3D(canvasRef.current);
    viewerRef.current = viewer;
    return () => {
      viewer.dispose();
      viewerRef.current = null;
    };
  }, []);

  // Cargar modelo cuando cambie la especie o la capa
  useEffect(() => {
    if (!viewerRef.current || !species) return;
    setLoading(true);
    setError(false);
    viewerRef.current
      .loadSpecies(species, layerSlug, () => setLoading(false))
      .catch(() => { setLoading(false); setError(true); });
  }, [species?.slug, layerSlug]);

  return (
    <div className="canvas-wrap">
      <canvas ref={canvasRef} id="model-canvas" aria-label={`Modelo 3D de ${species?.name}`} />

      {loading && !error && (
        <div className="model-loader">
          <span className="loader__dot" />
          Cargando modelo 3D
        </div>
      )}

      {error && (
        <div className="model-loader">
          No se pudo cargar el modelo 3D
        </div>
      )}

      {!loading && !error && <Callouts species={species} layerSlug={layerSlug} />}
    </div>
  );
}

function Callouts({ species, layerSlug }) {
  const layer = species?.layers?.find(l => l.slug === layerSlug) ?? species?.layers?.[0];
  if (!layer?.structures) return null;

  return (
    <div className="callouts">
      {layer.structures.map((s, i) => (
        <article
          key={s.title}
          className={`callout ${i % 2 === 0 ? "callout--left" : "callout--right"}`}
          data-slot={["one","two","three","four"][i]}
        >
          <h3>{s.title}</h3>
          <span>{s.description}</span>
        </article>
      ))}
    </div>
  );
}
