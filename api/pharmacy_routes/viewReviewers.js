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
        console.log(err);
        res.sendStatus(401);
        return;
      }
      console.log(result);
      console.log(result.length);
      res.send(result);
      //res.sendStatus(200);
    }
  );
});

module.exports = router;
