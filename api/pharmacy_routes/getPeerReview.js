const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  console.log(req.body);
  const evidenceitems_id = req.body.evidenceitems_id;
  console.log(req.body.evidenceitems_id);
  db.query(
    "SELECT * FROM peerreviews WHERE evidenceitems_id = ?",
    [evidenceitems_id],
    (err, result) => {
      //   const response = result;
      //   console.log(response.length);
      console.log(result);
      res.send(result);

      //   var obj = [];
      //   var doneIds = [];
      //   var idCount = 0;
      //   var previdCount = 0;
      //   for (let i = 0; i < result.length; i++) {
      //     if (doneIds.includes(result[i].peerreview_id) === false) {
      //       obj.push({ peerreview_id: result[i].peerreview_id, review: [] });
      //       //   console.log(obj);
      //       //   obj[idCount]["standards"] = [];
      //       previdCount = idCount;
      //       idCount += 1;
      //       doneIds.push(result[i].peerreview_id);
      //       console.log("Added Review ID");
      //     }
      // var point = {};
      // point = {
      //   competencies_id: result[i].competencies_id,
      //   performancecriterias_id: result[i].performancecriterias_id,
      //   comments: result[i].comments,
      //   review_id: result[i].review_id,
      // };
      // obj[prevdomainCount]["standards"][prevstandCount][
      //   "competencies"
      // ].push(point);
      //   }
    }
  );
});

module.exports = router;
