const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const evidenceid = req.body.idevidenceitems;
 
  db.query(
    "SELECT competencies_id FROM evidencereviews WHERE evidenceitems_id =" +
      evidenceid +
      ";",
    (err, result) => {
      var response = [];
      var val = 0;
      for (let i = 0; i < result.length; i++) {
        val = result[i].competencies_id;
        response.push(val);
      }
      res.send(response);
    }
  );
});

module.exports = router;
