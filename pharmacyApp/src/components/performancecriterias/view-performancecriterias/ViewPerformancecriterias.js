import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import PerformancecriteriasTable from "./PerformancecriteriasTable";
import style from "./PerformancecriteriasTableStyle.css";
import useAuth from "../../../hooks/useAuth";

function ViewPerformancecriterias(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div className={style.border}>
      <div className={style.space}>
      <Link to={"/"}>
        <button className={style.myButton}>Back</button>
      </Link>
      <Link to={"/create-performancecriteria"}>
        <button className={style.myButton2}>New Performance Criteria</button>
      </Link>
      </div>
      <PerformancecriteriasTable/>
    </div>
  );
}

export default ViewPerformancecriterias;
