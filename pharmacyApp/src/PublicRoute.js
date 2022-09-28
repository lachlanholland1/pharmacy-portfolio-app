import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const PublicRoute = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div>....loading please wait</div>;

  return auth?.user ? (
    <Navigate to={"/" + auth.username} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
