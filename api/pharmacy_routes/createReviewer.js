const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
 
  const user_id = req.body.user_id;
  db.query(
    "INSERT INTO reviewers (users_id) VALUES (?)",
    [user_id],
    (err, result) => {
      res.sendStatus(200);
    }
  );
});

module.exports = router;
