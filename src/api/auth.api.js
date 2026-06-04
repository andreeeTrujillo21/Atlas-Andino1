import { api } from "./client.js";

export const authApi = {
  register:       (data) => api.post("/auth/register",        data),
  login:          (data) => api.post("/auth/login",           data),
  logout:         ()     => api.post("/auth/logout"),
  me:             ()     => api.get("/auth/me"),
  googleAuth:     (data) => api.post("/auth/google",          data),
  googleComplete: (data) => api.post("/auth/google/complete", data),
};
