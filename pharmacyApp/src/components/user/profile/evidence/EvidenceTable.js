import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function EvidenceTable(props) {
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

  return (
    <div>
      {auth.user && auth.username === params.user ? (
        <Link to={"/add-evidence"}>
          <button>Add evidence</button>
        </Link>
      ) : (
        <></>
      )}
      <h2>Evidence</h2>
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
              <tr>
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
