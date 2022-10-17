import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import style from "./style.css";

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
    <div className={style.border}>
      <h1> Administrator Dashboard</h1>
      {/* {profileLoaded ? (
        <div>
          <div>{firstName + " " + lastName}</div>
          <div>{username}</div>
          <br />
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
}

export default Dashboard;
