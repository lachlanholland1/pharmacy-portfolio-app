import React from "react";
import AddDomainForm from "./AddDomainForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import style from "./AddDomainStyle.css";

function AddDomain(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div>
      <Link to={"/view-domains"}>
        <button className={style.myButton}>Back</button>
      </Link>
      <AddDomainForm />
    </div>
  );
}

export default AddDomain;
