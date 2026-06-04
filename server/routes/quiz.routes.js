import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { getQuiz, submitAttempt } from "../controllers/quiz.controller.js";

const router = Router();

router.get("/:slug",              getQuiz);
router.post("/:quizId/attempts",  authenticate, submitAttempt);

export default router;
