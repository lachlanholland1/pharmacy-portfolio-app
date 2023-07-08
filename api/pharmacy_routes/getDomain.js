const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const iddomainitems = req.body.iddomainitems;
  db.query(
    "SELECT * FROM domains WHERE iddomains="+iddomainitems+";",
    (err, result) => {
      const response = { domains_data: result[0] };
      res.send(response);
    }
  );
});


module.exports = router;
