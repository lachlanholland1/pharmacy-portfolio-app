import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminsTable from "./AdminsTable";
import useAuth from "../../../hooks/useAuth";
import style from "./AdminsTableStyle.css";

function ViewAdmins(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div className={style.border}>
      <div className={style.padding}>
      <Link to={"/" + auth.username}>
        <button className={style.myButton}>Back</button>
      </Link>
      </div>
      <AdminsTable />
    </div>
  );
}

export default ViewAdmins;
