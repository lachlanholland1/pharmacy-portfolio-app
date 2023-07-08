import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./EvidenceTableStyle.css";
import DownloadImageToS3 from "../../../../DownloadFileToS3";
import Moment from "moment";

function EvidenceTable() {
  let navigate = useNavigate();
  const params = useParams();
  const { auth } = useAuth();
  const [evidenceData, setEvidenceData] = useState([]);
  useEffect(() => {
    fetch("/api/evidence-table", {
      method: "POST",
      body: JSON.stringify({ user: params.user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((data) => {
        setEvidenceData(data.evidence_data);
      })
      .catch((err) => { });
  }, []);

  function handleOnClick(userid) {
    return navigate(`/evidence?id=${userid}`);
  }
  return (
    <div>
      <div className={style.padding}>
        {auth.user && auth.username === params.user ? (
          <Link to={"/add-evidence"}>
            <button className={style.myButton2}>Add Evidence</button>
          </Link>
        ) : (
          <></>
        )}

        <h2>Evidence</h2>
      </div>
      {evidenceData.length ? (
        <table className={style.table}>
          <tr table className={style.tr}>
            <th>Title</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Attachment</th>
          </tr>
          <tbody>
            {evidenceData.map((evidence, index) => (
              <tr
                onClick={() => handleOnClick(evidence.idevidenceitems)}
                table
                className={style.tr2}
                key={index}
              >
                <td>{evidence.title}</td>
                <td>{evidence.description.substring(0, 80)} {evidence.description.length > 80 ? ("...") :("") }</td>
                <td>
                  {Moment(evidence.procurementdate, "YYYY-MM-DD").format(
                    "DD/MM/YYYY"
                  )}
                </td>
                <td>
                  <button
                    className={style.myButton}
                    onClick={() => DownloadImageToS3(evidence.attachment)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>No evidence has been added yet.</>
      )}
    </div>
  );
}

export default EvidenceTable;
