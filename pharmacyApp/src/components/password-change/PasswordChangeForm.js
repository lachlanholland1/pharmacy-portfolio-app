import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import style from "./style.css";

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
  const [flagged, setFlagged] = useState(false);
  const navigate = useNavigate();

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
 

  const handleChange = (event) => {
    setPasswordChanged(true);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    if (event.target.name === "new_password") {
      if (formData.confirm_password != event.target.value) {
        setFlagged(true);
        setPasswordChanged(false);
      } else {
        setFlagged(false);
      }
    }
    if (event.target.name === "confirm_password") {
      if (formData.new_password != event.target.value) {
        setFlagged(true);
        setPasswordChanged(false);
      } else {
        setFlagged(false);
      }
    }
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
    navigate("/" + auth.username);
  }
  return (
    <div className={style.container}>
      <div className={style.sign}>
        <h1 className={style.center}>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <label className={style.padding}>Old Password</label>
          <br />
          <input
            className={style.myForm}
            maxLength={65}
            type="password"
            id="old_password"
            name="old_password"
            onChange={handleChange}
            required
          />
          <br />
          <label className={style.padding}>New Password</label>
          <br />
          <input
            className={style.myForm}
            maxLength={255}
            type="password"
            id="new_password"
            name="new_password"
            onChange={handleChange}
            required
          />
          <br />
          <label className={style.padding}>Confirm New Password</label>
          <br />
          <input
            className={style.myForm}
            maxLength={255}
            type="password"
            id="confirm_password"
            name="confirm_password"
            onChange={handleChange}
            required
          />
          <br />
          {flagged === true ? <p>Passwords do not match</p> : <></>}
          <br />
          <div className={style.center}>
            <button
              className={style.myButton}
              disabled={!passwordChanged}
              type="submit"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
