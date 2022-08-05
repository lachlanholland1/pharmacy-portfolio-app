import React from "react";
import { evidenceMockData } from "./evidenceMockData";

function EvidenceTable(props) {
  return (
    <div>
      <table>
        <tr>
          <th>Title</th>
          <th>Date created</th>
        </tr>
        {evidenceMockData.map((evidence) => (
          <tr>
            <td>{evidence.evidence_title}</td>
            <td>{evidence.date_created}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default EvidenceTable;
