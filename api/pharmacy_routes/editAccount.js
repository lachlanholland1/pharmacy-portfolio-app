const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  if (!req.body.user_id) {
    res.sendStatus(401);
  }
  const user_id = req.session.user_id;

  const accountChanges = req.body.edit_account;
  if (Object.keys(accountChanges).includes("private_account")) {
    db.query(
      "UPDATE Users SET private_account = ? WHERE user_id = ?;",
      [accountChanges.private_account, user_id],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }

  if (req.body.edit_account.first_name) {
    console.log(user_id);
    db.query(
      "UPDATE Users SET firstname = ? WHERE user_id = ?;",
      [req.body.edit_account.first_name, user_id],
      (err, result) => {
        if (err) {
          res.sendStatus(401);
          return;
        } else if (!result.length) {
          res.sendStatus(401);
          return;
        }
      }
    );
  }
  if (req.body.edit_account.last_name) {
    db.query(
      "UPDATE Users SET surname = ? WHERE user_id = ?;",
      [req.body.edit_account.last_name, user_id],
      (err, result) => {
        if (err) {
        }
      }
    );
  }

  if (req.body.edit_account.email) {
    db.query(
      "UPDATE Users SET email = ? WHERE user_id = ?;",
      [req.body.edit_account.email, user_id],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }

  if (req.body.edit_account.bio) {
    db.query(
      "UPDATE Users SET description = ? WHERE user_id = ?;",
      [req.body.edit_account.bio, user_id],
      (err, result) => {
        if (err) {
        }
      }
    );
  }

  if (req.body.edit_account.mobile) {
    db.query(
      "UPDATE Users SET mobile = ? WHERE user_id = ?;",
      [req.body.edit_account.mobile, user_id],
      (err, result) => {
        if (err) {
        }
      }
    );
  }

  if (req.body.edit_account.username) {
    console.log("there is");
    db.query(
      "UPDATE Users SET username = ? WHERE user_id = ?;",
      [req.body.edit_account.username, user_id],
      (err, result) => {
        if (err) {
        }
      }
    );
  }

  if (req.body.edit_account.attachment) {
    db.query(
      "UPDATE Users SET attachment = ? WHERE user_id = ?;",
      [req.body.edit_account.attachment, user_id],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }
});

module.exports = router;
