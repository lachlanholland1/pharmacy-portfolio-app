const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  console.log(req.body);
  const user_id = req.session.userid;
  db.query(
    "INSERT INTO reviewers (users_id) VALUES (?)",
    [user_id],
    (err, result) => {
      res.sendStatus(200);
    }
  );
});

module.exports = router;
