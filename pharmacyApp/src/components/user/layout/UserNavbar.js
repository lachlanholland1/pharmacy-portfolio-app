import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import SignOutButton from "../../../SignOutButton";
import { Link } from "react-router-dom";
import style from "./UserLayout.css";

function UserNavbar(props) {
  const { auth, setAuth } = useAuth();
  const params = useParams();
  return (
    <nav className="">
    <div className={style.padding}>
      {auth.user && auth.username === params.user ? (
        <Link to={"/accounts/edit/"}>
          <button className={style.myButton}>Settings</button>
        </Link>
      ) : (
        <></>
      )}
      {auth.user && auth.username === params.user ? <SignOutButton /> : <></>}

      <a className="" href="/"></a>
      </div>
    </nav>
  );
}

export default UserNavbar;
