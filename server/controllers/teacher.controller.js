import * as teacherService from "../services/teacher.service.js";

export async function getDashboard(req, res, next) {
  try {
    const data = await teacherService.getDashboard(req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getStudentProgress(req, res, next) {
  try {
    const students = await teacherService.getStudentProgress(req.user.id);
    res.json({ students });
  } catch (err) {
    next(err);
  }
}

export async function getModules(req, res, next) {
  try {
    const modules = await teacherService.getModules(req.user.id);
    res.json({ modules });
  } catch (err) {
    next(err);
  }
}

export async function createModule(req, res, next) {
  try {
    const { title, description, level, speciesSlugs } = req.body;
    if (!title || !level) return res.status(400).json({ error: "Título y nivel requeridos" });

    const mod = await teacherService.createModule(req.user.id, {
      title, description, level,
      speciesSlugs: speciesSlugs ?? [],
    });
    res.status(201).json({ module: mod });
  } catch (err) {
    next(err);
  }
}

export async function createRoom(req, res, next) {
  try {
    const { quizId, title } = req.body;
    const room = await teacherService.createRoom(req.user.id, quizId, title);
    res.status(201).json({ room });
  } catch (err) {
    next(err);
  }
}
