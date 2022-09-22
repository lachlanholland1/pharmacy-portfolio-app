const express = require("express");
// const refreshTokens = require("../refreshTokens.js");

const router = express.Router();

router.delete("/", (req, res, next) => {
  // const accessToken = req.headers["authorization"].split(" ")[1];
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }
  });
  res.sendStatus(204);
});

module.exports = router;
