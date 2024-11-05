import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoutes = ({ requiredRole }) => {
  const { user, isAdmin } = useAuth();

  // Verifica si el usuario está logeado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verifica si se requiere un rol específico (por ejemplo, administrador)
  if (requiredRole === "admin" && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si pasa todas las verificaciones, renderiza las rutas hijas
  return <Outlet />;
};

export default ProtectedRoutes;
