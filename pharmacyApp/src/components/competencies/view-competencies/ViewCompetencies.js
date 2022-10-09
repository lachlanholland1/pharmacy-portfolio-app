import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import CompetenciesTable from "./CompetenciesTable";
import useAuth from "../../../hooks/useAuth";
import style from "./CompetenciesTableStyle.css";

function ViewCompetencies(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div>
      <Link to={"/" + auth.username}>
        <button className={style.myButton}>Back</button>
      </Link>
      <Link to={"/create-competency"}>
        <button className={style.myButton}>New Competency</button>
      </Link>
      <CompetenciesTable/>
    </div>
  );
}

export default ViewCompetencies;
