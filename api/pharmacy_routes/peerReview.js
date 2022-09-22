const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const resolve = require("resolve");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  const peerreview_id = Math.floor(Math.random() * 1000000000);
  const user_id = req.body.user_id;
  const evidence_id = req.body.evidence_id;
  const self_review = req.body.review;
  const performance = req.body.review.performancecriterias_id;
  console.log(req.body.review);
  var date = new Date();
  const reviewDate = date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .toString();
  const reviewFormatted = {};
    db.query(
          "INSERT INTO peerreviews (peerreview_id, review_id, reviewers_id, evidenceitems_id, performancecriterias_id, reviewdate, comments, agreeoncompetency) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
          [
            peerreview_id,
            review_id,
            user_id, //reviewers id
            evidence_id,
            user_id, //performance criteria
            reviewDate,
            reviewFormatted[key]?.comment, //comments
            reviewFormatted[key].standard, //agree or not
            reviewFormatted[key].competency,
            reviewFormatted[key].criteria,
            reviewFormatted[key].domain,
          ],
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
      
    
  

  Promise.all(reviewPromises).then(() => res.sendStatus(200));
});

module.exports = router;
