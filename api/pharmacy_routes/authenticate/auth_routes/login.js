const express = require("express");
const db = require("../../../connection.js");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../generateAccessToken.js");
const refreshTokens = require("../refreshTokens.js");
const dotEnv = require("dotenv");

const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;
  db.query(
    "select * from Users where email = ? and password = ?",
    [reqEmail, reqPassword],
    (err, result) => {
      if (err) {
        res.sendStatus(401);
        return;
      } else if (!result.length) {
        res.sendStatus(401);
        return;
      } else if (!result[0].email || !result[0].password) {
        res.sendStatus(401);
        return;
      }
      const user = result[0];
      if (user.password === reqPassword) {
        const accessToken = generateAccessToken(user.user_id);
        const refreshToken = jwt.sign(
          { id: user.user_id },
          process.env.REFRESH_TOKEN_SECRET
        );
        refreshTokens.push(refreshToken);
        return res.send({ access_token: accessToken });
      }
      return res.sendStatus(401);
    }
  );
});

module.exports = router;
