const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  console.log(req.body);
  if (!req.body.iddomains) {
    res.sendStatus(401);
  }
  const iddomains = req.body.iddomains;
  if (req.body.title) {
    console.log(req.body.title);
    // console.log(user_id);
    db.query(
      "UPDATE domains SET title = ? WHERE iddomains = ?;",
      [req.body.title, iddomains],
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
      "UPDATE domains SET description = ? WHERE iddomains = ?;",
      [req.body.description, iddomains],
      (err, result) => {
        if (err) {
        }
      }
    );
  }

  if (req.body.status) {
    db.query(
      "UPDATE domains SET status = ? WHERE iddomains = ?;",
      [req.body.status, iddomains],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }
});

module.exports = router;
