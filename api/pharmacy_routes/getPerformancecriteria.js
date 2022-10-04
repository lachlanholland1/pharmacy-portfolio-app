const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const idperformancecriteriaitems = req.body.idperformancecriteriaitems;
  db.query(
    "SELECT * FROM performancecriterias WHERE idperformancecriteria="+idperformancecriteriaitems+";",
    (err, result) => {

      const response = { performancecriterias_data: result[0] };
      res.send(response);

      // console.log("fsfds:"+result);
      // res.send({ performancecriterias_data: result });
    }
  );
});


module.exports = router;
