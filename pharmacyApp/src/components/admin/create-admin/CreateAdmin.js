import React from "react";
import CreateAdminForm from "./CreateAdminForm";
import { Link } from "react-router-dom";
import style from "./style.css";

function CreateAdmin(props) {
  return (
      <div>
        <Link to={"/view-admins"}>
          <button className={style.myButton}>Back</button>
        </Link>
        <CreateAdminForm />
    </div>
  );
}

export default CreateAdmin;


