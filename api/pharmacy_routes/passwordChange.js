const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
 
  if (!req.session.userid) {
    return res.sendStatus(401);
  }

  if (
    !req.body.form_data ||
    !req.body.form_data.old_password ||
    !req.body.form_data.new_password ||
    !req.body.form_data.confirm_password
  ) {
    return res.sendStatus(401);
  }

  const oldPassword = req.body.form_data.old_password;
  const newPassword = req.body.form_data.new_password;
  const confirmPassword = req.body.form_data.confirm_password;

  if (oldPassword == newPassword) {
    res.sendStatus(401);
  }

  if (newPassword != confirmPassword) {
    res.sendStatus(401);
  }

  const user_id = req.session.userid;

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
            return res.sendStatus(401);
          }
        }
      );
    }
  );
});

module.exports = router;
