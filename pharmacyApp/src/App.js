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
import AddEvidence from "./components/add-evidence/AddEvidence";
import CreateAdmin from "./components/admin/create-admin/CreateAdmin";
import CreateReviewer from "./components/reviewers/CreateReviewer";
import UploadImageToS3WithNativeSdk from "../UploadImageToS3WithNativeSdk";
import EditAccount from "./components/edit-account/EditAccount";
import PasswordChange from "./components/password-change/PasswordChange";

function App(props) {
  return (
    <Routes element={<HomeLayout />}>
      {/* public routes */}
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="admin" element={<CreateAdmin />} />
      <Route path="reviewer" element={<CreateReviewer />} />
      {/* this is a test and will need to be deleted///played with */}
      <Route path="upload" element={<UploadImageToS3WithNativeSdk />} />
      {/* this is a test and will need to be deleted///played with */}
      <Route element={<UserLayout />}>
        <Route path="/:user" element={<Profile />} />
        <Route path="/add-evidence" element={<AddEvidence />} />
        <Route path="/accounts/edit/" element={<EditAccount />} />
        <Route path="/accounts/password/change" element={<PasswordChange />} />
      </Route>
      {/* private/admin routes */}
      <Route element={<AdminLayout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/" index element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
