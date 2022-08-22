import React, { useState } from "react";
import SignOutButton from "../../../SignOutButton";

function AdminNavbar(props) {
  return (
    <nav className="">
      <a className="" href="/"></a>
      <SignOutButton />
    </nav>
  );
}

export default AdminNavbar;
