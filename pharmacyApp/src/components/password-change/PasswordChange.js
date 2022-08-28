import React, { useState, useEffect } from "react";
import UserCard from "../Settings/UserCard";
import PasswordChangeForm from "./PasswordChangeForm";
import SettingsMenu from "../Settings/SettingsMenu";

function PasswordChange(props) {
  return (
    <div>
      <SettingsMenu />
      <UserCard />
      <PasswordChangeForm />
    </div>
  );
}

export default PasswordChange;
