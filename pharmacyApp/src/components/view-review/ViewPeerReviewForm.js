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

export default function ViewPeerReviewForm({ evidenceCriteria }) {
  const [domainsDisplay, setDomainsDisplay] = useState(
    Array(evidenceCriteria.domains.length).fill(0)
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { auth, setAuth } = useAuth();
  const [reviewData, setReviewData] = useState([]);
  const [evidenceData, setEvidenceData] = useState([]);
  const [evidenceDataTitle, setEvidenceDataTitle] = useState([]);
  const [users, setUsers] = useState([]);
  const [ispeerReview, setisPeerReview] = useState(null);
  const [peerReviewData, setPeerReview] = useState([]);
  const [reviewers, setReviewers] = useState(null);

  localStorage.removeItem("currentDomain");
  const id = searchParams.get("id");
  const evidencereviews_id = searchParams.get("reviewid");
  const peerid = searchParams.get("peerid");

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
        console.log(data);
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
        console.log(evidenceDataTitle);
        console.log("ASDASDSADSDA");
      });

    const peerreviewRequest = { evidenceitems_id: id, peerreview_id: peerid };
    fetch("/api/get-peer-review", {
      method: "POST",
      body: JSON.stringify(peerreviewRequest),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((peerReviewData) => {
        if (peerReviewData.length > 0) {
          setisPeerReview(true);
          setPeerReview(peerReviewData);
          console.log(peerReviewData);
        } else {
          setisPeerReview(false);
        }
      });

    fetch("/api/get-all-users", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((userData) => {
        setUsers(userData);
        console.log(userData);
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

  var domainIndex = null;
  var standardIndex = null;
  var competenecyIndex = null;
  var peerReviewInfo = null;
  var username = null;

  function handleDisplayDomain(index) {
    const domainsDisplayCopy = [...domainsDisplay];
    domainsDisplayCopy[index] = !domainsDisplayCopy[index];
    setDomainsDisplay(domainsDisplayCopy);
  }

  return (
    <div>
      <div className={style.container}>
        <div className={style.sign}>
          <h1>Peer Review</h1>
          <p>Evidence Title</p>
          <h2>{evidenceDataTitle}</h2>

          <p>Description</p>
          <p>{evidenceData}</p>
          {reviewers === true ? (
            <button
              className={style.myButton}
              onClick={DeletePeerReview(peerid)}
            >
              Delete Peer Review
            </button>
          ) : (
            <></>
          )}
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
              {domainsDisplay[index] ? (
                data.standards.map((standard, index) => (
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
                        {/* //////////////////////// */}
                        {/* //////////////////////// */}
                        {/* //////////////////////// */}
                        {ispeerReview === true ? (
                          <div>
                            <input
                              type="hidden"
                              name="inputThree"
                              value={
                                ((peerReviewInfo = PeerReviewData(
                                  peerReviewData,
                                  competency.review_id
                                )),
                                (username = getUser(
                                  users,
                                  peerReviewInfo.reviewers_id
                                )))
                              }
                            />
                            <h3>Peer Reviews</h3>
                            <p>Reviewer: {username}</p>
                            <p>Reviewers Comments: {peerReviewInfo.comments}</p>

                            <p>Agree: {peerReviewInfo.agreeoncompetency}</p>
                            {peerReviewInfo.agreeoncompetency === "No" ? (
                              <div>
                                <p>
                                  Performance Criteria Met:{" "}
                                  {
                                    evidenceCriteria.performance_criteria[
                                      peerReviewInfo.performancecriterias_id - 2
                                    ].title
                                  }
                                </p>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                        {/* //////////////////////// */}
                        {/* //////////////////////// */}
                        {/* //////////////////////// */}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          ))}
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

function PeerReviewData(data, review_id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].review_id == review_id) {
      return data[i];
    }
  }
  return null;
}

function getUser(users, user_id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].user_id == user_id) {
      let username = users[i].firstname + " " + users[i].surname;
      return username;
    }
  }
  return null;
}

function DeletePeerReview(peerid) {
  return null;
}
