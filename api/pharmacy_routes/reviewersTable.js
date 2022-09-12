const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  db.query(
    "SELECT reviewers.idreviewers, Users.email, Users.firstname, Users.surname FROM reviewers INNER JOIN Users ON Users.user_id = reviewers.users_id;",
    (err, result) => {
      res.send({ reviewers_data: result });
    }
  );
});


module.exports = router;
