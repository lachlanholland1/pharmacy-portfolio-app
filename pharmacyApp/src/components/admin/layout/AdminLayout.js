import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import { Outlet } from "react-router-dom";
function AdminLayout(props) {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
      <AdminFooter />
    </div>
  );
}

export default AdminLayout;
