import React, { useState } from "react";
import SignOutButton from "../../../SignOutButton";

function AdminNavbar(props) {
  return (
    <nav className="">
      <a className="" href="/view-reviewers">
        Reviewers
      </a>
      <a className="" href="/view-admins">
        Administrators
      </a>
      <a className="" href="/view-domains">
        Domains
      </a>
      <a className="" href="/view-standards">
        Standards
      </a>
      <a className="" href="/view-competencies">
        Competencies
      </a>
      <a className="" href="/view-performancecriterias">
        Performance Criteria
      </a>
      <SignOutButton />
    </nav>
  );
}

export default AdminNavbar;
