import React, { useEffect, useState, useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SignUp from "../sign-up/SignUp";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function SignInForm(props) {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useReducer(formreducer, {});

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
          setAuth({
            user: true,
            user_id: data.user_id,
            access_token: data.access_token,
            username: data.username,
          });
          localStorage.setItem("userId", data.user_id) /////
          navigate("/" + data.username);
        }
      });
  }

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  function handleLogin(event) {
    event.preventDefault();
    reqLogin(formData);
  }

  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <br />
          <label>Admin</label>
          <input
            type="checkbox"
            name="admin"
            onChange={handleChange}
            step="1"
          />
          <br />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
