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
  const [checkedItems, setCheckedItems] = useState([]);
  const [domainsDisplay, setDomainsDisplay] = useState(
    Array(evidenceCriteria.domains.length).fill(0)
  );
  const [competencyArray, setCompetencyArray] = useState([]);
  const [evidenceOwner, setEvidenceOwner] = useState([]);
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
    const isCheckbox = event.target.type === "checkbox";

    setFormData({
      name: event.target.name,
      // value: event.target.value,
      value: isCheckbox ? event.target.checked : event.target.value,
      domain: domain,
      standard: standard,
      competency: competency,
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
        setEvidenceOwner(evidenceData.evidence_data.users_id);
        setEvidenceData(evidenceData.evidence_data.description);
        setEvidenceDataTitle(evidenceData.evidence_data.title);
      });

    const compRequest = { idevidenceitems: id };
    fetch("/api/get-review-competencies", {
      method: "POST",
      body: JSON.stringify(compRequest),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("competency Data");
        console.log(data);
        setCompetencyArray(data);
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

  if (evidenceOwner != auth.user_id) {
    console.log("Not authorised.");
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
          <h1 className={style.container}>Review Evidence</h1>
          <form onSubmit={handleSubmit}>
            {evidenceCriteria.domains.map((domain, index) => (
              <div>
                <div className={style.domain_dropdown}>
                  <h2 onClick={() => handleDisplayDomain(index)}>
                    {domain.title} {domain.description}
                  </h2>
                </div>
                {domainsDisplay[index] ? (
                  domain.standards.map((standard, index) => (
                    <div key={index}>
                      <h4>
                        {standard.title} {standard.description}
                      </h4>
                      <input
                        type="hidden"
                        name="inputOne"
                        value={(currentStandardId = standard.idstandards)}
                      />
                      {standard.competencies.map((competency, index) => (
                        <div key={index}>
                          <label>
                            {competency.title} {competency.description}
                          </label>
                          {competencyArray.includes(
                            competency.idcompetencies
                          ) == true ? (
                            //
                            <div>
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
                                                          standard.standards_id +
                                                          "-c" +
                                                          competency.idcompetencies
                                                        }
                                                        defaultChecked={
                                                          criteria.idperformancecriteria ==
                                                          competencies.performancecriterias_id
                                                        }
                                                        // checked={
                                                        //   checkedItems[
                                                        //     "d" +
                                                        //       domain.iddomains +
                                                        //       "-s" +
                                                        //       standard.standards_id +
                                                        //       "-c" +
                                                        //       competency.idcompetencies
                                                        //   ] ==
                                                        //   criteria.idperformancecriteria
                                                        // }
                                                        value={
                                                          criteria.idperformancecriteria
                                                        }
                                                        onChange={(event) =>
                                                          handleChange(
                                                            event,
                                                            domain.iddomains,
                                                            standard.standards_id,
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
                                                    standard.standards_id +
                                                    "-c" +
                                                    competency.idcompetencies
                                                  }
                                                  onChange={(event) =>
                                                    handleChange(
                                                      event,
                                                      domain.iddomains,
                                                      standard.standards_id,
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
                                      onClick={(event) =>
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
              <button className={style.myButton} type="submit">
                Submit
              </button>
            </div>
            <br />
            <Link to={`/evidence?id=${id}`}>
              <button className={style.myButton}>Back</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
