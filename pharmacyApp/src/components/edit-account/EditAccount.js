import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import EditAccountForm from "./EditAccountForm";
import { Link } from "react-router-dom";
import SettingsMenu from "../Settings/SettingsMenu";
import UserCard from "../Settings/UserCard";

function EditAccount(props) {
  const [userData, setUserData] = useState({});
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const request = { access_token: auth.access_token, user_id: auth.user_id };
    fetch("/api/auth-user", {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((err) => {});
  }, []);

  return (
    <div>
      <SettingsMenu />
      <UserCard />
      {userData ? <EditAccountForm userData={userData} /> : <></>}
    </div>
  );
}

export default EditAccount;
