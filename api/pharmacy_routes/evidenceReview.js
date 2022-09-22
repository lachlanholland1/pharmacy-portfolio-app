const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const resolve = require("resolve");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  const idEvidenceReview = req.body.id_evidence_review;
  db.query(
    "SELECT * FROM evidencereviews WHERE idevidencereview = ?;",
    [idEvidenceReview],
    (err, result) => {
      if (err) {
        res.send(500);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
