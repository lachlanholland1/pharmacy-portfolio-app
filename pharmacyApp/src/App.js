import { Routes, Route } from "react-router-dom";
import React, { withRouter, useState, useEffect } from "react";
import Login from "./components/sign-in/SignIn";
import DashLayout from "./components/DashLayout";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import "./styles.css";
import Layout from "./components/Layout";
import SignUp from "./components/sign-up/SignUp";

function App(props) {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
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
