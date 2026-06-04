import React, { useState, useEffect } from "react";
import { Brain, Target, Trophy, RotateCcw, Lock } from "lucide-react";
import { useAuth }    from "../../context/AuthContext.jsx";
import { quizApi }    from "../../api/quiz.api.js";
import { speciesApi } from "../../api/species.api.js";

function buildLocalQuestions(species) {
  return species?.quiz?.questions ?? [];
}

export function QuizCard({ species }) {
  const { user } = useAuth();

  const [apiQuiz,       setApiQuiz      ] = useState(null);
  const [questions,     setQuestions    ] = useState(buildLocalQuestions(species));
  const [qIndex,        setQIndex       ] = useState(0);
  const [answered,      setAnswered     ] = useState(false);
  const [lastAnswer,    setLastAnswer   ] = useState(null);
  const [correctOptId,  setCorrectOptId ] = useState(null);
  const [score,         setScore        ] = useState(0);
  const [finished,      setFinished     ] = useState(false);
  const [feedback,      setFeedback     ] = useState(null);
  const [submitting,    setSubmitting   ] = useState(false);

  useEffect(() => {
    if (!species?.slug) return;
    speciesApi
      .get(species.slug)
      .then(() => speciesApi.list())
      .catch(() => {});

    quizApi.get(species.slug)
      .then(data => {
        setApiQuiz(data.quiz);
        setQuestions(data.quiz.questions.map(q => ({
          text:    q.text,
          points:  q.points,
          options: q.options.map(o => ({ text: o.text, _id: o.id })),
          _id:     q.id,
        })));
      })
      .catch(() => {
        setQuestions(buildLocalQuestions(species));
      });
  }, [species?.slug]);

  function resetState() {
    setQIndex(0);
    setAnswered(false);
    setLastAnswer(null);
    setCorrectOptId(null);
    setScore(0);
    setFinished(false);
    setFeedback(null);
  }

  async function handleAnswer(idx) {
    if (answered || submitting) return;
    setLastAnswer(idx);

    if (user && apiQuiz) {
      setSubmitting(true);
      const q = questions[qIndex];
      const chosenOptionId = q.options[idx]._id;
      const answers = { [q._id]: chosenOptionId };
      try {
        const result = await quizApi.submit(apiQuiz.id, answers);
        const ans    = result.answers?.[0];
        const earned = ans?.points_earned ?? 0;
        setScore(s => s + earned);
        setFeedback(ans?.feedback ?? null);
        setCorrectOptId(ans?.correct_option_id ?? null);
        setAnswered(true);
      } catch {
        localAnswer(idx);
      } finally {
        setSubmitting(false);
      }
    } else {
      localAnswer(idx);
    }
  }

  function localAnswer(idx) {
    const q       = questions[qIndex];
    const correct = q.options[idx]?.correct ?? false;
    if (correct) setScore(s => s + (q.points ?? 20));
    setFeedback(null);
    setAnswered(true);
  }

  function handleNext() {
    if (qIndex + 1 >= questions.length) { setFinished(true); return; }
    setQIndex(i => i + 1);
    setAnswered(false);
    setLastAnswer(null);
    setFeedback(null);
  }

  if (!questions.length) return null;

  const q      = questions[qIndex];
  const total  = questions.length;
  const pct    = (qIndex / total) * 100;

  const correctIdx = q.options.findIndex(o => o.correct === true);
  const isCorrect  = answered && (
    feedback
      ? score > (qIndex * 20)
      : lastAnswer === correctIdx
  );

  if (finished) {
    return (
      <section className="quiz-card">
        <div className="section-title">
          <h2>Resultado final</h2>
          <span className="icon-badge"><Trophy size={18} /></span>
        </div>
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <p style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--olive-dark)" }}>
            {score} <span style={{ fontSize: "1rem", fontWeight: 600 }}>pts</span>
          </p>
          <p style={{ color: "var(--muted)", marginTop: ".5rem" }}>
            {score >= total * 80
              ? "Excelente dominio del tema."
              : score >= total * 40
              ? "Buen intento, sigue repasando."
              : "Revisa las capas anatomicas e intentalo de nuevo."}
          </p>
        </div>
        <button className="primary-btn btn" onClick={resetState}>
          <RotateCcw size={16} /> Intentar de nuevo
        </button>
      </section>
    );
  }

  return (
    <section className="quiz-card">
      <div className="section-title">
        <h2>Quiz rapido</h2>
        <span className="icon-badge"><Brain size={18} /></span>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".35rem", fontSize: ".8rem" }}>
          <span style={{ color: "var(--muted)" }}>Pregunta {qIndex + 1} de {total}</span>
          <span className="quiz-score"><Trophy size={14} /> {score} pts</span>
        </div>
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <p>{q.text}</p>

      <div className="quiz-options">
        {q.options.map((opt, idx) => {
          const isApiCorrect = correctOptId && opt._id === correctOptId;
          const isLocalCorrect = opt.correct === true;
          const isThisCorrect  = isApiCorrect || isLocalCorrect;
          const state = answered && isThisCorrect                    ? "correct"
                      : answered && idx === lastAnswer && !isThisCorrect ? "wrong"
                      : "";
          return (
            <button
              key={idx}
              type="button"
              className="quiz-option"
              data-state={state}
              disabled={answered || submitting}
              onClick={() => handleAnswer(idx)}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="quiz-feedback">
          {feedback ?? (isCorrect
            ? (q.successMsg ?? "Correcto.")
            : (q.failMsg    ?? "Revisa esta estructura."))}
        </div>
      )}

      {!user && (
        <p style={{ fontSize: ".78rem", color: "var(--muted)", display: "flex", gap: ".35rem", alignItems: "center" }}>
          <Lock size={13} /> Inicia sesion para guardar tu puntaje.
        </p>
      )}

      {answered && (
        <button className="primary-btn btn" onClick={handleNext}>
          <Target size={16} />
          {qIndex + 1 < total ? "Siguiente pregunta" : "Ver resultado"}
        </button>
      )}

      {!answered && (
        <button className="ghost-btn btn" onClick={resetState}>
          <RotateCcw size={14} /> Reiniciar
        </button>
      )}
    </section>
  );
}
