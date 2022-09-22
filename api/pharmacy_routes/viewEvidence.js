const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const idevidenceitems = req.body.idevidenceitems;
  db.query(
    "SELECT * FROM evidenceitems WHERE idevidenceitems = ?",
    [idevidenceitems],
    (err, result) => {
      const response = { evidence_data: result[0] };
      //   if (err) {
      //     console.log(err);
      //     res.sendStatus(401);
      //     return;}
      // //   res.sendStatus(200);
      db.query(
        "SELECT * FROM evidencereviews INNER JOIN Users ON evidencereviews.reviewers_id = Users.user_id WHERE evidenceitems_id = ? GROUP BY idevidencereview",
        [idevidenceitems],
        (err, result) => {
          //   if (err) {
          //     console.log(err);
          //     res.sendStatus(401);
          //     return;}
          // //   res.sendStatus(200);
          response.evidence_reviews = result;
          console.log("response:");
          console.log(response);
          res.send(response);
        }
      );
    }
  );
});

module.exports = router;
