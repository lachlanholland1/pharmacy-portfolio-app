import { Routes, Route } from "react-router-dom";
import React, { withRouter, useState, useEffect } from "react";
import Login from "./components/Login";
import DashLayout from "./components/DashLayout";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import "./styles.css";
import Layout from "./components/Layout";

function App(props) {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        {/* private routes */}
        <Route element={<DashLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" index element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
