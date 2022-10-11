import React, { useEffect, useState, useReducer, Alert } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import style from "./EditDomainsStyle.css";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function EditDomainsForm({ domainData }) {
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
    setFormData({ name: "iddomains", value: domainData.iddomains });
  };

  function handleSubmit(e) {
    if (!userChanged) return;
    // uploadFile(selectedFile);
    e.preventDefault();
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/editdomains", {
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
    navigate("/view-domains");
  }

  return (
    <div>
      <h2></h2>
      <form onSubmit={handleSubmit}>
        <label className={style.padding}>Edit Domain</label>
        <br />
        <label>Title</label>
        <br />
        <input
          className={style.myForm1}
          maxLength={65}
          type="text"
          id="title"
          placeholder={domainData.title}
          // value={domainData.title}
          name="title"
          onChange={handleChange}
        />
        <br />
        <label className={style.padding}>Description</label>
        <br />
        <input
          className={style.myForm1}
          type="text"
          placeholder={domainData.description}
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
          placeholder={domainData.status}
          onChange={handleChange}>
              <option value={domainData.status}>{domainData.status}</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
        </select>

        <br />
        <div>
          <button type="submit">
            Submit
          </button>
          {/* temp fix */}
          <Link to={'/view-domains'}>
        <button>Back</button>
      </Link>
          {/* <Link to={`/Domain?id=${DomainData.idDomainitems}`}>
        <button>Back</button>
      </Link> */}
      <br />
        </div>
      </form>
    </div>
  );
//}
}
