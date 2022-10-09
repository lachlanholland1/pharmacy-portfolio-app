import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import EditCompetenciesForm from "./EditCompetenciesForm";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditCompetencies(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [competencyData, setcompetencyData] = useState({}); //changed from ([]);
    const { auth, setAuth } = useAuth();

//   const [userData, setUserData] = useState({});
  useEffect(() => {
    const request = {idcompetency: id};
    fetch("/api/getcompetency", { 
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
        .then((data) => {
            setcompetencyData(data.competencies_data);
          });
  }, []);

  return (
    <div>
      {competencyData ? <EditCompetenciesForm competencyData={competencyData} /> : <></>}
    </div>
  );
}

export default EditCompetencies;