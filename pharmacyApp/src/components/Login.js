import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SignUp from "./sign-up/SignUp";

function Login(props) {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  function reqLogin(loginReq) {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginReq),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          setAuth({ user: true, access_token: data.access_token });
          navigate("/");
        }
      });
  }

  function handleLogin(event) {
    event.preventDefault();
    let loginReq = { email: email, password: password };
    reqLogin(loginReq);
  }

  return (
    <div>
      <SignUp />
      <div>
        <form>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
          <br />
          <button className="btn btn-success w-100" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
