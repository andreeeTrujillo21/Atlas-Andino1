import { api } from "./client.js";

export const quizApi = {
  get:    (slug)              => api.get(`/quizzes/${slug}`),
  submit: (quizId, answers)   => api.post(`/quizzes/${quizId}/attempts`, { answers }),
};
