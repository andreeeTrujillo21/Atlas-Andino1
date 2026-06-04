/**
 * data/territories.js
 * Territorios del sur del Perú con sus ecosistemas y especies asociadas.
 * Usado en la sección "Explorar por territorio".
 */

export const TERRITORIES = [
  {
    slug: "puno",
    name: "Puno",
    description: "Altiplano y Lago Titicaca, hogar de especies únicas adaptadas al frío y los humedales.",
    ecosystems: ["Altiplano", "Humedales", "Lago Titicaca"],
    species: ["vicuna", "vizcacha", "zambullidor"],
  },
  {
    slug: "cusco",
    name: "Cusco",
    description: "Montañas y valles andinos con una gran diversidad de fauna y flora.",
    ecosystems: ["Andes", "Valles"],
    species: ["vicuna", "llama", "alpaca"],
  },
  {
    slug: "arequipa",
    name: "Arequipa",
    description: "Regiones altoandinas y desérticas que albergan especies resistentes y comunidades resilientes.",
    ecosystems: ["Altiplano", "Desierto"],
    species: ["vicuna", "vizcacha"],
  },
  {
    slug: "moquegua-tacna",
    name: "Moquegua y Tacna",
    description: "Valles, lomas costeras y zonas áridas con vida silvestre y comunidades ancestrales.",
    ecosystems: ["Valles", "Lomas costeras"],
    species: ["cuy", "vicuna"],
  },
];

/** Devuelve un territorio por su slug. */
export function getTerritory(slug) {
  return TERRITORIES.find(t => t.slug === slug) ?? null;
}
