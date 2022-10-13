import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import style from "./style.css";

// const formreducer = (state, event) => {
//   return {
//     ...state,
//     [event.name]: {
//       reviewId: event.reviewId,
//       value: event.value,
//     },
//   };
// };
const formreducer = (state, event) => {
  return {
    ...state,
    [event.name]: {
      domain: event.domain,
      standard: event.standard,
      competency: event.competency,
      value: event.value,
      // reviewId: event.reviewId,
    },
  };
};
export default function EditSelfReviewForm({ evidenceCriteria }) {
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
  var competencyArray = [23, 2];
  localStorage.removeItem("currentDomain");
  const id = searchParams.get("id");
  const evidencereviews_id = searchParams.get("reviewid");

  const {
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (event, domain, standard, competency) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
      domain: domain,
      standard: standard,
      competency: competency,
    });
    // setFormData({
    //   name: event.target.name,
    //   value: event.target.value,
    //   reviewId: reviewId,
    // });
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
    ///
    ///
    ///NEW API CALL GOES HERE TO GET AN ARRAY OF ALL OF THE COMPETENCIES THAT WERE IN THE INITIAL SELF REVIEW. IF THEY ARE FOUND THEN WE GET THE DATA AND MAP IT ACCORDINGLY
    ///
    ///
    ///
    ///
    ///
    // fetch("/api/get-all-peer-reviews", {
    //   method: "POST",
    //   body: JSON.stringify({ evidenceitems_id: id }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("ALL REVIEWED ACCOUNS");
    //     console.log(data);
    //     for (let i = 0; i < data.length; i++) {
    //       if (auth.user_id == data[i].reviewers_id) {
    //         console.log("ALREADY DONE A REVIEW!");
    //         navigate("/evidence?id=" + id);
    //       }
    //     }
    //   })
    //   .catch((err) => console.log(err));
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
    fetch("/api/edit-self-review", {
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
  var val = null;
  var currentStandardId = null;

  function handleDisplayDomain(index) {
    const domainsDisplayCopy = [...domainsDisplay];
    domainsDisplayCopy[index] = !domainsDisplayCopy[index];
    setDomainsDisplay(domainsDisplayCopy);
  }
  return (
    <div>
      <div className={style.container}>
        <div className={style.sign}>
          {/* <h1>Peer Review</h1> */}

          <br />
          <Link to={`/evidence?id=${id}`}>
            <button className={style.myButton}>Back</button>
          </Link>
        </div>
      </div>
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
                      <input
                        type="hidden"
                        name="inputOne"
                        value={(currentStandardId = standard.idstandards)}
                      />
                      {standard.competencies.map((competency, index) => (
                        <div key={index}>
                          <label>{competency.description}</label>
                          {competencyArray.includes(
                            competency.idcompetencies
                          ) == true ? (
                            //
                            <div>
                              <p>TESTING MY DUDE</p>
                              {reviewData.data?.map((data, index) => (
                                <div>
                                  {data.standards.map((standard, index) => (
                                    <div>
                                      {standard.competencies.map(
                                        (competencies, index) => (
                                          <div>
                                            {competency.idcompetencies ==
                                            competencies.competencies_id ? (
                                              <div>
                                                {evidenceCriteria.performance_criteria.map(
                                                  (criteria, index) => (
                                                    <div
                                                      className=""
                                                      key={index}
                                                    >
                                                      <input
                                                        type="radio"
                                                        name={
                                                          "d" +
                                                          domain.iddomains +
                                                          "-s" +
                                                          currentStandardId +
                                                          "-c" +
                                                          competency.idcompetencies
                                                        }
                                                        defaultChecked={
                                                          criteria.idperformancecriteria ==
                                                          competencies.performancecriterias_id
                                                        }
                                                        // temparary ^^^
                                                        value={
                                                          criteria.idperformancecriteria
                                                        }
                                                        onChange={(event) =>
                                                          handleChange(
                                                            event,
                                                            domain.iddomains,
                                                            currentStandardId,
                                                            competency.idcompetencies
                                                          )
                                                        }
                                                        step="1"
                                                      />
                                                      <label className="">
                                                        {criteria.title}
                                                      </label>
                                                    </div>
                                                  )
                                                )}
                                                <label className="">
                                                  Comments
                                                </label>
                                                <br />
                                                <textarea
                                                  className=""
                                                  maxLength={255}
                                                  type="text"
                                                  placeholder={
                                                    competencies.comments
                                                  }
                                                  name={
                                                    "comment-d" +
                                                    domain.iddomains +
                                                    "-s" +
                                                    currentStandardId +
                                                    "-c" +
                                                    competency.idcompetencies
                                                  }
                                                  onChange={(event) =>
                                                    handleChange(
                                                      event,
                                                      domain.iddomains,
                                                      currentStandardId,
                                                      competency.idcompetencies
                                                    )
                                                  }
                                                />
                                              </div>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <></>
                          )}
                          {competencyArray.includes(
                            competency.idcompetencies
                          ) == false ? (
                            <div>
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
                                  standard.idstandards +
                                  "-c" +
                                  competency.idcompetencies
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
                            </div>
                          ) : (
                            <></>
                          )}

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
