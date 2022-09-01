import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import style from "./EditAccountStyle.css";

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
    <div className={style.container}>
    <div className={style.sign}>
      <form onSubmit={handleSubmit}>
        <label className={style.padding}>First Name</label>
        <br />
        <input
          className={style.myForm}
          maxLength={65}
          type="text"
          id="first_name"
          placeholder={userData.firstname}
          name="first_name"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Last name</label>
        <br />
        <input
          className={style.myForm}
          maxLength={255}
          type="text"
          placeholder={userData.surname}
          id="last_name"
          name="last_name"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Username</label>
        <br />
        <input
          className={style.myForm}
          maxLength={255}
          type="text"
          placeholder={userData.username}
          id="username"
          name="username"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Bio</label>
        <br />
        <input
          className={style.myForm}
          maxLength={255}
          type="text"
          placeholder={userData.description}
          id="bio"
          name="bio"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Email</label>
        <br />
        <input
          className={style.myForm}
          maxLength={255}
          type="text"
          placeholder={userData.email}
          id="email"
          name="email"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Mobile</label>
        <br />
        <input
          className={style.myForm}
          maxLength={255}
          type="text"
          placeholder={userData.mobile}
          id="mobile"
          name="mobile"
          onChange={handleChange}
        />
        <br />
        <div className={style.center}>
        <input
          type="checkbox"
          name="private-account"
          onChange={handleChange}
          step="1"
        />
        <label className={style.checkboxPadding}>Private account</label>
        <br />
        </div>
        <div className={style.center}>
          <button className={style.myButton} disabled={!userChanged} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}
