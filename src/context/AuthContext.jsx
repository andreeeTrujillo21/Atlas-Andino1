import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authApi } from "../api/auth.api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser   ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.me()
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login({ email, password });
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (email, password, fullName, role) => {
    const data = await authApi.register({ email, password, fullName, role });
    setUser(data.user);
    return data.user;
  }, []);

  // Retorna { user } si login directo, o { needsPassword, tempToken, user } si es usuario nuevo
  const googleAuth = useCallback(async (credential) => {
    const data = await authApi.googleAuth({ credential });
    if (data.needsPassword) {
      return data;
    }
    setUser(data.user);
    return data;
  }, []);

  const googleComplete = useCallback(async (tempToken, password) => {
    const data = await authApi.googleComplete({ tempToken, password });
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleAuth, googleComplete, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
