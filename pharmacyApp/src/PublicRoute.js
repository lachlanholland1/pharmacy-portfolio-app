import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const PublicRoute = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div>....loading please wait</div>;

  if (auth?.user) {
    if (auth.admin == true) {
      return <Navigate to={"/"} replace />;
    } else {
      return (
        <Navigate to={"/" + auth.username} state={{ from: location }} replace />
      );
    }
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
