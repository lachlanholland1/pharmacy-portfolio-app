import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./style.css";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: {
      domain: event.domain,
      standard: event.standard,
      competency: event.competency,
      value: event.value,
    },
  };
};
export default function SelfReviewForm({ evidenceCriteria }) {
  const [domainsDisplay, setDomainsDisplay] = useState(
    Array(evidenceCriteria.domains.length).fill(0)
  );

  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { auth, setAuth } = useAuth();

  const id = searchParams.get("id");

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (event, domain, standard, competency) => {
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
      domain: domain,
      standard: standard,
      competency: competency,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const request = {
      evidence_id: id,
      review: formData,
      access_token: auth.access_token,
      user_id: auth.user_id,
    };
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/review-evidence", {
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
    navigate("/evidence?id=" + id);
  }

  function handleDisplayDomain(index) {
    const domainsDisplayCopy = [...domainsDisplay];
    domainsDisplayCopy[index] = !domainsDisplayCopy[index];
    setDomainsDisplay(domainsDisplayCopy);
  }
  return (
    <div>
      <div className={style.container}>
        <div className={style.sign}>
          <h1 className={style.container}>Review Evidence</h1>
          <form onSubmit={handleSubmit}>
            {evidenceCriteria.domains.map((domain, index) => (
              <div>
                <div className={style.domain_dropdown}>
                  <h2 onClick={() => handleDisplayDomain(index)}>
                    {domain.description}
                  </h2>
                </div>
                {domainsDisplay[index] ? (
                  domain.standards.map((standard, index) => (
                    <div key={index}>
                      <h4>{standard.description}</h4>
                      {standard.competencies.map((competency, index) => (
                        <div key={index}>
                          <label>{competency.description}</label>
                          {evidenceCriteria.performance_criteria.map(
                            (criteria, index) => (
                              <div className="" key={index}>
                                <input
                                  type="radio"
                                  name={
                                    "d" +
                                    domain.iddomains +
                                    "-s" +
                                    standard.idstandards +
                                    "-c" +
                                    competency.idcompetencies
                                  }
                                  value={criteria.idperformancecriteria}
                                  onChange={(event) =>
                                    handleChange(
                                      event,
                                      domain.iddomains,
                                      standard.idstandards,
                                      competency.idcompetencies
                                    )
                                  }
                                  step="1"
                                />
                                <label className="">{criteria.title}</label>
                              </div>
                            )
                          )}
                          <label className="">Comments</label>
                          <br />
                          <textarea
                            className=""
                            maxLength={255}
                            type="text"
                            placeholder={"Enter comments"}
                            name={
                              "comment-d" +
                              domain.iddomains +
                              "-s" +
                              standard.idstandards
                            }
                            onChange={(event) =>
                              handleChange(
                                event,
                                domain.iddomains,
                                standard.idstandards,
                                competency.idcompetencies
                              )
                            }
                          />
                          <br />
                          <br />
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            ))}
            <div className="">
              <button className="" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
