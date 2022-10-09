import React, { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

export function Logout(props) {
  const { auth, setAuth } = useAuth();
  return fetch("/api/logout", {
    method: "DELETE",
  }).then(() => {
    setAuth({ user: false, access_token: "" });
  });
}
