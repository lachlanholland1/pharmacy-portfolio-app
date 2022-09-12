import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ReviewersTable from "./ReviewersTable";
import useAuth from "../../../hooks/useAuth";

function ViewReviewers(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div>
      <Link to={"/" + auth.username}>
        <button className="">Back</button>
      </Link>
      <ReviewersTable />
    </div>
  );
}

export default ViewReviewers;
