const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  console.log(req.body);
  if (!req.body.idstandards) {
    res.sendStatus(401);
  }
  const idstandards = req.body.idstandards;
  if (req.body.title) {
    console.log(req.body.title);
    // console.log(user_id);
    db.query(
      "UPDATE standards SET title = ? WHERE idstandards = ?;",
      [req.body.title, idstandards],
      (err, result) => {
        if (err) {
          res.sendStatus(401);
          return;
        } else if (!result.length) {
          res.sendStatus(200);
          return;
        }
      }
    );
  }
  if (req.body.description) {
    db.query(
      "UPDATE standards SET description = ? WHERE idstandards = ?;",
      [req.body.description, idstandards],
      (err, result) => {
        if (err) {
        }
      }
    );
  }

  if (req.body.status) {
    db.query(
      "UPDATE standards SET status = ? WHERE idstandards = ?;",
      [req.body.status, idstandards],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }
  if (req.body.domains_id) {
    db.query(
      "UPDATE standards SET domains_id = ? WHERE idstandards = ?;",
      [req.body.domains_id, idstandards],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }
});

module.exports = router;
