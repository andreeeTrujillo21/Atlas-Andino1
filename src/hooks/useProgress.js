import { useState, useEffect } from "react";
import { progressApi } from "../api/progress.api.js";

export function useProgress(user) {
  const [progress, setProgress] = useState([]);
  const [loading,  setLoading ] = useState(false);

  useEffect(() => {
    if (!user) { setProgress([]); return; }
    setLoading(true);
    progressApi
      .get()
      .then(data => setProgress(data.progress))
      .catch(() => setProgress([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  function getPct(speciesSlug) {
    const rows = progress.filter(p => p.species_slug === speciesSlug);
    if (!rows.length) return 0;
    const sum = rows.reduce((s, r) => s + r.completion_pct, 0);
    return Math.round(sum / rows.length);
  }

  async function recordVisit(speciesSlug, layerSlug) {
    if (!user) return;
    try {
      const updated = await progressApi.update({
        speciesSlug,
        layerSlug: layerSlug ?? null,
        completionPct: 25,
      });
      setProgress(prev => {
        const key = `${speciesSlug}-${layerSlug}`;
        const idx = prev.findIndex(p => `${p.species_slug}-${p.layer_slug}` === key);
        return idx >= 0
          ? prev.map((p, i) => i === idx ? updated.progress : p)
          : [...prev, updated.progress];
      });
    } catch {
      // sin conexion — no bloquear
    }
  }

  return { progress, loading, getPct, recordVisit };
}
