const express = require("express");
const db = require("../../../connection.js");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../generateAccessToken.js");
const refreshTokens = require("../refreshTokens.js");
const dotEnv = require("dotenv");

const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  console.log("hello");
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;
  db.query(
    "select * from Users where email = ? and password = ?;",
    [reqEmail, reqPassword],
    (err, result) => {
      if (err || !result.length) {
        return res.sendStatus(401);
      }
      const user = result[0];
      if (user.password !== reqPassword) {
        return res.sendStatus(401);
      }
      req.session.userId = user.user_id;
      return res.send({
        user_id: req.session.userId,
        username: user.username,
      });
    }
  );
});

module.exports = router;
