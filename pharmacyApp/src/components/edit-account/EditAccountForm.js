import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function EditAccountForm({ userData }) {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const [date, setDate] = useState(new Date());
  const [userChanged, setUserChanged] = useState(false);

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (event) => {
    setUserChanged(true);
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const request = {
      edit_account: formData,
      access_token: auth.access_token,
      user_id: auth.user_id,
    };
    if (!userChanged) return;
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/edit-account", {
      method: "POST",
      body: JSON.stringify(request),
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
      <h1>{auth.username}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          name="private-account"
          onChange={handleChange}
          step="1"
        />
        <label>Private account</label>
        <br />
        <label>First Name</label>
        <br />
        <input
          maxLength={65}
          type="text"
          id="first_name"
          placeholder={userData.firstname}
          name="first_name"
          onChange={handleChange}
        />
        <br />
        <label>Last name</label>
        <br />
        <input
          maxLength={255}
          type="text"
          placeholder={userData.surname}
          id="last_name"
          name="last_name"
          onChange={handleChange}
        />
        <br />
        <label>Username</label>
        <br />
        <input
          maxLength={255}
          type="text"
          placeholder={userData.username}
          id="username"
          name="username"
          onChange={handleChange}
        />
        <br />
        <label>Bio</label>
        <br />
        <input
          maxLength={255}
          type="text"
          placeholder={userData.description}
          id="bio"
          name="bio"
          onChange={handleChange}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          maxLength={255}
          type="text"
          placeholder={userData.email}
          id="email"
          name="email"
          onChange={handleChange}
        />
        <br />
        <label>Mobile</label>
        <br />
        <input
          maxLength={255}
          type="text"
          placeholder={userData.mobile}
          id="mobile"
          name="mobile"
          onChange={handleChange}
        />
        <div>
          <button disables={!userChanged} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
