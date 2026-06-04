import { api } from "./client.js";

export const speciesApi = {
  list:       (category) => api.get(`/species${category ? `?category=${category}` : ""}`),
  featured:   ()         => api.get("/species/featured"),
  get:        (slug)     => api.get(`/species/${slug}`),
  layers:     (slug)     => api.get(`/species/${slug}/layers`),
  structures: (slug, layer) => api.get(`/species/${slug}/structures?layer=${layer}`),
  categories: ()         => api.get("/species/categories"),
};
