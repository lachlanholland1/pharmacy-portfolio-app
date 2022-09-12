import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DownloadImageToS3 from "../../../../DownloadFileToS3";

export default function ViewEvidence(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [evidenceData, setEvidenceData] = useState([]);
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
        setEvidenceData(details);
      });
    //   .catch((err) => console.log("err"));
  }, []);
  return (
    <div>
      <h1> {evidenceData.title} </h1>
      <p> Date Created: {evidenceData.procurementdate}</p>
      <p> Date Uploaded: {evidenceData.uploaddate}</p>
      <p> Description: {evidenceData.description}</p>
      <p> Impact Statement: {evidenceData.impactstatement}</p>
      {/* <p> Attachment: {evidenceData.attachment}</p> */}
      <button onClick={() => DownloadImageToS3(evidenceData.attachment)}>View Evidence</button>
      <p> Reviews: </p>
      <Flagged id={evidenceData.users_id} />
      <br />
      <button type="submit" className={" button-primary"}>
        Review
      </button>
      <br />
      <Link to={'/' + viewingProfile}>
        <button>Back</button>
      </Link>
    </div>
  );
}
function Flagged(id) {
  const { auth, setAuth } = useAuth();
  let evidence_id = localStorage.getItem("evidence_id");
  if ((id = auth.user_id)) {
    return (
      <Link to={`/edit-evidence?id=${evidence_id}`}>
        <button>Edit</button>
      </Link>
    );
  } else {
    return null;
  }
}
