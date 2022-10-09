import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import EditDomainsForm from "./EditDomainsForm";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditDomains(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [domainData, setdomainData] = useState({}); //changed from ([]);
    const { auth, setAuth } = useAuth();

//   const [userData, setUserData] = useState({});

  useEffect(() => {
    const request = {iddomainitems: id};
    fetch("/api/getdomain", { 
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
        .then((data) => {
            setdomainData(data.domains_data);
          });
  }, []);

  return (
    <div>
      {domainData ? <EditDomainsForm domainData={domainData} /> : <></>}
    </div>
  );
}

export default EditDomains;