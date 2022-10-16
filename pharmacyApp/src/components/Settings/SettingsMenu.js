import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import style from "./styles.css";

function SettingsMenu(props) {
  const { auth } = useAuth();
  return (
    <div>
    <div className={style.padding}>
      <div className={style.spacing}>
        <Link to={"/" + auth.username}>
          <button className={style.myButton2}>Back</button>
        </Link>
      </div>
      <div className={style.spacing}>{auth.username}</div>
      <Link to="/accounts/edit/">
        <button className={style.myButton2}>Edit profile</button>
      </Link>
      <br />
      <br />
      <Link to="/accounts/password/change/">
        <button className={style.myButton2}>Change password</button>
      </Link>
    </div>
    </div>
  );
}

export default SettingsMenu;
