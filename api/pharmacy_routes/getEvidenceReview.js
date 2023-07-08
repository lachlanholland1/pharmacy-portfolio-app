const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const review_id = req.body.review_id;
 
  db.query(
    "SELECT domains_id, COUNT(*) AS standard_count FROM evidencereviews WHERE idevidencereview = ? GROUP BY domains_id",
    [review_id],
    (err, result) => {
      const response = result;
      db.query(
        "SELECT * FROM evidencereviews WHERE idevidencereview = ? ORDER BY domains_id ASC, standards_id ASC, competencies_id ASC",
        [review_id],
        (err, result) => {

          var obj = [];
          var doneDomains = [];
          var doneStandards = [];
          var domainCount = 0;
          var prevdomainCount = 0;
          var standCount = 0;
          var prevstandCount = 0;
          for (let i = 0; i < result.length; i++) {
            if (doneDomains.includes(result[i].domains_id) === false) {
              obj.push({ domains_id: result[i].domains_id, standards: [] });
              obj[domainCount]["standards"] = [];
              prevdomainCount = domainCount;
              domainCount += 1;
              doneDomains.push(result[i].domains_id);
              standCount = 0;
            }
            if (doneStandards.includes(result[i].standards_id) === false) {
              obj[prevdomainCount]["standards"].push({
                standards_id: result[i].standards_id,
                competencies: [],
              });
              obj[prevdomainCount]["standards"][standCount]["competencies"] =
                [];
              prevstandCount = standCount;
              standCount += 1;
              doneStandards.push(result[i].standards_id);
            }
            var point = {};
            point = {
              competencies_id: result[i].competencies_id,
              performancecriterias_id: result[i].performancecriterias_id,
              comments: result[i].comments,
              review_id: result[i].review_id,
            };
            obj[prevdomainCount]["standards"][prevstandCount][
              "competencies"
            ].push(point);
          }
          res.send({ data: obj });
        }
      );
    }
  );
});

module.exports = router;
