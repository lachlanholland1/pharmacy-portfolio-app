import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import EditStandardsForm from "./EditStandardsForm";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditStandards(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [standardData, setstandardData] = useState({}); //changed from ([]);
    const { auth, setAuth } = useAuth();

//   const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const request = {idstandarditems: id};
    fetch("/api/getstandard", { 
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
        .then((data) => {
            setstandardData(data.standards_data);
          });
  }, []);

  return (
    <div>
      {standardData ? <EditStandardsForm standardData={standardData} /> : <></>}
    </div>
  );
}

export default EditStandards;