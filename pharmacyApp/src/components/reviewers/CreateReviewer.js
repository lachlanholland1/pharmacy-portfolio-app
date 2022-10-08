import React from "react";
import CreateReviewerForm from "./CreateReviewerForm";
import { Link } from "react-router-dom";
import style from "./style.css";

function CreateReviewer(props) {
  return (
    <div className={style.border}>
        <Link to={"/view-reviewers"}>
          <button className={style.myButton2}>Back</button>
        </Link>
      <CreateReviewerForm />
    </div>
  );
}

export default CreateReviewer;
