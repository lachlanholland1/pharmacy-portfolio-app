import React, { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import style from "./style.css";
import ViewPeerReviewForm from "./ViewPeerReviewForm";

function ViewPeerReview(props) {
  const { auth } = useAuth();
  const [evidenceCriteria, setEvidenceCriteria] = useState(null);
  localStorage.removeItem("currentDomain");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const request = {
      access_token: auth.access_token,
      username: auth.username,
    };
    fetch("/api/get-all-evidence-criteria", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        
        setEvidenceCriteria(data);
      });
  }, []);

  return (
    <div className={style.border}>
      <Link to={`/evidence/?id=${id}`}>
      <button className={style.myButton2}>Back</button>
      </Link>
      {evidenceCriteria ? (
        <ViewPeerReviewForm evidenceCriteria={evidenceCriteria} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ViewPeerReview;
