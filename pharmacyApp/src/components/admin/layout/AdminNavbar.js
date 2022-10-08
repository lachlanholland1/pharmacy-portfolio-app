import React, { useState } from "react";
import SignOutButton from "../../../SignOutButton";
import style from "./navBar.css";

function AdminNavbar(props) {
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
      <SignOutButton />
    </nav>
  );
}

export default AdminNavbar;
