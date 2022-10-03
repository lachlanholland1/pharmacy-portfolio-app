const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const resolve = require("resolve");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  const peerreview_id = Math.floor(Math.random() * 1000000000);
  const review_id = req.body.review_id;
  const user_id = req.body.user_id;
  const evidence_id = req.body.evidence_id;
  const comments = req.body.review.comments;
  const agreecompetenncy = req.body.review.agree;
  const performance = req.body.review.performancecriteria;
  const evidencereviews_id = req.body.evidencereviews_id;
  console.log(req.body.review);
  console.log(req.body);
  var date = new Date();
  const reviewDate = date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .toString();

  const self_review = req.body.review;
  const reviewFormatted = {};
  try {
    Object.keys(self_review).map((key) => {
      console.log(key);
      //can be improved/combined?
      if (key.split("-")[0] === "comments") {
        reviewFormatted[self_review[key].reviewId] = {
          ...reviewFormatted[self_review[key].reviewId],
          // domain: self_review[key].domain,
          // standard: self_review[key].domain,
          // competency: self_review[key].competency,
          comments: self_review[key].value,
          review_id: self_review[key].reviewId,
        };
      } 
      else if (key.split("-")[0] === "a"){
        reviewFormatted[self_review[key].reviewId] = {
          ...reviewFormatted[self_review[key].reviewId],
          // domain: self_review[key].domain,
          // standard: self_review[key].domain,
          // competency: self_review[key].competency,
          agree: self_review[key].value,
          review_id: self_review[key].reviewId,
        };
      }
      else {
        reviewFormatted[self_review[key].reviewId] = {
          ...reviewFormatted[self_review[key].reviewId],
          // domain: self_review[key].domain,
          // standard: self_review[key].domain,
          // competency: self_review[key].competency,
          performancecriteria: self_review[key].value,
          review_id: self_review[key].reviewId,
        };
      }
    });
  } catch (err) {
    console.log(err);
  }
  console.log(reviewFormatted);
  const reviewPromises = [];
  Object.keys(reviewFormatted).map((key) => {
    const reviewId = Math.floor(Math.random() * 1000000000);
    reviewPromises.push(
      new Promise((resolve, reject) => {
    db.query(
          "INSERT INTO peerreviews (peerreview_id, review_id, reviewers_id, evidenceitems_id, performancecriterias_id, reviewdate, comments, agreeoncompetency, evidencereviews_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
          [
            peerreview_id,
            reviewFormatted[key].review_id,//review_id,
            user_id, //reviewers id
            evidence_id, //piece of evidence ID
            reviewFormatted[key].performancecriteria,//performance, //performance criteria
            reviewDate,
            reviewFormatted[key]?.comments,//comments, //comments
            reviewFormatted[key].agree,//agreecompetenncy, //agree or not   ////needs to always be there for the dsicrepencies
            evidencereviews_id,
          ],
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            resolve();
          }
        );
      })
    );
  });

  Promise.all(reviewPromises).then(() => res.sendStatus(200));
});

module.exports = router;
