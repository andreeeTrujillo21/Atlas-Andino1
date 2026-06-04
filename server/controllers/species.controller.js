import * as speciesService from "../services/species.service.js";

export async function listSpecies(req, res, next) {
  try {
    const species = await speciesService.getAllSpecies(req.query.category);
    res.json({ species });
  } catch (err) {
    next(err);
  }
}

export async function featuredSpecies(req, res, next) {
  try {
    const species = await speciesService.getFeaturedSpecies();
    res.json({ species });
  } catch (err) {
    next(err);
  }
}

export async function getSpecies(req, res, next) {
  try {
    const species = await speciesService.getSpeciesBySlug(req.params.slug);
    if (!species) return res.status(404).json({ error: "Especie no encontrada" });
    res.json({ species });
  } catch (err) {
    next(err);
  }
}

export async function getSpeciesLayers(req, res, next) {
  try {
    const species = await speciesService.getSpeciesBySlug(req.params.slug);
    if (!species) return res.status(404).json({ error: "Especie no encontrada" });

    const layers = await speciesService.getSpeciesLayers(species.id);
    res.json({ layers });
  } catch (err) {
    next(err);
  }
}

export async function getStructures(req, res, next) {
  try {
    const species = await speciesService.getSpeciesBySlug(req.params.slug);
    if (!species) return res.status(404).json({ error: "Especie no encontrada" });

    const { layer } = req.query;
    const structures = await speciesService.getStructures(species.id, layer, null);
    const keyStructures = await speciesService.getStructures(species.id, layer, true);
    const systems = layer === "organos"
      ? await speciesService.getOrganSystems(species.id, layer)
      : [];

    res.json({ structures, keyStructures, systems });
  } catch (err) {
    next(err);
  }
}

export async function listCategories(req, res, next) {
  try {
    const categories = await speciesService.getAllCategories();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
}
