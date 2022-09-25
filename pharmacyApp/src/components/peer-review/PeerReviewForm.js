import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./style.css";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: {
      // domain: event.domain,
      // standard: event.standard,
      // competency: event.competency,
      reviewId: event.reviewId,
      value: event.value,
    },
  };
};
export default function PeerReviewForm({ evidenceCriteria }) {
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(-1);
  const [formData, setFormData] = useReducer(formreducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { auth, setAuth } = useAuth();
  const [reviewData, setReviewData] = useState([]);
  const [evidenceData, setEvidenceData] = useState([]);
  
  

  localStorage.removeItem("currentDomain");
  const id = searchParams.get("id");
  const evidencereviews_id = searchParams.get("reviewid");

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

//   const handleChange = (event, domain, standard, competency) => {
//     const isCheckbox = event.target.type === "checkbox";
//     setFormData({
//       name: event.target.name,
//       value: isCheckbox ? event.target.checked : event.target.value,
//       domain: domain,
//       standard: standard,
//       competency: competency,
//     });
//   };
  const handleChange = (event, reviewId) => {
    console.log(reviewId);
    setFormData({
      name: event.target.name,
      value: event.target.value,
      reviewId: reviewId
    });
  };


useEffect(() => {
    const request = { review_id: evidencereviews_id };
    fetch("/api/get-evidence-review", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data);setReviewData(data)});
      //get evidence description
      const evidenceRequest = { idevidenceitems: id };
      fetch("/api/viewevidence", {
        method: "POST",
        body: JSON.stringify(evidenceRequest),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((evidenceData) => {setEvidenceData(evidenceData.evidence_data.description)});
  

  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const request = {
      evidence_id: id,
      evidencereviews_id: evidencereviews_id,
      review: formData,
      access_token: auth.access_token,
      user_id: auth.user_id,
    };
    console.log("submitting");
    console.log(request);
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/peer-review", {
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

  console.log(formData);
  

  return (
    <div>
        <div className={style.container}>
        <div className={style.sign}>
        <h1>Peer Review</h1>
        <form onSubmit={handleSubmit}>
        <p>{evidenceData}</p>
        <br /> 
        {reviewData.data?.map((data, index) => (
          <div>
          <h2>{evidenceCriteria.domains[data.domains_id - 1].description}</h2>
          {data.standards.map((standard, index) => (
                  <div key={index}>
                    <h4>{evidenceCriteria.domains[data.domains_id - 1].standards[standard.standards_id - 1].description}</h4>
                    {standard.competencies.map((competency, index) => (
                      <div key={index}>
                        <label>{evidenceCriteria.domains[data.domains_id - 1].standards[standard.standards_id - 1].
                competencies[competency.competencies_id - 1].description}</label>
                <br />
                 <input type="radio" defaultChecked/>
       
                            <label>{evidenceCriteria.performance_criteria[competency.performancecriterias_id - 2].title}</label>
                            <br />
                            <p>Users Comments: {competency.comments}</p>
                            <p>Do you believe the evidence meets the Competency?</p>
                            {/* <input type="radio" id="yes" name="agree" value="yes" onChange={(event) => handleChange(event, competency.review_id)}/>
                <label for="yes">Yes</label>
                <input type="radio" id="no" name="agree" value="no" onClick={(event) => handleChange(event, competency.review_id)}/>
                <label for="no">No</label>  */}
                <input required type="radio" name={"a-" + competency.review_id} value="Yes" onChange={(event) => handleChange( event, competency.review_id ) } step="1" />
                <label className="">{"Yes"}</label>
                <input required type="radio" name={"a-" + competency.review_id} value="No" onChange={(event) => handleChange( event, competency.review_id ) } step="1" />
                <label className="">{"No"}</label>
                <p>What level do you believe the evidence meets?</p>
                {/* <input type="radio" id="Transition" name={"c"+competency.competencies_id} value="1" onClick={handleChange}/>
                <label for="Transition">Transition</label>
                <input type="radio" id="Consolidation" name={"c"+competency.competencies_id} value="2" onClick={handleChange}/>
                <label for="Consolidation">Consolidation</label>
                <input type="radio" id="Advanced" name={"c"+competency.competencies_id} value="3" onClick={handleChange}/>
                <label for="Advanced">Advanced</label> */}
                {/* <Choose revId={competency.review_id} /> */}
                <div>
                <input type="radio" name={"c" + competency.review_id} value="1" onChange={(event) => handleChange( event, competency.review_id ) } step="1" />
                <label className="">{"Transition"}</label>
                <br />
                <input type="radio" name={"c" + competency.review_id} value="2" onChange={(event) => handleChange( event, competency.review_id ) } step="1" />
                <label className="">{"Consolidation"}</label>
                <br />
                <input type="radio" name={"c" + competency.review_id} value="3" onChange={(event) => handleChange( event, competency.review_id ) } step="1" />
                <label className="">{"Advanced"}</label>
                </div>
                <br />
                <label className="">Comments</label>
                        <br />
                        <textarea
                          className=""
                          maxLength={255}
                          type="text"
                          placeholder={"Enter comments"}
                          name={
                            "comments-" +
                            competency.review_id
                          }
                          onChange={(event) =>
                            handleChange(
                              event,
                              competency.review_id
                            )
                          }
                        />
                </div>))}
                    </div>))}
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

