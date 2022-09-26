const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const table = req.body.table;
  console.log(table);
  db.query(
    "SELECT * FROM Users WHERE user_id NOT IN (SELECT users_id FROM "+table+")",
    (err, result) => {
      res.send({ users_data: result });
    }
  );
    console.log();
});

module.exports = router;
