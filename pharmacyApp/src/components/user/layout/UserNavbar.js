import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";

function UserNavbar(props) {
  const { auth, setAuth } = useAuth();
  function signOut() {
    setAuth({ user: false, access_token: "" });
  }
  const params = useParams();
  return (
    <nav className="">
      {auth.user && auth.username === params.user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <></>
      )}

      <a className="" href="/"></a>
    </nav>
  );
}

export default UserNavbar;
