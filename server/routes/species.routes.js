import { Router } from "express";
import {
  listSpecies,
  featuredSpecies,
  getSpecies,
  getSpeciesLayers,
  getStructures,
  listCategories,
} from "../controllers/species.controller.js";

const router = Router();

router.get("/",               listSpecies);
router.get("/featured",       featuredSpecies);
router.get("/categories",     listCategories);
router.get("/:slug",          getSpecies);
router.get("/:slug/layers",   getSpeciesLayers);
router.get("/:slug/structures", getStructures);

export default router;
