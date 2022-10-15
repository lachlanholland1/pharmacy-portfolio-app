const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  db.query(
    "SELECT * FROM performancecriterias ORDER BY sort;",
    (err, result) => {
      res.send({ performancecriterias_data: result });
    }
  );
});


module.exports = router;
