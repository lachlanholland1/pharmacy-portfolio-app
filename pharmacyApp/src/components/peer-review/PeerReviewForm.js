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
  const [checkedItems, setCheckedItems] = useState({});
  const [domainsDisplay, setDomainsDisplay] = useState(
    Array(evidenceCriteria.domains.length).fill(0)
  );
  //var check = [];
  localStorage.removeItem("currentDomain");
  const id = searchParams.get("id");
  const evidencereviews_id = searchParams.get("reviewid");

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
 

  const handleChange = (event, reviewId) => {
    if (
      event.target.value == "1" ||
      event.target.value == "2" ||
      event.target.value == "3" ||
      event.target.value == "4"
    ) {
      setCheckedItems({
        ...checkedItems,
        [event.target.name]: event.target.value,
      });
    }
    setFormData({
      name: event.target.name,
      value: event.target.value,
      reviewId: reviewId,
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
      .then((data) => {
        
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

    fetch("/api/get-all-peer-reviews", {
      method: "POST",
      body: JSON.stringify({ evidenceitems_id: id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (auth.user_id == data[i].reviewers_id) {
            navigate("/evidence?id=" + id);
          }
        }
      })
      .catch((err) => {});
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
  if (reviewers == false) {
    return (
      <div>
        <label>You are unauthorised to access this page.</label>
        <br />
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </div>
    );
  }

  function NewFields(value) {
    var competencyID = value.value2;
    if (value.value != null) {
      if (value.value.value == "No") {
        return (
          <div>
            <p>What level do you believe the evidence meets?</p>
            <div>
              {evidenceCriteria.performance_criteria.map((criteria, index) => (
                <div className="" key={index}>
                  <input
                    type="radio"
                    name={"c" + competencyID}
                    value={criteria.idperformancecriteria}
                    onChange={(event) => handleChange(event, competencyID)}
                    onClick={(event) => handleChange(event, competencyID)}
                    step="1"
                    checked={
                      checkedItems["c" + competencyID] ==
                      criteria.idperformancecriteria
                    }
                  />
                  <label className="">{criteria.title}</label>
                </div>
              ))}
            </div>
            <br />
            {/* <label className="">Comments</label>
            <br />
            <textarea
              required
              className=""
              maxLength={255}
              type="text"
              placeholder={"Enter your reasons for Yes/No"}
              name={"comments-" + competencyID}
              onChange={(event) => handleChange(event, competencyID)}
            /> */}
          </div>
        );
      }
    }
    return null;
    //   <div>
    //     <label className="">Comments</label>
    //     <br />
    //     <textarea
    //       className=""
    //       maxLength={255}
    //       type="text"
    //       placeholder={"Enter your reasons for Yes/No"}
    //       name={"comments-" + competencyID}
    //       onChange={(event) => handleChange(event, competencyID)}
    //     />

    //   </div>
  }

  var domainIndex = null;
  var standardIndex = null;
  var competenecyIndex = null;
  var val = null;

  // function handleDisplayDomain(index) {
  //   const domainsDisplayCopy = [...domainsDisplay];
  //   domainsDisplayCopy[index] = !domainsDisplayCopy[index];
  //   setDomainsDisplay(domainsDisplayCopy);
  // }

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

                <div className={style.domain_dropdown}>
                  <h2 onClick={() => handleDisplayDomain(index)}>
                    {evidenceCriteria.domains[domainIndex].title}{" "}
                    {evidenceCriteria.domains[domainIndex].description}
                  </h2>
                </div>
                {/* {domainsDisplay[index] ? ( */}
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
                        <input
                          type="hidden"
                          name="inputFour"
                          value={(val = "a-" + competency.review_id)}
                        />
                        {/* <input
                          type="hidden"
                          name="inputFive"
                          value={(competencyID = competency.review_id)}
                        /> */}

                        {val != null ? (
                          <NewFields
                            value={formData[val]}
                            value2={competency.review_id}
                          />
                        ) : (
                          <></>
                        )}

                        {/* <div> */}
                        {/* <input
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
                        </div> */}
                        <br />
                        <label className="">Comments</label>
                        <br />
                        <textarea
                          className=""
                          rows="6"
                          cols="60"
                          maxLength={255}
                          type="text"
                          placeholder={"Enter your reasons for Yes/No"}
                          name={"comments-" + competency.review_id}
                          onChange={(event) =>
                            handleChange(event, competency.review_id)
                          }
                        />
                        <br />
                      </div>
                    ))}
                  </div>
                  //   ))
                  // ) : (
                  //   <></>
                ))}
              </div>
            ))}
            <div>
              <button className={style.myButton} type="submit">
                Submit
              </button>
            </div>
          </form>
          <br />
          <Link to={`/evidence?id=${id}`}>
            <button className={style.myButton}>Back</button>
          </Link>
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
