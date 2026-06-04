import { query, queryOne } from "../db/pool.js";

export async function getAllSpecies(categorySlug) {
  const base = `
    SELECT s.*, c.slug AS category_slug, c.name AS category_name
    FROM species s
    LEFT JOIN categories c ON c.id = s.category_id
  `;
  if (categorySlug) {
    return query(`${base} WHERE c.slug = $1 ORDER BY s.position`, [categorySlug]);
  }
  return query(`${base} ORDER BY s.position`);
}

export async function getFeaturedSpecies() {
  return query(`
    SELECT s.*, c.slug AS category_slug, c.name AS category_name
    FROM species s
    LEFT JOIN categories c ON c.id = s.category_id
    WHERE s.is_featured = true
    ORDER BY s.position
  `);
}

export async function getSpeciesBySlug(slug) {
  const species = await queryOne(
    `SELECT s.*, c.slug AS category_slug, c.name AS category_name
     FROM species s
     LEFT JOIN categories c ON c.id = s.category_id
     WHERE s.slug = $1`,
    [slug]
  );
  if (!species) return null;

  const [focus, didYouKnow, breeds] = await Promise.all([
    query("SELECT text FROM species_focus WHERE species_id=$1 ORDER BY position", [species.id]),
    query("SELECT text FROM did_you_know WHERE species_id=$1 ORDER BY position", [species.id]),
    query("SELECT name, description FROM breeds WHERE species_id=$1", [species.id]),
  ]);

  return {
    ...species,
    focus:      focus.map(r => r.text),
    didYouKnow: didYouKnow.map(r => r.text),
    breeds,
  };
}

export async function getSpeciesLayers(speciesId) {
  return query(
    `SELECT sl.*, al.slug AS layer_slug, al.name AS layer_name, al.icon, al.position AS layer_position
     FROM species_layers sl
     JOIN anatomical_layers al ON al.id = sl.layer_id
     WHERE sl.species_id = $1
     ORDER BY al.position`,
    [speciesId]
  );
}

export async function getStructures(speciesId, layerSlug, keyOnly = false) {
  return query(
    `SELECT st.* FROM structures st
     JOIN anatomical_layers al ON al.id = st.layer_id
     WHERE st.species_id = $1
       AND al.slug = $2
       AND ($3::boolean IS NULL OR st.is_key = $3)
     ORDER BY st.position`,
    [speciesId, layerSlug, keyOnly || null]
  );
}

export async function getOrganSystems(speciesId, layerSlug) {
  return query(
    `SELECT os.* FROM organ_systems os
     JOIN anatomical_layers al ON al.id = os.layer_id
     WHERE os.species_id = $1 AND al.slug = $2
     ORDER BY os.position`,
    [speciesId, layerSlug]
  );
}

export async function getAllCategories() {
  return query("SELECT * FROM categories ORDER BY name");
}
