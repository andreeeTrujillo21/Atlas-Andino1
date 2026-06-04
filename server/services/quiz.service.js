import { query, queryOne } from "../db/pool.js";

export async function getQuizBySpeciesSlug(slug) {
  const quiz = await queryOne(
    `SELECT q.* FROM quizzes q
     JOIN species s ON s.id = q.species_id
     WHERE s.slug = $1`,
    [slug]
  );
  if (!quiz) return null;

  const questions = await query(
    `SELECT id, position, text, success_msg, fail_msg, points
     FROM questions WHERE quiz_id = $1 ORDER BY position`,
    [quiz.id]
  );

  for (const q of questions) {
    q.options = await query(
      `SELECT id, position, text FROM question_options
       WHERE question_id = $1 ORDER BY position`,
      [q.id]
    );
  }

  return { ...quiz, questions };
}

export async function submitAttempt(userId, quizId, answers) {
  const questions = await query(
    `SELECT q.id, q.points, qo.id AS correct_option_id
     FROM questions q
     JOIN question_options qo ON qo.question_id = q.id AND qo.is_correct = true
     WHERE q.quiz_id = $1 ORDER BY q.position`,
    [quizId]
  );

  const maxScore = questions.reduce((s, q) => s + q.points, 0);
  let score = 0;

  const answerResults = questions.map(q => {
    const chosen    = answers[q.id];
    const isCorrect = chosen === q.correct_option_id;
    const earned    = isCorrect ? q.points : 0;
    score += earned;
    return { question_id: q.id, option_id: chosen, is_correct: isCorrect, points_earned: earned };
  });

  const attempt = await queryOne(
    `INSERT INTO quiz_attempts (user_id, quiz_id, score, max_score, finished_at)
     VALUES ($1, $2, $3, $4, now())
     RETURNING id, score, max_score`,
    [userId, quizId, score, maxScore]
  );

  for (const a of answerResults) {
    if (!a.option_id) continue;
    await query(
      `INSERT INTO attempt_answers (attempt_id, question_id, option_id, is_correct, points_earned)
       VALUES ($1, $2, $3, $4, $5)`,
      [attempt.id, a.question_id, a.option_id, a.is_correct, a.points_earned]
    );
  }

  const feedbackRows = await query(
    `SELECT q.id, q.success_msg, q.fail_msg FROM questions q WHERE q.quiz_id = $1`,
    [quizId]
  );
  const feedbackMap = Object.fromEntries(feedbackRows.map(f => [f.id, f]));

  const correctMap = Object.fromEntries(
    questions.map(q => [q.id, q.correct_option_id])
  );

  return {
    attemptId: attempt.id,
    score,
    maxScore,
    answers: answerResults.map(a => ({
      ...a,
      correct_option_id: correctMap[a.question_id],
      feedback: a.is_correct
        ? feedbackMap[a.question_id]?.success_msg
        : feedbackMap[a.question_id]?.fail_msg,
    })),
  };
}
