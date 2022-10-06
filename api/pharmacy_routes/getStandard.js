const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const idstandarditems = req.body.idstandarditems;
  db.query(
    "SELECT domains.title as domainstitle, standards.title, standards.description, standards.status, standards.idstandards, standards.domains_id FROM standards INNER JOIN domains ON domains.iddomains = standards.domains_id WHERE standards.idstandards ="+idstandarditems+";",
    (err, result) => {
      const response = { standards_data: result[0] };
      res.send(response);
      // console.log("fsfds:"+result);
      // res.send({ standards_data: result });
    }
  );
});


module.exports = router;
