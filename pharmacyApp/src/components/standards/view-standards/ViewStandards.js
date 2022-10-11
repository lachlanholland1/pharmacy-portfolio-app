import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import StandardsTable from "./StandardsTable";
import useAuth from "../../../hooks/useAuth";
import style from "./StandardsTableStyle.css";

function ViewStandards(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div className={style.border}>
      <div className={style.space}>
      <Link to={"/"}>
        <button className={style.myButton}>Back</button>
      </Link>
      <Link to={"/create-standard"}>
        <button className={style.myButton}>New Standard</button>
      </Link>
      </div>
      <StandardsTable/>
    </div>
  );
}

export default ViewStandards;
