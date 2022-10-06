const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  console.log(req.body);
  if (!req.body.idperformancecriteria) {
    res.sendStatus(401);
  }
  const idperformancecriteria = req.body.idperformancecriteria;
  if (req.body.title) {
    console.log(req.body.title);
    // console.log(user_id);
    db.query(
      "UPDATE performancecriterias SET title = ? WHERE idperformancecriteria = ?;",
      [req.body.title, idperformancecriteria],
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
      "UPDATE performancecriterias SET description = ? WHERE idperformancecriteria = ?;",
      [req.body.description, idperformancecriteria],
      (err, result) => {
        if (err) {
        }
      }
    );
  }

  if (req.body.status) {
    db.query(
      "UPDATE performancecriterias SET status = ? WHERE idperformancecriteria = ?;",
      [req.body.status, idperformancecriteria],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }
});

module.exports = router;
