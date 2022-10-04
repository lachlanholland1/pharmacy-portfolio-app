import React, { useEffect, useState, useReducer, Alert } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import style from "./EditPerformancecriteriasStyle.css";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function EditPerformancecriteriasForm({ performancecriteriaData }) {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [userChanged, setUserChanged] = useState(false);

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (event) => {
    setUserChanged(true);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    setFormData({ name: "idperformancecriteria", value: performancecriteriaData.idperformancecriteria });
  };
  
  function handleSubmit(e) {
    if (!userChanged) return;
    // uploadFile(selectedFile);
    e.preventDefault();
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/editperformancecriterias", {
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
    navigate("/view-performancecriterias");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className={style.padding}>Edit Performance Criteria</label>
        <br />
        <label>Title</label>
        <br />
        <input
          className={style.myForm1}
          maxLength={65}
          type="text"
          id="title"
          placeholder={performancecriteriaData.title}
          // value={performancecriteriaData.title}
          name="title"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Description</label>
        <br />
        <input
          className={style.myForm1}
          type="text"
          placeholder={performancecriteriaData.description}
          id="description"
          name="description"
          onChange={handleChange}
        />
        <br />
        <label>Status</label>
        <br />
        <select
          className={style.myForm1}
          required
          id="status"
          name="status"
          placeholder={performancecriteriaData.status}
          onChange={handleChange}>
              <option value={performancecriteriaData.status}>{performancecriteriaData.status}</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
        </select>     
        
        <br />
        <div>
          <button type="submit">
            Submit
          </button>
          {/* temp fix */}
          <Link to={'/view-performancecriterias'}>
        <button>Back</button>
      </Link>
          {/* <Link to={`/Performancecriteria?id=${performancecriteriaData.idPerformancecriteriaitems}`}>
        <button>Back</button>
      </Link> */}
      <br />
        </div>
      </form>
    </div>
  );
//}
}