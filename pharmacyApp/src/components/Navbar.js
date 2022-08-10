import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

function Navbar(props) {
  const { setAuth } = useAuth();
  function signOut() {
    setAuth({ user: false, access_token: "" });
  }
  return (
    <nav className="">
      <button onClick={signOut}>Sign out</button>
      <a className="" href="/"></a>
    </nav>
  );
}

export default Navbar;
