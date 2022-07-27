const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ authenticated: "true" });
});

module.exports = router;
