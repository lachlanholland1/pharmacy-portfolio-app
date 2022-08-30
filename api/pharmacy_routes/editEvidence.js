const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  console.log(req.body);
  if (!req.body.idevidenceitems) {
    res.sendStatus(401);
  }
  const idevidenceitems = req.body.idevidenceitems;
  if (req.body.title) {
    console.log(req.body.title);
    // console.log(user_id);
    db.query(
      "UPDATE evidenceitems SET title = ? WHERE idevidenceitems = ?;",
      [req.body.title, idevidenceitems],
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
      "UPDATE evidenceitems SET description = ? WHERE idevidenceitems = ?;",
      [req.body.description, idevidenceitems],
      (err, result) => {
        if (err) {
        }
      }
    );
  }

  if (req.body.impactstatement) {
    db.query(
      "UPDATE evidenceitems SET impactstatement = ? WHERE idevidenceitems = ?;",
      [req.body.impactstatement, idevidenceitems],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }
//procurement date
//   if (req.body.edit_account.bio) {
//     db.query(
//       "UPDATE Users SET description = ? WHERE idevidenceitems = ?;",
//       [req.body.edit_account.bio, idevidenceitems],
//       (err, result) => {
//         if (err) {
//         }
//       }
//     );
//   }

//   if (req.body.edit_account.mobile) {
//     db.query(
//       "UPDATE Users SET mobile = ? WHERE idevidenceitems = ?;",
//       [req.body.edit_account.mobile, idevidenceitems],
//       (err, result) => {
//         if (err) {
//         }
//       }
//     );
//   }

//   if (req.body.edit_account.username) {
//     console.log("there is");
//     db.query(
//       "UPDATE Users SET username = ? WHERE idevidenceitems = ?;",
//       [req.body.edit_account.username, idevidenceitems],
//       (err, result) => {
//         if (err) {
//         }
//       }
//     );
//   }
});

module.exports = router;
