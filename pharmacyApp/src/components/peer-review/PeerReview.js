import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import PeerReviewForm from "./PeerReviewForm";

function PeerReview(props) {
  const { auth } = useAuth();
  const [evidenceCriteria, setEvidenceCriteria] = useState(null);
  localStorage.removeItem("currentDomain");

  useEffect(() => {
    const request = {
      access_token: auth.access_token,
      username: auth.username,
    };
    fetch("/api/evidence-criteria", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEvidenceCriteria(data);
      });
  }, []);

  return (
    <div>
      {evidenceCriteria ? (
        <PeerReviewForm evidenceCriteria={evidenceCriteria} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default PeerReview;
