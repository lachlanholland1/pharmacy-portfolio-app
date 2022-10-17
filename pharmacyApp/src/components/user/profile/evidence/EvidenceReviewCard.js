import React, { useEffect, useState } from "react";
import style from "./EvidenceReviewCard.css";
import Moment from "moment";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

function EvidenceReviewCard({ review }) {
  const [profileData, setProfileData] = useState({});

  const { auth } = useAuth();
  const evidence_id = localStorage.getItem("evidence_id");

  return (
    <div>
      <Link
        to={`/view-review/?id=${evidence_id}&reviewid=${review.idevidencereview}`}
      >
        <div>{review.username}</div>
        <div>
          {Moment(review.reviewdate, "YYYY-MM-DD").format("DD/MM/YYYY")}
        </div>
        <br />
        <div>
          {auth.username == review.username ? (
            <Link
              to={`/edit-self-review/?id=${evidence_id}&reviewid=${review.idevidencereview}`}
            >
              <button className={style.myButton2}>Edit</button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </Link>
    </div>
  );
}

export default EvidenceReviewCard;
