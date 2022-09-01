import React from "react";
import CreateEvidenceForm from "./AddEvidenceForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import style from "./AddEvidenceStyle.css";

function AddEvidence(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div>
      <Link to={"/" + auth.username}>
        <button className={style.myButton2}>Back</button>
      </Link>
      <CreateEvidenceForm />
    </div>
  );
}

export default AddEvidence;
