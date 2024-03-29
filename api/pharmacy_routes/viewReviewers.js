const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const users_id = req.body.users_id;
  db.query(
    "SELECT users_id FROM reviewers WHERE users_id = ?",
    [users_id],
    (err, result) => {
      if (err) {
        res.sendStatus(401);
        return;
      }
      res.send(result);
    }
  );
});

module.exports = router;
