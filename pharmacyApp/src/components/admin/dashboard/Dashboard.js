import React, { useState, useEffect } from "react";
import EvidenceTable from "../../portfolio/evidence/EvidenceTable";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function Dashboard(props) {
  const params = useParams();
  const { auth } = useAuth();
  const [username, SetUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const request = {
      auth: auth,
    };
    fetch("/api/profile/" + params.user, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileLoaded(true);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        SetUserName(data.username);
      });
  }, []);
  return (
    <div>
      {profileLoaded ? (
        <div>
          <div>{firstName + " " + lastName}</div>
          <div>{username}</div>
          <br />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Dashboard;
