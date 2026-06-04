import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Mail, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext.jsx";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register, googleAuth } = useAuth();

  const [mode,       setMode      ] = useState(searchParams.get("modo") === "registro" ? "register" : "login");
  const [form,       setForm      ] = useState({ email: "", password: "", fullName: "" });
  const [showPass,   setShowPass  ] = useState(false);
  const [error,      setError     ] = useState("");
  const [busy,       setBusy      ] = useState(false);

  useEffect(() => {
    setMode(searchParams.get("modo") === "registro" ? "register" : "login");
  }, [searchParams]);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Completa todos los campos.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        if (!form.fullName) { setError("Ingresa tu nombre completo."); setBusy(false); return; }
        await register(form.email, form.password, form.fullName);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleSuccess(credentialResponse) {
    setError("");
    setBusy(true);
    try {
      const result = await googleAuth(credentialResponse.credential);
      if (result.needsPassword) {
        sessionStorage.setItem("google_pending", JSON.stringify({
          tempToken: result.tempToken,
          user: result.user,
        }));
        navigate("/completar-registro");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function handleGoogleError() {
    setError("No se pudo iniciar sesión con Google. Intenta de nuevo.");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <button
          className="ghost-btn btn login-back-btn"
          onClick={() => navigate("/")}
          style={{ justifyContent: "flex-start", marginBottom: "-.5rem" }}
        >
          <ArrowLeft size={16} /> Volver al atlas
        </button>

        <div>
          <h1 className="login-title">
            <span>Atlas</span> Andino
          </h1>
          <p className="login-subtitle">
            {mode === "login"
              ? "Accede para ver estructuras internas, quizzes y tu progreso."
              : "Crea tu cuenta gratis para explorar el atlas completo."}
          </p>
        </div>

        {/* Botón Google */}
        <div className="login-google-wrap">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text={mode === "login" ? "signin_with" : "signup_with"}
            shape="rectangular"
            theme="outline"
            size="large"
            width="100%"
            locale="es"
          />
          <p className="login-google-note">
            {mode === "login"
              ? "¿Primera vez con Google? Se te pedirá crear una contraseña."
              : "Al registrarte con Google configurarás una contraseña en el siguiente paso."}
          </p>
        </div>

        <div className="login-divider">
          <span>o con correo electrónico</span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          {mode === "register" && (
            <div className="form-group">
              <label htmlFor="fullName">Nombre completo</label>
              <div className="input-icon-wrap">
                <User size={17} className="input-icon" />
                <input
                  id="fullName" name="fullName" type="text"
                  className="form-input form-input--icon"
                  placeholder="Tu nombre y apellido"
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-icon-wrap">
              <Mail size={17} className="input-icon" />
              <input
                id="email" name="email" type="email"
                className="form-input form-input--icon"
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-icon-wrap">
              <Lock size={17} className="input-icon" />
              <input
                id="password" name="password"
                type={showPass ? "text" : "password"}
                className="form-input form-input--icon form-input--icon-right"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
              <button
                type="button"
                className="input-icon-btn"
                onClick={() => setShowPass(v => !v)}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="form-error">{error}</p>
          )}

          <button type="submit" className="primary-btn btn" disabled={busy}>
            {busy ? "Cargando..." : mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </button>
        </form>

        <p className="login-switch-text">
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            className="ghost-btn btn login-switch-btn"
            onClick={() => { setMode(m => m === "login" ? "register" : "login"); setError(""); }}
          >
            {mode === "login" ? "Regístrate gratis" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
