const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  db.query(
    "SELECT standards.idstandards, domains.title as domainstitle, standards.title as standardstitle, standards.description, standards.status FROM standards INNER JOIN domains ON domains.iddomains = standards.domains_id ORDER BY domains.title ASC, standards.title ",
    (err, result) => {
      res.send({ standards_data: result });
    }
  );
});


module.exports = router;
