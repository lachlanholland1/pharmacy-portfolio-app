import React, { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";
import { Outlet } from "react-router-dom";

function UserLayout(props) {
  return (
    <div>
      <UserNavbar />
      <Outlet />
      <UserFooter />
    </div>
  );
}

export default UserLayout;
