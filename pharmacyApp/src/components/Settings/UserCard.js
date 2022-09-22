import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import style from "./styles.css";

function UserCard(props) {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      {location.pathname == "/accounts/edit/" ? (
        <Link to="/">
          <button className={style.myButton2}>Change profile photo</button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserCard;
