import React, { useEffect, useState } from "react";
import { evidenceMockData } from "./evidenceMockData";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";

function EvidenceTable(props) {
  const params = useParams();
  const { auth } = useAuth();
  const [evidenceData, setEvidenceData] = useState([]);
  useEffect(() => {
    fetch("/api/evidence-table", {
      method: "POST",
      body: JSON.stringify({ user: params.user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvidenceData(data.evidence_data);
      });
  }, []);

  return (
    <div>
      <table>
        <tr>
          <th>Title</th>
          <th>Date created</th>
        </tr>
        {evidenceData.map((evidence) => (
          <tr>
            <td>{evidence.title}</td>
            <td>{evidence.description}</td>
            <td>{evidence.impactstatement}</td>
            <td>{evidence.procurementdate}</td>
            <td>{evidence.attachment}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default EvidenceTable;
