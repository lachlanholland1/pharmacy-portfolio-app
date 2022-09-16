import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

function EvidenceReview(props) {
  const [reviewData, setReviewData] = useState(null);
  const { auth, setAuth } = useAuth();
  const params = useParams();
  const reviewId = params.id;

  useEffect(() => {
    const request = {
      access_token: auth.access_token,
      id_evidence_review: reviewId,
    };
    fetch("/api/evidence-review", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setReviewData(data));
  }, []);
  console.log(reviewData);
  return <div>{params.id}</div>;
}

export default EvidenceReview;
