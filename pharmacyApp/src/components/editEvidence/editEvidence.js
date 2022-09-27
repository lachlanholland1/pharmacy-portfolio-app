import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import EditEvidenceForm from "./editEvidenceForm";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditEvidence(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [evidenceData, setEvidenceData] = useState({}); //changed from ([]);
    const { auth, setAuth } = useAuth();

//   const [userData, setUserData] = useState({});


  useEffect(() => {
    const request = {idevidenceitems: id};
    fetch("/api/viewevidence", { 
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
        .then((details) => {
          console.log(details);
            setEvidenceData(details.evidence_data);
          });
  }, []);

  return (
    <div>
      {evidenceData ? <EditEvidenceForm evidenceData={evidenceData} /> : <></>}
    </div>
  );
}

export default EditEvidence;