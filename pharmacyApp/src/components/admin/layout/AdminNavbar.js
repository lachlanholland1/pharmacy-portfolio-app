import React, { useState } from "react";
import SignOutButton from "../../../SignOutButton";
import style from "./navBar.css";
import useAuth from "../../../hooks/useAuth";

function AdminNavbar(props) {
  const { auth, setAuth } = useAuth();
  return (
    <nav className={style.navBox}>
      <a className={style.nav} href="/view-reviewers">
        Reviewers
      </a>
      <a className={style.nav} href="/view-admins">
        Administrators
      </a>
      <a className={style.nav} href="/view-domains">
        Domains
      </a>
      <a className={style.nav} href="/view-standards">
        Standards
      </a>
      <a className={style.nav} href="/view-competencies">
        Competencies
      </a>
      <a className={style.nav} href="/view-performancecriterias">
        Performance Criteria
      </a>
      <a className={style.nav} href={"/" + auth.username }>
        Profile
      </a>
      <SignOutButton />
    </nav>
  );
}

export default AdminNavbar;
