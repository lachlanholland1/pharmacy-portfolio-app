import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const PrivateAdminRoute = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div>....loading please wait</div>;

  if (auth.user && auth.admin) {
    console.log("1" + auth.admin);
    return <Outlet />;
  } else {
    console.log("2" + auth.admin);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateAdminRoute;
