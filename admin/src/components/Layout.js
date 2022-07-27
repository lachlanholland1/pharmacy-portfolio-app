import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout(props) {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
