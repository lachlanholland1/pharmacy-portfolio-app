import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import style from "./AddCompetencyStyle.css";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const formreducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };
export default function AddCompetencyForm(){
    const [formIsVisible, setFormIsVisible] = useState(true);
    const [isSuccess, setIsSuccess] = useState(-1);
    const [formData, setFormData] = useReducer(formreducer, {});
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [frameworkData, setFrameworkData] = useState([]);
    let navigate = useNavigate();
    const params = useParams();
    const { auth } = useAuth();

    const request = {
      framework: "standards",
    };

    useEffect(() => {
      fetch("/api/fetch-frameworks", {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFrameworkData(data.frameworks_data);
        });
    }, []);


    const {
        // handleSubmit,
        watch,
        control,
        formState: { errors }
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
        fetch("/api/createcompetency", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        })
        //view competencies not existent yet.
        .then(navigate("/view-competencies"))
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
            <h1 className={style.center}>Add Competency</h1>
            <form onSubmit={handleSubmit}>

            <label className={style.padding}>Competency Title</label>
            <br />
            <input
            className={style.myForm1}
            maxLength={65}
            type="text"
            id="title"
            placeholder="Enter the Competency title"
            name="title"
            required
            onChange={handleChange}
            />
            <br />
            <label className={style.padding}>Competency Description</label>
            <br />
            <input
            className={style.myForm1}
            maxLength={65}
            type="text"
            id="description"
            placeholder="Enter the competencies description"
            name="description"
            required
            onChange={handleChange}
            />
            <br/>
            <div className={style.center}>
            <label>Standard</label>
            <br />
            <select required id="standards_id" name="standards_id" onChange={handleChange}  className={style.classic}>
              <option value=""></option>
              {frameworkData.length ? (
                  frameworkData.map((data) => (
                    <option value={data.idstandards}>{data.title} ({data.description.substring(0, 60)} {data.description.length > 60 ? ("...") :("") } )</option>
                  ))
                ) : (
                  <option value=""></option>
                )}
            </select>
            <br/>
            <br/>
            <label>Status</label>
            <br />
            <select
              className={style.classic}
                required
                id="status"
                name="status"
                onChange={handleChange}>
                    <option value=""></option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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
        </div>
    )
}
