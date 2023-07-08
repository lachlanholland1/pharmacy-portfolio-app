import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import style from "./AddPerformancecriteriasStyle.css";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const formreducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };
export default function AddPerformancecriteriasForm(){
    const [formIsVisible, setFormIsVisible] = useState(true);
    const [isSuccess, setIsSuccess] = useState(-1);
    const [formData, setFormData] = useReducer(formreducer, {});
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const params = useParams();
    const { auth } = useAuth();

    const {
        // handleSubmit,
        watch,
        control,
        formState: { errors }
      } = useForm();
      

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
        fetch("/api/createperformancecriterias", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        })
        //view Performancecriterias not existent yet.
        .then(navigate("/view-performancecriterias"))
        .then((response) => {
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
            <h1 className={style.center}>Add Performance Criteria</h1>
            <form onSubmit={handleSubmit}>

            <label className={style.padding}>Performance Criteria Title</label>
            <br />
            <input
            className={style.myForm1}
            maxLength={65}
            type="text"
            id="title"
            placeholder="Enter the Performance criteria title"
            name="title"
            required
            onChange={handleChange}
            />
            <br />
            <label className={style.padding}>Performance Criteria Description</label>
            <br />
            <input
            className={style.myForm1}
            maxLength={65}
            type="text"
            id="description"
            placeholder="Enter the Performance criterias description"
            name="description"
            required
            onChange={handleChange}
            />
            <br/>
            <label className={style.padding}>Status</label>
            <br />
            <select
                className={style.myForm1}
                required
                id="status"
                name="status"
                onChange={handleChange}>
                    <option value=""></option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
            </select>
                <br />
                <br />
                <div className={style.center}>
                    <button type="submit" className={style.myButton}>
                        Submit
                    </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    )
}
