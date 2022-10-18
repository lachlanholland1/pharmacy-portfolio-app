import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import style from "./style.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function DeletePeerReview(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const peerid = searchParams.get("peerid");
  const [evidenceData, setEvidenceData] = useState({}); //changed from ([]);
  const { auth, setAuth } = useAuth();

  //   const [userData, setUserData] = useState({});

  function submit() {
    fetch("/api/delete-peer-review", {
      method: "POST",
      body: JSON.stringify({
        peerreview_id: peerid,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(navigate(`/evidence?id=${id}`));
  }

  return (
    <div className={style.container}>
      <div className={style.sign}>
        <br />

        <h2 className={style.center}>
          Are you sure you want to delete this peer review?
        </h2>
        <br />
        <div className={style.buttonSpace}>
          <button className={style.myButton2} onClick={submit}>
            Yes
          </button>
          <Link to={`/evidence?id=${id}`}>
            <button className={style.myButton2}>No</button>
          </Link>
        </div>
        <br />
        <br />
        <div className={style.buttonSpace}>
          <Link to={`/evidence?id=${id}`}>
            <button className={style.myButton2}>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeletePeerReview;
