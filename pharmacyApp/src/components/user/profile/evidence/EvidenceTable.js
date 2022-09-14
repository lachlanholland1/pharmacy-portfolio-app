import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./EvidenceTableStyle.css";
import DownloadImageToS3 from "../../../../DownloadFileToS3";

function EvidenceTable(props) {
  let navigate = useNavigate();
  const params = useParams();
  const { auth } = useAuth();
  const [evidenceData, setEvidenceData] = useState([]);
  console.log(params.user);
  useEffect(() => {
    fetch("/api/evidence-table", {
      method: "POST",
      body: JSON.stringify({ user: params.user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEvidenceData(data.evidence_data);
      });
  }, []);

  function handleOnClick(userid) {
    return navigate(`/evidence?id=${userid}`);
  }

  return (
    <div>
      <div className={style.padding}>
        {auth.user && auth.username === params.user ? (
          <Link to={"/add-evidence"}>
            <button className={style.myButton}>Add evidence</button>
          </Link>
        ) : (
          <></>
        )}
        <h2>Evidence</h2>
      </div>
      <table className={style.table}>
        <tr table className={style.tr}>
          <th>Title</th>
          <th>Description</th>
          <th>Impact statement</th>
          <th>Procurement date</th>
          <th>Attachment</th>
        </tr>
        <tbody>
          {evidenceData.length ? (
            evidenceData.map((evidence) => (
              <tr
                onClick={() => handleOnClick(evidence.idevidenceitems)}
                table
                className={style.tr2}
              >
                <td>{evidence.title}</td>
                <td>{evidence.description}</td>
                <td>{evidence.impactstatement}</td>
                <td>{evidence.procurementdate}</td>
                <td><button className={style.myButton} onClick={() => DownloadImageToS3(evidence.attachment)}>View Evidence</button></td>
              </tr>
            ))
          ) : (
            <>
              <div>No evidence.</div>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EvidenceTable;
