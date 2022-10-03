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
    <div>
      <Link to={"/" + auth.username}>
        <button className={style.myButton}>Back</button>
      </Link>
      <Link to={"/create-performancecriteria"}>
        <button className={style.myButton}>New Performance Criteria</button>
      </Link>
      <PerformancecriteriasTable/>
    </div>
  );
}

export default ViewPerformancecriterias;
