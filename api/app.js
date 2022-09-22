const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require("multer");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
const fs = require("fs");
const path = require("path");

//Middleware

const privateAccountMiddleware = require("./middleware/privateAccount.js");

//Auth
const loginRouter = require("./pharmacy_routes/authenticate/auth_routes/login.js");
const logoutRouter = require("./pharmacy_routes/authenticate/auth_routes/logout.js");
const tokenRouter = require("./pharmacy_routes/authenticate/auth_routes/token.js");
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
const evidenceCriteriaRouter = require("./pharmacy_routes/evidenceCriteria");
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

//Peer Review
const peerReviewRouter = require("./pharmacy_routes/peerReview");

dotEnv.config();

var app = express();

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
function authenticateToken(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // req.user = user;
    next();
  });
}

//AUTH
app.use("/api/login", verifyOrigin, loginRouter);
app.use("/api/logout", verifyOrigin, logoutRouter);
app.use("/api/token", verifyOrigin, tokenRouter);
app.use(
  "/api/authenticate",
  verifyOrigin,
  authenticateToken,
  authenticateRouter
);

//profile
app.use("/api/profile", verifyOrigin, profileRouter);
app.use("/api/auth-user", verifyOrigin, authUserRouter);

//Edit Account
app.use("/api/edit-account", verifyOrigin, editAccountRouter);
app.use("/api/accounts/password/change", verifyOrigin, passwordChangeRouter);

//Sign Up
app.use("/api/sign-up", verifyOrigin, signUpRouter);

//Create Evidence
app.use("/api/createevidence", verifyOrigin, createEvidenceRouter);

//Review Evidence
app.use("/api/evidence-criteria", verifyOrigin, evidenceCriteriaRouter);
app.use("/api/review-evidence", verifyOrigin, reviewEvidenceRouter);

// Evidence Review Info
app.use("/api/evidence-review", verifyOrigin, evidenceReviewRouter);

//Evidence Table
app.use(
  "/api/evidence-table",
  verifyOrigin,
  //privateAccountMiddleware,
  evidenceTableRouter
);

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
