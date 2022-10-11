import React, { useEffect, useState, useReducer } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SignUp from "../sign-up/SignUp";
import SignInStyle from "./SignInStyle.css";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function SignInForm(props) {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useReducer(formreducer, {});
  const [flagged, setFlagged] = useState(false);
  let navigate = useNavigate();

  function reqLogin(loginReq) {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginReq),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          setFlagged(true);
          return Promise.reject();
        }
        return response.json();
      })
      .then((data) => {
        setAuth({
          user: true,
          user_id: data.user_id,
          username: data.username,
          admin: data.admin,
        });
        if (!data.admin) {
          navigate("/" + data.username);
        } else {
          navigate("/");
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
    <div className={SignInStyle.page}>
      <div className={SignInStyle.overlap_container}>
        <div className={SignInStyle.sign_container}>
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
              {flagged === true ? (
                <p>You have entered an invalid username or password</p>
              ) : (
                <></>
              )}
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
    </div>
  );
}

export default SignInForm;
