import React, { useState, useReducer } from "react";

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
      <form onSubmit={handleSubmit}>
        <label>First name</label>
        <br />
        <input
          type="text"
          id="first_name"
          placeholder="Enter your first name"
          name="first_name"
          required
          onChange={handleChange}
        />
        <br />
        <label>Last name</label>
        <br />
        <input
          type="text"
          id="last_name"
          placeholder="Enter your last name"
          name="last_name"
          required
          onChange={handleChange}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          name="email"
          required
          onChange={handleChange}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="text"
          id="password"
          placeholder="Enter a password"
          name="password"
          required
          onChange={handleChange}
        />
        <br />
        <label>Confirm password</label>
        <br />
        <input
          type="text"
          id="confirm_password"
          placeholder="Confirm your password"
          name="confirm_password"
          required
          onChange={handleChange}
        />
        <br />
        <label>Admin</label>
        <input type="checkbox" name="admin" onChange={handleChange} step="1" />
        <div>
          <button type="submit" className={" button-primary"}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
