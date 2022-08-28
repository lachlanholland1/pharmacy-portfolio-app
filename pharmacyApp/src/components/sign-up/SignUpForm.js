import React, { useState, useReducer } from "react";
import SignUp from "./SignUpStyle.css";
import { Link } from "react-router-dom";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const SignUpForm = () => {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
    console.log(formData);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      setLoading(false);
      if (!response.ok) {
        setFormIsVisible(true);
        setIsSuccess(0);
      } else {
        setFormIsVisible(false);
        setIsSuccess(1);
      }
    });
  }

  return (
    <div>
      <div className={SignUp.container}>
        <div className={SignUp.sign}>
          <h1 className={SignUp.center}>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <label className={SignUp.padding}>Username</label>
            <br />
            <input
              className={SignUp.myForm}
              type="text"
              id="username"
              placeholder="Enter a username"
              name="username"
              required
              onChange={handleChange}
            />
            <br />
            <label className={SignUp.padding}>First name</label>
            <br />
            <input
              className={SignUp.myForm}
              type="text"
              id="first_name"
              placeholder="Enter your first name"
              name="first_name"
              required
              onChange={handleChange}
            />
            <br />
            <label className={SignUp.padding}>Last name</label>
            <br />
            <input
              className={SignUp.myForm}
              type="text"
              id="last_name"
              placeholder="Enter your last name"
              name="last_name"
              required
              onChange={handleChange}
            />
            <br />
            <label className={SignUp.padding}>Email</label>
            <br />
            <input
              className={SignUp.myForm}
              type="text"
              id="email"
              placeholder="Enter your email"
              name="email"
              required
              onChange={handleChange}
            />
            <br />
            <label className={SignUp.padding}>Password</label>
            <br />
            <input
              className={SignUp.myForm}
              type="text"
              id="password"
              placeholder="Enter a password"
              name="password"
              required
              onChange={handleChange}
            />
            <br />
            <label className={SignUp.padding}>Confirm password</label>
            <br />
            <input
              className={SignUp.myForm}
              type="text"
              id="confirm_password"
              placeholder="Confirm your password"
              name="confirm_password"
              required
              onChange={handleChange}
            />
            <br />
            {/* <div className={SignUp.myCheck}>
            <label>Admin</label>
            <input class="myCheck" type="checkbox" name="admin" onChange={handleChange} step="1" />
            </div> */}
            <div className={SignUp.center}>
              <button className={SignUp.myButton} type="submit">
                Sign up
              </button>
            </div>
          </form>
          <br />
          <div className={SignUp.center}>
            <Link to="/login">
              <button className={SignUp.myButton}>Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
