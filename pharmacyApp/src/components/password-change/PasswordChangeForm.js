import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function EditAccountForm() {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const [passwordChanged, setPasswordChanged] = useState(false);

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (event) => {
    setPasswordChanged(true);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const request = {
      form_data: formData,
      access_token: auth.access_token,
      user_id: auth.user_id,
    };
    if (!passwordChanged) return;
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    console.log(request);
    fetch("/api/accounts/password/change", {
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
      <form onSubmit={handleSubmit}>
        <label>Old Password</label>
        <br />
        <input
          maxLength={65}
          type="password"
          id="old_password"
          name="old_password"
          onChange={handleChange}
          required
        />
        <br />
        <label>New Password</label>
        <br />
        <input
          maxLength={255}
          type="password"
          id="new_password"
          name="new_password"
          onChange={handleChange}
          required
        />
        <br />
        <label>Confirm New Password</label>
        <br />
        <input
          maxLength={255}
          type="password"
          id="confirm_password"
          name="confirm_password"
          onChange={handleChange}
          required
        />
        <br />
        <div>
          <button disabled={!passwordChanged} type="submit">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
