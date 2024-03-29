import React from "react";
import AddStandardForm from "./AddStandardForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import style from "./AddStandardStyle.css";

function AddStandard(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div className={style.border}>
      <Link to={"/view-standards"}>
        <button className={style.myButton2}>Back</button>
      </Link>
      <AddStandardForm />
    </div>
  );
}

export default AddStandard;
