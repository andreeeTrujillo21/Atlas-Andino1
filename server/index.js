import express   from "express";
import cors       from "cors";
import cookieParser from "cookie-parser";
import path       from "path";
import { fileURLToPath } from "url";
import { env }    from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes     from "./routes/auth.routes.js";
import speciesRoutes  from "./routes/species.routes.js";
import quizRoutes     from "./routes/quiz.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import teacherRoutes  from "./routes/teacher.routes.js";
import adminRoutes    from "./routes/admin.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST      = path.join(__dirname, "../dist");

const app = express();

app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",     authRoutes);
app.use("/api/species",  speciesRoutes);
app.use("/api/quizzes",  quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/teacher",  teacherRoutes);
app.use("/api/admin",    adminRoutes);
app.get("/api/health",   (req, res) => res.json({ ok: true }));

if (env.nodeEnv === "production") {
  app.use(express.static(DIST));
  app.get("*", (req, res) => res.sendFile(path.join(DIST, "index.html")));
}

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Atlas Andino API → http://127.0.0.1:${env.port}`);
});
