const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const resolve = require("resolve");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  const user_id = req.body.user_id;
  const evidence_id = req.body.evidence_id;
  const self_review = req.body.review;
  var date = new Date();
  const reviewDate = date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .toString();
  const reviewFormatted = {};

  try {
    Object.keys(self_review).map((key) => {
      //can be improved/combined?
      if (key.split("-")[0] === "comment") {
        reviewFormatted[self_review[key].competency] = {
          ...reviewFormatted[self_review[key].competency],
          domain: self_review[key].domain,
          standard: self_review[key].domain,
          competency: self_review[key].competency,
          comment: self_review[key].value,
        };
      } else {
        reviewFormatted[self_review[key].competency] = {
          ...reviewFormatted[self_review[key].competency],
          domain: self_review[key].domain,
          standard: self_review[key].domain,
          competency: self_review[key].competency,
          criteria: self_review[key].value,
        };
      }
    });
  } catch (err) {
    console.log(err);
  }

  const reviewPromises = [];
  console.log(reviewFormatted);
  Object.keys(reviewFormatted).map((key) => {
    reviewPromises.push(
      new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO evidencereviews (evidenceitems_id, reviewers_id, reviewdate, domains_id, standards_id, competencies_id, performancecriterias_id, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
          [
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
      })
    );
  });

  Promise.all(reviewPromises).then(() => res.sendStatus(200));
});

module.exports = router;
