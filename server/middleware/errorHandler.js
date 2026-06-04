export function errorHandler(err, req, res, next) {
  const status = err.status ?? err.statusCode ?? 500;
  const message = err.message ?? "Error interno del servidor";

  if (process.env.NODE_ENV !== "production") {
    console.error(`[${req.method}] ${req.path} →`, err.message);
  }

  res.status(status).json({ error: message });
}
