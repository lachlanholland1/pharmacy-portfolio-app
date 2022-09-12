import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./ReviewersTableStyle.css";
import { confirmAlert } from "react-confirm-alert";


export default function ReviewersTable(props) {
  let navigate = useNavigate();
  const params = useParams();
  const { auth } = useAuth();
  const [reviewerData, setreviewerData] = useState([]);
  useEffect(() => {
    fetch("/api/reviewers-table", {
      method: "POST",
      body: JSON.stringify({ user: params.user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setreviewerData(data.reviewers_data);
      });
  }, []);

  const submit = (reviewer_id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure want to remove the user as a reviewer?",
      buttons: [
        {
          label: "Yes",
          // onClick: () => alert("Click Yes")
          onClick: () => fetch("/api/deletereviewer", {
            method: "POST",
            body: JSON.stringify({reviewer_id: reviewer_id}),
            headers: { "Content-Type": "application/json" }
          })
            .then((res) => res.json())
            .then(navigate("/view-reviewers"))
        },
        {
          label: "No",
          onClick: () => navigate("/view-reviewers")
          //onClick: () => alert("Click No")
        }
      ]
    });
  };

  // function handleOnClick(userid) {
  //   return navigate(`/evidence?id=${userid}`);
  // }

  return (
    <div>
      <div className={style.padding}>
        <h2>Reviewers</h2>
      </div>
      <table className={style.table}>
        <tr table className={style.tr}>
          <th>User Email</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        <tbody>
          {reviewerData.length ? (
            reviewerData.map((reviewer) => (
              <tr table className={style.tr1}>
                <td>{reviewer.email}</td>
                <td>
                  {reviewer.firstname} {reviewer.surname}
                </td>
                <td >
                  {/* Need to validate that the current reviewer has Alter privileges */}
                    <button className={style.myButton} onClick={() => submit(reviewer.idreviewers)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <>
              <div>No Reviewers.</div>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
