import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import DomainsTable from "./DomainsTable";
import style from "./DomainsTableStyle.css";
import useAuth from "../../../hooks/useAuth";

function ViewDomains(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div>
      <Link to={"/" + auth.username}>
        <button className={style.myButton}>Back</button>
      </Link>
      <Link to={"/create-domain"}>
        <button className={style.myButton}>New Domain</button>
      </Link>
      <DomainsTable/>
    </div>
  );
}

export default ViewDomains;
