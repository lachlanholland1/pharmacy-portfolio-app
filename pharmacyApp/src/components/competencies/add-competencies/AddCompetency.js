import React from "react";
import AddCompetencyForm from "./AddCompetencyForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import style from "./AddCompetencyStyle.css";

function AddCompetency(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div>
      <Link to={"/view-competencies"}>
        <button className={style.myButton}>Back</button>
      </Link>
      <AddCompetencyForm />
    </div>
  );
}

export default AddCompetency;
