import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminsTable from "./AdminsTable";
import useAuth from "../../../hooks/useAuth";

function ViewAdmins(props) {
  console.log("<<<<");
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div>
      <Link to={"/" + auth.username}>
        <button className="">Back</button>
      </Link>
      <AdminsTable />
    </div>
  );
}

export default ViewAdmins;
