import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import style from "./style.css";
import { confirmAlert } from "react-confirm-alert";

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

  const DeletePeerReview = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to do this?",
      buttons: [
        {
          label: "Yes",
          // onClick: () => alert("Click Yes")
          onClick: () =>
            fetch("/api/delete-peer-review", {
              method: "POST",
              body: JSON.stringify({
                peerreview_id: peerid,
              }),
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => res.json())
              .then(navigate(`/evidence?id=${id}`)),
        },
        {
          label: "No",
          onClick: () => navigate(navigate(`/evidence?id=${id}`)),
          //onClick: () => alert("Click No")
        },
      ],
    });
  };

  var domainIndex = null;
  var standardIndex = null;
  var competenecyIndex = null;
  var peerReviewInfo = null;

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
                        {competency.comments != null ? (
                          <div>
                            <p>Users Comments: {competency.comments}</p>
                          </div>
                        ) : (
                          <></>
                        )}
                        {/* //////////////////////// */}
                        {/* //////////////////////// */}
                        {/* //////////////////////// */}
                        {ispeerReview === true ? (
                          <div>
                            <h3>Peer Review</h3>

                            <input
                              type="hidden"
                              name="inputThree"
                              value={
                                (peerReviewInfo = PeerReviewData(
                                  peerReviewData,
                                  competency.review_id
                                ))
                              }
                            />
                            {peerReviewInfo === null ? (
                              <p>Not peer reviewed</p>
                            ) : (
                              <></>
                            )}
                            {peerReviewInfo != null ? (
                              <div>
                                <p>Agree: {peerReviewInfo.agreeoncompetency}</p>
                                {peerReviewInfo.agreeoncompetency === "No" ? (
                                  <div>
                                    <p>
                                      Performance Criteria Met:{" "}
                                      {
                                        evidenceCriteria.performance_criteria[
                                          peerReviewInfo.performancecriterias_id -
                                            2
                                        ].title
                                      }
                                    </p>
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {peerReviewInfo.comments != null ? (
                                  <div>
                                    <p>
                                      Reviewers Comments:{" "}
                                      {peerReviewInfo.comments}
                                    </p>
                                  </div>
                                ) : (
                                  <></>
                                )}
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
          {reviewers === true ? (
            <button className={style.myButton} onClick={DeletePeerReview}>
              Delete Peer Review
            </button>
          ) : (
            <></>
          )}
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
  console.log("PEER REVIEW DATA");
  console.log(data);
  console.log(review_id);

  for (let i = 0; i < data.length; i++) {
    if (data[i].review_id == review_id) {
      return data[i];
    }
  }
  return null;
}
