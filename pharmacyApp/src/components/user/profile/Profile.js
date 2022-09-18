import React, { useState, useEffect } from "react";
import EvidenceTable from "./evidence/EvidenceTable";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const profileUrl = window.location.hostname + ":8080" + location.pathname;

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
        setUserDetails(data);
      })
      .then(() => setProfileLoaded(true));
  }, []);

  console.log(userDetails);

  useEffect(() => {
    //Method to download profile picture
    if (!Object.keys(userDetails).length) {
      return;
    }
    const file = userDetails.attachment;
    console.log(file);
    console.log(file);
    console.log(file);
    const type = file.substr(file.length - 3);
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
      .then((data1) => {
        console.log(data1);
        setEvidenceData(data1);
      });
  }, [userDetails]);
  console.log(window.location.hostname);

  function copyProfileLink() {
    var profileLink = document.getElementById("profileLink");
    profileLink.select();
    profileLink.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(profileLink.value);
  }

  return (
    <div>
      {profileLoaded ? (
        <div>
          <br />
          <div className={style.row}>
            <img src={evidenceData.signedUrl} className={style.photo}></img>
            <div>
              <h1 className={style.padding}>
                {userDetails.first_name + " " + userDetails.last_name}
              </h1>
              <h3 className={style.padding}>{userDetails.username}</h3>
              {auth.user && auth.username === params.user ? (
                <div>
                  <input value={profileUrl} readOnly id="profileLink" />
                  <button onClick={copyProfileLink}>Copy</button>
                </div>
              ) : (
                <></>
              )}
              <div className={style.padding}>{userDetails.bio}</div>
            </div>
          </div>
          <br />
          <PrivateAccount userDetails={userDetails} />
          <br />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;

function PrivateAccount(userDetails) {
  const { auth, setAuth } = useAuth();
  if (userDetails.userDetails.private_account = 1){
    if (userDetails.userDetails.user_id = auth.user_id){
      return (<EvidenceTable />);
    }
    else {
      return (<div>This Account is Private.</div>);
    }
  }
  else {
    return (<EvidenceTable />);
  }
}