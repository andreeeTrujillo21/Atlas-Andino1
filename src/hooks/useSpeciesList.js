import { useState, useEffect } from "react";
import { speciesApi } from "../api/species.api.js";
import { SPECIES_LIST, getByCategory } from "../data/species/index.js";

export function useSpeciesList(categorySlug) {
  const staticData = categorySlug ? getByCategory(categorySlug) : SPECIES_LIST;

  const [species, setSpecies] = useState(staticData);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState(null);

  useEffect(() => {
    setLoading(true);
    speciesApi
      .list(categorySlug)
      .then(data => setSpecies(data.species))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [categorySlug]);

  return { species, loading, error };
}
