import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import {
  getDashboard,
  getStudentProgress,
  getModules,
  createModule,
  createRoom,
} from "../controllers/teacher.controller.js";

const router = Router();
const guard  = [authenticate, requireRole("teacher", "admin", "superadmin")];

router.get("/dashboard",  ...guard, getDashboard);
router.get("/students",   ...guard, getStudentProgress);
router.get("/modules",    ...guard, getModules);
router.post("/modules",   ...guard, createModule);
router.post("/rooms",     ...guard, createRoom);

export default router;
