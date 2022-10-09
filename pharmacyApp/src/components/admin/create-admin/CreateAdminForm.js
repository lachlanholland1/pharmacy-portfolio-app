import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import DatePicker from "react-multi-date-picker";
import style from "./style.css";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function CreateAdminForm() {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState(null);

  const request = {
    table: "administrators",
  };
  
  useEffect(() => {
    const adminRequest = { users_id: auth.users_id };
    fetch("/api/checkadmins", {
      method: "POST",
      body: JSON.stringify(adminRequest),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((adminDetails) => {
        if (adminDetails.length > 0) {
          setAdmins(true);
        } else {
          setAdmins(false);
        }
      });

    fetch("/api/fetch-users", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.users_data);
      });
  }, []);

  const [date, setDate] = useState(new Date());
  const {
    // handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/createadmin", {
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
    navigate("/view-admins");
  }

  if (admins == false) {
    console.log("Not authorised.");
    return (
      <div>
        <label>You are unauthorised to access this page.</label>
        <br />
      </div>
    );
  }
  return (
    <div className={style.container}>
      <div className={style.sign}>
      <h1 className={style.center}>Add Administrator</h1>
      <form onSubmit={handleSubmit}>
        {/* add a bit about onSubmit?? */}
        <div className={style.center}>
        <label>User</label>
        <br />
        <select required id="user_id" name="user_id" onChange={handleChange} className={style.classic}>
          <option value=""></option>
          {userData.length ? (
              userData.map((user) => (
                <option value={user.user_id}>{user.username} ({user.email})</option>
              ))
            ) : (
              <option value=""></option>
            )}
        </select> 
        <br />
        <br />
        <label>Privileges</label>
        <br />
        <select

          required
          id="privileges"
          name="privileges"
          onChange={handleChange}
          className={style.classic}>
          <option value=""></option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        </div>
        <br />
        <div className={style.center}>
          <button type="submit" className={style.myButton}>
            Submit
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
