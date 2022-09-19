const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
    
  const review_id = req.body.review_id;
  console.log(req.body);
  db.query(
    "SELECT * FROM evidencereviews WHERE idevidencereview = ?",
    [review_id],
    (err, result) => {
        console.log(result);
        res.send({data: result});
    //   const response = { review: result };
    //   console.log(response);
    //   res.send(repsonse);
      //   if (err) {
      //     console.log(err);
      //     res.sendStatus(401);
      //     return;}
      // //   res.sendStatus(200);
    //   db.query(
    //     "SELECT idevidencereview, evidenceitems_id, reviewers_id, username, attachment, reviewdate, reviewtype, domains_id, standards_id, competencies_id, performancecriterias_id, comments, agreeoncompetency, review_id FROM evidencereviews INNER JOIN Users ON evidencereviews.reviewers_id = Users.user_id WHERE evidenceitems_id = ? GROUP BY idevidencereview",
    //     [idevidenceitems],
    //     (err, result) => {
    //       //   if (err) {
    //       //     console.log(err);
    //       //     res.sendStatus(401);
    //       //     return;}
    //       // //   res.sendStatus(200);
    //       response.evidence_reviews = result;
    //       console.log("response:");
    //       console.log(response);
    //       res.send(response);
       // }
      //);
    }
  );
});

module.exports = router;
