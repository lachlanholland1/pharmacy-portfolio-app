import { Routes, Route } from "react-router-dom";
import React, { withRouter, useState, useEffect } from "react";
import Login from "./components/sign-in/SignInForm";
import AdminLayout from "./components/admin/layout/AdminLayout";
import UserLayout from "./components/user/layout/UserLayout";
import Profile from "./components/user/profile/Profile";
import PrivateUserRoute from "./PrivateUserRoute";
import PrivateAdminRoute from "./PrivateAdminRoute";
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
import ViewAdmins from "./components/admin/view-admin/ViewAdmins";
import ViewReviewers from "./components/reviewers/view-reviewers/ViewReviewers";
import EvidenceReview from "./components/evidence-review/EvidenceReview";
import AddDomain from "./components/domains/add-domains/AddDomain";
import ViewDomains from "./components/domains/view-domains/ViewDomains";
import PeerReview from "./components/peer-review/PeerReview";
import ViewReview from "./components/view-review/ViewReview";
import PublicRoute from "./PublicRoute";
import SelfReview from "./components/self-review/SelfReview";
import ViewPeerReview from "./components/view-review/ViewPeerReview";
import EditDomains from "./components/domains/edit-domains/EditDomains";
import AddStandard from "./components/standards/add-standards/AddStandard";
import ViewStandards from "./components/standards/view-standards/ViewStandards";
import ViewCompetencies from "./components/competencies/view-competencies/ViewCompetencies";
import AddCompetency from "./components/competencies/add-competencies/AddCompetency";
import ViewPerformancecriterias from "./components/performancecriterias/view-performancecriterias/ViewPerformancecriterias";
import AddPerformancecriterias from "./components/performancecriterias/add-performancecriterias/AddPerformancecriterias";
import EditStandards from "./components/standards/edit-standards/EditStandards";
import EditCompetencies from "./components/competencies/edit-competencies/EditCompetencies";
import EditPerformancecriterias from "./components/performancecriterias/edit-performancecriterias/EditPerformancecriterias";
import EditSelfReview from "./components/self-review/EditSelfReview";
import DeleteEvidence from "./components/editEvidence/DeleteEvidence";
import DeletePeerReview from "./components/view-review/DeletePeerReview";

function App(props) {
  return (
    <Routes>
      {/* Public Only */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      {/* User*/}
      <Route element={<UserLayout />}>
        {/* User and Public*/}
        <Route path="/:user" element={<Profile />} />
        <Route path="/view-review" element={<ViewReview />} />
        <Route path="/view-peer-review" element={<ViewPeerReview />} />
        <Route path="/evidence" element={<ViewEvidence />} />
        <Route path="/evidence-review/:id" element={<EvidenceReview />} />
        {/* User Only */}
        <Route element={<PrivateUserRoute />}>
          <Route
            path="/accounts/password/change"
            element={<PasswordChange />}
          />
          <Route path="/edit-self-review" element={<EditSelfReview />} />
          <Route path="/add-evidence" element={<AddEvidence />} />
          <Route path="/create-self-review" element={<SelfReview />} />
          <Route path="/peer-review" element={<PeerReview />} />
          <Route path="/accounts/edit/" element={<EditAccount />} />
          <Route path="/edit-evidence" element={<EditEvidence />} />
          <Route path="/delete-evidence" element={<DeleteEvidence />} />
          <Route path="/delete-peer-review" element={<DeletePeerReview />} />
        </Route>
      </Route>
      {/* Admin Only */}
      <Route element={<PrivateAdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/view-admins" element={<ViewAdmins />} />
          <Route path="/view-reviewers" element={<ViewReviewers />} />
          <Route path="/create-standard" element={<AddStandard />} />
          <Route path="/view-standards" element={<ViewStandards />} />
          <Route path="/edit-standards" element={<EditStandards />} />
          <Route path="/view-domains" element={<ViewDomains />} />
          <Route path="/edit-domains" element={<EditDomains />} />
          <Route path="/create-domain" element={<AddDomain />} />
          <Route path="/create-competency" element={<AddCompetency />} />
          <Route path="/view-competencies" element={<ViewCompetencies />} />
          <Route path="/edit-competencies" element={<EditCompetencies />} />
          <Route path="/view-competencies" element={<ViewCompetencies />} />
          <Route
            path="/view-performancecriterias"
            element={<ViewPerformancecriterias />}
          />
          <Route
            path="/edit-performancecriterias"
            element={<EditPerformancecriterias />}
          />
          <Route
            path="/create-performancecriteria"
            element={<AddPerformancecriterias />}
          />
          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route path="/create-reviewer" element={<CreateReviewer />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
