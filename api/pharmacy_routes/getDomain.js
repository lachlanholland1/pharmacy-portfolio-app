const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  db.query(
    "SELECT * FROM domains WHERE id=4;",
    (err, result) => {
      res.send({ domains_data: result });
    }
  );
});


module.exports = router;
