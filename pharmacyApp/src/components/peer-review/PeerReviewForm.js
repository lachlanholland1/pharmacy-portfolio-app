import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import style from "./style.css";

const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: {
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
  const [evidenceDataTitle, setEvidenceDataTitle] = useState([]);
  const [reviewers, setReviewers] = useState(null);
  const [answers, setAnswers] = useState(false);

  localStorage.removeItem("currentDomain");
  const id = searchParams.get("id");
  const evidencereviews_id = searchParams.get("reviewid");

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (event, reviewId) => {
    console.log(reviewId);
    if (event.target.value == "No") {
      console.log("NO");
      setAnswers(true);
    }
    if (event.target.value == "Yes") {
      console.log("YES");
      setAnswers(false);
    }
    setFormData({
      name: event.target.name,
      value: event.target.value,
      reviewId: reviewId,
    });
    console.log(formData);
  };

  useEffect(() => {
    const request = { review_id: evidencereviews_id };
    fetch("/api/get-evidence-review", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReviewData(data);
      });
    const evidenceRequest = { idevidenceitems: id };
    fetch("/api/viewevidence", {
      method: "POST",
      body: JSON.stringify(evidenceRequest),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((evidenceData) => {
        setEvidenceData(evidenceData.evidence_data.description);
        setEvidenceDataTitle(evidenceData.evidence_data.title);
      });
    const reviewerRequest = { users_id: auth.user_id };
    fetch("/api/viewreviewers", {
      method: "POST",
      body: JSON.stringify(reviewerRequest),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((reviewerDetails) => {
        if (reviewerDetails.length > 0) {
          setReviewers(true);
        } else {
          setReviewers(false);
        }
      });
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
    navigate("/evidence?id=" + id);
  }

  // if (reviewers == false) {
  //   console.log("Not authorised.");
  //   return (
  //     <div>
  //       <label>You are unauthorised to access this page.</label>
  //       <br />
  //       <Link to={"/login"}>
  //         <button>Login</button>
  //       </Link>
  //     </div>
  //   );
  // }

  console.log(formData);

  var domainIndex = null;
  var standardIndex = null;
  var competenecyIndex = null;

  return (
    <div>
      <div className={style.container}>
        <div className={style.sign}>
          <h1>Peer Review</h1>
          <form onSubmit={handleSubmit}>
            <p>Evidence Title</p>
            <h2>{evidenceDataTitle}</h2>

            <p>Description</p>
            <p>{evidenceData}</p>

            {reviewData.data?.map((data, index) => (
              <div>
                <input
                  type="hidden"
                  name="inputTwo"
                  value={
                    (domainIndex = getIndexOfDomain(
                      evidenceCriteria,
                      data.domains_id
                    ))
                  }
                />

                <h2>
                  {evidenceCriteria.domains[domainIndex].title}{" "}
                  {evidenceCriteria.domains[domainIndex].description}
                </h2>

                {data.standards.map((standard, index) => (
                  <div key={index}>
                    <input
                      type="hidden"
                      name="inputTwo"
                      value={
                        (standardIndex = getIndexOfStandard(
                          evidenceCriteria,
                          domainIndex,
                          standard.standards_id
                        ))
                      }
                    />

                    <h4>
                      {
                        evidenceCriteria.domains[domainIndex].standards[
                          standardIndex
                        ].title
                      }{" "}
                      {
                        evidenceCriteria.domains[domainIndex].standards[
                          standardIndex
                        ].description
                      }
                    </h4>

                    {standard.competencies.map((competency, index) => (
                      <div key={index}>
                        <input
                          type="hidden"
                          name="inputTwo"
                          value={
                            (competenecyIndex = getIndexOfCompetency(
                              evidenceCriteria,
                              domainIndex,
                              standardIndex,
                              competency.competencies_id
                            ))
                          }
                        />

                        <label>
                          {
                            evidenceCriteria.domains[domainIndex].standards[
                              standardIndex
                            ].competencies[competenecyIndex].title
                          }{" "}
                          {
                            evidenceCriteria.domains[domainIndex].standards[
                              standardIndex
                            ].competencies[competenecyIndex].description
                          }
                        </label>

                        <br />
                        <input type="radio" defaultChecked />

                        <label>
                          {
                            evidenceCriteria.performance_criteria[
                              competency.performancecriterias_id - 2
                            ].title
                          }
                        </label>
                        <br />
                        <p>Users Comments: {competency.comments}</p>
                        <p>Do you believe the evidence meets the Competency?</p>
                        <input
                          required
                          type="radio"
                          name={"a-" + competency.review_id}
                          value="Yes"
                          onChange={(event) =>
                            handleChange(event, competency.review_id)
                          }
                          step="1"
                        />
                        <label className="">{"Yes"}</label>
                        <input
                          required
                          type="radio"
                          name={"a-" + competency.review_id}
                          value="No"
                          onChange={(event) =>
                            handleChange(event, competency.review_id)
                          }
                          step="1"
                        />
                        <label className="">{"No"}</label>
                        {/* {answers === true ? (
                          <button>Peer Review</button>
                        ) : (
                          <></>
                        )} */}
                        <p>What level do you believe the evidence meets?</p>
                        <div>
                          <input
                            type="radio"
                            name={"c" + competency.review_id}
                            value="1"
                            onChange={(event) =>
                              handleChange(event, competency.review_id)
                            }
                            step="1"
                          />
                          <label className="">{"Transition"}</label>
                          <br />
                          <input
                            type="radio"
                            name={"c" + competency.review_id}
                            value="2"
                            onChange={(event) =>
                              handleChange(event, competency.review_id)
                            }
                            step="1"
                          />
                          <label className="">{"Consolidation"}</label>
                          <br />
                          <input
                            type="radio"
                            name={"c" + competency.review_id}
                            value="3"
                            onChange={(event) =>
                              handleChange(event, competency.review_id)
                            }
                            step="1"
                          />
                          <label className="">{"Advanced"}</label>
                        </div>
                        <br />
                        <label className="">Comments</label>
                        <br />
                        <textarea
                          className=""
                          maxLength={255}
                          type="text"
                          placeholder={"Enter your reasons for Yes/No"}
                          name={"comments-" + competency.review_id}
                          onChange={(event) =>
                            handleChange(event, competency.review_id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
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

function getIndexOfCompetency(
  evidenceCriteria,
  domains_id,
  standard_id,
  competency_id
) {
  if (evidenceCriteria != null) {
    var max =
      evidenceCriteria.domains[domains_id].standards[standard_id].competencies
        .length;
    console.log(max);
    for (let i = 0; i < max; i++) {
      if (
        evidenceCriteria.domains[domains_id].standards[standard_id]
          .competencies[i].idcompetencies == competency_id
      ) {
        return i;
      }
    }
  }
  return false;
}

function getIndexOfStandard(evidenceCriteria, domains_id, standard_id) {
  if (evidenceCriteria != null) {
    var max = evidenceCriteria.domains[domains_id].standards.length;
    console.log(max);
    for (let i = 0; i < max; i++) {
      if (
        evidenceCriteria.domains[domains_id].standards[i].idstandards ==
        standard_id
      ) {
        return i;
      }
    }
  }
  return false;
}

function getIndexOfDomain(evidenceCriteria, domains_id) {
  if (evidenceCriteria != null) {
    var max = evidenceCriteria.domains.length;
    for (let i = 0; i < max; i++) {
      if (evidenceCriteria.domains[i].iddomains == domains_id) {
        return i;
      }
    }
  }
  return false;
}
