import * as quizService from "../services/quiz.service.js";

export async function getQuiz(req, res, next) {
  try {
    const quiz = await quizService.getQuizBySpeciesSlug(req.params.slug);
    if (!quiz) return res.status(404).json({ error: "Quiz no encontrado" });
    res.json({ quiz });
  } catch (err) {
    next(err);
  }
}

export async function submitAttempt(req, res, next) {
  try {
    const { answers } = req.body;
    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ error: "Respuestas requeridas" });
    }

    const result = await quizService.submitAttempt(
      req.user.id,
      Number(req.params.quizId),
      answers
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
