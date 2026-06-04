import * as progressService from "../services/progress.service.js";
import * as speciesService  from "../services/species.service.js";
import { queryOne }         from "../db/pool.js";

export async function getMyProgress(req, res, next) {
  try {
    const progress = await progressService.getUserProgress(req.user.id);
    res.json({ progress });
  } catch (err) {
    next(err);
  }
}

export async function updateProgress(req, res, next) {
  try {
    const { speciesSlug, layerSlug, completionPct } = req.body;

    const species = await speciesService.getSpeciesBySlug(speciesSlug);
    if (!species) return res.status(404).json({ error: "Especie no encontrada" });

    let layerId = null;
    if (layerSlug) {
      const layer = await queryOne(
        "SELECT id FROM anatomical_layers WHERE slug = $1",
        [layerSlug]
      );
      layerId = layer?.id ?? null;
    }

    const progress = await progressService.upsertProgress(
      req.user.id,
      species.id,
      layerId,
      completionPct ?? 0
    );
    res.json({ progress });
  } catch (err) {
    next(err);
  }
}
