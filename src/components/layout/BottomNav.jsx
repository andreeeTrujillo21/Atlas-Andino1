import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { House, Layers, Map, User, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export function BottomNav() {
  const { user } = useAuth();
  const navigate  = useNavigate();

  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      <NavLink to="/" end className={({ isActive }) => `bottom-nav__item${isActive ? " active" : ""}`}>
        <House size={22} />
        <span>Inicio</span>
      </NavLink>

      <NavLink to="/catalogo" className={({ isActive }) => `bottom-nav__item${isActive ? " active" : ""}`}>
        <Layers size={22} />
        <span>Especies</span>
      </NavLink>

      <NavLink to="/territorio" className={({ isActive }) => `bottom-nav__item${isActive ? " active" : ""}`}>
        <Map size={22} />
        <span>Mapa</span>
      </NavLink>

      {user ? (
        <NavLink to="/panel" className={({ isActive }) => `bottom-nav__item${isActive ? " active" : ""}`}>
          {user.avatarUrl
            ? <img src={user.avatarUrl} alt="" className="bottom-nav__avatar" />
            : <User size={22} />}
          <span>Mi panel</span>
        </NavLink>
      ) : (
        <button className="bottom-nav__item" onClick={() => navigate("/login")}>
          <Lock size={22} />
          <span>Entrar</span>
        </button>
      )}
    </nav>
  );
}
