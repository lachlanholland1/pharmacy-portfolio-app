import React from "react";
import useAuth from "./hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import style from "./styles.css";

function SignOutButton(props) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  function Logout(props) {
    return fetch("/api/logout", {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${auth.access_token}`,
      },
    }).then(() => {
      navigate("/");
      setAuth({ user: false, access_token: "" });
    });
  }

  return (
    <button className={style.SignOutButton} onClick={Logout}>
      Sign Out
    </button>
  );
}

export default SignOutButton;
