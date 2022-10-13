const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require("multer");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const fs = require("fs");
const path = require("path");

const session = require("express-session");

//Auth
const loginRouter = require("./pharmacy_routes/authenticate/auth_routes/login.js");
const logoutRouter = require("./pharmacy_routes/authenticate/auth_routes/logout.js");
const authenticateRouter = require("./pharmacy_routes/authenticate/auth_routes/authenticate.js");
const createAdminRouter = require("./pharmacy_routes/createAdmin.js");
const createReviewerRouter = require("./pharmacy_routes/createReviewer.js");

//Profile
const profileRouter = require("./pharmacy_routes/profile.js");
const authUserRouter = require("./pharmacy_routes/authUser.js");

//Edit Account
const editAccountRouter = require("./pharmacy_routes/editAccount.js");
const passwordChangeRouter = require("./pharmacy_routes/passwordChange.js");

//Sign up
const signUpRouter = require("./pharmacy_routes/signUp");

//Create Evidence
const createEvidenceRouter = require("./pharmacy_routes/createEvidence");

//Review Evidence
const selfReviewFormRouter = require("./pharmacy_routes/selfReviewForm");
const reviewEvidenceRouter = require("./pharmacy_routes/reviewEvidence");

// Evidence Review Info
const evidenceReviewRouter = require("./pharmacy_routes/evidenceReview");

//Evidence table
const evidenceTableRouter = require("./pharmacy_routes/evidenceTable");

//Upload
const uploadRouter = require("./pharmacy_routes/upload.js");

//Download
const downloadRouter = require("./pharmacy_routes/download.js");

//View Evidence
const viewEvidenceRouter = require("./pharmacy_routes/viewEvidence.js");

//Edit Evidence
const editEvidenceRouter = require("./pharmacy_routes/editEvidence.js");

//Delete Evidence
const deleteEvidenceRouter = require("./pharmacy_routes/deleteEvidence.js");

//Administrators Table
const adminTableRouter = require("./pharmacy_routes/adminsTable.js");

//Delete Admin
const deleteAdminRouter = require("./pharmacy_routes/deleteAdmin");

//Reviewers Table
const reviewerTableRouter = require("./pharmacy_routes/reviewersTable.js");

//Delete Reviewer
const deleteReviewerRouter = require("./pharmacy_routes/deleteReviewer");

//Get Evidence Review
const getEvidenceReviewRouter = require("./pharmacy_routes/getEvidenceReview");

//View Reviewers
const viewReviewersRouter = require("./pharmacy_routes/viewReviewers");

//Peer Review
const peerReviewRouter = require("./pharmacy_routes/peerReview");

//Create Domain
const createDomainRouter = require("./pharmacy_routes/createDomain");

//Delete Reviewer
const fetchUsersRouter = require("./pharmacy_routes/fetchUsers");

// Check admin privileges
const checkAdminsRouter = require("./pharmacy_routes/checkAdmins");

//Get Peer Review
const getPeerReviewRouter = require("./pharmacy_routes/getPeerReview");

//Get All Users
const getAllUsersRouter = require("./pharmacy_routes/getAllUsers");

const evidenceCriteriaRouter = require("./pharmacy_routes/evidenceCriteria");

const getAllPeerReviewsRouter = require("./pharmacy_routes/getAllPeerReviews");

// Grab domains
const getDomainsRouter = require("./pharmacy_routes/getDomains");

// Grab domains
const editDomainsRouter = require("./pharmacy_routes/editDomains");

// Grab single domain
const getDomainRouter = require("./pharmacy_routes/getDomain");

//Create Standard
const createStandardRouter = require("./pharmacy_routes/createStandard");

//Fetch Frameworks
const fetchFrameworksRouter = require("./pharmacy_routes/fetchFrameworks");

// Grab standards
const getStandardsRouter = require("./pharmacy_routes/getStandards");

// Grab competencies
const getCompetenciesRouter = require("./pharmacy_routes/getCompetencies");

//Create Competency
const createCompetencyRouter = require("./pharmacy_routes/createCompetency");

// Grab Performancecriterias
const getPerformancecriteriasRouter = require("./pharmacy_routes/getPerformancecriterias");

//Create performance criteria
const createPerformancecriteriasRouter = require("./pharmacy_routes/createPerformancecriterias");

//Delete Peer Review
const deletePeerReviewRouter = require("./pharmacy_routes/deletePeerReview");

//Get All Evidence Criteria
const allEvidenceCriteriaRouter = require("./pharmacy_routes/getAllEvidenceCriteria");

// Grab single Standard
const getStandardRouter = require("./pharmacy_routes/getStandard");

// Edit Standards
const editStandardsRouter = require("./pharmacy_routes/editStandards");

// Grab single Competency
const getCompetencyRouter = require("./pharmacy_routes/getCompetency");

// Edit Competencies
const editCompetenciesRouter = require("./pharmacy_routes/editCompetencies");

// Grab single Performancecriteria
const getPerformancecriteriaRouter = require("./pharmacy_routes/getPerformancecriteria");

// Edit Performancecriterias
const editPerformancecriteriasRouter = require("./pharmacy_routes/editPerformancecriterias");

//Edit Self Review
const editSelfReviewRouter = require("./pharmacy_routes/editSelfReview");

dotEnv.config();

var app = express();

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.send();
});

function verifyOrigin(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
}

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json({ limit: "100mb" }));

app.use(cookieParser());

