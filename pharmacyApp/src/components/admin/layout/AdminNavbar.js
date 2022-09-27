import React, { useState } from "react";
import SignOutButton from "../../../SignOutButton";

function AdminNavbar(props) {
  return (
    <nav className="">
      <a className="" href="/view-reviewers">Reviewers</a>
      <a className="" href="/view-admins">Administrators</a>
      <SignOutButton />
    </nav>
  );
}

export default AdminNavbar;
