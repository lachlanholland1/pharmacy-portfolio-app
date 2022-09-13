import React, { useState, useEffect } from "react";
import EvidenceTable from "./evidence/EvidenceTable";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import style from "./Profile.css";


function Profile(props) {
  const params = useParams();
  const { auth, setAuth } = useAuth();
  const [username, SetUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [evidenceData, setEvidenceData] = useState({});

  localStorage.setItem("profile", params.user);
  

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
        console.log(data);
        //Method to download profile picture
        const file = data.attachment;
        const type = file.substr(file.length -3);
        const requestObject = {
          fileName: file,
          fileType: type,
        };
        fetch("/api/download", {
      method: "POST",
      body: JSON.stringify(requestObject),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data1) => {console.log(data1);setEvidenceData(data1)});
      });          
  }, []);

  return (
    <div>
      {profileLoaded ? (
        <div>
          <br />
          <img src= {evidenceData.signedUrl} className={style.photo} ></img>
          <h1 className={style.padding}>{userDetails.first_name + " " + userDetails.last_name}</h1>
          <div className={style.padding}>{userDetails.username}</div>
          <br />
          <div className={style.padding}>{userDetails.bio}</div>
          <br />
          <EvidenceTable />
          <br />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
