const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const reviewer_id = req.body.reviewer_id;
  db.query(
    "DELETE FROM reviewers WHERE idreviewers = ?",
    [reviewer_id],
    (err, result) => {
      if (err) {
        
        res.sendStatus(401);
        return;}
      res.sendStatus(200);
    }
  );
});

module.exports = router;
