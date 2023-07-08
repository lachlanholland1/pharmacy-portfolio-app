import React from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

function UserCard(props) {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <div>
      {/* {location.pathname == "/accounts/edit/" ? (
        <Link to="/">
          <button className={style.myButton2}>Change profile photo</button>
        </Link>
      ) : (
        <></>
      )} */}
    </div>
  );
}

export default UserCard;
