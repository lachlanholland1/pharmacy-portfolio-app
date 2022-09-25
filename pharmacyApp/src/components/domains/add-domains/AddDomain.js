import React from "react";
import AddDomainForm from "./AddDomainForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

function AddDomain(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <div>
      <Link to={"/" + auth.username}>
        <button className="">Back</button>
      </Link>
      <AddDomainForm />
    </div>
  );
}

export default AddDomain;
