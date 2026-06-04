import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
  register,
  login,
  googleAuth,
  googleComplete,
  me,
  logout,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register",         register);
router.post("/login",            login);
router.post("/logout",           logout);
router.get("/me",                authenticate, me);
router.post("/google",           googleAuth);
router.post("/google/complete",  googleComplete);

export default router;
