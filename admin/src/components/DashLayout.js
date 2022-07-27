import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DashFooter from "./DashFooter";
import { Outlet } from "react-router-dom";
function DashLayout(props) {
  return (
    <div>
      <Navbar />
      <Outlet />
      <DashFooter />
    </div>
  );
}

export default DashLayout;
