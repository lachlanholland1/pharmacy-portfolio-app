import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function UserCard(props) {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      <div>{auth.username}</div>
      {location.pathname == "/accounts/edit/" ? (
        <Link to="/">Change profile photo</Link>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserCard;
