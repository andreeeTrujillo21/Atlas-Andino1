import { useState, useEffect } from "react";
import { speciesApi } from "../api/species.api.js";
import { getSpecies as getStaticSpecies } from "../data/species/index.js";

export function useSpecies(slug) {
  const staticSpecies = getStaticSpecies(slug) ?? null;

  const [species, setSpecies] = useState(staticSpecies);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    speciesApi
      .get(slug)
      .then(data => {
        const sp  = data.species;
        const st  = getStaticSpecies(slug);
        setSpecies({
          ...sp,
          layers:   st?.layers   ?? [],
          quiz:     st?.quiz     ?? null,
          viewer:   st?.viewer   ?? { scale: 2, camera: [0,1.35,5], rotationY: 0 },
          didYouKnow: sp.did_you_know ?? [],
          focus:      sp.focus        ?? [],
          breeds:     sp.breeds       ?? [],
        });
      })
      .catch(err => {
        setError(err);
        setSpecies(staticSpecies);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return { species, loading, error };
}
