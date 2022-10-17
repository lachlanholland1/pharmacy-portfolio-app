import React, { useEffect, useState, useReducer, Alert } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import style from "./EditStandardsStyle.css";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function EditStandardsForm({ standardData }) {
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
    framework: "domains",
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
    setFormData({ name: "idstandards", value: standardData.idstandards });
  };

  function handleSubmit(e) {
    if (!userChanged) navigate("/view-standards");
    // uploadFile(selectedFile);
    e.preventDefault();
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/editstandards", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
    .then(navigate("/view-standards"))
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
    navigate("/view-standards");
  }

  return (
    <div>
      <div className={style.container}>
          <div className={style.sign}>
          <h1 className={style.center}>Edit Standard</h1>
      <form onSubmit={handleSubmit}>
        <label className={style.padding}>Title</label>
        <br />
        <input
          className={style.myForm1}
          maxLength={65}
          type="text"
          id="title"
          placeholder={standardData.title}
          // value={standardData.title}
          name="title"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Description</label>
        <br />
        <input
          className={style.myForm1}
          type="text"
          placeholder={standardData.description}
          id="description"
          name="description"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Domain</label>
            <br />
            <select required id="domains_id" name="domains_id" onChange={handleChange}  className={style.myForm1}>
              <option value={standardData.domains_id}>{standardData.domainstitle}</option>
              {frameworkData.length ? (
                  frameworkData.map((data) => (
                    <option value={data.iddomains}>{data.title}</option>
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
          placeholder={standardData.status}
          onChange={handleChange}>
              <option value={standardData.status}>{standardData.status}</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
        </select>
        <br />
        <br />
        <div className={style.buttonSpace}>
          <button className={style.myButton} type="submit">
            Submit
          </button>
          {/* temp fix */}
          <Link to={'/view-standards'}>
        <button className={style.myButton}>Back</button>
      </Link>
          {/* <Link to={`/Standard?id=${standardData.idStandarditems}`}>
        <button>Back</button>
      </Link> */}
        </div>
      </form>
    </div>
    </div>
    </div>
  );
//}
}
