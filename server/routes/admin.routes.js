import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { requireRole }  from "../middleware/requireRole.js";
import { getStats, getUsers, updateRole, deleteUser } from "../controllers/admin.controller.js";

const router = Router();

router.use(authenticate, requireRole("admin", "superadmin"));

router.get("/stats",            getStats);
router.get("/users",            getUsers);
router.patch("/users/:id/role", updateRole);
router.delete("/users/:id",     deleteUser);

export default router;
