import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

  function handleOnClick (userid) {
    return(navigate(`/evidence?id=${userid}`))
  };
  
  return (
    <div>
      {auth.user && auth.username === params.user ? (
        <Link to={"/add-evidence"}>
          <button>Add evidence</button>
        </Link>
      ) : (
        <></>
      )}
      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Impact statement</th>
          <th>Procurement date</th>
          <th>Attachment</th>
        </tr>
        <tbody>
          {evidenceData.length ? (
            evidenceData.map((evidence) => (
              <tr onClick={() => handleOnClick(evidence.idevidenceitems)}>
                <td>{evidence.title}</td>
                <td>{evidence.description}</td>
                <td>{evidence.impactstatement}</td>
                <td>{evidence.procurementdate}</td>
                <td>{evidence.attachment}</td>
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
