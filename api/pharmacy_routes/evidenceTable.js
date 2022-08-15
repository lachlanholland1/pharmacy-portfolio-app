const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  console.log(req.body);
  const userID = req.body.user;
  db.query(
    "SELECT * FROM evidenceitems WHERE username = ?",
    [userID],
    (err, result) => {
      res.send({ evidence_data: result });
    }
  );
});

module.exports = router;
