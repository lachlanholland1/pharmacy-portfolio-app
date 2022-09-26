import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DownloadImageToS3 from "../../../../DownloadFileToS3";
import style from "./viewEvidence.css";
import EvidenceReviews from "./EvidenceReviews";
import Moment from "moment";

export default function ViewEvidence(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [evidenceData, setEvidenceData] = useState([]);
  const [evidenceReviews, setEvidenceReviews] = useState([]);
  const { auth, setAuth } = useAuth();

  let viewingProfile = localStorage.getItem("profile");

  localStorage.setItem("evidence_id", evidenceData.idevidenceitems);
  localStorage.setItem("attachment", evidenceData.attachment);

  useEffect(() => {
    const request = { idevidenceitems: id };
    fetch("/api/viewevidence", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((details) => {
        setEvidenceData(details.evidence_data);
        setEvidenceReviews(details.evidence_reviews);
      });
    //   .catch((err) => console.log("err"));
  }, []);
  return (
    <div>
      <div className={style.container}>
        <div className={style.sign}>
          <h1> {evidenceData.title} </h1>
          <p>
            Date Created:{" "}
            {Moment(evidenceData.procurementdate, "YYYY-MM-DD").format(
              "DD/MM/YYYY"
            )}
          </p>
          <p>
            Date Uploaded:{" "}
            {Moment(evidenceData.uploaddate, "YYYY-MM-DD").format("DD/MM/YYYY")}
          </p>
          <p> Description: {evidenceData.description}</p>
          <p> Impact Statement: {evidenceData.impactstatement}</p>
          {/* <p> Attachment: {evidenceData.attachment}</p> */}
          <button
            className={style.myButton}
            onClick={() => DownloadImageToS3(evidenceData.attachment)}
          >
            View Evidence
          </button>
          <br />
          <br />
          <Flagged id={evidenceData.users_id} />
          <br />
          <br />
          {auth.user_id === evidenceData.users_id ? (
            <Link to={`/review-evidence/?id=${id}`}>
              <button className={style.myButton}>Self Review</button>
            </Link>
          ) : (
            <></>
          )}

          <br />
          <br />
          <Link to={"/" + viewingProfile}>
            <button className={style.myButton}>Back</button>
          </Link>
          <h3>Self Reviews</h3>
          <EvidenceReviews reviews={evidenceReviews} />
        </div>
      </div>
    </div>
  );
}
function Flagged(id) {
  const { auth, setAuth } = useAuth();
  let evidence_id = localStorage.getItem("evidence_id");
  if ((id = auth.user_id)) {
    return (
      <Link to={`/edit-evidence?id=${evidence_id}`}>
        <button className={style.myButton}>Edit</button>
      </Link>
    );
  } else {
    return null;
  }
}
