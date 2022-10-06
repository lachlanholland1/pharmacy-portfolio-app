const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const idevidenceitems = req.body.idevidenceitems;
  const response = { evidence_data: {} };

  const evidenceData = new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM evidenceitems WHERE idevidenceitems = ?",
      [idevidenceitems],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        if (!result.length) {
          return reject(Promise.reject());
        }
        response.evidence_data = result[0];
        return resolve();
      }
    );
  });

  const selfReviewEnabled = new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM evidencereviews INNER JOIN Users ON evidencereviews.reviewers_id = Users.user_id WHERE evidenceitems_id = ? GROUP BY idevidencereview",
      [idevidenceitems],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        response.evidence_reviews = result[0];
        return resolve();
      }
    );
  });

  Promise.all([evidenceData, selfReviewEnabled])
    .then(() => {
      res.send(response);
    })
    .catch((err) => res.sendStatus(500));
});

module.exports = router;
