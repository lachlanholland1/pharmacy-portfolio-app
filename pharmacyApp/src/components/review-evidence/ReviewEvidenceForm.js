import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function ReviewEvidenceForm({ evidenceCriteria }) {
  console.log(evidenceCriteria);
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (event) => {
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
    if (!submitEnabled) return;
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
      <div className="">
        <div className="">
          <form onSubmit={handleSubmit}>
            {evidenceCriteria.domains.map((domain) => (
              <div>
                <h2>{domain.description}</h2>
                {domain.standards.map((standard, index) => (
                  <div>
                    <h4>{standard.description}</h4>
                    {standard.competencies.map((competency, index) => (
                      <div key={index}>
                        <label>{competency.description}</label>
                        {evidenceCriteria.performance_criteria.map(
                          (criteria, index) => (
                            <div className="" key={index}>
                              <input
                                type="checkbox"
                                name={"criteria-" + index}
                                onChange={handleChange}
                                step="1"
                              />
                              <label className="">{criteria.title}</label>
                            </div>
                          )
                        )}
                        <br />
                        <label className="">Comments</label>
                        <br />
                        <textarea
                          className=""
                          maxLength={255}
                          type="text"
                          placeholder={"Enter comments"}
                          id={"criteria"}
                          name="mobile"
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <div className="">
              <button className="" disabled={!submitEnabled} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
