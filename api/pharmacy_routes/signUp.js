const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const userId = Math.random().toString(16).slice(2);
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  console.log(req.body);
  db.query(
    "INSERT INTO Users (user_id, email, password, firstname, surname) VALUES (?, ?, ?, ?, ?)",
    [userId, email, password, firstName, lastName],
    (err, result) => {
      res.sendStatus(200);
    }
  );
});

module.exports = router;
