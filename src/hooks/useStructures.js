import { useState, useEffect } from "react";
import { speciesApi } from "../api/species.api.js";
import { getSpecies as getStaticSpecies } from "../data/species/index.js";

export function useStructures(speciesSlug, layerSlug) {
  const needsApi = ["huesos", "organos"].includes(layerSlug);

  const [data,    setData   ] = useState(null);
  const [loading, setLoading] = useState(needsApi);

  useEffect(() => {
    if (!needsApi || !speciesSlug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    speciesApi
      .structures(speciesSlug, layerSlug)
      .then(res => {
        setData({
          keyStructures: res.keyStructures,
          systems:       res.systems,
        });
      })
      .catch(() => {
        const staticLayer = getStaticSpecies(speciesSlug)
          ?.layers?.find(l => l.slug === layerSlug);
        setData({
          keyStructures: staticLayer?.keyStructures ?? [],
          systems:       staticLayer?.systems       ?? [],
        });
      })
      .finally(() => setLoading(false));
  }, [speciesSlug, layerSlug]);

  return { data, loading };
}
