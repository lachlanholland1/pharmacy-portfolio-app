const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const userId = Math.random().toString(16).slice(2);
  const username = req.body.username;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  db.query(
    "INSERT INTO Users (user_id, username, email, password, firstname, surname) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, username, email, password, firstName, lastName],
    (err, result) => {
      res.sendStatus(200);
    }
  );
});

module.exports = router;
