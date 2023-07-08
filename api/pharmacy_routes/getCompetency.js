const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const idcompetency = req.body.idcompetency;
  db.query(
    "SELECT standards.title as standardstitle, competencies.title, competencies.description, competencies.status, competencies.idcompetencies, competencies.standards_id FROM competencies INNER JOIN standards ON standards.idstandards = competencies.standards_id WHERE competencies.idcompetencies ="+idcompetency+";",
    (err, result) => {
      const response = { competencies_data: result[0] };
      res.send(response);
    }
  );
});


module.exports = router;
