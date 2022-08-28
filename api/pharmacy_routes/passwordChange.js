const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  console.log(req.body);
  if (!req.body.user_id) {
    console.log("hi");
    return res.sendStatus(401);
  }

  if (
    !req.body.form_data ||
    !req.body.form_data.old_password ||
    !req.body.form_data.new_password ||
    !req.body.form_data.confirm_password
  ) {
    console.log("hi0");
    return res.sendStatus(401);
  }

  const oldPassword = req.body.form_data.old_password;
  const newPassword = req.body.form_data.new_password;
  const confirmPassword = req.body.form_data.confirm_password;

  if (oldPassword == newPassword) {
    console.log("hi1");
    res.sendStatus(401);
  }

  if (newPassword != confirmPassword) {
    console.log("hi2");
    res.sendStatus(401);
  }

  const user_id = req.body.user_id;

  db.query(
    "SELECT password from Users WHERE user_id = ?;",
    [user_id],
    (err, result) => {
      if (err) {
        return res.sendStatus(401);
      }
      if (!result.length) {
        return res.sendStatus(401);
      }
      if (result[0].password != oldPassword) {
        return res.sendStatus(401);
      }
      if (result[0].password == newPassword) {
        return res.sendStatus(401);
      }
      db.query(
        "UPDATE Users set password = ? WHERE user_id = ?;",
        [newPassword, user_id],
        (err, result) => {
          if (err) {
            throw err;
            return res.sendStatus(401);
          }
          console.log("password changed!");
        }
      );
    }
  );
});

module.exports = router;