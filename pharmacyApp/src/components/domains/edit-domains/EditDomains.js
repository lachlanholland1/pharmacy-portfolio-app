import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import EditDomainsForm from "./EditDomainsForm";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditDomains(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [domaindata, setdomaindata] = useState({}); //changed from ([]);
    const { auth, setAuth } = useAuth();

  console.log("wtf" +id);

  useEffect(() => {
    const request = {iddomains: id};
    fetch("/api/getdomain", { 
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
        .then((data) => {
          console.log(data.domains_data);
          setdomaindata(data.domains_data);
          });
  }, []);

console.log(domaindata);

  return (
    <div>
      {domaindata ? <EditDomainsForm domaindata={domaindata} /> : <></>}
    </div>
  );
}

export default EditDomains;