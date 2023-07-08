const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  db.query("SELECT user_id, firstname, surname FROM Users", (err, result) => {
    res.send(result);
  });
});

module.exports = router;
