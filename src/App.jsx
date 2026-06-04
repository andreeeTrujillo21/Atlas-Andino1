import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider }    from "./context/AuthContext.jsx";
import { ErrorBoundary }   from "./components/common/ErrorBoundary.jsx";
import { Topbar }          from "./components/layout/Topbar.jsx";
import { BottomNav }       from "./components/layout/BottomNav.jsx";
import { ProtectedRoute }  from "./components/layout/ProtectedRoute.jsx";
import { useScrollTop }    from "./hooks/useScrollTop.js";
import { HomePage }             from "./pages/HomePage.jsx";
import { CatalogPage }          from "./pages/CatalogPage.jsx";
import { SpeciesPage }          from "./pages/SpeciesPage.jsx";
import { TerritoryPage }        from "./pages/TerritoryPage.jsx";
import { DashboardPage }        from "./pages/DashboardPage.jsx";
import { LoginPage }            from "./pages/LoginPage.jsx";
import { CompleteProfilePage }  from "./pages/CompleteProfilePage.jsx";
import { AboutPage }            from "./pages/AboutPage.jsx";
import { NotFoundPage }         from "./pages/NotFoundPage.jsx";

function AppInner() {
  useScrollTop();
  return (
    <div className="app-shell">
      <Topbar />
      <main className="page-content page-enter">
        <Routes>
          <Route path="/"                     element={<HomePage />} />
          <Route path="/catalogo"             element={<CatalogPage />} />
          <Route path="/especie/:slug"        element={<SpeciesPage />} />
          <Route path="/especie/:slug/:layer" element={<SpeciesPage />} />
          <Route path="/territorio"           element={<TerritoryPage />} />
          <Route path="/territorio/:id"       element={<TerritoryPage />} />
          <Route path="/nosotros"             element={<AboutPage />} />
          <Route path="/login"                element={<LoginPage />} />
          <Route path="/completar-registro"   element={<CompleteProfilePage />} />

          <Route
            path="/panel"
            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
          />
          <Route path="/estudiante"    element={<Navigate to="/panel" replace />} />
          <Route path="/estudiante/:s" element={<Navigate to="/panel" replace />} />
          <Route path="/docente"       element={<Navigate to="/panel" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <AppInner />
      </ErrorBoundary>
    </AuthProvider>
  );
}
