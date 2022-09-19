const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const username = req.body.user;
  db.query(
    "SELECT * FROM evidenceitems WHERE users_id = (SELECT user_id FROM Users WHERE username = ?);",
    [username],
    (err, result) => {
      console.log(result);
      res.send({ evidence_data: result });
    }
  );
});

module.exports = router;
