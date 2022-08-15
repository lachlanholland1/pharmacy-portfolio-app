import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
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
  }
  return (
    <div>
      <h1>Add Administrator</h1>
      <form onSubmit={handleSubmit}>
        {/* add a bit about onSubmit?? */}
        <label>User</label>
        <br />
        <select required id="user_id" name="user_id" onChange={handleChange}>
          <option value=""></option>
          <option value="1">1</option>
          <option value="3">3</option>
        </select>
        <br />
        <label>Privileges</label>
        <br />
        <select
          required
          id="privileges"
          name="privileges"
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br />

        <div>
          <button type="submit" className={" button-primary"}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
