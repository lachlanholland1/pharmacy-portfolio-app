import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ReviewersTable from "./ReviewersTable";
import useAuth from "../../../hooks/useAuth";
import style from "./ReviewersTableStyle.css";

function ViewReviewers(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div className={style.border}>
      <div className={style.space}>
      <Link to={"/" + auth.username}>
        <button className={style.myButton}>Back</button>
      </Link>
      <Link to={"/create-reviewer"}>
        <button className={style.myButton}>New Reviewer</button>
      </Link>
      </div>
      <ReviewersTable />
    </div>
  );
}

export default ViewReviewers;
