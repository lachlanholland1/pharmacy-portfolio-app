import { Routes, Route } from "react-router-dom";
import React, { withRouter, useState, useEffect } from "react";
import Login from "./components/sign-in/SignIn";
import AdminLayout from "./components/admin/layout/AdminLayout";
import UserLayout from "./components/user/layout/UserLayout";
import Profile from "./components/user/profile/Profile";
import PrivateRoute from "./PrivateRoute";
import "./styles.css";
import HomeLayout from "./components/HomeLayout";
import SignUp from "./components/sign-up/SignUp";
import Dashboard from "./components/admin/dashboard/Dashboard";
import CreateEvidence from "./components/create-evidence/CreateEvidence";

function App(props) {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="evidence" element={<CreateEvidence />} />
        <Route element={<UserLayout />}>
          <Route path="/:user" element={<Profile />} />
        </Route>
        {/* private/admin routes */}
        <Route element={<AdminLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" index element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
