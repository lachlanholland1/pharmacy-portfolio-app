const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const evidenceitems_id = req.body.evidenceitems_id;
  const agree = "No";
 
  db.query(
    "SELECT * FROM peerreviews WHERE evidenceitems_id = ? AND agreeoncompetency = ?",
    [evidenceitems_id, agree],
    (err, result) => {
      const response = result;
      db.query(
        "SELECT DISTINCT peerreviews.peerreview_id, peerreviews.evidencereviews_id, peerreviews.reviewers_id, peerreviews.reviewdate, peerreviews.evidencereviews_id, Users.firstname, Users.surname FROM peerreviews INNER JOIN Users ON peerreviews.reviewers_id=Users.user_id WHERE peerreviews.evidenceitems_id = ?",
        [evidenceitems_id],
        (err, result) => {
          var obj = [];
          for (let i = 0; i < result.length; i++) {
            for (let k = 0; k < response.length; k++) {
              if (response[k].reviewers_id == result[i].reviewers_id) {
                result[i].discrepencies = "Yes";
              }
            }
          }

          res.send(result);
        }
      );
    }
  );
});

module.exports = router;
