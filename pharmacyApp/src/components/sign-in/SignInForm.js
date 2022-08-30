import React, { useEffect, useState, useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SignUp from "../sign-up/SignUp";
import SignInStyle from "./SignInStyle.css";
import { Link } from "react-router-dom";

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
          localStorage.setItem("user_id", data.user_id);
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
    <div className={SignInStyle.container}>
      <div className={SignInStyle.sign}>
        <h1>Sign In</h1>
        <br />
        <form onSubmit={handleLogin}>
          <input
            className={SignInStyle.myForm}
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <br />
          <input
            className={SignInStyle.myForm}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {/* <br />
          <label>Admin</label>
          <input
            className={SignInStyle.myCheck}
            type="checkbox"
            name="admin"
            onChange={handleChange}
            step="1"
          /> */}
          <br />
          <button className={SignInStyle.myButton} type="submit">
            Sign In
          </button>
        </form>
        <br />
        <Link to="/sign-up">
          <button className={SignInStyle.myButton}>Sign up</button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default SignInForm;
