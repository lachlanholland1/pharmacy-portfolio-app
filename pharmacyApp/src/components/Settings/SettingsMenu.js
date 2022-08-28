import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function SettingsMenu(props) {
  const { auth } = useAuth();
  return (
    <div>
      <div>
        <Link to={"/" + auth.username}>
          <button>Back</button>
        </Link>
      </div>
      <Link to="/accounts/edit/">Edit profile</Link>
      <br />
      <Link to="/accounts/password/change/">Change password</Link>
    </div>
  );
}

export default SettingsMenu;
