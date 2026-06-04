import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { getMyProgress, updateProgress } from "../controllers/progress.controller.js";

const router = Router();

router.get("/",  authenticate, getMyProgress);
router.post("/", authenticate, updateProgress);

export default router;
