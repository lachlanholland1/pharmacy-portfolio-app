import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const PrivateAdminRoute = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div>....loading please wait</div>;

  if (auth.user && auth.admin == 1) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateAdminRoute;
