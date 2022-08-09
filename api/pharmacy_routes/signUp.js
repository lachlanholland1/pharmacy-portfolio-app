const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  db.query(
    "select * from Users where email = ? and password = ?",
    [reqEmail, reqPassword],
    (err, result) => {
      res.sendStatus(200);
    }
  );
});

module.exports = router;
