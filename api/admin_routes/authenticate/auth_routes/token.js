const express = require("express");
const jwt = require("jsonwebtoken");
const { refreshTokens } = require("../refreshTokens.js");
const generateAccessToken = require("../generateAccessToken.js");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

router.post("/", (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user.id);
    res.json({ accessToken: accessToken });
  });
});
module.exports = router;
