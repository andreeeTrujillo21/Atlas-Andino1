import { api } from "./client.js";

export const progressApi = {
  get:    ()      => api.get("/progress"),
  update: (data)  => api.post("/progress", data),
};
