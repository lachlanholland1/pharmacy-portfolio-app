const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  db.query(
    "SELECT standards.title as standardstitle, competencies.idcompetencies, competencies.title as competenciestitle, competencies.description, competencies.status FROM competencies INNER JOIN standards ON standards.idstandards = competencies.standards_id ORDER BY standards.title ASC, competencies.title;",
    (err, result) => {
      res.send({ competencies_data: result });
    }
  );
});


module.exports = router;