//IMPROVE ROUTING - not setting header
function authenticateUser(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  if (!req.session.userid) {
    return res.sendStatus(401);
  }
  next();
  // const authHeader = req.headers["authorization"];
  // const token = authHeader.split(" ")[1];
  // if (token == null) return res.sendStatus(401);
  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //   if (err) return res.sendStatus(403);
  //   // req.user = user;
  //   next();
  // });
}

//AUTH
app.use("/api/login", verifyOrigin, loginRouter);
app.use("/api/logout", verifyOrigin, logoutRouter);
app.use(
  "/api/authenticate",
  verifyOrigin,
  authenticateUser,
  authenticateRouter
);

//profile
app.use("/api/profile", verifyOrigin, profileRouter);
app.use("/api/auth-user", verifyOrigin, authUserRouter);

//Edit Account
app.use("/api/edit-account", verifyOrigin, authenticateUser, editAccountRouter);
app.use("/api/accounts/password/change", verifyOrigin, passwordChangeRouter);

//Sign Up
app.use("/api/sign-up", verifyOrigin, signUpRouter);

//Create Evidence
app.use("/api/createevidence", verifyOrigin, createEvidenceRouter);

//Review Evidence
app.use("/api/self-review-form", verifyOrigin, selfReviewFormRouter);
app.use("/api/review-evidence", verifyOrigin, reviewEvidenceRouter);

app.use("/api/evidence-criteria", verifyOrigin, evidenceCriteriaRouter);

// Evidence Review Info
app.use("/api/evidence-review", verifyOrigin, evidenceReviewRouter);

//Evidence Table
app.use("/api/evidence-table", verifyOrigin, evidenceTableRouter);

//Create admin
app.use("/api/createadmin", verifyOrigin, createAdminRouter);

//Create reviewer
app.use("/api/createreviewer", verifyOrigin, createReviewerRouter);

//Upload File
app.use("/api/upload", verifyOrigin, uploadRouter);

//Download File
app.use("/api/download", verifyOrigin, downloadRouter);

//View Evidence
app.use("/api/viewevidence", verifyOrigin, viewEvidenceRouter);

//Edit Evidence
app.use("/api/editevidence", verifyOrigin, editEvidenceRouter);

//Delete Evidence
app.use("/api/deleteevidence", verifyOrigin, deleteEvidenceRouter);

//View Administrators
app.use("/api/admins-table", verifyOrigin, adminTableRouter);

//Delete Administrators
app.use("/api/deleteadmin", verifyOrigin, deleteAdminRouter);

//View Reviewers
app.use("/api/reviewers-table", verifyOrigin, reviewerTableRouter);

//Delete Reviewer
app.use("/api/deletereviewer", verifyOrigin, deleteReviewerRouter);

//Get Self Review
app.use("/api/get-evidence-review", verifyOrigin, getEvidenceReviewRouter);

//Peer Review
app.use("/api/peer-review", verifyOrigin, peerReviewRouter);

//View Reviewers
app.use("/api/viewreviewers", verifyOrigin, viewReviewersRouter);

//Fetch Users
app.use("/api/fetch-users", verifyOrigin, fetchUsersRouter);

// Check Admin privileges
app.use("/api/checkadmins", verifyOrigin, checkAdminsRouter);

//Get Peer Review
app.use("/api/get-peer-review", verifyOrigin, getPeerReviewRouter);

//Get All Users
app.use("/api/get-all-users", verifyOrigin, getAllUsersRouter);

app.use("/api/get-all-peer-reviews", verifyOrigin, getAllPeerReviewsRouter);

// Create Domain
app.use("/api/createdomain", verifyOrigin, createDomainRouter);

// Domains table
app.use("/api/domains-table", verifyOrigin, getDomainsRouter);

// Edit domains
app.use("/api/editdomains", verifyOrigin, editDomainsRouter);

// get domain
app.use("/api/getdomain", verifyOrigin, getDomainRouter);

//Create Standard
app.use("/api/createstandard", verifyOrigin, createStandardRouter);

// fetch framework data
app.use("/api/fetch-frameworks", verifyOrigin, fetchFrameworksRouter);

// standards table
app.use("/api/standards-table", verifyOrigin, getStandardsRouter);

// competencies table
app.use("/api/competencies-table", verifyOrigin, getCompetenciesRouter);

// create competency
app.use("/api/createcompetency", verifyOrigin, createCompetencyRouter);

// performancecriterias table
app.use(
  "/api/performancecriterias-table",
  verifyOrigin,
  getPerformancecriteriasRouter
);

// create performancecriterias
app.use(
  "/api/createperformancecriterias",
  verifyOrigin,
  createPerformancecriteriasRouter
);

//Delete Peer Review
app.use("/api/delete-peer-review", verifyOrigin, deletePeerReviewRouter);

//Get ALl evidence criteria
app.use(
  "/api/get-all-evidence-criteria",
  verifyOrigin,
  allEvidenceCriteriaRouter
);

// edit domains
app.use("/api/editdomains", verifyOrigin, editDomainsRouter);

// get Standard
app.use("/api/getstandard", verifyOrigin, getStandardRouter);

// edit standards
app.use("/api/editstandards", verifyOrigin, editStandardsRouter);

// get competency
app.use("/api/getcompetency", verifyOrigin, getCompetencyRouter);

// edit competencies
app.use("/api/editcompetencies", verifyOrigin, editCompetenciesRouter);

// get performancecriteria
app.use(
  "/api/getperformancecriteria",
  verifyOrigin,
  getPerformancecriteriaRouter
);

// edit performancecriterias
app.use(
  "/api/editperformancecriterias",
  verifyOrigin,
  editPerformancecriteriasRouter
);

//Edit Self Review
app.use("/api/edit-self-review", verifyOrigin, editSelfReviewRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
