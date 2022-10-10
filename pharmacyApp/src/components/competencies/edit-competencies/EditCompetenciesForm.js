import React, { useEffect, useState, useReducer, Alert } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import style from "./EditCompetenciesStyle.css";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function EditCompetenciesForm({ competencyData }) {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [userChanged, setUserChanged] = useState(false);
  const [frameworkData, setFrameworkData] = useState([]);

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
        setFrameworkData(data.frameworks_data);
      });
  }, []);


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
    setFormData({ name: "idcompetencies", value: competencyData.idcompetencies });
  };

  function handleSubmit(e) {
    if (!userChanged) return;
    // uploadFile(selectedFile);
    e.preventDefault();
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/editcompetencies", {
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
    navigate("/view-competencies");
  }

  return (
    <div>
      <div className={style.container}>
          <div className={style.sign}>
          <h1 className={style.center}>Edit Competency</h1>
      <form onSubmit={handleSubmit}>
        <label className={style.padding}>Title</label>
        <br />
        <input
          className={style.myForm1}
          maxLength={65}
          type="text"
          id="title"
          placeholder={competencyData.title}
          // value={competencyData.title}
          name="title"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Description</label>
        <br />
        <input
          className={style.myForm1}
          type="text"
          placeholder={competencyData.description}
          id="description"
          name="description"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Standard</label>
            <br />
            <select required id="standards_id" name="standards_id" onChange={handleChange}  className={style.myForm1}>
              <option value={competencyData.standards_id}>{competencyData.standardstitle}</option>
              {frameworkData.length ? (
                  frameworkData.map((data) => (
                    <option value={data.idstandards}>{data.title} ({data.description.substring(0, 60)} {data.description.length > 60 ? ("...") :("") } )</option>
                  ))
                ) : (
                  <option value=""></option>
                )}
            </select>

        <br />
        <label className={style.padding}>Status</label>
        <br />
        <select
          className={style.myForm1}
          required
          id="status"
          name="status"
          placeholder={competencyData.status}
          onChange={handleChange}>
              <option value={competencyData.status}>{competencyData.status}</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
        </select>
        <br />
        <br />
        <div className={style.buttonSpace}>
          <button
          className={style.myButton}
          type="submit">
            Submit
          </button>
          {/* temp fix */}
          <Link to={'/view-competencies'}>
        <button className={style.myButton}>Back</button>
      </Link>
          {/* <Link to={`/Competencie?id=${competencyData.idCompetencieitems}`}>
        <button>Back</button>
      </Link> */}
      <br />
        </div>
      </form>
    </div>
    </div>
    </div>
  );
//}
}
