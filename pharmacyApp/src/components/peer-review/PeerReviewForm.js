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


  const id = searchParams.get("id");
  const reviewid = searchParams.get("reviewid");

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
  const handleChange = (event) => {
    // const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: event.target.value
      //value: isCheckbox ? event.target.checked : event.target.value//,
    //   performancecriterias_id: performancecriterias_id
    });
  };

useEffect(() => {
    const request = { review_id: reviewid };
    fetch("/api/get-evidence-review", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data);setReviewData(data)});
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const request = {
      evidence_id: id,
      review: formData,
      access_token: auth.access_token,
      user_id: auth.user_id,
    };
    console.log(request);
    setFormIsVisible(false);
    setLoading(true);
    setSubmitting(true);
    fetch("/api/review-evidence1", {
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
  
//   if (reviewData = null){
//     // console.log(reviewData);
//     console.log("yuea");
//   }

  return (
    <div>
        <div className={style.container}>
        <div className={style.sign}>
            {/* <Testing data={reviewData} /> */}
        <h1>Peer Review</h1>
        <form onSubmit={handleSubmit}>
        <p>Description of evidence goes here.. blah blah blah</p>
        <br />
            {/* <Flagged data={reviewData}/> */}
        {reviewData.data?.map((data, index) => (
            <div key={index}>
                {/* <p>Domain Id: {data.domains_id}</p> */}
                <h2>{evidenceCriteria.domains[data.domains_id - 1].description}</h2>
                {/* <p>Standard: {data.standards_id}</p> */}
                <h4>{evidenceCriteria.domains[data.domains_id - 1].standards[data.standards_id - 1].description}</h4>
                <label>{evidenceCriteria.domains[data.domains_id - 1].standards[data.standards_id - 1].
                competencies[data.competencies_id - 1].description}</label>
                <br />
                
                {/* <p>comp: {data.competencies_id}</p> */}
                <input type="radio" defaultChecked/>
                <label>{evidenceCriteria.performance_criteria[data.performancecriterias_id - 2].title}</label>
                {/* <p>Performance Criteria: {evidenceCriteria.performance_criteria[data.performancecriterias_id - 2].title}</p> */}
                <p>Comments: {data.comments}</p>
                <p>Agree on competency?</p>
                <input type="radio" id="yes" name="agree" value="yes" onClick={handleChange}/>
                <label for="yes">Yes</label>
                <input type="radio" id="no" name="agree" value="no" onClick={handleChange}/>
                <label for="no">No</label>
                {/* temporary solution until can figure out handle change */}
                <p>What level do you believe the evidence meets?</p>
                <input type="radio" id="Transition" name="performancecriteria" value="1" onClick={handleChange}/>
                <label for="Transition">Transition</label>
                <input type="radio" id="Consolidation" name="performancecriteria" value="2" onClick={handleChange}/>
                <label for="Consolidation">Consolidation</label>
                <input type="radio" id="Advanced" name="performancecriteria" value="3" onClick={handleChange}/>
                <label for="Advanced">Advanced</label>
                
                        <label className="">Comments</label>
                        <br />
                        <textarea
                          className=""
                          maxLength={255}
                          type="text"
                          placeholder={"Enter comments"}
                          name="comments"
                        //   name={
                        //     "comment-d" +
                        //     domain.iddomains +
                        //     "-s" +
                        //     standard.idstandards
                        //   }
                          onChange={(event) =>
                            handleChange(event)
                          }
                        />
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


      {/* <div className={style.container}>
        <div className={style.sign}>
        <h1>Peer Review</h1>
          <form onSubmit={handleSubmit}>
            {evidenceCriteria.domains.map((domain) => (
              <div>
                <h2>{domain.description}</h2>
                {domain.standards.map((standard, index) => (
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
      </div> */}
    </div>
  );
}

// function Testing(data){
//     //reformat the data object so it can be mapped
//     data.find(())
//     console.log(data);
//     console.log("data");
//     return(
//         <p>ye</p>
//     )
// }
//function to return mapping of Testing ^^^^/////
