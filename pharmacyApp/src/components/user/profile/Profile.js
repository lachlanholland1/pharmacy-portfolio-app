import React, { useState, useEffect } from "react";
import EvidenceTable from "./evidence/EvidenceTable";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { data } from "jquery";

function Profile(props) {
  const params = useParams();
  const { auth, setAuth } = useAuth();
  const [username, SetUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [userDetails, setUserDetails] = useState({});

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
        setUserDetails(data);
      });
  }, []);

  return (
    <div>
      {profileLoaded ? (
        <div>
          <br />
          <h1>{userDetails.first_name + " " + userDetails.last_name}</h1>

          <div>{userDetails.username}</div>
          <br />
          <div>{userDetails.bio}</div>
          <br />
          <EvidenceTable />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
