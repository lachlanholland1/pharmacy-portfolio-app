import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import {
  useParams,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./EvidenceTableStyle.css";
import Moment from "moment";

function PeerReviewTable() {
  let navigate = useNavigate();
  const params = useParams();
  const { auth } = useAuth();
  const [evidenceData, setEvidenceData] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    fetch("/api/get-all-peer-reviews", {
      method: "POST",
      body: JSON.stringify({ evidenceitems_id: id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvidenceData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleOnClick(reviewid, peerid) {
    return navigate(
      `/view-peer-review/?id=${id}&reviewid=${reviewid}&peerid=${peerid}`
    );
  }

  return (
    <div>
      <h3>Peer Reviews</h3>
      {evidenceData.length ? (
        <table className={style.table}>
          <tr table className={style.tr}>
            <th>Reviewer</th>
            <th>Review Date</th>
            <th>Discrepencies</th>
            <th>View</th>
          </tr>

          <tbody>
            {evidenceData.map((evidence, index) => (
              <tr
                onClick={() =>
                  handleOnClick(
                    evidence.evidencereviews_id,
                    evidence.peerreview_id
                  )
                }
                table
                className={style.tr2}
                key={index}
              >
                <td>
                  {evidence.firstname} {evidence.surname}
                </td>

                <td>
                  {Moment(evidence.reviewdate, "YYYY-MM-DD").format(
                    "DD/MM/YYYY"
                  )}
                </td>
                <td>{evidence.discrepencies}</td>
                <td>
                  <button
                    className={style.myButton}
                    onClick={() =>
                      handleOnClick(
                        evidence.evidencereviews_id,
                        evidence.peerreview_id
                      )
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>This evidence has not been peer reviewed,</>
      )}
    </div>
  );
}

export default PeerReviewTable;
