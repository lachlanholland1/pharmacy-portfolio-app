import React from "react";
import AddPerformancecriteriasForm from "./AddPerformancecriteriasForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import style from "./AddPerformancecriteriasStyle.css";

function AddPerformancecriterias(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div>
      <Link to={"/view-Performancecriterias"}>
        <button className={style.myButton}>Back</button>
      </Link>
      <AddPerformancecriteriaForm />
    </div>
  );
}

export default AddPerformancecriteriasForm;
