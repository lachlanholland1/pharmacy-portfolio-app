import React, { useState, useReducer } from "react";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const SignUp = () => {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setFormData({ name: event.target.name, value: event.target.value });
  };

  function handleSubmit(e) {
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
        <input
          type="text"
          id="first_name"
          placeholder="Enter your first name"
          name="first_name"
          required
          onChange={handleChange}
        />
        <div>
          <button type="submit" className={" button-primary"}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
