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

export default function ViewReviewForm({ evidenceCriteria }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { auth, setAuth } = useAuth();
  const [reviewData, setReviewData] = useState([]);
  const [evidenceData, setEvidenceData] = useState([]);
  const [evidenceDataTitle, setEvidenceDataTitle] = useState([]);
  const [reviewers, setReviewers] = useState(null);
  const [evidenceReviews, setEvidenceReviews] = useState([]);
  const [evidenceUser, setEvidenceUser] = useState([]);

  localStorage.removeItem("currentDomain");
  const id = searchParams.get("id");
  const evidencereviews_id = searchParams.get("reviewid");
  let review_id = null;
  if (evidenceReviews != null) {
    localStorage.setItem("review_id", evidenceReviews.idevidencereview);
    review_id = localStorage.getItem("review_id");
  }
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
        setEvidenceUser(evidenceData.evidence_data.users_id);
        setEvidenceData(evidenceData.evidence_data.description);
        setEvidenceDataTitle(evidenceData.evidence_data.title);
        setEvidenceReviews(evidenceData.evidence_reviews);
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

  return (
    <div>
      <div className={style.container}>
        <div className={style.sign}>
          <h1>Self Review</h1>
          <p>Evidence Title</p>
          <h2>{evidenceDataTitle}</h2>

          <p>Description</p>
          <p>{evidenceData}</p>
          {reviewers === true && auth.user_id != evidenceUser ? (
            <Link to={`/peer-review/?id=${id}&reviewid=${review_id}`}>
              <button className={style.myButton}>Create Peer Review</button>
            </Link>
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
                      {competency.comments != null ? (
                        <div>
                          <p>Users Comments: {competency.comments}</p>
                        </div>
                      ) : (
                        <></>
                      )}
                      {/* <p>Users Comments: {competency.comments}</p> */}
                    </div>
                  ))}
                </div>
              ))}
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
