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
    <div className={style.border}>
      <Link to={"/view-Performancecriterias"}>
        <button className={style.myButton2}>Back</button>
      </Link>
      <AddPerformancecriteriasForm />
    </div>
  );
}

export default AddPerformancecriterias;
