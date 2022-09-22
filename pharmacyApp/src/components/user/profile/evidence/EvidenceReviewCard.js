import React, { useEffect, useState } from "react";
import style from "./EvidenceReviewCard.css";
import Moment from "moment";
import { Link } from "react-router-dom";

function EvidenceReviewCard({ review }) {
  const [profileData, setProfileData] = useState({});
  const file = review.attachment;
  const type = file.substr(file.length - 3);
  const requestObject = {
    fileName: file,
    fileType: type,
  };
  useEffect(
    () =>
      fetch("/api/download", {
        method: "POST",
        body: JSON.stringify(requestObject),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data1) => {
          console.log(data1);
          setProfileData(data1);
        }),
    []
  );

  return (
    <div>
      <Link to={"/evidence-review/" + review.idevidencereview}>
        <img src={profileData.signedUrl} className={style.photo}></img>
        <div>{review.username}</div>
        <div>
          {Moment(review.reviewdate, "YYYY-MM-DD").format("DD/MM/YYYY")}
        </div>
        <br />
      </Link>
    </div>
  );
}

export default EvidenceReviewCard;
