import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env.js";
import * as userService from "../services/user.service.js";

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.nodeEnv === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const googleClient = new OAuth2Client(env.googleClientId);

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpires }
  );
}

function formatUser(user) {
  return {
    id:           user.id,
    email:        user.email,
    fullName:     user.full_name,
    role:         user.role,
    avatarUrl:    user.avatar_url    ?? null,
    authProvider: user.auth_provider ?? "local",
  };
}

export async function register(req, res, next) {
  try {
    const { email, password, fullName, role } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const existing = await userService.findByEmail(email);
    if (existing) return res.status(409).json({ error: "El correo ya está registrado" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userService.createUser({ email, passwordHash, fullName, role });

    const token = signToken(user);
    res.cookie("token", token, COOKIE_OPTS);
    res.status(201).json({ user: formatUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Correo y contraseña requeridos" });
    }
    const user = await userService.findByEmail(email);
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    if (!user.password_hash) {
      return res.status(400).json({ error: "Esta cuenta usa Google. Inicia sesión con Google." });
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = signToken(user);
    res.cookie("token", token, COOKIE_OPTS);
    res.json({ user: formatUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function googleAuth(req, res, next) {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ error: "Token de Google requerido" });

    if (!env.googleClientId || env.googleClientId === "YOUR_GOOGLE_CLIENT_ID_HERE") {
      return res.status(503).json({ error: "Google OAuth no está configurado en el servidor" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken:  credential,
      audience: env.googleClientId,
    });
    const { sub: googleId, email, name: fullName, picture: avatarUrl } = ticket.getPayload();

    let user = await userService.findByGoogleId(googleId);

    if (!user) {
      const byEmail = await userService.findByEmail(email);
      if (byEmail) {
        user = await userService.syncGoogleProfile(byEmail.id, googleId, fullName, avatarUrl);
      }
    } else {
      user = await userService.syncGoogleProfile(user.id, googleId, fullName, avatarUrl);
    }

    if (user) {
      const token = signToken(user);
      res.cookie("token", token, COOKIE_OPTS);
      return res.json({ user: formatUser(user) });
    }

    const newUser = await userService.createGoogleUser({ email, fullName, googleId, avatarUrl });
    const tempToken = jwt.sign(
      { id: newUser.id, type: "google_pending" },
      env.jwtSecret,
      { expiresIn: "15m" }
    );
    return res.status(200).json({
      needsPassword: true,
      tempToken,
      user: formatUser(newUser),
    });
  } catch (err) {
    next(err);
  }
}

export async function googleComplete(req, res, next) {
  try {
    const { tempToken, password } = req.body;
    if (!tempToken || !password) {
      return res.status(400).json({ error: "Token y contraseña requeridos" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }
    let payload;
    try {
      payload = jwt.verify(tempToken, env.jwtSecret);
    } catch {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
    if (payload.type !== "google_pending") {
      return res.status(401).json({ error: "Token inválido" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userService.setPasswordHash(payload.id, passwordHash);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const fullUser = await userService.findById(user.id);
    const token = signToken(fullUser);
    res.cookie("token", token, COOKIE_OPTS);
    res.json({ user: formatUser(fullUser) });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await userService.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ user: formatUser(user) });
  } catch (err) {
    next(err);
  }
}

export function logout(req, res) {
  res.clearCookie("token");
  res.json({ ok: true });
}
