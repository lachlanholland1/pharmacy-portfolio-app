import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminsTable from "./AdminsTable";

function ViewAdmins(props) {
  console.log("<<<<");
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <Link to={"/" + auth.username}>
      <button className={style.myButton2}>Back</button>
      </Link>
      <AdminsTable />
    </div>
  );
}

export default ViewAdmins;
