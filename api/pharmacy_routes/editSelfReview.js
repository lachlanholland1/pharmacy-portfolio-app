const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const resolve = require("resolve");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  const reviewEvidenceId = req.body.evidencereviews_id;
  const user_id = req.session.userid;
  const evidence_id = req.body.evidence_id;
  const self_review = req.body.review;

  var date = new Date();
  const reviewDate = date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .toString();
  const reviewFormatted = {};
  console.log("req.body");
  console.log(req.body);
  //if competency of an edited thing is already in databse then update query it
  //Have another field in the request that is an array of competencies
  try {
    Object.keys(self_review).map((key) => {
      //can be improved/combined?
      if (key.split("-")[0] === "comment") {
        reviewFormatted[self_review[key].competency] = {
          ...reviewFormatted[self_review[key].competency],
          domain: self_review[key].domain,
          standard: self_review[key].standard,
          competency: self_review[key].competency,
          comment: self_review[key].value,
        };
      } else {
        reviewFormatted[self_review[key].competency] = {
          ...reviewFormatted[self_review[key].competency],
          domain: self_review[key].domain,
          standard: self_review[key].standard,
          competency: self_review[key].competency,
          criteria: self_review[key].value,
        };
      }
    });
  } catch (err) {
    console.log(err);
  }
  console.log("self_review");
  console.log(reviewFormatted);
  const reviewPromises = [];
  Object.keys(reviewFormatted).map((key) => {
    const reviewId = Math.floor(Math.random() * 1000000000);
    console.log("COMPETNCY ID");
    console.log(reviewFormatted[key].competency);
    reviewPromises.push(
      new Promise((resolve, reject) => {
        db.query(
          "SELECT COUNT(*) AS count FROM evidencereviews WHERE idevidencereview = ? AND competencies_id = ?",
          [reviewEvidenceId, reviewFormatted[key].competency],
          (err, result) => {
            const response = result;
            console.log("RESPONSE COUNT");
            console.log(response.length);
            console.log(response);
            console.log(response[0].count);
            //IF COMP ID IN THERE WITH EVIDNECE ID
            if (response[0].count > 0) {
              if (reviewFormatted[key].criteria == null) {
                db.query(
                  "UPDATE evidencereviews SET reviewDate = ?, domains_id = ?, standards_id = ?, competencies_id = ?, comments = ? WHERE idevidencereview = ? AND competencies_id = ?",
                  [
                    reviewDate,
                    reviewFormatted[key].domain,
                    reviewFormatted[key].standard,
                    reviewFormatted[key].competency,

                    reviewFormatted[key]?.comment,
                    reviewEvidenceId,
                    reviewFormatted[key].competency,
                  ],
                  (err) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    resolve();
                  }
                );
              } else {
                db.query(
                  "UPDATE evidencereviews SET reviewDate = ?, domains_id = ?, standards_id = ?, competencies_id = ?, performancecriterias_id = ?, comments = ? WHERE idevidencereview = ? AND competencies_id = ?",
                  [
                    reviewDate,
                    reviewFormatted[key].domain,
                    reviewFormatted[key].standard,
                    reviewFormatted[key].competency,
                    reviewFormatted[key].criteria,
                    reviewFormatted[key]?.comment,
                    reviewEvidenceId,
                    reviewFormatted[key].competency,
                  ],
                  (err) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    resolve();
                  }
                );
              }
            } else {
              db.query(
                "INSERT INTO evidencereviews (review_id, idevidencereview, evidenceitems_id, reviewers_id, reviewdate, domains_id, standards_id, competencies_id, performancecriterias_id, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                [
                  reviewId,
                  reviewEvidenceId,
                  evidence_id,
                  user_id,
                  reviewDate,
                  reviewFormatted[key].domain,
                  reviewFormatted[key].standard,
                  reviewFormatted[key].competency,
                  reviewFormatted[key].criteria,
                  reviewFormatted[key]?.comment,
                ],
                (err) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  resolve();
                }
              );
            }
          }
        );
      })
    );
  });

  Promise.all(reviewPromises).then(() => res.sendStatus(200));
});

module.exports = router;
