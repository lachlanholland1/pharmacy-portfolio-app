import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ReviewEvidenceForm from "./ReviewEvidenceForm";

function ReviewEvidence(props) {
  const { auth } = useAuth();
  const [evidenceCriteria, setEvidenceCriteria] = useState(null);

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
      .then((data) => setEvidenceCriteria(data));
  }, []);

  return (
    <div>
  

      {evidenceCriteria ? (
        <ReviewEvidenceForm evidenceCriteria={evidenceCriteria} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ReviewEvidence;
