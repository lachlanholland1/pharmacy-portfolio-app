import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import EditPerformancecriteriasForm from "./EditPerformancecriteriasForm";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditPerformancecriterias(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [performancecriteriaData, setperformancecriteriaData] = useState({}); //changed from ([]);
    const { auth, setAuth } = useAuth();

//   const [userData, setUserData] = useState({});

  useEffect(() => {
    const request = {idperformancecriteriaitems: id};
    fetch("/api/getperformancecriteria", { 
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
        .then((data) => {
            setperformancecriteriaData(data.performancecriterias_data);
          });
  }, []);

  return (
    <div>
      {performancecriteriaData ? <EditPerformancecriteriasForm performancecriteriaData={performancecriteriaData} /> : <></>}
    </div>
  );
}

export default EditPerformancecriterias;