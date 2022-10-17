import React from "react";
import CreateAdminForm from "./CreateAdminForm";
import { Link } from "react-router-dom";
import style from "./style.css";

function CreateAdmin(props) {
  return (
      <div className={style.border}>
        <Link to={"/view-admins"}>
          <button className={style.myButton2}>Back</button>
        </Link>
        <CreateAdminForm />
    </div>
  );
}

export default CreateAdmin;
