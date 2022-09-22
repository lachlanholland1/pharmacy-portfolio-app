import { Routes, Route } from "react-router-dom";
import React, { withRouter, useState, useEffect } from "react";
import Login from "./components/sign-in/SignInForm";
import AdminLayout from "./components/admin/layout/AdminLayout";
import UserLayout from "./components/user/layout/UserLayout";
import Profile from "./components/user/profile/Profile";
// import PrivateRoute from "./PrivateRoute";
import "./styles.css";
import HomeLayout from "./components/HomeLayout";
import SignUp from "./components/sign-up/SignUpForm";
import Dashboard from "./components/admin/dashboard/Dashboard";
import AddEvidence from "./components/add-evidence/AddEvidence";
import CreateAdmin from "./components/admin/create-admin/CreateAdmin";
import CreateReviewer from "./components/reviewers/CreateReviewer";
import EditAccount from "./components/edit-account/EditAccount";
import PasswordChange from "./components/password-change/PasswordChange";
import ViewEvidence from "./components/user/profile/evidence/viewEvidence";
import EditEvidence from "./components/editEvidence/editEvidence";
import ReviewEvidence from "./components/review-evidence/ReviewEvidence";
import ViewAdmins from "./components/admin/view-admin/ViewAdmins";
import ViewReviewers from "./components/reviewers/view-reviewers/ViewReviewers";
import EvidenceReview from "./components/evidence-review/EvidenceReview";

function App(props) {
  return (
    <Routes element={<HomeLayout />}>
      {/* public routes */}
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="/create-admin" element={<CreateAdmin />} />
      <Route path="/create-reviewer" element={<CreateReviewer />} />
      <Route path="/evidence" element={<ViewEvidence />} />
      <Route path="/edit-evidence" element={<EditEvidence />} />
      <Route path="/view-admins" element={<ViewAdmins />} />
      <Route path="/view-reviewers" element={<ViewReviewers />} />
      <Route path="/evidence-review/:id" element={<EvidenceReview />} />
      <Route element={<UserLayout />}>
        <Route path="/:user" element={<Profile />} />
        <Route path="/add-evidence" element={<AddEvidence />} />
        <Route path="/review-evidence" element={<ReviewEvidence />} />
        <Route path="/accounts/edit/" element={<EditAccount />} />
        <Route path="/accounts/password/change" element={<PasswordChange />} />
      </Route>
      {/* private/admin routes */}
      <Route element={<AdminLayout />}>
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" index element={<Dashboard />} />
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
