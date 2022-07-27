import React, { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

export function Logout(props) {
  const { auth, setAuth } = useAuth();
  let navigate = useNavigate();
  fetch("/api/logout", {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${auth.access_token}`,
    },
  }).then(() => navigate("/login"));
  setAuth({});
}
