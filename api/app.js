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

//Evidence table
const evidenceTableRouter = require("./pharmacy_routes/evidenceTable");

//Upload
const uploadRouter = require("./pharmacy_routes/upload.js");

//Download
const downloadRouter = require("./pharmacy_routes/download.js");

//View Evidence
const viewEvidenceRouter = require("./pharmacy_routes/viewEvidence.js");

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

app.use("/api/evidence-table", verifyOrigin, evidenceTableRouter);

//Evidence table
const createAdminTableRouter = require("./pharmacy_routes/createAdmin");

//Evidence table
const createReviewerTableRouter = require("./pharmacy_routes/createReviewer");

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
