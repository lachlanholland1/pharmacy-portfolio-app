const express = require("express");
const refreshTokens = require("../refreshTokens.js");

const router = express.Router();

router.delete("/", (req, res, next) => {
  const accessToken = req.headers["authorization"].split(" ")[1];
  res.sendStatus(204);
});

module.exports = router;
