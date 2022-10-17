import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import EditSelfReviewForm from "./EditSelfReviewForm";
import { Link } from "react-router-dom";
import style from "./style.css";

function EditSelfReview(props) {
  const { auth } = useAuth();
  const [evidenceCriteria, setEvidenceCriteria] = useState(null);

  useEffect(() => {
    const request = {
      access_token: auth.access_token,
      username: auth.username,
    };
    fetch("/api/self-review-form", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setEvidenceCriteria(data));
  }, []);

  return (
    <div>
      <Link to={"/" + auth.username}>
        <button className={style.myButtton}>Back</button>
      </Link>
      {evidenceCriteria ? (
        <EditSelfReviewForm evidenceCriteria={evidenceCriteria} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default EditSelfReview;
