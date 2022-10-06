const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  console.log(req.body);
  if (!req.body.idcompetencies) {
    res.sendStatus(401);
  }
  const idcompetencies = req.body.idcompetencies;
  if (req.body.title) {
    // console.log(user_id);
    db.query(
      "UPDATE competencies SET title = ? WHERE idcompetencies = ?;",
      [req.body.title, idcompetencies],
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
      "UPDATE competencies SET description = ? WHERE idcompetencies = ?;",
      [req.body.description, idcompetencies],
      (err, result) => {
        if (err) {
        }
      }
    );
  }

  if (req.body.status) {
    db.query(
      "UPDATE competencies SET status = ? WHERE idcompetencies = ?;",
      [req.body.status, idcompetencies],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }
  if (req.body.standards_id) {
    db.query(
      "UPDATE competencies SET standards_id = ? WHERE idcompetencies = ?;",
      [req.body.standards_id, idcompetencies],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }
});

module.exports = router;
